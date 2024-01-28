import React from "react";
import LocalForage from "localforage";

import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

import FindMerchant from "./FindMerchant";
import YourOrders from "./YourOrders";

import CreditsOnPage from "../CreditsOnPage";

//import AddItemToCartModal from "./ShoppingModals/AddItemToCartModal";
//import EditItemModal from "./ShoppingModals/EditItemModal";
//import PlaceOrderModal from "./ShoppingModals/PlaceOrderModal";

import "./BuyerPages.css";

class BuyerPages extends React.Component {
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

        {/* {this.state.orderError ? (
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
            <div id="bodytext">
              <Form
                id="Find-Merchant-form"
                noValidate
                onSubmit={this.props.handleSubmitClickSHOPPING}
                onChange={this.props.onChangeSHOPPING}
              >
                <Form.Group className="mb-3" controlId="validationCustomName">
                  {/* <Form.Label>Merchant to Visit</Form.Label> */}

                  {this.state.LoadingOrder ? (
                    <div className="cardTitle">
                      {this.state.viewStore ? (
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
                            <b>Back</b>
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
                              Find Store/Menu
                            </Button>
                            <p> </p>
                          </>
                        ) : (
                          <>
                            <p> </p>
                            <Button variant="primary">Find Store/Menu</Button>
                            <p> </p>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Form>

              {this.state.sendPaymentSuccess ? (
                <>
                  <p></p>
                  <Alert variant="success" dismissible>
                    <Alert.Heading>Payment Successful!</Alert.Heading>
                    You have successfully paid{" "}
                    <b>{this.state.merchantStoreName}</b>!<p></p>
                    <p>Sending Order Details...</p>
                  </Alert>
                </>
              ) : (
                <></>
              )}

              {this.state.sendOrderSuccess ? (
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

              {this.state.sendFailure ? (
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

              {this.state.identityIdMerchant === "No Name" ? (
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

              {this.state.identityIdMerchant === "Error" ? (
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

              {this.state.merchantStore === "No Store" ? (
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
              handleSelectRecentOrActive={this.handleSelectRecentOrActive}
              LoadingMerchant={this.state.LoadingMerchant}
              LoadingItems={this.state.LoadingItems}
              LoadingOrder={this.state.LoadingOrder}
              merchantStoreName={this.state.merchantStoreName}
              merchantStore={this.state.merchantStore}
              dgmDocumentForMerchant={this.state.dgmDocumentForMerchant}
              merchantItems={this.state.merchantItems}
              viewStore={this.state.viewStore}
              handleViewStore={this.handleViewStore}
              cartItems={this.state.cartItems}
              handleEditItemModal={this.handleEditItemModal}
              handleAddToCartModal={this.handleAddToCartModal}
              showModal={this.showModal}
              accountBalance={this.props.accountBalance}
              skipSynchronizationBeforeHeight={
                this.props.skipSynchronizationBeforeHeight
              }
              mode={this.props.mode}
              whichNetwork={this.props.whichNetwork}
            />
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
              showModal={this.showModal}
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

export default BuyerPages;
