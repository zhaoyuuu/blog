# maxBy 据给定条件找到最大的数组项

💡 **Guide:**<br>
需要实现以下效果：

```js
const data = [{ value: 6 }, { value: 2 }, { value: 4 }];
maxBy(data, (x) => x.value);
// { value: 6 }
```

如果最大项有多个，则都返回：

```js
const data = [{ value: 6 }, { value: 2 }, { value: 4 }, { value: 6 }];
maxBy(data, (x) => x.value);
// [{ value: 6 }, { value: 6 }]
```

## 实现

```js
const maxBy = (arr, keyBy) => {
  const res = []
  let maxVal = -Infinity
  arr.forEach(item => {
    const val = keyBy(item)
    if (val > maxVal) {
      res.length = 0
      res.push(item)
      maxVal = val
    } else if (val === maxVal) {
      res.push(item)
    }
  })
  return res
}
// 使用
const data = [{ value: 6 }, { value: 2 }, { value: 4 }, { value: 6 }]
console.log(maxBy(data, x => x.value))
// [{ value: 6 }, { value: 6 }]
```
