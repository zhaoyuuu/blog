Function.prototype._apply = function (context = window, args) {
  // 传参形式变了，别的不变
  const key = Symbol('key')
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}

function sayFn(a, b) {
  console.log(`${a} + ${b} = ${a + b}`)
  console.log(`我是${this.name}, 我今年${this.age}岁`)
}
const me = {
  name: 'zhaoyuuu',
  age: 20,
}
sayFn._apply(me, [1, 2])
//1 + 2 = 3
//我是zhaoyuuu, 我今年20岁
console.log(me)
//{ name: 'zhaoyuuu', age: 20 } （不影响原对象）
