function DadType() {
  this.colors = ['red', 'blue', 'green']
}
function SonType() {}
// 继承 DadType
SonType.prototype = new DadType()
let instance1 = new SonType()
instance1.colors.push('black')
console.log(instance1.colors) // "red,blue,green,black"
let instance2 = new SonType()
console.log(instance2.colors) // "red,blue,green,black"
