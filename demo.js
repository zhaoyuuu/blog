// - 使用以下算法可实现洗牌算法:
//   1. 第 N 项数字与前 N 项数字随机选一相互交换
//   2. 第 N-1 项数字与前 N-1 项数字随机选一相互交换
//   3. ...
//   4. 第 2 项数字与前 2 项数字随机选一相互交换

const shuffle = list => {
  const newList = [...list]
  for (let i = list.length - 1; i >= 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1))
    ;[newList[i], newList[swapIndex]] = [newList[swapIndex], newList[i]]
  }
  return newList
}
const arr = [1, 2, 3, 4]
const shuffledArr = shuffle(arr)
console.log(shuffledArr) //顺序打乱
