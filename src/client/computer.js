export const Events = {
  WillExecute: 'willexecute',
  DidExecute: 'didexecute',
  StackChanged: 'stackchanged',
  RegistersChanged: 'registerschanged',
  ExceptionThrown: 'exceptionthrown'
};

export class Op {
  constructor(opcode, args = null) {
    this.opcode = opcode;
    this.arguments = args || [];
  }

  toString() {
    let args = this.arguments.map(a => a.toString()).join(', ');
    return `${this.opcode} ${args}`;
  }
}

export class RegisterFile {
  constructor() {
    this.values = {};
    RegisterFile.names.forEach(name => this.values[name] = 0);
  }

  names() {
    return RegisterFile.names.slice();
  }

  get(register) {
    return register === 'zero' ? 0 : this.values[register];
  }

  set(register, val) {
    if (register !== 'zero' ) {
      this.values[register] = val;
    }
  }
}
RegisterFile.names = [
  'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8',
  'bp', 'sp', 'pc', 'zero'
];

export class InvalidInstruction extends Error {
  constructor(msg, op) {
    super(msg);
    this.op = op;
  }
}

export class EmptyStack extends Error {
  constructor(msg, op) {
    super(msg);
    this.op = op;
  }
}

export class ArithmeticError extends Error {
  constructor(msg, op) {
    super(msg);
    this.op = op;
  }
}

export class Computer {
  constructor() {
    this.registers = new RegisterFile();
    this.stack = [];
    this.observers = [];
  }

  on(eventName, callback) {
    this.observers.push({ event: eventName, fn: callback });
  }

  notify(eventName, event) {
    this.observers.forEach(observer => {
      if (observer.event === eventName) { observer.fn(event); }
    });
  }

  push(value) {
    this.stack.push(value);
    this.notify(Events.StackChanged, this.stack);
  }

  pop() {
    try {
      let val = this.stack.pop();
      this.notify(Events.StackChanged, this.stack);
      return val;
    } catch (ex) {
      throw new EmptyStack("empty stack");
    }
  }

  setRegister(register, value) {
    if (this.registers.names().indexOf(register) < 0) {
      throw new InvalidInstruction(`${register} is not a recognized register`);
    }
    this.registers.set(register, value);
    // This could be handled by an event listener on RegisterFile instead
    this.notify(Events.RegistersChanged, this.registers);
  }

  readInputSource(source) {
    switch (source.register) {
    case 'stack':
      return this.pop();
    case 'immediate':
      return source.immediateValue();
    default:
      return this.registers.get(source.register);
    }
  }

  writeOutputSource(source, value) {
    switch (source.register) {
    case 'stack':
      this.push(value);
      this.notify(Events.StackChanged, this.stack);
      break;
    default:
      this.registers.set(source.register, value);
      this.notify(Events.RegistersChanged, this.registers);
    }
  }

  apply(op) {
    this.notify(Events.WillExecute, op);

    try {
      switch (op.opcode) {
        case 'push': {
          let value = this.readInputSource(op.arguments[0]);
          this.push(value);
        }
        break;
      case 'pop':
        this.pop();
        break;
        case 'mov': {
          let value = this.readInputSource(op.arguments[1]);
          this.setRegister(op.arguments[0].register, value);
        }
        break;
      case 'sadd':
      case 'ssub':
      case 'smul':
      case 'sdiv':
        this.applyStackArithmetic(op);
        break;
      case 'add':
      case 'sub':
      case 'mul':
      case 'div':
        this.applyArithmetic(op);
        break;
      default:
        throw new InvalidInstruction("unrecognized instruction", op);
      }
    } catch (ex) {
      this.notify(Events.ExceptionThrown, ex);
      throw ex;
    } finally {
      this.notify(Events.DidExecute, op);
    }
  }
  
  applyStackArithmetic(op) {
    let v2 = this.pop();
    let v1 = this.pop();
    switch (op.opcode) {
    case 'sadd':
      this.push(v1 + v2);
      break;
    case 'ssub':
      this.push(v1 - v2);
      break;
    case 'smul':
      this.push(v1 * v2);
      break;
    case 'sdiv':
      if (v2 === 0) {
        throw new ArithmeticError("divide by zero", op);
      }
      this.push(v1 / v2);
      break;
    default:
      throw new InvalidInstruction("not an arithmetic instruction", op);
    }
  }
  
  applyArithmetic(op) {
    let v1 = this.readInputSource(op.arguments[1]);
    let v2 = this.readInputSource(op.arguments[2]);
    var result;
    switch (op.opcode) {
    case 'add':
      result = v1 + v2;
      break;
    case 'sub':
      result = v1 - v2;
      break;
    case 'mul':
      result = v1 * v2;
      break;
    case 'div':
      if (v2 === 0) {
        throw new ArithmeticError("divide by zero", op);
      }
      result = v1 / v2;
      break;
    default:
      throw new InvalidInstruction("not an arithmetic instruction", op);
    }
    this.writeOutputSource(op.arguments[0], result);
  }
}
