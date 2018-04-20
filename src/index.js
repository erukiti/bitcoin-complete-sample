const networks = {
  mainnet: {
    pubkeyHash: Buffer.from('00', 'hex'),
    scriptHash: Buffer.from('05', 'hex'),
    wif: Buffer.from('80', 'hex'),
  },
  testnet: {
    pubkeyHash: Buffer.from('6f', 'hex'),
    scriptHash: Buffer.from('c4', 'hex'),
    wif: Buffer.from('ef', 'hex'),
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
