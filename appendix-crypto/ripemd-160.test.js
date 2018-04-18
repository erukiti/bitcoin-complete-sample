const {ripemd160} = require('./ripemd-160')

it('', () => {
  expect(ripemd160('')).toEqual(
    Buffer.from('9c1185a5c5e9fc54612808977ee8f548b2258d31', 'hex')
  )
  expect(ripemd160('a')).toEqual(
    Buffer.from('0bdc9d2d256b3ee9daae347be6f4dc835a467ffe', 'hex')
  )
  expect(ripemd160('hoge')).toEqual(
    Buffer.from('49c7f6f4e1a11f110c256b3a2765fc64d936e971', 'hex')
  )
  expect(ripemd160('The quick brown fox jumps over the lazy dog')).toEqual(
    Buffer.from('37f332f68db77bd9d7edd4969571ad671cf9dd3b', 'hex')
  )
  expect(
    ripemd160(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
        'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut e' +
        'nim ad minim veniam, quis nostrud exercitation ullamco laboris n' +
        'isi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
        ' reprehenderit in voluptate velit esse cillum dolore eu fugiat n' +
        'ulla pariatur. Excepteur sint occaecat cupidatat non proident, s' +
        'unt in culpa qui officia deserunt mollit anim id est laborum.'
    )
  ).toEqual(Buffer.from('c4e3cc08809d907e233a24c10056c9951a67ffe2', 'hex'))
})
