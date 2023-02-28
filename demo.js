let sum = function (num1, num2) {
  return num1 + num2
}
console.log(sum.__proto__ === sum.prototype)
