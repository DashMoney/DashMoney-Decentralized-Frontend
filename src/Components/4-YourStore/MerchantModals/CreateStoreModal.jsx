import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//import Spinner from "react-bootstrap/Spinner";
//import Badge from "react-bootstrap/Badge";
import CloseButton from "react-bootstrap/CloseButton";

//Store needs
/**
 *  description: { 
          type: 'string',
          minLength: 1,
          maxLength: 250,
        },
        open:{
          type: 'boolean'
        },
 */

class CreateStoreModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionInput: "",
      storeStatus: true,
      publicStatus: true,
      payLaterStatus: false,

      validDescription: false,
      tooLongDescriptionError: false,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handlePayLater = () => {
    if (this.state.payLaterStatus) {
      this.setState({
        payLaterStatus: false,
      });
    } else {
      this.setState({
        payLaterStatus: true,
      });
    }
  };

  handleStatus = () => {
    if (this.state.storeStatus) {
      this.setState({
        storeStatus: false,
      });
    } else {
      this.setState({
        storeStatus: true,
      });
    }
  };

  handlePublic = () => {
    if (this.state.publicStatus) {
      this.setState({
        publicStatus: false,
      });
    } else {
      this.setState({
        publicStatus: true,
      });
    }
  };

  storeDescriptionValidate = (description) => {
    // let regex = /^.[\S\s]{1,450}$/;

    let regex1 = /^.[\S\s]{0,349}$/;

    let valid1 = regex1.test(description);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,4}[^\r\n]*$/;

    let valid2 = regex2.test(description);

    // let valid = false;

    // if (valid1 && valid2) {
    //   valid = true;
    // }

    //let valid = regex.test(description);

    if (valid1 && valid2) {
      this.setState({
        descriptionInput: description,
        validDescription: true,
        tooLongDescriptionError: false,
      });
    } else {
      if (description.length > 350 || !valid2) {
        this.setState({
          descriptionInput: description,
          validDescription: false,
          tooLongDescriptionError: true,
        });
      } else {
        this.setState({
          descriptionInput: description,
          validDescription: false,
        });
      }
    }
  };

  onChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log(event.target.value);
    //this is the message body!!!

    this.storeDescriptionValidate(event.target.value);
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    //console.log(event.target.ControlTextarea1.value);

    let newStore = {
      description: this.state.descriptionInput,
      public: this.state.publicStatus,
      open: this.state.storeStatus,
      payLater: this.state.payLaterStatus,
    };

    this.props.createDGPStore(newStore);
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
        <Modal
          show={this.props.isModalShowing}
          backdropClassName={modalBackdrop}
          contentClassName={modalBkg}
        >
          <Modal.Header>
            <Modal.Title>
              <h3>
                <b>Create My Store/Menu</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <Form noValidate onSubmit={this.handleSubmitClick}>
              <Form.Group className="mb-3" controlId="ControlTextarea1">
                <Form.Label>
                  <b>My Store/Menu Description</b>
                </Form.Label>

                <Form.Control
                  onChange={this.onChange}
                  as="textarea"
                  rows={2}
                  placeholder="Put description here.."
                  required
                  isInvalid={this.state.tooLongDescriptionError}
                />

                {this.state.tooLongDescriptionError ? (
                  <Form.Control.Feedback className="floatLeft" type="invalid">
                    Sorry, this is too long! Please use less than 250
                    characters.
                  </Form.Control.Feedback>
                ) : (
                  <></>
                )}
              </Form.Group>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Label>
                  <b>Allow Pay Later or No Pay Later</b>
                </Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={
                    this.state.payLaterStatus ? "Pay Later" : "No Pay Later"
                  }
                  onChange={() => this.handlePayLater()}
                />

                <p>
                  <b>Pay Later</b> means people can submit orders without
                  completing the payment. <b>No Pay Later</b> means they have to
                  submit the payment with the order.
                </p>
                <p>
                  This does not affect <b>Tracking Only</b> orders. Tracking
                  Only orders involve items with 0.00 price.
                </p>
              </Form.Group>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Label>
                  <b>Start Store: Open or Closed</b>
                </Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={this.state.storeStatus ? "Open" : "Closed"}
                  onChange={() => this.handleStatus()}
                />
                <p></p>
                <p>
                  You will be able to easily change between open and closed once
                  your store is created.
                </p>
                <p>
                  <b>Open</b> means people can view your items and make payments
                  to you. <b>Closed</b> means they can see your store when
                  searching, but they can not view items or make purchases.
                </p>
              </Form.Group>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Label>
                  <b>Start Store: Public or Private</b>
                </Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={this.state.publicStatus ? "Public" : "Private"}
                  onChange={() => this.handlePublic()}
                />
                <p></p>
                <p>
                  You will be able to easily change between public or private
                  once your store is created.
                </p>
                <p>
                  <b>Public</b> means your store can appear in{" "}
                  <b>Active Stores</b>. <b>Private</b> means your store will
                  not.
                </p>
              </Form.Group>

              {this.props.DGMAddress === "No Address" &&
              this.props.isLoadingWallet ? (
                <Button variant="primary">Loading..</Button>
              ) : (
                <>
                  {this.state.validDescription && !this.props.LoadingStore ? (
                    <Button variant="primary" type="submit">
                      <b>Create Store/Menu</b>
                    </Button>
                  ) : (
                    <Button variant="primary">
                      <b>Create Store/Menu</b>
                    </Button>
                  )}
                </>
              )}

              {/* if you want to put a spinner in button <span className="addSpaceRight">Verifying Wallet</span>
                  <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner> */}
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default CreateStoreModal;
