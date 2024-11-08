import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import handleDenomDisplay from "../UnitDisplay";

class YourOrders extends React.Component {
  handleName = (msgDoc) => {
    if (msgDoc.$ownerId === this.props.identity) {
      return this.props.uniqueName;
    }
    if (!this.props.isLoadingRecentOrders) {
      let nameDoc = this.props.recentOrdersNames.find((doc) => {
        return msgDoc.$ownerId === doc.$ownerId;
      });

      //The issue is if your first order is a self order..
      if (nameDoc === undefined) {
        return "Not Found";
      }
      return nameDoc.label;
    }

    return "None Found";
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
      // this.props.merchantItems.find((item)=>{
      //   return item.$id === tuple[0].$id
      // })
      numOfItems += tuple[1];
    });

    return (
      <span>
        {numOfItems} {numOfItems > 1 ? <span>items</span> : <span>item</span>}
      </span>
    );
  };

  handleTotal = (items) => {
    //this.prop.cartItems AND this.props.merchantItems
    let theTotal = 0;

    items.forEach((tuple) => {
      // this.props.merchantItems.find((item)=>{
      //   return item.$id === tuple[0].$id
      // })  //THE PRICE IS ALREADY IN THE ITEM!!! bUT MAYBE i CAN USE THIS TO CHECK THE ITEM IS FOR THE MERCHANT!!!

      //console.log(tuple[0].price);
      // console.log(tuple[1])
      if (tuple[0].price !== 0) {
        theTotal += tuple[1] * tuple[0].price;
        //console.log(theTotal);
      }
    });

    return (
      <h4 className="indentMembers" style={{ color: "#008de4" }}>
        <b>{handleDenomDisplay(this.props.whichNetwork, theTotal)}</b>
      </h4>
    );
  };

  verifySufficientFunds = (items) => {
    //this.prop.cartItems AND this.props.merchantItems
    let theTotal = 0;

    items.forEach((tuple) => {
      // this.props.merchantItems.find((item)=>{
      //   return item.$id === tuple[0].$id
      // })  //THE PRICE IS ALREADY IN THE ITEM!!! bUT MAYBE i CAN USE THIS TO CHECK THE ITEM IS FOR THE MERCHANT!!!

      //console.log(tuple[0].price);
      // console.log(tuple[1])
      if (tuple[0].price !== 0) {
        theTotal += tuple[1] * tuple[0].price;
        //console.log(theTotal);
      }
    });

    theTotal = this.props.accountBalance - theTotal;

    if (theTotal > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    //let d = Date.now();

    let today = new Date(); //Date.now(); <= Wrong
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }
    /**
     * recentOrders={this.props.recentOrders} 
      recentOrdersStores={this.props.recentOrdersStores}
      recentOrdersNames={this.props.recentOrdersNames}
      recentOrdersDGMAddresses={this.props.recentOrdersDGMAddresses}
      recentOrdersItems={this.props.recentOrdersItems}
      recentOrdersMessages={this.props.recentOrdersMessages}
     */

    let ordersForDisplay = [];

    if (!this.props.isLoadingRecentOrders) {
      //console.log('Tx History', this.props.accountHistory);

      ordersForDisplay = this.props.recentOrders.map((order, index) => {
        //console.log(order);

        let orderNameDoc = this.props.recentOrdersNames.find((doc) => {
          return doc.$ownerId === order.toId;
        });

        if (orderNameDoc === undefined) {
          orderNameDoc = { label: "Name Unavail.." };
        }

        let orderAddrDoc = this.props.recentOrdersDGMAddresses.find((doc) => {
          return doc.$ownerId === order.toId;
        });

        //NEW THING BELOW -> ADDING MSGS TO ORDERS
        let orderMsgDocs = this.props.recentOrdersMessages.filter((doc) => {
          return doc.orderId === order.$id;
        });

        let msgsToDisplay = [];

        if (orderMsgDocs.length > 0) {
          msgsToDisplay = orderMsgDocs.map((msg, index) => {
            return (
              <Card id="comment" key={index} bg={cardBkg} text={cardText}>
                <Card.Body>
                  <Card.Title className="cardTitle">
                    <b style={{ color: "#008de4" }}>{this.handleName(msg)}</b>
                    {/* <span className="textsmaller">
                      {this.getRelativeTimeAgo(msg.$createdAt, d)}
                    </span> */}
                    <span className="textsmaller">
                      {this.formatDate(msg.$createdAt, today, yesterday)}
                    </span>
                  </Card.Title>
                  <Card.Text>{msg.msg}</Card.Text>
                </Card.Body>
              </Card>
            );
          });
        }

        //END OF NEW THING
        //console.log('Order Name Doc:',orderNameDoc);

        let orderItemsAndQty = order.cart.map((tuple) => {
          let itemDoc = this.props.recentOrdersItems.find((item) => {
            //console.log('TEST: ', Identifier.from(tuple[0], 'base64').toJSON());

            return item.$id === tuple[0]; //TEST

            //Identifier.from(tuple[0], 'base64').toJSON(); //Identifier.from()
          });
          return [itemDoc, tuple[1]];
        });

        // console.log('Order Items and Qty:', orderItemsAndQty);

        let orderItems = orderItemsAndQty.map((item, index) => {
          return (
            <div className="cardTitle" key={index}>
              <b>{item[0].name}</b>
              <b>{item[1]}</b>
              <b style={{ color: "#008de4" }}>
                {handleDenomDisplay(
                  this.props.whichNetwork,
                  item[0].price,
                  item[1]
                )}
              </b>
            </div>
          );

          // return <Row key={index}>
          // <Col xs={6} md={4}><h5>{item[0].name}</h5> </Col>
          // <Col xs={1} md={4}><h5>{item[1]}</h5> </Col>
          // <Col xs={5} md={4}><h5><b>{handleDenomDisplay(this.props.whichNetwork,item[0].price, item[1])}</b></h5></Col>
          // </Row>
        });

        return (
          <Card id="card" key={index} bg={cardBkg} text={cardText}>
            <Card.Body>
              <Card.Title className="cardTitleUnderlineBelow">
                <h5
                // style={{ color: "#008de4" }}
                >
                  <b>{orderNameDoc.label}</b>
                </h5>

                {/* {this.verifyPayment(orderItemsAndQty, order)} */}

                {order.txId === "payLater" ? (
                  <Badge bg="warning">Pay Later</Badge>
                ) : (
                  <></>
                )}

                {order.txId === "trackOrder" ? (
                  <Badge bg="Primary">Tracking</Badge>
                ) : (
                  <></>
                )}

                {/* {this.props.uniqueName === this.props.tuple[0] ? (
                    <span style={{ color: "#008de4" }}>{this.props.tuple[0]}</span>
                  ) : (
                    <span >{this.props.tuple[0]}</span>
                  )} //This is like a comment thing*/}

                {/* <span className="textsmaller">
                  {this.getRelativeTimeAgo(order.$createdAt, d)}
                </span> */}
                <span className="textsmaller">
                  {this.formatDate(order.$createdAt, today, yesterday)}
                </span>
              </Card.Title>

              <Row>
                <Col xs={1} md={1}>
                  {" "}
                </Col>
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
                  <b>Total</b> ({this.handleTotalItems(orderItemsAndQty)})
                  <b>:</b>
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
                        <b style={{ color: "#008de4" }}>
                          {this.props.uniqueName}
                        </b>

                        {/* <span className="textsmaller">
                          {this.getRelativeTimeAgo(order.$createdAt, d)}
                        </span> */}
                        <span className="textsmaller">
                          {this.formatDate(order.$createdAt, today, yesterday)}
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
              <p></p>
              {order.txId === "payLater" && !this.props.LoadingOrder ? (
                <div className="TwoButtons">
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.props.handleOrderMessageModalShow(
                        order.$id,
                        orderNameDoc.label
                      )
                    }
                  >
                    <b>Add Message</b>
                  </Button>
                  {this.verifySufficientFunds(orderItemsAndQty) ? (
                    <>
                      {" "}
                      <Button
                        variant="primary"
                        onClick={() =>
                          this.props.handlePayLaterPaymentModalShow(
                            order,
                            orderItemsAndQty,
                            orderAddrDoc,
                            orderNameDoc,
                            index
                          )
                        }
                      >
                        <b>Send Payment</b>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="primary" disabled>
                        <b>Insufficient Funds</b>
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}

              {order.txId === "payLater" && this.props.LoadingOrder ? (
                <div className="TwoButtons">
                  <Button variant="primary" disabled>
                    <b>Add Message</b>
                  </Button>
                  {this.verifySufficientFunds(orderItemsAndQty) ? (
                    <>
                      {" "}
                      <Button variant="primary" disabled>
                        <b>Send Payment</b>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="primary" disabled>
                        <b>Insufficient Funds</b>
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}

              {order.txId !== "payLater" ? (
                <div className="ButtonRightNoUnderline">
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.props.handleOrderMessageModalShow(
                        order.$id,
                        orderNameDoc.label
                      )
                    }
                  >
                    <b>Add Message</b>
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </Card.Body>
          </Card>
        );
      });
    } //This closes the if statement

    //THE ABOVE IS ALL THE PER ORDER CREATION

    ordersForDisplay.reverse();

    return (
      <>
        <div id="sidetextonlysides">
          {this.props.isLoadingWallet ? (
            <>
              {/* <p> </p>
                  <div id="spinner">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                  <p> </p> */}

              <div className="paddingBadge">
                <b>Wallet Balance</b>

                <h4>Loading..</h4>
              </div>
            </>
          ) : (
            <>
              <div className="paddingBadge">
                <div className="cardTitle">
                  <div>
                    <b>Wallet Balance</b>
                    <h4 style={{ color: "#008de4" }}>
                      <b>
                        {handleDenomDisplay(
                          this.props.whichNetwork,
                          this.props.accountBalance,
                          1
                        )}
                      </b>
                    </h4>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => this.props.showModal("WalletTXModal")}
                  >
                    <b>Wallet TXs</b>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {this.props.isLoadingRecentOrders || this.props.LoadingOrder ? (
          //  && !this.props.isLoadingWallet
          <>
            <p></p>
            <div id="spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </>
        ) : (
          <></>
        )}

        {this.props.recentOrders.length < 1 ? (
          <>
            <p className="paddingBadge">
              The orders, you have placed, will appear here after they are sent.
            </p>
          </>
        ) : (
          <></>
        )}

        {!this.props.isLoadingRecentOrders ? (
          <>
            <div id="cardtext" className="footer">
              {ordersForDisplay}
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default YourOrders;
