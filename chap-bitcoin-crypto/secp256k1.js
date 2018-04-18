const {sha256} = require('./hash')

const {randomBytes, createSign, createVerify} = require('crypto')
const secp256k1 = require('secp256k1')

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

const generatePublicKey = (privateKey) => {
  return secp256k1.publicKeyCreate(privateKey)
}

const priv = generatePrivateKey()
const pub = generatePublicKey(priv)

// const sign = createSign('sha256')
// sign.update('hogehogehoge')
// const signed = sign.sign(priv)
// console.log(signed)

// const verify = createVerify('sha256')
// verify.update('hogehogehoge')
// console.log(verify.verify(pub, signed))

// const msg = randomBytes(32)
// const sigObj = secp256k1.sign(msg, privKey)

// // verify the signature
// console.log(secp256k1.verify(msg, sigObj.signature, pubKey))

