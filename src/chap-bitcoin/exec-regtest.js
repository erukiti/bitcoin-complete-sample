const fs = require('fs')
const path = require('path')
const os = require('os')
const childPorcess = require('child_process')
const net = require('net')

const {conf} = require('../')

/**
 * regtestモードでbitcoindを起動する
 * @param {object} opt オプションオブジェクト
 * @param {string} opt.datadir データディレクトリ。未指定ならテンポラリを作成して新規のブロックチェーンを作る
 * @param {number} opt.port P2P用通信ポート番号
 * @param {number} opt.rpcport JSON/RPC用通信ポート番号 
 * @param {string} opt.user JSON/RPC ユーザー名
 * @param {string} opt.pass JSON/RPC パスワード 
 * @returns {Promise<string>} 起動完了でデータディレクトリの名前が返る
 * @example
 * const app = async () => {
 *   const datadir = await execRegtest()
 *   console.log('datadir', datadir)
 * }
 */
const execRegtest = (opt = conf) => {
  return new Promise((resolve, reject) => {
    const datadir = opt.datadir || fs.mkdtempSync(path.join(os.tmpdir(), 'regtest-'))

    const params = [
      'bitcoind',
      '-regtest',
      `-datadir=${datadir}`,
      '-txindex',
      '-server',
      '-rest',
      `-port=${opt.port}`,
      `-rpcuser=${opt.user}`,
      `-rpcpassword=${opt.pass}`,
      `-rpcport=${opt.rpcport}`
    ]

    const child = childPorcess.exec(params.join(' '))
    child.stdout.on('data', data => {
      data.toString().trim().split('\n').forEach(line => {
        console.log('\x1b[32mbitcoind\x1b[m', line)
      })
    })

    child.stderr.on('data', data => {
      data.toString().trim().split('\n').forEach(line => {
        console.log('\x1b[32merror\x1b[m', line)
      })
    })

    child.on('close', code => {
      console.log(`bitcoind closed: ${code}`)
      process.exit(1)
    })

    const interval = setInterval(() => {
      const socket = net.connect(opt.port, '127.0.0.1')
      socket.on('connect', () => {
        clearInterval(interval)
        resolve(datadir)
      })
      socket.on('error', err => {
        if (err.code !== 'ECONNREFUSED') {
          console.log(err)
        }
      })
    }, 100)
  })
}

module.exports = {
  execRegtest
}
