const assert = require('assert')

const { sha256 } = require('../chap-crypto/sha-256')
const getHash = data => sha256(sha256(data))

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
    hashs.push(getHash(Buffer.concat(inputs)))
  } 
  return getMerkleRootHash(hashs)
}

