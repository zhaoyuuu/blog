// 给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
function union(arr1, arr2) {
  const res = []
  for (let i = 0; i < arr1.length; i++) {
    const val = arr1[i]
    const idx = arr2.indexOf(val)
    if (idx !== -1) {
      res.push(val)
      arr2.splice(idx, 1)
    }
  }
  return res
}

const arr1 = [1, 2, 2, 1],
  arr2 = [2, 2, 2]
console.log(union(arr1, arr2))
// [2, 2]
