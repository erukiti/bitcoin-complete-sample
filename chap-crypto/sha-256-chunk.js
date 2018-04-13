const {getNChunks, paddingBuf} = require('./sha-256-padding')
const {rotateRight} = require('./rotate-right')

const wordExpand = (words) => {
  for (let j = 16; j < 64; j++) {
    const s0 =
      rotateRight(words[j - 15], 7) ^
      rotateRight(words[j - 15], 18) ^
      (words[j - 15] >>> 3)
    const s1 =
      rotateRight(words[j - 2], 17) ^
      rotateRight(words[j - 2], 19) ^
      (words[j - 2] >>> 10)

    words.push(words[j - 16] + s0 + words[j - 7] + s1)
  }
}

const createChunks = buf => {
  const nChunks = getNChunks(buf.length)
  const paddedBuf = paddingBuf(buf)

  const chunks = []
  for (let i = 0; i < nChunks; i++) {
    const words = []
    for (let j = i * 64; j < i * 64 + 64 ; j += 4) {
      words.push(paddedBuf.readUInt32BE(j))
    }
    wordExpand(words)

    chunks.push(words)
  }
  return chunks
}

module.exports = {
  createChunks
}
