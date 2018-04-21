const {randomBytes} = require('crypto')
const secp256k1 = require('secp256k1')

/**
 * 乱数を使って秘密鍵を生成する
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

/**
 * 秘密鍵から公開鍵を生成する
 * @param {Buffer} privateKey 
 */
const generatePublicKey = privateKey => {
  return secp256k1.publicKeyCreate(privateKey)
}

const priv = generatePrivateKey()
const pub = generatePublicKey(priv)

console.log(priv.toString('hex'))
console.log(pub.toString('hex'))
