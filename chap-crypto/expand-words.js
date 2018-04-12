for (let i = 16; i < 64; i++) {
  const s0 =
    rotateRight(words[i - 15], 7) ^
    rotateRight(words[i - 15], 18) ^
    (words[i - 15] >>> 3)
  const s1 =
    rotateRight(words[i - 2], 17) ^
    rotateRight(words[i - 2], 19) ^
    (words[i - 2] >>> 10)

  words.push(words[i - 16] + s0 + words[i - 7] + s1)
}
