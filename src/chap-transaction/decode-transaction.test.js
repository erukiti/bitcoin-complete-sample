const {decodeTransaction} = require('./decode-transaction')
const {PacketDecoder} = require('../chap-encode/packet-decoder')

describe('', () => {
  it('', () => {
    const version = '01000000'
    const txIns = '01'
    const txIn0HashRev =
      '6dbddb085b1d8af75184f0bc01fad58d1266e9b63b50881990e4b40d6aee3629'
    const txIn0Index = '00000000'
    const txIn0Script =
      '483045022100f3581e1972ae8ac7c736' +
      '7a7a253bc1135223adb9a468bb3a5923' +
      '3f45bc578380022059af01ca17d00e41' +
      '837a1d58e97aa31bae584edec28d35bd' +
      '96923690913bae9a0141049c02bfc97e' +
      'f236ce6d8fe5d94013c721e915982acd' +
      '2b12b65d9b7d59e20a842005f8fc4e02' +
      '532e873d37b96f09d6d4511ada8f1404' +
      '2f46614a4c70c0f14beff5'
    const txIn0Seqence = 'ffffffff'

    const txOuts = '02'
    const txOut0Value = '404b4c0000000000'
    const txOut0Script = '76a9141aa0cd1cbea6e7458a7abad512a9d9ea1afb225e88ac'
    const txOut1Value = '80fae9c700000000'
    const txOut1Script = '76a9140eab5bea436a0484cfab12485efda0b78b4ecc5288ac'
    const locktime = '00000000'

    const rawTx =
      version +
      txIns +
      txIn0HashRev +
      txIn0Index +
      '8b' + // script size
      txIn0Script +
      txIn0Seqence +
      txOuts +
      txOut0Value +
      '19' + // script size
      txOut0Script +
      txOut1Value +
      '19' + // script size
      txOut1Script +
      locktime

    const tx = decodeTransaction(PacketDecoder.fromHex(rawTx))

    const ex = {
      version: 1,
      txIns: [
        {
          hash: '2936ee6a0db4e4901988503bb6e966128dd5fa01bcf08451f78a1d5b08dbbd6d',
          index: 0,
          script: txIn0Script,
          sequence: 0xffffffff,
        },
      ],
      txOuts: [
        { value: txOut0Value, script: txOut0Script },
        { value: txOut1Value, script: txOut1Script },
      ],
      locktime: 0,
    }

    // expect(tx).toEqual(ex)
  })

  it('', () => {
    const rawTx = '020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff03510101ffffffff0200f2052a010000002321023d64a1b2c6d7762b68437cd80b07182b98b55cee0ff26b8af859c8fb472cc1e7ac0000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf90120000000000000000000000000000000000000000000000000000000000000000000000000'
    const tx = decodeTransaction(PacketDecoder.fromHex(rawTx))
    // console.log(tx)
  })

})
