const {decodeTransaction} = require('../chap-transaction/decode-transaction')

const decodeBlock = decoder => {
  const version = decoder.int32LE()
  const prevBlock = decoder.data(32).reverse()
  const merkleRoot = decoder.data(32).reverse()
  const timestamp = decoder.uInt32LE()
  const bits = decoder.uInt32LE()
  const nonce = decoder.data(4)
  const tx = []
  if (decoder.getLeft() > 0) {
    const nTx = decoder.varInt()

    for (let i = 0; i < nTx; i++) {
      tx.push(decodeTransaction(decoder))
    }
  }

  return {
    version,
    prevBlock,
    merkleRoot,
    timestamp,
    bits,
    nonce,
    tx
  }
}

module.exports = {
  decodeBlock
}

