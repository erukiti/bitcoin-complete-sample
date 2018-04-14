const assert = require('assert')
const {EventEmitter} = require('events')
const net = require('net')

const {decodeHeader, encodeHeader} = require('./packet/header')
const {decodeVersion} = require('./packet/version')
const {decodeSendcmpct} = require('./packet/sendcmpct')

// import { PayloadDecoder } from './payload-decoder'
// import { getChecksum } from './utils'
// import { headerPayloadCodecs, headerStruct } from './vstruct'

class BitcoinPeer {
  constructor() {
    this._magic = 0xdab5bffa
    this._host = '127.0.0.1'
    this._port = 18444

    this._socket = net.connect(this._port, this._host)
    this._ev = new EventEmitter()

    const HEADER_LENGTH = 4 + 12 + 4 + 4

    let buf = Buffer.from([])

    const headerPayloadCodecs = {
      version: decodeVersion,
      verack: () => {},
      ping: buf => buf.readUInt32LE(),
      sendheaders: () => {},
      sendcmpct: decodeSendcmpct,
    }
    
    this._socket.on('connect', () => console.log('connected'))
    this._socket.on('close', (hadError) => console.log('close', hadError))

    this._socket.on('data', data => {
      // console.log('received:', buf.length, data.length)
      buf = Buffer.concat([buf, data])

      while (buf.length >= HEADER_LENGTH) {
        const header = decodeHeader(buf.slice(0, HEADER_LENGTH))

        // console.log(header.command, header.payloadLength)
        if (buf.length < HEADER_LENGTH + header.payloadLength) {
          return
        }

        if (!(header.command in headerPayloadCodecs)) {
          console.log(
            `unknown: ${header.command}`,
            buf.slice(HEADER_LENGTH, HEADER_LENGTH + header.payloadLength).toString('hex')
          )
          process.exit(0)
        } else {
          // console.log(headerPayloadCodecs[header.command](buf.slice(HEADER_LENGTH, HEADER_LENGTH + header.payloadLength)))
          this._ev.emit(
            `command-${header.command}`,
            headerPayloadCodecs[header.command](buf.slice(HEADER_LENGTH, HEADER_LENGTH + header.payloadLength))
          )
        }

        buf = buf.slice(HEADER_LENGTH + header.payloadLength)
      }
    })
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
  send(command, payload = Buffer.alloc(0)) {
    const header = encodeHeader({magic: this._magic, command, payload})
    this._socket.write(header)
    this._socket.write(payload)
  }
}

module.exports = {
  BitcoinPeer
}
