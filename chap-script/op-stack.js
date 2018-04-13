const assert = require('assert')

const registerOpStack = table => {
  table.push({
    opCode: 0x6b,
    mnemonic: ['TOALTSTACK'],
    func: ({stack, altStack}) => {
      assert(stack.length > 0)
      altStack.push(stack.pop())
    }
  })
  table.push({
    opCode: 0x6c,
    mnemonic: ['FROMALTSTACK'],
    func: ({stack, altStack}) => {
      assert(altStack.length > 0)
      stack.push(altStack.pop())
    }
  })
  table.push({
    opCode: 0x73,
    mnemonic: ['IFDUP'],
    func: ({stack}) => {
      assert(stack.length >= 1)
      const peek = stack[stack.length - 1]
      if (peek) {
        stack.push(peek)
      }
    }
  })
  table.push({
    opCode: 0x75,
    mnemonic: ['DROP'],
    func: ({stack}) => {
      assert(stack.length >= 1)
      stack.pop()
    }
  })
  table.push({
    opCode: 0x6d,
    mnemonic: ['2DROP'],
    func: ({stack}) => {
      assert(stack.length >= 2)
      stack.pop()
      stack.pop()
    }
  })  
  table.push({
    opCode: 0x76,
    mnemonic: ['DUP'],
    func: ({stack}) => {
      assert(stack.length >= 1)
      stack.push(stack[stack.length - 1])
    }
  })

  table.push({
    opCode: 0x77, 
    mnemonic: ['NIP'],
    func: ({stack}) => {
      assert(stack.length >= 2)
      const a = stack.pop()
      stack.pop() // DROP
      stack.push(a)
    }
  })
  table.push({
    opCode: 0x78,
    mnemonic: ['OVER'],
    func: ({stack}) => {
      assert(stack.length >= 2)
      const peak = stack[stack.length - 2]
      stack.push(peak)
    }
  })

  table.push({
    opCode: 0x79,
    mnemonic: ['PICK'],
    func: ({stack}) => {
      assert(stack.length >= 1)
      const index = stack.pop()
      stack.push(stack.length - 1 - index)
    }
  })

  table.push({
    opCode: 0x7a,
    mnemonic: ['ROLL'],
    func: ({stack}) => {
      assert(stack.length >= 1)
      const index = stack.pop()
      assert(stack.length >= 1 + index)
      const removed = stack.splice(stack.length - 1 - index, 1)
      stack.push(remove[0])
    }
  })

  table.push({
    opCode: 0x7b,
    mnemonic: ['ROT'],
    func: ({stack}) => {
      assert(stack.length >= 3)
      const removed = stack.splice(stack.length - 3, 1)
      stack.push(removed[0])
    }
  })

  table.push({
    opCode: 0x7c,
    mnemonic: ['SWAP'],
    func: ({stack}) => {
      assert(stack.length >= 2)
      const top = stack.pop()
      const second = stack.pop()
      stack.push(top)
      stack.push(second)
    }
  })

  table.push({
    opCode: 0x7d,
    mnemonic: ['TUCK'],
    func: ({stack}) => {
      assert(stack.length >= 2)
      const top = stack.pop()
      const second = stack.pop()
      stack.push(top)
      stack.push(second)
      stack.push(top)
    }
  })

  table.push({
    opCode: 0x6e,
    mnemonic: ['2DUP'],
    func: ({stack}) => {
      assert(stack.length >= 3)
      const top = stack[stack.length - 1]
      const second = stack[stack.length - 2]
      stack.push(second)
      stack.push(top)
    }
  })

  table.push({
    opCode: 0x6f,
    mnemonic: ['3DUP'],
    func: ({stack}) => {
      assert(stack.length >= 4)
      const top = stack[stack.length - 1]
      const second = stack[stack.length - 2]
      const third = stack[stack.length - 3]
      stack.push(third)
      stack.push(second)
      stack.push(top)
    }
  })

  table.push({
    opCode: 0x70,
    mnemonic: ['2OVER'],
    func: ({stack}) => {
      assert(stack.length >= 5)
      const toTop = stack[stack.length - 3]
      const toSecond = stack[stack.length - 4]
      stack.push(toSecond)
      stack.push(toTop)
    }
  })

  table.push({
    opCode: 0x71,
    mnemonic: ['2ROT'],
    func: ({stack}) => {
      assert(stack.length >= 6)
      const removed = stack.splice(stack.length - 6, 2)
      stack.push(remove[0])
      stack.push(remove[1])
    }
  })

  table.push({
    opCode: 0x72,
    mnemonic: ['2SWAP'],
    func: ({stack}) => {
      assert(stack.length >= 4)
      const removed = stack.splice(stack.length - 4, 2)
      stack.push(removed[0])
      stack.push(removed[1])
    }
  })
}

module.exports = {
  registerOpStack
}