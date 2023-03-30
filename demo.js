function fn(cookieNums, requestNums, widthArr, bagArr) {
  const cookieWeight = read_line().split(' ').map(width => Math.pow(parseInt(width), 2))
  cookieWeight.sort((a, b) => a - b)
  const bag = read_line().split(' ').map(n => parseInt(n))
  const res = []
  for(let i = 0; i < requestNums; i++) {
    let sum = 0, count = -1
    for(let j = 0; sum <= bag[i] && j < cookieNums; j++) {
      sum += cookieWeight[j]
      count++
    }
    res.push(count)
  }
}