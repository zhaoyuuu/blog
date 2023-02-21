
> 节流函数原理：频繁触发事件时，事件按照**一段时间间隔**来触发

## 时间戳方式

### throttle函数（时间戳）

```js
function throttle(fn, wait) {
  // 上一次执行该函数的时间
  let lastTime = 0
  return function(...args) {
    // 当前时间
    const now = new Date()
    // 当前时间和上一次执行时间的差值，如果大于设置的等待时间才执行事件
    if(now - lastTime > wait) {
      lastTime = now  // 记得更新 lastTime
      fn(args)
    }
  }
}
```

### 实践一下
```html
<body>
  <button class="btn">快速点击查看节流效果</button>
  <script>
    const btn = document.querySelector('.btn')
    btn.addEventListener('click', throttle(output, 1000))

    function output() {
      console.log('每1000ms打印一次');
    }

    function throttle(fn, wait) {
      let lastTime = 0
      return function(...args) {
        const now = new Date()
        if(now - lastTime > wait) {
          lastTime = now
          fn(args)
        }
      }
    }
  </script>
</body>
```

> 使用时间戳的节流函数会在**第一次触发事件时立即执行**，以后每过 wait 秒之后才执行一次，并且**最后一次触发事件不会被执行**

## 定时器方式

### throttle函数（定时器）
```js
function throttle(fn, wait) {
  let timer = null;
  return function(...args) {
    if(!timer) {
      timer = setTimeout(() => {
        fn(args)
        timer = null
      }, wait);
    }
  }
}
```

> 使用定时器的节流函数在**第一次触发时不会执行**，而是在 delay 秒之后才执行，当**最后一次停止触发后，还会再执行一次函数**