const bufFromBinary = Buffer.from('\x00\xff', 'binary')
console.log(bufFromBinary.toString('hex'))
// --> "00ff"
