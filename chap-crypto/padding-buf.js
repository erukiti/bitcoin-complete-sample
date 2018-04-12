const createUIn64BEBuffer = n => {
  const buf = Buffer.alloc(8)
  buf.writeUInt32BE(n / 2 ** 32 | 0, 0)
  buf.writeUInt32BE(n, 4)
  return buf
}

const paddingBuf = (buf) => {
  const nChunks = (buf.length + 8) / 64 + 1 | 0
  const nZeroPadding = nChunks * 64 - buf.length - 8 - 1
  const padding = Buffer.from([0x80, ...Array(nZeroPadding).fill(0)])
  const lengthInfo = createUIn64BEBuffer(buf.length * 8)
  return Buffer.concat([buf, padding, lengthInfo])
}

console.log(paddingBuf(Buffer.from('')).toString('hex'))
// --> 80000...0000
console.log(paddingBuf(Buffer.from('hoge', 'ascii')).toString('hex'))
// --> 686f67658000...0020
console.log(paddingBuf(Buffer.from('*'.repeat(55), 'ascii')).toString('hex'))
// --> 2a2a...8000...0001b8
console.log(paddingBuf(Buffer.from('*'.repeat(56), 'ascii')).toString('hex'))
// --> 2a2a...8000...0001c0
console.log(paddingBuf(Buffer.from('*'.repeat(119), 'ascii')).toString('hex'))
// --> 2a2a...8000...0003b8
console.log(paddingBuf(Buffer.from('*'.repeat(120), 'ascii')).toString('hex'))
// --> 2a2a...8000...0003c0
