const rotateRight = (value, nBits) =>{
  return ((value >>> nBits) | (value << (32 - nBits))) >>> 0
}

const toBin = value => value.toString(2).padStart(32, '0')

console.log(toBin(rotateRight(0b10000000000000100000000000000001, 4)))
// --> 00011000000000000010000000000000
console.log(toBin(rotateRight(0b10000000000000000000100000000001, 31)))
// --> 00000000000000000001000000000011
