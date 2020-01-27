export default class InputSource {
  constructor(register, immediate = '') {
    this.register = register;
    this.immediate = immediate;
  }

  valid() {
    if (this.register !== 'immediate') {
      return true;
    }
    return !Number.isNaN(this.immediateValue());
  }

  immediateValue() {
    return Number.parseFloat(this.immediate);
  }

  toString() {
    if (this.register === 'immediate') {
      return `imm(${this.immediateValue()})`;
    }
    return this.register;
  }
};
