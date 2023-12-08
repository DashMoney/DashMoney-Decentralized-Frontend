import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";

import Dash from "dash";

const {
  Core: { Message },
} = Dash;

class DeleteProofModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      copiedAddr: false,
    };
  }

  getRelativeTimeAgo(messageTime, timeNow) {
    let timeDifference = timeNow - messageTime;

    if (timeDifference >= 84600000) {
      let longFormDate = new Date();
      longFormDate.setTime(messageTime);
      return longFormDate.toLocaleDateString();
    }

    /*
    Calculate milliseconds in a year
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    */

    if (timeDifference < 15000) {
      return "Just now";
    } else if (timeDifference < 44000) {
      return "Few moments ago";
    } else if (timeDifference < 90000) {
      return "1 min ago";
    } else if (timeDifference < 150000) {
      return "2 min ago";
    } else if (timeDifference < 210000) {
      return "3 min ago";
    } else if (timeDifference < 270000) {
      return "4 min ago";
    } else if (timeDifference < 330000) {
      return "5 min ago";
    } else if (timeDifference < 390000) {
      return "6 min ago";
    } else if (timeDifference < 450000) {
      return "7 min ago";
    } else if (timeDifference < 510000) {
      return "8 min ago";
    } else if (timeDifference < 570000) {
      return "9 min ago";
    } else if (timeDifference < 660000) {
      return "10 min ago";
    } else if (timeDifference < 840000) {
      return "12 min ago";
    } else if (timeDifference < 1020000) {
      return "15 min ago";
    } else if (timeDifference < 1140000) {
      return "18 min ago";
    } else if (timeDifference < 1380000) {
      return "20 min ago";
    } else if (timeDifference < 1650000) {
      return "25 min ago";
    } else if (timeDifference < 1950000) {
      return "30 min ago";
    } else if (timeDifference < 2250000) {
      return "35 min ago";
    } else if (timeDifference < 2550000) {
      return "40 min ago";
    } else if (timeDifference < 3000000) {
      return "45 min ago";
    } else if (timeDifference < 5400000) {
      return "1 hr ago";
    } else if (timeDifference < 9000000) {
      return "2 hrs ago";
    } else if (timeDifference < 12600000) {
      return "3 hrs ago";
    } else if (timeDifference < 18000000) {
      return "5 hrs ago";
    } else if (timeDifference < 43200000) {
      return "Many hrs ago";
    } else if (timeDifference < 84600000) {
      return "About a day ago";
    }
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleDeleteProof = () => {
    this.props.deleteYourProof();
    this.props.hideModal();
  };

  proveMessage() {
    const message = new Message(this.props.selectedYourProof.message);

    let verify;
    try {
      verify = message.verify(
        this.props.selectedYourProof.address,
        this.props.selectedYourProof.signature
      );
    } catch (err) {
      return false;
    }

    if (verify) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    let date = Date.now();

    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;

    if (this.props.mode === "primary") {
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBackdrop = "modal-backdrop-dark";
      modalBkg = "modal-backcolor-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    return (
      <>
        <Modal
          show={this.props.isModalShowing}
          backdropClassName={modalBackdrop}
          contentClassName={modalBkg}
        >
          <Modal.Header style={{ paddingBottom: ".2rem" }}>
            <Modal.Title>
              <h3>
                <b>Delete Proof</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>

          {/* <div className="BottomBorder"></div> */}

          <Modal.Body>
            <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
              <Card.Body>
                <Card.Title className="cardTitle">
                  <h3 style={{ color: "#008de3" }}>
                    <b>{this.props.uniqueName}</b>
                  </h3>

                  <span className="textsmaller">
                    {this.getRelativeTimeAgo(
                      this.props.selectedYourProof.$createdAt,
                      date
                    )}
                  </span>
                </Card.Title>

                <h5>
                  <b>Address of Funds</b>
                </h5>

                <p>
                  <b>{this.props.selectedYourProof.address}</b>{" "}
                </p>

                <div className="ProofBorder"></div>

                <h5>
                  <b>Signed Message</b>
                </h5>

                {/* if signature for message and addr is true display message else display error message */}
                {this.proveMessage() ? (
                  <>
                    <p style={{ color: "#008de4" }} className="indentStuff">
                      <b>{this.props.selectedYourProof.message}</b>
                    </p>
                    <p></p>
                  </>
                ) : (
                  <>
                    <Alert variant="danger">
                      <Alert.Heading>Failure</Alert.Heading>
                      <p>Signature Failed - Proof is not authentic!</p>
                    </Alert>
                  </>
                )}

                <p></p>
              </Card.Body>
            </Card>
            <p></p>
            <div className="ButtonRightNoUnderline">
              <Button
                variant="primary"
                onClick={() => this.handleDeleteProof()}
              >
                <b>Delete Proof</b>
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default DeleteProofModal;
