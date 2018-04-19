const assert = require('assert')

const invTypes = ['ERROR', 'MSG_TX', 'MSG_BLOCK', 'MSG_FILTERED_BLOCK', 'MSG_CMPCT_BLOCK']

const decodeInv = decode => {
  const len = decode.varInt()
  const inventoryVector = []
  for (let i = 0; i < len; i++) {
    const data = {}
    const type = decode.uInt32()
    if (type >= 0 && type < invTypes.length) {
      data.type = invTypes[type]
    } else {
      throw new Error(`unknown Inventory Type ${type}`)
    }
    data.hash = decode.data(32).toString('hex')
    inventoryVector.push(data)
  }
  return inventoryVector
}

const encodeInv = (encode, inventoryVector) => {
  encode.varInt(inventoryVector.length)
  inventoryVector.forEach(inv => {
    const type = invTypes.findIndex(v => v === inv.type)
    assert(type > 0 && type < invTypes.length)
    encode.uInt32(type)
    encode.data(Buffer.from(inv.hash, 'hex'))
  })
}

module.exports = {
  decodeInv,
  encodeInv
}
