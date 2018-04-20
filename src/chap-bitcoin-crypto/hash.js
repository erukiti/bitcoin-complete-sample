const assert = require('assert')
const crypto = require('crypto')

// Crypto APIでハッシュ関数を作成する
const createHash = algorithm => buf => {
  assert(buf instanceof Buffer)
  const hash = crypto.createHash(algorithm)
  hash.write(buf)
  return hash.digest()
}

/**
 * 入力値のSHA-1のハッシュ値を得る
 * @param {Buffer} buf 入力データ
 * @returns {Buffer} SHA-1のハッシュ値（160ビット長）
 */
const sha1 = createHash('sha1')

/**
 * 入力値のSHA-256のハッシュ値を得る
 * @param {Buffer} buf 入力データ
 * @returns {Buffer} SHA-256のハッシュ値（256ビット長）
 */
const sha256 = createHash('sha256')

/**
 * 入力値のRIPEMD-160のハッシュ値を得る
 * @param {Buffer} buf 入力データ
 * @returns {Buffer} RIPEMD-160のハッシュ値（160ビット長）
 */
const ripemd160 = createHash('ripemd160')

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
 * 入力値のhash256を得る ※sha256 -> sha256
 * @param {Buffer} buf 入力データ
 * @returns {Buffer} hash256のハッシュ値（256ビット長）
 */
const hash256 = buf => {
  assert(buf instanceof Buffer)
  return sha256(sha256(buf))
}

module.exports = {hash160, hash256, sha1, sha256, ripemd160}
