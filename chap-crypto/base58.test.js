const { base58Encode } = require('./base58')

describe('base58 encoding', () => {
  it('encoding', () => {
    const res = base58Encode(
      '00010966776006953D5567439E5E39F86A0D273BEED61967F6'
    )
    expect(res).toBe('16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM')
  })
})
