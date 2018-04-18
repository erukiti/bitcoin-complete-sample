const assert = require('assert')

const { PacketDecoder } = require('../chap-encode/packet-decoder')

const decodeTransaction = buf => {
  assert(buf instanceof Buffer)
  const decoder = new PacketDecoder(buf)
  const tx = {}

  tx.version = decoder.int32LE()
  let nTxIns = decoder.varInt()
  const isSegWit = nTxIns === 0

  if (isSegWit) {
    const flag = decoder.int8()
    assert(flag !== 0)
    nTxIns = decoder.varInt()
  }
  tx.txIns = []
  for (let i = 0; i < nTxIns; i++) {
    const txIn = {}
    txIn.hash = decoder.data(32).reverse().toString('hex')
    txIn.index = decoder.uInt32LE()
    const scriptLength = decoder.varInt()
    txIn.script = decoder.data(scriptLength).toString('hex')
    txIn.sequence = decoder.uInt32LE()
    tx.txIns.push(txIn)
  }
  const nTxOuts = decoder.varInt()
  tx.txOuts = []
  for (let i = 0; i < nTxOuts; i++) {
    const txOut = {}
    txOut.value = decoder.data(8).toString('hex')
    const scriptLength = decoder.varInt()
    txOut.script = decoder.data(scriptLength).toString('hex')
    tx.txOuts.push(txOut)
  }
  if (isSegWit) {
    // FIXME witness
  }
  tx.locktime = decoder.uInt32LE()
  return tx
}

module.exports = {
  decodeTransaction
}
