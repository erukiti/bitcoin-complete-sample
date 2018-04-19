const {encodeBase58Check, decodeBase58Check} = require('./base58check')

describe('', () => {
  it('', () => {
    expect(
      decodeBase58Check('16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM').toString('hex')
    ).toEqual('00010966776006953d5567439e5e39f86a0d273bee')
  })

  it('', () => {
    expect(
      encodeBase58Check(
        Buffer.from('00010966776006953d5567439e5e39f86a0d273bee', 'hex')
      )
    ).toEqual('16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM')
  })
})
