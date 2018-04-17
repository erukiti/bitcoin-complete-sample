const crypto = require('crypto')

/**
 * 入力データのSHA-1ハッシュ値を得る
 * @param {Buffer} buf 
 * @returns {Buffer} SHA-1ハッシュ値
 */
const sha1 = buf => {
  const sha1 = crypto.createHash('sha1')
  sha1.write(buf)
  return sha1.digest()
}

module.exports = {
  sha1
}
