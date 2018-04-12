const { decodeVarInt, encodeVarInt } = require('./var-int')

describe('varint', () => {
  it('decode', () => {
    expect(decodeVarInt(new Buffer([0xfc]))).toEqual([0xfc, 1])
    expect(decodeVarInt(new Buffer([0xfd, 0x12, 0x34]))).toEqual([0x3412, 3])
    expect(decodeVarInt(new Buffer([0xfe, 0x12, 0x34, 0x56, 0x78]))).toEqual([0x78563412, 5])
  })

  it('encode', () => {
    expect(encodeVarInt(0xfc)).toEqual(new Buffer([0xfc]))
    expect(encodeVarInt(0x3412)).toEqual(new Buffer([0xfd, 0x12, 0x34]))
    expect(encodeVarInt(0x78563412)).toEqual(new Buffer([0xfe, 0x12, 0x34, 0x56, 0x78]))
  })
})
