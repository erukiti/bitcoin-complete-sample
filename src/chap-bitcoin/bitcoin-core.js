const Client = require('bitcoin-core')

const conf = require('../conf.json')

const cl = new Client({
  network: 'testnet',
  username: conf.user,
  password: conf.pass,
  port: conf.rpcport,
})

const testBitcoinCore = async () => {
  console.log('#getBlockchainInfo')
  console.log(await cl.getBlockchainInfo())
  console.log()

  console.log('#generate 1')
  const firstBlockIds = await cl.generate(1)
  console.log()

  console.log('#getBlockchainInfo')
  console.log(await cl.getBlockchainInfo())
  console.log()

  console.log('#getBlock <BlockId>')
  const firstBlock = await cl.getBlock(firstBlockIds[0])
  console.log(firstBlock)
  const firstCoinbaseId = firstBlock.tx[0]
  console.log()

  console.log('#getRawTransaction <TxId>')
  const firstCoinbaseHex = await cl.getRawTransaction(firstCoinbaseId)
  console.log(firstCoinbaseHex)
  console.log()

  console.log('#decodeRawTransaction <TxHex>')
  const firstCoinbaseTx = await cl.decodeRawTransaction(firstCoinbaseHex)
  console.log(firstCoinbaseTx)
  console.log()

  console.log('#getNewAddress hoge 1')
  const address = await cl.getNewAddress('hoge')
  console.log(address)
  try {
    await cl.sendToAddress(address, 1)
  } catch (e) {
    console.log(e.code)
    console.log(e.message)
  }
  console.log()

  console.log('#generate 100')
  await cl.generate(100)
  console.log()

  console.log('#sendToAddress hoge 1')
  const sendTxId = await cl.sendToAddress(address, 1)
  console.log(sendTxId)
  console.log()

  console.log('#getRawTransaction <TxId>')
  const sendTxHex = await cl.getRawTransaction(sendTxId)
  console.log()

  console.log('#decodeRawTransaction <TxHex>')
  const sendTx = await cl.decodeRawTransaction(sendTxHex)
  console.log(sendTx)
  console.log()

  console.log('#getBalance hoge')
  console.log(await cl.getBalance('hoge'))
  console.log()

  console.log('#generate 1')
  await cl.generate(1)
  console.log()

  console.log('#getBalance hoge')
  console.log(await cl.getBalance('hoge'))
}

testBitcoinCore()
