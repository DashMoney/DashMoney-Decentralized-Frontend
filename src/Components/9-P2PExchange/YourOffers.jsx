import React from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import YourOffer from "./YourOffer";

class YourOffers extends React.Component {
  render() {
    let offers = this.props.YourOffers.map((offer, index) => {
      //console.log(item);
      return (
        <YourOffer
          key={index}
          mode={this.props.mode}
          index={index}
          offer={offer}
          handleYourOffer={this.props.handleYourOffer}
          handleDeleteYourOffer={this.props.handleDeleteYourOffer}
        />
      );
    });

    return (
      <>
        <p></p>
        {this.props.isLoadingYourOffers ? (
          <>
            <div id="spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
            <p></p>
          </>
        ) : (
          <></>
        )}
        {/* <div className="d-grid gap-2">
              <Button
                variant="primary"
                onClick={() => this.props.showModal("CreateOfferModal")}
              >
                <b>Create Offer</b>
              </Button>
            </div>
            <p></p> */}

        {this.props.YourOffers.length === 0 &&
        !this.props.isLoadingYourOffers ? (
          <>
            <p style={{ textAlign: "center" }}>
              This is where your offers will appear.
            </p>
          </>
        ) : (
          <></>
        )}

        {this.props.YourOffers.length !== 0 ? <>{offers}</> : <></>}
      </>
    );
  }
}

export default YourOffers;
