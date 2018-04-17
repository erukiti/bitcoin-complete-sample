const assert = require('assert')

const {sha256, ripemd160} = require('../chap-crypto/quick-hash')

/**
 * 入力値のhash160を得る ※sha256 -> ripemd
 * @param {Buffer} buf 入力データ
 * @returns {Buffer} hash160のハッシュ値（160ビット長）
 */
const hash160 = buf => {
  assert(buf instanceof Buffer)
  return ripemd160(sha256(buf))
}

/**
 * 入力値のhash256を得る ※sha256 -> hash256
 * @param {Buffer} buf 入力データ
 * @returns {Buffer} hash256のハッシュ値（256ビット長）
 */
const hash256 = buf => {
  assert(buf instanceof Buffer)
  return sha256(sha256(buf))
}

module.exports = {hash160, hash256}
