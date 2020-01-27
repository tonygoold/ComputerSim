import React, { Component } from 'react';

import Nav from 'react-bootstrap/Nav';

export default class Sidebar extends Component {
  render() {
    return (
      <Nav>
        <Nav.Item>This is the sidebar.</Nav.Item>
        <Nav.Item>It serves no purpose.</Nav.Item>
      </Nav>
    );
  }
}
