const crypto = require('crypto')
const alice = crypto.createECDH('secp256k1')
const bob = crypto.createECDH('secp256k1')
alice.generateKeys()
bob.generateKeys()

const createTx = (key, to, value, prevHash = null) => {
  const message = JSON.stringify({to, value, prevHash})
  const sha256 = crypto.createHash('sha256')
  sha256.update(message)
  const hash = sha256.digest('hex')
  const sign = key.encrypt(hash)

  return {
    message,
    hash,
    sign
  }
}

console.log(alice.getPrivateKey(), bob)
// console.log(createTx(alice, 'hoge', 1, 'fuga'))
console.log(crypto.privateEncrypto(alice.getPrivateKey(), Buffer.from('hoge')))
