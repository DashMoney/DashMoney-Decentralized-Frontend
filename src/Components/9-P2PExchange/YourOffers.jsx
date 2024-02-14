import React from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

//import YourPost from "./YourPost";

class YourOffers extends React.Component {
  //Dont need a constructor because gets data from app.js this is just to display
  /**
   * 1) So the tabs and credits appear at the top
   * 2) like DGP -> button that says add post
   * 3)
   */

  render() {
    let offers = this.props.YourOffers.map((post, index) => {
      //console.log(item);
      return (
        <YourOffer
          key={index}
          mode={this.props.mode}
          index={index}
          offer={offer}
          handleYourOffer={this.props.handleYourOffer}
        />
      );
    });

    return (
      <>
        <p></p>
        {this.props.isLoadingYourOrders ? (
          <>
            <div id="spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </>
        ) : (
          <>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                onClick={() => this.props.showModal("CreateOfferModal")}
              >
                <b>Create Offer</b>
              </Button>
            </div>
            <p></p>

            {this.props.YourOffers.length === 0 ? (
              <>
                <p style={{ textAlign: "center" }}>
                  This is where your offers will appear.
                </p>
              </>
            ) : (
              <>{offers}</>
            )}
          </>
        )}
      </>
    );
  }
}

export default YourOffers;
