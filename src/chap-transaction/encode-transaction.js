const assert = require('assert')

const {PacketEncoder} = require('../chap-encode/packet-encoder')

/**
 * 
 * @param {packetEncoder} encoder 
 * @param {object} tx 
 */
const encodeTransaction = (tx) => {
  const encoder = new PacketEncoder()

  encoder.int32LE(tx.version)
  if (tx.isSegwit) {
    encoder.uInt8(0)
    encoder.uInt8(1)
  }
  encoder.varInt(tx.txIns.length)
  tx.txIns.forEach(txIn => {
    encoder.data(txIn.hash.reverse())
    encoder.uInt32LE(txIn.index)
    encoder.varBuffer(txIn.script.toBuffer())
    encoder.uInt32LE(txIn.sequence)
  })
  encoder.varInt(tx.txOuts.length)
  tx.txOuts.forEach(txOut => {
    encoder.data(txOut.value.toBuffer())
    encoder.varBuffer(txOut.script.toBuffer())
  })

  if (tx.isSegwit) {
    tx.txIns.forEach(txIn => {
      encoder.varInt(txIn.witness.length)
      txIn.witnesses.forEach(witness => {
        encoder.varBuffer(witness)
      })
    })
  }

  encoder.uInt32LE(tx.locktime)

  return encoder.build()
}

module.exports = {
  encodeTransaction
}
