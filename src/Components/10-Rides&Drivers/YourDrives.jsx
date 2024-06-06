import React from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import YourDrive from "./YourDrive";

class YourDrives extends React.Component {
  render() {
    //DRIVES THAT ARE NOT REPLY THREADS
    let acceptedDrives = this.props.YourDrives.filter((drive) => {
      return drive.amt !== 0;
    });

    let drives = acceptedDrives.map((drive, index) => {
      //console.log(drive);
      //
      //need the reply to know if no req/ req removed
      // handled in YourDrive -> go there
      //
      return (
        <YourDrive
          key={index}
          uniqueName={this.props.uniqueName}
          identity={this.props.identity}
          mode={this.props.mode}
          isLoadingWallet={this.props.isLoadingWallet}
          accountHistory={this.props.accountHistory}
          index={index}
          drive={drive}
          rideReplies={this.props.YourDrives} //rideReplies
          rideRequests={this.props.YourDrivesRequests} //rideRequest
          rideRequestsNames={this.props.YourDrivesRequestsNames}
          rideRequestsReplies={this.props.YourDrivesRequestsReplies}
          isYourDrivesRefreshReady={this.props.isYourDrivesRefreshReady}
          refreshYourDrives={this.props.refreshYourDrives}
          handleYourDriveMsgModalShow={this.props.handleYourDriveMsgModalShow}
        />
      );
    });

    return (
      <>
        {this.props.dgmDocuments.length === 0 &&
        this.props.WALLET_Login7 &&
        !this.props.isLoadingButtons_WALLET ? (
          <>
            <div className="d-grid gap-2" style={{ margin: "1rem" }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => this.props.showModal("RegisterDGMModal")}
              >
                <b>Enable Pay-to-Name</b>
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}

        {this.props.dgmDocuments.length === 0 &&
        this.props.WALLET_Login7 &&
        this.props.isLoadingButtons_WALLET ? (
          <>
            <div className="d-grid gap-2" style={{ margin: "1rem" }}>
              <Button variant="primary" size="lg" disabled>
                <b>Enable Pay-to-Name</b>
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}

        <p></p>
        {this.props.isLoadingYourDrives ? (
          <>
            <div id="spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </>
        ) : (
          <>
            <p></p>

            {this.props.YourDrives.length === 0 ? (
              <>
                <p style={{ textAlign: "center" }}>
                  (This is where drives you accepted will appear)
                </p>
              </>
            ) : (
              <div className="footer">{drives}</div>
            )}
          </>
        )}
      </>
    );
  }
}

export default YourDrives;
