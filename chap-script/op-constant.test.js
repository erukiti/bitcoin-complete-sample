const { registerOpConstant } = require('./op-constant')

const table = []
registerOpConstant(table)

it('', () => {})

// it('immidiate', () => {
//   const stack = []
//   expect(table[0x00](null, stack)).toEqual(0)
//   expect(stack).toEqual([0])

//   expect(table[0x4f](null, stack)).toEqual(0)
//   expect(stack).toEqual([0, -1])

//   expect(table[0x51](null, stack)).toEqual(0)
//   expect(stack).toEqual([0, -1, 1])
// })

// describe('push data', () => {
//   it('success', () => {
//     const stack = []
//     expect(table[0x01](Buffer.from('23', 'hex'), stack)).toEqual(1)
//     expect(stack).toEqual(['23'])
  
//     expect(table[0x02](Buffer.from('dead', 'hex'), stack)).toEqual(2)
//     expect(stack).toEqual(['23', 'dead'])
  
//     expect(table[0x4c](Buffer.from('0145', 'hex'), stack)).toEqual(2)
//     expect(stack).toEqual(['23', 'dead', '45'])
//   })

//   it('failed', () => {
//     const stack = []
//     expect(() => table[0x01](Buffer.from([]), stack)).toThrowError()
//   })
// })

