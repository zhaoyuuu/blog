## 深浅拷贝

**实现浅拷贝：**<br>

- `Object.assign()`

```js{4}
const obj = {
  name: 'lin'
}
const newObj = Object.assign({}, obj)
```

- 数组的`slice`方法

```js
const arr = ['lin', 'is', 'handsome']
const newArr = arr.slice(0)
```

- `Array.from()`
- `...`扩展运算符

**实现深拷贝：**<br>
相关链接：[手写深拷贝](/handwritten/deepClone)

## 防抖节流

- 防抖：[手写 debounce 防抖](/handwritten/debounce)
- 节流：[手写 throttle 节流](/handwritten/throttle)
