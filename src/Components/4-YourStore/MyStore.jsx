import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import MyStoreItem from "./MyStoreItem";

class MyStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "",
    };
  }

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

    this.props.DGPItems.forEach((item) => {
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
        <MyStoreItem
          key={index}
          mode={this.props.mode}
          index={index}
          item={item}
          handleSelectedItem={this.props.handleSelectedItem}
        />
      );
    });

    return (
      <>
        {this.props.LoadingStore ||
        !this.props.WALLET_Login7 ||
        this.props.isLoadingButtons_WALLET ? (
          // WALLET_Login7 && isLoadingButtons_WALLET added for the separation of DGM and Store Creation
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

        {/* 

        
        {this.props.DGPStore.length === 0 ?

<div className="d-grid gap-2" id="button-edge">
          <Button
            variant="primary"
            onClick={() => {
                      this.props.showModal('CreateStoreModal');
                    }}
          >
            <b>Create Store/Menu</b>
          </Button>
        </div>
        :
        <></>
} */}

        {/* ADDED FOR ENABLE PAY-TO-NAME BELOW */}

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

        {/* ADDED FOR ENABLE PAY-TO-NAME ^^^ */}

        {this.props.dgmDocuments.length !== 0 &&
        this.props.WALLET_Login7 &&
        //Added top 2 for Address create prior to Store Create
        this.props.DGPStore === "No Store" &&
        !this.props.LoadingStore ? (
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

        {/* Store name, description, open or close (collapsible) */}

        {this.props.DGPStore !== "No Store" && !this.props.LoadingStore ? (
          <>
            <div className="bodytextnobottom">
              <div className="cardTitle">
                <h2>{this.props.uniqueName}</h2>
                <span>
                  {this.props.DGPStore[0].public ? (
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
                  {this.props.DGPStore[0].payLater ? (
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
                <Button
                  variant="primary"
                  onClick={() => this.props.showModal("StoreStatusModal")}
                >
                  {this.props.DGPStore[0].open ? <b>Open</b> : <b>Closed</b>}
                </Button>

                <span></span>
              </div>

              <h5 className="bodytext" style={{ whiteSpace: "pre-wrap" }}>
                <b>{this.props.DGPStore[0].description}</b>
              </h5>
              {/* <Card id="card" bg={cardBkg} text={cardText}>
              <Card.Body>
                <Card.Title className="cardTitle">
                  <b className="addSpaceRight">
                    <h4>{this.props.uniqueName}</h4>
                  </b>
                  <Button>{this.props.DGPStore[0].open?'Open':'Closed'}</Button>
                </Card.Title>

                <Card.Text>{this.props.DGPStore[0].description}</Card.Text>
                <Button>Edit Store</Button>
              </Card.Body>
            </Card> */}

              <div className="cardTitle">
                <h3>Store/Menu Items</h3>
                <Button
                  variant="primary"
                  onClick={() => this.props.showModal("CreateItemModal")}
                >
                  <b>Add Item</b>
                </Button>
              </div>
            </div>

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
              <></>
            )}

            {this.props.DGPItems.length === 0 && !this.props.LoadingItems ? (
              <>
                <p style={{ textAlign: "center" }}>
                  This is where your items will display.
                </p>
              </>
            ) : (
              <></>
            )}
            {categoryButtons.length !== 0 ? (
              <>
                {this.state.selectedCategory === "" ? (
                  <div className="d-grid gap-2" id="button-edge">
                    {categoryButtons}
                  </div>
                ) : (
                  <div className="categoryTitle">
                    <Button
                      variant="primary"
                      onClick={() => {
                        this.handleCatBack();
                      }}
                    >
                      <b>Back</b>
                    </Button>

                    <h3 className="spaceLeft">
                      <b>{this.state.selectedCategory}</b>
                    </h3>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}

            {items}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default MyStore;
