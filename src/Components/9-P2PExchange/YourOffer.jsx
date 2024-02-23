import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

class YourOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calcInput: 0,
    };
  }
  // should be alot like post but with buttons that say.. acutally not like post but like the modal becuase it shows all the data
  handleActive = () => {
    if (this.props.offer.active) {
      return (
        <span style={{ color: "#008de4" }}>
          <b>Active</b>
        </span>
      );
    } else {
      return (
        <span style={{ color: "#008de4" }}>
          <b>Inactive</b>
        </span>
      );
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

  formatDate(theCreatedAt) {
    let CreatedAt = new Date(theCreatedAt);

    let dateReturn = CreatedAt.toLocaleDateString();

    return dateReturn;
  }

  onChange = (event) => {
    // console.log(event.target.value);
    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formCalc") {
      event.preventDefault();
      event.stopPropagation();
      this.calcValidate(event.target.value);
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

  render() {
    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    let calcAmt = (this.state.calcInput * this.props.offer.exRate * 0.00001) //.001 for Dash conversion and .01 for fiat conversion
      .toFixed(2);

    return (
      <>
        <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
          <Card.Body>
            <div
              className="locationTitle"
              style={{ marginBottom: ".5rem" }}
            ></div>

            {/* <Card.Title className="cardTitle">{this.handleActive()}</Card.Title> */}

            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              <h5>
                {" "}
                <b>Send</b>{" "}
                <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                  {this.props.offer.toMe} via {this.props.offer.toMeVia}
                </Badge>
              </h5>
            </div>

            <div className="cardCenterTitle">
              <h5>
                <b>Send to </b>
                <b style={{ color: "#008de4" }}>
                  {this.props.offer.toMeHandle}
                </b>
              </h5>
            </div>
            <p></p>
            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              <h5>
                <b>Receive</b>{" "}
                {this.props.offer.toU === "Dash" ? (
                  <>
                    <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                      {this.props.offer.toU}
                    </Badge>
                  </>
                ) : (
                  <>
                    <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                      {this.props.offer.toU} via {this.props.offer.toUVia}
                    </Badge>
                  </>
                )}
              </h5>
            </div>
            <p></p>
            <div className="cardTitle">
              {/* <h4
              style={{ color: "#008de4" }}
              onClick={() =>
                this.handleNameClick(
                  this.props.offerNameDoc.label
                )
              }
            >
              {this.props.offerNameDoc.label}
            </h4>

            
            <span>{this.state.copiedName ? <span>✅</span> : <></>}</span> */}
              {this.handleActive()}

              <span className="textsmaller">
                {this.formatDate(this.props.offer.$updatedAt)}
              </span>
            </div>
            <div>
              <p></p>
              <h5 style={{ textAlign: "center" }}>Exchange Rate(Fiat/Dash)</h5>
              <h4 style={{ textAlign: "center", color: "#008de3" }}>
                <b>{this.handleFiatDisplay(this.props.offer.exRate)}</b>
              </h4>
              <p></p>
            </div>

            <p style={{ textAlign: "center", marginBottom: "0rem" }}>
              <b>Min - Max (Fiat):</b>{" "}
              <b>
                {this.handleFiatDisplay(this.props.offer.minAmt)} -{" "}
                {this.handleFiatDisplay(this.props.offer.maxAmt)}
              </b>
            </p>

            <p></p>

            <Card
              bg={cardBkg}
              text={cardText}
              style={{ border: "solid 2px white", padding: ".2rem" }}
            >
              <Form
                noValidate
                onChange={this.onChange}
                onSubmit={this.onSubmit}
              >
                <Form.Group className="mb-1" controlId="formCalc">
                  <Form.Label>
                    <h5 style={{ marginTop: ".2rem", marginBottom: "0rem" }}>
                      Exchange Calculator
                    </h5>
                  </Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Amount(Dash)"
                        required
                        //isValid={this.state.validminAmt}
                        // isInvalid={!this.state.validminAmt}
                      />
                    </Col>
                    <Col>
                      <h5 className="mt-1">
                        <b>Dash x Rate =</b>
                      </h5>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
              <p className="smallertext">
                (i.e. Must include 3 decimal precision)
              </p>

              <h5 style={{ paddingLeft: "2rem" }}>
                <b> = {calcAmt} (fiat)</b>
              </h5>
            </Card>
            <p></p>
            <h6>
              <b>Instructions</b>
            </h6>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {this.props.offer.instruction}
            </p>

            <p></p>

            <div className="TwoButtons">
              <Button
                variant="primary"
                onClick={() =>
                  this.props.handleDeleteYourOffer(this.props.index)
                }
              >
                <b>Delete Offer</b>
              </Button>
              <Button
                variant="primary"
                onClick={() => this.props.handleYourOffer(this.props.index)}
              >
                <b>Edit Offer</b>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default YourOffer;
