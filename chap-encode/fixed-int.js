const decodeInt8 = (buf, offset) => [buf.readInt8(offset), 1]
const decodeUInt8 = (buf, offset) => [buf.readUInt8(offset), 1]
const decodeInt16 = (buf, offset) => [buf.readInt16LE(offset), 2]
const decodeUInt16 = (buf, offset) => [buf.readUInt16LE(offset), 2]
const decodeInt32 = (buf, offset) => [buf.readInt32LE(offset), 4]
const decodeUInt32 = (buf, offset) => [buf.readUInt32LE(offset), 4]

const encode = (size, func) => {
  const buf = new Buffer(size)
  func(buf)
  return buf
}

const encodeInt8 = n => encode(1, buf => buf.writeInt8(n))
const encodeUInt8 = n => encode(1, buf => buf.writeUInt8(n))
const encodeInt16 = n => encode(2, buf => buf.writeInt16LE(n))
const encodeUInt16 = n => encode(2, buf => buf.writeUInt16LE(n))
const encodeInt32 = n => encode(4, buf => buf.writeInt32LE(n))
const encodeUInt32 = n => encode(4, buf => buf.writeUInt32LE(n))

module.exports = {
  decodeInt8, decodeInt16, decodeInt32,
  decodeUInt8, decodeUInt16, decodeUInt32,
  encodeInt8, encodeInt16, encodeInt32,
  encodeUInt8, encodeUInt16, encodeUInt32,
}
