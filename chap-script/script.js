const assert = require('assert')

const {asm} = require('./assembele')
const {disassebleBytecode} = require('./disassemble')

class Script {
  /**
   *
   * @param {Buffer} buf スクリプトバイトコード
   */
  constructor(buf) {
    assert(buf instanceof Buffer, `${buf} is not Buffer.`)
    this._scriptBuf = buf
    this._asm = disassebleBytecode(buf)
  }

  /**
   *
   * @param {string} hex スクリプトバイトコードのHEX文字列
   */
  static fromHex(hex) {
    return new Script(Buffer.from(hex, 'hex'))
  }

  /**
   * ex. Script.asm`OP_DUP OP_HASH160 ${hashBuf} OP_EQUAL OP_CHECKSIG`
   *
   */
  static asm(...opts) {
    return new Script(asm(...opts))
  }

  toBuffer() {
    return this._scriptBuf
  }

  toHex() {
    return this._scriptBuf.toString('hex')
  }

  inspect() {
    return `ASM: ${this._asm}`
  }

  toASM() {
    return this._asm
  }

  getChunks() {
    return this._asm.split(' ')
  }
}

module.exports = {
  Script,
}
