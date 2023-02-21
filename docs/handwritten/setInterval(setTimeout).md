## 1 setTimeout模拟实现setInterval
**题目描述:** `setInterval` 用来实现循环定时调用 可能会存在一定的问题。能用 `setTimeout` 解决吗？
### 实现
```js
function _setInterval(fn, wait) {
  let timer = null
  function interval() {
    fn()
    timer = setTimeout(interval, wait)  // 递归调用
  }
  timer = interval()  // 首次调用
  return {
    // 终止定时器
    cancel: () => {
      clearTimeout(timer)
    }
  }
}
```

### 使用
```js
// 执行函数
function func() {
  console.log('触发');
}

// 设置定时器
const interval = _setInterval(func, 1000)

// 终止定时器
interval.cancel()
```

为什么要用`setTimeout`实现`setInterval`呢？
`setInterval`有以下两个缺点：
 
1. 使用`setInterval`时，某些时间间隔会被跳过
2. 可能多个定时器会连续执行

> 可以这么理解：每个`setTimeout`产生的任务会直接push到任务队列中；而`setInterval`在每次把任务push到任务队列前，都要进行一下判断(**看上次的任务是否仍在队列中**)。因而我们一般用`setTimeout`模拟`setInterval`，来规避掉上面的缺点

## 2 setInterval 模拟实现 setTimeout

### 实现
```js
function _setTimeout(fn, wait) {
  const timer = setInterval(() => {
    fn()
    clearInterval(timer)
  }, wait);
}
```

### 使用
```js
function func() {
  console.log('触发');
}
_setTimeout(func, 1000)  // 延迟一秒输出
```