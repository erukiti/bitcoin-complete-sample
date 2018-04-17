const { encodeVarInt } = require('../chap-encode/var-int')
const { encodeUInt32LE } = require('../chap-encode/fixed-int')

const encodeTransaction = (txins, txouts, opts = {}) => {
  const version = opts.version || 1
  const locktime = opts.locktime || 0
  const buffers = []

  buffers.push(encodeUInt32LE(version))
  buffers.push(encodeVarInt(txins.length))
  txins.forEach(txin => {
    const hash = Buffer.from(txin.hash, 'hex').reverse()
    const script = Buffer.from(txin.script, 'hex')
    buffers.push(hash)
    buffers.push(encodeUInt32LE(txin.index))
    buffers.push(encodeVarInt(script.length))
    buffers.push(script)
    buffers.push(encodeUInt32LE(txin.sequence))
  })
  buffers.push(encodeVarInt(txouts.length))
  txouts.forEach(txout => {
    const script = Buffer.from(txout.script, 'hex')
    // buffers.push() value 64bit
    buffers.push(Buffer.from(txout.value, 'hex'))
    buffers.push(encodeVarInt(script.length))
    buffers.push(script)
  })
  buffers.push(encodeUInt32LE(locktime))

  return Buffer.concat(buffers)
}

module.exports = {
  encodeTransaction
}
