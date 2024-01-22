import React from "react";
//import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Badge from "react-bootstrap/Badge";

import CreateMessageButton from "./CreateMessageButton";
import SendInviteButton from "./SendInviteButton";
import LeaveGroupButton from "./LeaveGroupButton";

import "./BottomNav.css";
import { Button } from "react-bootstrap";

class GroupBottomNav extends React.Component {

  render() {

    return (
      <>
      <Navbar
        className="bottomNavFake"  bg={this.props.mode}
        variant={this.props.mode} 
        >
          <Nav  className="one-level-nav">
            <Button><div className="ms-2 me-auto">
            <div className="fw-bold">Fake it</div>
              <Badge bg="light" text="dark">
            Make it
            </Badge>
            </div></Button>
          </Nav>
        </Navbar>
        
        <Navbar
        
        className="bottomNav"  bg={this.props.mode}
        variant={this.props.mode} 
         fixed="bottom"
        >
          

          <Nav  className="one-level-nav">


<CreateMessageButton 
              Loading={this.props.Loading}
              mode={this.props.mode}
              showModal={this.props.showModal}
            />

            <SendInviteButton
            Loading={this.props.Loading}
            mode={this.props.mode}
            showModal={this.props.showModal} />

            <LeaveGroupButton 
            Loading={this.props.Loading}
            mode={this.props.mode}
            showDeleteModal={this.props.showDeleteModal}
            />
          

          </Nav>
          
         </Navbar>
      </>
    );
  }
}
export default GroupBottomNav;
