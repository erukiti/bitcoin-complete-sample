const assert = require('assert')

const {sha256, hash160, hash256} = require('./hash')
const hashCheck = (hashFunc, source) => {
  assert(typeof source === 'string')
  return hashFunc(Buffer.from(source, 'binary')).toString('hex')
}

it('hash160', () => {
  expect(hashCheck(hash160, '')).toEqual('b472a266d0bd89c13706a4132ccfb16f7c3b9fcb')
})

it('hash256', () => {
  expect(hashCheck(hash256, '')).toEqual('5df6e0e2761359d30a8275058e299fcc0381534545f55cf43e41983f5d4c9456')
  expect(hashCheck(hash256, 'hello')).toEqual('9595c9df90075148eb06860365df33584b75bff782a510c6cd4883a419833d50')
})

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
