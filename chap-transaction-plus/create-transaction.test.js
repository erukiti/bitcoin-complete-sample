const {createTransaction} = require('./create-transaction')
const {Keypair} = require('../chap-bitcoin-crypto/keypair')

it('', () => {
  const txIns = [
    {
      hash: 'cf9c1fa2b6ec299a8d86d50bb431cbf839d587d520e7b1ae2824dd45988c0451',
      index: 0,
      keypair: Keypair.fromWIF(
        'cRP4uLLamkLpZK3bP7BNiztYn3DRkmXnkesR42AFfTeHhaF1QPTg'
      ),
      value: '00f2052a01000000',
      script:
        '21023d64a1b2c6d7762b68437cd80b07182b98b55cee0ff26b8af859c8fb472cc1e7ac',
    },
  ]
  const txOuts = [
    {
      address: '2MzEigmAnqb1c6tQJ5iPYjQbMo6Sb7PFox6',
      value: 1,
    },
  ]
  // const tx = createTransaction(txIns, txOuts, {locktime: 101})
  /*  console.log(tx.toString('hex'))
  expect(tx.toString('hex')).toEqual('0200000001f1ed4982e5d03b4bd8c88f76fcb1e0eeeded298bd6b5289c89bb6bb48678082f0000000049483045022100ade31445416bca1a5d2733697bffdb2ca8fe07f186e66f57635c8342f7f742df022068ee1fd70aac285b849d25a7f45d362efe32022fe2363505ac878391edc41f1c01feffffff0200e1f5050000000017a9144cb06b9a9d506d71109a0da84647bc106df7a12187500210240100000017a914c55ac4082524b20dc27eb91e3d4f46e05d68ee078765000000')*/
})

//'483045022100ade31445416bca1a5d2733697bffdb2ca8fe07f186e66f57635c8342f7f742df022068ee1fd70aac285b849d25a7f45d362efe32022fe2363505ac878391edc41f1c01'
