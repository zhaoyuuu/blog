function quickSort(nums) {
  if (nums.length < 2) return nums

  const base = nums[0]
  const leftNums = [],
    rightNums = []
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= base) {
      leftNums.push(nums[i])
    } else {
      rightNums.push(nums[i])
    }
  }

  return [...quickSort(leftNums), base, ...quickSort(rightNums)]
}

const arr = [1, 99, 23, 65, 3, 56, 12]
const sortArr = quickSort(arr)
console.log(sortArr) // [1, 3, 12, 23, 56, 65, 99]
