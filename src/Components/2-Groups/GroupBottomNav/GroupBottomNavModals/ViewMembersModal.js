
import Spinner from "react-bootstrap/Spinner";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from 'react-bootstrap/CloseButton';

class ViewMembersModal extends React.Component {

  handleCloseClick = () => {
    this.props.hideModal();
  };



  render() {
    let modalBkg = "";
    let closeButtonColor;
    
    if(this.props.mode === "primary"){
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick}/>
    }else{
      modalBkg = "modal-backcolor-dark";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} variant="white"/>
    }
    let members = this.props.groupMembers.map((member, index)=>{
      return <div key={index} >{member[0]}</div>

    })

    return (
      <>
        <Modal show={this.props.isModalShowing}
        contentClassName={modalBkg}>
        <Modal.Header >
          <Modal.Title>Members</Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>

        {this.props.LoadingMembers ? 
        <div id="shoutOutSpinner">
        <Spinner animation="border">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p></p>
      </div>
      :
      <>
      {members}
      </>
      }  

         

        </Modal.Body>

        <Modal.Footer>
        <Button variant="primary" onClick={this.handleCloseClick}>
              Close
            </Button>
        </Modal.Footer>
      </Modal>
      </> 
    );
  }
}

export default ViewMembersModal;
