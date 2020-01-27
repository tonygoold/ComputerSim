import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';

export default class StackMemory extends Component {
  render() {
    let rows = [];
    let len = this.props.stack.length;
    for (var i = 0; i < this.props.stack.length; i++) {
      rows.push(
        <tr key={i+1}>
          <td>{i+1}</td>
          <td>{this.props.stack[len-i-1]}</td>
        </tr>
      );
    }
    return (
      <div>
        <div><strong>Stack</strong></div>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th className="w-25">Index</th>
              <th className="w-75">Value</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  }
}
