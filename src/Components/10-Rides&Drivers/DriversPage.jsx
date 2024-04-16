//This will be like the NEARBY and use all the forms a stuff as well.
import React from "react";

import Spinner from "react-bootstrap/Spinner";

import TabsOnPage from "./TabsOnPage";
import LowCreditsOnPage from "../LowCreditsOnPage";
import CreditsOnPage from "../CreditsOnPage";
import LocationForm from "./LocationForm";

import Rides from "./Rides";
//import YourPostsPage from "./YourPosts/YourPostsPage";

class DriversPage extends React.Component {
  // componentDidMount() {
  //   if (this.props.OnPageLoadNEARBY) {
  //     this.props.pullOnPageLoadTriggerNEARBY();
  //   }

  //   if (this.props.isLoginComplete && this.props.InitialPullNearBy) {
  //     this.props.pullInitialTriggerNEARBY();
  //   }
  // }
  render() {
    return (
      <>
        {/* {this.props.isLoginComplete ? (
          <>
            <TabsOnPage
              whichDriversTab={this.props.whichDriversTab}
              handleDriversTab={this.props.handleDriversTab}
            />
          </>
        ) : (
          <> */}
        <div className="bodytext" style={{ textAlign: "center" }}>
          <h3>Build the Dash Economy by earning Dash.</h3>
        </div>
        {/* </>
        )} */}

        <div className="bodytextnotop">
          {this.props.whichDriversTab === "Search" ? (
            <>
              <LowCreditsOnPage
                identityInfo={this.props.identityInfo}
                uniqueName={this.props.uniqueName}
                showModal={this.props.showModal}
              />

              <LocationForm
                mode={this.props.mode}
                cityInput={this.props.cityInput}
                validCity={this.props.validCity}
                tooLongCityNameError={this.props.tooLongCityNameError}
                regionInput={this.props.regionInput}
                validRegion={this.props.validRegion}
                tooLongRegionNameError={this.props.tooLongRegionNameError}
                isLoadingDriversForm={this.props.isLoadingDriversForm}
                handleOnChangeValidation={this.props.handleOnChangeValidation}
                submittedStateAndCategoryTHENConstruct_DRIVERS={
                  this.props.submittedStateAndCategoryTHENConstruct_DRIVERS
                }
              />

              {/* <div
                    className="BottomBorder"
                    style={{ paddingTop: ".5rem" }}
                  ></div> */}

              {this.props.isLoadingDriversInitial ||
              this.props.isLoadingDriversSearch ? (
                <>
                  <p></p>
                  <div className="footer" id="spinner">
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
              {/* <h5>
                <b>Still Constructing</b>
              </h5> */}
              <Rides
                //ALL STATE MUST BE IN APP.JS <-
                SearchedDrives={this.props.SearchedDrives}
                SearchedDrivesNames={this.props.SearchedDrivesNames}
                identity={this.props.identity}
                uniqueName={this.props.uniqueName}
                //handleSearchedPost={this.props.handleSearchedPost}
                //isLoadingNearbySearch={this.props.isLoadingNearbySearch}
                //isLoadingNearbyInitial={this.props.isLoadingNearbyInitial}
                mode={this.props.mode}
                //isLoadingYourRides={this.props.isLoadingYourRides}
              />
            </>
          ) : (
            <>
              {/* THIS IS WHERE THE "YOUR DRIVES" WILL GO */}
              <CreditsOnPage
                identityInfo={this.props.identityInfo}
                uniqueName={this.props.uniqueName}
                showModal={this.props.showModal}
              />

              {/* <YourDrivesPage
                    yourDrivesToDisplay={this.props.yourDrivesToDisplay}
                    handleYourPost={this.props.handleYourPost}
                    handleYourEvent={this.props.handleYourEvent}
                    mode={this.props.mode}
                    showModal={this.props.showModal}
                    isLoadingYourDrivers={this.props.isLoadingYourDrivers}
                  /> */}
            </>
          )}
        </div>
      </>
    );
  }
}

export default DriversPage;
