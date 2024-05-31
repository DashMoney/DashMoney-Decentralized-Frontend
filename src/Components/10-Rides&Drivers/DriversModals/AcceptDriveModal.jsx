import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
//import Spinner from "react-bootstrap/Spinner";

import handleDenomDisplay from "../../UnitDisplay";
import getRelativeTimeAgo from "../../TimeDisplayRelative";

class AcceptDriveModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      copiedPickupAddr: false,
      copiedDropoffAddr: false,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

  formatDate(theCreatedAt, today, yesterday) {
    let CreatedAt = new Date(theCreatedAt);

    let dateReturn = CreatedAt.toLocaleDateString();

    return dateReturn;
  }

  // componentDidMount() {

  // }

  render() {
    // let today = new Date();
    // let yesterday = new Date(today);

    // yesterday.setDate(yesterday.getDate() - 1);

    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;

    if (this.props.mode === "primary") {
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBackdrop = "modal-backdrop-dark";
      modalBkg = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    // let nameDocToPass = ""; //this is the nameDoc and not the label

    // if (this.props.selectedSearchedDrive.$ownerId === this.props.identity) {
    //   let myNameDoc = {
    //     $ownerId: this.props.identity,
    //     label: this.props.uniqueName,
    //   };
    //   nameDocToPass = myNameDoc;
    // } else {
    //   nameDocToPass = this.props.SearchedDrivesNames.find((doc) => {
    //     return this.props.selectedSearchedDrive.$ownerId === doc.$ownerId;
    //   });
    // }

    let priceUnit = "";
    let priceUnitDisplay;

    priceUnit =
      (this.props.selectedSearchedDrive.amt /
        this.props.selectedSearchedDrive.timeEst) *
      30;

    priceUnitDisplay = handleDenomDisplay(priceUnit);
    //per half hour.. //bc per minute is small and could be kD..

    let paymentSchedule = "";

    switch (
      this.props.selectedSearchedDrive.pmtType // pmtType: 1 On Dropoff
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

    return (
      <Modal
        show={this.props.isModalShowing}
        backdropClassName={modalBackdrop}
        contentClassName={modalBkg}
      >
        {/* <Modal.Header> */}

        {/* <Modal.Title>
          <h3>
               <b>Selected Event</b>
               </h3>
               </Modal.Title>  */}

        {/* </Modal.Header> */}
        <Modal.Body>
          <div className="postModalCloseButton">
            <Modal.Title>{closeButtonColor}</Modal.Title>
          </div>

          <div
            className="locationTitle"
            style={{ marginBottom: ".4rem", marginTop: ".4rem" }}
          >
            {this.props.selectedSearchedDrive.area !== "" &&
            this.props.selectedSearchedDrive.area !== undefined ? (
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.selectedSearchedDrive.area}
              </Badge>
            ) : (
              <></>
            )}

            <Badge bg="primary" style={{ marginRight: ".5rem" }}>
              {this.props.selectedSearchedDrive.city}
            </Badge>

            <Badge bg="primary">
              {this.props.selectedSearchedDrive.region}
            </Badge>
          </div>

          <p></p>

          <div className="cardTitle">
            <h4
              style={{
                color: "#008de3",
                marginTop: ".2rem",
                marginBottom: "0rem",
              }}
              onClick={() =>
                this.handleNameClick(
                  this.props.selectedSearchedDriveNameDoc.label
                )
              }
            >
              <b>{this.props.selectedSearchedDriveNameDoc.label}</b>
            </h4>

            <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>
            {/* <h4
              style={{ color: "#008de4" }}
              onClick={() =>
                this.handleNameClick(
                  this.props.selectedSearchedEventNameDoc.label
                )
              }
            >
              {this.props.selectedSearchedEventNameDoc.label}
            </h4>

            <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>

            <span className="textsmaller">
              {this.formatDate(
                this.props.selectedSearchedEvent.$createdAt,
                today,
                yesterday
              )}
            </span> */}
          </div>

          <p></p>

          <div className="cardTitle">
            <div>
              <span style={{ whiteSpace: "pre-wrap" }}>
                {this.props.selectedSearchedDrive.pickupAddr}
              </span>
            </div>

            <Button
              variant="outline-primary"
              onClick={() => {
                navigator.clipboard.writeText(
                  this.props.selectedSearchedDrive.pickupAddr
                );
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
              {this.props.selectedSearchedDrive.dropoffAddr}
            </span>

            <Button
              variant="outline-primary"
              onClick={() => {
                navigator.clipboard.writeText(
                  this.props.selectedSearchedDrive.dropoffAddr
                );
                this.setState({
                  copiedDropoffAddr: true,
                });
              }}
            >
              {this.state.copiedDropoffAddr ? <b>Copied!</b> : <b>Copy</b>}
            </Button>
          </div>
          <p></p>
          <p style={{ marginBottom: ".2rem" }}>
            Estimated Time:{" "}
            <b>{this.props.selectedSearchedDrive.timeEst} minutes</b>
          </p>

          <p style={{ marginTop: "0rem", marginBottom: ".2rem" }}>
            Estimated Distance:{" "}
            <b>{this.props.selectedSearchedDrive.distEst}</b>
          </p>
          <div
            className="BottomBorder"
            style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
          ></div>
          <p
            style={{
              marginTop: ".6rem", //, textAlign: "right"
            }}
          >
            Pickup Time:{" "}
            <b style={{ color: "#008de4" }}>
              {getRelativeTimeAgo(
                this.props.selectedSearchedDrive.reqTime,
                Date.now()
              )}
            </b>
          </p>

          <h5 style={{ marginTop: ".2rem", textAlign: "center" }}>
            {" "}
            Pays{" "}
            <b>{handleDenomDisplay(this.props.selectedSearchedDrive.amt)}</b>
          </h5>

          <p style={{ textAlign: "center", marginBottom: ".2rem" }}>
            ({priceUnitDisplay} per 30 minutes)
          </p>
          <div
            className="BottomBorder"
            style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
          ></div>

          <p style={{ marginBottom: ".2rem" }}>Payment: {paymentSchedule}</p>

          {/* <p style={{ whiteSpace: "pre-wrap" }}>
  {this.props.post.description}
</p> */}

          <p style={{ marginTop: "0rem", marginBottom: ".2rem" }}>
            Passengers: <b>{this.props.selectedSearchedDrive.numOfRiders}</b>
          </p>

          {this.props.selectedSearchedDrive.extraInstr !== undefined &&
          this.props.selectedSearchedDrive.extraInstr !== "" ? (
            <>
              <p
                style={{
                  paddingBottom: "0.5rem",
                  whiteSpace: "pre-wrap",
                  textAlign: "center",
                }}
              >
                <b>{this.props.selectedSearchedDrive.extraInstr}</b>
              </p>
            </>
          ) : (
            <></>
          )}

          <p></p>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={() => this.props.createAcceptDriveRideReply()}
            >
              <b>Accept to Drive</b>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AcceptDriveModal;
