const obj = { a: 'a', b: 'b' }
const arr = [1, 2, 3]
Object.defineProperty(obj, 'a', { enumerable: false })
console.log(Object.getOwnPropertyDescriptors(obj))
