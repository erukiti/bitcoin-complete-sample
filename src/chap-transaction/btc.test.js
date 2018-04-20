const {BTC} = require('./btc')

it('', () => {
  const btc = BTC.fromHex('5002102401000000')
  expect(btc.toHex()).toEqual('5002102401000000')
  expect(btc.toBTC()).toEqual(48.9999624)
  expect(btc.toSatoshi()).toEqual(4899996240)
})

it('', () => {
  const btc = BTC.fromSatoshi(4899996240)
  expect(btc.toHex()).toEqual('5002102401000000')
})