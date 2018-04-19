const assert = require('assert')

const Client = require('bitcoin-core')
const secp256k1 = require('secp256k1')

const bc = require('bitcoinjs-lib')

const {Script} = require('./chap-script/script')
const {Transaction} = require('./chap-transaction')
const {TxDB} = require('./chap-transaction/txdb')
const {guessScript} = require('./chap-script/unlock')

const {execRegtest} = require('./chap-bitcoin/exec-regtest')
const conf = require('./conf.json')
const {decodeTransaction} = require('./chap-transaction/decode-transaction')
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
  network: 'testnet',
  username: conf.user,
  password: conf.pass,
  port: conf.rpcport,
})

const createAccount = async name => {
  const kp = Keypair.generate({network: 'testnet'})
  console.log(kp.toAddress())
  // keys.push(kp)
  // await cl.importPrivKey(kp.toWIF())
  // console.log(name, kp.toAddress())
  // await cl.setAccount(kp.toAddress(), name)
  return kp
}

const txDB = new TxDB({
  txFetcher: async txId => {
    const txHex = await cl.getRawTransaction(txId)
    return Transaction.fromHex(txHex)
  },
  blockFetcher: async blockId => {
    const blockHex = await cl.getBlock(blockId, 0)
    return Block.fromHex(blockHex)
  }
})

const sendToP2PKH = (utxo, address, value) => {
  const txIns = [
    {
      hash: utxo.hash,
      index: utxo.index,
      sequence: 0xfffffffe,
      script: utxo.script,
    },
  ]
  const sendHash = Keypair.fromWIF(address).toPubkeyHash()
  const txOuts = [
    {
      value: BTC.fromBTC(49.99999),
      script: Script.asm`OP_DUP OP_HASH160 ${sendHash} OP_EQUALVERIFY OP_CHECKSIG`,
    }
  ]

  const tmpTx = Transaction.encode({txIns, txOuts, version: 2})
  // console.log(tmpTx)

  const sigHash = hash256(tmpTx.toBuffer())
  const sign = Buffer.concat([
    secp256k1.signatureExport(secp256k1.sign(sigHash, utxo.key.privateKey).signature),
    Buffer.from([0x01, 0, 0, 0])
  ])
  txIns[0].script = Script.asm`${sign}`
  return encodeTransaction({txIns, txOuts, version: 2})
}

const putBalance = async name => {
  console.log(name, await cl.getBalance(name))
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

const testBitcoinCore = async () => {
  await execRegtest()

  await generate(1)

  const alice = await createAccount('alice')
  // const bob = await createAccount('bob')

  const utxos = txDB.searchTransaction(keys)

  await generate(100)

  const sendTx = sendToP2PKH(utxos[0], alice.toAddress(), 10)
  console.log(1, Transaction.fromBuffer(sendTx))

  // const a = bc.ECPair.fromWIF(utxos[0].key.toWIF(), bc.networks.testnet)
  
  // const txb = new bc.TransactionBuilder({network: bc.networks.testnet})
  // txb.addInput(utxos[0].hash, utxos[0].index)
  // console.log(a.getAddress())
  // txb.addOutput(a.getAddress(), 49.9999)
  // txb.sign(0, a)
  // console.log(2, txb.build().toHex())



  // console.log(await cl.sendRawTransaction(sendTx.toString('hex')))

  putBalance('alice')

  const txId = await cl.sendToAddress(alice.toAddress(), 40)
  await cl.generate(1)
  console.log(txId)
  const tx = await txDB.fetchTransaction(txId)
  console.log(tx)

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
