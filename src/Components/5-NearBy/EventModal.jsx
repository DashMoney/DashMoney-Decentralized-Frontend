import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Spinner from "react-bootstrap/Spinner";

import Dash from "dash";

const {
  Essentials: { Buffer },
  PlatformProtocol: { Identifier },
} = Dash;

class EventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
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

  // componentDidMount() {

  // }

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

          <div className="locationTitle">
            <h5>
              <Badge bg="primary" style={{ marginRight: ".2rem" }}>
                {this.props.selectedSearchedPost.city}
              </Badge>
            </h5>

            <h5>
              <Badge bg="primary" style={{ marginRight: ".2rem" }}>
                {this.props.selectedSearchedPost.region}
              </Badge>
            </h5>

            <h5>
              <Badge bg="primary">
                {this.props.selectedSearchedPost.country}
              </Badge>
            </h5>
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
                this.props.selectedSearchedPost.$createdAt,
                today,
                yesterday
              )}
            </span>
          </div>

          <p style={{ whiteSpace: "pre-wrap" }}>
            {this.props.selectedSearchedPost.description}
          </p>

          {this.props.selectedSearchedPost.link !== undefined &&
          this.props.selectedSearchedPost.link !== "" ? (
            <>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={this.props.selectedSearchedPost.link}
              >
                <b>{this.props.selectedSearchedPost.link}</b>
              </a>
            </>
          ) : (
            <></>
          )}
          {/* <p></p>
          {this.props.selectedSearchedPost.category === "offbiz" ? (
            <>
              <h5>
                <b>Shop/Menu Items</b>
              </h5> */}
        </Modal.Body>
      </Modal>
    );
  }
}

export default EventModal;
