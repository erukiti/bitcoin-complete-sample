const decodePing = decode => {
  const nonce = decode.data(8)
  return {nonce}
}

const encodePing = (encode, {nonce}) => {
  encode.data(nonce)
}

module.exports = {
  decodePing,
  encodePing
}
