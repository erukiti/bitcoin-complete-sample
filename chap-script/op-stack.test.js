const { registerOpStack } = require('./op-stack')

const table = []
registerOpStack(table)

describe('', () => {
  it('', () => {
    const stack = [1]
    const altStack = []
    expect(table[0x6b](null, stack, altStack)).toEqual(0)
    expect(stack).toEqual([])
    expect(altStack).toEqual([1])
  })
  
  it('', () => {
    const stack = []
    const altStack = []
    expect(() => table[0x6b](null, stack, altStack)).toThrowError()
  })
})

describe('', () => {
  it('', () => {
    const stack = []
    const altStack = [1]
    expect(table[0x6c](null, stack, altStack)).toEqual(0)
    expect(stack).toEqual([1])
    expect(altStack).toEqual([])
  })
  
  it('', () => {
    const stack = []
    const altStack = []
    expect(() => table[0x6c](null, stack, altStack)).toThrowError()
  })
})

describe('', () => {
  it('', () => {
    const stack = [0]
    expect(table[0x73](null, stack)).toEqual(0)
    expect(stack).toEqual([0])
  })

  it('', () => {
    const stack = [1]
    expect(table[0x73](null, stack)).toEqual(0)
    expect(stack).toEqual([1, 1])
  })

  it('', () => {
    const stack = []
    expect(() => table[0x73](null, stack)).toThrowError()
  })
})