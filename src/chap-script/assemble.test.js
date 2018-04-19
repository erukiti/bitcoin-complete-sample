const {asm} = require('./assembele')

it('', () => {
  const buf = Buffer.from('001122', 'hex')
  expect(
    asm`OP_DUP OP_HASH160 ${buf} OP_CHECKSIG OP_EQUAL`.toString('hex')
  ).toEqual('76a903001122ac87')
})
