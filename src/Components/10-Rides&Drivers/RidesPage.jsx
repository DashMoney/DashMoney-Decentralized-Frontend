import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import CreditsOnPage from "../CreditsOnPage";

import handleDenomDisplay from "../UnitDisplay";

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
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />
          <div id="sidetextonlysides">
            {this.props.isLoadingWallet ? (
              <>
                <div className="paddingBadge">
                  <b>Wallet Balance</b>

                  <h4>Loading..</h4>
                </div>
              </>
            ) : (
              <>
                <div className="paddingBadge">
                  <div className="cardTitle">
                    <div>
                      <b>Wallet Balance</b>
                      <h4 style={{ color: "#008de4" }}>
                        <b>
                          {handleDenomDisplay(
                            this.props.whichNetwork,
                            this.props.accountBalance,
                            1
                          )}
                        </b>
                      </h4>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => this.props.showModal("WalletTXModal")}
                    >
                      <b>Wallet TXs</b>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
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
            whichNetwork={this.props.whichNetwork}
            YourRides={this.props.YourRides}
            YourRideReplies={this.props.YourRideReplies}
            YourRideReplyNames={this.props.YourRideReplyNames}
            YourRideReplyAddresses={this.props.YourRideReplyAddresses}
            identity={this.props.identity}
            uniqueName={this.props.uniqueName}
            handleConfirmYourDriverModal={
              this.props.handleConfirmYourDriverModal
            }
            handleEditYourRide={this.props.handleEditYourRide}
            handleDeleteYourRide={this.props.handleDeleteYourRide}
            handlePayDriver={this.props.handlePayDriver}
            isLoadingWallet={this.props.isLoadingWallet}
            accountHistory={this.props.accountHistory}
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
