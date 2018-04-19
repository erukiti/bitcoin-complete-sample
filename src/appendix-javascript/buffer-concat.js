const bufFromString = Buffer.from('hoge')
const bufFromHex = Buffer.from('deadbeaf', 'hex')
const buf = Buffer.concat([bufFromString, bufFromHex])
console.log(buf.toString('hex'))
// --> "686f6765deadbeaf"
