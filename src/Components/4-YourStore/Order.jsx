import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import handleDenomDisplay from "../UnitDisplay";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleNameClick = (nameToPass) => {
    navigator.clipboard.writeText(`${nameToPass}`);
    this.setState({
      copiedName: true,
    });
  };

  formatDate(theCreatedAt, today, yesterday) {
    let CreatedAt = new Date(theCreatedAt);

    const timeOptions = {
      hour: "numeric",
      minute: "2-digit", //numeric?
    };

    function isSameDay(date1, date2) {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    }

    if (isSameDay(CreatedAt, today)) {
      // it's today
      return `Today at ${CreatedAt.toLocaleTimeString(undefined, timeOptions)}`;
    }

    if (isSameDay(CreatedAt, yesterday)) {
      // it was yesterday
      return `Yesterday at ${CreatedAt.toLocaleTimeString(
        undefined,
        timeOptions
      )}`;
    }
    let dateReturn = CreatedAt.toLocaleDateString().concat(
      "  ",
      CreatedAt.toLocaleTimeString(undefined, timeOptions)
    );
    return dateReturn;
  }

  handleTotalItems = (items) => {
    let numOfItems = 0;
    items.forEach((tuple) => {
      numOfItems += tuple[1];
    });

    return (
      <span>
        {numOfItems} {numOfItems > 1 ? <span>items</span> : <span>item</span>}
      </span>
    );
  };

  handleTotal = (items) => {
    let theTotal = 0;

    items.forEach((tuple) => {
      if (tuple[0].price !== 0) {
        theTotal += tuple[1] * tuple[0].price;
        //console.log(theTotal);
      }
    });

    return (
      <h4 className="indentMembers" style={{ color: "#008de4" }}>
        <b>{handleDenomDisplay(theTotal)}</b>
      </h4>
    );
  };

  verifyPayment = (theItems, theOrder) => {
    // console.log("An Order: ", theOrder);

    //NEW (26FEB24) PAYLATER
    if (theOrder.txId === "payLater") {
      //console.log("PayLater");
      return <Badge bg="warning">Pay Later</Badge>;
    }

    //NEW (26FEB24) TRACKING ONLY
    if (theOrder.txId === "trackOrder") {
      //console.log("Tracking Order");
      return <Badge bg="primary">Tracking Only</Badge>;
    }
    //THERE MUST BE AN EDIT FOR THE PAYLATER (05MAR2024 - BELOW REMOVED)
    // 1) make sure the createdAt and Updated AT are the same else there was an edit so it
    // if (theOrder.$createdAt !== theOrder.$updatedAt) {
    //   console.log("Failed on Error 0");
    //   return <Badge bg="danger">Fail</Badge>;
    // }

    //8) DID i handle the Self Pay or Self Order?? -> if toId and OwnerId of order match
    if (theOrder.toId === theOrder.$ownerId) {
      return <Badge bg="warning">Self Order</Badge>;
    }

    // 2)Check for duplicated do a count on the order.txIds for all the orders

    let numOfOrdersWithTxId = this.props.DGPOrders.filter((order) => {
      return order.txId === theOrder.txId;
    });
    if (numOfOrdersWithTxId.length !== 1) {
      console.log("Failed on Error 1");
      return <Badge bg="danger">Fail</Badge>;
    }

    //3) Make sure there is a wallet TX that matches order txId

    let walletTx = this.props.accountHistory.find((tx) => {
      //console.log('Wallet TX: ', tx);
      return tx.txId === theOrder.txId;
    });
    if (walletTx === undefined) {
      //This may be the issue that cause early fail ->
      // Can I check instasend?
      console.log("Failed on Error 2");
      return <Badge bg="danger">Fail</Badge>;
    }
    //ADDED TO CHECK BC TIME DEFAULTS TO FUTURE IF NO INSTALOCK 9999999999000
    //CURRENTLY THE INSTASEND LOCK IS NOT WORKING ON TESTNET
    // if(!walletTx.isInstantLocked  ){
    //   return <Badge bg="warning">Verifying..</Badge>;
    // }
    //

    // 4) check that the order createAT and tx time are within a few minutes

    let walletTxTime = new Date(walletTx.time);
    //console.log('Wallet TX Time valueOf: ', walletTxTime.valueOf());

    if (walletTxTime.valueOf() - theOrder.$updatedAt > 350000) {
      //***This is added due to testnet lack of instasend lock */
      if (walletTxTime.valueOf() > theOrder.$updatedAt) {
        return <Badge bg="primary">Paid</Badge>;
      } //CHANGED THE ABOVE 2 $UPDATEDAT FROM $CREATEDAT -> IS THAT RIGHT? ->

      //console.log(walletTxTime.valueOf() - theOrder.$createdAt)
      console.log("Failed on Error 3"); //!!!!!!!!!!!!
      console.log(this.props.accountHistory);
      console.log(walletTxTime.valueOf());
      return <Badge bg="danger">Fail</Badge>;
    }

    //5) make sure the tx amt === order amt otherwise check if any items $updateAt changed more recently

    let theTotal = 0;
    theItems.forEach((tuple) => {
      if (tuple[0].price !== 0) {
        theTotal += tuple[1] * tuple[0].price;
        //console.log(theTotal);
      }
    });

    if (theTotal === walletTx.satoshisBalanceImpact) {
      return <Badge bg="primary">Paid</Badge>;
    } else {
      theItems.forEach((tuple) => {
        if (tuple[0].$updatedAt > theOrder.$createdAt) {
          return <Badge bg="warning">Old Price</Badge>;
        }
      });
      console.log("Failed on Error 4");
      return <Badge bg="danger">Fail</Badge>;
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

    const order = this.props.order;
    const orderItemsAndQty = this.props.orderItemsAndQty;
    let orderName;
    if (this.props.orderNameDoc.label === undefined) {
      orderName = "Loading..";
    } else {
      orderName = this.props.orderNameDoc.label;
    }
    const orderItems = this.props.orderItems;
    const msgsToDisplay = this.props.msgsToDisplay;

    return (
      <>
        <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
          <Card.Body>
            <div className="cardTitle">
              <h5
                style={{ color: "#008de4" }}
                onClick={() => this.handleNameClick(orderName)}
              >
                <b>{orderName}</b>
              </h5>
              <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>

              {this.verifyPayment(orderItemsAndQty, order)}

              <span className="textsmaller">
                {this.formatDate(
                  this.props.order.$createdAt,
                  this.props.today,
                  this.props.yesterday
                )}
              </span>
            </div>
            <p></p>

            <Row>
              <Col xs={1} md={1}></Col>
              <Col xs={4} md={4}>
                <b>Item</b>{" "}
              </Col>
              <Col xs={3} md={3}>
                <b>Qty</b>{" "}
              </Col>
              <Col xs={4} md={4}>
                <b>Subtotal</b>{" "}
              </Col>
            </Row>
            <Container>{orderItems}</Container>

            <p></p>
            <div className="Underline">
              <h5>
                <b>Total</b> ({this.handleTotalItems(orderItemsAndQty)})<b>:</b>
              </h5>

              {this.handleTotal(orderItemsAndQty)}
            </div>
            <p></p>
            <div className="cardTitleUnderlineAbove">
              <h6>Order Messages</h6>
            </div>

            {order.comment !== undefined && order.comment !== "" ? (
              <>
                <Card id="comment" bg={cardBkg} text={cardText}>
                  <Card.Body>
                    <Card.Title className="cardTitle">
                      <b style={{ color: "#008de4" }}>{orderName}</b>
                      <span className="textsmaller">
                        {this.formatDate(
                          this.props.order.$createdAt,
                          this.props.today,
                          this.props.yesterday
                        )}
                      </span>
                    </Card.Title>
                    <Card.Text>{order.comment}</Card.Text>
                  </Card.Body>
                </Card>
              </>
            ) : (
              <></>
            )}

            {msgsToDisplay}

            <div className="ButtonRightNoUnderline">
              <Button
                variant="primary"
                onClick={() =>
                  this.props.handleMerchantOrderMsgModalShow(
                    order.$id,
                    orderName
                  )
                }
              >
                <b>Add Message</b>
              </Button>
            </div>

            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Order;
