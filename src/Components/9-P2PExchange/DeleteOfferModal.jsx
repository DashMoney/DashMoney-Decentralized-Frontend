import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

class DeleteOfferModal extends React.Component {
  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

  handleFiatDisplay = (fiatInt) => {
    //Convert to 2 decimal places.
    let numToString = fiatInt.toString();
    let strLength = numToString.length;
    let firstPart = numToString.slice(0, strLength - 2);
    let secPart = numToString.slice(strLength - 2, strLength);
    return `${firstPart}.${secPart}`;
  };

  formatToMe = (toMePassed) => {
    switch (toMePassed) {
      case "USD":
        return "Dollar(USD)";
        break;
      case "EUR":
        return "Euro(EUR)";
        break;
      case "DASH":
        return "Dash";
        break;
      default:
        return toMePassed;
      // console.log(toMePassed);
    }
  };

  formatToMeVia = (toMeViaPassed, toMePassed) => {
    if (toMePassed !== "DASH") {
      return ` via ${toMeViaPassed
        .charAt(0)
        .toUpperCase()}${toMeViaPassed.slice(1)}`;
    } else {
      switch (toMeViaPassed) {
        case "paytoname":
          return " via Pay-to-Name";
          break;
        case "address":
          return " via Address";
          break;
        default:
          return ` via ${toMeViaPassed}`;
      }
    }
  };

  formatToU = (toUPassed) => {
    switch (toUPassed) {
      case "USD":
        return "Dollar(USD)";
        break;
      case "EUR":
        return "Euro(EUR)";
        break;
      case "DASH":
        return "Dash";
        break;
      default:
        return toUPassed;
      // console.log(toUPassed);
    }
  };

  formatToUVia = (toUViaPassed, toUPassed) => {
    if (toUPassed !== "DASH") {
      return ` via ${toUViaPassed.charAt(0).toUpperCase()}${toUViaPassed.slice(
        1
      )}`;
    }
  };

  formatDate(theCreatedAt, today, yesterday) {
    let CreatedAt = new Date(theCreatedAt);

    let dateReturn = CreatedAt.toLocaleDateString();

    return dateReturn;
  }

  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

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

    return (
      <Modal
        show={this.props.isModalShowing}
        backdropClassName={modalBackdrop}
        contentClassName={modalBkg}
      >
        {/* <Modal.Header> */}

        {/* NO HEADER JUST PUT EVERYTHING IN THE BODY??? -> PROBABLY NEED TO TEST AND LOOK AT ->  */}

        {/* <Modal.Title>
          <h3>
               <b>Selected Offer</b>
               </h3>
               </Modal.Title>  */}

        {/* </Modal.Header> */}
        <Modal.Body>
          <div className="postModalCloseButton">
            <Modal.Title>{closeButtonColor}</Modal.Title>
          </div>

          <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
            <h4>
              <b>Send</b>{" "}
            </h4>
            <h4>
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.formatToMe(this.props.selectedYourOffer.toMe)}
                {this.formatToMeVia(
                  this.props.selectedYourOffer.toMeVia,
                  this.props.selectedYourOffer.toMe
                )}
              </Badge>
            </h4>
          </div>
          <p></p>
          <div className="cardCenterTitle">
            <h5>
              <b>Send to </b>
              <b style={{ color: "#008de4" }}>
                {this.props.selectedYourOffer.toMeHandle}
              </b>
            </h5>
          </div>
          <p></p>
          <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
            <h4>
              <b>Receive</b>{" "}
            </h4>
            <h4>
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.formatToU(this.props.selectedYourOffer.toU)}
                {this.formatToUVia(
                  this.props.selectedYourOffer.toUVia,
                  this.props.selectedYourOffer.toU
                )}
              </Badge>
            </h4>
          </div>
          <p></p>

          <span style={{ textAlign: "right" }} className="textsmaller">
            {this.formatDate(
              this.props.selectedYourOffer.$updatedAt,
              today,
              yesterday
            )}
          </span>

          <div>
            <p></p>
            <h5 style={{ textAlign: "center" }}>Exchange Rate(Fiat/Dash)</h5>
            <h4 style={{ textAlign: "center", color: "#008de3" }}>
              <b>
                {this.handleFiatDisplay(this.props.selectedYourOffer.exRate)}
              </b>
            </h4>
            <p></p>
          </div>

          <p style={{ textAlign: "center", marginBottom: "0rem" }}>
            <b>Min - Max (Fiat):</b>{" "}
            <b>
              {this.handleFiatDisplay(this.props.selectedYourOffer.minAmt)} -{" "}
              {this.handleFiatDisplay(this.props.selectedYourOffer.maxAmt)}
            </b>
          </p>

          <h5>
            <b>Instructions</b>
          </h5>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {this.props.selectedYourOffer.instruction}
          </p>
        </Modal.Body>
        <div className="TwoButtons">
          <Button
            variant="primary"
            onClick={() => this.props.deleteYourOffer()}
          >
            <b>Delete Offer</b>
          </Button>
          <Button variant="primary" onClick={() => this.handleCloseClick()}>
            <b>Cancel</b>
          </Button>
        </div>
        <p></p>
      </Modal>
    );
  }
}

export default DeleteOfferModal;
