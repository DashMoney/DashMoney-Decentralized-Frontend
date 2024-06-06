import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import handleDenomDisplay from "../UnitDisplay";
import getRelativeTimeAgo from "../TimeDisplayRelative";

class YourDrive extends React.Component {
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

  verifyRequestStatus = (ride, paidThrs) => {
    if (ride.txId1 !== "") {
      //pass to the verify payment function ->
      // console.log("Called Verify Payment Status");
      return this.verifyPaymentStatus(ride);
    }

    if (ride.replyId === ride.$ownerId) {
      //console.log("Awaiting Confirmation");
      return <Badge bg="warning">Awaiting Confirm</Badge>;
    }

    // if (paidThrs.length === 0) {
    //   //console.log("Requested");
    //   return <Badge bg="success">Requested</Badge>;
    // }
    //what if confirmed and no paid Threads -> acceptance dropped -> reject and reset ->

    // if (this.props.ride.replyId === theConfirmedDrive.$id) {
    //   //console.log("Confirmed");
    //   return <Badge bg="success">Confirmed</Badge>;
    // }

    if (ride.replyId === this.props.drive.$id) {
      //console.log("Confirmed");
      return <Badge bg="success">Confirmed</Badge>;
    }
  };

  verifyPaymentStatus = (ride) => {
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
      return tx.txId === ride.txId1;
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
    if (ride.$ownerId === this.props.identity) {
      if (ride.amt === -walletTx.satoshisBalanceImpact) {
        return <Badge bg="success">Paid</Badge>;
      }
    }
    if (ride.$ownerId !== this.props.identity) {
      if (ride.amt === walletTx.satoshisBalanceImpact) {
        return <Badge bg="success">Paid</Badge>;
      }
    }
    // if (ride.amt === walletTx.satoshisBalanceImpact) {
    //   return <Badge bg="success">Paid</Badge>;
    // } else {
    console.log("Failed on Error 4");
    return <Badge bg="danger">Fail</Badge>;
    //}
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

    // drive={drive}
    //       rideReplies={this.props.YourDrives} //rideReplies
    //       rideRequests={this.props.YourDrivesRequests} //rideRequest
    //       rideRequestsNames={this.props.YourDrivesRequestsNames}

    //rideRequestsReplies={this.props.YourDrivesRequestsReplies}

    //drive is the acceptedRideRequest
    // 1) get the rideRequest of the acceptedRideRequest
    let rideRequest = this.props.rideRequests.find((request) => {
      return request.$id === this.props.drive.reqId;
    });
    // if (rideRequest !== undefined) {
    //   console.log(rideRequest);
    // }

    //if none -> request not found
    //NEEDS A COMPONENT TO RETURN A RIDE NOT FOUND -> below with rideRequest
    //
    let rideRequestName = [];
    let rideRepliesThrs = [];

    if (rideRequest !== undefined) {
      rideRequestName = this.props.rideRequestsNames.find((requestName) => {
        return requestName.$ownerId === rideRequest.$ownerId;
      });

      if (this.props.rideRequestsReplies.length !== 0) {
        rideRepliesThrs = this.props.rideRequestsReplies.filter((thr) => {
          return (
            thr.amt === 0 &&
            (this.props.drive.$ownerId === thr.$ownerId ||
              rideRequest.$ownerId === thr.$ownerId)
          );
        });
      }
    }
    // // get rideRequestName
    // let rideRequestName = this.props.rideRequestsNames.find((requestName) => {
    //   return requestName.$ownerId === rideRequest.$ownerId;
    // });

    // // get rideReplies ->
    // let rideRepliesThrs = this.props.rideRequestsReplies.filter((thr) => {
    //   return (
    //     thr.amt === 0 &&
    //     (this.props.drive.$ownerId === thr.$ownerId ||
    //       rideRequest.$ownerId === thr.$ownerId)
    //   );
    // });

    let priceUnit = "";
    let priceUnitDisplay;

    priceUnit = (rideRequest.amt / rideRequest.timeEst) * 30;

    priceUnitDisplay = handleDenomDisplay(priceUnit);
    //per half hour.. //bc per minute is small and could be kD..

    let paymentSchedule = "";

    switch (
      rideRequest.pmtType // pmtType: 1 On Dropoff
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
    //  *** ***
    //rideRequest is confirmedDrive for conversion of YourRide to YourDrive
    //  *** ***

    let replyMessages = [];
    if (rideRequest !== undefined) {
      replyMessages = rideRepliesThrs.map((msg, index) => {
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
                  <b style={{ color: "#008de4" }}>{rideRequestName.label}</b>
                )}

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
        {/* rideRequest handles if rideReq is deleted */}
        {rideRequest === undefined ? (
          <>
            <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
              <Card.Body>
                <p>There is no ride request found</p>{" "}
                <Button
                  variant="primary"
                  // onClick={() =>
                  //   this.props.handleDeleteYourDrive(this.props.index)
                  // }
                >
                  <b>Delete Acceptance</b>
                </Button>
              </Card.Body>{" "}
            </Card>
          </>
        ) : (
          <>
            <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
              <Card.Body>
                <div
                  className="locationTitle"
                  style={{ marginBottom: ".4rem", marginTop: ".4rem" }}
                >
                  {rideRequest.area !== "" && rideRequest.area !== undefined ? (
                    <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                      {rideRequest.area}
                    </Badge>
                  ) : (
                    <></>
                  )}

                  <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                    {rideRequest.city}
                  </Badge>

                  <Badge bg="primary">{rideRequest.region}</Badge>
                </div>

                <Card.Title className="cardTitle">
                  {/* {this.handleName(this.props.post)} */}

                  <span
                    style={{
                      color: "#008de3",
                      marginTop: ".2rem",
                      marginBottom: "0rem",
                    }}
                    onClick={() => this.handleNameClick(rideRequestName.label)}
                  >
                    <b>{rideRequestName.label}</b>
                  </span>

                  <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>
                  <span> {this.verifyRequestStatus(rideRequest, [])}</span>

                  {/* <span className="textsmaller">
                {this.formatDate(this.props.post.$createdAt)}
              </span> */}
                </Card.Title>

                <p></p>

                <div className="cardTitle">
                  <div>
                    <span style={{ whiteSpace: "pre-wrap" }}>
                      {rideRequest.pickupAddr}
                    </span>
                  </div>

                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(rideRequest.pickupAddr);
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
                    {rideRequest.dropoffAddr}
                  </span>

                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(rideRequest.dropoffAddr);
                      this.setState({
                        copiedDropoffAddr: true,
                      });
                    }}
                  >
                    {this.state.copiedDropoffAddr ? (
                      <b>Copied!</b>
                    ) : (
                      <b>Copy</b>
                    )}
                  </Button>
                </div>
                <p></p>
                <p style={{ marginBottom: ".2rem" }}>
                  Estimated Time: <b>{rideRequest.timeEst} minutes</b>
                </p>

                <p style={{ marginTop: "0rem", marginBottom: ".2rem" }}>
                  Estimated Distance: <b>{rideRequest.distEst}</b>
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
                    {getRelativeTimeAgo(rideRequest.reqTime, Date.now())}
                  </b>
                </p>

                <h5 style={{ marginTop: ".2rem", textAlign: "center" }}>
                  {" "}
                  Pays <b>{handleDenomDisplay(rideRequest.amt)}</b>
                </h5>

                <p style={{ textAlign: "center", marginBottom: ".2rem" }}>
                  ({priceUnitDisplay} per 30 minutes)
                </p>
                <div
                  className="BottomBorder"
                  style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
                ></div>

                <p style={{ marginBottom: ".2rem" }}>
                  Payment: {paymentSchedule}
                </p>

                {/* <p style={{ whiteSpace: "pre-wrap" }}>
              {this.props.post.description}
            </p> */}

                <p style={{ marginTop: "0rem", marginBottom: ".2rem" }}>
                  Passengers: <b>{rideRequest.numOfRiders}</b>
                </p>

                {rideRequest.extraInstr !== undefined &&
                rideRequest.extraInstr !== "" ? (
                  <>
                    <p
                      style={{
                        paddingBottom: "0.5rem",
                        whiteSpace: "pre-wrap",
                        textAlign: "center",
                      }}
                    >
                      <b>{rideRequest.extraInstr}</b>
                    </p>
                  </>
                ) : (
                  <></>
                )}

                <p></p>

                {/* <div className="TwoButtons">
              <Button
                variant="primary"
                // onClick={() =>
                //   this.props.handleDeleteYourDrive(this.props.index)
                // }
              >
                <b>Delete Ride</b>
              </Button>
              <Button
                variant="primary"
                // onClick={() => this.props.handleYourDrive(this.props.index)}
              >
                <b>Edit Ride</b>
              </Button>
            </div> */}
                <div
                  className="BottomBorder"
                  style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
                ></div>
                <div
                  className="cardTitle"
                  style={{ marginTop: ".4rem", marginBottom: ".5rem" }}
                >
                  <h5>Responses</h5>
                  {this.verifyRequestStatus(rideRequest, [])}
                </div>
                {this.props.isYourDrivesRefreshReady ? (
                  // !this.props.LoadingStore &&
                  // !this.props.isLoadingWallet &&
                  // !this.props.LoadingOrders
                  <div className="d-grid gap-2" id="button-edge-noTop">
                    <Button
                      variant="primary"
                      onClick={() => {
                        this.props.refreshYourDrives();
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

                {/* {ride.replyId !== this.props.drive.$id &&  ? (
              <>
                <p style={{ textAlign: "center", paddingTop: ".5rem" }}>
                  (Currently, there are no responses to this ride request.)
                </p>
              </>
            ) : (
              <></>
            )} */}

                {replyMessages}

                {rideRequest.replyId === this.props.drive.$id &&
                rideRequest !== undefined ? (
                  <>
                    <div className="ButtonRightNoUnderline">
                      <Button
                        variant="primary"
                        onClick={() =>
                          this.props.handleYourDriveMsgModalShow(
                            rideRequest,
                            rideRequestName
                          )
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
        )}
      </>
    );
  }
}

export default YourDrive;
