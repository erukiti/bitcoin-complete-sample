const {base58Decode, base58Encode} = require('./base58')

describe('base58 encoding', () => {
  it('encode', () => {
    const res = base58Encode(
      Buffer.from('00010966776006953d5567439e5e39f86a0d273beed61967f6', 'hex')
    )
    expect(res).toBe('16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM')
  })

  it('decode', () => {
    const res = base58Decode('16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM')
    expect(res.toString('hex')).toBe('00010966776006953d5567439e5e39f86a0d273beed61967f6')
  })
})
