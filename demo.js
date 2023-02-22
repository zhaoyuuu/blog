const arr = [1, 2, 3]
function change(array) {
  array[0] = 100
  array = [4, 5, 6]
}
change(arr)
console.log(arr)
