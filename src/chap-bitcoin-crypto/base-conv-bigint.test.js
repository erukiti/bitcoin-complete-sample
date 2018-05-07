const {baseConv} = require('./base-conv-bigint')

describe('baseConv', () => {
  it('', () => {
    expect(baseConv([255, 255], 256, 2)).toEqual(Array(16).fill(1))
    expect(baseConv(Array(16).fill(1), 2, 256)).toEqual([255, 255])

    expect(baseConv([9999, 9999], 10000, 10)).toEqual(Array(8).fill(9))
    expect(baseConv(Array(8).fill(9), 10, 10000)).toEqual([9999, 9999])

    expect(baseConv([123, 45], 256, 58)).toEqual([9, 21, 39])
    expect(baseConv([9, 21, 39], 58, 256)).toEqual([123, 45])
    // 123 * 256 ^ 1 + 45 === 31533
    // 9 * 58 ^ 2 + 21 * 58 ^ 1 + 39 === 31533
  })
})
