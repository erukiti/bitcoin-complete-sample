const decodeBlock = decoder => {
  const version = decoder.int32()
  const prevBlock = decoder.data(32).toString('hex')
  const markleRoot = decoder.data(32).toString('hex')
  const timestamp = decoder.uInt32()
  const bits = decoder.uInt32()
  const nonce = decoder.data(4)
  const nTx = decoder.varInt()
  for (let i = 0; i < nTx; i++) {
    const txVersion = decoder.int32()
    const nVin = decoder.varInt()
    for (let j = 0; j < nVin; j++) {
      const hash = decoder.data(32).toString('hex')
      const index = decoder.uInt32()
      const sigScriptLength = decoder.varInt()
      const sigScript = decoder.data(sigScriptLength).toString('hex')
      const sequence = decoder.uInt32()
    }
    const nVout = decoder.varInt()
    for (let j = 0; j < nVout; j++) {
      const value = decoder.data(8)
      const scriptLength = decoder.varInt()
      const script = decoder.data(scriptLength).toString('hex')
    }

  }

}

module.exports = {
  decodeBlock
}