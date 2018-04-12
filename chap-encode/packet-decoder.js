const varInt = require('./var-int')
const fixedInt = require('./fixed-int')
const varStr = require('./var-str')

class PacketDecoder {
  constructor(buf) {
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

  data(length) {
    const result = this._buf.slice(this._offset, this._offset + length)
    this._offset += length
    return result
  }

  getLeft() {
    return this._buf.length - this._offset
  }
}

module.exports = {
  PacketDecoder
}