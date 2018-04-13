const {VM} = require('./vm')
const {getAfterStack, createOpTable} = require('./utils')
const {registerOpArithmetic} = require('./op-arithmetic')
const {registerOpBitwise} = require('./op-bitwise')
const {registerOpConstant} = require('./op-constant')
const {registerOpFlow} = require('./op-flow')
const {registerOpStack} = require('./op-stack')
const {registerOpCrypto} = require('./op-crypto')

const table = createOpTable(
  registerOpArithmetic,
  registerOpBitwise,
  registerOpConstant,
  registerOpCrypto,
  registerOpFlow,
  // registerOpStack
)

it('', () => {
  const scriptSig =
    '47304402207db144ceca1394e9d7933a10fd023185bb79c96b66acd64facd2ac6a6b5632db0220236e9ea8d425125150bd9626e1e90ea780c14d47a16dded3f9e67db062376b7701'
  const scriptPubKey =
    '2103ee3fe503dd0a98e98f86c77cfe7483f40a648b9a9dbdd63fc2b379acd91e7191ac'

  const bytecode = Buffer.from(scriptSig + scriptPubKey, 'hex')
  const vm = new VM(bytecode, {opTable: table, isDebug: true})
  vm.run()
})
