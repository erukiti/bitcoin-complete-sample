const assert = require('assert')

const {Transaction} = require('../chap-transaction/transaction')
const {Keypair} = require('../chap-bitcoin-crypto/keypair')
const {guessScript} = require('../chap-transaction/unlock')
const {logger} = require('../')

class TxDB {
  constructor(opts) {
    this._tx = {}
    this._block = {}
    this._spent = {}
    this._txFetcher =
      opts.txFetcher || Promise.reject('Tx fetcher is not registered.')
    this._blockFetcher =
      opts.blockFetcher || Promise.reject('Block fetcher is not registered.')
  }

  _registerTransaction(tx) {
    const txId = tx.id
    this._tx[txId] = tx
    this._tx[txId].txIns.forEach(txIn => {
      this._spent[`${txIn.hash.toString('hex')}:${txIn.index}`] = txIn
    })
  }

  _registerBlock(block) {
    const blockId = block.id
    this._block[blockId] = block
  }

  async fetchTransaction(txId) {
    if (!(txId in this._tx)) {
      const tx = await this._txFetcher(txId)

      // FIXME
      txId = tx.id

      assert(txId === tx.id)
      this._registerTransaction(tx)
    }
    assert(this._tx[txId] instanceof Transaction)
    return this._tx[txId]
  }

  async fetchBlock(blockId) {
    if (!(blockId in this._block)) {
      const block = await this._blockFetcher(blockId)
      assert(blockId === block.id)
      this._block[blockId] = block
    }

    return this._block[blockId]
  }

  getUtxos(keys) {
    console.log('getUtxos', keys.length, 'keys')
    const utxos = []
    Object.keys(this._tx).forEach(txId => {
      const tx = this._tx[txId]
      tx.txOuts.forEach((txOut, index) => {
        if (`${txId}:${index}` in this._spent) {
          console.log(this._spent(`${txId}:${index}`), 'is used.')
          return
        }

        const unlocker = guessScript(txOut.script, {keys})
        if (!unlocker) {
          return
        }
        utxos.push({
          hash: Buffer.from(txId, 'hex'),
          index,
          value: txOut.value,
          script: txOut.script,
          ...unlocker
        })
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
