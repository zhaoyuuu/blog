# throttle 节流

💡 **Guide:** 频繁触发事件时，事件按照**一段时间间隔**来触发。有两种实现方式: 时间戳 / 定时器。

## 实现

**_1. 时间戳：_**

```js
function throttle(fn, wait) {
  // 上一次执行该函数的时间
  let lastTime = 0
  return function(...args) {
    // 保存 this
    const that = this
    // 当前时间
    const now = new Date()
    // 当前时间和上一次执行时间的差值，如果大于设置的等待时间才执行事件
    if(now - lastTime > wait) {
      lastTime = now  // 记得更新 lastTime
      fn.apply(that, args)
    }
  }
}
```

**_2. 定时器_**

```js
function throttle(fn, wait) {
  let timer = null;
  return function(...args) {
    // 保存 this
    const that = this
    // timer 为 null
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(that, args)
        // 销毁定时器
        timer = null
      }, wait);
    }
  }
}
```

## 使用

同 [debounce](/handwritten/debounce#使用) ，略。
