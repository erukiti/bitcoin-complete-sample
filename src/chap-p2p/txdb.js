const assert = require('assert')

const {Transaction} = require('../chap-transaction/transaction')
const {Keypair} = require('../chap-bitcoin-crypto/keypair')
const {guessScript} = require('../chap-transaction/unlock')
const {logger} = require('../')

class TxDB {
  constructor(opts) {
    this._tx = {}
    this._block = {}
    this._txFetcher =
      opts.txFetcher || Promise.reject('Tx fetcher is not registered.')
    this._blockFetcher =
      opts.blockFetcher || Promise.reject('Block fetcher is not registered.')
  }

  async fetchTransaction(txId) {
    if (!(txId in this._tx)) {
      this._tx[txId] = await this._txFetcher(txId)
    }
    assert(this._tx[txId] instanceof Transaction)
    return this._tx[txId]
  }

  async fetchBlock(blockId) {
    if (!(blockId in this._block)) {
      this._block[blockId] = await this._blockFetcher(blockId)
    }

    return this._block[blockId]
  }

  searchTransaction(keys = []) {
    const utxos = []
    Object.keys(this._tx).forEach(txId => {
      const tx = this._tx[txId]
      tx.txOuts.forEach((txOut, index) => {
        const unlocker = guessScript(txOut.script, {keys})
        if (!unlocker) {
          return
        }
        switch (unlocker.type) {
          case 'P2PK': {
            utxos.push({
              hash: Buffer.from(txId, 'hex').reverse(),
              index,
              script: txOut.script,
              key: unlocker.key,
              type: unlocker.type,
              createScript: unlocker.createScript
            })
            return
          }
          default: {
            logger.debug(`unknown lock type ${unlocker.type}`, unlocker)
          }
        }
      })
    })
    return utxos
  }

  // static myTxos(mykey, tx) {
  //   assert(mykey instanceof Keypair)
  //   assert(tx instanceof Transaction)
  //   tx.txOuts.forEach(txOut => {
  //     if (txOut) {
  //     logger.debug(txOut.script)
  //     }
  //   })
  //   return []
  // }
  // async getUtxos() {
  //   Object.keys(this._tx).forEach()
  // }
}

module.exports = {
  TxDB,
}
