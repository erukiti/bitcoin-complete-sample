const {encodeTransaction} = require('./encode-transaction')

describe('', () => {
  it('', () => {
    const txIns = [
      {
        hash:
          'f1ed4982e5d03b4bd8c88f76fcb1e0eeeded298bd6b5289c89bb6bb48678082f',
        index: 0,
        script:
          '483045022100ade31445416bca1a5d2733697bffdb2ca8fe07f186e66f57635c8342f7f742df022068ee1fd70aac285b849d25a7f45d362efe32022fe2363505ac878391edc41f1c01',
        sequence: 4294967294,
      },
    ]
    const txOuts = [
      {
        value: '00e1f50500000000',
        script: 'a9144cb06b9a9d506d71109a0da84647bc106df7a12187',
      },
      {
        value: '5002102401000000',
        script: 'a914c55ac4082524b20dc27eb91e3d4f46e05d68ee0787',
      },
    ]
    const tx = encodeTransaction(txIns, txOuts, {version: 2, locktime: 101})
    expect(tx.toString('hex')).toEqual(
      '02000000012f087886b46bbb899c28b5d68b29ededeee0b1fc768fc8d84b3bd0e58249edf10000000049483045022100ade31445416bca1a5d2733697bffdb2ca8fe07f186e66f57635c8342f7f742df022068ee1fd70aac285b849d25a7f45d362efe32022fe2363505ac878391edc41f1c01feffffff0200e1f5050000000017a9144cb06b9a9d506d71109a0da84647bc106df7a12187500210240100000017a914c55ac4082524b20dc27eb91e3d4f46e05d68ee078765000000'
    )
  })
})
