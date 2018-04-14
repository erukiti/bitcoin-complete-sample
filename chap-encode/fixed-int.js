const decodeInt8 = (buf, offset) => [buf.readInt8(offset), 1]
const decodeUInt8 = (buf, offset) => [buf.readUInt8(offset), 1]
const decodeInt16 = (buf, offset) => [buf.readInt16LE(offset), 2]
const decodeUInt16 = (buf, offset) => [buf.readUInt16LE(offset), 2]
const decodeInt32 = (buf, offset) => [buf.readInt32LE(offset), 4]
const decodeUInt32 = (buf, offset) => [buf.readUInt32LE(offset), 4]
const decodeInt16BE = (buf, offset) => [buf.readInt16BE(offset), 2]
const decodeUInt16BE = (buf, offset) => [buf.readUInt16BE(offset), 2]
const decodeInt32BE = (buf, offset) => [buf.readInt32BE(offset), 4]
const decodeUInt32BE = (buf, offset) => [buf.readUInt32BE(offset), 4]

const decodeInt64 = (buf, offset) => {
  let n = buf.readUInt32LE(offset)
  n |= buf.readUInt32LE(offset + 4) << 32
  return [n, 8]
}
const decodeUInt64 = decodeInt64

const decodeInt64BE = (buf, offset) => {
  let n = buf.readUInt32BE(offset) << 32
  n |= buf.readUInt32bE(offset + 4)
  return [n, 8]
}
const decodeUInt64BE = decodeInt64BE

const encode = (size, func) => {
  const buf = Buffer.alloc(size)
  func(buf)
  return buf
}

const encodeInt8 = n => encode(1, buf => buf.writeInt8(n))
const encodeUInt8 = n => encode(1, buf => buf.writeUInt8(n))
const encodeInt16 = n => encode(2, buf => buf.writeInt16LE(n))
const encodeUInt16 = n => encode(2, buf => buf.writeUInt16LE(n))
const encodeInt32 = n => encode(4, buf => buf.writeInt32LE(n))
const encodeUInt32 = n => encode(4, buf => buf.writeUInt32LE(n))
const encodeInt16BE = n => encode(2, buf => buf.writeInt16BE(n))
const encodeUInt16BE = n => encode(2, buf => buf.writeUInt16BE(n))
const encodeInt32BE = n => encode(4, buf => buf.writeInt32BE(n))
const encodeUInt32BE = n => encode(4, buf => buf.writeUInt32BE(n))

const encodeInt64 = n => encode(8, buf => {
  buf.writeUInt32LE(n, 0)
  buf.writeUInt32LE(n / 2 ** 32 | 0, 4)
})
const encodeUInt64 = n => encode(8, buf => {
  buf.writeUInt32LE(n, 0)
  buf.writeUInt32LE(n / 2 ** 32 | 0, 4)
})
const encodeInt64BE = n => encode(8, buf => {
  buf.writeUInt32BE(n / 2 ** 32 | 0, 4)
  buf.writeUInt32BE(n, 0)
})
const encodeUInt64BE = n => encode(8, buf => {
  buf.writeUInt32BE(n / 2 ** 32 | 0, 4)
  buf.writeUInt32BE(n, 0)
})


module.exports = {
  decodeInt8, decodeInt16, decodeInt32, decodeInt64,
  decodeUInt8, decodeUInt16, decodeUInt32, decodeUInt64,
  decodeInt16BE, decodeInt32BE, decodeInt64BE,
  decodeUInt16BE, decodeUInt32BE, decodeUInt64BE,
  encodeInt8, encodeInt16, encodeInt32, encodeInt64, 
  encodeUInt8, encodeUInt16, encodeUInt32, encodeUInt64,
  encodeInt16BE, encodeInt32BE, encodeInt64BE, 
  encodeUInt16BE, encodeUInt32BE, encodeUInt64BE,
}
