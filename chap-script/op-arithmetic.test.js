const {registerOpArithmetic} = require('./op-arithmetic')
const {getAfterStack, createOpTable} = require('./utils')

const table = createOpTable(registerOpArithmetic)
const getOp = opCode => table.find(value => value.opCode === opCode)

describe('OP_1ADD', () => {
  const op1add = getOp(0x8b)
  it('mnemonic', () => {
    expect(op1add.mnemonic).toEqual(['1ADD'])
  })

  it('', () => {
    expect(getAfterStack(op1add.func, [0])).toEqual([1])
  })

  it('when stack underflow', () => {
    const stack = []
    expect(() => op1add.func({stack})).toThrowError()
  })
})

describe('OP_1SUBB', () => {
  const op1sub = getOp(0x8c)
  it('mnemonic', () => {
    expect(op1sub.mnemonic).toEqual(['1SUB'])
  })

  it('', () => {
    expect(getAfterStack(op1sub.func, [1])).toEqual([0])
  })

  it('', () => {
    const stack = []
    expect(() => op1sub.func({stack})).toThrowError()
  })
})

describe('OP_NEGATE', () => {
  const opNegate = getOp(0x8f)
  it('mnemonic', () => {
    expect(opNegate.mnemonic).toEqual(['NEGATE'])
  })

  it('', () => {
    expect(getAfterStack(opNegate.func, [1])).toEqual([-1])
    expect(getAfterStack(opNegate.func, [-1])).toEqual([1])
  })

  it('', () => {
    const stack = []
    expect(() => opNegate.func({stack})).toThrowError()
  })
})

describe('OP_ABS', () => {
  const opAbs = getOp(0x90)
  it('mnemonic', () => {
    expect(opAbs.mnemonic).toEqual(['ABS'])
  })

  it('', () => {
    expect(getAfterStack(opAbs.func, [1])).toEqual([1])
    expect(getAfterStack(opAbs.func, [-1])).toEqual([1])
  })

  it('', () => {
    const stack = []
    expect(() => opAbs.func({stack})).toThrowError()
  })
})

describe('OP_NOT', () => {
  const opNot = getOp(0x91)
  it('mnemonic', () => {
    expect(opNot.mnemonic).toEqual(['NOT'])
  })

  it('', () => {
    expect(getAfterStack(opNot.func, [0])).toEqual([1])
    expect(getAfterStack(opNot.func, [1])).toEqual([0])
    expect(getAfterStack(opNot.func, [2])).toEqual([0])
  })

  it('', () => {
    const stack = []
    expect(() => opNot.func({stack})).toThrowError()
  })
})

describe('OP_0NOTEQUAL', () => {
  const op0NOTEQUAL = getOp(0x92)
  it('mnemonic', () => {
    expect(op0NOTEQUAL.mnemonic).toEqual(['0NOTEQUAL'])
  })

  it('', () => {
    expect(getAfterStack(op0NOTEQUAL.func, [0])).toEqual([0])
    expect(getAfterStack(op0NOTEQUAL.func, [1])).toEqual([1])
    expect(getAfterStack(op0NOTEQUAL.func, [2])).toEqual([1])
  })

  it('', () => {
    const stack = []
    expect(() => op0NOTEQUAL.func({stack})).toThrowError()
  })
})


