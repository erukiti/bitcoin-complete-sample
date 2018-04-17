const {baseConv} = require('./base-conv')

const CHARACTERS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

/**
 * 入力データをBase58エンコードして文字列として返す
 * @param {Buffer} buf 入力データ
 * @returns {string} Base58エンコードされた文字列
 */
const base58Encode = buf => {
  if (buf.length === 0) return ''

  const buf58 = baseConv(buf, 256, 58)

  const nPadding = buf.findIndex(n => n !== 0)
  return CHARACTERS[0].repeat(nPadding) + buf58.map(n => CHARACTERS[n]).join('')
}

const lookup = {}
CHARACTERS.split('').forEach((c, index) => {
  lookup[c] = index
})

/**
 * Base58文字列をデコードしてBufferとして返す
 * @param {string} base58String
 * @returns {Buffer} デコードしたバイナリデータ
 */
const base58Decode = base58String => {
  const base58Array = base58String.split('')
  const nPadding = base58Array.findIndex(c => c !== CHARACTERS[0])
  const source = base58Array.map(c => lookup[c])
  return Buffer.from([
    ...Array(nPadding).fill(0),
    ...baseConv(source, 58, 256),
  ])
}

module.exports = {
  base58Decode,
  base58Encode,
}
