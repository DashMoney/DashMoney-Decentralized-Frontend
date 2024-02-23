import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Spinner from "react-bootstrap/Spinner";

class OfferModal extends React.Component {
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
            <h5>
              {" "}
              <b>Send</b>{" "}
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.selectedSearchedOffer.toMe} via{" "}
                {this.props.selectedSearchedOffer.toMeVia}
              </Badge>
            </h5>
          </div>

          <div className="cardCenterTitle">
            <h5>
              <b>Send to </b>
              <b style={{ color: "#008de4" }}>
                {this.props.selectedSearchedOffer.toMeHandle}
              </b>
            </h5>
            {this.state.copiedtoMeHandle ? <span>✅</span> : <></>}
            <Button
              variant="primary"
              onClick={() => {
                navigator.clipboard.writeText(
                  this.props.selectedSearchedOffer.toMeHandle
                );
                this.setState({
                  copiedtoMeHandle: true,
                });
              }}
            >
              <b>Copy Handle</b>
            </Button>
          </div>
          <p></p>
          <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
            <h5>
              <b>Receive</b>{" "}
              {this.props.selectedSearchedOffer.toU === "Dash" ? (
                <>
                  <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                    {this.props.selectedSearchedOffer.toU}
                  </Badge>
                </>
              ) : (
                <>
                  <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                    {this.props.selectedSearchedOffer.toU} via{" "}
                    {this.props.selectedSearchedOffer.toUVia}
                  </Badge>
                </>
              )}
            </h5>
          </div>
          <p></p>
          <div className="cardTitle">
            <h4
              style={{ color: "#008de4" }}
              onClick={() =>
                this.handleNameClick(
                  this.props.selectedSearchedOfferNameDoc.label
                )
              }
            >
              {this.props.selectedSearchedOfferNameDoc.label}
            </h4>

            {/* <span onClick={() => this.handleNameClick()}>
    {this.props.tuple[0]}
  </span> */}
            <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>

            <span className="textsmaller">
              {this.formatDate(
                this.props.selectedSearchedOffer.$updatedAt,
                today,
                yesterday
              )}
            </span>
          </div>
          <div>
            <p></p>
            <h5 style={{ textAlign: "center" }}>Exchange Rate(Fiat/Dash)</h5>
            <h4 style={{ textAlign: "center", color: "#008de3" }}>
              <b>
                {this.handleFiatDisplay(
                  this.props.selectedSearchedOffer.exRate
                )}
              </b>
            </h4>
            <p></p>
          </div>

          <p style={{ textAlign: "center", marginBottom: "0rem" }}>
            <b>Min - Max (Fiat):</b>{" "}
            <b>
              {this.handleFiatDisplay(this.props.selectedSearchedOffer.minAmt)}{" "}
              -{" "}
              {this.handleFiatDisplay(this.props.selectedSearchedOffer.maxAmt)}
            </b>
          </p>

          <h5>
            <b>Instructions</b>
          </h5>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {this.props.selectedSearchedOffer.instruction}
          </p>
        </Modal.Body>
        <div className="TwoButtons">
          <Button
            variant="primary"
            //onClick={() => this.props.deleteYourOffer(this.props.index)}
          >
            <b>Delete Offer</b>
          </Button>
          <Button variant="primary" onClick={() => this.handleCloseClick}>
            <b>Cancel</b>
          </Button>
        </div>
      </Modal>
    );
  }
}

export default OfferModal;
