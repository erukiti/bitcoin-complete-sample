const { decodeVarInt, encodeVarInt } = require('./var-int')

const decodeVarStr = (buf, offset = 0) => {
  const [len, bytes] = decodeVarInt(buf, offset)
  return [buf.toString('binary', offset + bytes, offset + bytes + len), bytes + len]
}

const encodeVarStr = s => {
  return Buffer.concat([encodeVarInt(s.length), Buffer.from(s)])
}

module.exports = { decodeVarStr, encodeVarStr }
