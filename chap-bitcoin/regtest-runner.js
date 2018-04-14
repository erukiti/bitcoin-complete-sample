const port = 18444

const execBitcoind = () => {
  return new Promise((resolve, reject) => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'regtest-'))

    const child = childPorcess.exec(
      `bitcoind -regtest -datadir=${tmp} -txindex -server -rest -rpcuser=u -rpcpassword=p -rpcport=18443 -port=${port}`
    )
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

    setTimeout(() => resolve(), 2000)
  })
}

module.exports = {
  execBitcoind,
  port
}
