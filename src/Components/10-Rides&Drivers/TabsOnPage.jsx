import React from "react";
import Nav from "react-bootstrap/Nav";

class TabsOnPage extends React.Component {
  render() {
    return (
      <>
        <Nav
          fill
          variant="pills"
          defaultActiveKey={this.props.whichDriversTab}
          onSelect={(eventKey) => this.props.handleDriversTab(eventKey)}
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
