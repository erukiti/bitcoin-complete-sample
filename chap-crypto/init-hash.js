const calcInitHash = prime => prime ** 0.5 * 2 ** 32 | 0
const toHex = n => (n >>> 0).toString(16)
console.log([2, 3, 5, 7, 11, 13, 17, 19].map(n => toHex(calcInitHash(n))))
/*
  [ '6a09e667', 'bb67ae85', '3c6ef372', 'a54ff53a',
    '510e527f', '9b05688c', '1f83d9ab', '5be0cd19' ]
*/
