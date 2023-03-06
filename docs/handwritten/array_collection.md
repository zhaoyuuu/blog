# Array-collection 数组合集

## 1 实现 forEach 方法

```js
Array.prototype._forEach = function(callback, context) {
  // this => arr
  const self = this, len = self.length

  for(let i = 0; i < len; i++) {
    typeof callback === 'function' && callback.call(context, self[i], i, self)
  }
}

// 使用
const arr = [11,22,33]
arr._forEach((val, index, ARR) => {
  console.log(val, index, ARR);
  /** 输出
    11 0 [ 11, 22, 33 ]
    22 1 [ 11, 22, 33 ]
    33 2 [ 11, 22, 33 ]
  */
})
```

## 2 实现 filter 方法

```js
Array.prototype._filter = function(callback, context) {
  // self => arr
  const self = this, len = self.length, res = []
  if(typeof callback === 'function') {
    for(let i = 0; i < len; i++) {
      if(callback.call(context, self[i], i, self)) {
        res.push(self[i])
      }
    }
  }
  return res
}

// 使用
const arr = [11,22,33]
const res = arr._filter((val, index, ARR) => {
  return val > 20
})
console.log(res);  // [22, 33]
```

## 3 实现 find 方法

```js
Array.prototype._find = function(callback, context) {
  // self => arr
  const self = this, len = self.length
  for(let i = 0; i < len; i++) {
    if(callback.call(context, self[i], i, self)) {
      return self[i]
    }
  }
}

// 使用
const arr = [11,22,33]
const res = arr._find((val, index, ARR) => {
  return val > 20
})
console.log(res);  // 22
```

## 4 实现 findIndex 方法

```js
Array.prototype._findIndex = function(callback, context) {
  // self => arr
  const self = this, len = self.length
  for(let i = 0; i < len; i++) {
    if(callback.call(context, self[i], i, self)) {
      return i
    }
  }
  return -1
}

// 使用
const arr = [11,22,33]
const res = arr._findIndex((val, index, ARR) => {
  return val > 20
})
console.log(res);  // 1
```

## 5 实现 map 方法

```js
Array.prototype._map = function(callback, context) {
  // self => arr
  const self = this, len = self.length, res = []
  for(let i = 0; i < len; i++) {
    const item = callback.call(context, self[i], i, self)
    res.push(item)
  }
  return res
}

// 使用
const arr = [1, 4, 9]
const res = arr._map((val, index, ARR) => Math.sqrt(val))
console.log(res);  // [ 1, 2, 3 ]
```

## 6 实现 reduce 方法

```js
Array.prototype._reduce = function(callback, initialValue) {
  const arr = this

  // 考虑不传 initialValue 的情况
  let res = initialValue ? initialValue : arr[0]
  const startIndex = initialValue ? 0 : 1

  for(let i = startIndex; i < arr.length; i++) {
    const previousValue = res
    res = callback(previousValue, arr[i], i, arr)
  }
  return res
}

// 使用
const arr = [1,2,3,4]
const res = arr._reduce((a, b) => a + b)
console.log(res);  // 10
```

## 7 实现 every 方法

```js
Array.prototype._every = function(callback, context) {
  const arr = this
  for(let i = 0; i < arr.length; i++) {
    if(callback.call(context, arr[i], i, arr) === false) return false
  }
  return true
}

// 使用
const arr1 = [1,2,3,4]
const arr2 = []
const isValid = n => n < 4
console.log(arr1._every(isValid));  // false
console.log(arr2._every(isValid));  // true  如果用一个空数组进行测试，在任何情况下它返回的都是true
```

## 8 实现 some 方法

```js
Array.prototype._some = function(callback, context) {
  const arr = this
  for(let i = 0; i < arr.length; i++) {
    if(callback.call(context, arr[i], i, arr) === true) return true
  }
  return false
}

// 使用
const arr1 = [1,2,3,4]
const arr2 = []
const isValid = n => n < 4
console.log(arr1._some(isValid));  // true
console.log(arr2._some(isValid));  // false  若收到一个空数组，此方法在任何情况下都会返回 true
```

## 9 实现 flat 方法

```js
Array.prototype._flat = function (depth = 1) {
  const arr = this
  // 终止条件
  if (depth === 0) return arr
  // 单次遍历逻辑
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? cur._flat(depth - 1) : cur)
  }, [])
}

const arr = [1, 2, [3, [4, [5, 6]]]]
console.log(arr._flat())
//[ 1, 2, 3, [ 4, [ 5, 6 ] ] ]（扁平一层）
console.log(arr._flat(2))
//[ 1, 2, 3, 4, [ 5, 6 ] ]（扁平两层）
console.log(arr._flat(Infinity))
//[ 1, 2, 3, 4, 5, 6 ]（完全扁平）

```

## 10 实现 shuffle 洗牌 方法

🧐 题目要求：

```js
// 打乱数组，有可能是 [1, 3, 2, 4]，但对原数组没有影响
shuffle([1, 2, 3, 4]);
```

😎 **实现：**

- 利用 `Array.prototype.sort` 的技巧解法：

```js
const shuffle = list => {
  const newList = [...list]
  newList.sort(() => Math.random() - 0.5)
  return newList
}
// 使用
const arr = [1, 2, 3, 4]
const shuffledArr = shuffle(arr)
console.log(shuffledArr) //顺序打乱
```

- 使用以下算法可实现**洗牌算法**:
  1. 第 N 项数字与前 N 项数字随机选一相互交换
  2. 第 N-1 项数字与前 N-1 项数字随机选一相互交换
  3. ...
  4. 第 2 项数字与前 2 项数字随机选一相互交换

```js
const shuffle = list => {
  const newList = [...list]
  for (let i = list.length - 1; i >= 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1))
    [newList[i], newList[swapIndex]] = [newList[swapIndex], newList[i]]
  }
  return newList
}
```
