const assert = require('assert')

const registerOpBitwise = table => {
  table.push({
    opCode: 0x87,
    mnemonic: ['EQUAL'],
    func: ({stack}) => {
      assert(stack.length >= 2)
      const a = stack.pop()
      const b = stack.pop()
      stack.push(a === b ? 1 : 0)
    }
  })
  table.push({
    opCode: 0x88,
    mnemonic: ['EQUALVERIFY'],
    func: ({stack}) => {
      assert(stack.length >= 2)
      const a = stack.pop()
      const b = stack.pop()
      if (a !== b) {
        throw new Error('OP_EQUALVERIFY failed')
      }
    }
  })
}

module.exports = {
  registerOpBitwise
}
