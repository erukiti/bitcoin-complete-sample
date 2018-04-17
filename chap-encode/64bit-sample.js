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
  if ((buf.readUint32LE(4) & 0x80000000) === 0) {
    return readUInt64LE(buf)
  }

  return complement(buf.readUInt32LE(0)) + 1 - complement(buf.readUInt32LE(4)) * 2 ** 32
}

// --> 1fffffffffffff

// readInt64LE(Buffer.from('0000000000000000', 'hex'))
// readInt64LE(Buffer.from('0000000000000000', 'hex'))
console.log(readUInt64LE(Buffer.from('0000000000000000', 'hex'))) // 0
console.log(readUInt64LE(Buffer.from('001fffffffffffff', 'hex'))) // JSのnumberで表現できる最大値
console.log(readUInt64LE(Buffer.from('ffffffffffffffff', 'hex'))) // 2^64 (精度は落ちている)

// Number.MAX_SAFE_INTEGER.toString(16) --> 1fffffffffffff

console.log(readInt64LE(Buffer.from('0000000000000000', 'hex'))) // 0
console.log(readInt64LE(Buffer.from('001fffffffffffff', 'hex'))) // JSのnumberで表現できる最大値
console.log(readInt64LE(Buffer.from('ffffffffffffffff', 'hex'))) // 2^64 (精度は落ちている)
