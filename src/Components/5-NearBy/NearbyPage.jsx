import React from "react";

import Spinner from "react-bootstrap/Spinner";

import TabsOnPage from "./TabsOnPage";
import LowCreditsOnPage from "../LowCreditsOnPage";
import LocationForm from "./LocationForm";
import ButtonsOnPage from "./ButtonsOnPage";
import Posts from "./Posts";
import YourPostsPage from "./YourPosts/YourPostsPage";

class NearbyPage extends React.Component {
  componentDidMount() {
    if (this.props.isLoginComplete && this.props.InitialPullNearBy) {
      this.props.pullInitialTriggerNEARBY();
    }
  }
  render() {
    return (
      <>
        {this.props.isLoginComplete ? (
          <>
            <TabsOnPage
              whichNearbyTab={this.props.whichNearbyTab}
              handleNearbyTab={this.props.handleNearbyTab}
            />
            <div className="bodytextnotop">
              {this.props.whichNearbyTab === "Search" ? (
                <>
                  <LowCreditsOnPage
                    identityInfo={this.props.identityInfo}
                    uniqueName={this.props.uniqueName}
                    showModal={this.props.showModal}
                  />

                  <LocationForm
                    whichCountryRegion={this.props.whichCountryRegion}
                    mode={this.props.mode}
                    cityInput={this.props.cityInput}
                    validCity={this.props.validCity}
                    tooLongCityNameError={this.props.tooLongCityNameError}
                    countryRegionInput={this.props.countryRegionInput}
                    validCountryRegion={this.props.validCountryRegion}
                    tooLongCountryRegionNameError={
                      this.props.tooLongCountryRegionNameError
                    }
                    isLoadingNearbyForm={this.props.isLoadingNearbyForm}
                    triggerCountryButton={this.props.triggerCountryButton}
                    triggerRegionButton={this.props.triggerRegionButton}
                    handleNearbyOnChangeValidation={
                      this.props.handleNearbyOnChangeValidation
                    }
                    constructQueryThenSearch={
                      this.props.constructQueryThenSearch
                    }
                  />

                  <ButtonsOnPage
                    selectedCategoryButton={this.props.selectedCategoryButton}
                    handleSelectedCategoryButton={
                      this.props.handleSelectedCategoryButton
                    }
                    isLoadingNearbySearch={this.props.isLoadingNearbySearch}
                    isLoadingNearbyInitial={this.props.isLoadingNearbyInitial}
                    OffRentPosts={this.props.OffRentPosts}
                    OffBizPosts={this.props.OffBizPosts}
                    OffOtherPosts={this.props.OffOtherPosts}
                    LookRentPosts={this.props.LookRentPosts}
                    LookOtherPosts={this.props.LookOtherPosts}
                  />

                  {/* <div
                    className="BottomBorder"
                    style={{ paddingTop: ".5rem" }}
                  ></div> */}

                  {this.props.isLoadingNearbyInitial ||
                  this.props.isLoadingNearbySearch ? (
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
                  <p></p>
                  <Posts
                    selectedCategoryButton={this.props.selectedCategoryButton}
                    mode={this.props.mode}
                    handleSearchedPost={this.handleSearchedPost}
                    OffRentPosts={this.props.OffRentPosts}
                    OffRentNames={this.props.OffRentNames}
                    OffBizPosts={this.props.OffBizPosts}
                    OffBizNames={this.props.OffBizNames}
                    OffOtherPosts={this.props.OffOtherPosts}
                    OffOtherNames={this.props.OffOtherNames}
                    LookRentPosts={this.props.LookRentPosts}
                    LookRentNames={this.props.LookRentNames}
                    LookOtherPosts={this.props.LookOtherPosts}
                    LookOtherNames={this.props.LookOtherNames}
                    isLoadingNearbySearch={this.props.isLoadingNearbySearch}
                    isLoadingNearbyInitial={this.props.isLoadingNearbyInitial}
                  />
                </>
              ) : (
                <>
                  {/* THIS IS WHERE THE "YOUR POSTS" WILL GO */}

                  <YourPostsPage
                    yourPostsToDisplay={this.props.yourPostsToDisplay}
                    handleYourPost={this.handleYourPost}
                    mode={this.props.mode}
                    showModal={this.showModal}
                    isLoadingYourPosts={this.props.isLoadingYourPosts}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <div className="bodytextnotop">
            <div className="bodytext" style={{ textAlign: "center" }}>
              <h3>Find places to spend Dash or add a place to earn Money!</h3>
            </div>

            <LocationForm
              whichCountryRegion={this.props.whichCountryRegion}
              mode={this.props.mode}
              cityInput={this.props.cityInput}
              validCity={this.props.validCity}
              tooLongCityNameError={this.props.tooLongCityNameError}
              countryRegionInput={this.props.countryRegionInput}
              validCountryRegion={this.props.validCountryRegion}
              tooLongCountryRegionNameError={
                this.props.tooLongCountryRegionNameError
              }
              isLoadingNearbyForm={this.props.isLoadingNearbyForm}
              triggerCountryButton={this.props.triggerCountryButton}
              triggerRegionButton={this.props.triggerRegionButton}
              handleNearbyOnChangeValidation={
                this.props.handleNearbyOnChangeValidation
              }
              constructQueryThenSearch={this.props.constructQueryThenSearch}
            />

            <ButtonsOnPage
              selectedCategoryButton={this.props.selectedCategoryButton}
              handleSelectedCategoryButton={
                this.props.handleSelectedCategoryButton
              }
              isLoadingNearbySearch={this.props.isLoadingNearbySearch}
              isLoadingNearbyInitial={this.props.isLoadingNearbyInitial}
              OffRentPosts={this.props.OffRentPosts}
              OffBizPosts={this.props.OffBizPosts}
              OffOtherPosts={this.props.OffOtherPosts}
              LookRentPosts={this.props.LookRentPosts}
              LookOtherPosts={this.props.LookOtherPosts}
            />

            {/* <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div> */}

            {this.props.isLoadingNearbyInitial ||
            this.props.isLoadingNearbySearch ? (
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
            <p></p>
            <Posts
              selectedCategoryButton={this.props.selectedCategoryButton}
              mode={this.props.mode}
              handleSearchedPost={this.props.handleSearchedPost}
              OffRentPosts={this.props.OffRentPosts}
              OffRentNames={this.props.OffRentNames}
              OffBizPosts={this.props.OffBizPosts}
              OffBizNames={this.props.OffBizNames}
              OffOtherPosts={this.props.OffOtherPosts}
              OffOtherNames={this.props.OffOtherNames}
              LookRentPosts={this.props.LookRentPosts}
              LookRentNames={this.props.LookRentNames}
              LookOtherPosts={this.props.LookOtherPosts}
              LookOtherNames={this.props.LookOtherNames}
              isLoadingNearbySearch={this.props.isLoadingNearbySearch}
              isLoadingNearbyInitial={this.props.isLoadingNearbyInitial}
            />
          </div>
        )}
      </>
    );
  }
}

export default NearbyPage;
