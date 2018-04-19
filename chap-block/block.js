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
    return new Block(PacketDecoder.fromBuffer(buf))
  }

  /**
   * 
   * @param {string} hex 
   */
  static fromHex(hex) {
    return new Block(PacketDecoder.fromHex(hex))
  }


  inspect() {
    return {
      version: this._block.version.toString(16),
      prevBlock: this._block.prevBlock.toString('hex'),
      merkleRoot: this._block.merkleRoot.toString('hex'),
      timestamp: this._block.timestamp,
      bits: this._block.bits.toString(16),
      nonce: this._block.nonce.toString('hex'),
      tx: this._block.tx
    }
  }
}

module.exports = {
  Block
}
