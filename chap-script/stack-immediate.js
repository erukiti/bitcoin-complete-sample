const { VM } = require('./vm')

const vm = new VM('', { isDebug: true })
const immFunc = imm => (buf, stack) => {
  stack.push(imm)
  return 0
}
vm.register(0x00, immFunc(0))
vm.register(0x4f, immFunc(-1))
for (let i = 0x51; i <= 0x60; i++) {
  vm.register(i, immFunc(i - 0x50))
}
vm.addBytecode('004f5160')
vm.run()

/*
addBytecode: 004f5160
step0: 00
  stack:  [ 0 ]
  altStack:  []
step1: 4f
  stack:  [ 0, -1 ]
  altStack:  []
step2: 51
  stack:  [ 0, -1, 1 ]
  altStack:  []
step3: 60
  stack:  [ 0, -1, 1, 16 ]
  altStack:  []
*/
