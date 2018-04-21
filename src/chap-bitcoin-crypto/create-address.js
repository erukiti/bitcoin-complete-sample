const {randomBytes} = require('crypto')
const secp256k1 = require('secp256k1')

const {hash160} = require('./hash')
const {encodeBase58Check} = require('./base58check')

/**
 * @returns {Buffer} 秘密鍵
 */
const generatePrivateKey = () => {
  for (;;) {
    const privateKey = randomBytes(32) // 32バイト 256ビットの乱数
    if (secp256k1.privateKeyVerify(privateKey)) {
      return privateKey
    }
  }
}

const generatePublicKey = privateKey => {
  return secp256k1.publicKeyCreate(privateKey)
}

const priv = generatePrivateKey()
const pub = generatePublicKey(priv)

console.log(
  'mainnet',
  encodeBase58Check(Buffer.concat([Buffer.from([0x00]), hash160(pub)]))
)
console.log(
  'testnet',
  encodeBase58Check(Buffer.concat([Buffer.from([0x6f]), hash160(pub)]))
)
