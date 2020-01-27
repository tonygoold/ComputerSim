import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';

import FrontPanel from './frontpanel';
import RegisterList from './registerlist';
import Sidebar from './sidebar';
import StackMemory from './stackmemory';

import {
  Computer, Events as ComputerEvents, Opcode, Op
} from './computer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.computer = new Computer();
    this.state = {
      stack: this.computer.stack.slice(),
      registers: this.computer.registers
    };

    let stackChanged = this.stackChanged.bind(this);
    let registersChanged = this.registersChanged.bind(this);
    this.computer.on(ComputerEvents.StackChanged, stackChanged);
    this.computer.on(ComputerEvents.RegistersChanged, registersChanged);
  }

  render() {
    let navbar = makeNavbar();
    let onOperation = op => {
      try {
        this.computer.apply(op);
      } catch (ex) {
        console.log(ex);
      }
    }
    return (
      <>
        {navbar}
        <Container fluid style={{paddingTop: '4rem'}}>
          <Row>
            <Col md="8">
              <FrontPanel onOperation={onOperation} />
            </Col>
            <Col md="4">
              <RegisterList registers={this.state.registers} />
              <StackMemory stack={this.state.stack} />
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  stackChanged(stack) {
    this.setState({ stack: stack.slice() });
  }

  registersChanged(registers) {
    this.setState({ registers: registers });
  }
}

let makeNavbar = () => (
  <Navbar variant="dark" bg="dark" fixed="top">
    <Navbar.Brand href="#">
      Computer Simulator
    </Navbar.Brand>
  </Navbar>
);
