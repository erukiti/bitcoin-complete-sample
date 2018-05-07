const BigInt = require('big-integer')

/**
 * srcRadix進数の配列であるsrcを、destRadix進数の配列に変換して返す
 * @param src {number[]} 変換元の数値配列
 * @param srcRadix {numner} srcを何進数と見なすか
 * @param destRadix {number} 出力先の配列を何進数と見なすか
 * @return {number[]} destRadix進数に変換された数値配列
 */
const baseConv = (src, srcRadix, destRadix) => {
  const dest = []
  let a = BigInt.fromArray(src, srcRadix)
  while (a.greater(BigInt[0])) {
    const {quotient, remainder} = a.divmod(destRadix)
    dest.push(remainder.toJSNumber())
    a = quotient
  }
  return dest.reverse()
}

module.exports = {
  baseConv
}
