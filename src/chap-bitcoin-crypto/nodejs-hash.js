const crypto = require('crypto')

// Crypto APIでハッシュ関数を作成する
const createHash = algorithm => buf => {
  const hash = crypto.createHash(algorithm)
  hash.write(buf)
  return hash.digest()
}

const sha256 = createHash('sha256')
console.log(sha256(Buffer.from('')).toString('hex'))
// --> e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
