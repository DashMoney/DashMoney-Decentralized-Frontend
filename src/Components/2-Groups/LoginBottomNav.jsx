import React from "react";
//import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaPlus } from "react-icons/fa";
import { VscAdd } from "react-icons/vsc";
import { CgUserAdd } from "react-icons/cg";
import { MdRefresh } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
//GrAdd,
//CgUserAdd,
//MdRefresh,
//MdOutlineRefresh,

import "./LoginBottomNav.css";

class LoginBottomNav extends React.Component {
  render() {
    let buttonColor;
    if (this.props.mode === "dark") {
      buttonColor = "primary";
    } else {
      buttonColor = "secondary";
    }

    return (
      <>
        <Navbar
          className="bottomNav"
          bg={this.props.mode}
          variant={this.props.mode}
          fixed="bottom"
        >
          <Nav className="one-level-nav">
            {/* FaPlus, GrAdd, CgUserAdd, MdRefresh, MdOutlineRefresh */}

            <div className="icon-position">
              <FaPlus size={28} />
            </div>

            {/* <VscAdd /> */}
            <div className="icon-position">
              <MdRefresh size={34} />
            </div>
            <div className="icon-position">
              <CgUserAdd size={32} />
            </div>

            {/* <GrAdd size={32} /> */}
            {/* <GrAdd /> */}
            {/* <Nav.Item>
              <Nav.Link>
                <Button
                  variant={buttonColor}
                  onClick={() => {
                    this.props.showModal("LoginSignupModal");
                  }}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Connect Wallet</div>
                    <Badge bg="light" text="dark" pill>
                      Get Together
                    </Badge>
                  </div>
                </Button>
              </Nav.Link>
            </Nav.Item> */}
          </Nav>
          {/* </Navbar.Collapse> */}
        </Navbar>
      </>
    );
  }
}
export default LoginBottomNav;
