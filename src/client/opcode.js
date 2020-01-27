export default class Opcode {
  constructor(id, name, operands, implicitDestination = false) {
    this.id = id;
    this.name = name;
    this.operands = operands;
    this.implicitDestination = implicitDestination;
  }
};

Opcode.all = [
  new Opcode('pop', 'Pop', 0, true),
  new Opcode('push', 'Push', 1, true),
  new Opcode('sadd', 'Stack Add', 0, true),
  new Opcode('ssub', 'Stack Subtract', 0, true),
  new Opcode('smul', 'Stack Multiply', 0, true),
  new Opcode('sdiv', 'Stack Divide', 0, true),
  new Opcode('mov', 'Move', 2),
  new Opcode('cmp', 'Compare', 3),
  new Opcode('not', 'Bitwise NOT', 2),
  new Opcode('and', 'Bitwise AND', 3),
  new Opcode('or', 'Bitwise OR', 3),
  new Opcode('xor', 'Bitwise XOR', 3),
  new Opcode('add', 'Add', 3),
  new Opcode('sub', 'Subtract', 3),
  new Opcode('mul', 'Multiply', 3),
  new Opcode('div', 'Divide', 3),
];

Opcode.maxOperands = 3;
