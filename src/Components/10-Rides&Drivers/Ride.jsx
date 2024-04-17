import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import handleDenomDisplay from "../UnitDisplay";
import getRelativeTimeAgo from "../TimeDisplayRelative";

class Ride extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      copiedPickupAddr: false,
      copiedDropoffAddr: false,
    };
  }

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

  // verifyRequestStatus = (paidThrs) => {
  //   if (
  //     //this.props.ride.msgId !== this.props.identity ||
  //     this.props.ride.msgId !== "" &&
  //     paidThrs.length === 0
  //   ) {
  //     //console.log("Acceptance Rejected");
  //     //THIS NEEDS TO BE A BUTTON -> AND NEEDS A MODAL
  //     return <Badge bg="warning">Acceptance Rejected</Badge>;
  //   }

  //   if (paidThrs.length === 0) {
  //     //console.log("Requested");
  //     return <Badge bg="success">Requested</Badge>;
  //   }
  //   //what if confirmed and no paid Threads -> acceptance dropped -> reject and reset ->

  //   if (
  //     this.props.ride.msgId !== "" //this.props.identity
  //   ) {
  //     //console.log("Confirmed");
  //     return <Badge bg="success">Confirmed</Badge>;
  //   }

  //   // if (theOrder.txId1 === "") {
  //   //   //console.log("Not Paid");
  //   //   return <Badge bg="warning">Pay Later</Badge>;
  //   // }

  //   // 2)Check for duplicated do a count on the order.txIds for all the orders

  //   // paidThrs ={paidThrs_BYYOU}
  //   // replyThrs ={replyThrs_BYYOU}

  //   // let numOfPaidThrWithTxId = this.props.paidThrs.filter((thr) => {
  //   //   return thr.txId === paidThrs[0].txId; //because only paidThrs of length 1 should reach this point
  //   // });

  //   // if (numOfPaidThrWithTxId.length !== 1) {
  //   //   console.log("Failed on Error 1");
  //   //   return <Badge bg="danger">Fail</Badge>;
  //   // }

  //   //3) Make sure there is a wallet TX that matches  txId

  //   //accountHistory={this.props.accountHistory}

  //   // let walletTx = this.props.accountHistory.find((tx) => {
  //   //   // console.log("Wallet TX: ", tx);
  //   //   return tx.txId === paidThrs[0].txId;
  //   // });
  //   // if (walletTx === undefined) {
  //   //   //This may be the issue that cause early fail ->
  //   //   // Can I check instasend?
  //   //   console.log("Failed on Error 2");
  //   //   return <Badge bg="danger">Fail</Badge>;
  //   // }
  //   //ADDED TO CHECK BC TIME DEFAULTS TO FUTURE IF NO INSTALOCK 9999999999000
  //   //CURRENTLY THE INSTASEND LOCK IS NOT WORKING ON TESTNET
  //   // if(!walletTx.isInstantLocked  ){
  //   //   return <Badge bg="warning">Verifying..</Badge>;
  //   // }
  //   //

  //   // 4) check that the order createAT and tx time are within a few minutes

  //   // let walletTxTime = new Date(walletTx.time);
  //   // //console.log('Wallet TX Time valueOf: ', walletTxTime.valueOf());

  //   // if (walletTxTime.valueOf() - theOrder.$updatedAt > 350000) {
  //   //   //***This is added due to testnet lack of instasend lock */
  //   //   if (walletTxTime.valueOf() > theOrder.$updatedAt) {
  //   //     return <Badge bg="primary">Paid</Badge>;
  //   //   }

  //   //   //console.log(walletTxTime.valueOf() - theOrder.$createdAt)
  //   //   console.log("Failed on Error 3"); //!!!!!!!!!!!!
  //   //   console.log(this.props.accountHistory);
  //   //   console.log(walletTxTime.valueOf());
  //   //   return <Badge bg="danger">Fail</Badge>;
  //   // }

  //   //5) make sure the tx amt === request amt

  //   // if (this.props.tuple[1].$ownerId === this.props.identity) {
  //   //   if (this.props.tuple[1].amt === walletTx.satoshisBalanceImpact) {
  //   //     return <Badge bg="primary">Paid</Badge>;
  //   //   }
  //   // }
  //   // if (this.props.tuple[1].$ownerId !== this.props.identity) {
  //   //   if (this.props.tuple[1].amt === -walletTx.satoshisBalanceImpact) {
  //   //     return <Badge bg="primary">Paid</Badge>;
  //   //   }
  //   // }

  //   // if (this.props.tuple[1].amt === walletTx.satoshisBalanceImpact) {
  //   //   return <Badge bg="primary">Paid</Badge>;
  //   // } else {
  //   // console.log("Failed on Error 4");
  //   // return <Badge bg="danger">Fail</Badge>;
  //   // // }
  // };

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

    if (this.props.ride.$ownerId === this.props.identity) {
      let myNameDoc = {
        $ownerId: this.props.identity,
        label: this.props.uniqueName,
      };
      nameDocToPass = myNameDoc;
    } else {
      nameDocToPass = this.props.SearchedDrivesNames.find((doc) => {
        return this.props.ride.$ownerId === doc.$ownerId;
      });
    }

    let priceUnit = "";
    let priceUnitDisplay;

    priceUnit = (this.props.ride.amt / this.props.ride.timeEst) * 30;

    priceUnitDisplay = handleDenomDisplay(priceUnit);
    //per half hour.. //bc per minute is small and could be kD..

    let paymentSchedule = "";

    switch (
      this.props.ride.pmtType // pmtType: 1 On Dropoff
    ) {
      case 1:
        paymentSchedule = <b>On Dropoff</b>;
        break;
      case 2:
        paymentSchedule = <b>On Pickup</b>;
        break;
      default:
        paymentSchedule = <b>1/2 & 1/2</b>;
    }

    {
      /* 

// reqTime: 1713220087357 -> Tab label  // msgId: "" // txId1: ""


How to do status -> In Quene, Otherwise
no confirm past time -> Past Time check (reqTime + 20) vs Date.Now 
confirm -> Pay on Arrival -> MSGID points to self OwnerId 
Paid -> Check TX first


 */
    }

    return (
      <>
        <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
          <Card.Body>
            <div
              className="locationTitle"
              style={{ marginBottom: ".4rem", marginTop: ".4rem" }}
            >
              {this.props.ride.area !== "" &&
              this.props.ride.area !== undefined ? (
                <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                  {this.props.ride.area}
                </Badge>
              ) : (
                <></>
              )}

              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.ride.city}
              </Badge>

              <Badge bg="primary">{this.props.ride.region}</Badge>
            </div>

            <Card.Title className="cardTitle">
              {/* {this.handleName(this.props.post)} */}

              <span
                style={{
                  color: "#008de3",
                  marginTop: ".2rem",
                  marginBottom: "0rem",
                }}
                onClick={() => this.handleNameClick(nameDocToPass.label)}
              >
                <b>{nameDocToPass.label}</b>
              </span>

              <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>

              {/* <span className="textsmaller">
                {this.formatDate(this.props.post.$createdAt)}
              </span> */}
            </Card.Title>

            <p></p>

            <div className="cardTitle">
              <div>
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {this.props.ride.pickupAddr}
                </span>
              </div>

              <Button
                variant="outline-primary"
                onClick={() => {
                  navigator.clipboard.writeText(this.props.ride.pickupAddr);
                  this.setState({
                    copiedPickupAddr: true,
                  });
                }}
              >
                {this.state.copiedPickupAddr ? <b>Copied!</b> : <b>Copy</b>}
              </Button>
            </div>

            <p></p>

            <div className="cardTitle">
              <span style={{ whiteSpace: "pre-wrap" }}>
                {this.props.ride.dropoffAddr}
              </span>

              <Button
                variant="outline-primary"
                onClick={() => {
                  navigator.clipboard.writeText(this.props.ride.dropoffAddr);
                  this.setState({
                    copiedDropoffAddr: true,
                  });
                }}
              >
                {this.state.copiedDropoffAddr ? <b>Copied!</b> : <b>Copy</b>}
              </Button>
            </div>
            <p></p>
            <p style={{ marginBottom: ".2rem" }}>
              Estimated Time: <b>{this.props.ride.timeEst} minutes</b>
            </p>

            <p style={{ marginTop: "0rem", marginBottom: ".2rem" }}>
              Estimated Distance: <b>{this.props.ride.distEst}</b>
            </p>
            <div
              className="BottomBorder"
              style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
            ></div>
            <p
              style={{
                marginTop: ".6rem", //, textAlign: "right"
              }}
            >
              Pickup Time:{" "}
              <b style={{ color: "#008de4" }}>
                {getRelativeTimeAgo(this.props.ride.reqTime, Date.now())}
              </b>
            </p>

            <h5 style={{ marginTop: ".2rem", textAlign: "center" }}>
              {" "}
              Pays <b>{handleDenomDisplay(this.props.ride.amt)}</b>
            </h5>

            <p style={{ textAlign: "center", marginBottom: ".2rem" }}>
              ({priceUnitDisplay} per 30 minutes)
            </p>
            <div
              className="BottomBorder"
              style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
            ></div>

            <p style={{ marginBottom: ".2rem" }}>Payment: {paymentSchedule}</p>

            {/* <p style={{ whiteSpace: "pre-wrap" }}>
              {this.props.post.description}
            </p> */}

            <p style={{ marginTop: "0rem", marginBottom: ".2rem" }}>
              Passengers: <b>{this.props.ride.numOfRiders}</b>
            </p>

            {this.props.ride.extraInstr !== undefined &&
            this.props.ride.extraInstr !== "" ? (
              <>
                <p
                  style={{
                    paddingBottom: "0.5rem",
                    whiteSpace: "pre-wrap",
                    textAlign: "center",
                  }}
                >
                  <b>{this.props.ride.extraInstr}</b>
                </p>
              </>
            ) : (
              <></>
            )}

            <p></p>

            <div className="TwoButtons">
              <Button
                variant="primary"
                // onClick={() =>
                //   this.props.handleDeleteYourRide(this.props.index)
                // }
              >
                <b>Reply</b>
              </Button>
              <Button
                variant="primary"
                // onClick={() => this.props.handleYourRide(this.props.index)}
              >
                <b>Accept</b>
              </Button>
            </div>
            {/* <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div>
            <div
              className="cardTitle"
              style={{ marginTop: ".4rem", marginBottom: ".5rem" }}
            >
              <h5>Driver Responses</h5>
              {this.verifyRequestStatus([])}
            </div>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                //onClick={() => this.props.refreshRideRequest(rideDoc)}
              >
                <b>Refresh Responses</b>
              </Button>
            </div>
            <p style={{ textAlign: "center", paddingTop: ".5rem" }}>
              (Currently, there are no responses to this ride request.
            </p> */}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Ride;
