import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class YourPost extends React.Component {
  // should be alot like post but with buttons that say.. acutally not like post but like the modal becuase it shows all the data
  handleActive = () => {
    if (this.props.post.active) {
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
    let categoryDisplay;

    switch (this.props.post.category) {
      case "offrent":
        categoryDisplay = (
          <div>
            <h3 style={{ marginTop: ".5rem", marginBottom: ".1rem" }}>
              <b>Offering</b>
            </h3>
            <Button>Place to Rent</Button>
          </div>
        );
        break;

      case "offbiz":
        categoryDisplay = (
          <div>
            <h3 style={{ marginTop: ".5rem", marginBottom: ".1rem" }}>
              <b>Offering</b>
            </h3>
            <Button>Business/DGP</Button>
          </div>
        );
        break;

      case "offother":
        categoryDisplay = (
          <div>
            <h3 style={{ marginTop: ".5rem", marginBottom: ".1rem" }}>
              <b>Offering</b>
            </h3>
            <Button>Other</Button>
          </div>
        );
        break;

      case "lookrent":
        categoryDisplay = (
          <div>
            <h3 style={{ marginTop: ".5rem", marginBottom: ".1rem" }}>
              <b>Looking For</b>
            </h3>
            <Button>Place to Rent</Button>
          </div>
        );
        break;

      case "lookother":
        categoryDisplay = (
          <div>
            <h3 style={{ marginTop: ".5rem", marginBottom: ".1rem" }}>
              <b>Looking For</b>
            </h3>
            <Button>Other</Button>
          </div>
        );
        break;

      default:
        categoryDisplay = (
          <div>
            <h3 style={{ marginTop: ".5rem", marginBottom: ".1rem" }}>
              <b>Offering</b>
            </h3>
            <Button>Place to Rent</Button>
          </div>
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

    return (
      <>
        <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
          <Card.Body>
            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.post.city}
              </Badge>

              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.post.region}
              </Badge>

              <Badge bg="primary">{this.props.post.country}</Badge>
            </div>

            <Card.Title className="cardTitle">
              {categoryDisplay}

              {this.handleActive()}
            </Card.Title>

            <p>{this.props.post.description}</p>

            {this.props.post.link !== undefined &&
            this.props.post.link !== "" ? (
              <>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={this.props.post.link}
                >
                  <b>{this.props.post.link}</b>
                </a>
              </>
            ) : (
              <></>
            )}

            <p></p>

            <div className="ButtonRightNoUnderline">
              <Button
                variant="primary"
                onClick={() => this.props.handleYourPost(this.props.index)}
              >
                Edit post
              </Button>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default YourPost;
