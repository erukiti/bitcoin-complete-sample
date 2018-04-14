/**
 * 入力データのRIPEMD-160ハッシュ値を得る
 * @param {Buffer} buf 
 * @returns {string} RIPEMD-160を通したあとのHEX文字列
 */
const ripemd160 = buf => {
  var kLeft = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e]
  var kRight = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000]

  const createUInt64LEBuffer = n => {
    const buf = Buffer.alloc(8)
    buf.writeUInt32LE(n, 0)
    buf.writeUInt32LE(n / 2 ** 32 | 0, 4)
    return buf
  }
  
  const paddingBuf = (buf, nChunks) => {
    const nZeroPadding = nChunks * 64 - buf.length - 8 - 1
    const padding = Buffer.from([0x80, ...Array(nZeroPadding).fill(0)])
    const lengthInfo = createUInt64LEBuffer(buf.length * 8)
    return Buffer.concat([buf, padding, lengthInfo])
  }
  
  const createChunks = buf => {
    const nChunks = (buf.length + 8) / 64 + 1 | 0
    const paddedBuf = paddingBuf(buf, nChunks)

    const chunks = []
    for (let i = 0; i < nChunks; i++) {
      const words = []
      for (let offset = 0; offset < 64; offset += 4) {
        words.push(paddedBuf.readUInt32LE(i * 64 + offset))
      }
      chunks.push(words)
    }

    return chunks
  }

  const chunks = createChunks(Buffer.from(buf))

  let a = 0x67452301
  let b = 0xefcdab89
  let c = 0x98badcfe
  let d = 0x10325476
  let e = 0xc3d2e1f0

  chunks.forEach(words => {
    var al = a | 0
    var bl = b | 0
    var cl = c | 0
    var dl = d | 0
    var el = e | 0
  
    var ar = a | 0
    var br = b | 0
    var cr = c | 0
    var dr = d | 0
    var er = e | 0
  
    for (let round = 0; round < 80; round++) {
      var tl
      var tr
      if (round < 16) {
        tl = fn1(al, bl, cl, dl, el, words[zl[round]], kLeft[0], sl[round])
        tr = fn5(ar, br, cr, dr, er, words[zr[round]], kRight[0], sr[round])
      } else if (round < 32) {
        tl = fn2(al, bl, cl, dl, el, words[zl[round]], kLeft[1], sl[round])
        tr = fn4(ar, br, cr, dr, er, words[zr[round]], kRight[1], sr[round])
      } else if (round < 48) {
        tl = fn3(al, bl, cl, dl, el, words[zl[round]], kLeft[2], sl[round])
        tr = fn3(ar, br, cr, dr, er, words[zr[round]], kRight[2], sr[round])
      } else if (round < 64) {
        tl = fn4(al, bl, cl, dl, el, words[zl[round]], kLeft[3], sl[round])
        tr = fn2(ar, br, cr, dr, er, words[zr[round]], kRight[3], sr[round])
      } else { // if (i<80) {
        tl = fn5(al, bl, cl, dl, el, words[zl[round]], kLeft[4], sl[round])
        tr = fn1(ar, br, cr, dr, er, words[zr[round]], kRight[4], sr[round])
      }
  
      al = el
      el = dl
      dl = rotl(cl, 10)
      cl = bl
      bl = tl
  
      ar = er
      er = dr
      dr = rotl(cr, 10)
      cr = br
      br = tr
    }

    t = (b + cl + dr) | 0
    b = (c + dl + er) | 0
    c = (d + el + ar) | 0
    d = (e + al + br) | 0
    e = (a + bl + cr) | 0
    a = t
  })
  

  const res = Buffer.alloc(20)
  res.writeInt32LE(a, 0)
  res.writeInt32LE(b, 4)
  res.writeInt32LE(c, 8)
  res.writeInt32LE(d, 12)
  res.writeInt32LE(e, 16)
  return res.toString('hex')
}

function rotl (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function fn1 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0
}

function fn2 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + e) | 0
}

function fn3 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b | (~c)) ^ d) + m + k) | 0, s) + e) | 0
}

function fn4 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + e) | 0
}

function fn5 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ (c | (~d))) + m + k) | 0, s) + e) | 0
}
var zl = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
]

var zr = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
]

var sl = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
]

var sr = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
]



module.exports = {
  ripemd160
}
