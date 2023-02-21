> 注意看是怎么把函数的 this 指向传入的对象的

## 思路
1. 将函数设为对象的属性
2. 执行和删除这个函数
3. 指定this到函数并传入给定参数执行函数
4. 如果不传入参数，默认指向为 window


## 实现
```js
Function.prototype._call = function(context = window, ...args) {  // 上下文默认是 window
  // 在 context 上添加一个key（key唯一），用来存储要调用的函数
  const key = Symbol('key')
  // 这里的this是该函数，因此，context成为该函数调用的上下文
  context[key] = this
  // 执行函数（此时该函数的上下文是传入的 context ）
  const result = context[key](...args)
  // 执行完函数之后，将函数从 context 中清除
  delete context[key];
  
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

sayFn._call(me, 1, 2)  // 1 + 2 = 3   我是zhaoyuuu, 我今年20岁
console.log(me);  // { name: 'zhaoyuuu', age: 20 } ———— 清除掉了“key-函数”
```