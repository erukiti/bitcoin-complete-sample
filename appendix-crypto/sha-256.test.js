const {sha256} = require('./sha-256')
const crypto = require('crypto')

const hashCheck = (hashFunc, source) => {
  return hashFunc(Buffer.from(source, 'binary')).toString('hex')
}

describe('sha256', () => {
  it('', () => {
    expect(hashCheck(sha256, '')).toEqual(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    )

    expect(hashCheck(sha256, 'hoge')).toEqual(
      'ecb666d778725ec97307044d642bf4d160aabb76f56c0069c71ea25b1e926825'
    )

    expect(
      hashCheck(sha256, 'The quick brown fox jumps over the lazy dog.')
    ).toEqual(
      'ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c'
    )

    expect(
      hashCheck(
        sha256,
        '01234567890123456789012345678901234567890123456789012345'
      )
    ).toEqual(
      '83aa034bda83e458a0dc9cbce0d4e354716aa0ff770ed37ac0ed2b292052e4af'
    )

    expect(
      hashCheck(
        sha256,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
          'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut e' +
          'nim ad minim veniam, quis nostrud exercitation ullamco laboris n' +
          'isi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
          ' reprehenderit in voluptate velit esse cillum dolore eu fugiat n' +
          'ulla pariatur. Excepteur sint occaecat cupidatat non proident, s' +
          'unt in culpa qui officia deserunt mollit anim id est laborum.'
      )
    ).toEqual(
      '2d8c2f6d978ca21712b5f6de36c9d31fa8e96a4fa5d8ff8b0188dfb9e7c171bb'
    )
  })
})
