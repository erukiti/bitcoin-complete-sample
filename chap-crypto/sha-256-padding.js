const getNZeroPadding = len => {
  return 64 + 8 - (len + 8) % 64 - 8 - 1
}

const getNChunks = len => {
  return (len + 8) / 64 + 1 | 0
}

const createUInt64BEBuffer = len => {
  const buf = Buffer.alloc(8)
  buf.writeUInt32BE(len / 2 ** 32 | 0, 0)
  buf.writeUInt32BE(len, 4)
  return buf
}

const paddingBuf = (buf) => {
  const nChunks = getNChunks(buf.length)
  const nZeroPadding = getNZeroPadding(buf.length)
  const padding = Buffer.from([0x80, ...Array(nZeroPadding).fill(0)])
  const lengthInfo = createUInt64BEBuffer(buf.length * 8)
  return Buffer.concat([buf, padding, lengthInfo])
}


module.exports = {
  getNZeroPadding,
  getNChunks,
  paddingBuf
}
