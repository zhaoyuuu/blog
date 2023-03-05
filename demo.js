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
