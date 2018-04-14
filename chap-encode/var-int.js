const decodeVarInt = (buf, offset = 0) => {
  const firstByte = buf.readUInt8(offset)
  switch (firstByte) {
    case 0xfd: return [buf.readUInt16LE(offset + 1), 3]
    case 0xfe: return [buf.readUInt32LE(offset + 1), 5]
    case 0xff: //FIXME
      return [buf.readUInt32LE(offset + 1), 9]
    default:
      return [firstByte, 1]
  }
}

const encodeVarInt = n => {
  let buf
  if (n <= 0xfc) {
    buf = Buffer.alloc(1)
    buf.writeUInt8(n)
  } else if (n <= 0xffff) {
    buf = Buffer.alloc(3)
    buf.writeUInt8(0xfd)
    buf.writeUInt16LE(n, 1)
  } else if (n <= 0xffffffff) {
    buf = Buffer.alloc(5)
    buf.writeUInt8(0xfe)
    buf.writeUInt32LE(n, 1)
  }
  return buf
}

module.exports = { decodeVarInt, encodeVarInt }
