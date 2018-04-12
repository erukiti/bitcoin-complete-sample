const assert = require('assert')

class VM {
  constructor(bytecode = '', opt = {}) {
    this.stack = []
    this.altStack = []
    this._bytecode = Buffer.from(bytecode, 'hex')
    this._offset = 0
    this._isDebug = opt.isDebug
    this._op = opt.opTable || Array(256)
    this._stepCounter = 0
  }

  addBytecode(bytecode) {
    this._bytecode = Buffer.concat([this._bytecode, Buffer.from(bytecode, 'hex')])
    console.log('addBytecode:', this._bytecode.toString('hex'))
  }

  register(opCode, mnemonic, func) {
    this._op[opCode] = func
  }

  step() {
    assert(this._bytecode.length > 0)
    const opCode = this._bytecode.readUInt8(this._offset++)
    if (!(opCode in this._bytecode)) {
      throw new Error(`unknown OPCODE: ${opCode.toString(16)}`)
    }
    this._offset += this._op[opCode](this._bytecode.slice(this._offset), this.stack, this.altStack)

    if (this._isDebug) {
      console.log(`step${this._stepCounter}: ${opCode.toString(16).padStart(2, '0')}`)
      console.log('  stack: ', this.stack)
      console.log('  altStack: ', this.altStack)
    }
    this._stepCounter++
    return this._bytecode.length - this._offset
  }

  run() {
    while (this.step() > 0) ;
  }
}

module.exports = {
  VM
}
