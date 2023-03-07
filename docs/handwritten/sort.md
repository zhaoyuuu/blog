# Sort-collection 排序合集

## 1 冒泡排序

### 算法：

- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

![冒泡排序](https://www.runoob.com/wp-content/uploads/2019/03/bubbleSort.gif)

### 实现：

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

### 算法：

- 从数列中挑出一个元素，称为 "基准";
- 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
- 递归地把小于基准值元素的子数列和大于基准值元素的子数列排序；

![快速排序](https://www.runoob.com/wp-content/uploads/2019/03/quickSort.gif)

### 实现：

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

### 算法：

- 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
- 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
- 重复第二步，直到所有元素均排序完毕。

![选择排序](https://www.runoob.com/wp-content/uploads/2019/03/selectionSort.gif)

### 实现：

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

### 算法：

- 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
- 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。

![插入排序](https://www.runoob.com/wp-content/uploads/2019/03/insertionSort.gif)

> 打过斗地主的朋友应该秒懂 😂

### 实现：

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

**前提假设：** 给定的 `list` 数组是递增的。

> ❗️ 注意范围边界的处理。

### 实现：

```js
function search(list, target) {
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
