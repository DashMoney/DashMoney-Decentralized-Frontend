import React from "react";
import Nav from "react-bootstrap/Nav";

class TabsOnPage extends React.Component {
  render() {
    return (
      <>
        <Nav
          fill
          variant="pills"
          defaultActiveKey={this.props.whichExchangeTab}
          onSelect={(eventKey) => this.props.handleExchangeTab(eventKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="Search">
              <b>Search</b>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Your Offers">
              <b>Your Offers</b>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </>
    );
  }
}

export default TabsOnPage;
