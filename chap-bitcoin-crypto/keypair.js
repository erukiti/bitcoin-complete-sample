const assert = require('assert')
const {randomBytes} = require('crypto')

const secp256k1 = require('secp256k1')

const {decodeBase58Check, encodeBase58Check} = require('./base58check')
const {hash160} = require('./hash')

class Keypair {
  constructor(opt) {
    this.version = opt.version || opt.network === 'testnet' ? 0xef : 0x80
    this.privateKey = opt.privateKey || null
    this.publicKey = opt.publicKey
    this.pubkeyHash = opt.network === 'testnet' ? 0x6f : 0x00
  }

  static fromWIF(wif, opt = {}) {
    const privBuf = decodeBase58Check(wif)
    let network
    const version = privBuf[0]

    switch (version) {
      case 0xef: {
        network = 'testnet'
        break
      }
      case 0x80: {
        network = 'mainnet'
        break
      }
    }
    const privateKey = privBuf.slice(1, 33)
    let isCompressd
    if (privBuf.length === 33) {
      isCompressd = false
    } else {
      assert(privBuf.length === 34)
      assert(privBuf[33] === 0x01)
      isCompressd = true
    }
    const publicKey = secp256k1.publicKeyCreate(privateKey, isCompressd)

    return new Keypair({privateKey, publicKey, version, network, ...opt})
  }

  static generate(opt) {
    for (;;) {
      const privateKey = randomBytes(32) // 32バイト 256ビットの乱数
      if (secp256k1.privateKeyVerify(privateKey)) {
        const publicKey = secp256k1.publicKeyCreate(privateKey)
        return new Keypair({privateKey, publicKey, ...opt})
      }
    }
  }

  hasPrivateKey() {
    return this.privateKey instanceof Buffer
  }

  getAddress() {
    const buf = Buffer.concat([
      Buffer.from([this.pubkeyHash]),
      hash160(this.publicKey)
    ])
    return encodeBase58Check(buf)
  }

  toWIF() {

  }
}

module.exports = {
  Keypair
}
