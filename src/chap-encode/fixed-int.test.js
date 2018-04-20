const {
  decodeInt8, decodeInt16LE, decodeInt32LE, // decodeInt64,
  decodeUInt8, decodeUInt16LE, decodeUInt32LE, decodeUInt64LE,
  decodeInt16BE, decodeInt32BE, // decodeInt64BE,
  decodeUInt16BE, decodeUInt32BE, // decodeUInt64BE,
  encodeInt8, encodeInt16LE, encodeInt32LE, //encodeInt64LE, 
  encodeUInt8, encodeUInt16LE, encodeUInt32LE, encodeUInt64LE,
  encodeInt16BE, encodeInt32BE, // encodeInt64BE, 
  encodeUInt16BE, encodeUInt32BE, // encodeUInt64BE,
} = require('./fixed-int')

describe('decode', () => {
  it('int8', () => {
    expect(decodeInt8(Buffer.from([255]))).toEqual([-1, 1])
    expect(decodeInt8(Buffer.from([255]), 0)).toEqual([-1, 1])
    expect(decodeInt8(Buffer.from([0, 255]), 1)).toEqual([-1, 1])
  })
  it('uint8', () => {
    expect(decodeUInt8(Buffer.from([255]))).toEqual([255, 1])
  })
  it('int16', () => {
    expect(decodeInt16LE(Buffer.from([255, 255]))).toEqual([-1, 2])
  })
  it('uint16', () => {
    expect(decodeUInt16LE(Buffer.from([255, 255]))).toEqual([65535, 2])
  })
  it('int32', () => {
    expect(decodeInt32LE(Buffer.from([255, 255, 255, 255]))).toEqual([-1, 4])
  })
  it('uint32', () => {
    expect(decodeUInt32LE(Buffer.from([255, 255, 255, 255]))).toEqual([4294967295, 4])
  })
  it('uint64LE', () => {
    expect(decodeUInt64LE(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]))).toEqual([0, 8])
    expect(decodeUInt64LE(Buffer.from([1, 0, 0, 0, 0, 0, 0, 0]))).toEqual([1, 8])
    expect(decodeUInt64LE(Buffer.from([255, 255, 255, 255, 0, 0, 0, 0]))).toEqual([4294967295, 8])
    expect(decodeUInt64LE(Buffer.from([0, 0, 0, 0, 1, 0, 0, 0]))).toEqual([4294967296, 8])
    expect(decodeUInt64LE(Buffer.from([255, 255, 255, 255, 255, 255, 31, 0]))).toEqual([0x1fffffffffffff, 8])
  })
})

describe('encode', () => {
  it('int8', () => {
    expect(encodeInt8(-1)).toEqual(Buffer.from([255]))
  })
  it('uint8', () => {
    expect(encodeUInt8(255)).toEqual(Buffer.from([255]))
  })
  it('int16', () => {
    expect(encodeInt16LE(-1)).toEqual(Buffer.from([255, 255]))
  })
  it('uint16', () => {
    expect(encodeUInt16LE(65535)).toEqual(Buffer.from([255, 255]))
  })
  it('int32', () => {
    expect(encodeInt32LE(-1)).toEqual(Buffer.from([255, 255, 255, 255]))
  })
  it('uint32', () => {
    expect(encodeUInt32LE(4294967295)).toEqual(Buffer.from([255, 255, 255, 255]))
  })
  it('uint64', () => {
    expect(encodeUInt64LE(0)).toEqual(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]))
    expect(encodeUInt64LE(1)).toEqual(Buffer.from([1, 0, 0, 0, 0, 0, 0, 0]))
    expect(encodeUInt64LE(4294967295)).toEqual(Buffer.from([255, 255, 255, 255, 0, 0, 0, 0]))
    expect(encodeUInt64LE(4294967296)).toEqual(Buffer.from([0, 0, 0, 0, 1, 0, 0, 0]))
    expect(encodeUInt64LE(0x1fffffffffffff)).toEqual(Buffer.from([255, 255, 255, 255, 255, 255, 31, 0]))
  })
})
