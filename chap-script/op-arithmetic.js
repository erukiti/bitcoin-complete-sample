const assert = require('assert')

const registerOpArithmetic = table => {
  table.push({
    opCode: 0x8b,
    mnemonic: ['1ADD'],
    func: ({ stack }) => {
      assert(stack.length >= 1)
      stack.push(stack.pop() + 1)
    }
  })

  table.push({
    opCode: 0x8c,
    mnemonic: ['1SUB'],
    func: ({ stack }) => {
      assert(stack.length >= 1)
      stack.push(stack.pop() - 1)
      return 0
    }
  })

  table.push({
    opCode: 0x8f,
    mnemonic: ['NEGATE'],
      func: ({ stack }) => {
      assert(stack.length >= 1)
      stack.push(stack.pop() * -1)
      return 0
    }
  })

  table.push({
    opCode: 0x90,
    mnemonic: ['ABS'],
    func: ({ stack }) => {
      assert(stack.length >= 1)
      stack.push(Math.abs(stack.pop()))
      return 0
    }
  })

  table.push({
    opCode: 0x91,
    mnemonic: ['NOT'],
    func: ({ stack }) => {
      assert(stack.length >= 1)
      stack.push(stack.pop() === 0 ? 1 : 0)
      return 0
    }
  })

  table.push({
    opCode: 0x92,
    mnemonic: ['0NOTEQUAL'],
    func: ({ stack }) => {
      assert(stack.length >= 1)
      stack.push(stack.pop() === 0 ? 0 : 1)
      return 0
    }
  })

  table.push({
    opCode: 0x93,
    mnemonic: ['ADD'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      stack.push(stack.pop() + stack.pop())
      return 0
    }
  })

  table.push({
    opCode: 0x94,
    mnemonic: ['SUB'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      stack.push(b - a)
      return 0
    }
  })

  table.push({
    opCode: 0x9a,
    mnemonic: ['BOOLAND'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      // FIXME
    }
  })

  table.push({
    opCode: 0x9b,
    mnemonic: ['BOOLOR'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      // FIXME
    }
  })

  table.push({
    opCode: 0x9c,
    mnemonic: ['NUMEQUAL'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      stack.push(a === b && typeof a === 'number') ? 1 : 0
      return 0
    }
  })

  table.push({
    opCode: 0x9d,
    mnemonic: ['NUMEQUALVERIFY'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      if (a !== b || typeof a === 'number') {
        throw new Error('NUMEQUALVERIFY failed')
      }
      return 0
    }
  })

  table.push({
    opCode: 0x9f,
    mnemonic: ['LESSTHAN'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      stack.push(a < b ? 1 : 0)
      return 0
    }
  })

  table.push({
    opCode: 0xa0,
    mnemonic: ['GREATERTHAN'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      stack.push(a > b ? 1 : 0)
      return 0    
    }
  })

  table.push({
    opCode: 0xa1,
    mnemonic: ['LESSTHANOREQUAL'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      stack.push(a <= b ? 1 : 0)
      return 0
    }
  })

  table.push({
    opCode: 0xa2,
    mnemonic: ['GREATERTHANOREQUAL'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      stack.push(a >= b ? 1 : 0)
      return 0
    }
  })

  table.push({
    opCode: 0xa3,
    mnemonic: ['MIN'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      stack.push(Math.min(a, b))
      return 0
    }
  })

  table.push({
    opCode: 0xa4,
    mnemonic: ['MAX'],
    func: ({ stack }) => {
      assert(stack.length >= 2)
      const b = stack.pop()
      const a = stack.pop()
      stack.push(Math.max(a, b))
      return 0
    }
  })

  table.push({
    opCode: 0xa5,
    mnemonic: ['WITHIN'],
    func: ({ stack }) => {
      assert(stack.length >= 3)
      const max = stack.pop()
      const min = stack.pop()
      const a = stack.pop()
      stack.push(min <= a && a < max ? 1 : 0)
      return 0
    }
  })
}

module.exports = {
  registerOpArithmetic
}
