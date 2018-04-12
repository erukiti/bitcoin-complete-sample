const { encodeVarInt } = require('../chap-encode/var-int')
const { encodeUInt32 } = require('../chap-encode/fixed-int')

const encodeTransaction = (txins, txouts, locktime = 0) => {
  const buffers = []

  buffers.push(Buffer.from('010000', 'hex')) // version
  buffers.push(encodeVarInt(txins.length))
  txins.forEach(txin => {
    buffers.push(Buffer.from(txin.id, 'binary'))
    buffers.push(encodeUInt32(txin.index))
    buffers.push(encodeVarInt(txin.script.length))
    buffers.push(Buffer.from(txin.script, 'binary'))
    buffers.push(encodeUInt32(txin.sequence)) // 現状では0xffffffff 固定
  })
  buffers.push(encodeVarInt(txouts.length))
  txouts.forEach(txout => {
    // buffers.push() value 64bit
    buffers.push(encodeVarInt(txout.script.length))
    buffers.push(Buffer.from(txout.script, 'binary'))
  })
  buffers.push(encodeUInt32(locktime))

  return Buffer.concat(buffers)
}

module.exports = {
  encodeTransaction
}
