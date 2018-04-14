const { decodeVarStr, encodeVarStr } = require('./var-str')

const code = s => s.charCodeAt(0)

describe('varstr', () => {
  it('decode', () => {
    expect(decodeVarStr(Buffer.from('\x04hoge', 'binary'))).toEqual(['hoge', 5])
  })

  it('encode', () => {
    expect(encodeVarStr('hoge')).toEqual(Buffer.concat([Buffer.from([4]), Buffer.from('hoge')]))
  })
})