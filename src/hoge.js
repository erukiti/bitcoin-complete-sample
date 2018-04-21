const assert = require('assert')

const Client = require('bitcoin-core')
const secp256k1 = require('secp256k1')

const bitcoin = require('bitcoinjs-lib')

const {Script} = require('./chap-script/script')
const {Transaction} = require('./chap-transaction/transaction')
const {TxDB} = require('./chap-p2p/txdb')

const {execRegtest} = require('./chap-bitcoin/exec-regtest')
const {conf, logger} = require('./')
const {encodeTransaction} = require('./chap-transaction/encode-transaction')
const {Keypair} = require('./chap-bitcoin-crypto/keypair')

const {hash160, hash256, sha256} = require('./chap-bitcoin-crypto/hash')

const {decodeBase58Check, encodeBase58Check} = require('./chap-bitcoin-crypto/base58check')

const {decodeBlock} = require('./chap-block/decode-block')
const {PacketDecoder} = require('./chap-encode/packet-decoder')
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
  // const addr = await cl.getNewAddress(name)
  // const wif = await cl.dumpPrivKey(addr)
  // const kp = Keypair.fromWIF(wif)
  const kp = Keypair.generate()
  await cl.importPrivKey(kp.toWIF())

  keys.push(kp)
  logger.debug(name, kp.toAddress())
  return kp
}

const txDB = new TxDB({
  txFetcher: async txId => {
    const txHex = await cl.getRawTransaction(txId)
    const tx = Transaction.fromHex(txHex)
    // console.log(tx.id, txId)
    return tx
  },
  blockFetcher: async blockId => {
    const blockHex = await cl.getBlock(blockId, 0)
    return Block.fromHex(blockHex)
  }
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

const sendToP2PKH = (utxo, address, value) => {
  console.log(utxo)
  console.log(utxo.hash, utxo.script)
  const txIns = [
    {
      hash: utxo.hash,
      index: utxo.index,
      sequence: 0xffffffff,
      script: utxo.script,
    },
  ]
  const sendHash = decodeBase58Check(address).slice(1)
  const txOuts = [
    {
      value: BTC.fromBTC(49.99999),
      script: Script.asm`OP_DUP OP_HASH160 ${sendHash} OP_EQUALVERIFY OP_CHECKSIG`,
    }
  ]
  const tmpTx = Transaction.encode({txIns, txOuts, version: 2})
  const sigHash = hash256(Buffer.concat([tmpTx.toBuffer(), Buffer.from([1,0,0,0])]))
  const sig = Buffer.concat([
    secp256k1.signatureExport(secp256k1.sign(sigHash, utxo.key.privateKey).signature),
    Buffer.from([0x01])
  ])
  txIns[0].script = utxo.createScript({sig})
  return Transaction.encode({txIns, txOuts, version: 2})
}


const testBitcoinCore = async () => {
  await execRegtest()

  await generate(1)

  const alice = await createAccount('alice')
  const bob = await createAccount('bob')

  const utxos = txDB.searchTransaction(keys)
  console.log(utxos)

  await generate(100)

  putBalance('alice')

  const sendTx = sendToP2PKH(utxos[0], alice.toAddress(), 40)
  console.log(1, sendTx)
  console.log(await cl.sendRawTransaction(sendTx.toHex()))

  // const a = bc.ECPair.fromWIF(utxos[0].key.toWIF(), bc.networks.testnet)
  
  // const txb = new bc.TransactionBuilder({network: bc.networks.testnet})
  // txb.addInput(utxos[0].hash, utxos[0].index)
  // console.log(a.getAddress())
  // txb.addOutput(a.getAddress(), 49.9999)
  // txb.sign(0, a)
  // console.log(2, txb.build().toHex())





  // const txId = await cl.sendToAddress(alice.toAddress(), 40)
  const blockIds = await cl.generate(1)
  console.log(blockIds)
  // const tx = await txDB.fetchTransaction(txId)
  // console.log(tx)
  putBalance('alice')


  // tx.txOuts.forEach((txOut, index) => {
  //   const payType = guessScript(txOut.script)
  //   if (!payType) {
  //     return
  //   }

  //   tb.addInput(txId, index)
  // })
  // tb.addOutput(bob.toAddress(), 10)
  // tb.sign(0, bc.ECPair.fromWIF(alice.toWIF(), bc.networks.testnet))
  // const sampleHex = tb.build().toHex()
  // const sampleTx = Transaction.fromHex(sampleHex)
  // console.log(sampleTx)

  // const sendId = await cl.sendRawTransaction(sampleTx.toHex())


  // // console.log(decodeTransaction(Buffer.from(txHex, 'hex')))

  // console.log('bob has', await cl.getBalance('bob'))

  // const tx = await txDB.fetchTransaction(txId)
  // // console.log(TxDB.myTxos(tx))
  // // const sendTxHex = sendToP2PKH(
  // //   alice,
  // //   {hash: txId, index: 0, ...tx.txOuts[0]},
  // //   bob.toAddress(),
  // //   0.00000001
  // // )
  // // const sendTx = new Transaction(sendTxHex)
  // // console.log(sendTx)

  // // await cl.sendRawTransaction(sendTxHex.toString('hex'))
  // // await cl.generate(1)
  // console.log('bob has', await cl.getBalance('bob'))

  // const sendTxId = await cl.sendFrom('alice', bob.toAddress(), 10)
  // const rightTx = new Transaction(
  //   Buffer.from(await cl.getRawTransaction(sendTxId), 'hex')
  // )
  // console.log(rightTx)
  // await cl.generate(1)
  // console.log('bob has', await cl.getBalance('bob'))
}

testBitcoinCore().catch(err => console.error(err))
