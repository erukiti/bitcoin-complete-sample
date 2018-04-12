const rotateRight = (value, nBits) =>{
  return (value >>> nBits) | (value << (32 - nBits)) >>> 0
}

const createUIn64BEBuffer = n => {
  const buf = Buffer.alloc(8)
  buf.writeUInt32BE(n / 2 ** 32 | 0, 0)
  buf.writeUInt32BE(n, 4)
  return buf
}

const paddingBuf = (buf, nChunks) => {
  const nZeroPadding = nChunks * 64 - buf.length - 8 - 1
  const padding = Buffer.from([0x80, ...Array(nZeroPadding).fill(0)])
  const lengthInfo = createUIn64BEBuffer(buf.length * 8)
  return Buffer.concat([buf, padding, lengthInfo])
}

const createChunks = buf => {
  const nChunks = (buf.length + 8) / 64 + 1 | 0
  const paddedBuf = paddingBuf(buf, nChunks)

  const chunks = []
  for (let i = 0; i < nChunks; i++) {
    const words = []
    for (let j = i * 64; j < i * 64 + 64 ; j += 4) {
      words.push(paddedBuf.readUInt32BE(j))
    }

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
    chunks.push(words)
  }
  return chunks
}

const sha256 = buf => {
  const chunks = createChunks((typeof buf === 'string') ? Buffer.from(buf, 'binary') : buf)

  let hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]

  const k = [
     0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 
     0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
     0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 
     0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
     0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 
     0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
     0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 
     0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
     0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 
     0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
     0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 
     0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
     0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 
     0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
     0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 
     0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ]

  chunks.forEach(words => {
    const compression = (round, [a, b, c, d, e, f, g, h]) => {
      const sigma1 = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25)
      const ch = (e & f) ^ (~e & g)
      const temp1 = h + sigma1 + ch + k[round] + words[round]
      const sigma0 = rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22)
      const maj = (a & b) ^ (a & c) ^ (b & c)
      const temp2 = (sigma0 + maj) | 0
      return [
        temp1 + temp2,
        a,
        b,
        c,
        (d + temp1) | 0,
        e,
        f,
        g
      ]
    }
  
    let next = [...hash]

    for (let round = 0; round < 64; round++) {
      next = compression(round, next)
    }

    for (let i = 0; i < 8; i++) {
      hash[i] = (hash[i] + next[i]) | 0
    }
  })

  const result = new Buffer(32)
  hash.forEach((h, i) => {
    result.writeInt32BE(h, i * 4)
  })
  return result.toString('hex')
}

module.exports = {
  sha256,
}
