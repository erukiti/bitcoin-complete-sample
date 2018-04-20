const {Keypair} = require('./keypair')
it('', () => {
  const kp = Keypair.fromWIF('cTfcEERMXjgHCXDxRwiEcGUiaQDa7PJRurAYG6orrtK3xqrvmaDD')
  console.log(kp)
  console.log(kp.toAddress())
  console.log(Keypair.fromWIF(kp.toAddress()))
})
