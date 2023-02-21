## 1 实现forEach方法
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

## 2 实现filter方法
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

## 3 实现find方法
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

## 4 实现findIndex方法
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

## 5 实现map方法
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

## 5 实现map方法
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

## 6 实现reduce方法
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

## 7 实现every方法
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

## 7 实现some方法
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
