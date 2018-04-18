const assert = require('assert')

const {splitBytecode} = require('../chap-script/split-bytecode')
const {disassebleBytecode} = require('../chap-script/disassemble')
const {encodeTransaction} = require('../chap-transaction/encode-transaction')
const {base58Decode} = require('../chap-bitcoin-crypto/base58')

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
      createScript: () => {
        // scriptChunks[2]
      }
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
      createScript: () => {

      }
    }
  },
  scriptChunks => {
    if (scriptChunks.length !== 2 && scriptChunks[1] !== 'OP_CHECKSIG') {
      return null
    }
    return {
      name: 'P2PK',
      createScript: () => {

      }
    }
  }
]

const guessScript = script => {
  assert(script instanceof Buffer)
  const scriptChunks = disassebleBytecode(script).split(' ')
  const found = unlockers.find(unlocker => unlocker(scriptChunks))
  if (found) {
    return found(scriptChunks)
  }
  return null
}

const createTransaction = (vins, vouts, opts = {}) => {
  const version = opts.version || 2
  const locktime = opts.locktime || 0

  vins.forEach(txIn => {
    console.log(txIn.keypair.publicKey.toString('hex'))
    const found = guessScript(Buffer.from(txIn.script, 'hex'))
    console.log(found)
  })

  // return encodeTransaction(vins, vouts, {version, locktime})
}

module.exports = {
  createTransaction,
}
