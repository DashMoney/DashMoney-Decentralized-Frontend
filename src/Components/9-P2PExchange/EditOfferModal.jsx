import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";

class EditOfferModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 'toMe',
      // 'toMeVia',
      // 'toMeHandle',
      // 'toU',
      // 'toUVia',
      // //'toUHandle',
      // 'exRate',
      // 'instruction',
      // 'minAmt',
      // 'maxAmt',
      // 'active',

      //ONLY ALLOW FOR CHANGING THE AMOUNTS AND DESCRIPTION BECAUSE THE TOME AND TOU STUFF WOULD GREATLY COMPLICATE.

      exRateInput: this.props.selectedYourOffer.exRate,
      validexRate: true,

      instructionInput: this.props.selectedYourOffer.instruction,
      validinstruction: true,
      tooLonginstructionError: false,

      minAmtInput: this.props.selectedYourOffer.minAmt,
      validminAmt: true,

      maxAmtInput: this.props.selectedYourOffer.maxAmt,
      validmaxAmt: true,

      offerActive: this.props.selectedYourOffer.active,

      calcInput: 0,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleActive = () => {
    if (this.state.offerActive) {
      this.setState({
        offerActive: false,
      });
    } else {
      this.setState({
        offerActive: true,
      });
    }
  };

  handleFiatDisplay = (fiatInt) => {
    //Convert to 2 decimal places.
    let numToString = fiatInt.toString();
    let strLength = numToString.length;
    let firstPart = numToString.slice(0, strLength - 2);
    let secPart = numToString.slice(strLength - 2, strLength);
    return `${firstPart}.${secPart}`;
  };

  onChange = (event) => {
    // console.log(event.target.value);
    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formexRate") {
      event.preventDefault();
      event.stopPropagation();
      this.exRateValidate(event.target.value);
    }

    if (event.target.id === "formCalc") {
      event.preventDefault();
      event.stopPropagation();
      this.calcValidate(event.target.value);
    }

    if (event.target.id === "formminAmt") {
      event.preventDefault();
      event.stopPropagation();
      this.minAmtValidate(event.target.value);
    }

    if (event.target.id === "formmaxAmt") {
      event.preventDefault();
      event.stopPropagation();
      this.maxAmtValidate(event.target.value);
    }

    if (event.target.id === "custom-switch") {
      event.stopPropagation();
      this.handleActive();
    }

    if (event.target.id === "forminstruction") {
      event.preventDefault();
      event.stopPropagation();
      this.instructionValidate(event.target.value);
    }
  };

  exRateValidate = (numberInput) => {
    //console.log(typeof numberInput);

    let regex = /^\d{0,10}[.,]\d{2}$/; //  /^\d{1,12}[.,]\d{2}$/

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let valid = regex.test(numberInput);

    if (valid) {
      this.setState(
        {
          exRateInput: numberInput.replace(/[.,]/g, ""),
          validexRate: true,
        } //,() => console.log(this.state.exRateInput)
      );
    } else {
      this.setState({
        //exRateInput: numberInput,
        validexRate: false,
      });
    }
  };

  calcValidate = (numberInput) => {
    //console.log(this.props.accountBalance);

    let regex = /^\d{0,10}[.]\d{3}$/;

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let valid = regex.test(numberInput);

    //MAX SPENDABLE IS 10000 DASH
    if (valid) {
      this.setState({
        calcInput: numberInput.replace(/[.,]/g, ""),
      });
    } else {
      this.setState({
        calcInput: 0,
      });
    }
  };

  minAmtValidate = (numberInput) => {
    //console.log(this.props.accountBalance);

    let regex = /^\d{0,10}[.]\d{3}$/;

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let valid = regex.test(numberInput);

    //MAX SPENDABLE IS 10000 DASH
    if (valid) {
      this.setState({
        minAmtInput: numberInput.replace(/[.,]/g, ""),
        validminAmt: true,
      });
    } else {
      this.setState({
        // minAmtInput: numberInput,
        validminAmt: false,
      });
    }
  };

  maxAmtValidate = (numberInput) => {
    //console.log(this.props.accountBalance);

    let regex = /^\d{0,10}[.]\d{3}$/;

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO maximum mDash possible
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let valid = regex.test(numberInput);

    //MAX SPENDABLE IS 10000 DASH
    if (valid) {
      this.setState({
        maxAmtInput: numberInput.replace(/[.,]/g, ""),
        validmaxAmt: true,
      });
    } else {
      this.setState({
        // maxAmtInput: numberInput,
        validmaxAmt: false,
      });
    }
  };

  instructionValidate = (instruction) => {
    //see BELOW
    //let regex = /^.[\S\s]{0,499}$/; //CHECK OUT OF THE OTHERS -> Why did I add the . ?

    let regex1 = /^.[\S\s]{0,499}$/;

    let valid1 = regex1.test(instruction);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,6}[^\r\n]*$/;

    let valid2 = regex2.test(instruction);

    // if (valid1 && valid2) {
    //   valid = true;
    // }

    // let valid = regex.test(instruction);

    if (valid1 && valid2) {
      this.setState({
        instructionInput: instruction,
        validinstruction: true,
        tooLonginstructionError: false,
      });
    } else {
      if (instruction.length > 500 || !valid2) {
        this.setState({
          instructionInput: instruction,
          validinstruction: false,
          tooLonginstructionError: true,
        });
      } else {
        this.setState({
          instructionInput: instruction,
          validinstruction: false,
        });
      }
    }
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    // console.log(event.target.event);

    // console.log(this.state.instructionInput);

    //CHANGE TO NEWOFFER AND SET THE LOWERCASE HERE! -> ?
    let newOffer;

    newOffer = {
      toMe: this.props.selectedYourOffer.toMe,

      toMeVia: this.props.selectedYourOffer.toMeVia4Doc,
      toMeHandle: this.props.selectedYourOffer.toMeHandle4Doc,
      toU: this.props.selectedYourOffer.toU4Doc,
      toUVia: this.props.selectedYourOffer.toUVia4Doc,
      // toUHandle  <- Not a thing
      exRate: this.state.exRateInput,
      instruction: this.state.instructionInput,
      minAmt: this.state.minAmtInput,
      maxAmt: this.state.maxAmtInput,
      active: this.state.offerActive,
      myStore: false,
    };

    console.log(newOffer);

    this.props.editYourOffer(newOffer);
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

    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    let minMax = true;

    if (Number(this.state.minAmtInput) > Number(this.state.maxAmtInput)) {
      minMax = false;
    }

    let calcAmt = (this.state.calcInput * this.state.exRateInput * 0.00001) //.001 for Dash conversion and .01 for fiat conversion
      .toFixed(2);

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
                <b>Edit Offer</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>

          {/* <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div> */}

          <Modal.Body>
            {/* <h4 style={{ marginBottom: ".5rem" }}>
              <b>Offer Originator(You):</b>
            </h4> */}

            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              {/* THIS WILL PROBABLY BE THE SAME AS WHAT IS DISPLAYED I THE POST MODAL OR THE POST <= */}
              {/* <h4 style={{ marginBottom: ".5rem", marginTop: ".5rem" }}>
                <b>Offer Receipient:</b>
              </h4> */}
              {/* THIS WILL PROBABLY BE THE SAME AS WHAT IS DISPLAYED I THE POST MODAL OR THE POST <= */}

              {/*  EXRATE FORM BELOW */}

              <Form.Group className="mb-3" controlId="formexRate">
                <Form.Label>
                  <h4 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    Exchange Rate (Fiat/Dash)
                  </h4>
                </Form.Label>

                {/* <Form.Control
                      type="number"
                      placeholder={this.state.amountToSend}
                     readOnly
                    >  */}

                <Form.Control
                  type="number"
                  placeholder="30.01 For example.."
                  defaultValue={this.handleFiatDisplay(
                    this.props.selectedYourOffer.exRate
                  )}
                  required
                  isValid={this.state.validexRate}
                  //isInvalid={!this.state.validexRate}
                />
                <p className="smallertext">
                  (i.e. Must include 2 decimal precision)
                </p>
              </Form.Group>

              {/*  MINAMT FORM BELOW */}

              <Form.Group className="mb-2" controlId="formminAmt">
                <Form.Label>
                  <h6 style={{ marginTop: ".2rem", marginBottom: ".1rem" }}>
                    Minimum per Exchange(Fiat)
                  </h6>
                </Form.Label>

                {/* <Form.Control
                      type="number"
                      placeholder={this.state.amountToSend}
                     readOnly
                    >  */}

                <Form.Control
                  type="number"
                  placeholder="0.010 For example.."
                  defaultValue={this.handleFiatDisplay(
                    this.props.selectedYourOffer.minAmt
                  )}
                  required
                  isValid={this.state.validminAmt}
                  //isInvalid={!this.state.validminAmt}
                />
                <p className="smallertext">
                  (i.e. Must include 2 decimal precision)
                </p>
              </Form.Group>

              {/*  MAXAMT FORM BELOW */}

              <Form.Group className="mb-3" controlId="formmaxAmt">
                <Form.Label>
                  <h6 style={{ marginTop: ".2rem", marginBottom: ".1rem" }}>
                    Maximum per Exchange(Fiat)
                  </h6>
                </Form.Label>

                <Form.Control
                  type="number"
                  placeholder="10.000 For example.."
                  defaultValue={this.handleFiatDisplay(
                    this.props.selectedYourOffer.maxAmt
                  )}
                  required
                  isValid={this.state.validmaxAmt}
                  // isInvalid={!this.state.validmaxAmt}
                />
                <p className="smallertext">
                  (i.e. Must include 2 decimal precision)
                </p>
              </Form.Group>

              {minMax ? (
                <></>
              ) : (
                <>
                  {" "}
                  <p className="smallertext" style={{ color: "red" }}>
                    Minimum must be equal or less than maximum.
                  </p>
                </>
              )}

              {/* POST DESCRIPTION FORM BELOW */}

              <Form.Group className="mb-3" controlId="forminstruction">
                <Form.Label>
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    Instructions
                  </h5>
                </Form.Label>
                <Form.Control
                  style={{ whiteSpace: "pre-wrap" }}
                  //onChange={this.onChange}
                  as="textarea"
                  rows={3}
                  defaultValue={this.props.selectedYourOffer.instruction}
                  placeholder="Put instructions here.."
                  required
                  isInvalid={this.state.tooLonginstructionError}
                  isValid={this.state.validinstruction}
                />
                <p></p>
                Instructions can include things like:
                <ul>
                  <li>Send (DM) Message prior to pay.</li>
                  <li>Check out Group (GroupName) to ask you questions</li>
                  <li>
                    IMPORTANT: Ensure you spell your receiving handle correctly
                    if you are getting fiat.
                  </li>
                  <li>
                    IMPORTANT: Include 'Your Handle' in payment message, else
                    how will I send to you?
                  </li>
                  <li>Please wait up to 12 hours. I may be asleep</li>
                  <li>Best time to send is 1:00 PM UTC.</li>
                </ul>
                {this.state.tooLongDescriptionError ? (
                  <Form.Control.Feedback className="floatLeft" type="invalid">
                    Sorry, this is too long! Please use less than 500
                    characters.
                  </Form.Control.Feedback>
                ) : (
                  <></>
                )}
              </Form.Group>

              <Form.Group className="mb-3" id="formGridCheckbox">
                {/* <Form.Label>
                  <b>Is Offer Active?</b>
                </Form.Label> */}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={
                    this.state.offerActive ? <b>Active</b> : <b>Inactive</b>
                  }
                  //onChange={() => this.handleActive()}
                />

                <p>
                  <b>Active</b> means people can view the offer when searching.
                </p>
              </Form.Group>

              <div className="ButtonRightNoUnderline">
                <>
                  {this.state.validinstruction &&
                  this.state.validexRate &&
                  this.state.validminAmt &&
                  this.state.validmaxAmt &&
                  minMax ? (
                    <Button variant="primary" type="submit">
                      <b>Edit Offer</b>
                    </Button>
                  ) : (
                    <Button variant="primary" disabled>
                      <b>Edit Offer</b>
                    </Button>
                  )}
                </>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default EditOfferModal;
