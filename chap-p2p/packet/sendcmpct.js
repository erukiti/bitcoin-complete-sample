const assert = require('assert')

const {PacketDecoder} = require('../../chap-encode/packet-decoder')
const {PacketEncoder} = require('../../chap-encode/packet-encoder')

const decodeSendcmpct = buf => {
  assert(buf instanceof Buffer)
  const decoder = new PacketDecoder(buf)
  const bool = decoder.uInt8()
  const num = decoder.uInt64()
  return {bool, num}
}

module.exports = {
  decodeSendcmpct
}