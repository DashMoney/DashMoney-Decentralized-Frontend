import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import CloseButton from 'react-bootstrap/CloseButton';

class DeleteEditGroupModal extends React.Component {

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleGroupsEdit = () => {
    
    this.props.handleExpandedNavs("TopNav");
    this.handleCloseClick();
  }


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

    let groupChatButtons = <></>

    if(this.props.dsoMemberDocIsAvail){

    groupChatButtons = this.props.dsoMemberDoc.GroupsJoined.map((group,index)=>{
      return(
        
        <h4 key={index}>
        <Badge variant="primary">
          <CloseButton/>
              {group.name}
              <Badge className="createwalletbtn"
               bg="light" text="dark" pill>
                {group.owner}
              </Badge>
              </Badge></h4>
       
      );
    });
  }

    return (
      <>
        <Modal show={this.props.isModalShowing}
        contentClassName={modalBkg}>
        <Modal.Header >
          <Modal.Title>Edit My Groups</Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-2">

        {groupChatButtons}


          </div>
          <p></p>
          <div className="text-muted">
                    <ul>
                      <li>
                        This is where you could hit the <b>X</b>, and it would delete the group. This is currently not implemented.
                      </li>
                      <li>
                        Also, what you do not see here currently, is the ability to select groups that you have created, and you would be able to modify the name or members or delete altogether.
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

export default DeleteEditGroupModal;
