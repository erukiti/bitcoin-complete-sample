const assert = require('assert')

const {splitBytecode} = require('../chap-script/split-bytecode')
const {disassebleBytecode} = require('../chap-script/disassemble')
const {encodeTransaction} = require('../chap-transaction/encode-transaction')
const {base58Decode} = require('../chap-bitcoin-crypto/base58')

const createTransaction = (vins, vouts, opts = {}) => {
  const version = opts.version || 2
  const locktime = opts.locktime || 0

  vins.forEach(txIn => {
    console.log(txIn.keypair.publicKey.toString('hex'))
    const found = guessScript(Buffer.from(txIn.script, 'hex'))
    console.log(found)
  })

  // return encodeTransaction(vins, vouts, {version, locktime})
}

module.exports = {
  createTransaction,
}
