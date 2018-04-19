const {decodeVarInt, encodeVarInt} = require('./var-int')

describe('varint', () => {
  it('decode', () => {
    expect(decodeVarInt(Buffer.from([0xfc]), 0)).toEqual([0xfc, 1])
    expect(decodeVarInt(Buffer.from([0xfd, 0x12, 0x34]), 0)).toEqual([
      0x3412,
      3,
    ])
    expect(
      decodeVarInt(Buffer.from([0xfe, 0x12, 0x34, 0x56, 0x78]), 0)
    ).toEqual([0x78563412, 5])
  })

  it('encode', () => {
    expect(encodeVarInt(0xfc)).toEqual(Buffer.from([0xfc]))
    expect(encodeVarInt(0x3412)).toEqual(Buffer.from([0xfd, 0x12, 0x34]))
    expect(encodeVarInt(0x78563412)).toEqual(
      Buffer.from([0xfe, 0x12, 0x34, 0x56, 0x78])
    )
  })
})
