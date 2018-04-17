/**
  * srcRadix進数の配列であるsrcを、destRadix進数の配列に変換して返す
  * @param src {number[]} 変換元の数値配列
  * @param srcRadix {numner} srcを何進数と見なすか
  * @param destRadix {number} 出力先の配列を何進数と見なすか
  * @return {number[]} destRadix進数に変換された数値配列
	*/
const baseConv = (src, srcRadix, destRadix) => {
  let dest = [0]
  src.forEach(n => {
    const next = []

    const toNext = (num) => {
      next.push(num % destRadix)
      return (num / destRadix) | 0
    }

    let carry = n
    dest.forEach(m => {
      carry = toNext(carry + m * srcRadix)
    })
    while (carry > 0) {
      carry = toNext(carry)
    }
    dest = next
  })
  return dest.reverse()
}

module.exports = {
  baseConv
}
