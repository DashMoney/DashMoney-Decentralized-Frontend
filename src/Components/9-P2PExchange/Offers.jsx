import React from "react";

import Offer from "./Offer";

class Offers extends React.Component {
  render() {
    //let offerArray = [];
    //let offerNameArray = [];

    let offerFilteredArray = this.props.SearchedOffers.filter((offer) => {
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
          handleSearchedOffer={this.props.handleSearchedOffer}
          OfferNames={this.props.SearchedOffersNames}
        />
      );
    });

    return (
      <>
        {!this.props.isLoadingExchangeSearch ? (
          <div className="footer">
            {offerFilteredArray.length !== 0 ? (
              <>{offers}</>
            ) : (
              <>
                {this.props.whichOffersName === "Offers" ? (
                  <div className="bodytext">
                    Sorry, there are no offers available. But someone could make
                    one.. 🤔
                  </div>
                ) : (
                  <div className="bodytext">
                    Sorry, there are no offers available
                  </div>
                )}
              </>
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
