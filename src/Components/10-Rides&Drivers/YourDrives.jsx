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
      //
      return (
        <YourDrive
          key={index}
          uniqueName={this.props.uniqueName}
          identity={this.props.identity}
          mode={this.props.mode}
          index={index}
          drive={drive}
          rideReplies={this.props.YourDrives} //rideReplies
          rideRequests={this.props.YourDrivesRequests} //rideRequest
          rideRequestsNames={this.props.YourDrivesRequestsNames}
        />
      );
    });

    return (
      <>
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
