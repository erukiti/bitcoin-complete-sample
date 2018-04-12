const assert = require('assert')

const registerOpConstant = table => {
  const immFunc = imm => (buf, stack) => {
    stack.push(imm)
    return 0
  }
  table[0x00] = immFunc(0)
  table[0x4f] = immFunc(-1)
  for (let i = 0x51; i <= 0x60; i++) {
    table[i] = immFunc(i - 0x50)
  }
  
  const pushData = (buf, stack, len) => {
    assert(buf instanceof Buffer)
    assert(buf.length >= len)
    stack.push(buf.toString('hex', 0, len))
  }
  
  for (let i = 0x01; i <= 0x4b; i++) {
    table[i] = (buf, stack) => {
      pushData(buf, stack, i)
      return i
    }
  }
  
  table[0x4c] = (buf, stack) => {
    const len = buf.readUInt8(0)
    pushData(buf.slice(1), stack, len)
    return 1 + len
  }
  
  table[0x4d] = (buf, stack) => {
    const len = buf.readUInt16LE(0)
    pushData(buf.slice(2), stack, len)
    return 2 + len
  }
  
  table[0x4e] = (buf, stack) => {
    const len = buf.readUInt32LE(0)
    pushData(buf.slice(4), stack, len)
    return 4 + len
  }
}

module.exports = {
  registerOpConstant
}
