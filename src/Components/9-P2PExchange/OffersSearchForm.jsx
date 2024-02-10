import React from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

class OffersSearchForm extends React.Component {
  onChange = (event) => {
    //console.log(event.target.value);

    event.preventDefault();
    event.stopPropagation();

    //console.log(`id = ${event.target.id}`);
    this.props.handleExchangeOffersSearchOnChangeValidation(event);
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    //console.log(event.target.ControlTextarea1.value);

    //this.props.searchOffers();
  };

  componentDidMount() {
    this.props.clearExchangeOffersForm();
  }

  render() {
    return (
      <>
        <Form
          id="Search-Offer-form"
          noValidate
          onSubmit={this.handleSubmitClick}
          onChange={this.onChange}
        >
          <h4 style={{ marginBottom: ".5rem" }}>
            <b>Send to Offer:</b>
          </h4>

          {/* toMe FORM BELOW */}
          <Form.Group className="mb-3" controlId="formtoMe">
            <Row>
              <Col>
                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  Send:
                </h5>
                {this.props.toMeInput === "Other" ? (
                  <>
                    <p className="smallertext">
                      (e.g. CHF, AUD, GBP, MXN, or INR)
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </Col>
              <Col>
                <Form.Select aria-label="Default select example">
                  <option value="">Options</option>
                  <option value="USD">Dollars(USD)</option>
                  <option value="EUR">Euro(EUR)</option>
                  <option value="Dash">Dash</option>
                  <option value="Other">Other</option>
                </Form.Select>

                {this.props.toMeInput === "Other" ? (
                  <>
                    <Form.Group //className="mb-3"
                      controlId="formtoMeOTHER"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter option"
                        required
                        isInvalid={this.props.tooLongtoMeErrorOTHER}
                        isValid={this.props.validtoMeOTHER}
                      />

                      <Form.Control.Feedback className="mt-1" type="invalid">
                        Option is too long.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </Form.Group>
          {this.props.validtoMe ? (
            <>
              {" "}
              {/* toMeVia FORM BELOW */}
              <Row>
                {this.props.toMeInput !== "Dash" ? (
                  <>
                    <Col>
                      <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                        Send via:
                      </h5>
                    </Col>
                  </>
                ) : (
                  <></>
                )}

                <Col>
                  {/* {this.props.toMeInput === "Dash" ? (
                        <>
                          <Form.Group //className="mb-3"
                            controlId="formtoMeViaDash"
                          >
                            <Form.Select aria-label="Default select example">
                              <option value="">Options</option>
                              <option value="PaytoName">Pay-to-Name</option>
                              <option value="Address">Address</option>
                            </Form.Select>
                          </Form.Group>
                        </>
                      ) : (
                        <></>
                      )} */}
                  {this.props.toMeInput !== "Dash" ? (
                    <>
                      <Form.Group //className="mb-3"
                        controlId="formtoMeVia"
                      >
                        <Form.Select aria-label="Default select example">
                          <option value="">Options</option>
                          <option value="Venmo">Venmo</option>
                          <option value="Velle">Velle</option>
                          <option value="Paypal">PayPal</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </>
                  ) : (
                    <></>
                  )}

                  {this.props.toMeViaInput === "Other" &&
                  this.props.toMeInput !== "Dash" ? (
                    <>
                      <Form.Group //className="mb-3"
                        controlId="formtoMeViaOTHER"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter option"
                          required
                          isInvalid={this.props.tooLongtoMeViaErrorOTHER}
                          isValid={this.props.validtoMeViaOTHER}
                        />
                        <Form.Control.Feedback className="mt-1" type="invalid">
                          Option is too long.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
              {/* <Form.Control.Feedback type="invalid">
                    Option is too long.
                  </Form.Control.Feedback> */}
              {/* toMeAddr FORM BELOW */}
            </>
          ) : (
            <></>
          )}

          {this.props.toMeFinal ? (
            <>
              {" "}
              <p
                className="smallertext"
                style={{ color: "green", padding: "0.2rem" }}
              >
                Payment option acceptable.
              </p>
            </>
          ) : (
            <></>
          )}

          <h4 style={{ marginBottom: ".5rem", marginTop: ".5rem" }}>
            <b>You Receive from Offer:</b>
          </h4>

          {/* toU FORM BELOW */}
          <Form.Group className="mb-3" controlId="formtoU">
            <Row>
              <Col>
                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  Receive (You):
                </h5>
                {this.props.toUInput === "Other" ? (
                  <>
                    <p className="smallertext">
                      (e.g. CHF, AUD, GBP, MXN, or INR)
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </Col>

              <Col>
                <Form.Select aria-label="Default select example">
                  <option value="">Options</option>
                  <option value="USD">Dollars(USD)</option>
                  <option value="EUR">Euro(EUR)</option>
                  <option value="Dash">Dash</option>
                  <option value="Other">Other</option>
                </Form.Select>

                {this.props.toUInput === "Other" ? (
                  <>
                    <Form.Group //className="mb-3"
                      controlId="formtoUOTHER"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter option"
                        required
                        isInvalid={this.props.tooLongtoUErrorOTHER}
                        isValid={this.props.validtoUOTHER}
                      />

                      <Form.Control.Feedback className="mt-1" type="invalid">
                        Option is too long.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </Form.Group>
          {/*  */}
          {this.props.validtoU ? (
            <>
              {" "}
              {/* toUVia FORM BELOW */}
              <Row>
                {this.props.toUInput !== "Dash" ? (
                  <>
                    <Col>
                      <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                        Receives via:
                      </h5>
                    </Col>
                  </>
                ) : (
                  <></>
                )}

                <Col>
                  {/* {this.props.toUInput === "Dash" ? (
                    <>
                      <Form.Group //className="mb-3"
                        controlId="formtoUViaDash"
                      >
                        <Form.Select aria-label="Default select example">
                          <option value="">Options</option>
                          <option value="PaytoName">Pay-to-Name</option>
                          <option value="Address">Address</option>
                        </Form.Select>
                      </Form.Group>
                    </>
                  ) : (
                    <></>
                  )} */}
                  {this.props.toUInput !== "Dash" ? (
                    <>
                      <Form.Group //className="mb-3"
                        controlId="formtoUVia"
                      >
                        <Form.Select aria-label="Default select example">
                          <option value="">Options</option>
                          <option value="Venmo">Venmo</option>
                          <option value="Velle">Velle</option>
                          <option value="Paypal">PayPal</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </>
                  ) : (
                    <></>
                  )}

                  {this.props.toUViaInput === "Other" &&
                  this.props.toUInput !== "Dash" ? (
                    <>
                      <Form.Group //className="mb-3"
                        controlId="formtoUViaOTHER"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter option"
                          required
                          isInvalid={this.props.tooLongtoUViaErrorOTHER}
                          isValid={this.props.validtoUViaOTHER}
                        />
                        <Form.Control.Feedback className="mt-1" type="invalid">
                          Option is too long.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            </>
          ) : (
            <></>
          )}

          {this.props.toUFinal ? (
            <>
              {" "}
              <p
                className="smallertext"
                style={{ color: "green", padding: "0rem" }}
              >
                Payment option acceptable.
              </p>
            </>
          ) : (
            <>
              <p></p>
            </>
          )}

          {this.props.toMeInput === "Dash" ||
          this.props.toMeInput === "" ||
          this.props.toUInput === "Dash" ||
          this.props.toUInput === "" ? (
            <></>
          ) : (
            <>
              {" "}
              <p className="smallertext" style={{ color: "red" }}>
                One of the options should be Dash. But.. You can do what you
                want.
              </p>
            </>
          )}

          {this.props.toMeInput === "Dash" && this.props.toUInput === "Dash" ? (
            <>
              {" "}
              <p className="smallertext" style={{ color: "red" }}>
                Only one of the options should be Dash. But.. It could be a good
                way to test if a user is viable as Dash spends instantly, and
                you can send really small amounts.
              </p>
            </>
          ) : (
            <></>
          )}

          {this.props.isLoadingExchangeSearch ? (
            <>
              <p> </p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
              <p> </p>
            </>
          ) : (
            <>
              {this.props.toMeFinal &&
              this.props.toUFinal &&
              !this.props.isLoadingExchangeSearch ? (
                <div className="ButtonRightNoUnderline">
                  <Button variant="primary" type="submit">
                    <b>Start Search </b>
                  </Button>
                </div>
              ) : (
                <div className="ButtonRightNoUnderline">
                  <Button disabled variant="primary" type="submit">
                    <b> Search </b>
                  </Button>
                </div>
              )}
            </>
          )}
        </Form>
      </>
    );
  }
}

export default OffersSearchForm;
