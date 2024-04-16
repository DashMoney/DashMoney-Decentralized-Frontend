import React from "react";
import Nav from "react-bootstrap/Nav";

class TabsOnPage extends React.Component {
  render() {
    return (
      <>
        <Nav
          fill
          variant="pills"
          defaultActiveKey={this.props.whichDrivesTab}
          onSelect={(eventKey) => this.props.handleDrivesTab(eventKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="Search">
              <b>Search</b>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Your Drives">
              <b>Your Drives</b>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </>
    );
  }
}

export default TabsOnPage;
