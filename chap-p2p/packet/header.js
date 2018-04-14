const {sha256} = require('../../chap-crypto/sha-256')

const getChechsum = (payload) => Buffer.from(sha256(Buffer.from(sha256(payload), 'hex')).slice(0, 8), 'hex')

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
  encoder.data(Buffer.from(getChechsum(payload), 'ascii'))
}

module.exports = {
  decodeHeader,
  encodeHeader
}
