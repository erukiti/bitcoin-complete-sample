const assert = require('assert')

class VM {
  constructor(bytecode = '', opt = {}) {
    this.stack = []
    this.altStack = []
    this._bytecode = Buffer.from(bytecode, 'hex')
    this._offset = 0
    this._isDebug = opt.isDebug
    this._op = Array(256)
    this._mnemonic = Array(256)
    this._stepCounter = 0
    if ('opTable' in opt) {
      opt.opTable.forEach(op => {
        assert(op.opCode >= 0x00 && op.opCode <= 0xff)
        this._op[op.opCode] = op.func
        assert(Array.isArray(op.mnemonic))
        if (op.mnemonic.length > 0) {
          this._mnemonic[op.opCode] = op.mnemonic.map(mnemonic => `OP_${mnemonic}`)
        }
      })
    }
  }

  addBytecode(bytecode) {
    this._bytecode = Buffer.concat([
      this._bytecode,
      Buffer.from(bytecode, 'hex'),
    ])
    console.log('addBytecode:', this._bytecode.toString('hex'))
  }

  register(opCode, mnemonic, func) {
    this._op[opCode] = func
  }

  step() {
    assert(this._bytecode.length > 0)
    const opCode = this._bytecode.readUInt8(this._offset++)
    if (!(opCode in this._op)) {
      throw new Error(`unknown OPCODE: ${opCode.toString(16)}`)
    }
    const addOffset = n => (this._offset += n)
    this._op[opCode]({
      buf: this._bytecode.slice(this._offset),
      stack: this.stack,
      altStack: this.altStack,
      addOffset,
    })

    if (this._isDebug) {
      console.log(
        `step${this._stepCounter}`,
        this._mnemonic[opCode] || '',
        opCode.toString(16).padStart(2, '0')
      )
      console.log('  stack: ', this.stack)
      console.log('  altStack: ', this.altStack)
    }
    this._stepCounter++
    return this._bytecode.length - this._offset
  }

  run() {
    while (this.step() > 0);
  }
}

module.exports = {
  VM,
}
