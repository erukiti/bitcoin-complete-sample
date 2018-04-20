const encodeGetheaders = (encoder, payload) => {
  encoder.uInt32LE(2)
  encoder.varInt(payload.ids.length)
  payload.ids.forEach(id => {
    encoder.data(id)
  })
  encoder.data(payload.stopHash)
}

module.exports = {
  encodeGetheaders
}
