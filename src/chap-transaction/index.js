const assert = require('assert')
const util = require('util')

const {Script} = require('../chap-script/script')
const {hash256} = require('../chap-bitcoin-crypto/hash')
const {decodeTransaction} = require('./decode-transaction')
const {encodeTransaction} = require('./encode-transaction')
const {PacketDecoder} = require('../chap-encode/packet-decoder')

class Transaction {
  constructor(decoder) {
    assert(decoder instanceof PacketDecoder)
    // console.log(buf.toString('hex'))
    this._raw = decoder.toBuffer()
    this._tx = decodeTransaction(decoder)
    // console.log(this.calcHash())
  }

  calcHash() {
    const tx = {...this._tx, isSegwit: false}
    return hash256(encodeTransaction(tx)).toString('hex')
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
    return this._tx
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
