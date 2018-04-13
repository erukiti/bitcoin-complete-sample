const getAfterStack = (func, before) => {
  const stack = [...before]
  func({stack})
  return stack
}

const createOpTable = (...registerOps) => {
  const res = []
  const ops = {}
  registerOps.forEach(registerOp => {
    const table = []
    registerOp(table)
    table.forEach(op => {
      if (op.opCode === undefined || !Array.isArray(op.mnemonic)) {
        console.log(op)
        return
      }
      if (op.opCode in ops) {
        console.log(`opCode: ${op.opCode.toString(16)} is already registered`)
      }
      ops[op.opCode] = true
      res.push(op)
    })
  })
  return res
}

module.exports = {getAfterStack, createOpTable}
