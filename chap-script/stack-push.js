const { VM } = require('./vm')

const vm = new VM('', { isDebug: true })

const pushData = (buf, stack, len) => stack.push(buf.toString('hex', 0, len))

for (let i = 0x01; i <= 0x4b; i++) {
  vm.register(i, (buf, stack) => {
    pushData(buf, stack, i)
    return i
  })  
}

vm.register(0x4c, (buf, stack) => {
  const len = buf.readUInt8(0)
  pushData(buf.slice(1), stack, len)
  return 1 + len
})

vm.register(0x4d, (buf, stack) => {
  const len = buf.readUInt16LE(0)
  pushData(buf.slice(2), stack, len)
  return 2 + len
})

vm.register(0x4e, (buf, stack) => {
  const len = buf.readUInt32LE(0)
  pushData(buf.slice(4), stack, len)
  return 4 + len
})

vm.addBytecode('01ff02dead0301234504deadbeef4c01404d0100504e0100000060')
vm.run()

/*
addBytecode: 01ff02dead0301234504deadbeef4c01404d0100504e0100000060
step0: 01
  stack:  [ 'ff' ]
  altStack:  []
step1: 02
  stack:  [ 'ff', 'dead' ]
  altStack:  []
step2: 03
  stack:  [ 'ff', 'dead', '012345' ]
  altStack:  []
step3: 04
  stack:  [ 'ff', 'dead', '012345', 'deadbeef' ]
  altStack:  []
step4: 4c
  stack:  [ 'ff', 'dead', '012345', 'deadbeef', '40' ]
  altStack:  []
step5: 4d
  stack:  [ 'ff', 'dead', '012345', 'deadbeef', '40', '50' ]
  altStack:  []
step6: 4e
  stack:  [ 'ff', 'dead', '012345', 'deadbeef', '40', '50', '60' ]
  altStack:  []
*/
