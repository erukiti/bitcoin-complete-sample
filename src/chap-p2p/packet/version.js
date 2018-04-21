const decodeVersion = decoder => {
  const version = decoder.uInt32LE()
  const services = decoder.uInt64LE()
  const time = decoder.uInt64LE()
  const revceiverAddress = {
    services: decoder.uInt64LE(),
    address: decoder.data(16),
    port: decoder.uInt16BE(),
  }
  const senderAddress = {
    services: decoder.uInt64LE(),
    address: decoder.data(16),
    port: decoder.uInt16BE(),
  }
  const nonce = decoder.uInt64LE()
  const userAgent = decoder.varStr()
  const startHeight = decoder.uInt32LE()
  const relay = decoder.int8()

  return {
    version,
    time,
    services,
    revceiverAddress,
    senderAddress,
    nonce,
    userAgent,
    startHeight,
    relay,
  }
}

const encodeVersion = encoder => {
  encoder.uInt32LE(70015)

  encoder.uInt64LE(0)
  encoder.uInt64LE(Math.round(Date.now() / 1000))

  // revceiver address
  encoder.uInt64LE(0x01) // services

  // IPv6
  encoder.data(Buffer.from('00000000000000000000ffff', 'hex'))
  encoder.uInt32LE(0) // IPv4
  encoder.uInt16BE(8333) // port

  // sender address
  encoder.uInt64LE(0) // services

  // IPv6
  encoder.data(Buffer.from('00000000000000000000ffff', 'hex'))
  encoder.uInt32LE(0) // IPv4
  encoder.uInt16BE(8333) // port

  encoder.uInt64LE(0) // nonce

  encoder.varStr('foobar')

  encoder.uInt32LE(0)
  encoder.int8(0)
}

module.exports = {
  decodeVersion,
  encodeVersion,
}
