import React from "react";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import CreditsOnPage from "../CreditsOnPage";
//import "./InvitesPage.css";

class GroupsPage extends React.Component {
  handleTimeToDate = (timeObject) => {
    let date = new Date(timeObject);
    //let longFormDate= setTime(date);
    return date.toLocaleDateString();
  };

  render() {
    let acceptedInvites = [];
    let extraInvites = [];
    let othersInvites = [];

    this.props.dgtInvites.forEach((invite) => {
      if (invite.dgt === "self") {
        acceptedInvites.push(invite);
      } else {
        // if (invite.toId !== invite.$ownerId) {
        extraInvites.push(invite);
        //  }
      }
    });

    for (invite of extraInvites) {
      let selfInvite = acceptedInvites.find((inv) => {
        return inv.group === invite.group;
      });
      if (selfInvite === undefined) {
        othersInvites.push(invite);
      }
    }

    let acceptedInvitesButtons = <></>;
    let othersInvitesButtons = <></>;

    acceptedInvitesButtons = acceptedInvites.map((acceptedGroup, index) => {
      return (
        <Button
          key={index}
          variant="primary"
          onClick={() => this.props.showGroupPage(acceptedGroup.group)}
        >
          {acceptedGroup.group}
          <Badge className="createwalletbtn" bg="light" text="dark" pill>
            {this.handleTimeToDate(acceptedGroup.$createdAt)}
          </Badge>
        </Button>
      );
    });

    let tupleArray = [];

    tupleArray = othersInvites.map((invite) => {
      let tuple = "";

      for (let nameDoc of this.props.dgtInvitesNames) {
        if (nameDoc.$ownerId === invite.$ownerId) {
          tuple = [nameDoc.label, invite];
          break;
        }
      }
      if (tuple !== "") {
        return tuple;
      }

      return ["No Name Avail..", invite];
    });

    othersInvitesButtons = tupleArray.map((othersInvite, index) => {
      return (
        <Button
          key={index}
          variant="primary"
          onClick={() =>
            this.props.handleSelectedJoinGroup(tupleArray[1].group)
          }
        >
          {tupleArray[1].group}
          <Badge className="createwalletbtn" bg="light" text="dark" pill>
            {tupleArray[0]}
          </Badge>
        </Button>
      );
    });

    recentGroupsButtons = this.props.dgtActiveGroups.map(
      (recentGroup, index) => {
        return (
          <Button
            key={index}
            variant="primary"
            onClick={() =>
              this.props.handleSelectedJoinGroup(recentGroup.group)
            }
          >
            {recentGroup.group}
            <Badge className="createwalletbtn" bg="light" text="dark" pill>
              {handleTimeToDate(recentGroup.$createdAt)}
            </Badge>
          </Button>
        );
      }
    );

    return (
      <>
        <p></p>
        <div id="bodytext">
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />
          {this.props.isLoadingGroupInvite ? (
            <>
              <p></p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </>
          ) : (
            <></>
          )}
          {/* PUT THE ALERT HERE!! */}

          {/* Copy how other pages are done. */}

          <h3>Your Groups</h3>

          {this.props.isLoadingGroups ? (
            <>
              <p></p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </>
          ) : (
            <></>
          )}

          {/* isLoadingGroups: true, //Invite Pull, Active(Msgs) Pull, creating Group, sending invite, deleting group, accepting invite
      isLoadingGroup: false, // Msgs Pull, Members pull, sending msg,

      isLoadingGroupsActive: true, //Separate spinner for Active so not lumped in with Groups.

      isLoadingGroupInvite: false, //Control and alert in Groups and on GroupPage because that is the only way you will know if an invite was sent. */}

          {/* ADD AN ALERT FOR INVITE SUBMITTING ->  */}

          {!this.props.isLoadingGroups && acceptedInvites.length === 0 ? (
            <>Groups, you have joined or create will appear here!</>
          ) : (
            <></>
          )}

          {!this.props.isLoadingGroups ? (
            <>
              <div className="d-grid gap-2">{acceptedInvitesButtons}</div>
              <p></p>
              <h3>Your Invites</h3>

              <div className="d-grid gap-2">{othersInvitesButtons}</div>
            </>
          ) : (
            <></>
          )}

          {!this.props.isLoadingGroups &&
          this.props.othersInvites.length === 0 ? (
            <>Invites sent to you will appear here!</>
          ) : (
            <></>
          )}

          {!this.props.isLoadingGroupsActive && !this.props.isLoadingGroups ? (
            <>
              <p></p>
              <h3>Active Groups</h3>

              <div className="d-grid gap-2">{recentGroupsButtons}</div>
            </>
          ) : (
            <></>
          )}

          {!this.props.isLoadingGroupsActive &&
          !this.props.isLoadingGroups &&
          this.props.dgtActiveGroups.length === 0 ? (
            <>Groups with recent activity appear here!</>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default GroupsPage;
