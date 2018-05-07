const assert = require('assert')

const Client = require('bitcoin-core')
const secp256k1 = require('secp256k1')

const bitcoin = require('bitcoinjs-lib')

const {Script} = require('../chap-script/script')
const {Transaction} = require('./transaction')
const {TxDB} = require('../chap-p2p/txdb')

const {execRegtest} = require('../chap-bitcoin/exec-regtest')
const {conf, logger} = require('../')
const {Keypair} = require('../chap-bitcoin-crypto/keypair')

const {hash256} = require('../chap-bitcoin-crypto/hash')

const {decodeBase58Check} = require('../chap-bitcoin-crypto/base58check')

const {Block} = require('../chap-block/block')
const {BTC} = require('./btc')

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
  console.log(`${name}:`, kp.toAddress())
  return kp
}

const txDB = new TxDB({
  txFetcher: async txId => {
    const txHex = await cl.getRawTransaction(txId)
    const txBuf = Buffer.from(txHex, 'hex')
    const tx = Transaction.fromHex(txHex)
    return tx
  },
  blockFetcher: async blockId => {
    const blockHex = await cl.getBlock(blockId, 0)
    return Block.fromHex(blockHex)
  },
})

/**
 * ブロックを生成（マイニング）する
 * txDBにブロック情報とトランザクション情報を納める
 * @param {number} n ブロック生成数
 * @returns {Promise<void>}
 */
const generate = async n => {
  const blockIds = await cl.generate(n)
  for (let blockId of blockIds) {
    const b = await txDB.fetchBlock(blockId)
    // console.log(b.txIds)

    for (let txId of b.txIds) {
      // console.log(txId)
      const tx2 = await txDB.fetchTransaction(txId)
      // console.log(tx2)
      const tx = await cl.getTransaction(txId)
      // console.log(tx)
      for (let detail of tx.details) {
        const wif = await cl.dumpPrivKey(detail.address)
        keys.push(Keypair.fromWIF(wif))
      }
    }
  }
  return blockIds
}

const sendTransaction = async (senderKeys, address, value, locktime = 0) => {
  const utxos = txDB.getUtxos(senderKeys)

  const utxo = utxos[0]
  console.log('utxo', utxo)

  const txIns = [{
    hash: utxo.hash,
    index: utxo.index,
    sequence: 0xffffffff,
    script: utxo.script,
  }]
  const fee = BTC.fromSatoshi(10000)
  const kickback = BTC.fromSatoshi(
    utxo.value.toSatoshi() - value.toSatoshi() - fee.toSatoshi()
  )

  const sendHash = decodeBase58Check(address).slice(1)
  const txOuts = [{
    value,
    script: Script.asm`OP_DUP OP_HASH160 ${sendHash} OP_EQUALVERIFY OP_CHECKSIG`,
  }]

  if (kickback.toSatoshi() > 0) {
    txOuts.push({
      value: kickback,
      script: Script.asm`OP_DUP OP_HASH160 ${utxo.key.toPubkeyHash()} OP_EQUALVERIFY OP_CHECKSIG`,
    })
  }

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
  const sendTx = Transaction.encode({txIns, txOuts, version: 2, locktime})
  logger.debug(sendTx)
  const sendTxId = await cl.sendRawTransaction(sendTx.toHex())
  txDB.fetchTransaction(sendTxId)
  logger.info(`send ${value.toBTC()} BTC to ${address}`)
  logger.info(sendTxId)
  return sendTxId
}

const sendToP2PKH = (address) => {
  const utxos = txDB.getUtxos(keys)
  const utxo = utxos[0]

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
      value: BTC.fromBTC(49.9999),
      script: Script.asm`OP_DUP OP_HASH160 ${sendHash} OP_EQUALVERIFY OP_CHECKSIG`,
    }
  ]

  const tmpTx = Transaction.encode({txIns, txOuts, version: 2})
  // console.log(tmpTx)

  const sigHash = hash256(Buffer.concat([tmpTx.toBuffer(), Buffer.from([1,0,0,0])]))
  const sign = Buffer.concat([
    secp256k1.signatureExport(secp256k1.sign(sigHash, utxo.key.privateKey).signature),
    Buffer.from([0x01])
  ])
  txIns[0].script = Script.asm`${sign}`
  const sendTx = Transaction.encode({txIns, txOuts, version: 2})
  console.log(sendTx)
  return sendTx.toHex()
}

const putInfo = async () => {
  logger.info('block height', (await cl.getBlockchainInformation()).blocks)
  const bufferedTxs = Object.keys(await cl.getMemoryPoolContent())
  if (bufferedTxs) {
    logger.info('Tx without blockchain:', bufferedTxs)
  }
  const getBalance = async name => `${name} has ${await cl.getBalance(name)}. `
  logger.info(await getBalance('alice'), await getBalance('bob'), await getBalance('charlie'))
}

const testBitcoinCore = async () => {
  await execRegtest()

  const alice = await createAccount('alice')
  const bob = await createAccount('bob')
  const charlie = await createAccount('charlie')

  const blockId = await generate(1)
  console.log(blockId)
  await generate(100)


  // const txHex = await sendToP2PKH(alice.toAddress())

  // const txId = await cl.sendToAddress(alice.toAddress(), 49.9999)
  // const txHex2 = await cl.getRawTransaction(txId)
  // console.log(await cl.decodeRawTransaction(txHex2))

  // console.log(txHex)
  // console.log(await cl.sendRawTransaction(txHex))
  await sendTransaction(keys, alice.toAddress(), BTC.fromBTC(40))

  await putInfo()

  await generate(1)
  await putInfo()

  // await sendTransaction([alice], bob.toAddress(), BTC.fromBTC(20))
  // await generate(1)
  // await putInfo()

}

testBitcoinCore().catch(err => console.error(err))
