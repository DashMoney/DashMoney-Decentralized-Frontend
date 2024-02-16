//
//This is a button but also could tell you if you already have joined the group/event

//What does it need passed to it? ->
//dgtInvites
//  handleSelectedJoinGroup = (groupName) => {
//  this.props.dgtInvites
//  event -> passed through component
// isLoading -> which one to protect?

import React from "react";
import Button from "react";

import Spinner from "react-bootstrap/Spinner";

class JoinEventComponent extends React.Component {
  render() {
    let joined = true;
    let myGroups = []; //array of group names

    if (!this.props.isLoadingGroupEvents && this.props.isLoginComplete) {
      this.props.dgtInvitesForEvents.forEach((invite) => {
        if (invite.dgt === "self") {
          myGroups.push(invite.group);
        }
      });
    }

    joined = myGroups.includes(this.props.event.group);

    return (
      <>
        {this.props.isLoginComplete ? (
          <>
            {this.props.isLoadingGroupEvents ? (
              <>
                <p></p>
                <div id="spinner">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
                <p></p>
              </>
            ) : (
              <>
                {joined ? (
                  <>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        //handleSelectedJoinGroup(groupName)
                        //
                        // onClick={() =>
                        //   this.props.showModal("JoinGroupModal")
                        // }  // I think there is a function that I pass the group name as a parameter ->
                      >
                        <b>Join {this.props.event.group}</b>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <b>{this.props.event.group} joined!</b>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <b>{this.props.event.group}</b>
          </>
        )}
      </>
    );
  }
}

export default JoinEventComponent;
