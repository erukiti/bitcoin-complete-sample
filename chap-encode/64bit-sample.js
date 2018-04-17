const readUInt64LE = buf => {
  return buf.readUInt32LE(0) + buf.readUInt32LE(4) * 2 ** 32
}

const complement = n => {
  n = ~n
  if (n < 0) {
    n = (n & 0x7fffffff) + 0x80000000
  }
  return n
}

const readInt64LE = buf => {
  if ((buf.readUInt32LE(4) & 0x80000000) === 0) {
    return readUInt64LE(buf)
  }

  return -(complement(buf.readUInt32LE(0)) + complement(buf.readUInt32LE(4)) * 2 ** 32 + 1)
}

console.log('#unsigned')
console.log(readUInt64LE(Buffer.from('ffffffffffff1f00', 'hex'))) // JSのnumberで安全に表現できる最大値
console.log(Number.MAX_SAFE_INTEGER, 'MAX_SAFE_INTEGER')
console.log(readUInt64LE(Buffer.from('ffffffffffffffff', 'hex'))) // 2^64 (精度は落ちている)
console.log()
console.log('#signed')
console.log(readInt64LE(Buffer.from('ffffffffffff1f00', 'hex'))) // JSのnumberで安全に表現できる最大値
console.log(readInt64LE(Buffer.from('ffffffffffffffff', 'hex'))) // -1
console.log(readInt64LE(Buffer.from('010000000000e0ff', 'hex'))) // JSのnumberで安全に表現できる最小値
console.log(Number.MIN_SAFE_INTEGER, 'MIN_SAFE_INTEGER')
