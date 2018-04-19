const stack = []          // stack: []
stack.push(1)             // stack: [1]
stack.push('hoge')        // stack: [1, 'hoge']
const hoge = stack.pop()  // stack: [1]
console.log(hoge)         // --> hoge
const num = stack.pop()   // stack: []
console.log(num)          // --> 1
