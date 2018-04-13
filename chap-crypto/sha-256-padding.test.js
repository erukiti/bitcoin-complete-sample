const {getNChunks, getNZeroPadding, paddingBuf} = require('./sha-256-padding')

it('getNChunks', () => {
  expect(getNChunks(0)).toEqual(1)
  expect(getNChunks(55)).toEqual(1)
  expect(getNChunks(56)).toEqual(2)
  expect(getNChunks(119)).toEqual(2)
  expect(getNChunks(120)).toEqual(3)
})

it('getNZeroPadding', () => {
  expect(getNZeroPadding(0)).toEqual(55)
  expect(getNZeroPadding(55)).toEqual(0)
  expect(getNZeroPadding(56)).toEqual(63)
  expect(getNZeroPadding(119)).toEqual(0)
  expect(getNZeroPadding(120)).toEqual(63)
})

it('paddingBuf', () => {
  const zeroPadding = len => '00'.repeat(len)
  const padding = s => paddingBuf(Buffer.from(s, 'binary')).toString('hex')

  expect(padding('')).toEqual(
                       '80' + zeroPadding(55) + '0000000000000000'
  )
  expect(padding('*'.repeat(1))).toEqual(
    '2a'.repeat(1)   + '80' + zeroPadding(54) + '0000000000000008'
  )
  expect(padding('*'.repeat(55))).toEqual(
    '2a'.repeat(55)  + '80' + zeroPadding(0)  + '00000000000001b8'
  )
  expect(padding('*'.repeat(56))).toEqual(
    '2a'.repeat(56)  + '80' + zeroPadding(63) + '00000000000001c0'
  )
  expect(padding('*'.repeat(119))).toEqual(
    '2a'.repeat(119) + '80' + zeroPadding(0)  + '00000000000003b8'
  )
  expect(padding('*'.repeat(120))).toEqual(
    '2a'.repeat(120) + '80' + zeroPadding(63) + '00000000000003c0'
  )
})
