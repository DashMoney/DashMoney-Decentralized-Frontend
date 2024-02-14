import React from "react";

import Offer from "./Offer";

class Offers extends React.Component {
  render() {
    let offerArray = [];
    let offerNameArray = [];

    let offerFilteredArray = offerArray.filter((offer) => {
      return offer.active;
    });

    let offers = offerFilteredArray.map((offer, index) => {
      //console.log(offer);
      return (
        <Offer
          key={index}
          mode={this.props.mode}
          index={index}
          offer={offer}
          identity={this.props.identity}
          uniqueName={this.props.uniqueName}
          showModal={this.props.showModal}
          handleSearchedOffer={this.props.handleSearchedOffer}
          OfferNames={offerNameArray}
        />
      );
    });

    return (
      <>
        {!this.props.isLoadingExchangeSearch ? (
          <div className="footer">
            {offerArray.length !== 0 ? (
              <>{offers}</>
            ) : (
              <div className="bodytext">
                Sorry, there are no offers yet for this.
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Offers;
