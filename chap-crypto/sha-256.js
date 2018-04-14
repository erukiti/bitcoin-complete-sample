const {createChunks} = require('./sha-256-chunk')
const {compression} = require('./sha-256-compression')

/**
 * 入力データのSHA-256ハッシュ値を得る
 * @param {Buffer} buf 
 * @returns {string} SHA-256を通したあとのHEX文字列
 */
const sha256 = buf => {
  const chunks = createChunks((typeof buf === 'string') ? Buffer.from(buf, 'binary') : buf)

  let hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]

  chunks.forEach(words => {
    let prev = [...hash] // hashをコピーして待避しておく

    for (let round = 0; round < 64; round++) {
      hash = compression(words, round, hash)
    }

    for (let i = 0; i < 8; i++) {
      hash[i] = (hash[i] + prev[i]) | 0
    }
  })

  const result = Buffer.alloc(32)
  hash.forEach((h, index) => {
    result.writeInt32BE(h, index * 4)
  })
  return result.toString('hex')
}

module.exports = {
  sha256,
}
