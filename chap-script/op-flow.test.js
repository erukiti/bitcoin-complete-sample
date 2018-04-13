const { registerOpFlow } = require('./op-flow')

const table = []
registerOpFlow(table)

it('', () => {
  // const stack = [1]
  // expect(table[0x61](null, stack)).toEqual(0)
  // expect(() => table[0x6a](null, stack)).toThrowError('RETURN')
  // expect(table[0x69](null, stack)).toEqual(0)
  // expect(stack).toEqual([])
})

it('', () => {
  // const stack = []
  // expect(() => table[0x69](null, stack)).toThrowError('VERIFY FAILED')
})

it('', () => {
  // const stack = [0]
  // expect(() => table[0x69](null, stack)).toThrowError('VERIFY FAILED')
})
