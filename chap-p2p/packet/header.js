const {hash256} = require('../../chap-bitcoin-crypto/hash')

const getChechsum = (payload) => hash256(payload).slice(0, 4)

const decodeCommand = (decoder) => {
  const buf = decoder.data(12)
  return buf.toString('ascii', 0, buf.findIndex(v => v === 0))
}

const decodeHeader = decoder => {
  const magic = decoder.uInt32()
  const command = decodeCommand(decoder)
  const payloadLength = decoder.uInt32()
  const checksum = decoder.data(4)
  return {
    magic,
    command,
    payloadLength,
    checksum
  }
}

const encodeHeader = (encoder, {magic, command, payload}) => {
  encoder.uInt32(magic)
  const buf = Buffer.alloc(12).fill(0)
  buf.write(command)
  encoder.data(buf)
  encoder.uInt32(payload.length)
  encoder.data(getChechsum(payload))
}

module.exports = {
  decodeHeader,
  encodeHeader
}
