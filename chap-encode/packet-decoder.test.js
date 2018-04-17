const { PacketDecoder } = require('./packet-decoder')

describe('', () => {
  it('', () => {
    const decoder = new PacketDecoder(Buffer.from([0x02, 0x21, 0x22, 0x23]))
    expect(decoder.int8()).toEqual(0x02)
    expect(decoder.int8()).toEqual(0x21)
    expect(decoder.int16LE()).toEqual(0x2322)
    expect(decoder.getLeft()).toEqual(0)
  })

  it('', () => {
    const decoder = new PacketDecoder(Buffer.from([0x02, 0x21, 0x22, 0x23]))
    expect(decoder.varStr()).toEqual('!"')
    expect(decoder.getLeft()).toEqual(1)
  })

  it('', () => {
    const decoder = new PacketDecoder(Buffer.from([0x02, 0x21, 0x22, 0x23]))
    expect(decoder.uInt32LE()).toEqual(0x23222102)
    expect(decoder.getLeft()).toEqual(0)
  })

})
