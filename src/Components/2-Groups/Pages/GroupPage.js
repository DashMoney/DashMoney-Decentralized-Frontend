import React from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
//import Card from "react-bootstrap/Card";

import Navbar from "react-bootstrap/Navbar";


import ViewMembersModal from "../GroupBottomNav/GroupBottomNavModals/ViewMembersModal"
import NewMessageModal from "../GroupBottomNav/GroupBottomNavModals/NewMessageModal";
import SendInviteModal from "../GroupBottomNav/GroupBottomNavModals/SendInviteModal";

import GroupPageMsg from "./GroupPageMsg";

import GroupBottomNav from "../GroupBottomNav/GroupBottomNav"

import "./GroupPage.css";

const Dash = require("dash");

const { Essentials: { Buffer }, PlatformProtocol: { Identifier } } = Dash;

class GroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: true,
      LoadingMsg: false,
      LoadingInvite: false,
      LoadingMembers: true,

      groupMembers: [],

      msgsToDisplay: [],
      stageMsgsToAdd:[],

      isModalShowing: false,
      presentModal: '',
      sentMsgError: false,
      sentInviteError: false,
      sentInviteSuccess: false,
      sendToName: '', 
    };
  }
// //https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "instant"
    , block: "start", inline: "nearest"
     });
  }

  hideModal = () => {
    this.setState({
      isModalShowing: false,
    });
  };

  showModal = (modalName) => {
    this.setState({
      presentModal: modalName,
      isModalShowing: true,
    });
  };

  // handleTimeToDate = (timeObject) => {
  //   let date = new Date(timeObject);

  //   //let longFormDate= setTime(date);

  //   return date.toLocaleDateString();
  // };

  submitDGTmessage = (groupName, msgText) => {

    this.setState({
      LoadingMsg:true,
    });

    const clientOpts = {
      network: 'testnet',
      wallet: {
        mnemonic:this.props.mnemonic,
        unsafeOptions: {
          skipSynchronizationBeforeHeight: this.props.mostRecentBlockHeight,
        },
      },
      apps: {
        DGTContract: { 
          contractId: this.props.DataContractDGT, 
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let docProperties = {
      group: groupName,
      timeStamp: 2546075019551 - Date.now() ,
      message: msgText
    };
    
    const submitMsgDocument = async () => {
      const { platform } = client;
      const identity = this.props.identityRaw; // Your identity ID
      
      // Create the note document
      const dgtDocument = await platform.documents.create(
        'DGTContract.dgtmsg', // <- CHECK THIS
        identity,
        docProperties,
      );
//Staged BEGIN
      let d = Date.now();

      let fakeDocProperties = {
        group: groupName,
        timeStamp: 2546075019551 - d ,
        message: msgText,
        $createdAt: d,
      };

      console.log(fakeDocProperties);

      this.addSentMessage(fakeDocProperties);
//Staged END

      const documentBatch = {
        create: [dgtDocument], // Document(s) to create
        replace: [], // Document(s) to update
        delete: [], // Document(s) to delete
      };
      // Sign and submit the document(s)
      return platform.documents.broadcast(documentBatch, identity);
    };
    
    submitMsgDocument()
      .then((d) => {
        console.log(d.toJSON());
         this.props.handleRemoveStagedMsgs(); //This is for Group Page Reload
        this.setState({
          LoadingMsg:false,
          stageMsgsToAdd:this.state.stageMsgsToAdd.slice(0,-1), //This is for the Group Page Fake it til you make it
        });
      })
      .catch((e) => {
        console.error('Something went wrong:\n', e);
        this.props.handleRemoveStagedMsgs();
        this.setState({
          stageMsgsToAdd:this.state.stageMsgsToAdd.slice(0,-1),
          msgsToDisplay: 
            this.state.msgsToDisplay.slice(1),
          LoadingMsg:false,
          sentMsgError: true, 
        });
    })
      .finally(() => client.disconnect());

  
  }


  addSentMessage = (msgToAdd) => {

    let tupleToAdd = [this.props.uniqueName, msgToAdd];
    console.log('Tuple to Add', tupleToAdd);

     this.props.handleStagedMsgs(tupleToAdd);

    this.setState({
      stageMsgsToAdd:[tupleToAdd, 
        ...this.state.stageMsgsToAdd],
      msgsToDisplay:[tupleToAdd, 
        ...this.state.msgsToDisplay],
    }
    ,()=>this.scrollToBottom()
    );
}

  submitDGTinvite= (dpnsDoc) => {
    //have to get the id of the name like DGM

    //Invite Sent alert ??? also add loading

    this.setState({
      LoadingInvite:true,
    });

    const clientOpts = {
      network: 'testnet',
      wallet: {
        mnemonic:this.props.mnemonic,
        unsafeOptions: {
          skipSynchronizationBeforeHeight: this.props.mostRecentBlockHeight,
        },
      },
      apps: {
        DGTContract: { 
          contractId: this.props.DataContractDGT, 
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    
    const submitInviteDocument = async () => {
      const { platform } = client;
      const identity = this.props.identityRaw; // Your identity ID

      const docProperties = {
        toId: Buffer.from(Identifier.from(dpnsDoc.$ownerId)), //this is a selfinvite
        group: this.props.selectedGroup
      };
    
      // Create the note document
      const dgtDocument = await platform.documents.create(
        'DGTContract.dgtinvite', // <- CHECK THIS
        identity,
        docProperties,
      );
    
      const documentBatch = {
        create: [dgtDocument], // Document(s) to create
        replace: [], // Document(s) to update
        delete: [], // Document(s) to delete
      };
      // Sign and submit the document(s)
      return platform.documents.broadcast(documentBatch, identity);
    };
    
    
    // this.setState({
    //   LoadingInvite:false,
    //   sentInviteSuccess: true,
    // sendToName: dpnsDoc.label,
    // });
    

    submitInviteDocument()
    .then((d) => {
      console.log(d.toJSON());
      this.setState({
        LoadingInvite:false,
        sentInviteSuccess: true,
      sendToName: dpnsDoc.label,
      });
    })
    .catch((e) => {
      console.error('Something went wrong:\n', e);
      this.setState({
        LoadingInvite:false,
        sentInviteError: true,
      });
  })
    .finally(() => client.disconnect());
  }


getDGTMessagesDocs = () => {

    console.log(`Calling get messages for ${this.props.selectedGroup}`)

    const clientOpts = {
      network: this.props.whichNetwork,
      wallet: { //I DON'T NEED THE WALLET FOR THIS, RIGHT?
        mnemonic:
          this.props.mnemonic,
        unsafeOptions: {
          skipSynchronizationBeforeHeight: this.props.mostRecentBlockHeight,
        },
      },
      apps: {
        DGTContract: { //changed tutorialContract TO DashGetTogetherContract
          contractId: this.props.DataContractDGT, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DGTMessages Query ->
    const getMessages = async () => {
      return client.platform.documents.get('DGTContract.dgtmsg', {
          limit:60,
        where: [     
          ['group', '==', this.props.selectedGroup], 
          ['timeStamp', '>=' , 2546075019551 - Date.now()] 
        ],
        orderBy: [
        ['timeStamp', 'asc'],
      ],
      });
    };

    getMessages()
      .then((d) => {

        if(d.length ===0){
    this.setState({
      Loading:false,
    });
        }else{

        let docArray = [];
        for (const n of d) {
           console.log("Document:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        this.getNamesforDSOmsgs(docArray);
      
      }

        // this.setState(
        //   {
        //     dgtGroupMessages: docArray,
        //     //isLoadingGroup: false,
        //   }
        //   ,() =>  this.getNamesforDSOmsgs(docArray)
        // );

      })
      .catch((e) => console.error("Something went wrong:\n", e))
      //need to setState to handle Error and set isLoadingEveryone to false
      .finally(() => client.disconnect());
  };


getNamesforDSOmsgs = (msgArr) => {

  let ownerarrayOfOwnerIds = msgArr.map(doc => {
    return doc.$ownerId;
  });

  let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

  let arrayOfOwnerIds =[...setOfOwnerIds];

  arrayOfOwnerIds = arrayOfOwnerIds.map(item => Buffer.from(Identifier.from(item)))

  console.log('Calling getNamesforDSOmsgs');

  const clientOpts = {
    network: this.props.whichNetwork,
    wallet: {
      mnemonic:
        this.props.mnemonic,
      
      unsafeOptions: {
        skipSynchronizationBeforeHeight: this.props.mostRecentBlockHeight,
        //change to what the actual block height
      },
    },
    apps: {
      DPNS: {
        contractId: this.props.DataContractDPNS, 
      },
    },
  };
  const client = new Dash.Client(clientOpts);

  const getNameDocuments = async () => {
    return client.platform.documents.get(
      'DPNS.domain',
      {
        where: [
          [
            'records.dashUniqueIdentityId',
            'in', arrayOfOwnerIds
          ],
        ],
        orderBy: [
          ['records.dashUniqueIdentityId', 'asc'],
        ],
      },
    );
  };

  getNameDocuments()
    .then((d) => {

      //WHAT IF THERE ARE NO NAMES?
      if(d.length === 0){
        console.log('No DPNS domain documents retrieved.')
      }

      let nameDocArray = [];

      for (const n of d) {

        console.log('NameDoc:\n', n.toJSON());

        nameDocArray = [n.toJSON(), ...nameDocArray]; 
      }
      console.log(nameDocArray);

      let tupleArray= []; //<- Final array

        // My 2 arrays are: nameDocArray and msgArr
//There may not be very many name docs because same author for lots of msgs..

tupleArray = msgArr.map(msg => {

  let tuple = '';

  for(let nameDoc of nameDocArray){
    if(nameDoc.$ownerId === msg.$ownerId){
      tuple =  [nameDoc.label, msg]
      break
    }
  }
  if(tuple !== ''){
    return tuple
  }

  return ['No Name Avail..', msg]
})
      

     //console.log(tupleArray);

//This is for group page persistance <- this might not matter
      if(this.state.stageMsgsToAdd.length !==0){
        tupleArray = [...this.state.stageMsgsToAdd, ...tupleArray]
      }

//This is for group page reload persistance <- this does matter

      if(this.props.stagedGroupMsgs.length !== 0){
        let tuplesForGroup =[];
        this.props.stagedGroupMsgs.forEach(tuple => {
          if(tuple[1].group === this.props.selectedGroup){
            tuplesForGroup.push(tuple);
          }
        })
        tupleArray = [...tuplesForGroup, ...tupleArray]
      }

      

      this.setState({
        msgsToDisplay: tupleArray,
        Loading:false,
      }
     ,()=>this.scrollToBottom()
      );
      
    })
    .catch((e) => { 
      console.error('Something went wrong:\n', e);

    this.setState({
      Loading:false,
    });

  })
    .finally(() => client.disconnect());
};

getDGTInvitesDocs= () => {
  console.log(`Calling get invites for ${this.props.selectedGroup}`)

  const clientOpts = {
    network: this.props.whichNetwork,
    wallet: { //I DON'T NEED THE WALLET FOR THIS, RIGHT?
      mnemonic:
        this.props.mnemonic,
      unsafeOptions: {
        skipSynchronizationBeforeHeight: this.props.mostRecentBlockHeight,
      },
    },
    apps: {
      DGTContract: { //changed tutorialContract TO DashGetTogetherContract
        contractId: this.props.DataContractDGT, // Your contract ID
      },
    },
  };
  const client = new Dash.Client(clientOpts);

  //DGTInvites Query ->
  const getInvites = async () => {
    return client.platform.documents.get('DGTContract.dgtinvite', {
        limit:60,
      where: [
            ['group', '==', this.props.selectedGroup],
            ['dgt', '==', 'self']],
    });
  };

  getInvites()
    .then((d) => {

      if(d.length ===0){
        console.log('There are no invites.')
  this.setState({
    LoadingMembers:false,
  });
      }else{

      let docArray = [];
      for (const n of d) {
         console.log("Document:\n", n.toJSON());
        docArray = [...docArray, n.toJSON()];
      }

      this.getNamesforDGTInvites(docArray);
    }


    })
    .catch((e) => console.error("Something went wrong:\n", e))
    //need to setState to handle Error and set isLoadingEveryone to false
    .finally(() => client.disconnect());
}

getNamesforDGTInvites = (msgArr) => {

  let ownerarrayOfOwnerIds = msgArr.map(doc => {
    return doc.$ownerId;
  });

  let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

  let arrayOfOwnerIds =[...setOfOwnerIds];

  arrayOfOwnerIds = arrayOfOwnerIds.map(item => Buffer.from(Identifier.from(item)))

  console.log('Calling getNamesforDGTInvites');

  const clientOpts = {
    network: this.props.whichNetwork,
    wallet: {
      mnemonic:
        this.props.mnemonic,
      
      unsafeOptions: {
        skipSynchronizationBeforeHeight: this.props.mostRecentBlockHeight,
        //change to what the actual block height
      },
    },
    apps: {
      DPNS: {
        contractId: this.props.DataContractDPNS, 
      },
    },
  };
  const client = new Dash.Client(clientOpts);

  const getNameDocuments = async () => {
    return client.platform.documents.get(
      'DPNS.domain',
      {
        where: [
          [
            'records.dashUniqueIdentityId',
            'in', arrayOfOwnerIds
          ],
        ],
        orderBy: [
          ['records.dashUniqueIdentityId', 'asc'],
        ],
      },
    );
  };

  getNameDocuments()
    .then((d) => {

      //WHAT IF THERE ARE NO NAMES?
      if(d.length === 0){
        console.log('No DPNS domain documents retrieved.')
      }

      let nameDocArray = [];

      for (const n of d) {

        console.log('NameDoc:\n', n.toJSON());

        nameDocArray = [n.toJSON(), ...nameDocArray]; 
      }
      console.log(nameDocArray);

      let tupleArray= []; //<- Final array

        // My 2 arrays are: nameDocArray and msgArr
//There may not be very many name docs because same author for lots of msgs..

tupleArray = msgArr.map(msg => {

  let tuple = '';

  for(let nameDoc of nameDocArray){
    if(nameDoc.$ownerId === msg.$ownerId){
      tuple =  [nameDoc.label, msg]
      break
    }
  }
  if(tuple !== ''){
    return tuple
  }

  return ['No Name Avail..', msg]
})
      //HAVE TO SORT THE MSGS AND NAMES TOGETHER BC THEY DON'T COME TOGETHER WELL.

      console.log('Tuple!');
      console.log(tupleArray);
      
      this.setState({
        groupMembers: tupleArray,
        LoadingMembers:false,
      })

      
    })
    .catch((e) => { 
      console.error('Something went wrong:\n', e);

    this.setState({
      LoadingMembers:false,
    });

  })
    .finally(() => client.disconnect());
};

componentDidMount() {
  
this.getDGTMessagesDocs();
this.getDGTInvitesDocs();

}

  render() {
   
    let messages = [];

if(this.state.msgsToDisplay.length !== 0){

// WILL NEED TO SEPARATE OUT FOR INDIVIDUAL MSG TO ADD STATE AND ALLOW EDIT AND TAG NAME AND TIPPING!!
let d = Date.now();

     messages = this.state.msgsToDisplay.map(
      (msg, index) => {
        return (
          
          <GroupPageMsg
          key={index}
          mode={this.props.mode} 
          index={index} 
          msg = {msg}
          date = {d}
          uniqueName={this.props.uniqueName}
          />
          
        );
      }
    );
}


    return (
<>
      {this.state.isModalShowing &&
        this.state.presentModal === "NewMessageModal" ? (
          <NewMessageModal
            submitDGTmessage={this.submitDGTmessage}
            selectedGroup={this.props.selectedGroup}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "SendInviteModal" ? (
          <SendInviteModal
            submitDGTinvite={this.submitDGTinvite}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

{this.state.isModalShowing &&
        this.state.presentModal === "ViewMembersModal" ? (
          <ViewMembersModal
          LoadingMembers={this.state.LoadingMembers}
          groupMembers={this.state.groupMembers}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}



      
      
      <Navbar sticky="top" className="cardTitle"
      style={{paddingLeft: '2%',paddingRight: '2%',}}
          bg={this.props.mode}
        variant={this.props.mode} >
          

          {/* <Nav  className="one-level-nav">
            </Nav> */}
            
        
      {/* <span  onClick={() => this.props.hideGroupPage()}>🔙</span> */}
      <Button
            variant="primary"
            onClick={() => this.props.hideGroupPage()}
          >Back</Button>

          <h3>{this.props.selectedGroup}</h3>
          
          <Button
            variant="primary"
            onClick={() => this.showModal('ViewMembersModal')}
          >Members</Button>
          
          </Navbar>

          <p> </p>

          <div id="bodytext">
     

          {this.state.msgsToDisplay.length === 0 && !this.state.Loading?
          <p>There are no messages available for this group.</p>
        :<></>}
        
              {/* <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                  onClick={() => {
                    this.handledisplayGroupMembers();
                  }}
                >
                  <b>{this.props.selectedGroupChat.name}</b>
                  <Badge className="paddingBadge" bg="light" text="dark" pill>
                    {this.props.selectedGroupChat.owner}
                  </Badge>
                </Dropdown.Toggle>
              </Dropdown> */}

          {/* <Collapse in={this.state.displayGroupMembers}>
            <div id="example-collapse-text" className="indentMembers">
              <h4>{this.props.selectedGroupChat.name} Members</h4>
              <ul>
                {this.props.selectedGroupChat.members.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
          </Collapse> */}

          {this.state.Loading ? (
            <div id="shoutOutSpinner">
              <p></p>
              <Spinner animation="border">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p></p>
            </div>
          ) : (
            <>

<div className="d-grid gap-2" id="cardtext">
                {messages.reverse()}  

                </div>
    
<p></p>
{/* https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react */}
    <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
              
        </div>
        <p></p>


{this.state.LoadingInvite ? 
        <div id="shoutOutSpinner">
        <p></p>
        <Spinner animation="border">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p></p>
      </div>
      :
      <>
      </>
      }  

{this.state.LoadingMsg ? 
            <div id="shoutOutSpinner">
              <p></p>
              <Spinner animation="border">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p></p>
            </div>
            :
            <></>}

          {this.state.sentInviteSuccess ? (
              <>
                <p></p>
                <Alert variant="success" dismissible>
                  <Alert.Heading>Invite Sent!</Alert.Heading>
                  You have successfully invited{" "}
                   <b>{this.state.sendToName}!</b>
                </Alert>
              </>
            ) : (
              <></>
            )}

{this.state.sentInviteError ? (
              <>
                <p></p>
                <Alert variant="danger" dismissible>
                  <Alert.Heading>Invite Error</Alert.Heading>
                  Invite failed to send. You may have insufficient credits or there may have been a platform error.
                </Alert>
              </>
            ) : (
              <></>
            )}

{this.state.sentMsgError ? (
              <>
                <p></p>
                <Alert variant="danger" dismissible>
                  <Alert.Heading>Message Error</Alert.Heading>
                  Message failed to send. You may have insufficient credits or there may have been a platform error.
                </Alert>
              </>
            ) : (
              <></>
            )}
            </>
          )}
        </div>
        <GroupBottomNav 
                submitDGTinvite={this.submitDGTinvite}
          selectedGroup={this.props.selectedGroup}
          deleteGroup={this.props.deleteGroup}
          mode={this.props.mode}
          showModal={this.showModal}
          showDeleteModal={this.props.showDeleteModal}
          Loading={this.state.Loading}
          />
      </>
    );
  }
}

export default GroupPage;
