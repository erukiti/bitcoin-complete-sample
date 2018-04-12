const { decodeVarStr, encodeVarStr } = require('./var-str')

const code = s => s.charCodeAt(0)

describe('varstr', () => {
  it('decode', () => {
    expect(decodeVarStr(Buffer.from('\x04hoge', 'binary'))).toEqual(['hoge', 5])
  })

  it('encode', () => {
    expect(encodeVarStr('hoge')).toEqual(Buffer.concat([new Buffer([4]), new Buffer('hoge')]))
  })
})