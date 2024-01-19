import React from "react";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import CreditsOnPage from "../CreditsOnPage";
//import "./InvitesPage.css";

//STarts with the invite page and then shifts to the group
class GroupsPage extends React.Component {
  handleTimeToDate = (timeObject) => {
    let date = new Date(timeObject);
    //let longFormDate= setTime(date);
    return date.toLocaleDateString();
  };

  //Below for sortOutInvites -> Pass dgtRawInvites -> AND Don't need a function this should just be handled in render ->

  // sortOutInvites = (inviteArray) => {
  //   //Invites sorted but if $ownerId === toId create a separate array for and set both to state
  //   //Go through array one at a time and push to two new separate arrays
  //   let acceptedInvites = [];
  //   let othersInvites = [];

  //   inviteArray.forEach((invite) => {
  //     if (invite.dgt === "self") {
  //       acceptedInvites.push(invite);
  //     } else {
  //       if (invite.toId !== invite.$ownerId) {
  //         othersInvites.push(invite);
  //       }
  //     }
  //   });

  //   let groupNamesOfAccepted = acceptedInvites.map((invite) => {
  //     return invite.group;
  //   });

  //   //BELOW removes deleted groups , if Deleted Groups
  //   if (this.state.stagedRemovedInvitesNames.length !== 0) {
  //     let mutableArray = acceptedInvites;

  //     this.state.stagedRemovedInvitesNames.forEach((name) => {
  //       if (groupNamesOfAccepted.includes(name)) {
  //         let groupIndex = groupNamesOfAccepted.indexOf(name);
  //         // console.log('groupIndex', groupIndex);

  //         mutableArray.splice(groupIndex, 1);
  //       }
  //     });

  //     acceptedInvites = mutableArray;
  //   }

  //   //Below Remove from othersInvites, if Added Group
  //   let othersInvitesUnique = [];

  //   othersInvites.forEach((invite) => {
  //     if (!groupNamesOfAccepted.includes(invite.group)) {
  //       othersInvitesUnique.push(invite);
  //     }
  //   });

  //   this.setState(
  //     {
  //       dgtAcceptedInvites: acceptedInvites,
  //       //isLoadingRecentTab: true, //Only bc free setState and will be calling -> Not implementing RecentTab ->
  //     },
  //     () => this.getNamesforDGTinvites(othersInvitesUnique)
  //   );
  // };

  render() {
    // addGroup = (groupName) => {
    //   //just a name

    //   // To handle if you joined a group to remove from Your invites
    //   let namesOfGroups = this.state.othersInvitesToDisplay.map((invite) => {
    //     return invite[1].group;
    //   });

    //   if (namesOfGroups.includes(groupName)) {
    //     let groupIndex = namesOfGroups.indexOf(groupName);
    //     console.log("groupIndex", groupIndex);

    //     let mutableArray = this.state.othersInvitesToDisplay;
    //     mutableArray.splice(groupIndex, 1);

    //     this.setState({
    //       othersInvitesToDisplay: mutableArray,
    //     });
    //   }

    //   // ^^^ To handle if you joined a group to remove from Your invites

    //   let group = {
    //     group: groupName,
    //     $createdAt: Date.now(),
    //   };

    //   this.setState({
    //     dgtAcceptedInvites: [group, ...this.state.dgtAcceptedInvites],
    //   });

    // };

    let acceptedInvitesButtons = <></>;
    let othersInvitesButtons = <></>;

    acceptedInvitesButtons = this.props.dgtAcceptedInvites.map(
      (acceptedGroup, index) => {
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
      }
    );

    othersInvitesButtons = this.props.othersInvitesToDisplay.map(
      (othersInvite, index) => {
        return (
          <Button
            key={index}
            variant="primary"
            onClick={() =>
              this.props.handleSelectedJoinGroup(othersInvite[1].group)
            }
          >
            {othersInvite[1].group}
            <Badge className="createwalletbtn" bg="light" text="dark" pill>
              {othersInvite[0]}
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
          {/* BELOW IS FOR USER LOADING, IDONT THINK I NEED ANYMORE */}
          {/* {this.props.isLoading ? ( //isLoadingGroups?? *****
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
          )} */}

          {/* Copy how other pages are done. */}

          <h3>Your Groups</h3>

          {/* {!this.props.isLoading && this.props.isLoadingRefresh ? (
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
          )} */}

          {!this.props.isLoading && // //isLoadingGroups?? *****
          this.props.dgtAcceptedInvites.length === 0 ? (
            <>Groups, you have joined or created will appear here!</>
          ) : (
            <></>
          )}

          {!this.props.isLoading ? ( //isLoadingGroups?? *****
            <>
              <div className="d-grid gap-2">{acceptedInvitesButtons}</div>
              <p></p>
              <h3>Your Invites</h3>

              {!this.props.isLoading && this.props.isLoadingOthersInvites ? (
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

              <div className="d-grid gap-2">{othersInvitesButtons}</div>
            </>
          ) : (
            <></>
          )}

          {!this.props.isLoading && //this.props.isLoadingOthersInvites
          this.props.othersInvitesToDisplay.length === 0 ? (
            <>Invites sent to you will appear here!</>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default GroupsPage;
