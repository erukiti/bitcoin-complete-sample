const assert = require('assert')
const util = require('util')

const {Script} = require('../chap-script/script')
const {hash256} = require('../chap-bitcoin-crypto/hash')
const {decodeTransaction} = require('./decode-transaction')
const {encodeTransaction} = require('./encode-transaction')
const {PacketDecoder} = require('../chap-encode/packet-decoder')
const {guessScript} = require('./unlock')
const {Keypair} = require('../chap-bitcoin-crypto/keypair')

class Transaction {
  constructor(decoder) {
    assert(decoder instanceof PacketDecoder)
    this._raw = decoder.toBuffer()
    this._id = hash256(this._raw).reverse()
    this._tx = decodeTransaction(decoder)
  }

  get id() {
    return this._id.toString('hex')
  }

  static encode(tx) {
    return new Transaction(PacketDecoder.fromBuffer(encodeTransaction(tx)))
  }

  /**
   * 
   * @param {string} hex 
   */
  static fromHex(hex) {
    assert(typeof hex === 'string')
    return new Transaction(PacketDecoder.fromHex(hex))
  }

  /**
   * 
   * @param {Buffer} buf 
   */
  static fromBuffer(buf) {
    assert(buf instanceof Buffer)
    return new Transaction(PacketDecoder.fromBuffer(buf))
  }

  inspect() {
    return {
      txId: this._id.toString('hex'),
      isSegwit: this._tx.isSegWit,
      version: this._tx.version,
      txIns: this._tx.txIns.map(txIn => ({
        hash: txIn.hash.reverse().toString('hex'),
        index: txIn.index,
        script: txIn.script,
        sequence: txIn.sequence.toString(16).padStart(0, 8, '0'),
        witnesses: txIn.witnesses
      })),
      txOuts: this._tx.txOuts.map(txOut => {
        const guessed = guessScript(txOut.script)
        if (guessed) {
          const res = {}
          Object.keys(guessed).forEach(param => {
            if (guessed[param] instanceof Buffer) {
              res[param] = guessed[param].toString('hex')
            } else {
              res[param] = guessed[param]
            }
          })
          return {...txOut, ...res}
        }
        return txOut
      }),
      locktime: this._tx.locktime
    }
  }

  verify() {}

  get txIns() {
    return this._tx.txIns
  }

  get txOuts() {
    return this._tx.txOuts
  }

  toBuffer() {
    return this._raw
  }

  toHex() {
    return this._raw.toString('hex')
  }
}

module.exports = {
  Transaction,
}
