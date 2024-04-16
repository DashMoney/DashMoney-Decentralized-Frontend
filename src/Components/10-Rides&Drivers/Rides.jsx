import React from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Ride from "./Ride";

class Rides extends React.Component {
  render() {
    let rides = this.props.SearchedDrives.map((ride, index) => {
      //console.log(item);
      return (
        <Ride
          key={index}
          mode={this.props.mode}
          index={index}
          ride={ride}
          SearchedDrivesNames={this.props.SearchedDrivesNames}
        />
      );
    });

    return (
      <>
        <p></p>
        {this.props.isLoadingDriversSearch ? (
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

            {this.props.SearchedDrives.length === 0 ? (
              <>
                <p style={{ textAlign: "center" }}>
                  (This is where available rides will appear)
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

export default Rides;
