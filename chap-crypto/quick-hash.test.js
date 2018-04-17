const {sha256, ripemd160} = require('../chap-crypto/quick-hash')

const hashCheck = (hashFunc, source) => {
  return hashFunc(Buffer.from(source, 'binary')).toString('hex')
}

describe('sha256', () => {
  it('', () => {
    expect(hashCheck(sha256, '')).toEqual(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
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
