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
