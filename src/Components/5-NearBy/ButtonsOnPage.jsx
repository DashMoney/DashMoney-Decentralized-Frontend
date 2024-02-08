import React from "react";
import Button from "react-bootstrap/Button";

class ButtonsOnPage extends React.Component {
  render() {
    // CALC THE POST NUMBERS FOR DISPLAY ->

    let offRentNumFiltered = this.props.OffRentPosts.filter((post) => {
      return post.active;
    });
    let offRentNum = offRentNumFiltered.length;

    let offBizNumFiltered = this.props.OffBizPosts.filter((post) => {
      return post.active;
    });
    let offBizNum = offBizNumFiltered.length;

    //let offBizNum = this.props.OffBizPosts.length;

    let offOtherNumFiltered = this.props.OffOtherPosts.filter((post) => {
      return post.active;
    });
    let offOtherNum = offOtherNumFiltered.length;

    //EVENTS
    let offEventsNumFiltered = this.props.OffEventsPosts.filter((post) => {
      return post.active;
    });
    let offEventsNum = offEventsNumFiltered.length;

    let lookRentNumFiltered = this.props.LookRentPosts.filter((post) => {
      return post.active;
    });
    let lookRentNum = lookRentNumFiltered.length;

    //let lookRentNum = this.props.LookRentPosts.length;

    let lookOtherNumFiltered = this.props.LookOtherPosts.filter((post) => {
      return post.active;
    });

    let lookOtherNum = lookOtherNumFiltered.length;

    return (
      <>
        <h3 style={{ marginTop: ".5rem", marginBottom: ".3rem" }}>
          <b>Offering</b>
        </h3>

        {this.props.selectedCategoryButton === "offbiz" ? (
          <Button
            variant="primary"
            style={{
              textDecoration: "underline",
              marginRight: ".5rem",
              marginBottom: ".7rem",
            }}
          >
            <b>Shops/Menus</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offBizNum})</b>
            ) : (
              <></>
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            style={{ marginRight: ".5rem", marginBottom: ".7rem" }}
            onClick={() => this.props.handleSelectedCategoryButton("offbiz")}
          >
            <b>Shops/Menus</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offBizNum})</b>
            ) : (
              <></>
            )}
          </Button>
        )}

        {/* //EVENTS */}

        {this.props.selectedCategoryButton === "offevents" ? (
          <Button
            variant="primary"
            style={{
              textDecoration: "underline",
              marginRight: ".5rem",
              marginBottom: ".7rem",
            }}
          >
            <b>Events</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offEventsNum})</b>
            ) : (
              <></>
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            style={{ marginRight: ".5rem", marginBottom: ".7rem" }}
            onClick={() => this.props.handleSelectedCategoryButton("offevents")}
          >
            <b>Events</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offEventsNum})</b>
            ) : (
              <></>
            )}
          </Button>
        )}

        {this.props.selectedCategoryButton === "offrent" ? (
          <Button
            variant="primary"
            style={{
              textDecoration: "underline",
              marginRight: ".5rem",
              marginBottom: ".7rem",
            }}
          >
            <b>Place to Rent</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offRentNum})</b>
            ) : (
              <></>
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            style={{ marginRight: ".5rem", marginBottom: ".7rem" }}
            onClick={() => this.props.handleSelectedCategoryButton("offrent")}
          >
            <b>Place to Rent</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offRentNum})</b>
            ) : (
              <></>
            )}
          </Button>
        )}

        {this.props.selectedCategoryButton === "offother" ? (
          <Button
            variant="primary"
            style={{
              textDecoration: "underline",
              marginBottom: ".7rem",
            }}
          >
            <b>Trade</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offOtherNum})</b>
            ) : (
              <></>
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            style={{ marginBottom: ".7rem" }}
            onClick={() => this.props.handleSelectedCategoryButton("offother")}
          >
            <b>Trade</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offOtherNum})</b>
            ) : (
              <></>
            )}
          </Button>
        )}

        <h3 style={{ marginTop: ".5rem", marginBottom: ".1rem" }}>
          <b>Looking for</b>
        </h3>

        {this.props.selectedCategoryButton === "lookrent" ? (
          <Button
            variant="primary"
            style={{ textDecoration: "underline", marginRight: ".5rem" }}
          >
            <b>Place to Rent</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({lookRentNum})</b>
            ) : (
              <></>
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            style={{ marginRight: ".5rem" }}
            onClick={() => this.props.handleSelectedCategoryButton("lookrent")}
          >
            <b>Place to Rent</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({lookRentNum})</b>
            ) : (
              <></>
            )}
          </Button>
        )}

        {this.props.selectedCategoryButton === "lookother" ? (
          <Button variant="primary" style={{ textDecoration: "underline" }}>
            <b>Trade</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({lookOtherNum})</b>
            ) : (
              <></>
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => this.props.handleSelectedCategoryButton("lookother")}
          >
            <b>Trade</b>
            {""}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({lookOtherNum})</b>
            ) : (
              <></>
            )}
          </Button>
        )}
      </>
    );
  }
}

export default ButtonsOnPage;
