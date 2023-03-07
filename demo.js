// sum(1)(2)(3)(4).valueOf(); //10
const sum = function (...args) {
  const f = n => sum(...args, n)
  f.valueOf = () => args.reduce((pre, cur) => pre + cur)
  return f
}

console.log(sum(1)(2)(3)(4).valueOf()) // 10
