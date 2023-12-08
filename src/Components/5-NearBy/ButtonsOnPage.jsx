import React from "react";
import Button from "react-bootstrap/Button";

class ButtonsOnPage extends React.Component {
  render() {
    // CALC THE POST NUMBERS FOR DISPLAY ->
    let offRentNum = this.props.OffRentPosts.length;

    let offBizNum = this.props.OffBizPosts.length;

    let offOtherNum = this.props.OffOtherPosts.length;

    let lookRentNum = this.props.LookRentPosts.length;

    let lookOtherNum = this.props.LookOtherPosts.length;

    return (
      <>
        <h3 style={{ marginTop: ".5rem", marginBottom: ".1rem" }}>
          <b>Offering</b>
        </h3>

        {this.props.selectedCategoryButton === "offrent" ? (
          <Button
            variant="primary"
            style={{ textDecoration: "underline", marginRight: ".5rem" }}
          >
            <b>Place to Rent</b>{" "}
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
            style={{ marginRight: ".5rem" }}
            onClick={() => this.props.handleSelectedCategoryButton("offrent")}
          >
            <b>Place to Rent</b>{" "}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offRentNum})</b>
            ) : (
              <></>
            )}
          </Button>
        )}

        {this.props.selectedCategoryButton === "offbiz" ? (
          <Button
            variant="primary"
            style={{ textDecoration: "underline", marginRight: ".5rem" }}
          >
            <b>Business/DGP</b>{" "}
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
            style={{ marginRight: ".5rem" }}
            onClick={() => this.props.handleSelectedCategoryButton("offbiz")}
          >
            <b>Business/DGP</b>{" "}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offBizNum})</b>
            ) : (
              <></>
            )}
          </Button>
        )}

        {this.props.selectedCategoryButton === "offother" ? (
          <Button
            variant="primary"
            style={{ textDecoration: "underline", marginTop: ".2rem" }}
          >
            <b>Other</b>{" "}
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
            style={{ marginTop: ".2rem" }}
            onClick={() => this.props.handleSelectedCategoryButton("offother")}
          >
            <b>Other</b>{" "}
            {!this.props.isLoadingNearbySearch &&
            !this.props.isLoadingNearbyInitial ? (
              <b>({offOtherNum})</b>
            ) : (
              <></>
            )}
          </Button>
        )}

        <h3 style={{ marginTop: ".5rem", marginBottom: ".1rem" }}>
          <b>Looking For</b>
        </h3>

        {this.props.selectedCategoryButton === "lookrent" ? (
          <Button
            variant="primary"
            style={{ textDecoration: "underline", marginRight: ".5rem" }}
          >
            <b>Place to Rent</b>{" "}
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
            <b>Place to Rent</b>{" "}
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
            <b>Other</b>{" "}
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
            <b>Other</b>{" "}
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
