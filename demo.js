// on off emit once
class EventEmiter {
  constructor() {
    // 事件对象，存放订阅的名字和事件
    this.events = {}
  }
  // 订阅事件
  on(eventName, cb) {
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

// 使用
let p1 = new EventEmiter()
let p2 = new EventEmiter()
let login1 = function (...args) {
  console.log('login success1', args)
}
let login2 = function (...args) {
  console.log('login success2', args)
}
p1.on('login', login1)
p1.on('login', login2)
p1.off('login', login1) // 解除订阅
p1.emit('login', 1, 2, 3, 4, 5) // login success2 [ 1, 2, 3, 4, 5 ]

const onceLogin = function (...args) {
  console.log('once login', args)
}
p1.once('onceLogin', onceLogin)
p1.emit('onceLogin', 6, 7, 8) // once login [ 6, 7, 8 ]
p1.emit('onceLogin', 8, 9, 10) // 不触发，无输出
