import React from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Ride from "./Ride";

class Rides extends React.Component {
  render() {
    // FILTER SEARCHEDDRIVES(rideReq) -> REMOVEs CONFIRMED ->

    let filteredDrives = this.props.SearchedDrives.filter((rideReq) => {
      return rideReq.$ownerId === rideReq.replyId;
    });

    let rides = filteredDrives.map((ride, index) => {
      //console.log(ride);
      return (
        <Ride
          key={index}
          mode={this.props.mode}
          index={index}
          ride={ride}
          identity={this.props.identity}
          SearchedDrivesNames={this.props.SearchedDrivesNames}
          YourDrives={this.props.YourDrives}
          isLoginComplete={this.props.isLoginComplete}
          handleAcceptDrive={this.props.handleAcceptDrive}
          handleDriversTab={this.props.handleDriversTab}
          isLoadingYourDrives={this.props.isLoadingYourDrives}
          //PAYTONAME
          dgmDocuments={this.props.dgmDocuments}
          WALLET_Login7={this.props.WALLET_Login7}
          isLoadingButtons_WALLET={this.props.isLoadingButtons_WALLET}
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
        {this.props.SearchedDrives.length === 0 ? (
          <>
            {this.props.isLoadingDriversInitial ||
            this.props.isLoadingDriversSearch ? (
              <></>
            ) : (
              <>
                <p style={{ textAlign: "center" }}>
                  (This is where available rides will appear)
                </p>
              </>
            )}
          </>
        ) : (
          <div className="footer">{rides}</div>
        )}
      </>
    );
  }
}

export default Rides;
