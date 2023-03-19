// const data = [{ value: 6 }, { value: 2 }, { value: 4 }, { value: 6 }];
//=> [{ value: 6 }, { value: 6 }]
// maxBy(data, (x) => x.value);

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

const data = [{ value: 6 }, { value: 2 }, { value: 4 }, { value: 6 }]
console.log(maxBy(data, x => x.value))
// [ { value: 6 }, { value: 6 } ]
