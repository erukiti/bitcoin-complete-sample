/**
 * 数値valueをnBitsビット分右ローテートした数値を返す
 * @param {number} value 
 * @param {number} nBits 
 * @returns {number} ローテートした数値
 */
const rotateRight = (value, nBits) =>{
  return ((value >>> nBits) | (value << (32 - nBits))) >>> 0
}

module.exports = {
  rotateRight
}
