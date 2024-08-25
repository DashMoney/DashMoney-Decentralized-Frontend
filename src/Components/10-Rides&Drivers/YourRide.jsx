import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import handleDenomDisplay from "../UnitDisplay";
import getRelativeTimeAgo from "../TimeDisplayRelative";
import RideConfirmComponent from "./RideConfirmComponent";

class YourRide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      copiedPickupAddr: false,
      copiedDropoffAddr: false,
    };
  }
  // handleActive = () => {
  //   if (this.props.ride.reqTime + 200000 > (Date.now())) {
  //     return (
  //       <span style={{ color: "#008de4" }}>
  //         <b>Active</b>
  //       </span>
  //     );
  //   } else {
  //     return (
  //       <span style={{ color: "#008de4" }}>
  //         <b>Past</b>
  //       </span>
  //     );
  //   }
  // };

  handlePickupTime = () => {};

  verifyRequestStatus = (theConfirmedDrive, acceptReplies) => {
    //
    // confirmedDrive - rideReply-Confirmed OR undefined
    // acceptDrives -> rideReplies-Accepted
    //

    if (this.props.ride.txId1 !== "") {
      //pass to the verify payment function ->
      // console.log("Called Verify Payment Status");
      return this.verifyPaymentStatus();
    }

    if (
      this.props.ride.replyId !== this.props.identity &&
      theConfirmedDrive === undefined
    ) {
      //console.log("Acceptance Rejected");
      return <Badge bg="warning">Acceptance Error</Badge>;
    }
    //THIS NEEDS TO BE A BUTTON -> AND NEEDS A MODAL -> LATER ->

    if (
      this.props.ride.replyId === this.props.identity &&
      theConfirmedDrive === undefined &&
      acceptReplies.length === 0
    ) {
      //console.log("Requested");
      return <Badge bg="secondary">Requested</Badge>;
    }

    if (
      this.props.ride.replyId === this.props.identity &&
      theConfirmedDrive === undefined &&
      acceptReplies.length !== 0
    ) {
      //console.log("Awaiting Confirmation");
      return <Badge bg="warning">Awaiting Confirm</Badge>;
    }

    // if (ride.replyId === ride.$ownerId) {
    //   //console.log("Awaiting Confirmation");
    //   return <Badge bg="warning">Awaiting Confirm</Badge>;
    // }
    //what if confirmed and no paid Threads -> acceptance dropped -> reject and reset ->

    if (this.props.ride.replyId === theConfirmedDrive.$id) {
      //console.log("Confirmed");
      return <Badge bg="success">Confirmed</Badge>;
    }
  };

  verifyPaymentStatus = () => {
    //isLoadingWallet={this.props.isLoadingWallet}
    if (this.props.isLoadingWallet) {
      return <Badge bg="warning">Loading..</Badge>;
    }
    // accountHistory={this.props.accountHistory}
    //MAYBE USE THIS TO HANDLE WHEN TXID1 AND TXID2
    // if (theOrder.txId1 === "") {
    //   //console.log("Not Paid");
    //   return <Badge bg="warning">Pay Later</Badge>;
    // }
    //
    //DO I NEED TO WORRY ABOUT DUPLICATED TXIDS, IF YOU ARE THE DRIVER
    // 2)Check for duplicated do a count on the order.txIds for all the orders
    // let numOfPaidThrWithTxId = this.props.paidThrs.filter((thr) => {
    //   return thr.txId === paidThrs[0].txId; //because only paidThrs of length 1 should reach this point
    // });
    // if (numOfPaidThrWithTxId.length !== 1) {
    //   console.log("Failed on Error 1");
    //   return <Badge bg="danger">Fail</Badge>;
    // }
    //
    //3) Make sure there is a wallet TX that matches  txId
    //accountHistory={this.props.accountHistory}
    let walletTx = this.props.accountHistory.find((tx) => {
      // console.log("Wallet TX: ", tx);
      return tx.txId === this.props.ride.txId1;
    });
    if (walletTx === undefined) {
      //This may be the issue that cause early fail ->
      // Can I check instasend?
      console.log("Failed on Error 2");
      return <Badge bg="danger">Payment Fail</Badge>;
    }
    //ADDED TO CHECK BC TIME DEFAULTS TO FUTURE IF NO INSTALOCK 9999999999000
    //CURRENTLY THE INSTASEND LOCK IS NOT WORKING ON TESTNET
    // if(!walletTx.isInstantLocked  ){
    //   return <Badge bg="warning">Verifying..</Badge>;
    // }
    //
    // 4) check that the order createAT and tx time are within a few minutes
    // let walletTxTime = new Date(walletTx.time);
    // //console.log('Wallet TX Time valueOf: ', walletTxTime.valueOf());
    // if (walletTxTime.valueOf() - theOrder.$updatedAt > 350000) {
    //   //***This is added due to testnet lack of instasend lock */
    //   if (walletTxTime.valueOf() > theOrder.$updatedAt) {
    //     return <Badge bg="primary">Paid</Badge>;
    //   }
    //   //console.log(walletTxTime.valueOf() - theOrder.$createdAt)
    //   console.log("Failed on Error 3"); //!!!!!!!!!!!!
    //   console.log(this.props.accountHistory);
    //   console.log(walletTxTime.valueOf());
    //   return <Badge bg="danger">Fail</Badge>;
    // }
    //5) make sure the tx amt === request amt

    //
    if (this.props.ride.$ownerId === this.props.identity) {
      if (this.props.ride.amt === -walletTx.satoshisBalanceImpact) {
        return <Badge bg="success">Paid</Badge>;
      }
    }
    if (this.props.ride.$ownerId !== this.props.identity) {
      if (this.props.ride.amt === walletTx.satoshisBalanceImpact) {
        return <Badge bg="success">Paid</Badge>;
      }
    }
    // if (this.props.ride.amt === walletTx.satoshisBalanceImpact) {
    //   return <Badge bg="success">Paid</Badge>;
    // } else {
    console.log("Failed on Error 4");
    return <Badge bg="danger">Fail</Badge>;
    //}
  };

  payDriverPropsToPass = (
    theIndex,
    theRideReply,
    theReplyNameDoc
    /// theAddressDoc
  ) => {
    let replyAddressDoc = this.props.YourRideReplyAddresses.find(
      (replyAddress) => {
        return replyAddress.$ownerId === theRideReply.$ownerId;
      }
    );
    //What if return undefined -> handle in modal
    //pass an empty [] instead -> ??

    this.props.handlePayDriver(
      theIndex,
      theRideReply,
      theReplyNameDoc,
      replyAddressDoc
    );
    //   (index, // rideReq,
    //   rideReply,
    //   nameDoc,
    //   addressDoc)
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

    let priceUnit = "";
    let priceUnitDisplay;

    priceUnit = (this.props.ride.amt / this.props.ride.timeEst) * 30;

    priceUnitDisplay = handleDenomDisplay(this.props.whichNetwork, priceUnit);
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
    // YourRideReplies={this.props.YourRideReplies}
    // YourRideReplyNames={this.props.YourRideReplyNames}
    //
    //Get the rideReply that is confirmed.
    // 1) get the confirmed rideReply of the YourRideReplies
    let confirmedDrive = this.props.YourRideReplies.find((reply) => {
      return reply.$id === this.props.ride.replyId;
    });
    //console.log(`ConfirmedDrive: ${confirmedDrive}`);
    //
    //If ride is unconfirmed then get all accepted
    let acceptDrives = [];
    //
    if (confirmedDrive === undefined) {
      acceptDrives = this.props.YourRideReplies.filter((reply) => {
        return reply.amt === this.props.ride.amt;
      });
    }
    // console.log(`Accepted Drives: ${acceptDrives}`);
    //
    // If confirmed get only threads from that
    let replyThrs = [];
    //
    if (confirmedDrive !== undefined) {
      replyThrs = this.props.YourRideReplies.filter((reply) => {
        return (
          (this.props.identity === reply.$ownerId ||
            confirmedDrive.$ownerId === reply.$ownerId) &&
          reply.amt === 0
        );
      });
    }

    // If confirmedDrive get that name only
    //
    // If confirmed undefined get all names for replies

    let replyNames = [];

    if (confirmedDrive === undefined && acceptDrives !== undefined) {
      replyNames = acceptDrives.map((drive) => {
        let name = this.props.YourRideReplyNames.find((replyName) => {
          return replyName.$ownerId === drive.$ownerId;
        });
        return name;
      });
    } else if (confirmedDrive !== undefined) {
      replyNames = this.props.YourRideReplyNames.find((replyName) => {
        return replyName.$ownerId === confirmedDrive.$ownerId;
      });
    }
    //
    // confirmedDrive
    // acceptDrives
    // replyThrs
    // replyNames ->

    //this.props.YourRideReplyAddresses ->
    //this.props.payDriver();

    //NEED ACCEPTDRIVES -> CONFIRMDRIVER COMPONENT
    //
    //
    let DriversToConfirm = [];
    if (confirmedDrive === undefined) {
      DriversToConfirm = acceptDrives.map((driver, index) => {
        return (
          <RideConfirmComponent
            whichNetwork={this.props.whichNetwork}
            today={this.props.today}
            yesterday={this.props.yesterday}
            key={index}
            index={index}
            rideIndex={this.props.index}
            mode={this.props.mode}
            driverReply={driver}
            driverReplyNames={replyNames}
            handleConfirmYourDriverModal={
              this.props.handleConfirmYourDriverModal
            }
          />
        );
      });
    }

    // replyThrs -> NEED COMPONENT TO CONFIRM DRIVER
    //
    // replyNames -> accepts or just confirm
    //
    let replyMessages = [];
    if (confirmedDrive !== undefined) {
      replyMessages = replyThrs.map((msg, index) => {
        return (
          <Card
            id="comment"
            key={index}
            index={index}
            bg={cardBkg}
            text={cardText}
          >
            <Card.Body>
              <Card.Title className="cardTitle">
                {msg.$ownerId === this.props.identity ? (
                  <b style={{ color: "#008de4" }}>{this.props.uniqueName}</b>
                ) : (
                  <b style={{ color: "#008de4" }}>{replyNames.label}</b>
                )}
                {/* <b style={{ color: "#008de4" }}>{replyNames.label}</b> */}
                {/* <span className="textsmaller">
                    {this.formatDate(msg.$createdAt, today, yesterday)}
                  </span> */}
              </Card.Title>
              <Card.Text>{msg.msg}</Card.Text>
            </Card.Body>
          </Card>
        );
      });
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

            <Card.Title style={{ display: "flex", justifyContent: "center" }}>
              {/* User Name - no bc its my name */}
              {/* Status -> Waiting Accept, */}
              {/* {this.handleActive()} */}
              {/* calculate time left */}
              {this.verifyRequestStatus(confirmedDrive, acceptDrives)}
            </Card.Title>

            <p></p>

            <div className="cardTitle">
              <div>
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {this.props.ride.pickupAddr}
                </span>
              </div>

              {/* <Button
                variant="outline-primary"
                onClick={() => {
                  navigator.clipboard.writeText(this.props.ride.pickupAddr);
                  this.setState({
                    copiedPickupAddr: true,
                  });
                }}
              >
                {this.state.copiedPickupAddr ? <b>Copied!</b> : <b>Copy</b>}
              </Button> */}
            </div>

            <p></p>

            <div className="cardTitle">
              <span style={{ whiteSpace: "pre-wrap" }}>
                {this.props.ride.dropoffAddr}
              </span>

              {/* <Button
                variant="outline-primary"
                onClick={() => {
                  navigator.clipboard.writeText(this.props.ride.dropoffAddr);
                  this.setState({
                    copiedDropoffAddr: true,
                  });
                }}
              >
                {this.state.copiedDropoffAddr ? <b>Copied!</b> : <b>Copy</b>}
              </Button> */}
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
              Pays{" "}
              <b>
                {handleDenomDisplay(
                  this.props.whichNetwork,
                  this.props.ride.amt
                )}
              </b>
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

            {/* {this.props.handleConfirmYourDriverModal}
                      //index, 
                      //rideReply
                    {this.props.handleEditYourRide}
                    //index
                    {this.props.handleDeleteYourRide}
                    //index */}

            <p></p>
            {confirmedDrive === undefined && acceptDrives.length === 0 ? (
              <>
                <div className="TwoButtons">
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.props.handleDeleteYourRide(this.props.index)
                    }
                  >
                    <b>Delete Ride</b>
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.props.handleEditYourRide(this.props.index)
                    }
                  >
                    <b>Edit Ride</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Add THE PAY DRIVER BUTTON */}
            {confirmedDrive !== undefined && this.props.ride.txId1 === "" ? (
              <>
                <div className="d-grid gap-2" id="button-edge-noTop">
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.payDriverPropsToPass(
                        this.props.index,
                        confirmedDrive,
                        replyNames
                      )
                    }
                    style={{
                      fontSize: "larger",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                    }}
                  >
                    <b>Pay Driver</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
            {confirmedDrive === undefined ? <></> : <></>}

            <div
              className="BottomBorder"
              style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
            ></div>
            <div
              className="cardTitle"
              style={{ marginTop: ".4rem", marginBottom: ".5rem" }}
            >
              <h5>Responses</h5>
              {this.verifyRequestStatus(confirmedDrive, acceptDrives)}
            </div>
            {/* l      l */}
            {/* isYourRidesRefreshReady={this.props.isYourRidesRefreshReady}
                    refreshYourRides={this.props.refreshYourRides} */}
            {/* l      l */}
            {/* {confirmedDrive !== undefined ? <></> : <></>} */}
            {/* l      l */}
            {this.props.isYourRidesRefreshReady ? (
              // !this.props.LoadingStore &&
              // !this.props.isLoadingWallet &&
              // !this.props.LoadingOrders
              <div className="d-grid gap-2" id="button-edge-noTop">
                <Button
                  variant="primary"
                  onClick={() => {
                    this.props.refreshYourRides();
                  }}
                  style={{
                    fontSize: "larger",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  <b>Refresh</b>
                </Button>
              </div>
            ) : (
              <>
                <div className="d-grid gap-2" id="button-edge-noTop">
                  <Button
                    variant="primary"
                    disabled
                    style={{
                      fontSize: "larger",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                    }}
                  >
                    <b>Refresh</b>
                  </Button>
                </div>
              </>
            )}
            {/* <div className="d-grid gap-2">
              <Button
                variant="primary"
                //onClick={() => this.props.refreshRideRequest(rideDoc)}
                style={{
                  fontSize: "larger",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <b>Refresh</b>
              </Button> 
            </div>*/}

            {confirmedDrive !== undefined ? (
              <>
                <h5>
                  <span
                    style={{
                      marginTop: ".2rem",
                      marginBottom: "0rem",
                    }}
                  >
                    <b>Driver:</b>
                  </span>
                  <span
                    style={{
                      color: "#008de3",
                      marginTop: ".2rem",
                      marginBottom: "0rem",
                    }}
                  >
                    {" "}
                    <b>{replyNames.label}</b>
                  </span>
                </h5>
                <p></p>
              </>
            ) : (
              <></>
            )}
            {confirmedDrive === undefined ? <>{DriversToConfirm}</> : <></>}
            {confirmedDrive === undefined && acceptDrives.length === 0 ? (
              <>
                <p style={{ textAlign: "center", paddingTop: ".5rem" }}>
                  (Currently, there are no responses to this ride request.)
                </p>
              </>
            ) : (
              <></>
            )}

            {replyMessages}

            {/* // confirmedDrive
    // acceptDrives
    // replyThrs
    // replyNames  */}

            {confirmedDrive !== undefined ? (
              <>
                <div className="ButtonRightNoUnderline">
                  <Button
                    variant="primary"
                    onClick={
                      () =>
                        this.props.handleYourRideMsgModalShow(
                          this.props.ride,
                          replyNames
                        )
                      // this.props.handleYourRideMsgModalShow = (rideReqDoc, nameDoc)
                    }
                  >
                    <b>Add Message</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default YourRide;
