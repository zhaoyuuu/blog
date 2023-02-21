## 1 冒泡排序
```js
function bubbleSort(list) {
  let len = list.length
  while(len > 1) {
    for(let cur = 0; cur < len - 1; cur++) {
      if(list[cur] > list[cur + 1]) {
        [list[cur],list[cur + 1]] = [list[cur + 1],list[cur]]
      }
    }
    len--
  }
  return list
}

// 使用
const arr = [1, 99, 23, 65, 3, 56, 12]
const sortArr = bubbleSort(arr)
console.log(sortArr);  // [1, 3, 12, 23, 56, 65, 99]
```

## 2 快速排序
```js
function quickSort(list) {
  sortFn(0, list.length - 1)
  return list

  function sortFn(left, right) {
    if(left >= right) return
    const leftIndex = left, rightIndex = right
    const base = list[left]
    let isPitLeft = true
    while(left < right) {
      if(isPitLeft) {
        if(list[right] > base) {
          right--
        }
        else {
          list[left] = list[right]
          left++
          isPitLeft = false
        }
      }
      else {
        if(list[left] < base) {
          left++
        }
        else {
          list[right] = list[left]
          right--
          isPitLeft = true
        }
      }
    }
    list[left] = base
    sortFn(leftIndex, left - 1)
    sortFn(right + 1, rightIndex)
  }
}

// 使用
const arr = [1, 99, 23, 65, 3, 56, 12]
const sortArr = quickSort(arr)
console.log(sortArr);  // [1, 3, 12, 23, 56, 65, 99]
```

## 3 选择排序
```js
function selectSort(list) {
  for(let i = 0; i < list.length; i++) {
    let min = list[i], minIndex = i
    for(let j = i + 1; j < list.length; j++) {
      if(list[j] < min) {
        min = list[j]
        minIndex = j
      }
    }
    // 交换 min 与 未排序数组第一个元素
    [list[i], list[minIndex]] = [list[minIndex], list[i]]
  }
  return list
}

// 使用
const arr = [1, 99, 23, 65, 3, 56, 12]
const sortArr = selectSort(arr)
console.log(sortArr);  // [1, 3, 12, 23, 56, 65, 99]
```

## 4 插入排序
```js
function insertSort(list) {
  for(let i = 1; i < list.length; i++) {
    let j = i
    while(list[j] < list[j - 1] && j > 0) {
      [list[j], list[j - 1]] = [list[j - 1], list[j]]
      j--
    }
  }
  return list
}

// 使用
const arr = [1, 99, 23, 65, 3, 56, 12]
const sortArr = insertSort(arr)
console.log(sortArr);  // [1, 3, 12, 23, 56, 65, 99]
```

## 5 二分查找
```js
function search(list, target) {
  // 这里假设 给定的list数组是递增的
  let left = 0, right = list.length - 1
  while(left <= right) {
    let mid = Math.floor((left + right) / 2)
    if(list[mid] === target) return mid
    else if(list[mid] > target) right = mid - 1
    else if(list[mid] < target) left = mid + 1
  }
  return -1
}

// 使用
const arr = [-1,0,3,5,9,12]
const searchIndex = search(arr, 9)
console.log(searchIndex);  // 4
```