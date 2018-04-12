const newBuf = Buffer.alloc(12) // 12byteのバッファを確保する
newBuf.writeInt32LE(1701277544, 0)
newBuf.writeUInt32BE(0xdeadbeaf, 4)
newBuf.writeInt8(0, 8)
newBuf.writeInt8(1, 9)
newBuf.writeInt8(2, 10)
newBuf.writeInt8(3, 11)

console.log(newBuf.toString('hex'))
// "686f6765deadbeaf00010203"
