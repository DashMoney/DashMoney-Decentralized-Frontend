import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import handleDenomDisplay from "../UnitDisplay";

class RideConfirmComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleNameClick = () => {
    navigator.clipboard.writeText(this.props.tuple[0].label);
    this.setState({
      copiedName: true,
    });
  };

  formatDate(theCreatedAt, today, yesterday) {
    let CreatedAt = new Date(theCreatedAt);

    const timeOptions = {
      hour: "numeric",
      minute: "2-digit", //numeric?
    };

    function isSameDay(date1, date2) {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    }

    if (isSameDay(CreatedAt, today)) {
      // it's today
      return `Today at ${CreatedAt.toLocaleTimeString(undefined, timeOptions)}`;
    }

    if (isSameDay(CreatedAt, yesterday)) {
      // it was yesterday
      return `Yesterday at ${CreatedAt.toLocaleTimeString(
        undefined,
        timeOptions
      )}`;
    }
    let dateReturn = CreatedAt.toLocaleDateString().concat(
      "  ",
      CreatedAt.toLocaleTimeString(undefined, timeOptions)
    );
    return dateReturn;
  }

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

    let nameDocToPass = ""; //this is the nameDoc and not the label
    nameDocToPass = this.props.driverReplyNames.find((doc) => {
      return this.props.driverReply.$ownerId === doc.$ownerId;
    });
    if (nameDocToPass === undefined) {
      nameDocToPass = { label: "No name avail.." };
    }
    // driverReply={driver}
    // driverReplyNames={replyNames}
    return (
      <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
        <Card.Body>
          <Card.Title className="cardTitle">
            <b
              style={{ color: "#008de4" }}
              onClick={() => this.handleNameClick()}
            >
              {nameDocToPass.label}
            </b>

            <span
              className="textsmaller" //style={{textAlign:'right'}}
            >
              {this.formatDate(
                this.props.driverReply.$createdAt,
                this.props.today,
                this.props.yesterday
              )}
            </span>
          </Card.Title>
          {/* <h5>{nameDocToPass.label}</h5> */}
          <div
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <h5>
              Confirm to pay{" "}
              <b style={{ color: "#008de4" }}>{nameDocToPass.label}</b>{" "}
              <b style={{ color: "#008de4" }}>
                {handleDenomDisplay(this.props.driverReply.amt)}
              </b>{" "}
              as your driver.
            </h5>
          </div>

          {/* <p style={{ marginTop: ".7rem", marginBottom: "2rem" }}>
            {this.props.driverReply.msg}
          </p> */}
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={() =>
                this.props.handleConfirmYourDriverModal(
                  this.props.rideIndex,
                  this.props.driverReply,
                  nameDocToPass
                )
              }
              style={{
                fontSize: "larger",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              <b>Confirm Driver</b>
            </Button>
          </div>

          {/* <div className="TwoButtons">
            <Button
              variant="primary"
              style={{
                fontSize: "larger",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
              onClick={() =>
                this.props.showRejectReplyReqModal(
                  nameDocToPass,
                  this.props.driverReply //Pass PmtReqmsg bc need for msgId
                )
              }
            >
              <b>Other</b>
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                this.props.showPayRequestModal(
                  nameDocToPass,
                  this.props.driverReply //Pass PmtReqmsg bc need for msgId
                )
              }
              //inputNameDoc, //name and OwnerId
              //inputNumber //Should already be in duffs
              style={{
                fontSize: "larger",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              <b>Pay</b>
            </Button>
          </div> */}
          {/* </Card.Text> */}
        </Card.Body>
      </Card>
    );
  }
}

export default RideConfirmComponent;
