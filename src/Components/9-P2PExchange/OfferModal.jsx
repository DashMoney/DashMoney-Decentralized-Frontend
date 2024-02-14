import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Spinner from "react-bootstrap/Spinner";

//import Reviews from "./PostModalAddons/DGReview/Reviews"; //DGR Integration
//import RatingSummary from "./PostModalAddons/DGReview/RatingSummary";

import Dash from "dash";

const {
  Essentials: { Buffer },
  PlatformProtocol: { Identifier },
} = Dash;

class OfferModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      LoadingDGR: true,

      SearchedReviews: [],
      SearchedReviewNames: [],
      SearchedReplies: [],

      SearchDGR1: false,
      SearchDGR2: false,
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

    const clientOpts = {
      network: this.props.whichNetwork,
      apps: {
        DGRContract: {
          contractId: this.props.DataContractDGR,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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
    const clientOpts = {
      network: this.props.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.props.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
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

    arrayOfOwnerIds = arrayOfOwnerIds.map((ownerId) =>
      Buffer.from(Identifier.from(ownerId))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
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
    const clientOpts = {
      network: this.props.whichNetwork,
      apps: {
        DGRContract: {
          contractId: this.props.DataContractDGR,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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

  componentDidMount() {
    this.getSearchReviews(this.props.selectedSearchedPostNameDoc.$ownerId);
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
               <b>Selected Post</b>
               </h3>
               </Modal.Title>  */}

        {/* </Modal.Header> */}
        <Modal.Body>
          <div className="postModalCloseButton">
            <Modal.Title>{closeButtonColor}</Modal.Title>
          </div>

          <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
            <Badge bg="primary" style={{ marginRight: ".5rem" }}>
              {this.props.selectedSearchedPost.toMe} via{" "}
              {this.props.selectedSearchedPost.toMeVia}
            </Badge>
            <span>(You send)</span>
          </div>
          <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
            <Badge bg="primary" style={{ marginRight: ".5rem" }}>
              {this.props.selectedSearchedPost.toU} via{" "}
              {this.props.selectedSearchedPost.toUVia}
            </Badge>
            <span>(You receive)</span>
          </div>
          <p></p>
          <div className="cardTitle">
            <h4
              style={{ color: "#008de4" }}
              onClick={() =>
                this.handleNameClick(
                  this.props.selectedSearchedPostNameDoc.label
                )
              }
            >
              {this.props.selectedSearchedPostNameDoc.label}
            </h4>

            {/* <span onClick={() => this.handleNameClick()}>
    {this.props.tuple[0]}
  </span> */}
            <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>

            <span className="textsmaller">
              {this.formatDate(
                this.props.selectedSearchedPost.$updatedAt,
                today,
                yesterday
              )}
            </span>
          </div>
          <div>
            <h5 style={{ color: "#008de3" }}>
              <b>
                {this.handleFiatDisplay(this.props.selectedSearchedPost.exRate)}{" "}
                (Fiat/Dash)
              </b>
            </h5>
          </div>
          <p>toMeHandle and click to copy..</p>
          <p>Calculator</p>

          <p>
            Minimum (Fiat):{" "}
            {this.handleFiatDisplay(this.props.selectedSearchedPost.minAmt)}
          </p>
          <p>
            Maximum (Fiat):{" "}
            {this.handleFiatDisplay(this.props.selectedSearchedPost.maxAmt)}
          </p>

          <p style={{ whiteSpace: "pre-wrap" }}>
            {this.props.selectedSearchedPost.instruction}
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
            SearchedNameDoc={this.props.selectedSearchedPostNameDoc}
            isLoadingSearch={this.state.LoadingDGR}
          />

          {!this.state.LoadingDGR ? (
            <>
              <Reviews
                mode={this.props.mode} //Props
                SearchedReviews={this.state.SearchedReviews} // State
                SearchedReviewNames={this.state.SearchedReviewNames} //State
                SearchedReplies={this.state.SearchedReplies} //State
                SearchedNameDoc={this.props.selectedSearchedPostNameDoc} //Props
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
