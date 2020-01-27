# ComputerSim

A basic computer simulator web application using [React Bootstrap](https://react-bootstrap.github.io/) for the interface.

## Documentation

The computer model has 12 registers and a stack. The `zero` register always stores zero even though it can be used as a write destination. Despite their names, the `bp`, `sp`, and `pc` registers are no different from the general purpose `rN` registers.

Most operations can write their result to any register and take their inputs from any combination of registers, the stack, and immediate values. Stack inputs are taken by popping the stack and are populated in order from left to right.

The stack arithmetic operations read their inputs from the stack and push the result back onto the stack. One notable difference between stack arithmetic operations and regular arithmetic operations with stack inputs is that the stack arithmetic operations read their inputs from right to left. As a result, `push 5; push 3; ssub` will push `5 - 3` onto the stack, but `push 5; push 3; sub r1, stack, stack` will set `r1` to `3 - 5`.

## Usage

Requires Node and Yarn or Node Package Manager. Install dependencies with `yarn install` or `npm install`. Run locally with `yarn dev` or `npm run dev`.

