const assert = require('assert')

const registerOpStack = table => {
  table[0x6b] = (buf, stack, altStack) => {
    assert(stack.length > 0)
    altStack.push(stack.pop())
    return 0
  }
  table[0x6c] = (buf, stack, altStack) => {
    assert(altStack.length > 0)
    stack.push(altStack.pop())
    return 0
  }
  table[0x73] = (buf, stack) => {
    assert(stack.length >= 1)
    const peek = stack[stack.length - 1]
    if (peek) {
      stack.push(peek)
    }
    return 0
  }
  table[0x75] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.pop()
    return 0
  }
  
  table[0x6d] = (buf, stack) => {
    assert(stack.length >= 2)
    stack.pop()
    stack.pop()
    return 0
  }

  table[0x76] = (buf, stack) => {
    assert(stack.length >= 1)
    stack.push(stack[stack.length - 1])
    return 0
  }

  table[0x77] = (buf, stack) => {
    assert(stack.length >= 2)
    const a = stack.pop()
    stack.pop() // DROP
    stack.push(a)
    return 0
  }

  table[0x78] = (buf, stack) => {
    assert(stack.length >= 2)
    const peak = stack[stack.length - 2]
    stack.push(peak)
    return 0
  }

  table[0x79] = (buf, stack) => {
    assert(stack.length >= 1)
    const index = stack.pop()
    stack.push(stack.length - 1 - index)
    return 0
  }

  table[0x7a] = (buf, stack) => {
    assert(stack.length >= 1)
    const index = stack.pop()
    assert(stack.length >= 1 + index)
    const removed = stack.splice(stack.length - 1 - index, 1)
    stack.push(remove[0])
    return 0
  }

  table[0x7b] = (buf, stack) => {
    assert(stack.length >= 3)
    const removed = stack.splice(stack.length - 3, 1)
    stack.push(removed[0])
    return 0
  }

  table[0x7c] = (buf, stack) => {
    assert(stack.length >= 2)
    const top = stack.pop()
    const second = stack.pop()
    stack.push(top)
    stack.push(second)
    return 0
  }

  table[0x7d] = (buf, stack) => {
    assert(stack.length >= 2)
    const top = stack.pop()
    const second = stack.pop()
    stack.push(top)
    stack.push(second)
    stack.push(top)
    return 0
  }

  table[0x6e] = (buf, stack) => {
    assert(stack.length >= 3)
    const top = stack[stack.length - 1]
    const second = stack[stack.length - 2]
    stack.push(second)
    stack.push(top)
    return 0
  }

  table[0x6f] = (buf, stack) => {
    assert(stack.length >= 4)
    const top = stack[stack.length - 1]
    const second = stack[stack.length - 2]
    const third = stack[stack.length - 3]
    stack.push(third)
    stack.push(second)
    stack.push(top)
    return 0
  }

  table[0x70] = (buf, stack) => {
    assert(stack.length >= 5)
    const toTop = stack[stack.length - 3]
    const toSecond = stack[stack.length - 4]
    stack.push(toSecond)
    stack.push(toTop)
    return 0
  }

  table[0x71] = (buf, stack) => {
    assert(stack.length >= 6)
    const removed = stack.splice(stack.length - 6, 2)
    stack.push(remove[0])
    stack.push(remove[1])
    return 0
  }

  table[0x72] = (buf, stack) => {
    assert(stack.length >= 4)
    const removed = stack.splice(stack.length - 4, 2)
    stack.push(removed[0])
    stack.push(removed[1])
    return 0
  }
}

module.exports = {
  registerOpStack
}