const registerOpBitwise = table => {
  table[0x87] = (buf, stack) => {
    const a = stack.pop()
    const b = stack.pop()
    stack.push(a === b ? 1 : 0)
    return 0
  }

  table[0x88] = (buf, stack) => {
    const a = stack.pop()
    const b = stack.pop()
    if (a !== b) {
      throw new Error('OP_EQUALVERIFY failed')
    }
    return 0
  }
}

module.exports = {
  registerOpBitwise
}
