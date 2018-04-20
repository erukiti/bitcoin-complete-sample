const {Block} = require('../../chap-block/block')

const decodeBlock = decoder => {
  return new Block(decoder)
}

module.exports = {
  decodeBlock
}
