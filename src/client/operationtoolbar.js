import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import InputSelector from './inputselector';
import InputSource from './inputsource';
import Opcode from './opcode';
import { Op } from './computer';

export default class OperationToolbar extends Component {
  constructor(props) {
    super(props);

    let inputs = [];
    for (var i = 0; i < Opcode.maxOperands; i++) {
      inputs.push(new InputSource('r1'));
    }
    this.state = {
      opcode: Opcode.all[0],
      output: new InputSource('r1'),
      inputs: inputs
    };
  }

  render() {
    let { opcode, output, inputs } = this.state;

    var valid = opcode.implicitDestination || output.valid();
    valid = valid && inputs.reduce((acc, input) => acc && input.valid(), true);

    let options = Opcode.all.map(opcode => (
      <option key={opcode.id} value={opcode.id}>
        {opcode.name}
      </option>
    ));
    let onChangeOperation = event => {
      let op = Opcode.all.find(x => x.id === event.target.value);
      if (op) {
        this.setState({ opcode: op });
      } else {
        console.log(`Failed to find opcode with id ${event.target.value}`);
      }
    };

    let onChangeOutput = value => this.setState({ output: value });
    let onChangeInput = (index, value) => {
      let { inputs } = this.state;
      inputs[index] = value;
      this.setState({ inputs });
    };
    let onOperation = event => {
      event.preventDefault();
      event.stopPropagation();
      if (!valid || !this.props.onOperation) {
        return;
      }
      var operands;
      if (opcode.implicitDestination) {
        operands = inputs.slice(0, opcode.operands);
      } else {
        operands = [output].concat(inputs.slice(0, opcode.operands - 1));
      }
      this.props.onOperation(new Op(opcode.id, operands));
    };

    let selectors = [];
    var numInputs = opcode.operands;
    if (!opcode.implicitDestination) {
      numInputs--;
      selectors.push(
        <InputSelector
          key="output"
          destination
          value={output}
          onChange={onChangeOutput}
        />
      );
      selectors.push("\u2190");
    }
    for (var i = 0; i < numInputs; i++) {
      selectors.push(
        <InputSelector
          key={i}
          value={inputs[i]}
          onChange={onChangeInput.bind(this, i)}
        />
      );
    }
    return (
      <Form inline="true">
        <Row>
          <Col md="2" className="me-2">
            <Form.Control as="select" value={opcode.id} onChange={onChangeOperation}>
              {options}
            </Form.Control>
          </Col>
          {selectors}
          <Button
            className="col-md-1 ms-2"
            type="submit"
            disabled={!valid}
            onClick={onOperation}>
            Execute
          </Button>
        </Row>
      </Form>
    );
  }
}
