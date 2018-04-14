const crypto = require('crypto')

/**
 * 入力データのSHA-1ハッシュ値を得る
 * @param {Buffer} buf 
 * @returns {string} SHA-1を通したあとのHEX文字列
 */
const sha1 = buf => {
  const sha1 = crypto.createHash('sha1')
  sha1.write(buf)
  return sha1.digest().toString('hex')
}

module.exports = {
  sha1
}
