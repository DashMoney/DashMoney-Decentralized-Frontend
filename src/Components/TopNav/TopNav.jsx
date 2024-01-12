import React from "react";
import DashIcon from "../../Images/white-d.svg";
import DashIconBlue from "../../Images/blue-d.svg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import NavLink from "react-bootstrap/NavLink";

import Badge from "react-bootstrap/Badge";

import Offcanvas from "react-bootstrap/Offcanvas";

import CloseButton from "react-bootstrap/CloseButton";

import NavSelects from "./NavSelects";
import CreditsOnPage from "../CreditsOnPage";

import "./TopNav.css";

class TopNav extends React.Component {
  handleCloseClick = () => {
    this.props.toggleTopNav();
  };

  render() {
    let offCanvasBkgd;
    let closeButtonColor;

    if (this.props.mode === "primary") {
      offCanvasBkgd = "text-bg-light";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      offCanvasBkgd = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    let isLoginComplete =
      this.props.uniqueName !== "" && this.props.uniqueName !== "no name";

    return (
      <>
        <Navbar
          expanded={this.props.expandedTopNav}
          className="Top"
          bg={this.props.mode}
          variant={this.props.mode}
          expand={false}
        >
          <Container>
            <Navbar.Brand>
              {this.props.mode === "primary" ? (
                <img
                  src={DashIcon}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Dash logo"
                />
              ) : (
                <img
                  src={DashIconBlue}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Dash logo"
                />
              )}
              {"   "}
              {this.props.mode === "primary" ? (
                <b className="lightMode">
                  {import.meta.env.VITE_FRONTEND_NAME}
                </b>
              ) : (
                <b>{import.meta.env.VITE_FRONTEND_NAME}</b>
              )}
            </Navbar.Brand>

            <div>
              <Form>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label=""
                  onChange={() => this.props.handleMode()}
                />
              </Form>
            </div>

            <Navbar.Toggle
              //This needs to just switch itself or toggle self
              onClick={() => this.props.toggleTopNav()}
              aria-controls="basic-navbar-nav"
            />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="start"
              className={offCanvasBkgd}
              onHide={this.props.toggleTopNav}
              style={{ width: "300px" }}
              //https://getbootstrap.com/docs/5.2/components/offcanvas/#variables
            >
              <Offcanvas.Header
                className="BottomBorder"
                style={{ paddingBottom: ".3rem" }}
              >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                  <h5 style={{ textAlign: "center" }}>
                    <Badge
                      variant="primary"
                      pill
                      onClick={() =>
                        this.props.showModal("FrontEndFeeExplaination")
                      }
                    >
                      <b>1.00% of TopUp</b>
                      {/* VITE_FEE_AMOUNT_AS_PERCENT_OF_A_TOPUP
              {import.meta.env.VITE_FRONTEND_NAME} */}
                    </Badge>
                  </h5>
                </Offcanvas.Title>
                {closeButtonColor}
              </Offcanvas.Header>

              <Offcanvas.Body>
                {this.props.isLoggedIn ? (
                  <>
                    {isLoginComplete ? (
                      <CreditsOnPage
                        identityInfo={this.props.identityInfo}
                        uniqueName={this.props.uniqueName}
                        showModal={this.props.showModal}
                      />
                    ) : (
                      <div
                        className="d-grid gap-2"
                        style={{ marginBottom: "1rem" }}
                      >
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={() => this.props.handleSelectedDapp("Login")}
                        >
                          <b>Complete Sign up</b>
                        </Button>
                      </div>
                    )}
                    {/* COMPLETE LOGIN BUTTON OR WALLET AND IDENTITY INFO */}
                  </>
                ) : (
                  <div
                    className="d-grid gap-2"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => this.props.handleSelectedDapp("Login")}
                    >
                      <b>Login/Sign up</b>
                    </Button>
                  </div>
                )}

                <Nav fill>
                  {/* <Nav.Link className="canvasLink" eventKey="link-1">
                    <h5>
                      <b>Messages</b>
                    </h5>
                  </Nav.Link> */}
                  <NavSelects
                    selection="Messages"
                    selectedDapp={this.props.selectedDapp}
                    handleSelectedDapp={this.props.handleSelectedDapp}
                  />

                  {isLoginComplete ? (
                    <NavSelects
                      selection="Groups"
                      selectedDapp={this.props.selectedDapp}
                      handleSelectedDapp={this.props.handleSelectedDapp}
                    />
                  ) : (
                    <Nav.Link className="canvasLinkDisabled" disabled>
                      <h5>
                        <b>Groups</b>
                      </h5>
                    </Nav.Link>
                  )}

                  <p></p>

                  {isLoginComplete ? (
                    <NavSelects
                      selection="Wallet"
                      selectedDapp={this.props.selectedDapp}
                      handleSelectedDapp={this.props.handleSelectedDapp}
                    />
                  ) : (
                    <Nav.Link className="canvasLinkDisabled" disabled>
                      <h5>
                        <b>Wallet</b>
                      </h5>
                    </Nav.Link>
                  )}

                  {isLoginComplete ? (
                    <NavSelects
                      selection="My Store"
                      selectedDapp={this.props.selectedDapp}
                      handleSelectedDapp={this.props.handleSelectedDapp}
                    />
                  ) : (
                    <Nav.Link className="canvasLinkDisabled" disabled>
                      <h5>
                        <b>My Store</b>
                      </h5>
                    </Nav.Link>
                  )}

                  <p></p>

                  <NavSelects
                    selection="Near By"
                    selectedDapp={this.props.selectedDapp}
                    handleSelectedDapp={this.props.handleSelectedDapp}
                  />

                  {isLoginComplete ? (
                    <NavSelects
                      selection="Shopping"
                      selectedDapp={this.props.selectedDapp}
                      handleSelectedDapp={this.props.handleSelectedDapp}
                    />
                  ) : (
                    <Nav.Link className="canvasLinkDisabled" disabled>
                      <h5>
                        <b>Shopping</b>
                      </h5>
                    </Nav.Link>
                  )}

                  <p></p>

                  <NavSelects
                    selection="Reviews"
                    selectedDapp={this.props.selectedDapp}
                    handleSelectedDapp={this.props.handleSelectedDapp}
                  />

                  <NavSelects
                    selection="Proof of Funds"
                    selectedDapp={this.props.selectedDapp}
                    handleSelectedDapp={this.props.handleSelectedDapp}
                  />
                  <p></p>
                  {isLoginComplete ? (
                    <div
                      className="d-grid gap-2"
                      style={{
                        marginTop: "1.5rem",
                        paddingLeft: "3rem",
                        paddingRight: "3rem",
                      }}
                    >
                      <Button
                        variant="primary"
                        //size="lg"
                        onClick={() => this.props.handleSelectedDapp("Login")}
                      >
                        <b>Your Account</b>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
    );
  }
}
export default TopNav;
