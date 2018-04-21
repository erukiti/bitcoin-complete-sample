const {decodeVarInt, encodeVarInt} = require('./var-int')

/**
 * @param {Buffer} buf
 * @param {number} offset
 */
const decodeVarBuffer = (buf, offset) => {
  const [len, bytes] = decodeVarInt(buf, offset)
  return [buf.slice(offset + bytes, offset + bytes + len), bytes + len]
}

/**
 * @param {Buffer} buf
 * @param {number} offset
 */
const decodeVarStr = (buf, offset) => {
  const [slicedBuf, bytes] = decodeVarBuffer(buf, offset)
  return [slicedBuf.toString('binary'), bytes]
}

/**
 * @param {Buffer} buf
 */
const encodeVarBuffer = buf => {
  return Buffer.concat([encodeVarInt(buf.length), buf])
}

/**
 * @param {string} s
 */
const encodeVarStr = s => {
  return encodeVarBuffer(Buffer.from(s, 'binary'))
}

module.exports = {decodeVarBuffer, decodeVarStr, encodeVarBuffer, encodeVarStr}
