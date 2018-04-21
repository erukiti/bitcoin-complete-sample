const {splitBytecode} = require('./split-bytecode')

it('', () => {
  expect(
    splitBytecode(
      Buffer.from('a9144cb06b9a9d506d71109a0da84647bc106df7a12187', 'hex')
    )
  ).toEqual([
    0xa9,
    Buffer.from('4cb06b9a9d506d71109a0da84647bc106df7a121', 'hex'),
    0x87,
  ])

  expect(
    splitBytecode(
      Buffer.from('76a9148faea84b90c599757497b69c14bf82a882a4193788ac', 'hex')
    )
  ).toEqual([
    0x76,
    0xa9,
    Buffer.from('8faea84b90c599757497b69c14bf82a882a41937', 'hex'),
    0x88,
    0xac,
  ])

  expect(
    splitBytecode(
      Buffer.from('6a76a9148faea84b90c599757497b69c14bf82a882a4193788ac', 'hex')
    )
  ).toEqual([
    0x6a,
    Buffer.from('76a9148faea84b90c599757497b69c14bf82a882a4193788ac', 'hex'),
  ])
})
