const {decodeBlock} = require('../../chap-block/decode-block')

const decodeHeaders = decoder => {
  const blocks = []
  const count = decoder.varInt()
  for (let i = 0; i < count; i++) {
    const block = decodeBlock(decoder)
    blocks.push(block)
  }
  return blocks
}

module.exports = {
  decodeHeaders
}
