const {hash160, hash256} = require('./hash')
const hashCheck = (hashFunc, source) => {
  return hashFunc(Buffer.from(source, 'binary')).toString('hex')
}

it('hash160', () => {
  expect(hashCheck(hash160, '')).toEqual('b472a266d0bd89c13706a4132ccfb16f7c3b9fcb')
})

it('hash256', () => {
  expect(hashCheck(hash256, '')).toEqual('5df6e0e2761359d30a8275058e299fcc0381534545f55cf43e41983f5d4c9456')
  expect(hashCheck(hash256, 'hello')).toEqual('9595c9df90075148eb06860365df33584b75bff782a510c6cd4883a419833d50')
})
