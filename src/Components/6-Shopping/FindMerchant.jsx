import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//import Form from "react-bootstrap/Form";

import handleDenomDisplay from "../UnitDisplay";

import { IoMdArrowRoundBack } from "react-icons/io";

import MerchantItem from "./MerchantItem";
import CartItem from "./CartItem";
import RecentOrdersDisplayComponent from "./RecentOrdersDisplayComponent";
import ActiveOrdersDisplayComponent from "./ActiveOrdersDisplayComponent";

class FindMerchant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "",
    };
  }
  handleTotalItems = () => {
    let numOfItems = 0;
    this.props.cartItems.forEach((tuple) => {
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

  handleTotal = () => {
    //this.prop.cartItems AND this.props.merchantItems
    let theTotal = 0;

    this.props.cartItems.forEach((tuple) => {
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

  handleCategory = (category) => {
    this.setState({
      selectedCategory: category,
    });
  };

  handleCatBack = () => {
    this.setState({
      selectedCategory: "",
    });
  };

  render() {
    //First sort out items that have categories and which do not
    let categoryItems = [];
    let nonCatItems = [];

    this.props.merchantItems.forEach((item) => {
      if (item.category === undefined || item.category === "") {
        nonCatItems.push(item);
      } else {
        categoryItems.push(item);
      }
    });

    // Next create a list of buttons based on the category names
    let categoryNames = categoryItems.map((item) => {
      return item.category;
    });

    let setOfCatNames = [...new Set(categoryNames)];

    categoryNames = [...setOfCatNames];

    let categoryButtons = categoryNames.map((category, index) => (
      <Button
        key={index}
        variant="primary"
        onClick={() => {
          this.handleCategory(category);
        }}
      >
        <b>{category}</b>
      </Button>
    ));

    // display category above or below items? -> above I think, thought about below to indicate specials but its bad design.

    let itemsToDisplay = [];

    if (this.state.selectedCategory === "") {
      itemsToDisplay = nonCatItems;
    } else {
      itemsToDisplay = categoryItems.filter((item) => {
        return item.category === this.state.selectedCategory;
      });
    }

    let items = itemsToDisplay.map((item, index) => {
      //console.log(item);
      return (
        <MerchantItem
        whichNetwork={this.props.whichNetwork}
          handleAddToCartModal={this.props.handleAddToCartModal}
          key={index}
          mode={this.props.mode}
          index={index}
          item={item}
          addToCart={this.props.addToCart}
        />
      );
    });

    let cartItems = this.props.cartItems.map((item, index) => {
      //console.log(item);
      return (
        <CartItem
        whichNetwork={this.props.whichNetwork}
          handleEditItemModal={this.props.handleEditItemModal}
          key={index}
          mode={this.props.mode}
          index={index}
          item={item}
        />
      );
    });

    let recentOrders = [];

    if (!this.props.isLoadingRecentOrders) {
      let arrayOfToIds = this.props.recentOrders.map((doc) => {
        return doc.toId;
      });

      let setOfToIds = [...new Set(arrayOfToIds)];

      arrayOfToIds = [...setOfToIds];

      recentOrders = arrayOfToIds.map((orderToId, index) => {
        return (
          <RecentOrdersDisplayComponent
            recentOrdersStores={this.props.recentOrdersStores}
            recentOrdersNames={this.props.recentOrdersNames}
            recentOrdersDGMAddresses={this.props.recentOrdersDGMAddresses}
            handleSelectRecentOrActive={this.props.handleSelectRecentOrActive}
            key={index}
            mode={this.props.mode}
            index={index}
            orderToId={orderToId}
          />
        );
      });
    }

    let activeOrders = [];

    if (!this.props.isLoadingActive) {
      let arrayOfToIds = this.props.activeOrders.map((doc) => {
        return doc.toId;
      });

      let setOfToIds = [...new Set(arrayOfToIds)];

      arrayOfToIds = [...setOfToIds];

      activeOrders = arrayOfToIds.map((orderToId, index) => {
        return (
          <ActiveOrdersDisplayComponent
            activeOrdersStores={this.props.activeOrdersStores}
            activeOrdersNames={this.props.activeOrdersNames}
            activeOrdersAddresses={this.props.activeOrdersAddresses}
            handleSelectRecentOrActive={this.props.handleSelectRecentOrActive}
            key={index}
            mode={this.props.mode}
            index={index}
            orderToId={orderToId}
          />
        );
      });
    }

    return (
      <>
        {this.props.LoadingOrder ? (
          <>
            <p></p>
            <div id="spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
            <p> </p>
          </>
        ) : (
          <>
            <div className="bodytextnotop">
              {this.props.viewStore ? (
                <>
                  <h2>Your Cart</h2>
                  {this.props.cartItems.length === 0 ? (
                    <p>(Items you add to cart will appear here)</p>
                  ) : (
                    <>
                      {cartItems}
                      <p></p>
                      <div className="cartTotal">
                        <h4>
                          <b>Total</b> ({this.handleTotalItems()})<b>:</b>
                        </h4>

                        {this.handleTotal()}
                      </div>
                    </>
                  )}

                  {this.props.cartItems.length > 0 ? (
                    <>
                      <div className="ButtonRight">
                        <Button
                          onClick={() =>
                            this.props.showModal("PlaceOrderModal")
                          }
                        >
                          <b>Place Order</b>
                        </Button>
                      </div>
                      <p></p>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                // this.props.viewStore ?
                <></>
              )}

              {this.props.merchantStore.length !== 0 &&
              this.props.merchantStore !== "No Store" ? (
                <>
                  {this.props.merchantStore[0].open ? (
                    <>
                      {this.props.dgmDocumentForMerchant.length !== 0 &&
                      this.props.dgmDocumentForMerchant !==
                        "No DGM Doc for Merchant." ? (
                        <>
                          {this.props.viewStore ? (
                            <>
                              {/* <h2
                                className="paddingTop"
                                style={{ color: "#008de4" }}
                              >
                                <b> {this.props.merchantStoreName}</b>
                              </h2> */}
                              <div className="indentStuff">
                                <div className="paddingTop">
                                  <div className="cardTitle">
                                    <h2
                                      className="paddingTop"
                                      style={{ color: "#008de4" }}
                                    >
                                      <b> {this.props.merchantStoreName}</b>
                                    </h2>
                                    <span>
                                      {this.props.merchantStore[0].public ? (
                                        <Badge variant="primary">
                                          {" "}
                                          <b>Public</b>
                                        </Badge>
                                      ) : (
                                        <Badge variant="primary">
                                          {" "}
                                          <b>Private</b>
                                        </Badge>
                                      )}
                                    </span>
                                    <span>
                                      {this.props.merchantStore[0].payLater ? (
                                        <Badge variant="primary">
                                          {" "}
                                          <b>Pay Later</b>
                                        </Badge>
                                      ) : (
                                        <Badge variant="primary">
                                          {" "}
                                          <b>No Pay Later</b>
                                        </Badge>
                                      )}
                                    </span>

                                    <span></span>
                                  </div>{" "}
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="indentStuff">
                              {/* <h3 style={{ color: "#008de4" }}>
                                <b> {this.props.merchantStoreName}</b>
                              </h3> */}
                              <div className="paddingTop">
                                <div className="cardTitle">
                                  <h2
                                    className="paddingTop"
                                    style={{ color: "#008de4" }}
                                  >
                                    <b> {this.props.merchantStoreName}</b>
                                  </h2>
                                  <span>
                                    {this.props.merchantStore[0].public ? (
                                      <Badge variant="primary">
                                        {" "}
                                        <b>Public</b>
                                      </Badge>
                                    ) : (
                                      <Badge variant="primary">
                                        {" "}
                                        <b>Private</b>
                                      </Badge>
                                    )}
                                  </span>
                                  <span>
                                    {this.props.merchantStore[0].payLater ? (
                                      <Badge variant="primary">
                                        {" "}
                                        <b>Pay Later</b>
                                      </Badge>
                                    ) : (
                                      <Badge variant="primary">
                                        {" "}
                                        <b>No Pay Later</b>
                                      </Badge>
                                    )}
                                  </span>

                                  <span></span>
                                </div>{" "}
                              </div>
                              <h5
                                className="bodytext"
                                style={{ whiteSpace: "pre-wrap" }}
                              >
                                <b>{this.props.merchantStore[0].description}</b>
                              </h5>

                              <div className="ButtonRight">
                                <Button
                                  variant="primary"
                                  onClick={() => this.props.handleViewStore()}
                                >
                                  <b>View Store/Menu</b>
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <h3 style={{ color: "#008de4" }}>
                            <b> {this.props.merchantStoreName}</b>
                          </h3>
                          <h5 className="bodytext">
                            <b>{this.props.merchantStore[0].description}</b>
                          </h5>
                          <Button variant="primary">
                            <b>Loading..</b>
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <h3 style={{ color: "#008de4" }}>
                        <b> {this.props.merchantStoreName}</b>
                      </h3>
                      <h5 className="bodytext">
                        <b>{this.props.merchantStore[0].description}</b>
                      </h5>
                      <Button variant="primary" disabled>
                        <b>Store Closed</b>
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}

              {this.props.viewStore ? (
                <>
                  {this.props.LoadingItems ? (
                    <>
                      <p></p>
                      <div id="spinner">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    </>
                  ) : (
                    <>
                      <div id="cardtext" className="footer">
                        {this.props.merchantItems.length === 0 ? (
                          <>
                            <p>This store has no items for purchase.</p>
                          </>
                        ) : (
                          <div id="cardtext">
                            {this.state.selectedCategory === "" ? (
                              <>
                                {categoryNames.length === 0 ? (
                                  <></>
                                ) : (
                                  <div
                                    className="d-grid gap-2"
                                    id="button-edge"
                                  >
                                    {categoryButtons}
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="categoryTitle">
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    this.handleCatBack();
                                  }}
                                >
                                  <IoMdArrowRoundBack size={28} />
                                </Button>

                                <h3 className="spaceLeft">
                                  <b>{this.state.selectedCategory}</b>
                                </h3>
                              </div>
                            )}

                            {items}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p></p>
                  <h3 className="indentStuff">Your Recent Orders</h3>

                  {this.props.isLoadingRecentOrders ? (
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
                  {this.props.recentOrders.length === 0 &&
                  !this.props.isLoadingRecentOrders ? (
                    <>
                      <p className="indentStuff">
                        Merchants, you have ordered from will appear here
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {this.props.recentOrders.length !== 0 &&
                  !this.props.isLoadingRecentOrders ? (
                    <>
                      <div id="cardtext">{recentOrders}</div>
                    </>
                  ) : (
                    <></>
                  )}
                  <p></p>
                  <h3 className="indentStuff">Active Stores</h3>

                  {this.props.isLoadingActive ? (
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
                  {this.props.activeOrders.length === 0 &&
                  !this.props.isLoadingActive ? (
                    <>
                      <p className="indentStuff">
                        Merchants with recent purchases will appear here to aid
                        in finding new merchants
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {this.props.activeOrders.length !== 0 &&
                  !this.props.isLoadingActive ? (
                    <>
                      <div id="cardtext">{activeOrders}</div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </>
        )}{" "}
        {/* This is to close the LoadingOrder */}
      </>
    );
  }
}

export default FindMerchant;
