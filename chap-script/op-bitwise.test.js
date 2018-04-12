const { registerOpBitwise } = require('./op-bitwise')

const table = []
registerOpBitwise(table)

it('', () => {
  const stack = [1, 1]
  expect(table[0x87](null, stack)).toEqual(0)
  expect(stack).toEqual([1])
})

it('', () => {
  const stack = [0, 1]
  expect(table[0x87](null, stack)).toEqual(0)
  expect(stack).toEqual([0])
})

it('', () => {
  const stack = [1, 1]
  expect(table[0x88](null, stack)).toEqual(0)
  expect(stack).toEqual([])
})

it('', () => {
  const stack = [0, 1]
  expect(() => table[0x88](null, stack)).toThrowError('OP_EQUALVERIFY failed')
})

