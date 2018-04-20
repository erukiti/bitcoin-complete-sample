const decodeInt8 = (buf, offset) => [buf.readInt8(offset), 1]
const decodeUInt8 = (buf, offset) => [buf.readUInt8(offset), 1]
const decodeInt16LE = (buf, offset) => [buf.readInt16LE(offset), 2]
const decodeUInt16LE = (buf, offset) => [buf.readUInt16LE(offset), 2]
const decodeInt32LE = (buf, offset) => [buf.readInt32LE(offset), 4]
const decodeUInt32LE = (buf, offset) => [buf.readUInt32LE(offset), 4]
const decodeInt16BE = (buf, offset) => [buf.readInt16BE(offset), 2]
const decodeUInt16BE = (buf, offset) => [buf.readUInt16BE(offset), 2]
const decodeInt32BE = (buf, offset) => [buf.readInt32BE(offset), 4]
const decodeUInt32BE = (buf, offset) => [buf.readUInt32BE(offset), 4]
const decodeUInt64LE = (buf, offset) => {
  return [buf.readUInt32LE(0) + buf.readUInt32LE(4) * 2 ** 32, 8]
}
const decodeUInt64BE = (buf, offset) => {
  return [buf.readUInt32BE(0) * 2 ** 32 + buf.readUInt32BE(4), 8]
}

const encode = (size, func) => {
  const buf = Buffer.alloc(size)
  func(buf)
  return buf
}

const encodeInt8 = n => encode(1, buf => buf.writeInt8(n))
const encodeUInt8 = n => encode(1, buf => buf.writeUInt8(n))
const encodeInt16LE = n => encode(2, buf => buf.writeInt16LE(n))
const encodeUInt16LE = n => encode(2, buf => buf.writeUInt16LE(n))
const encodeInt32LE = n => encode(4, buf => buf.writeInt32LE(n))
const encodeUInt32LE = n => encode(4, buf => buf.writeUInt32LE(n))
const encodeInt16BE = n => encode(2, buf => buf.writeInt16BE(n))
const encodeUInt16BE = n => encode(2, buf => buf.writeUInt16BE(n))
const encodeInt32BE = n => encode(4, buf => buf.writeInt32BE(n))
const encodeUInt32BE = n => encode(4, buf => buf.writeUInt32BE(n))
const encodeUInt64LE = n => encode(8, buf => {
  buf.writeUInt32LE(n % 2 ** 32, 0)
  buf.writeUInt32LE(n / 2 ** 32, 4)
})

module.exports = {
  decodeInt8, decodeInt16LE, decodeInt32LE, // decodeInt64,
  decodeUInt8, decodeUInt16LE, decodeUInt32LE, decodeUInt64LE,
  decodeInt16BE, decodeInt32BE, // decodeInt64BE,
  decodeUInt16BE, decodeUInt32BE, decodeUInt64BE,
  encodeInt8, encodeInt16LE, encodeInt32LE, // encodeInt64, 
  encodeUInt8, encodeUInt16LE, encodeUInt32LE, encodeUInt64LE,
  encodeInt16BE, encodeInt32BE, // encodeInt64BE, 
  encodeUInt16BE, encodeUInt32BE, // encodeUInt64BE,
}
