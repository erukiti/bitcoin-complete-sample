const rot13 = s => {
  return s.replace(/([a-mA-M])|([n-zN-Z])/g, (match, p1, p2) => {
    if (p1) {
      return String.fromCharCode(p1.charCodeAt(0) + 13)
    } else {
      return String.fromCharCode(p2.charCodeAt(0) - 13)
    }
  })
}

console.log(rot13('Hello, World.'))
// --> Uryyb, Jbeyq.
