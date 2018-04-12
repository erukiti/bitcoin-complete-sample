const assert = require('assert')

const registerOpArithmetic = table => {
  table[0x8b] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(stack.pop() + 1)
    return 0
  }

  table[0x8c] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(stack.pop() - 1)
    return 0
  }

  table[0x8f] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(stack.pop() * -1)
    return 0
  }

  table[0x90] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(Math.abs(stack.pop()))
    return 0
  }

  table[0x91] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(stack.pop() === 0 ? 1 : 0)
    return 0
  }

  table[0x92] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(stack.pop() === 0 ? 0 : 1)
    return 0
  }

  table[0x93] = (buf, stack) => {
    assert(stack.length >= 2)
    stack.push(stack.pop() + stack.pop())
    return 0
  }

  table[0x94] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    stack.push(b - a)
    return 0
  }

  table[0x9a] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    // FIXME
  }

  table[0x9b] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    // FIXME
  }

  table[0x9c] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    stack.push(a === b && typeof a === 'number') ? 1 : 0
    return 0
  }

  table[0x9d] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    if (a !== b || typeof a === 'number') {
      throw new Error('NUMEQUALVERIFY failed')
    }
    return 0
  }

  table[0x9f] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    stack.push(a < b ? 1 : 0)
    return 0
  }

  table[0xa0] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    stack.push(a > b ? 1 : 0)
    return 0    
  }

  table[0xa1] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    stack.push(a <= b ? 1 : 0)
    return 0
  }

  table[0xa2] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    stack.push(a >= b ? 1 : 0)
    return 0
  }

  table[0xa3] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    stack.push(Math.min(a, b))
    return 0
  }

  table[0xa4] = (buf, stack) => {
    assert(stack.length >= 2)
    const b = stack.pop()
    const a = stack.pop()
    stack.push(Math.max(a, b))
    return 0
  }

  table[0xa5] = (buf, stack) => {
    assert(stack.length >= 3)
    const max = stack.pop()
    const min = stack.pop()
    const a = stack.pop()
    stack.push(min <= a && a < max ? 1 : 0)
    return 0
  }
}

module.exports = {
  registerOpArithmetic
}
