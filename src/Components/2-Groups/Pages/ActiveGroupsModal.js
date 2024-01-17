import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

class JoinGroupModal extends React.Component {
  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleGroupsEdit = () => {
    this.props.handleExpandedNavs("TopNav");
    this.handleCloseClick();
  };

  render() {
    let modalBkg = "";
    let closeButtonColor;

    if (this.props.mode === "primary") {
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBkg = "modal-backcolor-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    let groupChats = [
      { name: "Bitcoin Friends", owner: "Satoshi" },
      { name: "Local Meetup", owner: "John Doe" },
    ];

    let groupChatButtons = groupChats.map((group, index) => {
      return (
        <Button key={index} variant="primary">
          {group.name}
          <Badge className="createwalletbtn" bg="light" text="dark" pill>
            {group.owner}
          </Badge>
        </Button>
      );
    });

    return (
      <>
        <Modal show={this.props.isModalShowing} contentClassName={modalBkg}>
          <Modal.Header>
            <Modal.Title>Join Groups</Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>

            <div className="d-grid gap-2">{groupChatButtons}</div>

            <p></p>
            <div className="text-muted">
              <ul>
                <li>
                  This is where you could add Groups created by others to your <b>My Groups</b>. This is currently not implemented.
                </li>
                <li>
                  The way this works is the DashGetTogether dapp queries your DashPay Contacts for DashGetTogether Group Documents that you have been added as a Member of.
                </li>
              </ul>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => this.props.hideModal()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default JoinGroupModal;
