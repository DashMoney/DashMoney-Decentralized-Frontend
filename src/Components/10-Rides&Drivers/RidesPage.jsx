import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import CreditsOnPage from "../CreditsOnPage";

class RidesPage extends React.Component {
  // componentDidMount() {
  //   if (this.props.isLoginComplete && this.props.InitialPullRides) {
  //     this.props.pullInitialTriggerRIDES();
  //   }
  // }
  render() {
    return (
      <>
        <div className="bodytext">
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />
          <p></p>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={() => this.props.showModal("CreateRideModal")}
            >
              <b style={{ fontSize: "larger" }}>Request Ride</b>
            </Button>
          </div>
          {/* <YourRideRequests
//ALL STATE MUST BE IN APP.JS <-
  YourOffers={this.props.YourOffers}
  identity={this.props.identity}
  uniqueName={this.props.uniqueName}
  handleYourOffer={this.props.handleYourOffer}
  handleDeleteYourOffer={this.props.handleDeleteYourOffer}
  mode={this.props.mode}
  isLoadingYourOffers={this.props.isLoadingYourOffers}
/> */}
        </div>
      </>
    );
  }
}

export default RidesPage;
