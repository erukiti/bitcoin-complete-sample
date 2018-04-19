const assert = require('assert')
const {randomBytes} = require('crypto')

const secp256k1 = require('secp256k1')

const {decodeBase58Check, encodeBase58Check} = require('./base58check')
const {hash160} = require('./hash')
const conf = require('../conf.json')

class Keypair {
  /**
   * 
   * @param {Buffer} key 
   * @param {object} opt 
   */
  constructor(key, opt = {}) {
    this.privateKey = null

    const setPrivateKey = () => {
      this.privateKey = key.slice(1, 33)
      let isCompressd
      if (key.length === 33) {
        this.isCompressd = false
      } else {
        assert(key.length === 34)
        assert(key[33] === 0x01)
        this.isCompressd = true
      }
      this.wif = key.slice(0, 1)
      this.publicKey = secp256k1.publicKeyCreate(this.privateKey, this.isCompressd)
    }

    assert(key instanceof Buffer)
    switch (key[0]) {
      case 0x80: {
        this.network = 'mainnet'
        setPrivateKey()        
        break
      }
      case 0xef: {
        this.network = 'testnet'
        setPrivateKey()        
        break
      }
      case 0x00: {
        this.network = 'mainnet'
        this.publicKey = key.slice(1)
        break
      }
      case 0x6f: {
        this.network = 'testnet'
        this.publicKey = key.slice(1)
        break
      }

      default: {
        console.error('unknown network')
      }
    }

    if (opt.network && this.network !== opt.network) {
      throw new Error(`Wrong network ${keu[0].toString(0)}: ${network}`)
    }

    this.pubkeyHash = Buffer.from([conf.networks[this.network].pubKeyHash])

    assert(this.privateKey === null || this.privateKey.length === 32)
  }

  /**
   * 
   * @param {string} wif 
   * @param {*} opt 
   */
  static fromWIF(wif, opt = {}) {
    return new Keypair(decodeBase58Check(wif), opt)
  }

  /**
   * 
   * @param {Buffer} pubkey 
   * @param {*} opt 
   */
  static fromPublicKey(pubkey, opt = {}) {
    assert(pubkey instanceof Buffer)
    switch (opt.network) {
      case 'mainnet': {
        return new Keypair(Buffer.concat([Buffer.from([0x00]), pubkey]), opt)
      }
      case 'testnet': {
        return new Keypair(Buffer.concat([Buffer.from([0x6f]), pubkey]), opt)
      }
      default: {
        throw new Error(`unknown network: ${opt.network}`)
      }
    }
  }

  /**
   * generate random key.
   * @param {string} opt.network 'mainnet' or 'testnet'
   */
  static generate(opt) {
    for (;;) {
      const privateKey = randomBytes(32) // 32バイト 256ビットの乱数
      if (secp256k1.privateKeyVerify(privateKey)) {
        switch (opt.network) {
          case 'mainnet': {
            return new Keypair(Buffer.concat([Buffer.from([0x80]), privateKey]), opt)
          }
          case 'testnet': {
            return new Keypair(Buffer.concat([Buffer.from([0xef]), privateKey]), opt)
          }
          default: {
            throw new Error(`unknown network: ${opt.network}`)
          }
        }
      }
    }
  }

  /**
   * @returns {boolean}
   */
  hasPrivateKey() {
    return this.privateKey instanceof Buffer
  }

  /**
   * @returns {Buffer}
   */
  toPublicKey() {
    return this.publicKey
  }

  /**
   * @returns {Buffer}
   */
  toPubkeyHash() {
    return Buffer.concat([this.pubkeyHash, hash160(this.publicKey)])
  }

  /**
   * @returns {string} public Bitcoin address
   */
  toAddress() {
    return encodeBase58Check(this.toPubkeyHash())
  }

  /**
   * @returns {string} private key WIF
   */
  toWIF() {
    const ar = [this.wif, this.privateKey]
    if (this.isCompressd) {
      ar.push(Buffer.from([this.isCompressd]))
    }
    return encodeBase58Check(Buffer.concat(ar))
  }
}

module.exports = {
  Keypair,
}
