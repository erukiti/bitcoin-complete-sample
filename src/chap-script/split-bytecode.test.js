const {splitBytecode} = require('./split-bytecode')

it('', () => {
  expect(splitBytecode(Buffer.from('a9144cb06b9a9d506d71109a0da84647bc106df7a12187', 'hex'))).toEqual([
    0xa9,
    Buffer.from('4cb06b9a9d506d71109a0da84647bc106df7a121', 'hex'),
    0x87
  ])
})
