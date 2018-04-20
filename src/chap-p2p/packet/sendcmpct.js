const assert = require('assert')

const decodeSendcmpct = decoder => {
  const bool = decoder.uInt8()
  const num = decoder.uInt64LE()
  return {bool, num}
}

module.exports = {
  decodeSendcmpct
}