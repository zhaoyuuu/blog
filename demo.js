const _new = (constructorFn, ...args) => {
  // 创建对象
  const obj = {}
  // 接入原型链
  obj.__proto__ = constructorFn.prototype
  // this 指向， 执行constructorFn
  const ret = constructorFn.apply(obj, args)
  // return
  return ret !== null && typeof ret === 'object' ? ret : obj
}

function Person() {
  this.name = 'peter'
  return null
}
const p = new Person()
// const p = _new(Person)
console.log(p)
