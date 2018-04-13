const registerOpFlow = table => {
  table.push({
    opCode: 0x61,
    mnemonic: ['NOP'],
    func: () => 0
  })
  table.push({
    opCode: 0x6a,
    mnemonic: ['RETURN'],
    func: () => {
      throw new Error('RETURN')
    }
  })
  table.push({
    opCode: 0x69,
    mnemonic: ['VERIFY'],
    func: ({stack}) => {
      if (stack.pop() !== 1) {
        throw new Error ('VERIFY FAILED')
      }
    }
  })
}

module.exports = {
  registerOpFlow
}