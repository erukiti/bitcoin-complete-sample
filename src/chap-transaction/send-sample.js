const assert = require('assert')

const Client = require('bitcoin-core')
const secp256k1 = require('secp256k1')

const bitcoin = require('bitcoinjs-lib')

const {Script} = require('./chap-script/script')
const {Transaction} = require('./chap-transaction/transaction')
const {TxDB} = require('./chap-p2p/txdb')

const {execRegtest} = require('./chap-bitcoin/exec-regtest')
const {conf, logger} = require('./')
const {Keypair} = require('./chap-bitcoin-crypto/keypair')

const {hash256} = require('./chap-bitcoin-crypto/hash')

const {decodeBase58Check} = require('./chap-bitcoin-crypto/base58check')

const {Block} = require('./chap-block/block')
const {BTC} = require('./chap-transaction/btc')

const keys = []

const cl = new Client({
  network: conf.network,
  username: conf.user,
  password: conf.pass,
  port: conf.rpcport,
})

const createAccount = async name => {
  const kp = Keypair.generate()
  await cl.importPrivKey(kp.toWIF())
  await cl.setAccount(kp.toAddress(), name)

  keys.push(kp)
  logger.debug(name, kp.toAddress())
  return kp
}

const txDB = new TxDB({
  txFetcher: async txId => {
    const txHex = await cl.getRawTransaction(txId)
    const tx = Transaction.fromHex(txHex)
    return tx
  },
  blockFetcher: async blockId => {
    const blockHex = await cl.getBlock(blockId, 0)
    return Block.fromHex(blockHex)
  },
})

const putBalance = async name => {
  console.log(name, 'has', await cl.getBalance(name))
}

const generate = async n => {
  const txs = []
  const blockIds = await cl.generate(n)
  for (let blockId of blockIds) {
    const b = await txDB.fetchBlock(blockId)
    const block = await cl.getBlock(blockId)

    for (let txId of block.tx) {
      await txDB.fetchTransaction(txId)
      const tx = await cl.getTransaction(txId)
      for (let detail of tx.details) {
        const wif = await cl.dumpPrivKey(detail.address)
        keys.push(Keypair.fromWIF(wif))
      }
    }
  }
}

const sendToP2PKH = (utxo, address, value, locktime = 0) => {
  logger.debug('UTXO:', utxo)
  const txIns = [
    {
      hash: utxo.hash,
      index: utxo.index,
      sequence: 0xffffffff,
      script: utxo.script,
    },
  ]
  const sendHash = decodeBase58Check(address).slice(1)
  const fee = BTC.fromSatoshi(10000)
  const kickback = BTC.fromSatoshi(
    utxo.value.toSatoshi() - value.toSatoshi() - fee.toSatoshi()
  )
  const txOuts = [
    {
      value,
      script: Script.asm`OP_DUP OP_HASH160 ${sendHash} OP_EQUALVERIFY OP_CHECKSIG`,
    },
    {
      value: kickback,
      script: Script.asm`OP_DUP OP_HASH160 ${utxo.key.toPubkeyHash()} OP_EQUALVERIFY OP_CHECKSIG`,
    },
  ]
  const tmpTx = Transaction.encode({txIns, txOuts, version: 2, locktime})
  const sigHash = hash256(
    Buffer.concat([tmpTx.toBuffer(), Buffer.from([1, 0, 0, 0])])
  )
  const sig = Buffer.concat([
    secp256k1.signatureExport(
      secp256k1.sign(sigHash, utxo.key.privateKey).signature
    ),
    Buffer.from([0x01]),
  ])
  txIns[0].script = utxo.createScript({sig})
  return Transaction.encode({txIns, txOuts, version: 2, locktime})
}

const testBitcoinCore = async () => {
  await execRegtest()

  await generate(1)

  const alice = await createAccount('alice')
  const bob = await createAccount('bob')

  const utxos = txDB.searchTransaction(keys)

  await generate(100)

  putBalance('alice')

  const sendTx = sendToP2PKH(utxos[0], alice.toAddress(), BTC.fromBTC(40))
  logger.debug('send', sendTx)
  logger.debug('send TxID', await cl.sendRawTransaction(sendTx.toHex()))

  await cl.generate(1)
  putBalance('alice')
}

testBitcoinCore().catch(err => console.error(err))
