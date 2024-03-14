import React from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
//import Card from "react-bootstrap/Card";

import Navbar from "react-bootstrap/Navbar";

import Container from "react-bootstrap/Container";

import { IoMdArrowRoundBack } from "react-icons/io";

import "../../App.css";

import Dash from "dash";

//hideGroupPage IS  FUNCTION THAT i NEED TO PASS. but use hideIdentityControlPage

class IdentityControlPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedIdentity: false,
    };
  }

  hideModal = () => {
    this.setState({
      isModalShowing: false,
    });
  };

  showModal = (modalName) => {
    this.setState({
      presentModal: modalName,
      isModalShowing: true,
    });
  };

  componentDidMount() {}

  render() {
    return (
      <>
        <Navbar
          //className="sticky top-0"
          //style={{ paddingLeft: "2%", paddingRight: "2%", zIndex: 10 }}
          //style={{ position: "sticky", top: "0" }}
          bg={this.props.mode}
          variant={this.props.mode}
          fixed="top"
        >
          <Container>
            <Button
              variant="primary"
              onClick={() => this.props.hideIdentityControlPage()}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>

            <h3 style={{ textAlign: "center" }}>
              {this.props.mode === "primary" ? (
                <b className="lightMode">Identity Controls</b>
              ) : (
                <b>Identity Controls</b>
              )}
            </h3>
            {/* <Button
              variant="primary"
              onClick={() => this.showModal("ViewMembersModal")}
            >
              <b>Members</b>
            </Button> */}
          </Container>
        </Navbar>

        <div>
          {/* <div className="footer">{tuples}</div> */}
          <Alert variant="primary">
            <Alert.Heading>IdentityID</Alert.Heading>
            <p>{this.props.identity}</p>
            <Button
              variant="outline-primary"
              onClick={() => {
                navigator.clipboard.writeText(this.props.identity);
                this.setState({
                  copiedIdentity: true,
                });
              }}
            >
              <b>Copy</b>
            </Button>
            {this.state.copiedIdentity ? <span>Copied!</span> : <></>}
          </Alert>
          <p>
            Your identity ID can be used for setting up your own Decentralized
            Frontend. Or for future dapps that allow usage of separate,
            independent identities.
          </p>
          <p></p>
          <Alert variant="primary">
            <Alert.Heading>Disable/Break Identity</Alert.Heading>

            {/* <Button
              variant="outline-primary"
              onClick={() => {
                navigator.clipboard.writeText(this.props.identity);
                this.setState({
                  copiedIdentity: true,
                });
              }}
            >
              <b>Copy</b>
            </Button> */}
            <p>
              This will be where a user will be able to disable their Identity.
              This operation will render all Identity, Data Contracts, and
              Documents control unusable.
            </p>
          </Alert>
        </div>
      </>
    );
  }
}

export default IdentityControlPage;
