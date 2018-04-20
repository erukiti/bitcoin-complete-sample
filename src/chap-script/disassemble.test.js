const {disassebleBytecode, disassebleOpCode} = require('./disassemble')

it('', () => {
  expect(
    disassebleBytecode(
      Buffer.from('a9144cb06b9a9d506d71109a0da84647bc106df7a12187', 'hex')
    )
  ).toEqual([
    'OP_HASH160',
    Buffer.from('4cb06b9a9d506d71109a0da84647bc106df7a121', 'hex'),
    'OP_EQUAL',
  ])
})

it('', () => {
  expect(disassebleOpCode(0xa9)).toEqual('OP_HASH160')
  expect(disassebleOpCode(0x87)).toEqual('OP_EQUAL')
})
