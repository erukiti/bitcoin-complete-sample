const crypto = require('crypto')

// ハッシュ関数
const createHash = algorithm => buf => {
  const hash = crypto.createHash(algorithm)
  hash.write(buf)
  return hash.digest().toString('hex')
}
const sha1 = createHash('sha1')
const sha256 = createHash('sha256')
const ripemd160 = createHash('ripemd160')

module.exports = {
  sha1,
  sha256,
  ripemd160
}
