const assert = require('assert')
const {Transaction} = require('./index')
const {Keypair} = require('../chap-bitcoin-crypto/keypair')
const {guessScript} = require('../chap-script/unlock')

class TxDB {
  constructor(opts) {
    this._tx = {}
    this._block = {}
    this._txFetcher = opts.txFetcher || Promise.reject('Tx fetcher is not registered.')
    this._blockFetcher = opts.blockFetcher || Promise.reject('Block fetcher is not registered.')
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

  searchTransaction(key) {
    console.log(key.toPublicKey())
    Object.keys(this._tx).forEach(txId => {
      const tx = this._tx[txId]
      tx.txOuts.forEach((txOut, index) => {
        const res = guessScript(txOut.script)
        if (!res) {
          return
        }
        switch (res.name) {
          case 'P2PK': {
            const kp = Keypair.fromPublicKey(Buffer.from(res.pubkey, 'hex'), {network: 'testnet'})
            console.log(kp.toAddress())
          }
          default: {
            console.log(res)
          }
        }
      })
    })
  }


  // static myTxos(mykey, tx) {
  //   assert(mykey instanceof Keypair)
  //   assert(tx instanceof Transaction)
  //   tx.txOuts.forEach(txOut => {
  //     if (txOut) {
  //     console.log(txOut.script)
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
