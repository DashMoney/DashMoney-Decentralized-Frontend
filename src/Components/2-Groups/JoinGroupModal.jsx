import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import CloseButton from "react-bootstrap/CloseButton";

import MemberComponent from "./MemberComponent";

import Dash from "dash";

const {
  Essentials: { Buffer },
  PlatformProtocol: { Identifier },
} = Dash;

class JoinGroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadingMembers: true,
      groupMembers: [],
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleGroupJoining = () => {
    this.props.submitCreateGroup(this.props.selectedGroup);
    this.props.hideModal();
  };

  getDGTInvites = () => {
    //console.log(`Calling get invites for ${this.props.selectedGroup}`);

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
        limit: 80,
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
            // console.log("Document:\n", n.toJSON());
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

    //console.log("Calling getNamesforDGTInvites");

    const clientOpts = {
      network: this.props.whichNetwork,
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
          //   console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        // console.log(nameDocArray);

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

        //console.log("Tuple!");
        //console.log(tupleArray);

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
    this.getDGTInvites();
  }

  render() {
    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;

    if (this.props.mode === "primary") {
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBackdrop = "modal-backdrop-dark";
      //modalBkg = "modal-backcolor-dark";
      modalBkg = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    let members = this.state.groupMembers.map((tuple, index) => {
      return <MemberComponent index={index} key={index} member={tuple} />;
    });

    return (
      <>
        <Modal show={this.props.isModalShowing} contentClassName={modalBkg}>
          <Modal.Header>
            <Modal.Title>
              <b>Join Group</b>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  this.handleGroupJoining();
                }}
              >
                <b>Join {this.props.selectedGroup}</b>
              </Button>
            </div>
            <p></p>
            {this.state.LoadingMembers ? (
              <div id="spinner">
                <Spinner animation="border">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p></p>
              </div>
            ) : (
              <>
                {members}
                <p></p>
              </>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleCloseClick()}>
              <b>Cancel</b>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default JoinGroupModal;
