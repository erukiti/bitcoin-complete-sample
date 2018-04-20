const assert = require('assert')

const {hash256} = require('./hash')
const {base58Encode, base58Decode} = require('./base58')

const getChecksum = buf => {
  return hash256(buf).slice(0, 4)
}

const encodeBase58Check = buf => {
  return base58Encode(Buffer.concat([buf, getChecksum(buf)]))
}

const decodeBase58Check = base58String => {
  const buf = base58Decode(base58String)
  const payload = buf.slice(0, buf.length - 4)
  assert(getChecksum(payload).toString('hex') === buf.slice(-4).toString('hex'))
  return payload
}

module.exports = {
  encodeBase58Check,
  decodeBase58Check,
}
