const registerOpFlow = table => {
  table[0x61] = () => 0
  table[0x6a] = () => {
    throw new Error('RETURN')
  }
  table[0x69] = (buf, stack) => {
    if (stack.pop() !== 1) {
      throw new Error ('VERIFY FAILED')
    }
    return 0
  }
}

module.exports = {
  registerOpFlow
}