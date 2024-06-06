import React from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import YourRide from "./YourRide";

class YourRides extends React.Component {
  //Dont need a constructor because gets data from app.js this is just to display
  /**
   * 1) So the tabs and credits appear at the top
   * 2) like DGP -> button that says add post
   * 3)
   */

  render() {
    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let rides = this.props.YourRides.map((ride, index) => {
      //console.log(item);
      return (
        <YourRide
          today={today}
          yesterday={yesterday}
          key={index}
          identity={this.props.identity}
          uniqueName={this.props.uniqueName}
          mode={this.props.mode}
          isLoadingWallet={this.props.isLoadingWallet}
          accountHistory={this.props.accountHistory}
          index={index}
          ride={ride}
          YourRideReplies={this.props.YourRideReplies}
          YourRideReplyNames={this.props.YourRideReplyNames}
          YourRideReplyAddresses={this.props.YourRideReplyAddresses}
          handleConfirmYourDriverModal={this.props.handleConfirmYourDriverModal}
          handleEditYourRide={this.props.handleEditYourRide}
          handleDeleteYourRide={this.props.handleDeleteYourRide}
          handlePayDriver={this.props.handlePayDriver}
          isYourRidesRefreshReady={this.props.isYourRidesRefreshReady}
          refreshYourRides={this.props.refreshYourRides}
          handleYourRideMsgModalShow={this.props.handleYourRideMsgModalShow}
        />
      );
    });

    return (
      <>
        <p></p>
        {this.props.isLoadingYourRides ? (
          <>
            <div id="spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </>
        ) : (
          <>
            {/* <div className="d-grid gap-2">
              <Button
                variant="primary"
                onClick={() => this.props.showModal("CreateRideModal")}
              >
                <b>Create Post</b>
              </Button>
            </div> */}
            <p></p>

            {this.props.YourRides.length === 0 ? (
              <>
                <p style={{ textAlign: "center" }}>
                  (This is where your rides will appear)
                </p>
              </>
            ) : (
              <div className="footer">{rides}</div>
            )}
          </>
        )}
      </>
    );
  }
}

export default YourRides;
