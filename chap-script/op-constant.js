const assert = require('assert')

const registerOpConstant = table => {
  const immFunc = imm => ({stack}) => {
    stack.push(imm)
  }
  table.push({
    opCode: 0x00,
    mnemonic: ['OP_0', 'OP_FALSE'],
    func: immFunc(0)
  })
  table.push({
    opCode: 0x4f,
    mnemonic: ['OP_1NEGATE'],
    func: immFunc(-1)
  })

  table.push({
    opCode: 0x51,
    mnemonic: ['OP_1', 'OP_TRUE'],
    func: immFunc(1)
  })

  for (let i = 0x52; i <= 0x60; i++) {
    table.push({
      opCode: i,
      mnemonic: [`OP_${i - 0x50}`],
      func: immFunc(i - 0x50)
    })
  }
  
  const pushData = len => ({buf, stack, addOffset}) => {
    assert(buf.length >= len)
    stack.push(buf.toString('hex', 0, len))
    addOffset(len)
  }

  for (let i = 0x01; i <= 0x4b; i++) {
    table.push({
      opCode: i,
      mnemonic: [],
      func: pushData(i)
    })
  }
  
  table.push({
    opCode: 0x4c,
    mnemonic: ['OP_PUSHDATA1'],
    func: ({buf, stack, addOffset}) => {
      const len = buf.readUInt8(0)
      pushData(len)({buf: buf.slice(1), stack})
      addOffset(len + 1)
    }
  })
  table.push({
    opCode: 0x4d,
    mnemonic: ['OP_PUSHDATA2'],
    func: ({buf, stack, addOffset}) => {
      const len = buf.readUInt16LE(0)
      pushData(len)({buf: buf.slice(2), stack})
      addOffset(len + 2)
    }
  })
  table.push({
    opCode: 0x4e,
    mnemonic: ['OP_PUSHDATA4'],
    func: ({buf, stack, addOffset}) => {
      const len = buf.readUInt32LE(0)
      pushData(len)({buf: buf.slice(4), stack})
      addOffset(len + 4)
    }
  })
}

module.exports = {
  registerOpConstant
}
