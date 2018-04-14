const decodeVersion = (decoder) => {
  const version = decoder.uInt32()
  const services = decoder.uInt64()
  const time = decoder.uInt64()
  const revceiverAddress = {
    services: decoder.uInt64(),
    address: decoder.data(16),
    port: decoder.uInt16BE()
  }
  const senderAddress = {
    services: decoder.uInt64(),
    address: decoder.data(16),
    port: decoder.uInt16BE()
  }
  const nonce = decoder.uInt64()
  const userAgent = decoder.varStr()
  const startHeight = decoder.uInt32()
  const relay = decoder.int8()

  return {
    version, time, services, revceiverAddress, senderAddress, nonce, userAgent, startHeight, relay
  }
}

const encodeVersion = (encoder) => {
  encoder.uInt32(70015)

  encoder.uInt64(0)
  encoder.uInt64(Math.round(Date.now() / 1000))

  // revceiver address
  encoder.uInt64(0x01) // services

  // IPv6
  encoder.data(Buffer.from('00000000000000000000ffff', 'hex'))
  encoder.uInt32(0) // IPv4
  encoder.uInt16BE(8333) // port

  // sender address
  encoder.uInt64(0) // services

  // IPv6
  encoder.data(Buffer.from('00000000000000000000ffff', 'hex'))
  encoder.uInt32(0) // IPv4
  encoder.uInt16BE(8333) // port

  encoder.uInt64(0) // nonce

  encoder.varStr('foobar')

  encoder.uInt32(0)
  encoder.int8(0)
}

module.exports = {
  decodeVersion,
  encodeVersion
}
