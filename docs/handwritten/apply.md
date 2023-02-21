> apply 和 上一篇的 call 不能说完全一样吧，只能说一模一样！**（只是传参的形式由列表变成了数组）**
建议试试在实现call的基础上自己实现一下 apply 哦~

## 思路
同`call`，主要是利用this的上下文特性。

## 实现
```js
Function.prototype._apply = function(context = window, args) {  // 传参形式变了，别的不变
  const key = Symbol('key')
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}
```

## 使用
```js
function sayFn(a, b){
  console.log(`${a} + ${b} = ${a + b}`);
  console.log(`我是${this.name}, 我今年${this.age}岁`);
}

const me = {
  name: 'zhaoyuuu',
  age: 20
}

sayFn._apply(me, [1, 2])  // 1 + 2 = 3   我是zhaoyuuu, 我今年20岁
console.log(me);  // { name: 'zhaoyuuu', age: 20 } ———— 清除掉了“key-函数”
```