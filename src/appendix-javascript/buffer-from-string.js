// 文字列 hoge からバッファを作成する
const bufFromString = Buffer.from('hoge')
console.log(bufFromString.toString('hex'))
// --> "686f6765"
