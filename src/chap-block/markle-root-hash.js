const assert = require('assert')

const {hash256} = require('../chap-bitcoin-crypto/hash')

const getMerkleRootHash = (txIds) => {
  assert(txIds.length > 0)
  if (txIds.length === 1) {
    return txIds[0]
  }
  const hashs = []
  for (let i = 0; i < txIds.length; i += 2) {
    const inputs = []
    inputs.push(txIds[i])
    if (i + 1 === txIds.length) {
      inputs.push(txIds[i])
    } else {
      inputs.push(txIds[i + 1])
    }
    hashs.push(hash256(Buffer.concat(inputs)))
  } 
  return getMerkleRootHash(hashs)
}

