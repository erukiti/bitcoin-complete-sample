const { ripemd160 } = require('./ripemd-160')

it('', ()=> {
  expect(ripemd160('')).toEqual('9c1185a5c5e9fc54612808977ee8f548b2258d31')
  expect(ripemd160('a')).toEqual('0bdc9d2d256b3ee9daae347be6f4dc835a467ffe')
  expect(ripemd160('hoge')).toEqual('49c7f6f4e1a11f110c256b3a2765fc64d936e971')
  expect(ripemd160('The quick brown fox jumps over the lazy dog')).toEqual('37f332f68db77bd9d7edd4969571ad671cf9dd3b')
  expect(ripemd160('12345678901234567890123456789012345678901234567890123456789012345678901234567890')).toEqual('9b752e45573d4b39f4dbd3323cab82bf63326bfb')
})
