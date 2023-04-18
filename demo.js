// const obj = {
//   a: xyz,
//   b: uvm,
// }
// 111{obj.a}555{obj.b}666{obj.g}
// =>111xyz555uvm666{obj.g}
function fn(str) {
  let res
  res = str.replace('{obj.a}', 'xyz')
  res = res.replace('{obj.b}', 'uvm')
  return res
}
const str = '111{obj.a}555{obj.b}666{obj.g}'
const res = fn(str)
console.log(res)
