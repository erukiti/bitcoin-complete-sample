const assert = require('assert')

const {PacketDecoder} = require('../chap-encode/packet-decoder')
const {decodeBlock} = require('./decode-block')

class Block {
  constructor(decoder) {
    assert(decoder instanceof PacketDecoder)
    this._block = decodeBlock(decoder)
    this._raw = decoder.toBuffer()
  }

  /**
   * 
   * @param {Buffer} buf 
   */
  static fromBuffer(buf) {
    assert(buf instanceof Buffer)
    return new Block(PacketDecoder.fromBuffer(buf))
  }

  /**
   * 
   * @param {string} hex 
   */
  static fromHex(hex) {
    assert(typeof hex === 'string')
    return new Block(PacketDecoder.fromHex(hex))
  }

  /**
   * @returns {string} BlockID
   */
  get id() {
    return this._block.id.toString('hex')
  }

  get tx() {
    return this._block.tx
  }

  get txIds() {
    return this._block.tx.map(tx => tx.id)
  }


  /**
   * @returns {Transaction[]}
   */
  getTransactions() {
    return this._block.tx
  }
  inspect() {
    return {
      id: this._block.id.toString('hex'),
      version: this._block.version.toString(16),
      prevBlock: this._block.prevBlock.toString('hex'),
      merkleRoot: this._block.merkleRoot.toString('hex'),
      timestamp: this._block.timestamp,
      bits: this._block.bits.toString(16),
      nonce: this._block.nonce.toString('hex'),
      tx: this._block.tx.map(tx => tx.id)
    }
  }
}

module.exports = {
  Block
}
