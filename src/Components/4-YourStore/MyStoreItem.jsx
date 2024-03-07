import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class MyStoreItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleDenomDisplay = (duffs) => {
    if (duffs >= 1000000) {
      return (
        <span style={{ color: "#008de4" }}>
          {(duffs / 100000000).toFixed(3)} Dash
        </span>
      );
    } else {
      return (
        // <span style={{ color: "#008de4" }}>
        //   {(duffs / 100000).toFixed(2)} mDash
        // </span>
        <span style={{ color: "#008de4" }}>{(duffs / 1000).toFixed(0)} kD</span>
      );
    }
  };

  handleAvail = () => {
    if (this.props.item.avail) {
      if (Number(this.props.item.price) === 0) {
        return (
          <span style={{ color: "#008de4" }}>
            <b>Tracking Only</b>
          </span>
        );
      } else {
        return this.handleDenomDisplay(this.props.item.price);
      }
    } else {
      return <span style={{ color: "#008de4" }}>Unavailable</span>;
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
      <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
        <Card.Body>
          <Card.Title className="cardTitle">
            <b>{this.props.item.name}</b>
            {this.handleAvail()}

            {/* <span className="textsmaller">
              {this.getRelativeTimeAgo(this.props.tuple[1].$createdAt, this.props.date)}
            </span> */}
          </Card.Title>

          <Card.Text>{this.props.item.description}</Card.Text>
          <Button
            variant="primary"
            onClick={() => this.props.handleSelectedItem(this.props.index)}
          >
            <b>Edit Item</b>
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default MyStoreItem;
