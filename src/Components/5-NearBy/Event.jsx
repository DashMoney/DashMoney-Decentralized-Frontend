//This will be the Post.jsx but for events
import React from "react";
import Badge from "react-bootstrap/Badge";
//import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

class Event extends React.Component {
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

    if (this.props.event.$ownerId === this.props.identity) {
      let myNameDoc = {
        $ownerId: this.props.identity,
        label: this.props.uniqueName,
      };
      nameDocToPass = myNameDoc;
    } else {
      nameDocToPass = this.props.EventNames.find((doc) => {
        return this.props.event.$ownerId === doc.$ownerId;
      });
    }

    return (
      <>
        <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
          <Card.Body
            onClick={() =>
              this.props.handleSearchedEvent(this.props.event, nameDocToPass)
            }
          >
            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.event.city}
              </Badge>

              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.event.region}
              </Badge>

              <Badge bg="primary">{this.props.event.country}</Badge>
            </div>

            <Card.Title className="cardTitle">
              {/* {this.handleName(this.props.post)} */}

              <h5
                style={{ color: "#008de3" }}
                // onClick={() => this.handleNameClick(nameDocToPass.label)}
              >
                {/* {nameDocToPass.label} */}
                {this.props.event.group}
              </h5>

              {/* <span>
    {this.state.copiedName?<span>✅</span>:<></>}
    </span> */}

              <span className="textsmaller">
                {this.formatDate(this.props.event.$createdAt)}
              </span>
            </Card.Title>

            <Card.Text style={{ whiteSpace: "pre-wrap" }}>
              {this.props.event.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Event;
