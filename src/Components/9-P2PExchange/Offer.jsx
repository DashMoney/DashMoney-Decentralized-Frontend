import React from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

class Offer extends React.Component {
  handleFiatDisplay = (fiatInt) => {
    //Convert to 2 decimal places.
    let numToString = fiatInt.toString();
    let strLength = numToString.length;
    let firstPart = numToString.slice(0, strLength - 2);
    let secPart = numToString.slice(strLength - 2, strLength);
    return `${firstPart}.${secPart}`;
  };

  formatToMe = (toMePassed) => {
    switch (toMePassed) {
      case "USD":
        return "Dollar(USD)";
        break;
      case "EUR":
        return "Euro(EUR)";
        break;
      case "DASH":
        return "Dash";
        break;
      default:
        return toMePassed;
      // console.log(toMePassed);
    }
  };

  formatToMeVia = (toMeViaPassed, toMePassed) => {
    if (toMePassed !== "DASH") {
      return ` via ${toMeViaPassed
        .charAt(0)
        .toUpperCase()}${toMeViaPassed.slice(1)}`;
    } else {
      switch (toMeViaPassed) {
        case "paytoname":
          return " via Pay-to-Name";
          break;
        case "address":
          return " via Address";
          break;
        default:
          return ` via ${toMeViaPassed}`;
      }
    }
  };

  formatToU = (toUPassed) => {
    switch (toUPassed) {
      case "USD":
        return "Dollar(USD)";
        break;
      case "EUR":
        return "Euro(EUR)";
        break;
      case "DASH":
        return "Dash";
        break;
      default:
        return toUPassed;
      // console.log(toUPassed);
    }
  };

  formatToUVia = (toUViaPassed, toUPassed) => {
    if (toUPassed !== "DASH") {
      return ` via ${toUViaPassed.charAt(0).toUpperCase()}${toUViaPassed.slice(
        1
      )}`;
    }
  };

  formatDate(theCreatedAt) {
    let CreatedAt = new Date(theCreatedAt);

    let dateReturn = CreatedAt.toLocaleDateString();

    return dateReturn;
  }

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

    let nameDocToPass = ""; //this is the nameDoc and not the label

    if (this.props.offer.$ownerId === this.props.identity) {
      let myNameDoc = {
        $ownerId: this.props.identity,
        label: this.props.uniqueName,
      };
      nameDocToPass = myNameDoc;
    } else {
      nameDocToPass = this.props.OfferNames.find((doc) => {
        return this.props.offer.$ownerId === doc.$ownerId;
      });
    }

    return (
      <>
        <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
          <Card.Body
            onClick={() =>
              this.props.handleSearchedOffer(this.props.offer, nameDocToPass)
            }
          >
            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              <h4>
                <b>Send</b>{" "}
              </h4>
              <h4>
                <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                  {this.formatToMe(this.props.offer.toMe)}
                  {this.formatToMeVia(
                    this.props.offer.toMeVia,
                    this.props.offer.toMe
                  )}
                </Badge>
              </h4>
            </div>
            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              <h4>
                <b>Receive</b>{" "}
              </h4>
              <h4>
                <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                  {this.formatToU(this.props.offer.toU)}
                  {this.formatToUVia(
                    this.props.offer.toUVia,
                    this.props.offer.toU
                  )}
                </Badge>
              </h4>
            </div>
            {/* <Card.Title className="cardTitle"> */}
            {/* {this.handleName(this.props.post)} */}
            <p></p>
            <h5 style={{ textAlign: "center" }}>Exchange Rate(Fiat/Dash)</h5>
            <h4 style={{ textAlign: "center", color: "#008de3" }}>
              <b>{this.handleFiatDisplay(this.props.offer.exRate)}</b>
            </h4>
            <p></p>

            {/* </Card.Title> */}
            {/* <Card.Text style={{ whiteSpace: "pre-wrap" }}>
              {this.props.offer.instruction}
            </Card.Text> */}
            {/* <Card.Text> */}
            <p style={{ textAlign: "center", marginBottom: "0rem" }}>
              <b>Min - Max (Fiat):</b>{" "}
              <b>
                {this.handleFiatDisplay(this.props.offer.minAmt)} -{" "}
                {this.handleFiatDisplay(this.props.offer.maxAmt)}
              </b>
            </p>
            {/* </Card.Text> */}

            {/* <div className="locationTitle" style={{ marginBottom: ".5rem" }}> */}
            <p></p>
            <div style={{ marginBottom: ".5rem", textAlign: "right" }}>
              {/* Created by: */}

              <span> Created by: {nameDocToPass.label}</span>
              {/* <span className="textsmaller">
                {this.formatDate(this.props.offer.$updatedAt)}
              </span> */}
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Offer;
