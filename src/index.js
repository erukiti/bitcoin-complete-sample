const networks = {
  mainnet: {
    pubkeyHash: Buffer.from('00', 'hex'),
    scriptHash: Buffer.from('05', 'hex'),
    wif: Buffer.from('80', 'hex'),
    genesisBlock: Buffer.from('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f', 'hex')
  },
  testnet: {
    pubkeyHash: Buffer.from('6f', 'hex'),
    scriptHash: Buffer.from('c4', 'hex'),
    wif: Buffer.from('ef', 'hex'),
    genesisBlock: Buffer.from('000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943', 'hex')
  },
}

const defaultConf = {
  rpcport: 18443,
  port: 18444,
  user: 'u',
  pass: 'p',
  network: 'testnet'
}

const conf = {
  ...defaultConf,
  ...networks[defaultConf.network]
}

module.exports = {
  conf,
  networks
}
