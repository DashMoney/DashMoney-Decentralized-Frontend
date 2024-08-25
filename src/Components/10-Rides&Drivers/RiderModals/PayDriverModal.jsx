import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import handleDenomDisplay from "../../UnitDisplay";

class PayDriverModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadTime: 3, //set to 4 when successful dgm addr and call
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

  verifySufficientFunds = () => {
    //sufficientFunds
    let theTotal = 0;

    theTotal = this.props.accountBalance - 1000000;

    if (theTotal >= 0) {
      return true;
    } else {
      return false;
    }
  };

  handleSubmitClick = () => {
    this.props.payDriver();

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

    // accountBalance={this.state.accountBalance}
    //         isLoadingWallet={this.state.isLoadingWallet}
    //         selectedYourRide={this.state.selectedYourRide}
    //         //this ^^ will get the amt
    //         selectedYourRideReply={this.state.selectedYourRideReply}
    //         //check that replyID = from rideReq
    //         selectedYourRideReplyNameDoc={
    //           this.state.selectedYourRideReplyNameDoc
    //         }
    //         selectedYourRideReplyAddressDoc={
    //           this.state.selectedYourRideReplyAddressDoc
    //         }
    return (
      <Modal
        show={this.props.isModalShowing}
        backdropClassName={modalBackdrop}
        contentClassName={modalBkg}
      >
        <Modal.Header>
          <Modal.Title>
            <h3>
              <b>Pay Driver</b>
            </h3>
          </Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>
          {this.props.isLoadingWallet ? (
            <>
              {/* <p> </p>
                  <div id="spinner">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                  <p> </p> */}

              <div className="paddingBadge">
                <b>Dash Balance</b>

                <h4>Loading..</h4>
              </div>

              <p></p>
            </>
          ) : (
            <>
              <div className="paddingBadge">
                <b>Current Balance</b>

                <h4 style={{ color: "#008de4" }}>
                  <b>
                    {handleDenomDisplay(
                      this.props.whichNetwork,
                      this.props.accountBalance,
                      1
                    )}
                  </b>
                </h4>
              </div>

              <p></p>
            </>
          )}

          <div
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <h5
            //style={{ color: "green" }}
            //onClick={() => this.handleNameClick()}
            >
              Pay{" "}
              <b style={{ color: "#008de4" }}>
                {this.props.selectedYourRideReplyNameDoc.label}
              </b>{" "}
              <b style={{ color: "#008de4" }}>
                {handleDenomDisplay(
                  this.props.whichNetwork,
                  this.props.selectedYourRide.amt
                )}
              </b>{" "}
              for the ride.
            </h5>
          </div>
          {/* <h6>
              Message:
              {this.props.messageToSend !== "" ? (
                <span>{this.props.messageToSend}</span>
              ) : (
                <span>(No Message)</span>
              )}
            </h6> */}
          {this.props.selectedYourRideReplyAddressDoc === undefined ? (
            <>
              <p></p>
              <Alert variant="danger" dismissible>
                <Alert.Heading>Alert!</Alert.Heading>
                <p>
                  <b>{this.props.nameDoc.label}</b> has not yet enabled{" "}
                  <b>Pay-to-Name</b> in <b>Wallet</b>. Let them know on{" "}
                  <b>Messages</b>.
                </p>
              </Alert>
              <p></p>
            </>
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!this.props.isLoadingWallet &&
          this.verifySufficientFunds() &&
          this.props.selectedYourRideReplyAddressDoc !== undefined ? (
            <>
              {this.state.loadTime >= 1 ? (
                <Button variant="primary" disabled>
                  <b>Pay Driver ({this.state.loadTime})</b>
                </Button>
              ) : (
                <Button variant="primary" onClick={this.handleSubmitClick}>
                  <b>Pay Driver</b>
                </Button>
              )}
            </>
          ) : (
            // <Button variant="primary" onClick={this.handleSubmitClick}>
            //   <b>Pay Driver</b>
            // </Button>
            <></>
          )}

          {this.props.selectedYourRideReplyAddressDoc === undefined ? (
            <>
              <Button variant="primary" disabled>
                <b>Pay Driver Error</b>
              </Button>
            </>
          ) : (
            <></>
          )}

          {this.props.isLoadingWallet ? (
            <Button variant="primary">
              <b>Wallet Loading..</b>
            </Button>
          ) : (
            <></>
          )}

          {!this.props.isLoadingWallet && !this.verifySufficientFunds() ? (
            <Button variant="primary" disabled>
              <b>Insufficient Funds</b>
            </Button>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PayDriverModal;
