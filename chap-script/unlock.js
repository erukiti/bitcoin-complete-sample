const assert = require('assert')

const {Script} = require('./script')

const unlockers = [
  scriptChunks => {
    if (
      scriptChunks.length !== 5 ||
      scriptChunks[0] !== 'OP_DUP' ||
      scriptChunks[1] !== 'OP_HASH160' ||
      scriptChunks[2].length !== 40 ||
      scriptChunks[3] !== 'OP_EQUALVERIFY' ||
      scriptChunks[4] !== 'OP_CHECKSIG'
    ) {
      return null
    }

    return {
      name: 'P2PKH',
      pubkeyHash: scriptChunks[2],
    }
  },
  scriptChunks => {
    if (
      scriptChunks.length !== 3 ||
      scriptChunks[0] !== 'OP_HASH160' ||
      scriptChunks[1].length !== 40 ||
      scriptChunks[2] !== 'OP_EQUAL'
    ) {
      return null
    }
    return {
      name: 'P2SH',
      scriptHash: scriptChunks[1],
    }
  },
  scriptChunks => {
    if (scriptChunks.length !== 2 && scriptChunks[1] !== 'OP_CHECKSIG') {
      return null
    }
    return {
      name: 'P2PK',
      pubkey: scriptChunks[0],
    }
  },
]

const guessScript = script => {
  assert(script instanceof Script)
  const scriptChunks = script.getChunks()
  const found = unlockers.find(unlocker => unlocker(scriptChunks))
  if (found) {
    return found(scriptChunks)
  }
  return null
}

module.exports = {
  guessScript,
}
