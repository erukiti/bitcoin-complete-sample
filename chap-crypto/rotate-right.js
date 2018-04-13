const rotateRight = (value, nBits) =>{
  return ((value >>> nBits) | (value << (32 - nBits))) >>> 0
}

module.exports = {
  rotateRight
}
