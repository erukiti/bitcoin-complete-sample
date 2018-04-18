const {sha1} = require('./sha-1')

it('', () => {
  expect(sha1(Buffer.alloc(0))).toEqual(Buffer.from('da39a3ee5e6b4b0d3255bfef95601890afd80709', 'hex'))
})
