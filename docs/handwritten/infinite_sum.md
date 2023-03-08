# Infinite-sum 无限累加

🤔 实现一个 `sum` 函数如下所示：

```js
sum(1, 2, 3).valueOf(); //6
sum(2, 3)(2).valueOf(); //7
sum(1)(2)(3)(4).valueOf(); //10
sum(2)(4, 1)(2).valueOf(); //9
sum(1)(2)(3)(4)(5)(6).valueOf(); // 21
```

## 实现

🧐 这是一个关于**懒计算**的函数，使用 `sum` 收集所有累加项，使用 `valueOf` 进行计算

- `sum` 返回一个函数，**收集所有的累加项**，使用递归实现
- 返回函数带有 `valueOf` 属性，用于**统一计算**

```js
const sum = function (...args) {
  const f = (...newArgs) => sum(...args, ...newArgs)
  f.valueOf = () => args.reduce((pre, cur) => pre + cur)
  return f
}

console.log(sum(1)(2)(3, 4).valueOf()) // 10
```
