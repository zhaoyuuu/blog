# Pub-sub Pattern 发布订阅模式

💡 **Guide:**

> 概念：发布订阅者模式，一种对象间一对多的依赖关系，但一个对象的状态发生改变时，所依赖它的对象都将得到状态改变的通知。

1. 创建一个对象(缓存列表)
2. `on()` 方法用来把回调函数 cb 添加到缓存列表中
3. `emit()` 根据 key 值去执行对应缓存列表中的函数
4. `off()` 方法可以根据 key 值取消订阅
5. `once()` 方法只监听一次，调用完毕后删除缓存函数（订阅一次）

## 实现

```js
class EventEmiter {
  constructor() {
    // 事件对象，存放订阅的名字和事件
    this.events = {}
  }
  // 订阅事件
  on(eventName, cb) {
    // 由于一个事件可能注册多个回调函数，所以使用数组来存储事件队列
    this.events[eventName] = [...(this.events[eventName] || []), cb]
  }
  // 取消订阅
  off(eventName, cb) {
    if (!this.events[eventName]) return
    this.events[eventName] = this.events[eventName].filter(fn => fn !== cb)
  }
  // 触发事件
  emit(eventName, ...args) {
    if (!this.events[eventName]) return
    this.events[eventName].forEach(fn => fn(...args))
  }
  // 绑定事件，但只能触发一次
  once(eventName, cb) {
    const callback = (...args) => {
      // cb执行之后取消订阅
      cb(...args)
      this.off(eventName, callback)
    }
    this.on(eventName, callback)
  }
}
```

## 使用

```js
let test = new EventEmiter()
let login1 = function (...args) {
  console.log('login success1', args)
}
let login2 = function (...args) {
  console.log('login success2', args)
}
test.on('login', login1)
test.on('login', login2)
test.off('login', login1) // 解除订阅
test.emit('login', 1, 2, 3, 4, 5) // login success2 [ 1, 2, 3, 4, 5 ]

const onceLogin = function (...args) {
  console.log('once login', args)
}
test.once('onceLogin', onceLogin)
test.emit('onceLogin', 6, 7, 8) // once login [ 6, 7, 8 ]
test.emit('onceLogin', 8, 9, 10) // 不触发，无输出
```
