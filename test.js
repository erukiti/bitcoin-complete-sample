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


const cl = new Client({
  network: 'testnet',
  username: conf.user,
  password: conf.pass,
  port: conf.rpcport,
})

const createAccount = async name => {
  const kp = Keypair.generate({network: 'testnet'})
  await cl.importPrivKey(kp.toWIF())
  console.log(name, kp.toAddress())
  await cl.setAccount(kp.toAddress(), name)
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
    console.log(blockId)
    return Block.fromHex(blockHex)
  }
})

const sendToP2PKH = (keypair, utxo, address, value) => {
  const txIns = [
    {
      hash: utxo.hash,
      index: utxo.index,
      sequence: 0xfffffffe,
      script: Buffer.from([]),
    },
  ]
  const sendHash = decodeBase58Check(address).slice(1)
  const txOuts = [
    {
      value: '80b89a3b00000000',
      script: Script.asm`OP_DUP OP_HASH160 ${sendHash} OP_EQUALVERIFY OP_CHECKSIG`,
    },
    {
      value: '00ca9a3b00000000',
      script: Buffer.from(
        '76a9144add84e847d80efd033a0e7201abc26e23ab1efe88ac',
        'hex'
      ),
    },
  ]

  const tmpTx = encodeTransaction(txIns, txOuts, {version: 2})
  const sigHash = hash256(tmpTx)
  const sign = secp256k1.sign(sigHash, keypair.privateKey).signature //secp256k1.signatureExport(
  // )
  txIns[0].script = Script.asm`${sign} ${keypair.publicKey}`
  return encodeTransaction(txIns, txOuts, {version: 2})
}

const putBalance = async name => {
  console.log(name, await cl.getBalance(name))
} 

const generate = async n => {
  const txs = []
  const blockIds = await cl.generate(n)
  for (let blockId of blockIds) {
    const block = await txDB.fetchBlock(blockId)
    console.log(block)
    console.log(await cl.getBlock(blockId))
  }
}

const testBitcoinCore = async () => {
  await execRegtest()

  await generate(1)

  const addr = await cl.getAccountAddress('')
  const wif = await cl.dumpPrivKey(addr)
  const myKey = Keypair.fromWIF(wif)
  console.log(myKey.toAddress(), myKey.toPublicKey().toString('hex'))

  const alice = await createAccount('alice')
  const bob = await createAccount('bob')


  txDB.searchTransaction(myKey)


  // putBalance('alice')

  // const txId = await cl.sendToAddress(alice.toAddress(), 40)
  // console.log(txId)
  // const tx = await txDB.fetchTransaction(txId)

  // putBalance('alice')


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
