
> 防抖函数原理：**把触发非常频繁的事件合并成一次去执行** 在指定时间内只执行一次回调函数，如果在指定的时间内又触发了该事件，则回调函数的执行时间会基于此刻重新开始计算

### debounce函数
```js
/**
 * fn 是需要触发的函数
 * wait 是等待时间
 */
function debounce(fn, wait) {
  let timer;

  return function(...args) {
    // 如果设过定时器，先清除之前的定时器
    if(timer) clearTimeout(timer)
    // 开启一个新的定时器，延迟执行fn
    timer = setTimeout(() => {
      fn(args)
    }, wait);
  }
}
```

### 实践一下
```html
<body>
  <button>点击疯狂星期四</button>
  <script>
    const btn = document.querySelector('button')

    // 使用 debounce 函数
    btn.addEventListener('click', debounce(() => output(), 500))

    // 要执行的函数
    function output(num = 50) {
      console.log('疯狂星期四，vw' + num + '!!!')
    }

    // 防抖函数
    function debounce(fn, wait) {
      let timer;

      return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          fn(args)
        }, wait);
      }
    }
  </script>
</body>
```

如果需要向执行函数 fn 传递参数，只需要在使用debounce函数的时候像这样给fn传递参数：
```js
// 使用 debounce 函数
btn.addEventListener('click', debounce(() => output(100), 500))
```
