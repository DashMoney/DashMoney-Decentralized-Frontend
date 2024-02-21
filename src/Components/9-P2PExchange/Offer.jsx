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
              <h5>
                <b>Send</b>{" "}
                <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                  {this.props.offer.toMe} via {this.props.offer.toMeVia}
                </Badge>
              </h5>
            </div>
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
