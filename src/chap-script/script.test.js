const {Script} = require('./script')

describe('Script', () => {
  it('Script.fromHex', () => {
    const hex = 'a9144cb06b9a9d506d71109a0da84647bc106df7a12187'
    const script = Script.fromHex(hex)
    expect(script.toASM()).toEqual('OP_HASH160 4cb06b9a9d506d71109a0da84647bc106df7a121 OP_EQUAL')
    expect(script.getChunks()).toEqual([
      'OP_HASH160',
      '4cb06b9a9d506d71109a0da84647bc106df7a121',
      'OP_EQUAL'
    ])
    expect(script.toBuffer()).toEqual(Buffer.from(hex, 'hex'))
    expect(script.toHex()).toEqual(hex)
  })

  it('Scrpit.asm', () => {
    const buf = Buffer.from('4cb06b9a9d506d71109a0da84647bc106df7a121', 'hex')
    const script = Script.asm`OP_HASH160 ${buf} OP_EQUAL`
    expect(script.toHex()).toEqual('a9144cb06b9a9d506d71109a0da84647bc106df7a12187')
  })
})