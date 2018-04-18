const assert = require('assert')

const varInt = require('./var-int')
const fixedInt = require('./fixed-int')
const varStr = require('./var-buffer')


class PacketEncoder {
  constructor() {
    this._buffers = []
    const codec = {...varInt, ...fixedInt, ...varStr}
    Object.keys(codec)
      .filter(s => s.startsWith('encode'))
      .forEach(s => {
        const name = s.substr(6, 1).toLowerCase() + s.substr(7)
        this[name] = (value) => {
          this._buffers.push(codec[s](value))
        }
      })
  }

  /**
   * Buffer型のバイナリデータを追加する
   * @param {Buffer} buf 追加するバイナリデータ
   */
  data(buf) {
    assert(buf instanceof Buffer)
    this._buffers.push(buf)
  }

  /**
   * エンコードした結果
   * @returns {Buffer}
   */
  build() {
    return Buffer.concat(this._buffers)
  }
}

module.exports = {
  PacketEncoder
}
