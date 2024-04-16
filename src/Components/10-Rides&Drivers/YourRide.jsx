import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import handleDenomDisplay from "../UnitDisplay";

class YourRide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      copiedPickupAddr: false,
      copiedDropoffAddr: false,
    };
  }
  // handleActive = () => {
  //   if (this.props.ride.reqTime + 200000 > (Date.now())) {
  //     return (
  //       <span style={{ color: "#008de4" }}>
  //         <b>Active</b>
  //       </span>
  //     );
  //   } else {
  //     return (
  //       <span style={{ color: "#008de4" }}>
  //         <b>Past</b>
  //       </span>
  //     );
  //   }
  // };

  render() {
    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    let priceUnit = "";
    let priceUnitDisplay;

    priceUnit = (this.props.ride.amt / this.props.ride.timeEst) * 30;

    priceUnitDisplay = handleDenomDisplay(priceUnit);
    //per half hour.. //bc per minute is small and could be kD..

    let paymentSchedule = "";

    switch (
      this.props.ride.pmtType // pmtType: 1 On Dropoff
    ) {
      case 1:
        paymentSchedule = <b>On Dropoff</b>;
        break;
      case 2:
        paymentSchedule = <b>On Pickup</b>;
        break;
      default:
        paymentSchedule = <b>1/2 & 1/2</b>;
    }

    {
      /* 

// reqTime: 1713220087357 -> Tab label  // msgId: "" // txId1: ""



 */
    }

    return (
      <>
        <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
          <Card.Body>
            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              {this.props.ride.area !== "" &&
              this.props.ride.area !== undefined ? (
                <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                  {this.props.ride.area}
                </Badge>
              ) : (
                <></>
              )}

              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.ride.city}
              </Badge>

              <Badge bg="primary">{this.props.ride.region}</Badge>
            </div>

            <Card.Title className="cardTitle">
              {/* User Name - no bc its my name */}
              {/* Status -> Waiting Accept, */}
              {/* {this.handleActive()} */}
              {/* calculate time left */}
            </Card.Title>

            <p></p>

            <div className="cardTitle">
              <span style={{ whiteSpace: "pre-wrap" }}>
                {this.props.ride.pickupAddr}
              </span>

              <Button
                variant="outline-primary"
                onClick={() => {
                  navigator.clipboard.writeText(this.props.ride.pickupAddr);
                  this.setState({
                    copiedPickupAddr: true,
                  });
                }}
              >
                {this.state.copiedPickupAddr ? <b>Copied!</b> : <b>Copy</b>}
              </Button>
            </div>

            <p></p>

            <div className="cardTitle">
              <span style={{ whiteSpace: "pre-wrap" }}>
                {this.props.ride.dropoffAddr}
              </span>

              <Button
                variant="outline-primary"
                onClick={() => {
                  navigator.clipboard.writeText(this.props.ride.dropoffAddr);
                  this.setState({
                    copiedDropoffAddr: true,
                  });
                }}
              >
                {this.state.copiedDropoffAddr ? <b>Copied!</b> : <b>Copy</b>}
              </Button>
            </div>
            <p></p>
            <p>
              Estimated Time: <b>{this.props.ride.timeEst} minutes</b>
            </p>

            <p>
              Estimated Distance: <b>{this.props.ride.distEst}</b>
            </p>
            <div
              className="BottomBorder" //style={{ paddingTop: ".5rem" }}
            ></div>

            <h5 style={{ textAlign: "center", margin: "1rem" }}>
              {" "}
              Pays <b>{handleDenomDisplay(this.props.ride.amt)}</b>
            </h5>

            <p style={{ textAlign: "center" }}>
              <b>{priceUnitDisplay} per 30 minutes</b>
            </p>
            <div
              className="BottomBorder" // style={{ paddingTop: ".5rem" }}
            ></div>

            <p></p>
            <p>Payment: {paymentSchedule}</p>

            {/* <p style={{ whiteSpace: "pre-wrap" }}>
              {this.props.post.description}
            </p> */}

            <p>
              Passengers: <b>{this.props.ride.numOfRiders}</b>
            </p>

            <p></p>
            {this.props.ride.extraInstr !== undefined &&
            this.props.ride.extraInstr !== "" ? (
              <>
                <p style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
                  <b>{this.props.ride.extraInstr}</b>
                </p>
              </>
            ) : (
              <></>
            )}

            <p></p>

            <div className="TwoButtons">
              <Button
                variant="primary"
                // onClick={() =>
                //   this.props.handleDeleteYourRide(this.props.index)
                // }
              >
                <b>Delete Ride</b>
              </Button>
              <Button
                variant="primary"
                // onClick={() => this.props.handleYourRide(this.props.index)}
              >
                <b>Edit Ride</b>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default YourRide;
