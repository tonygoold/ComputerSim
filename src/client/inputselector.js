import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { RegisterFile } from './computer';
import InputSource from './inputsource';

export default class InputSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let value = this.props.value || new InputSource('r1');
    let destination = this.props.destination || false;

    let onChangeRegister = event => {
      if (this.props.onChange) {
        let input = new InputSource(event.target.value, value.immediate);
        this.props.onChange(input);
      }
    };
    let onChangeImmediate = event => {
      if (this.props.onChange) {
        let input = new InputSource(value.register, event.target.value);
        this.props.onChange(input);
      }
    }


    let options = RegisterFile.names.map(name => (
      <option key={name} value={name}>{name}</option>
    ));
    options.push(<option key="stack" value="stack">stack</option>);
    if (!destination) {
      options.push(<option key="immediate" value="immediate">immediate</option>);
    }
    let dropdown = (
      <Col md="2" className="ms-2 me-2">
        <Form.Control
          as="select"
          value={value.register}
          onChange={onChangeRegister}>
          {options}
        </Form.Control>
      </Col>
    );
    if (value.register !== 'immediate') {
        return dropdown;
    }
    return (
      <>
        {dropdown}
        <Col md="2">
            <Form.Control
                type="number"
                value={value.immediate}
                onChange={onChangeImmediate}
                required={this.props.required}
            />
        </Col>
      </>
    );
  }
}
