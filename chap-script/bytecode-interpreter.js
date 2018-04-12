let bytecode = Buffer.from('0123014593', 'hex')
const stack = []

while(bytecode.length > 0) {
  const opCode = bytecode.readUInt8(0)
  bytecode = bytecode.slice(1)
  switch (opCode) {
    case 0x01: {
      stack.push(bytecode.readInt8(0))
      bytecode = bytecode.slice(1)
      break
    }
    case 0x93: {
      const a = stack.pop()
      const b = stack.pop()
      stack.push(a + b)
      break
    }
  }
}

console.log(stack)
