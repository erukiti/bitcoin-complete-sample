const fs = require('fs')
const path = require('path')
const os = require('os')
const childPorcess = require('child_process')
const net = require('net')

const defaultConf = require('../conf.json')

const execRegtest = (opt = defaultConf) => {
  return new Promise((resolve, reject) => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'regtest-'))

    const params = [
      'bitcoind',
      '-regtest',
      `-datadir=${tmp}`,
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
      console.log('bitcoind stdout:', data.toString())
    })

    child.stderr.on('data', data => {
      console.log('bitcoind stderr:', data.toString())
    })

    child.on('close', code => {
      console.log(`bitcoind closed: ${code}`)
      process.exit(1)
    })

    const interval = setInterval(() => {
      const socket = net.connect(opt.port, '127.0.0.1')
      socket.on('connect', () => {
        clearInterval(interval)
        resolve()
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
