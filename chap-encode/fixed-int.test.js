const {
  decodeInt16, decodeInt32, decodeInt8,
  decodeUInt16, decodeUInt32, decodeUInt8,
  encodeInt16, encodeInt32, encodeInt8,
  encodeUInt16, encodeUInt32, encodeUInt8,
} = require('./fixed-int')

describe('decode', () => {
  it('int8', () => {
    expect(decodeInt8(new Buffer([255]))).toEqual([-1, 1])
    expect(decodeInt8(new Buffer([255]), 0)).toEqual([-1, 1])
    expect(decodeInt8(new Buffer([0, 255]), 1)).toEqual([-1, 1])
  })
  it('uint8', () => {
    expect(decodeUInt8(new Buffer([255]))).toEqual([255, 1])
  })
  it('int16', () => {
    expect(decodeInt16(new Buffer([255, 255]))).toEqual([-1, 2])
  })
  it('uint16', () => {
    expect(decodeUInt16(new Buffer([255, 255]))).toEqual([65535, 2])
  })
  it('int32', () => {
    expect(decodeInt32(new Buffer([255, 255, 255, 255]))).toEqual([-1, 4])
  })
  it('uint32', () => {
    expect(decodeUInt32(new Buffer([255, 255, 255, 255]))).toEqual([4294967295, 4])
  })
})

describe('encode', () => {
  it('int8', () => {
    expect(encodeInt8(-1)).toEqual(new Buffer([255]))
  })
  it('uint8', () => {
    expect(encodeUInt8(255)).toEqual(new Buffer([255]))
  })
  it('int16', () => {
    expect(encodeInt16(-1)).toEqual(new Buffer([255, 255]))
  })
  it('uint16', () => {
    expect(encodeUInt16(65535)).toEqual(new Buffer([255, 255]))
  })
  it('int32', () => {
    expect(encodeInt32(-1)).toEqual(new Buffer([255, 255, 255, 255]))
  })
  it('uint32', () => {
    expect(encodeUInt32(4294967295)).toEqual(new Buffer([255, 255, 255, 255]))
  })

})
