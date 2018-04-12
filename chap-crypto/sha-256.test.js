const { sha256 } = require('./sha-256')
const crypto = require('crypto')

describe('sha256', () => {
  it('', () => {
    expect(sha256('')).toEqual('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
    expect(sha256('hoge')).toEqual('ecb666d778725ec97307044d642bf4d160aabb76f56c0069c71ea25b1e926825')
    expect(sha256('The quick brown fox jumps over the lazy dog.')).toEqual('ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c')
    expect(sha256('01234567890123456789012345678901234567890123456789012345')).toEqual('83aa034bda83e458a0dc9cbce0d4e354716aa0ff770ed37ac0ed2b292052e4af')
    expect(sha256('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')).toEqual('2d8c2f6d978ca21712b5f6de36c9d31fa8e96a4fa5d8ff8b0188dfb9e7c171bb')
  })
  it('', () => {
    for (let len = 1; len < 1024; len++) {
      const s = '*'.repeat(len)
      const nodeSha256 = crypto.createHash('sha256')
      nodeSha256.update(s, 'ascii')
      expect(sha256(s)).toEqual(nodeSha256.digest('hex'))
    }
  })

  // const getLength = n => {
  //   return ((n + 8) / 64 | 0) * 64 + 56
  // }

  // it('', () => {
  //   expect(getLength(0)).toEqual(56)
  //   expect(getLength(55)).toEqual(56)
  //   expect(getLength(56)).toEqual(120)
  //   expect(getLength(119)).toEqual(120)
  //   expect(getLength(120)).toEqual(184)

  // })
})

