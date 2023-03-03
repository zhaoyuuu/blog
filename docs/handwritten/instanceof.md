# instanceof

💡 **Guide:**

1. 先取得当前实例的原型对象 `proto`，即找到当前实例对象的**原型链**
2. 顺着原型链往上查找：

- 如果找到 `proto` 与 `classFunc` 的原型 `prototype` 相等，则返回 true
- 当 `proto` 等于 null 时，说明原型链上没有符合条件的 `proto`，返回 false

## 实现

```js
function _instanceof(example, classFunc) {
  // 由于 incetanceof 要检测的是对象（引用类型），所以要有这个前置判断：
  // 如果是原始数据类型，直接返回 false
  if(typeof example !== 'object' || example === null) return false

  let proto = example.__proto__  // 原型链上的原型对象
  while(true) {
    if(proto === null) return false
    // 如果在实例对象的原型链上找到了当前类，返回true
    if(proto === classFunc.prototype) return true
    // 否则顺着原型链往上继续找
    proto = proto.__proto__
  }
}
```

## 使用

```js
console.log(_instanceof(null, Object));  // false
console.log(_instanceof([], Array));  // true
console.log(_instanceof({}, Object));  // true
```
