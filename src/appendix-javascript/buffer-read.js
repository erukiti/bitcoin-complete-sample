const buf = Buffer.from('hoge')
console.log(buf.readInt8(0))
console.log(buf.readInt8(0).toString(16))
// --> 104 (10進数)
// --> 68  (16進数)

console.log(buf.readInt8(2))
console.log(buf.readInt8(2).toString(16))
// --> 103 (10進数)
// --> 67  (16進数)

console.log(buf.readInt32LE(0)) // read signed int 32 little endian
console.log(buf.readInt32LE(0).toString(16))
// --> 1701277544 (10進数)
// --> 65676f68   (16進数)
