import React from "react";
//import Badge from 'react-bootstrap/Badge';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import Dash from "dash";

// const {
//   Essentials: { Buffer },
//   PlatformProtocol: { Identifier },
// } = Dash;

const {
  Core: { Message },
} = Dash;

class Proof extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      copiedAddr: false,
    };
  }

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

  handleAddrClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

  // handleName = (msgDoc) =>{
  //   if(msgDoc.$ownerId === this.props.identity){
  //   return <span style={{ color: "#008de4" }}>{this.props.uniqueName}</span>
  //   }

  //   //*** *** */
  //     let nameDoc = this.props.PostNames.find(doc => {
  //       return msgDoc.$ownerId === doc.$ownerId
  //     })

  //     if(nameDoc === undefined){
  //       return 'Not Found'
  //     }

  //     return <span style={{ color: "#008de4" }} onClick={() => this.handleNameClick(nameDoc.label)}>
  //       {nameDoc.label}
  //       </span>

  // }

  getRelativeTimeAgo(messageTime, timeNow) {
    let timeDifference = timeNow - messageTime;

    if (timeDifference >= 84600000) {
      let longFormDate = new Date();
      longFormDate.setTime(messageTime);
      return longFormDate.toLocaleDateString();
    }

    /*
    Calculate milliseconds in a year
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    */

    if (timeDifference < 15000) {
      return "Just now";
    } else if (timeDifference < 44000) {
      return "Few moments ago";
    } else if (timeDifference < 90000) {
      return "1 min ago";
    } else if (timeDifference < 150000) {
      return "2 min ago";
    } else if (timeDifference < 210000) {
      return "3 min ago";
    } else if (timeDifference < 270000) {
      return "4 min ago";
    } else if (timeDifference < 330000) {
      return "5 min ago";
    } else if (timeDifference < 390000) {
      return "6 min ago";
    } else if (timeDifference < 450000) {
      return "7 min ago";
    } else if (timeDifference < 510000) {
      return "8 min ago";
    } else if (timeDifference < 570000) {
      return "9 min ago";
    } else if (timeDifference < 660000) {
      return "10 min ago";
    } else if (timeDifference < 840000) {
      return "12 min ago";
    } else if (timeDifference < 1020000) {
      return "15 min ago";
    } else if (timeDifference < 1140000) {
      return "18 min ago";
    } else if (timeDifference < 1380000) {
      return "20 min ago";
    } else if (timeDifference < 1650000) {
      return "25 min ago";
    } else if (timeDifference < 1950000) {
      return "30 min ago";
    } else if (timeDifference < 2250000) {
      return "35 min ago";
    } else if (timeDifference < 2550000) {
      return "40 min ago";
    } else if (timeDifference < 3000000) {
      return "45 min ago";
    } else if (timeDifference < 5400000) {
      return "1 hr ago";
    } else if (timeDifference < 9000000) {
      return "2 hrs ago";
    } else if (timeDifference < 12600000) {
      return "3 hrs ago";
    } else if (timeDifference < 18000000) {
      return "5 hrs ago";
    } else if (timeDifference < 43200000) {
      return "Many hrs ago";
    } else if (timeDifference < 84600000) {
      return "About a day ago";
    }
  }

  proveMessage() {
    const message = new Message(this.props.proof.message);

    let verify;
    try {
      verify = message.verify(
        this.props.proof.address,
        this.props.proof.signature
      );
    } catch (err) {
      return false;
    }

    if (verify) {
      return true;
    } else {
      return false;
    }
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

    return (
      <>
        <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
          <Card.Body>
            <Card.Title className="cardTitle">
              {/* {this.handleName(this.props.post)} */}

              <h3
                style={{ color: "#008de3" }}
                // onClick={() => this.handleNameClick(nameToPass)}
              >
                {/* {nameToPass} */}
                <b>{this.props.SearchedNameDoc.label}</b>
              </h3>

              {/* <span>
    {this.state.copiedName?<span>✅  👍</span>:<></>}
    </span> */}

              <span className="textsmaller">
                {this.getRelativeTimeAgo(
                  this.props.proof.$updatedAt,
                  this.props.date
                )}
              </span>
            </Card.Title>

            {/* <Card.Text
          // onClick={()=>this.props.handleSearchedPost(this.props.post, nameToPass)}
          
          > */}

            <h5>
              <b>1) Address of Funds</b>
            </h5>
            {/* style={{ color: "#008de4" }} */}
            <p>{this.props.proof.address}</p>

            {/* className="ButtonRightNoUnderline" */}
            <Button
              variant="primary"
              onClick={() => {
                navigator.clipboard.writeText(this.props.proof.address);
                this.setState({
                  copiedAddr: true,
                });
              }}
            >
              <b>Copy Address</b>
            </Button>
            {this.state.copiedAddr ? <span> Copied! </span> : <></>}
            <p></p>
            <div className="ProofBorder"></div>
            <h5>
              <b>2) Verify Funds with Block Explorer</b>
            </h5>

            <p>
              <b>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://testnet-insight.dashevo.org/insight/"
                >
                  https://testnet-insight.dashevo.org/insight/
                </a>
              </b>
            </p>
            <div className="ProofBorder"></div>
            <h5>
              <b>3) Signed Message</b>
            </h5>

            {/* if signature for message and addr is true display message else display error message */}
            {this.proveMessage() ? (
              <>
                <p style={{ color: "#008de4" }} className="indentStuff">
                  <b>{this.props.proof.message}</b>
                </p>
                <p></p>
              </>
            ) : (
              <>
                <Alert variant="danger">
                  <Alert.Heading>Failure</Alert.Heading>
                  <p>Signature Failed - Proof is not authentic!</p>
                </Alert>
              </>
            )}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Proof;
