const bufFromString = Buffer.from('hoge')
console.log(bufFromString.toString('hex'))
// --> "686f6765"

const bufFromHex = Buffer.from('deadbeaf', 'hex')
console.log(bufFromHex.toString('hex'))
// --> "afbeadde"

const bufFromBinary = Buffer.from('\x00\xff', 'binary')
console.log(bufFromBinary.toString('hex'))
// --> "00ff"

const bufFromArray = Buffer.from([0, 1, 2, 3])
console.log(bufFromArray.toString('hex'))
// --> "00010203"

const buf = Buffer.concat([bufFromString, bufFromHex, bufFromBinary, bufFromArray])

console.log(buf.toString('hex'))
// --> "686f6765deadbeaf00ff00010203"

console.log(buf.readInt8(0))
// --> 104 (0x68)

console.log(buf.readInt32LE(0)) // read signed int 32 little endian
// --> 1701277544 (0x65676f68)

const newBuf = Buffer.alloc(12) // 12byteのバッファ
newBuf.writeInt32LE(1701277544, 0)
newBuf.writeUInt32LE(0xafbeadde, 4)
newBuf.writeInt8(0, 8)
newBuf.writeInt8(1, 9)
newBuf.writeInt8(2, 10)
newBuf.writeInt8(3, 11)

console.log(newBuf.toString('hex'))
// "686f6765deadbeaf00010203"
