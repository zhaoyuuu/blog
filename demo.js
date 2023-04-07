const target = {
  foo: 'bar',
}
const firstProxy = new Proxy(target, {
  get() {
    console.log('first proxy')
    return Reflect.get(...arguments)
  },
})
const secondProxy = new Proxy(firstProxy, {
  get() {
    console.log('second proxy')
    return Reflect.get(...arguments)
  },
})
console.log(secondProxy.foo)
// second proxy
// first proxy
// bar
