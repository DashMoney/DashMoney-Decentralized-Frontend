import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import ButtonGroup from "react-bootstrap/ButtonGroup";

import TabsOnPage from "./TabsOnPage";
import LowCreditsOnPage from "../LowCreditsOnPage";
import CreditsOnPage from "../CreditsOnPage";
import NameSearchFormEXCHANGE from "./NameSearchFormEXCHANGE";
import OffersSearchForm from "./OffersSearchForm";

import Offers from "./Offers";
import YourOffers from "./YourOffers";

class ExchangePage extends React.Component {
  componentDidMount() {
    if (this.props.isLoginComplete && this.props.InitialPullExchange) {
      this.props.pullInitialTriggerEXCHANGE();
    }
  }

  render() {
    return (
      <>
        {this.props.isLoginComplete ? (
          <>
            <TabsOnPage
              whichExchangeTab={this.props.whichExchangeTab}
              handleExchangeTab={this.props.handleExchangeTab}
            />

            <div className="bodytext">
              {this.props.whichExchangeTab === "Search" ? (
                <>
                  <LowCreditsOnPage
                    identityInfo={this.props.identityInfo}
                    uniqueName={this.props.uniqueName}
                    showModal={this.props.showModal}
                  />

                  <div className="bodytext" style={{ textAlign: "center" }}>
                    {/* <h3>Peer-to-Peer Exchange or Marketplace of Exchanges.</h3> */}

                    <h6>"Caveat Emptor" -DashMoney</h6>
                  </div>

                  {/* <h3>
                    <b>Get Offers for</b>
                  </h3> */}

                  <p></p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {this.props.whichOffersName === "Offers" ? (
                      <ButtonGroup className="me-2" aria-label="offer-name">
                        <Button
                          variant="primary"
                          style={{ textDecoration: "underline" }}
                        >
                          <b
                            style={{
                              fontSize: "larger",
                              paddingLeft: ".8rem",
                              paddingRight: ".8rem",
                            }}
                          >
                            Offers
                          </b>
                        </Button>

                        <Button
                          variant="primary"
                          onClick={this.props.triggerNameButton}
                        >
                          <b
                            style={{
                              fontSize: "larger",
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                            }}
                          >
                            Name
                          </b>
                        </Button>
                      </ButtonGroup>
                    ) : (
                      <ButtonGroup className="me-2" aria-label="First group">
                        <Button
                          variant="primary"
                          onClick={this.props.triggerOffersButton}
                        >
                          <b
                            style={{
                              fontSize: "larger",
                              paddingLeft: ".8rem",
                              paddingRight: ".8rem",
                            }}
                          >
                            Offers
                          </b>
                        </Button>

                        <Button
                          variant="primary"
                          style={{ textDecoration: "underline" }}
                        >
                          <b
                            style={{
                              fontSize: "larger",
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                            }}
                          >
                            Name
                          </b>
                        </Button>
                      </ButtonGroup>
                    )}
                  </div>

                  <p></p>
                  {this.props.whichOffersName === "Offers" ? (
                    <>
                      <OffersSearchForm
                        mode={this.props.mode}
                        handleExchangeOffersSearchOnChangeValidation={
                          this.props
                            .handleExchangeOffersSearchOnChangeValidation
                        }
                        constructQueryThenSearch_EXCHANGE={
                          this.props.constructQueryThenSearch_EXCHANGE
                        }
                        clearExchangeOffersForm={
                          this.props.clearExchangeOffersForm
                        }
                        toMeFinal={this.props.toMeFinal}
                        toMeInput={this.props.toMeInput}
                        validtoMe={this.props.validtoMe}
                        toMeInputOTHER={this.props.toMeInputOTHER}
                        validtoMeOTHER={this.props.validtoMeOTHER}
                        tooLongtoMeErrorOTHER={this.props.tooLongtoMeErrorOTHER}
                        toMeViaInput={this.props.toMeViaInput}
                        validtoMeVia={this.props.validtoMeVia}
                        toMeViaInputOTHER={this.props.toMeViaInputOTHER}
                        validtoMeViaOTHER={this.props.validtoMeViaOTHER}
                        tooLongtoMeViaErrorOTHER={
                          this.props.tooLongtoMeViaErrorOTHER
                        }
                        toUFinal={this.props.toUFinal}
                        toUInput={this.props.toUInput}
                        validtoU={this.props.validtoU}
                        toUInputOTHER={this.props.toUInputOTHER}
                        validtoUOTHER={this.props.validtoUOTHER}
                        tooLongtoUErrorOTHER={this.props.tooLongtoUErrorOTHER}
                        toUViaInput={this.props.toUViaInput}
                        validtoUVia={this.props.validtoUVia}
                        toUViaInputOTHER={this.props.toUViaInputOTHER}
                        validtoUViaOTHER={this.props.validtoUViaOTHER}
                        tooLongtoUViaErrorOTHER={
                          this.props.tooLongtoUViaErrorOTHER
                        }
                      />
                    </>
                  ) : (
                    <>
                      <NameSearchFormEXCHANGE
                        mode={this.props.mode}
                        nameToSearch_EXCHANGE={this.props.nameToSearch_EXCHANGE}
                        nameFormat_EXCHANGE={this.props.nameFormat_EXCHANGE}
                        isTooLongNameError_EXCHANGE={
                          this.props.isTooLongNameError_EXCHANGE
                        }
                        searchName_EXCHANGE={this.props.searchName_EXCHANGE}
                        handleExchangeNameSearchOnChangeValidation={
                          this.props.handleExchangeNameSearchOnChangeValidation
                        }
                      />
                    </>
                  )}

                  {/* <div
                    className="BottomBorder"
                    style={{ paddingTop: ".5rem" }}
                  ></div> */}

                  {/* //Make the reviewSummary remove as well when No NameDoc? ^^^^ ->  */}

                  {/* <Button THIS WILL BE CREATE ->  NO -> THAT WILL BE ON MY OFFERS/> */}

                  {this.props.isLoadingExchangeSearch ? (
                    <>
                      <p></p>
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

                  {!this.props.isLoadingExchangeSearch ? (
                    <>
                      <Offers
                        mode={this.props.mode}
                        identity={this.props.identity}
                        uniqueName={this.props.uniqueName}
                        whichOffersName={this.props.whichOffersName}
                        SearchedNameDoc_EXCHANGE={
                          this.props.SearchedNameDoc_EXCHANGE
                        }
                        SearchedNameOffers_EXCHANGE={
                          this.props.SearchedNameOffers_EXCHANGE
                        }
                        handleSearchedOffer={this.props.handleSearchedOffer}
                        SearchedOffers={this.props.SearchedOffers}
                        SearchedOffersNames={this.props.SearchedOffersNames}
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {/* {this.props.SearchedOffers.length === 0 &&
                  !this.props.isLoadingExchangeSearch ? (
                    <div className="bodytext">
                      <p>Sorry, there are no offers available.</p>
                    </div>
                  ) : (
                    <></>
                  )} */}
                </>
              ) : (
                <>
                  {/* THIS IS WHERE THE "YOUR Offers" WILL GO */}

                  <CreditsOnPage
                    identityInfo={this.props.identityInfo}
                    uniqueName={this.props.uniqueName}
                    showModal={this.props.showModal}
                  />

                  <p></p>
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={() => this.props.showModal("CreateOfferModal")}
                    >
                      <b style={{ fontSize: "larger" }}>Create Offer</b>
                    </Button>
                  </div>

                  <YourOffers
                    YourOffers={this.props.YourOffers}
                    identity={this.props.identity}
                    uniqueName={this.props.uniqueName}
                    handleYourOffer={this.props.handleYourOffer}
                    mode={this.props.mode}
                    isLoadingYourOffers={this.props.isLoadingYourOffers}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <div className="bodytextnotop">
            <div className="bodytext" style={{ textAlign: "center" }}>
              <h3>Peer-to-Peer Exchange</h3>
              <h3>or</h3>
              <h3>Marketplace of Exchanges</h3>
              {/* <h5>
                “If ye love wealth better than liberty, the tranquility of
                servitude better than the animating contest of freedom, go home
                from us in peace. We ask not your counsels or arms. Crouch down
                and lick the hands which feed you. May your chains set lightly
                upon you, and may posterity forget that ye were our countrymen.”
                -Samuel Adams
              </h5> */}
              <p></p>
              <h6>"Caveat Emptor" -DashMoney</h6>
            </div>
            {/* <p></p>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                onClick={() => this.props.showModal("CreateOfferModal")}
              >
                <b style={{ fontSize: "larger" }}>Create New Offer</b>
              </Button>
            </div> */}
            <p></p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {this.props.whichOffersName === "Offers" ? (
                <ButtonGroup className="me-2" aria-label="offer-name">
                  <Button
                    variant="primary"
                    style={{ textDecoration: "underline" }}
                  >
                    <b
                      style={{
                        fontSize: "larger",
                        paddingLeft: ".8rem",
                        paddingRight: ".8rem",
                      }}
                    >
                      Offers
                    </b>
                  </Button>

                  <Button
                    variant="primary"
                    onClick={this.props.triggerNameButton}
                  >
                    <b
                      style={{
                        fontSize: "larger",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                      }}
                    >
                      Name
                    </b>
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup className="me-2" aria-label="First group">
                  <Button
                    variant="primary"
                    onClick={this.props.triggerOffersButton}
                  >
                    <b
                      style={{
                        fontSize: "larger",
                        paddingLeft: ".8rem",
                        paddingRight: ".8rem",
                      }}
                    >
                      Offers
                    </b>
                  </Button>

                  <Button
                    variant="primary"
                    style={{ textDecoration: "underline" }}
                  >
                    <b
                      style={{
                        fontSize: "larger",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                      }}
                    >
                      Name
                    </b>
                  </Button>
                </ButtonGroup>
              )}
            </div>
            {/* <p></p>
            <h3>
              <b>Get Recent Offers</b>
            </h3> */}

            <p></p>
            {this.props.whichOffersName === "Offers" ? (
              <>
                <OffersSearchForm
                  mode={this.props.mode}
                  handleExchangeOffersSearchOnChangeValidation={
                    this.props.handleExchangeOffersSearchOnChangeValidation
                  }
                  constructQueryThenSearch_EXCHANGE={
                    this.props.constructQueryThenSearch_EXCHANGE
                  }
                  clearExchangeOffersForm={this.props.clearExchangeOffersForm}
                  toMeFinal={this.props.toMeFinal}
                  toMeInput={this.props.toMeInput}
                  validtoMe={this.props.validtoMe}
                  toMeInputOTHER={this.props.toMeInputOTHER}
                  validtoMeOTHER={this.props.validtoMeOTHER}
                  tooLongtoMeErrorOTHER={this.props.tooLongtoMeErrorOTHER}
                  toMeViaInput={this.props.toMeViaInput}
                  validtoMeVia={this.props.validtoMeVia}
                  toMeViaInputOTHER={this.props.toMeViaInputOTHER}
                  validtoMeViaOTHER={this.props.validtoMeViaOTHER}
                  tooLongtoMeViaErrorOTHER={this.props.tooLongtoMeViaErrorOTHER}
                  toUFinal={this.props.toUFinal}
                  toUInput={this.props.toUInput}
                  validtoU={this.props.validtoU}
                  toUInputOTHER={this.props.toUInputOTHER}
                  validtoUOTHER={this.props.validtoUOTHER}
                  tooLongtoUErrorOTHER={this.props.tooLongtoUErrorOTHER}
                  toUViaInput={this.props.toUViaInput}
                  validtoUVia={this.props.validtoUVia}
                  toUViaInputOTHER={this.props.toUViaInputOTHER}
                  validtoUViaOTHER={this.props.validtoUViaOTHER}
                  tooLongtoUViaErrorOTHER={this.props.tooLongtoUViaErrorOTHER}
                />
              </>
            ) : (
              <>
                <NameSearchFormEXCHANGE
                  mode={this.props.mode}
                  nameToSearch_EXCHANGE={this.props.nameToSearch_EXCHANGE}
                  nameFormat_EXCHANGE={this.props.nameFormat_EXCHANGE}
                  isTooLongNameError_EXCHANGE={
                    this.props.isTooLongNameError_EXCHANGE
                  }
                  searchName_EXCHANGE={this.props.searchName_EXCHANGE}
                  handleExchangeNameSearchOnChangeValidation={
                    this.props.handleExchangeNameSearchOnChangeValidation
                  }
                />
              </>
            )}
            <div className="footer">
              {this.props.isLoadingExchangeSearch ? (
                <>
                  <p></p>
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

              {!this.props.isLoadingExchangeSearch ? (
                <>
                  <Offers
                    mode={this.props.mode}
                    identity={this.props.identity}
                    uniqueName={this.props.uniqueName}
                    whichOffersName={this.props.whichOffersName}
                    SearchedNameDoc_EXCHANGE={
                      this.props.SearchedNameDoc_EXCHANGE
                    }
                    SearchedNameOffers_EXCHANGE={
                      this.props.SearchedNameOffers_EXCHANGE
                    }
                    handleSearchedOffer={this.props.handleSearchedOffer}
                    SearchedOffers={this.props.SearchedOffers}
                    SearchedOffersNames={this.props.SearchedOffersNames}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            {/* {this.props.SearchedOffers.length === 0 &&
            !this.props.isLoadingExchangeSearch ? (
              <div className="bodytext">
                <p className="footer">
                  Sorry, there are no offers available. But someone could make
                  one.. 🤔
                </p>
              </div>
            ) : (
              <></>
            )} */}
          </div>
        )}
      </>
    );
  }
}

export default ExchangePage;
