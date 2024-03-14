import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import handleDenomDisplay from "../../UnitDisplay";

class PlaceOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sufficientFunds: false,
      commentInput: "",
      validComment: true,
      tooLongCommentError: false,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleTotalItems = () => {
    let numOfItems = 0;
    this.props.cartItems.forEach((tuple) => {
      // this.props.merchantItems.find((item)=>{
      //   return item.$id === tuple[0].$id
      // })
      numOfItems += tuple[1];
    });

    return (
      <span>
        {numOfItems} {numOfItems > 1 ? <span>items</span> : <span>item</span>}
      </span>
    );
  };

  verifySufficientFunds = () => {
    //sufficientFunds
    let theTotal = 0;

    this.props.cartItems.forEach((tuple) => {
      theTotal += tuple[1] * tuple[0].price;
    });

    theTotal = this.props.accountBalance - theTotal;

    if (theTotal >= 0) {
      // this.setState({
      //   sufficientFunds: true,
      // });
      return true;
    } else {
      // this.setState({
      //   sufficientFunds: false,
      // });
      return false;
    }
  };

  handleRemaining = () => {
    let theTotal = 0;

    this.props.cartItems.forEach((tuple) => {
      theTotal += tuple[1] * tuple[0].price;
    });

    theTotal = this.props.accountBalance - theTotal;

    return (
      <h4 className="indentMembers" style={{ color: "#008de4" }}>
        <b>{handleDenomDisplay(theTotal)}</b>
      </h4>
    );
  };

  handleTotal = () => {
    let theTotal = 0;

    this.props.cartItems.forEach((tuple) => {
      theTotal += tuple[1] * tuple[0].price;
      //console.log(theTotal);
    });

    return (
      <h4 className="indentMembers" style={{ color: "#008de4" }}>
        <b>{handleDenomDisplay(theTotal)}</b>
      </h4>
    );
  };

  handleTotalNotForDisplay = () => {
    let theTotal = 0;

    this.props.cartItems.forEach((tuple) => {
      theTotal += tuple[1] * tuple[0].price;
      //console.log(theTotal);
    });
    return Number(theTotal);
  };

  handleOrderORPayment = () => {
    let theTotal = 0;

    this.props.cartItems.forEach((tuple) => {
      theTotal += tuple[1] * tuple[0].price;
      //console.log(theTotal);
    });

    if (Number(theTotal) !== 0) {
      return (
        <Button variant="primary" onClick={() => this.handleSubmitClick()}>
          <b>Send Payment to {this.props.merchantStoreName}</b>
        </Button>
      );
    } else {
      return (
        <>
          <Button
            variant="primary"
            onClick={() => this.handleTrackOrderClick()}
          >
            <b>Submit Order to {this.props.merchantStoreName}</b>
          </Button>
          <p style={{ color: "#008de4" }}>
            <b>Tracking Only Order</b>
          </p>
        </>
      );
    }
  };

  onChange = (event) => {
    //console.log(event.target.id);
    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formOrderComment") {
      event.preventDefault();
      event.stopPropagation();
      this.orderCommentValidate(event.target.value);
    }
  };

  orderCommentValidate = (comment) => {
    let regex = /^[\S\s]{0,200}$/;

    let valid = regex.test(comment);

    if (valid) {
      this.setState({
        commentInput: comment,
        validComment: true,
        tooLongCommentError: false,
      });
    } else {
      if (comment.length > 200) {
        this.setState({
          commentInput: comment,
          validComment: false,
          tooLongCommentError: true,
        });
      } else {
        this.setState({
          commentInput: comment,
          validComment: false,
        });
      }
    }
  };

  handleSubmitClick = () => {
    if (this.state.validComment) {
      this.props.placeOrder(this.state.commentInput);
      this.props.hideModal();
    }
  };

  handleTrackOrderClick = () => {
    if (this.state.validComment) {
      this.props.submitOrder(this.state.commentInput, "trackOrder");
      this.props.hideModal();
    }
  };

  handlePayLaterClick = () => {
    if (this.state.validComment) {
      this.props.submitOrder(this.state.commentInput, "payLater");
      this.props.hideModal();
    }
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

    let orderItems = this.props.cartItems.map((item, index) => {
      return (
        <Row key={index}>
          <Col xs={6} md={4}>
            <h5>{item[0].name}</h5>{" "}
          </Col>
          <Col xs={1} md={4}>
            <h5>{item[1]}</h5>{" "}
          </Col>
          <Col xs={5} md={4}>
            <h5 style={{ color: "#008de4" }}>
              <b>{handleDenomDisplay(item[0].price, item[1])}</b>
            </h5>
          </Col>
        </Row>
      );

      //  return <div key={index} className="cardTitle">
      // <h5>{item[0].name}</h5>
      // <h5>{item[1]}</h5>
      // <h5><b>{handleDenomDisplay(item[0].price, item[1])}</b></h5>
      // </div>
    });

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
                <b>Confirm Your Order</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            {this.props.isLoadingWallet ? (
              <></>
            ) : (
              <>
                <h5 className="BalanceRightNoUnderline">
                  <b>Your Current Balance</b>
                </h5>
                <h5 className="BalanceRight" style={{ color: "#008de4" }}>
                  <b>{handleDenomDisplay(this.props.accountBalance, 1)}</b>
                </h5>

                <p></p>
              </>
            )}
            <h3>Your Order</h3>
            <Row>
              <Col xs={1} md={1}>
                {" "}
              </Col>
              <Col xs={4} md={4}>
                <h5>Item</h5>{" "}
              </Col>
              <Col xs={2} md={2}>
                <h5>Qty</h5>{" "}
              </Col>
              <Col xs={4} md={4}>
                <h5>Subtotal</h5>{" "}
              </Col>
              <Col xs={1} md={1}></Col>
            </Row>
            {/* <div className="cardTitle">
           <h5>Item</h5> 
           <h5>Qty</h5> 
           <h5>Price</h5> 
           
           </div> */}

            <Container>{orderItems}</Container>

            <p></p>
            <div className="Underline">
              <h4>
                <b>Total</b> ({this.handleTotalItems()})<b>:</b>
              </h4>

              {this.handleTotal()}
            </div>

            <Form.Group className="mb-3" controlId="formOrderComment">
              <Form.Label>
                <b>Additional Order Info</b>
              </Form.Label>

              <Form.Control
                onChange={this.onChange}
                as="textarea"
                rows={2}
                placeholder="You can put any extra info here for the merchant to see.."
                required
                isInvalid={this.state.tooLongDescriptionError}
                isValid={this.state.validDescription}
              />

              {this.state.tooLongError ? (
                <Form.Control.Feedback className="floatLeft" type="invalid">
                  Sorry, this is too long! Please use less than 250 characters.
                </Form.Control.Feedback>
              ) : (
                <></>
              )}
            </Form.Group>

            <div className="ButtonRightNoUnderline">
              {!this.props.isLoadingWallet && this.verifySufficientFunds() ? (
                // <Button
                //   variant="primary"
                //   onClick={() => this.handleSubmitClick()}
                // >
                //   <b>Send Payment to {this.props.merchantStoreName}</b>
                // </Button>
                <>{this.handleOrderORPayment()}</>
              ) : (
                <>
                  {this.props.isLoadingWallet ? (
                    <>
                      {" "}
                      <Button disabled variant="primary">
                        <b>Wallet Loading..</b>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button disabled variant="primary">
                        <b>Insufficient Funds</b>
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>

            {!this.props.isLoadingWallet && this.verifySufficientFunds() ? (
              <>
                <h5 className="BalanceRightNoUnderline">
                  <b>Your Remaining Balance will be:</b>
                </h5>
                <h5 className="BalanceRight">
                  <b>{this.handleRemaining()}</b>
                </h5>
                <p></p>
              </>
            ) : (
              <></>
            )}

            {this.handleTotalNotForDisplay !== 0 &&
            this.props.store.payLater ? (
              <>
                <div className="ButtonRightNoUnderline">
                  <Button
                    variant="primary"
                    onClick={() => this.handlePayLaterClick()}
                  >
                    <b>Submit Order & Pay Later</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default PlaceOrderModal;
