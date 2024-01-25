import React from "react";

import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

import Spinner from "react-bootstrap/Spinner";
import MyStore from "./MyStore";
import Orders from "./Orders";

import CreditsOnPage from "../CreditsOnPage";

//import WalletTXModal from "./MerchantModals/WalletTXModal";

import "./MerchantPages.css";

class YourStorePage extends React.Component {
  render() {
    return (
      <>
        <>
          <Nav
            fill
            variant="pills"
            defaultActiveKey={this.props.whichTabYOURSTORE}
            onSelect={(eventKey) => this.props.handleTabYOURSTORE(eventKey)}
          >
            <Nav.Item>
              <Nav.Link eventKey="Orders">
                <b>Orders</b>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Your Store">
                <b>Your Store/Menu</b>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          {/* {this.state.itemError ? (  //state TO props -> CHANGE -> 
            <>
              <p></p>
              <Alert variant="danger" dismissible>
                <Alert.Heading>Item Creation Failed</Alert.Heading>
                <p>
                  You either have insufficient credits or have run into a
                  platform error.
                </p>
              </Alert>
            </>
          ) : (
            <></>
          )} */}

          <div className="footer">
            {this.props.whichTabYOURSTORE === "Your Store" ? (
              <>
                {!this.props.isLoadingStoreYOURSTORE ? (
                  <MyStore
                    identityInfo={this.props.identityInfo}
                    uniqueName={this.props.uniqueName}
                    LoadingStore={this.props.LoadingStore}
                    LoadingItems={this.props.LoadingItems}
                    DGPStore={this.props.DGPStore}
                    DGMAddress={this.props.DGMAddress}
                    DGPItems={this.props.DGPItems}
                    showModal={this.props.showModal} //MOVE ALL THE MODALS TO APP.JS
                    handleSelectedItem={this.props.handleSelectedItem}
                    mode={this.props.mode}
                  />
                ) : (
                  <>
                    <p> </p>
                    <div id="spinner">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                    <p></p>
                  </>
                )}
              </>
            ) : (
              <></>
            )}

            {this.props.whichTabYOURSTORE === "Orders" ? (
              <>
                {!this.props.isLoadingStoreYOURSTORE &&
                !this.props.isLoadingOrdersYOURSTORE ? (
                  <Orders
                    isLoadingWallet={this.props.isLoadingWallet}
                    LoadingStore={this.props.isLoadingStoreYOURSTORE}
                    LoadingItems={this.props.isLoadingItemsYOURSTORE}
                    LoadingOrders={this.props.isLoadingOrdersYOURSTORE}
                    accountBalance={this.props.accountBalance}
                    accountHistory={this.props.accountHistory}
                    identity={this.props.identity}
                    identityInfo={this.props.identityInfo}
                    uniqueName={this.props.uniqueName}
                    DGPItems={this.props.DGPItems}
                    DGPStore={this.props.DGPStore}
                    DGMAddress={this.props.DGMAddress}
                    DGPOrders={this.props.DGPOrders}
                    DGPOrdersNames={this.props.DGPOrdersNames}
                    DGPOrdersMsgs={this.props.DGPOrdersMsgs}
                    newOrderAvail={this.props.newOrderAvail}
                    handleLoadNewOrder={this.props.handleLoadNewOrder}
                    handleMerchantOrderMsgModalShow={
                      this.props.handleMerchantOrderMsgModalShow
                    }
                    showModal={this.props.showModal}
                    mode={this.props.mode}
                  />
                ) : (
                  <>
                    <p> </p>
                    <div id="spinner">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                    <p></p>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      </>
    );
  }
}

export default YourStorePage;
