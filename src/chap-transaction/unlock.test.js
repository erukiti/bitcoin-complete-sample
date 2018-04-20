const {Keypair} = require('../chap-bitcoin-crypto/keypair')
const {guessScript} = require('./unlock')
const {Script} = require('../chap-script/script')

describe('', () => {
  it('P2PKH', () => {
    const pubkeyHash = Buffer.from('c96ef570f93809e669c4e54792bf45596dd805d4', 'hex')
    const script = Script.asm`OP_DUP OP_HASH160 ${pubkeyHash} OP_EQUALVERIFY OP_CHECKSIG`
    expect(guessScript(script)).toEqual({
      type: 'P2PKH',
      pubkeyHash,
      address: 'KN5k7EDEQAd84qsUAx8sLeDG6RjxLqPVE'
    })
  })

  it('P2PK', () => {
    const pubkey = Buffer.from('030fce98f4f65e04eb587677d6b34d7e41888087bcba18e8b9b9f0113c80816b70', 'hex')
    const script = Script.asm`${pubkey} OP_CHECKSIG`
    expect(guessScript(script)).toEqual({
      type: 'P2PK',
      pubkey,
      address: 'n2aXLdGst5WhwZsmW5KqS67Z4QQS5kZsZv'
    })
  })
})