const assert = require('assert')

const {splitBytecode} = require('./split-bytecode')

const table = [
  {opCode: 0x76, mnemonic: ['OP_DUP']},
  {opCode: 0xa9, mnemonic: ['HASH160']},
  {opCode: 0xac, mnemonic: ['CHECKSIG']},
  {opCode: 0x87, mnemonic: ['EQUAL']}
]

const lookup = Array(256).fill('UNKNOWN_OPCODE')
table.forEach(entry => {
  assert(lookup[entry.opCode] === 'UNKNOWN_OPCODE')
  assert(Array.isArray(entry.mnemonic))
  if (entry.mnemonic.length > 0) {
    lookup[entry.opCode] = `OP_${entry.mnemonic[0]}`
  } else {
    lookup[entry.opCode] = 'N/A'
  }
})

const disassebleOpCode = number => {
  assert(number >= 0 && number <= 0xff)
  if (lookup[number] === 'UNKNOWN_OPCODE') {
    console.error('Unknown OpCode:', number.toString(16))
  }
  return lookup[number]
}

const disassebleBytecode = buf => {
  const result = []
  splitBytecode(buf).forEach(chunk => {
    if (typeof chunk === 'number') {
      result.push(disassebleOpCode(chunk))
    } else {
      assert(chunk instanceof Buffer)
      result.push(chunk.toString('hex'))
    }
  })
  return result.join(' ')
}

module.exports = {
  disassebleOpCode,
  disassebleBytecode
}
