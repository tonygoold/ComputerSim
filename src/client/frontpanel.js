import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import InputSelector from './inputselector';
import InputSource from './inputsource';
import OperationToolbar from './operationtoolbar';

import Opcode from './opcode';
import { Op } from './computer';

export default class FrontPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    };
  }

  render() {
    let history = this.state.history.map((op, index) => (
      <Row key={`history-${index}`}><Col md="12">{op.toString()}</Col></Row>
    ));
    let onOperation = op => {
      this.props.onOperation(op);
      let newHistory = this.state.history.slice();
      newHistory.push(op);
      this.setState({ history: newHistory });
    };
    return (
      <div>
        <Row>
          <Col md="12"><strong>Front Panel</strong></Col>
        </Row>
        <Row className="mt-2">
          <Col md="12">
            <OperationToolbar onOperation={onOperation} />
          </Col>
        </Row>
        {history}
      </div>
    );
  }
}
