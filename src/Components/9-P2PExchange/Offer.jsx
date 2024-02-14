import React from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

class Offer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

  handleFiatDisplay = (fiatInt) => {
    //Convert to 2 decimal places.
    let numToString = fiatInt.toString();
    let strLength = numToString.length;
    let firstPart = numToString.slice(0, strLength - 2);
    let secPart = numToString.slice(strLength - 1, strLength);
    return { firstPart } + "." + { secPart };
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
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.offer.toMe} via {this.props.offer.toMeVia}
              </Badge>
              <span>(You send)</span>
            </div>
            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.offer.toU} via {this.props.offer.toUVia}
              </Badge>
              <span>(You receive)</span>
            </div>
            <Card.Title className="cardTitle">
              {/* {this.handleName(this.props.post)} */}

              <h5
                style={{ color: "#008de3" }}
                // onClick={() => this.handleNameClick(nameDocToPass.label)}
              >
                <b>
                  {this.handleFiatDisplay(this.props.offer.exRate)} (Fiat/Dash)
                </b>
              </h5>

              {/* <span>
    {this.state.copiedName?<span>✅</span>:<></>}
    </span> */}
            </Card.Title>
            {/* <Card.Text style={{ whiteSpace: "pre-wrap" }}>
              {this.props.offer.instruction}
            </Card.Text> */}
            <Card.Text>
              <p>
                Minimum (Fiat):{" "}
                {this.handleFiatDisplay(this.props.offer.minAmt)}
              </p>
              <p>
                Maximum (Fiat):{" "}
                {this.handleFiatDisplay(this.props.offer.maxAmt)}
              </p>
            </Card.Text>

            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              {/* Created by: */}

              <span> Created by: {nameDocToPass.label}</span>
              <span className="textsmaller">
                {this.formatDate(this.props.offer.$updatedAt)}
              </span>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Post;
