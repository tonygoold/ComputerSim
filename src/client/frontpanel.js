import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import OperationToolbar from './operationtoolbar';

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
