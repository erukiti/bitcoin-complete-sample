const Client = require('bitcoin-core')
export const wallet = (conf = require('../')) => {
  const cl = new Client({
    network: conf.network,
    username: conf.user,
    password: conf.pass,
    port: conf.rpcport,
  })
  
}
