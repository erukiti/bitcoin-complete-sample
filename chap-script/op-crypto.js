const assert = require('assert')

const { ripemd160 } = require('../chap-crypto/ripemd-160')
const { sha256 } = require('../chap-crypto/sha-256')

const registerOpCrypto = table => {
  table[0xa6] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(ripemd160(stack.pop()))
    return 0
  }
  table[0xa7] = (buf, stack) => {
    assert(stack.length >= 1)
    assert(false)
    // FIXME SHA-1
    return 0
  }
  table[0xa8] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(sha256(stack.pop()))
    return 0
  }
  table[0xa9] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(ripemd160(sha256(stack.pop())))
    return 0
  }
  table[0xa8] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(sha256(sha256(stack.pop())))
    return 0
  }

  table[0xac] = (buf, stack) => {
    assert(stack.length >= 2)
    const pubKey = stack.pop()
    const sig = stack.pop()
    console.log(pubkey, sig)
    return 0
  }

  table[0xad] = (buf, stack) => {
    assert(stack.length >= 2)
    const pubKey = stack.pop()
    const sig = stack.pop()
    console.log(pubkey, sig)
    assert(false)
    return 0
  }

}

module.exports = {
  registerOpCrypto
}
