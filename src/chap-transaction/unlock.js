const assert = require('assert')

const {Script} = require('../chap-script/script')
const {Keypair} = require('../chap-bitcoin-crypto/keypair')
const {encodeBase58Check} = require('../chap-bitcoin-crypto/base58check')
const {conf} = require('../')

const unlockers = [
  scriptChunks => {
    if (
      scriptChunks.length !== 5 ||
      scriptChunks[0] !== 'OP_DUP' ||
      scriptChunks[1] !== 'OP_HASH160' ||
      !(scriptChunks[2] instanceof Buffer) ||
      scriptChunks[2].length !== 20 ||
      scriptChunks[3] !== 'OP_EQUALVERIFY' ||
      scriptChunks[4] !== 'OP_CHECKSIG'
    ) {
      return null
    }

    const pubkeyHash = scriptChunks[2]
    return {
      type: 'P2PKH',
      pubkeyHash,
      address: encodeBase58Check(Buffer.concat([conf.pubkeyHash, pubkeyHash])),
    }
  },
  scriptChunks => {
    if (
      scriptChunks.length !== 3 ||
      scriptChunks[0] !== 'OP_HASH160' ||
      !(scriptChunks[1] instanceof Buffer) ||
      scriptChunks[1].length !== 20 ||
      scriptChunks[2] !== 'OP_EQUAL'
    ) {
      return null
    }
    return {
      type: 'P2SH',
      scriptHash: scriptChunks[1],
    }
  },
  scriptChunks => {
    if (
      scriptChunks.length !== 2 ||
      !(scriptChunks[0] instanceof Buffer) ||
      scriptChunks[1] !== 'OP_CHECKSIG'
    ) {
      return null
    }
    const pubkey = scriptChunks[0]
    return {
      type: 'P2PK',
      pubkey,
      address: Keypair.fromPublicKey(pubkey).toAddress(),
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
