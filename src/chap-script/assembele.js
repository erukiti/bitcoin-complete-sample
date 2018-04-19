const assert = require('assert')

const table = {
  OP_DUP: 0x76,
  OP_HASH160: 0xa9,
  OP_CHECKSIG: 0xac,
  OP_EQUAL: 0x87,
  OP_EQUALVERIFY: 0x88,
}

/**
 *
 * @param {string[]} strings
 * @param {Buffer} values
 */
const asm = (strings, ...values) => {
  const result = []
  strings.forEach(str => {
    if (str.trim() !== '') {
      const opCodes = str
        .trim()
        .split(/\s+/)
        .map(mnemonic => {
          assert(mnemonic.substr(0, 3) === 'OP_')
          assert(mnemonic in table, `${mnemonic} is not found`)
          return table[mnemonic]
        })
      result.push(...opCodes)
    }

    if (values.length > 0) {
      const value = values.shift()
      assert(value.length > 0)
      if (value.length <= 0x4b) {
        result.push(value.length)
        result.push(...value)
      } else if (value.length <= 0xff) {
        result.push(0x76, value.length)
        result.push(...value)
      } else if (value.length <= 0xffff) {
        result.push(0x76, value.length & 0xff, value.length >> 8)
        result.push(...value)
      } else {
        throw new Error('too long')
      }
    }
  })

  const buf = Buffer.from(result)
  return buf
}

module.exports = {
  asm,
}
