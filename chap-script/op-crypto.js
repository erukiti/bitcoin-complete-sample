const assert = require('assert')

const { ripemd160 } = require('../chap-crypto/ripemd-160')
const { sha256 } = require('../chap-crypto/sha-256')

const registerOpCrypto = table => {
  table.push({
    opCode: 0xa6,
    mnemonic: ['RIPEMD160'],
    func: ({stack}) => {
      assert(stack.length >= 1)
      stack.push(ripemd160(stack.pop()))
    }
  })
  table.push({
    opCode: 0xa7,
    mnemonic: ['SHA1']
  })

  table.push({
    opCode: 0xa8,
    mnemonic: ['SHA256'],
    func: ({stack}) => {
      assert(stack.length >= 1)
      stack.push(sha256(stack.pop()))
    }
  })
  table.push({
    opCode: 0xa9,
    mnemonic: ['HASH160'],
    func: ({stack}) => {
      assert(stack.length >= 1)
      stack.push(ripemd160(sha256(stack.pop())))
    }
  })
  table.push({
    opCode: 0xaa,
    mnemonic: ['HASH256'],
    func: ({stack}) => {
      assert(stack.length >= 1)
      stack.push(sha256(sha256(stack.pop())))
    }
  })
  table.push({
    opCode: 0xac,
    mnemonic: ['CHECKSIG'],
    func: ({stack}) => console.log(stack)
  })

  table.push({
    opCode: 0xad,
    mnemonic: ['CHECKSIG'],
    func: ({stack}) => console.log(stack)
  })
}

module.exports = {
  registerOpCrypto
}
