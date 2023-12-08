import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

class FrontEndFeeExplaination extends React.Component {
  handleCloseClick = () => {
    this.props.hideModal();
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
    return (
      <>
        <Modal show={this.props.isModalShowing} contentClassName={modalBkg}>
          <Modal.Header>
            <Modal.Title>
              <b>Decentralized Frontends</b>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <h3>
              What does <b>1% of TopUp</b> mean?
              {/* VITE_FEE_AMOUNT_AS_PERCENT_OF_A_TOPUP
              {import.meta.env.VITE_FRONTEND_NAME} */}
            </h3>
            <p>
              This is the amount of the fee you pay in Dash Platform credits to
              the frontend operator/host, when you write data to Dash Platform.
              Reading from platform is free, but it costs to write to it,
              because Platform saves your data.
            </p>
            <h3>Why is there a fee?</h3>
            <p>
              The fee is for paying the frontend operator/host. This is to allow
              the frontend(what you are currently using) to be decentralized
              just like the backend(Dash Platform).
            </p>
            <h3>Do I have to pay a fee?</h3>
            <p>
              Nope, you can find the source code{" "}
              <b>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/DashMoney/DashMoney-Decentralized-Frontend"
                >
                  https://github.com/DashMoney/DashMoney-Decentralized-Frontend
                </a>
              </b>
              , and run the frontend yourself. Or you can host the frontend
              yourself so that others can use it, and you can earn Dash!
            </p>
            {/* {this.props.isLoginComplete ? (
              <>
                <p>
                  If you want to see just click below and sent some credits to
                  DashMoney!
                </p>
                <p></p>
                <div className="d-grid gap-2" id="button-edge">
                  <Button
                    variant="primary"
                    onClick={() => this.props.sendFrontendFee()}
                  >
                    <b>Identity Credit Transfer</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )} */}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={this.props.hideModal}>
              <b>Close</b>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default FrontEndFeeExplaination;
