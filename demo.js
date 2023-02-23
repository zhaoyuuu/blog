let person = { age: 21 }
Object.defineProperty(person, 'name', {
  value: 'Nicholas',
})
console.log('person', person) //person { age: 21 } （无法直接获取到[name]）
console.log(Object.getOwnPropertyDescriptor(person, 'name'))
//{
//   value: 'Nicholas',
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
