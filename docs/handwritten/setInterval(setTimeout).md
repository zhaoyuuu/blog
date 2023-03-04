# setTimeout & setInterval

## 1 setTimeout 模拟实现 setInterval

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

👇 为什么要用`setTimeout`实现`setInterval`呢？<br>
[setInterval 为什么不靠谱](/gemstone/Chapter%2012%20BOM/window.html#setinterval)

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
