import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import handleDenomDisplay from "../../UnitDisplay";

class ConfirmYourDriverModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadTime: 4, //set to 4 when successful dgm addr and call
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  decrementTimer = () => {
    this.setState({
      loadTime: this.state.loadTime - 1,
    });
    if (this.state.loadTime >= 1) {
      const myTimeout = setTimeout(this.decrementTimer, 1000);
    }
  };

  handleSubmitClick = () => {
    // this.props.payDashtoRequest(
    //   this.state.dgmDocumentsForReceipient[0].address,
    //   this.state.commentInput
    // );

    this.handleCloseClick();
  };

  componentDidMount = () => {
    this.decrementTimer();
  };

  render() {
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
    // selectedYourRide={this.state.selectedYourRide}
    // selectedYourRideReply={this.state.selectedYourRideReply}
    // selectedYourRideReplyNameDoc={
    //   this.state.selectedYourRideReplyNameDoc
    // }
    let nameDocToPass = this.props.selectedYourRideReplyNameDoc; //this is the nameDoc and not the label
    // nameDocToPass = this.props.driverReplyNames.find((doc) => {
    //   return this.props.driverReply.$ownerId === doc.$ownerId;
    // });
    // if (nameDocToPass === undefined) {
    //   nameDocToPass = { label: "No name avail.." };
    // }

    return (
      <>
        <Modal
          contentClassName={modalBkg}
          backdropClassName={modalBackdrop}
          show={this.props.isModalShowing}
        >
          <Modal.Header>
            <Modal.Title>Confirm Driver</Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            {/* <h6>
              Pay <b>{handleDenomDisplay(this.props.amountToSend)}</b> to{" "}
              <b>{this.props.requestPmtNameDoc.label}</b>?
            </h6> */}
            <div
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              {/* <h5>
                <b style={{ color: "#008de4" }}>
                  {this.props.requestPmtNameDoc.label}
                </b>{" "}
                requests{" "}
                <b style={{ color: "#008de4" }}>
                  {handleDenomDisplay(this.props.amountToSend)}
                </b>
              </h5> */}
              <h5>
                Confirm to pay{" "}
                <b style={{ color: "#008de4" }}>{nameDocToPass.label}</b>{" "}
                <b style={{ color: "#008de4" }}>
                  {handleDenomDisplay(this.props.selectedYourRideReply.amt)}
                </b>{" "}
                as your driver.
              </h5>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <>
              {this.state.loadTime >= 1 ? (
                <Button variant="primary" disabled>
                  <b>Confirm Driver ({this.state.loadTime})</b>
                </Button>
              ) : (
                <Button variant="primary" onClick={this.handleSubmitClick}>
                  <b>Confirm Driver</b>
                </Button>
              )}
            </>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ConfirmYourDriverModal;
