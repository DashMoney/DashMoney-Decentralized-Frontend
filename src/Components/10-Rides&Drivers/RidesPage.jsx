import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import CreditsOnPage from "../CreditsOnPage";

import YourRides from "./YourRides";

class RidesPage extends React.Component {
  componentDidMount() {
    if (this.props.isLoginComplete && this.props.InitialPullRides) {
      this.props.pullInitialTriggerRIDES();
    }
  }

  render() {
    return (
      <>
        <div className="bodytext">
          {/* <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          /> */}
          <p></p>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={() => this.props.showModal("CreateRideModal")}
            >
              <b style={{ fontSize: "larger" }}>Request Ride</b>
            </Button>
          </div>
          <YourRides
            YourRides={this.props.YourRides}
            YourRideReplies={this.props.YourRideReplies}
            YourRideReplyNames={this.props.YourRideReplyNames}
            identity={this.props.identity}
            uniqueName={this.props.uniqueName}
            handleConfirmYourDriverModal={
              this.props.handleConfirmYourDriverModal
            }
            handleEditYourRide={this.props.handleEditYourRide}
            handleDeleteYourRide={this.props.handleDeleteYourRide}
            mode={this.props.mode}
            isLoadingYourRides={this.props.isLoadingYourRides}
            isYourRidesRefreshReady={this.props.isYourRidesRefreshReady}
            refreshYourRides={this.props.refreshYourRides}
            handleYourRideMsgModalShow={this.props.handleYourRideMsgModalShow}
          />
        </div>
      </>
    );
  }
}

export default RidesPage;
