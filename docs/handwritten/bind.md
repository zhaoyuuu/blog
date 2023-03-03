# bind() 方法

💡 **Guide:** `bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。 [MDN 链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#%E5%B0%9D%E8%AF%95%E4%B8%80%E4%B8%8B)

## 实现

```js
Function.prototype._bind = function(context = window, ...args) {
  // this是调用bind的函数
  const that = this
  // 返回一个函数，innerArgs是实际调用时传入的参数
  function fBound(...innerArgs) {
    // 利用 apply 改变this指向，并调用函数
    return that.apply(context, [...args, ...innerArgs])
  }

  return fBound
}
```

## 使用

**_1. 创建绑定函数_**

```js
/* 实验一：创建绑定函数 */
function say() {
  console.log(`我是${this.name},今年${this.age}岁`);
}
const me = {
  name: 'zhaoyuuu',
  age: 20
}

say()  // 我是undefined,今年undefined岁
const boundSay = say._bind(me)
boundSay()  // 我是zhaoyuuu,今年20岁
```

**_2. 偏函数_**

👉 `bind()` 的另一个最简单的用法是使一个函数拥有**预设的初始参数**。只要将这些参数（如果有的话）作为 `bind()` 的参数写在 `this` 后面。当绑定函数被调用时，这些参数会被插入到目标函数的**参数列表的开始位置**，传递给绑定函数的参数会跟在它们后面。

```js
/* 实验二：偏函数 */
function list() {
  console.log(arguments);  // 输出参数列表
}

list('arg1', 'arg2')  // [Arguments] { '0': 'arg1', '1': 'arg2' }
const presetList = list._bind(null, 'presetParameter')  // 不需要绑定this，所以第一个参数为null
presetList('arg1', 'arg2')  // [Arguments] { '0': 'presetParameter', '1': 'arg1', '2': 'arg2' }
```

> 可以看到，我们成功地给`presetList`函数预设了一个参数`'presetParameter'`
