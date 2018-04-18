const assert = require('assert')

const {splitBytecode} = require('./split-bytecode')


const createLookup = () => {
  const table = []

  const lookup = Array(256).fill('UNKNOWN-OPCODE')
  table.forEach(entry => {
    assert(lookup[entry.opCode] === 'UNKNOWN-OPCODE')
    assert(Array.isArray(entry.mnemonic))
    if (entry.mnemonic.length > 0) {
      lookup[entry.opCode] = entry.mnemonic[0]
    } else {
      lookup[entry.opCode] = 'N/A'
    }
  })
  return lookup
}

const lookup = createLookup()

const disassebleOpCode = number => {
  assert(number >= 0 && number <= 0xff)
  return `OP_${lookup[number]}`
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
