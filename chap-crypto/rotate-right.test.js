const {rotateRight} = require('./rotate-right')

it('', () => {
  expect(rotateRight(0b10000000000000100000000000000001, 4)).toEqual(
    0b00011000000000000010000000000000
  )
  expect(rotateRight(0b10000000000000100000000000000001, 31)).toEqual(
    0b00000000000001000000000000000011
  )
  expect(rotateRight(0xdeadbeaf, 16)).toEqual(0xbeafdead)
})
