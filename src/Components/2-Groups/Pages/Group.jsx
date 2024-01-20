import React from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
//import Card from "react-bootstrap/Card";

import Navbar from "react-bootstrap/Navbar";

import ViewMembersModal from "../GroupBottomNav/GroupBottomNavModals/ViewMembersModal";
import NewMessageModal from "../GroupBottomNav/GroupBottomNavModals/NewMessageModal";
import SendInviteModal from "../GroupBottomNav/GroupBottomNavModals/SendInviteModal";

import GroupMsg from "./GroupMsg";

import GroupBottomNav from "../GroupBottomNav/GroupBottomNav";

import "./GroupPage.css";

const Dash = require("dash");

const {
  Essentials: { Buffer },
  PlatformProtocol: { Identifier },
} = Dash;

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadingMsgs: false,
      LoadingMembers: true,

      groupMembers: [], //add the app.js -> why?
      groupMembersNames: [],

      groupMsgs: [],
      groupMsgsNames: [],

      isModalShowing: false, //Why are the modals here? just put in app.js? why?
      presentModal: "",
    };
  }
  // //https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
      behavior: "instant",
      block: "start",
      inline: "nearest",
    });
  };

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

  //I THINK I CAN STILL DO THE BELOW STUFF HERE.. FOR NOW
  //This is just read from platform

  getDGTMessages = () => {
    // console.log(`Calling get messages for ${this.props.selectedGroup}`);

    const clientOpts = {
      network: this.props.whichNetwork,
      apps: {
        DGTContract: {
          //changed tutorialContract TO DashGetTogetherContract
          contractId: this.props.DataContractDGT, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getMessages = async () => {
      return client.platform.documents.get("DGTContract.dgtmsg", {
        limit: 90,
        where: [
          ["group", "==", this.props.selectedGroup],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getMessages()
      .then((d) => {
        if (d.length === 0) {
          this.setState({
            LoadingMsgs: false,
          });
        } else {
          let docArray = [];
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [n.toJSON(), ...docArray];
          }

          this.getDGTMsgsNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))

      .finally(() => client.disconnect());
  };

  getDGTMsgsNames = (msgArr) => {
    //console.log("Calling getDGTMsgsNames");

    const clientOpts = {
      network: this.props.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.props.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //arrayOfOwnerIds = arrayOfOwnerIds.map((item) => Buffer.from(Identifier.from(item)));

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            groupMsgs: msgArr,
            groupMsgsNames: nameDocArray,
            LoadingMsgs: false,
          },
          () => this.scrollToBottom()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);

        this.setState({
          LoadingMsgs: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getDGTInvites = () => {
    console.log(`Calling get invites for ${this.props.selectedGroup}`);

    const clientOpts = {
      network: this.props.whichNetwork,
      apps: {
        DGTContract: {
          //changed tutorialContract TO DashGetTogetherContract
          contractId: this.props.DataContractDGT, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DGTInvites Query ->
    const getInvites = async () => {
      return client.platform.documents.get("DGTContract.dgtinvite", {
        limit: 60,
        where: [
          ["group", "==", this.props.selectedGroup],
          ["dgt", "==", "self"],
        ],
      });
    };

    getInvites()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no invites.");
          this.setState({
            LoadingMembers: false,
          });
        } else {
          let docArray = [];
          for (const n of d) {
            console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          this.getNamesforDGTInvites(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getNamesforDGTInvites = (msgArr) => {
    let ownerarrayOfOwnerIds = msgArr.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    console.log("Calling getNamesforDGTInvites");

    const clientOpts = {
      network: this.props.whichNetwork,
      // wallet: {
      //   mnemonic:
      //     this.props.mnemonic,

      //   unsafeOptions: {
      //     skipSynchronizationBeforeHeight: this.props.skipSynchronizationBeforeHeight,
      //     //change to what the actual block height
      //   },
      // },
      apps: {
        DPNS: {
          contractId: this.props.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES?
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        console.log(nameDocArray);

        let tupleArray = []; //<- Final array

        // My 2 arrays are: nameDocArray and msgArr
        //There may not be very many name docs because same author for lots of msgs..

        tupleArray = msgArr.map((msg) => {
          let tuple = "";

          for (let nameDoc of nameDocArray) {
            if (nameDoc.$ownerId === msg.$ownerId) {
              tuple = [nameDoc.label, msg];
              break;
            }
          }
          if (tuple !== "") {
            return tuple;
          }

          return ["No Name Avail..", msg];
        });
        //HAVE TO SORT THE MSGS AND NAMES TOGETHER BC THEY DON'T COME TOGETHER WELL.

        console.log("Tuple!");
        console.log(tupleArray);

        this.setState({
          groupMembers: tupleArray,
          LoadingMembers: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);

        this.setState({
          LoadingMembers: false,
        });
      })
      .finally(() => client.disconnect());
  };

  componentDidMount() {
    this.getDGTMessages();
    this.getDGTInvites();
  }

  render() {
    let messages = [];

    if (this.state.groupMsgs.length !== 0) {
      let today = new Date(); //Date.now(); <= Wrong
      let yesterday = new Date(today);

      yesterday.setDate(yesterday.getDate() - 1);

      messages = this.state.groupMsgs.map((msg, index) => {
        return (
          <GroupMsg
            key={index}
            mode={this.props.mode}
            index={index}
            msg={msg}
            names={this.state.groupMsgsNames}
            //date={d}
            today={today}
            yesterday={yesterday}
            uniqueName={this.props.uniqueName}
          />
        );
      });
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
            mode={this.state.mode} //mode shouldnt be
          />
        ) : (
          <></>
        )}

        <Navbar
          sticky="top"
          className="cardTitle"
          style={{ paddingLeft: "2%", paddingRight: "2%" }}
          bg={this.props.mode}
          variant={this.props.mode}
        >
          {/* <Nav  className="one-level-nav">
            </Nav> */}

          {/* <span  onClick={() => this.props.hideGroupPage()}>🔙</span> */}
          <Button variant="primary" onClick={() => this.props.hideGroupPage()}>
            Back
          </Button>

          <h3>{this.props.selectedGroup}</h3>

          <Button
            variant="primary"
            onClick={() => this.showModal("ViewMembersModal")}
          >
            Members
          </Button>
        </Navbar>

        <p> </p>

        <div id="bodytext">
          {this.state.groupMsgs.length === 0 && !this.state.LoadingMsgs ? (
            <p>There are no messages available for this group.</p>
          ) : (
            <></>
          )}

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

          {this.state.LoadingMsgs ? (
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
              <div
                style={{ float: "left", clear: "both" }}
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              ></div>
              <p></p>

              {/* DIFFERENT ISLOADING STATE PASSED DOWN, CHANGE BELOW */}

              {this.state.LoadingInvite ? (
                <div id="shoutOutSpinner">
                  <p></p>
                  <Spinner animation="border">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p></p>
                </div>
              ) : (
                <></>
              )}

              {/* DIFFERENT ISLOADING STATE PASSED DOWN, CHANGE BELOW */}

              {this.state.LoadingMsgs ? (
                <div id="shoutOutSpinner">
                  <p></p>
                  <Spinner animation="border">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p></p>
                </div>
              ) : (
                <></>
              )}

              {/* DIFFERENT SUCCESS STATE PASSED DOWN, CHANGE BELOW */}

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

              {/* DIFFERENT FAILURE STATE PASSED DOWN, CHANGE BELOW */}
              {this.state.sentInviteError ? (
                <>
                  <p></p>
                  <Alert variant="danger" dismissible>
                    <Alert.Heading>Invite Error</Alert.Heading>
                    Invite failed to send. You may have insufficient credits or
                    there may have been a platform error.
                  </Alert>
                </>
              ) : (
                <></>
              )}

              {/* DIFFERENT FAILURE STATE PASSED DOWN, CHANGE BELOW */}
              {this.state.sentMsgError ? (
                <>
                  <p></p>
                  <Alert variant="danger" dismissible>
                    <Alert.Heading>Message Error</Alert.Heading>
                    Message failed to send. You may have insufficient credits or
                    there may have been a platform error.
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
          LoadingMsgs={this.state.LoadingMsgs}
          LoadingInvites={this.state.LoadingMembers}
        />
      </>
    );
  }
}

export default Group;
