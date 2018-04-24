const assert = require('assert')

const {PacketDecoder} = require('../chap-encode/packet-decoder')
const {Script} = require('../chap-script/script')
const {BTC} = require('./btc')
const {encodeTransaction} = require('./encode-transaction')
const {hash256} = require('../chap-bitcoin-crypto/hash')

/**
 * 
 * @param {PacketDecoder} decoder 
 */
const decodeTransaction = decoder => {
  assert(decoder instanceof PacketDecoder)
  const tx = {}

  tx.wtxId = hash256(decoder.toBuffer()).reverse().toString('hex')

  tx.version = decoder.int32LE()
  let nTxIns = decoder.varInt()
  tx.isSegWit = nTxIns === 0

  if (tx.isSegWit) {
    const flag = decoder.int8()
    assert(flag === 1)
    nTxIns = decoder.varInt()
  }
  tx.txIns = []
  for (let i = 0; i < nTxIns; i++) {
    const txIn = {}
    txIn.hash = decoder.data(32).reverse()
    txIn.index = decoder.uInt32LE()
    const scriptLength = decoder.varInt()
    txIn.script = new Script(decoder.data(scriptLength))
    txIn.sequence = decoder.uInt32LE()
    tx.txIns.push(txIn)
  }
  const nTxOuts = decoder.varInt()
  tx.txOuts = []
  for (let i = 0; i < nTxOuts; i++) {
    const txOut = {}
    txOut.value = BTC.fromBuffer(decoder.data(8))
    const scriptLength = decoder.varInt()
    txOut.script = new Script(decoder.data(scriptLength))
    tx.txOuts.push(txOut)
  }
  if (tx.isSegWit) {
    for (let i = 0; i < tx.txIns.length; i++) {
      const count = decoder.varInt()
      const vector = []
      for (let j = 0; j < count; j++) {
        vector.push(decoder.varBuffer())
      }
      tx.txIns.witnesses = vector
    }    
  }
  tx.locktime = decoder.uInt32LE()

  const withoutWitnessTx = encodeTransaction({...tx, isSegWit: false})
  tx.id = hash256(withoutWitnessTx).reverse().toString('hex')

  return tx
}

module.exports = {
  decodeTransaction,
}
