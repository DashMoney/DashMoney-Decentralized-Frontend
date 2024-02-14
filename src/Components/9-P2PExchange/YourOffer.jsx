import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class YourOffer extends React.Component {
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

    return (
      <>
        <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
          <Card.Body>
            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              {/* <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.post.city}
              </Badge>

              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.post.region}
              </Badge>

              <Badge bg="primary">{this.props.post.country}</Badge> */}
            </div>

            <Card.Title className="cardTitle">{this.handleActive()}</Card.Title>

            <p style={{ whiteSpace: "pre-wrap" }}>
              {this.props.offer.instruction}
            </p>

            <p></p>

            <div className="ButtonRightNoUnderline">
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
