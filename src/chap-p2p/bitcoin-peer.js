const assert = require('assert')
const {EventEmitter} = require('events')
const net = require('net')

const {conf} = require('../')

const {PacketEncoder} = require('../chap-encode/packet-encoder')
const {PacketDecoder} = require('../chap-encode/packet-decoder')

const {decodeHeader, encodeHeader} = require('./packet/header')
const {decodeVersion, encodeVersion} = require('./packet/version')
const {decodeSendcmpct} = require('./packet/sendcmpct')
const {decodePing, encodePing} = require('./packet/ping')
const {decodeAddr} = require('./packet/addr')
const {decodeFeefilter} = require('./packet/feefilter')
const {decodeInv, encodeInv} = require('./packet/inv')
const {decodeBlock} = require('./packet/block')
const {encodeGetheaders} = require('./packet/getheaders')
const {decodeHeaders} = require('./packet/headers')
const {encodeGetblocks} = require('./packet/getblocks')

const {TxDB} = require('./txdb')

const nop = () => ({})
const payloadDecoders = {
  version: decodeVersion,
  verack: nop,
  ping: decodePing,
  pong: decodePing,
  sendheaders: nop,
  sendcmpct: decodeSendcmpct,
  addr: decodeAddr,
  feefilter: decodeFeefilter,
  inv: decodeInv,
  getdata: decodeInv,
  block: decodeBlock,
  headers: decodeHeaders,
}

const payloadEncoders = {
  version: encodeVersion,
  verack: nop,
  ping: encodePing,
  pong: encodePing,
  inv: encodeInv,
  getdata: encodeInv,
  getheaders: encodeGetheaders,
  getblocks: encodeGetblocks,
}

const HEADER_LENGTH = 4 + 12 + 4 + 4

class BitcoinPeer {
  constructor() {
    this._ev = new EventEmitter()

    console.log(conf)

    this._magic = 0xdab5bffa
    this._host = '127.0.0.1'
    this._port = conf.port

    this._conenct = new Promise((resolve, reject) => {
      this._socket = net.connect(this._port, this._host)
      this._socket.on('connect', () => {
        console.log('connected.')
        resolve()
      })
      this._socket.on('close', hadError =>
        console.log('closed', hadError ? 'error' : '')
      )

      let buf = Buffer.from([])
      this._socket.on('data', data => {
        // console.log('received:', buf.length, data.length)
        buf = Buffer.concat([buf, data])

        while (buf.length >= HEADER_LENGTH) {
          const header = decodeHeader(
            new PacketDecoder(buf.slice(0, HEADER_LENGTH))
          )

          if (buf.length < HEADER_LENGTH + header.payloadLength) {
            return
          }

          if (!(header.command in payloadDecoders)) {
            console.log(
              `#unknown: ${header.command}`,
              buf
                .slice(HEADER_LENGTH, HEADER_LENGTH + header.payloadLength)
                .toString('hex')
            )
            // process.exit(0)
          } else {
            console.log('#received:', header.command)
            const decoder = new PacketDecoder(
              buf.slice(HEADER_LENGTH, HEADER_LENGTH + header.payloadLength)
            )
            const payload = payloadDecoders[header.command](decoder)
            this._ev.emit(`command-${header.command}`, payload)
          }

          buf = buf.slice(HEADER_LENGTH + header.payloadLength)
        }
      })
    })
  }

  /**
   * connectを待つPromise
   * @returns {Promise<void>}
   */
  async connect() {
    return this._conenct
  }

  /**
   * Peerからコマンドが送られてきた時のコマンド処理を登録する
   * @param {string} command
   * @param {コールバック関数} cb 引数はデコード済みのオブジェクト
   */
  onCommand(command, cb) {
    this._ev.on(`command-${command}`, cb)
  }

  /**
   * Peerにコマンドを送信する
   * @param {string} command コマンド
   * @param {Bugger} payload コマンドに付随するペイロード
   */
  send(command, payload = {}) {
    assert(command in payloadEncoders, `unknown Encoder: ${command}`)

    console.log('#send:', command)

    const _encodePayload = (command, payload) => {
      const encoder = new PacketEncoder()
      payloadEncoders[command](encoder, payload)
      return encoder.build()
    }
    const _encodeHeader = (command, payload) => {
      const encoder = new PacketEncoder()
      encodeHeader(encoder, {magic: this._magic, command, payload})
      return encoder.build()
    }

    const payloadBuf = _encodePayload(command, payload)
    const header = _encodeHeader(command, payloadBuf)
    // console.log(header.toString('hex'))
    // console.log(payloadBuf.toString('hex'))
    this._socket.write(header)
    this._socket.write(payloadBuf)
  }
}

module.exports = {
  BitcoinPeer,
}
