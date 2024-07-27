import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import Reviews from "../5-NearBy/PostModalAddons/DGReview/Reviews";
import RatingSummary from "../5-NearBy/PostModalAddons/DGReview/RatingSummary";

import dapiClientNoWallet from "../DapiClientNoWallet";

import Dash from "dash";

const {
  PlatformProtocol: { Identifier },
} = Dash;

class OfferModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      copiedtoMeHandle: false,
      LoadingDGR: true,

      SearchedReviews: [],
      SearchedReviewNames: [],
      SearchedReplies: [],

      SearchDGR1: false,
      SearchDGR2: false,

      calcInput: 0,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

  handleFiatDisplay = (fiatInt) => {
    //Convert to 2 decimal places.
    let numToString = fiatInt.toString();
    let strLength = numToString.length;
    let firstPart = numToString.slice(0, strLength - 2);
    let secPart = numToString.slice(strLength - 2, strLength);
    return `${firstPart}.${secPart}`;
  };

  formatToMe = (toMePassed) => {
    switch (toMePassed) {
      case "USD":
        return "Dollar(USD)";
        break;
      case "EUR":
        return "Euro(EUR)";
        break;
      case "DASH":
        return "Dash";
        break;
      default:
        return toMePassed;
      // console.log(toMePassed);
    }
  };

  formatToMeVia = (toMeViaPassed, toMePassed) => {
    if (toMePassed !== "DASH") {
      return ` via ${toMeViaPassed
        .charAt(0)
        .toUpperCase()}${toMeViaPassed.slice(1)}`;
    } else {
      switch (toMeViaPassed) {
        case "paytoname":
          return " via Pay-to-Name";
          break;
        case "address":
          return " via Address";
          break;
        default:
          return ` via ${toMeViaPassed}`;
      }
    }
  };

  formatToU = (toUPassed) => {
    switch (toUPassed) {
      case "USD":
        return "Dollar(USD)";
        break;
      case "EUR":
        return "Euro(EUR)";
        break;
      case "DASH":
        return "Dash";
        break;
      default:
        return toUPassed;
      // console.log(toUPassed);
    }
  };

  formatToUVia = (toUViaPassed, toUPassed) => {
    if (toUPassed !== "DASH") {
      return ` via ${toUViaPassed.charAt(0).toUpperCase()}${toUViaPassed.slice(
        1
      )}`;
    }
  };

  formatDate(theCreatedAt, today, yesterday) {
    let CreatedAt = new Date(theCreatedAt);

    let dateReturn = CreatedAt.toLocaleDateString();

    return dateReturn;
  }

  searchDGRRace = () => {
    if (this.state.SearchDGR1 && this.state.SearchDGR2) {
      this.setState({
        SearchDGR1: false,
        SearchDGR2: false,
        //DONT HAVE TO ADD STATE TO PUSH TO DISPLAY BECAUSE THE REVIEWS AND NAMES PUSHED TOGETHER AND THEN THREADS APPEAR <- SO DO I WANT TO QUERY NAME FIRST THEN?
        LoadingDGR: false,
      });
    }
  };

  getSearchReviews = (theIdentity) => {
    //console.log("Calling getSearchReviews");

    const client = new Dash.Client(dapiClientNoWallet(this.props.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("DGRContract.dgrreview", {
        where: [
          ["toId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no SearchReviews");

          this.setState(
            {
              SearchDGR1: true,
              SearchDGR2: true,
              SearchedReviews: [],
            },
            () => this.searchDGRRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting Search Reviews");

          for (const n of d) {
            let returnedDoc = n.toJSON();

            //console.log("Review:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newReview:\n", returnedDoc);

            docArray = [...docArray, returnedDoc];
          }
          this.getSearchReviewNames(docArray);
          this.getSearchReplies(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getSearchReviewNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.props.whichNetwork));
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    // Start of Setting Unique reviews
    let arrayOfReviews = arrayOfOwnerIds.map((id) => {
      return docArray.find((doc) => id === doc.$ownerId);
    });
    // End of Setting Unique reviews

    // arrayOfOwnerIds = arrayOfOwnerIds.map((ownerId) =>
    //   Buffer.from(Identifier.from(ownerId))
    // );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            SearchedReviewNames: nameDocArray,
            SearchedReviews: arrayOfReviews, //This is a unique set of reviews only single review per reviewer
            SearchDGR1: true,
          },
          () => this.searchDGRRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Search DGR Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getSearchReplies = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.props.whichNetwork));

    // This Below is to get unique set of ByYou review doc ids
    let arrayOfReviewIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfReviewIds);

    let setOfReviewIds = [...new Set(arrayOfReviewIds)];

    arrayOfReviewIds = [...setOfReviewIds];

    //console.log("Array of order ids", arrayOfReviewIds);

    const getDocuments = async () => {
      //console.log("Called Get Search Replies");

      return client.platform.documents.get("DGRContract.dgrreply", {
        where: [["reviewId", "in", arrayOfReviewIds]], // check reviewId ->
        orderBy: [["reviewId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.reviewId = Identifier.from(
            returnedDoc.reviewId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        this.setState(
          {
            SearchDGR2: true,
            SearchedReplies: docArray,
          },
          () => this.searchDGRRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong Search DGR Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };
  onChange = (event) => {
    // console.log(event.target.value);
    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formCalc") {
      event.preventDefault();
      event.stopPropagation();
      this.calcValidate(event.target.value);
    }
  };

  calcValidate = (numberInput) => {
    //console.log(this.props.accountBalance);

    let regex = /^\d{0,10}[.]\d{3}$/;

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let valid = regex.test(numberInput);

    //MAX SPENDABLE IS 10000 DASH
    if (valid) {
      this.setState({
        calcInput: numberInput.replace(/[.,]/g, ""),
      });
    } else {
      this.setState({
        calcInput: 0,
      });
    }
  };

  onSubmit = () => {};

  componentDidMount() {
    if (this.props.selectedSearchedOffer.$ownerId !== "4h5j6j") {
      this.getSearchReviews(this.props.selectedSearchedOfferNameDoc.$ownerId);
    } else {
      this.setState({
        LoadingDGR: false,
      });
    }
  }

  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;

    if (this.props.mode === "primary") {
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBackdrop = "modal-backdrop-dark";
      modalBkg = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    let calcAmt = (
      this.state.calcInput *
      this.props.selectedSearchedOffer.exRate *
      0.00001
    ) //.001 for Dash conversion and .01 for fiat conversion
      .toFixed(2);

    return (
      <Modal
        show={this.props.isModalShowing}
        backdropClassName={modalBackdrop}
        contentClassName={modalBkg}
      >
        {/* <Modal.Header> */}

        {/* NO HEADER JUST PUT EVERYTHING IN THE BODY??? -> PROBABLY NEED TO TEST AND LOOK AT ->  */}

        {/* <Modal.Title>
          <h3>
               <b>Selected Offer</b>
               </h3>
               </Modal.Title>  */}

        {/* </Modal.Header> */}
        <Modal.Body>
          <div className="postModalCloseButton">
            <Modal.Title>{closeButtonColor}</Modal.Title>
          </div>

          <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
            <h4>
              <b>Send</b>{" "}
            </h4>
            <h4>
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.formatToMe(this.props.selectedSearchedOffer.toMe)}
                {this.formatToMeVia(
                  this.props.selectedSearchedOffer.toMeVia,
                  this.props.selectedSearchedOffer.toMe
                )}
              </Badge>
            </h4>
          </div>

          <div className="cardCenterTitle">
            <h4>
              <b>Send to </b>
              <b style={{ color: "#008de4" }}>
                {this.props.selectedSearchedOffer.toMeHandle}
              </b>
            </h4>
            {this.state.copiedtoMeHandle ? <span>✅</span> : <></>}
            <Button
              style={{ whiteSpace: "nowrap" }}
              variant="primary"
              onClick={() => {
                navigator.clipboard.writeText(
                  this.props.selectedSearchedOffer.toMeHandle
                );
                this.setState({
                  copiedtoMeHandle: true,
                });
              }}
            >
              <b>Copy Handle</b>
            </Button>
          </div>
          <p></p>
          <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
            <h4>
              <b>Receive</b>{" "}
            </h4>
            <h4>
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.formatToU(this.props.selectedSearchedOffer.toU)}
                {this.formatToUVia(
                  this.props.selectedSearchedOffer.toUVia,
                  this.props.selectedSearchedOffer.toU
                )}
              </Badge>
            </h4>
          </div>
          <p></p>
          <div>
            <p></p>
            <h5 style={{ textAlign: "center" }}>Exchange Rate(Fiat/Dash)</h5>
            <h4 style={{ textAlign: "center", color: "#008de3" }}>
              <b>
                {this.handleFiatDisplay(
                  this.props.selectedSearchedOffer.exRate
                )}
              </b>
            </h4>
            <p></p>
          </div>

          <p style={{ textAlign: "center", marginBottom: "0rem" }}>
            <b>Min - Max (Fiat):</b>{" "}
            <b>
              {this.handleFiatDisplay(this.props.selectedSearchedOffer.minAmt)}{" "}
              -{" "}
              {this.handleFiatDisplay(this.props.selectedSearchedOffer.maxAmt)}
            </b>
          </p>

          <p></p>

          <Card
            bg={cardBkg}
            text={cardText}
            style={{ border: "solid 2px white", padding: ".2rem" }}
          >
            <Form noValidate onChange={this.onChange} onSubmit={this.onSubmit}>
              <Form.Group className="mb-1" controlId="formCalc">
                <Form.Label>
                  <h5 style={{ marginTop: ".2rem", marginBottom: "0rem" }}>
                    Exchange Calculator
                  </h5>
                </Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Amount(Dash)"
                      required
                      //isValid={this.state.validminAmt}
                      // isInvalid={!this.state.validminAmt}
                    />
                  </Col>
                  <Col>
                    <h5 className="mt-1">
                      <b>Dash x Rate =</b>
                    </h5>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
            <p className="smallertext">
              (i.e. Must include 3 decimal precision)
            </p>

            <h5 style={{ paddingLeft: "2rem" }}>
              <b> = {calcAmt} (fiat)</b>
            </h5>
          </Card>
          <p></p>
          <p style={{ fontSize: "smaller" }}>Created by</p>
          <div className="cardTitle">
            <h4
              style={{ color: "#008de4", marginLeft: "1.5rem" }}
              onClick={() =>
                this.handleNameClick(
                  this.props.selectedSearchedOfferNameDoc.label
                )
              }
            >
              <b>{this.props.selectedSearchedOfferNameDoc.label}</b>
            </h4>

            {/* <span onClick={() => this.handleNameClick()}>
    {this.props.tuple[0]}
  </span> */}
            <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>

            <span className="textsmaller">
              {this.formatDate(
                this.props.selectedSearchedOffer.$updatedAt,
                today,
                yesterday
              )}
            </span>
          </div>
          <p></p>
          <h5>
            <b>Instructions</b>
          </h5>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {this.props.selectedSearchedOffer.instruction}
          </p>

          <p></p>
          <div className="BottomBorder"></div>
          <p></p>

          <h4>
            <b>Reviews</b>
          </h4>

          {/* Move out of button group and removed DSO */}

          {this.state.LoadingDGR ? (
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

          <RatingSummary
            SearchedReviews={this.state.SearchedReviews}
            SearchedNameDoc={this.props.selectedSearchedOfferNameDoc}
            isLoadingSearch={this.state.LoadingDGR}
          />

          {!this.state.LoadingDGR ? (
            <>
              <Reviews
                mode={this.props.mode} //Props
                SearchedReviews={this.state.SearchedReviews} // State
                SearchedReviewNames={this.state.SearchedReviewNames} //State
                SearchedReplies={this.state.SearchedReplies} //State
                SearchedNameDoc={this.props.selectedSearchedOfferNameDoc} //Props
              />
            </>
          ) : (
            <></>
          )}

          {this.state.SearchedReviews.length === 0 && !this.state.LoadingDGR ? (
            <div className="bodytext">
              <p>Sorry, there are no reviews available.</p>
            </div>
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default OfferModal;
