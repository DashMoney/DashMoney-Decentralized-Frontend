import React from "react";
import LocalForage from "localforage";

import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

import { IoMdArrowRoundBack } from "react-icons/io";

import FindMerchant from "./FindMerchant";
import YourOrders from "./YourOrders";

import CreditsOnPage from "../CreditsOnPage";

import "./BuyerPages.css";

class ShoppingPage extends React.Component {
  onChange = (event) => {
    console.log(event.target.value);

    event.preventDefault();
    event.stopPropagation();

    this.props.onChangeSHOPPING(event);
  };

  handleSubmitClick = (event) => {
    event.preventDefault();

    this.props.handleSubmitClickSHOPPING();
  };
  componentDidMount() {
    this.props.pullInitialTriggerSHOPPING();
  }
  render() {
    return (
      <>
        <Nav
          fill
          variant="pills"
          defaultActiveKey={this.props.whichTabSHOPPING}
          onSelect={(eventKey) => this.props.handleTabSHOPPING(eventKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="Find Merchant">
              <b>Find Merchant</b>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Your Orders">
              <b>Your Orders</b>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <CreditsOnPage
          identityInfo={this.props.identityInfo}
          uniqueName={this.props.uniqueName}
          showModal={this.props.showModal}
        />

        {/* {this.props.orderError ? (
              <>
                <p></p>
                <Alert variant="danger" dismissible>
                  <Alert.Heading>Order Failed</Alert.Heading>
                  <p>
                    You either have insufficient credits or have run into a
                    platform error. Please TopUp credits by tapping the credits
                    displayed.
                  </p>
                </Alert>
              </>
            ) : (
              <></>
            )} */}

        {this.props.whichTabSHOPPING === "Find Merchant" ? (
          <>
            <div className="bodytext">
              <Form
                id="Find-Merchant-form"
                noValidate
                onSubmit={this.handleSubmitClick}
                onChange={this.onChange}
              >
                <Form.Group className="mb-3" controlId="validationCustomName">
                  {/* <Form.Label>Merchant to Visit</Form.Label> */}

                  {this.props.LoadingOrder ? (
                    <div className="cardTitle">
                      {this.props.viewStore ? (
                        <span>
                          <Button
                            variant="primary"
                            onClick={() => this.props.toggleViewStore()}
                          >
                            <b>Back</b>
                          </Button>
                        </span>
                      ) : (
                        <></>
                      )}
                      <Form.Control
                        type="text"
                        placeholder={this.props.merchantName}
                        readOnly
                      />
                    </div>
                  ) : (
                    <div className="cardTitle">
                      {this.props.viewStore ? (
                        <span>
                          <Button
                            variant="primary"
                            onClick={() => this.props.toggleViewStore()}
                          >
                            <IoMdArrowRoundBack size={28} />
                          </Button>
                        </span>
                      ) : (
                        <></>
                      )}
                      <Form.Control
                        type="text"
                        placeholder={
                          this.props.merchantStoreName === "staged name"
                            ? "Enter merchant name here..."
                            : this.props.merchantStoreName
                        }
                        required
                        // isInvalid={!this.props.merchantNameFormat}
                        // TEST ^^ remove red fail when click in recent or active =>
                        isValid={this.props.merchantNameFormat}
                      />
                    </div>
                  )}
                </Form.Group>

                {this.props.LoadingMerchant ? (
                  <>
                    <p> </p>
                    <div id="spinner">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                    <p> </p>
                  </>
                ) : (
                  <>
                    {this.props.merchantName.toLowerCase() ===
                      this.props.merchantStoreName.toLowerCase() &&
                    this.props.merchantStore !== "No Store" ? (
                      <></>
                    ) : (
                      <>
                        {this.props.merchantNameFormat &&
                        !this.props.LoadingMerchant ? (
                          <>
                            <p> </p>
                            <Button variant="primary" type="submit">
                              <b>Find Store/Menu</b>
                            </Button>
                            <p> </p>
                          </>
                        ) : (
                          <>
                            <p> </p>
                            <Button variant="primary">
                              <b>Find Store/Menu</b>
                            </Button>
                            <p> </p>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Form>

              {this.props.sendPaymentSuccess ? (
                <>
                  <p></p>
                  <Alert variant="success" dismissible>
                    <Alert.Heading>Payment Successful!</Alert.Heading>
                    You have successfully paid{" "}
                    <b>{this.props.merchantStoreName}</b>!<p></p>
                    <p>Sending Order Details...</p>
                  </Alert>
                </>
              ) : (
                <></>
              )}

              {this.props.sendOrderSuccess ? (
                <>
                  <p></p>
                  <Alert variant="success" dismissible>
                    <Alert.Heading>Order Successful!</Alert.Heading>
                    Your order was successfully sent! Check out{" "}
                    <b>Your Orders</b> to view order.
                  </Alert>
                </>
              ) : (
                <></>
              )}

              {this.props.sendFailure ? (
                <>
                  <p></p>
                  <Alert variant="danger" dismissible>
                    <Alert.Heading>Payment Failed</Alert.Heading>
                    <p>
                      You have run into a transaction error. Please verify
                      wallet has sufficient funds and try again.
                    </p>
                  </Alert>
                </>
              ) : (
                <></>
              )}

              {this.props.identityIdMerchant === "No Name" ? (
                <>
                  <p></p>
                  <Alert variant="danger" dismissible>
                    <Alert.Heading>No Identity for Name</Alert.Heading>
                    <p>
                      There is no identity for this name, please try another
                      name.
                    </p>
                  </Alert>
                </>
              ) : (
                <></>
              )}

              {this.props.identityIdMerchant === "Error" ? (
                <>
                  <p></p>
                  <Alert variant="danger" dismissible>
                    <Alert.Heading>Merchant Name Error</Alert.Heading>
                    <p>
                      Platform may be having difficulties. You may have to
                      reload and try again.
                    </p>
                  </Alert>
                </>
              ) : (
                <></>
              )}

              {this.props.merchantStore === "No Store" ? (
                <>
                  <p></p>
                  <Alert variant="danger" dismissible>
                    <Alert.Heading>No Store/Menu for Name</Alert.Heading>
                    <p>
                      This name is not a DashGetPaid merchant, please try
                      another name.
                    </p>
                  </Alert>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="sidetextsidesonly">
              <FindMerchant
                isLoadingWallet={this.props.isLoadingWallet}
                isLoadingRecentOrders={this.props.isLoadingRecentOrders}
                isLoadingActive={this.props.isLoadingActive}
                recentOrders={this.props.recentOrders}
                recentOrdersStores={this.props.recentOrdersStores}
                recentOrdersNames={this.props.recentOrdersNames}
                recentOrdersDGMAddresses={this.props.recentOrdersDGMAddresses}
                activeOrders={this.props.activeOrders}
                activeOrdersStores={this.props.activeOrdersStores}
                activeOrdersNames={this.props.activeOrdersNames}
                activeOrdersAddresses={this.props.activeOrdersAddresses}
                handleSelectRecentOrActive={
                  this.props.handleSelectRecentOrActive
                }
                LoadingMerchant={this.props.LoadingMerchant}
                LoadingItems={this.props.LoadingItems}
                LoadingOrder={this.props.LoadingOrder}
                merchantStoreName={this.props.merchantStoreName}
                merchantStore={this.props.merchantStore}
                dgmDocumentForMerchant={this.props.dgmDocumentForMerchant}
                merchantItems={this.props.merchantItems}
                viewStore={this.props.viewStore}
                handleViewStore={this.props.handleViewStore}
                cartItems={this.props.cartItems}
                handleEditItemModal={this.props.handleEditItemModal}
                handleAddToCartModal={this.props.handleAddToCartModal}
                showModal={this.props.showModal}
                accountBalance={this.props.accountBalance}
                mode={this.props.mode}
                whichNetwork={this.props.whichNetwork}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {this.props.whichTabSHOPPING === "Your Orders" ? (
          <>
            <YourOrders
              isLoadingWallet={this.props.isLoadingWallet}
              isLoadingRecentOrders={this.props.isLoadingRecentOrders}
              identity={this.props.identity}
              identityInfo={this.props.identityInfo}
              uniqueName={this.props.uniqueName}
              recentOrders={this.props.recentOrders}
              recentOrdersStores={this.props.recentOrdersStores}
              recentOrdersNames={this.props.recentOrdersNames}
              recentOrdersDGMAddresses={this.props.recentOrdersDGMAddresses}
              recentOrdersItems={this.props.recentOrdersItems}
              recentOrdersMessages={this.props.recentOrdersMessages}
              handleOrderMessageModalShow={
                this.props.handleOrderMessageModalShow
              }
              accountBalance={this.props.accountBalance}
              accountHistory={this.props.accountHistory}
              showModal={this.props.showModal}
              mode={this.props.mode}
            />
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default ShoppingPage;
