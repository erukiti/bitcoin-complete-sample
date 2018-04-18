const assert = require('assert')

const varInt = require('./var-int')
const fixedInt = require('./fixed-int')
const varStr = require('./var-buffer')

class PacketDecoder {
  /**
   * @param {Buffer} buf デコード対象のバイナリデータ
   */
  constructor(buf) {
    assert(buf instanceof Buffer)
    this._buf = buf
    this._offset = 0
    const codec = {...varInt, ...fixedInt, ...varStr}
    Object.keys(codec)
      .filter(s => s.startsWith('decode'))
      .forEach(s => {
        const name = s.substr(6, 1).toLowerCase() + s.substr(7)
        this[name] = () => {
          const [data, bytes] = codec[s](this._buf, this._offset)
          this._offset += bytes
          return data
        }
      })
  }

  /**
   * lengthで指定した分のバイナリデータを取り出す
   * @param {number} length 
   * @returns {Buffer}
   */
  data(length) {
    assert(typeof length === 'number')
    assert(length > 0)
    const result = this._buf.slice(this._offset, this._offset + length)
    this._offset += length
    return result
  }

  /**
   * バイナリデータのうちデコードされてないぶんのサイズを取得する
   * @returns {number} 未デコードデータのバイト数
   */
  getLeft() {
    return this._buf.length - this._offset
  }
}

module.exports = {
  PacketDecoder
}