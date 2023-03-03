# debounce 防抖

💡 **Guide:** 把触发非常频繁的事件**合并成一次**去执行，在指定时间内只执行一次回调函数。如果在指定的时间内又触发了该事件，则回调函数的执行时间会基于此刻重新开始计算。

## 实现

```js
/**
 * fn 是需要触发的函数
 * wait 是等待时间
 */
function debounce(fn, wait) {
  let timer;

  return function(...args) {
    // 函数里可能有跟 this 有关的逻辑，所以要保存 this
    const that = this
    // 如果设过定时器，先清除之前的定时器
    if(timer) clearTimeout(timer)
    // 开启一个新的定时器，延迟执行fn
    timer = setTimeout(() => {
      fn.apply(that, args)
    }, wait);
  }
}
```

## 使用

```js
window.onresize = debounce(function () {
  console.log("resize");
}, 500);
```
