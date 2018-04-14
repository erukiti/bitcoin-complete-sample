const decodeAddr = decoder => {
  const len = decoder.varInt()
  const addr = []
  for (let i = 0; i < len; i++) {
    addr.push(decoder.data(30))
  }
  return addr
}

module.exports = {
  decodeAddr
}
