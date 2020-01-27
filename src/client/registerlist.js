import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';

export default class RegisterList extends Component {
  render() {
    let { registers } = this.props;

    let pairs = registers.names().map(register => {
      return (
        <>
          <td>{register}</td>
          <td>{registers.get(register)}</td>
        </>
      );
    });
    if ((pairs.length % 2) != 0) {
      pairs.push(<><td /><td /></>);
    }

    let rows = [];
    for (var i = 0; i < pairs.length; i += 2) {
      rows.push(<tr key={i}>{pairs[i]}{pairs[i+1]}</tr>);
    }

    return (
      <div>
        <div><strong>Registers</strong></div>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th className="w-25">Register</th>
              <th className="w-25">Value</th>
              <th className="w-25">Register</th>
              <th className="w-25">Value</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  }
}
