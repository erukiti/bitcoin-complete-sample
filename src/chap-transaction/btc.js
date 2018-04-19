class BTC {
  constructor(satoshi) {
    this.satoshi = satoshi
  }

  static fromBTC(btc) {
    return new BTC(btc * 1000000000)
  }

  static fromSatoshi(satoshi) {
    return new BTC(satoshi)
  }

  static fromBuffer(buf) {
    return new BTC(buf.readUInt32LE(0) + buf.readUInt32LE(4) * 2 ** 32)
  }

  static fromHex(hex) {
    return BTC.fromBuffer(Buffer.from(hex, 'hex'))
  }

  toBuffer() {
    const buf = Buffer.alloc(8)
    buf.writeUInt32LE(this.satoshi % 2 ** 32 - 1, 0)
    buf.writeUInt32LE(this.satoshi / 2 ** 32 | 0, 4)
    return buf
  }

  toHex() {
    return this.toBuffer().toString('hex')
  }

  inspect() {
    return this.satoshi
  }
}

module.exports = {
  BTC
}
