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
