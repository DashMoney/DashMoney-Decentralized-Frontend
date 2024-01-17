import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

class JoinGroupModal extends React.Component {

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleGroupJoining =() => {
    this.props.submitCreateGroup(this.props.selectedGroup);
    this.props.hideModal();
  }


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


    return (
      <>
        <Modal show={this.props.isModalShowing} contentClassName={modalBkg}>
          <Modal.Header>
            <Modal.Title><b>Join Group</b></Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            Join {this.props.selectedGroup}?
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleGroupJoining()}>
              Join Group
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default JoinGroupModal;
