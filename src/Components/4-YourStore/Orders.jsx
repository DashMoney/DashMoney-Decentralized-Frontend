import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";

import Order from "./Order";
import handleDenomDisplay from "../UnitDisplay";

import Dash from "dash";

// const {
//   Essentials: { Buffer },
//   PlatformProtocol: { Identifier },
// } = Dash;

class Orders extends React.Component {
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

  handleName = (msgDoc) => {
    if (msgDoc.$ownerId === this.props.identity) {
      return this.props.uniqueName;
    }
    if (!this.props.LoadingOrders) {
      let nameDoc = this.props.DGPOrdersNames.find((doc) => {
        return msgDoc.$ownerId === doc.$ownerId;
      });

      return nameDoc.label;
    }

    return "None Found";
  };

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
        <b>{handleDenomDisplay(this.props.whichNetwork, theTotal)}</b>
      </h4>
    );
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

    //let d = Date.now();

    //##################################################################

    //##################################################################
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let ordersForDisplay = [];

    if (
      !this.props.isLoadingWallet &&
      !this.props.LoadingStore &&
      !this.props.LoadingItems &&
      !this.props.LoadingOrders &&
      this.props.DGPStore !== "No Store" &&
      this.props.DGPOrders !== "No Orders"
    ) {
      //console.log('Tx History', this.props.accountHistory);

      ordersForDisplay = this.props.DGPOrders.map((order, index) => {
        //console.log(order);
        let orderNameDoc = this.props.DGPOrdersNames.find((doc) => {
          return doc.$ownerId === order.$ownerId;
        });
        // console.log(orderNameDoc);
        if (orderNameDoc === undefined) {
          orderNameDoc = { label: "Name Unavail.." };
        }

        let orderMsgDocs = this.props.DGPOrdersMsgs.filter((doc) => {
          return doc.orderId === order.$id;
        });

        orderMsgDocs.reverse(); //To put in the right order

        let msgsToDisplay = [];

        if (orderMsgDocs.length > 0) {
          msgsToDisplay = orderMsgDocs.map((msg, index) => {
            // console.log('Order Msg:', msg);
            return (
              <Card id="comment" key={index} bg={cardBkg} text={cardText}>
                <Card.Body>
                  <Card.Title className="cardTitle">
                    <b style={{ color: "#008de4" }}>{this.handleName(msg)}</b>
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

        let orderItemsAndQty = order.cart.map((tuple) => {
          let itemDoc = this.props.DGPItems.find((item) => {
            return item.$id === tuple[0];
          });
          return [itemDoc, tuple[1]];
        });

        // console.log('Order Items and Qty:', orderItemsAndQty);

        let orderItems = orderItemsAndQty.map((item, index) => {
          //className="cardTitle"

          return (
            <div className="cardTitle" key={index}>
              <b>{item[0].name}</b>
              <b>{item[1]}</b>
              <b>
                {handleDenomDisplay(
                  this.props.whichNetwork,
                  item[0].price,
                  item[1]
                )}
              </b>
            </div>
          );

          // return <Row key={index}>
          //   <Col xs={5} md={4}><b>{item[0].name}</b> </Col>
          //   <Col xs={1} md={4}><b>{item[1]}</b> </Col>
          //   <Col xs={5} md={4}><b>{handleDenomDisplay(this.props.whichNetwork,item[0].price, item[1])}</b></Col>
          //   </Row>

          //  return <div key={index} className="cardTitle">
          // <h5>{item[0].name}</h5>
          // <h5>{item[1]}</h5>
          // <h5><b>{handleDenomDisplay(this.props.whichNetwork,item[0].price, item[1])}</b></h5>
          // </div>
        });

        /**
       * indices: [
              {
                name: 'orderIdandcreatedAt',
                properties: [{ orderId: 'asc' }, { $createdAt: 'asc' }],
                unique: false,
              }

       */

        //let orderMsgs = this.props.DGPOrderMsgs.filter((doc)=>{
        // return doc.orderId === order.$id;

        return (
          <Order
          whichNetwork={this.props.whichNetwork}
            key={index}
            mode={this.props.mode}
            identity={this.props.identity}
            index={index}
            order={order}
            today={today}
            yesterday={yesterday}
            uniqueName={this.props.uniqueName}
            orderItemsAndQty={orderItemsAndQty}
            orderNameDoc={orderNameDoc}
            orderItems={orderItems}
            msgsToDisplay={msgsToDisplay}
            DGPOrders={this.props.DGPOrders}
            accountHistory={this.props.accountHistory}
            //DGPOrdersNames={this.props.DGPOrdersNames}
            // DGPOrdersMsgs={this.props.DGPOrdersMsgs}
            // DGPItems={this.props.DGPItems}
            handleMerchantOrderMsgModalShow={
              this.props.handleMerchantOrderMsgModalShow
            }
          />
        );
      });
    } //This closes the if statement

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

        {this.props.dgmDocuments.length === 0 &&
        this.props.WALLET_Login7 &&
        !this.props.isLoadingButtons_WALLET ? (
          <>
            <div className="d-grid gap-2" style={{ margin: "1rem" }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => this.props.showModal("RegisterDGMModal")}
              >
                <b>Enable Pay-to-Name</b>
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}

        {this.props.dgmDocuments.length === 0 &&
        this.props.WALLET_Login7 &&
        this.props.isLoadingButtons_WALLET ? (
          <>
            <div className="d-grid gap-2" style={{ margin: "1rem" }}>
              <Button variant="primary" size="lg" disabled>
                <b>Enable Pay-to-Name</b>
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}

        {this.props.dgmDocuments.length !== 0 &&
        this.props.WALLET_Login7 &&
        //Added top 2 for Address create prior to Store Create
        this.props.DGPStore === "No Store" &&
        !this.props.LoadingStore &&
        !this.props.LoadingOrders ? (
          <div className="d-grid gap-2" id="button-edge">
            <Button
              variant="primary"
              onClick={() => {
                this.props.showModal("CreateStoreModal");
              }}
            >
              <b>Create Store/Menu</b>
            </Button>
          </div>
        ) : (
          <></>
        )}

        {this.props.DGPStore !== "No Store" &&
        !this.props.LoadingStore &&
        !this.props.LoadingOrders ? (
          <>
            <div id="MyStoreTitle">
              <h2>{this.props.uniqueName}'s Orders</h2>
            </div>
          </>
        ) : (
          <></>
        )}
        {/* THIS IS WHERE i ADD THE ABILITY TO RELOAD ORDERS */}

        {this.props.dgmDocuments.length !== 0 &&
        this.props.DGPStore !== "No Store" &&
        this.props.DGPStore.length !== 0 ? (
          <>
            {this.props.isMyStoreOrdersRefreshReady &&
            !this.props.LoadingStore &&
            !this.props.isLoadingWallet &&
            !this.props.LoadingOrders ? (
              <div className="d-grid gap-2" id="button-edge-noTop">
                <Button
                  variant="primary"
                  onClick={() => {
                    this.props.refreshMyStoreOrders();
                  }}
                >
                  <b>Refresh Orders</b>
                </Button>
              </div>
            ) : (
              <>
                <div className="d-grid gap-2" id="button-edge-noTop">
                  <Button variant="primary" disabled>
                    <b>Refresh Orders</b>
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}

        {/* {!this.props.isLoadingWallet &&
        !this.props.LoadingOrders &&
        this.props.newOrderAvail ? (
          <div className="d-grid gap-2" id="button-edge">
            <Button
              variant="primary"
              onClick={() => {
                this.props.handleLoadNewOrder();
              }}
            >
              <b>Load New Order</b>
            </Button>
          </div>
        ) : (
          <></>
        )} */}

        {this.props.LoadingOrders ||
        this.props.isLoadingWallet ||
        this.props.LoadingStore ||
        !this.props.WALLET_Login7 ||
        this.props.isLoadingButtons_WALLET ? (
          // WALLET_Login7  && isLoadingButtons_WALLET added for the separation of DGM and Store Creation
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

        {!this.props.LoadingOrders &&
        !this.props.LoadingStore &&
        this.props.DGPStore !== "No Store" &&
        this.props.DGMAddress !== "No Address" &&
        this.props.DGPOrders === "No Orders" ? (
          <>
            <p className="bodytext">
              This is where orders from your customers will appear.
            </p>
          </>
        ) : (
          <></>
        )}

        {!this.props.isLoadingWallet &&
        !this.props.LoadingStore &&
        !this.props.LoadingItems &&
        !this.props.LoadingOrders &&
        this.props.DGPStore !== "No Store" &&
        this.props.DGPOrders !== "No Orders" ? (
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

export default Orders;
