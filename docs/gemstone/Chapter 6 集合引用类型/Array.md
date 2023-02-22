# Array 数组

> 💌 除了 Object，Array 应该就是 ECMAScript 中最常用的类型了。

ECMAScript 数组的特点（和其他语言相比）：

- 数组中每个槽位可以存储**任意类型**的数据。这意味着可以创建一个数组，它的第一个元素是字符串，第二个元素是数值，第三个是对象..
- ECMAScript 数组是**动态大小**的，会随着数据添加而自动增长

## 两个新增的方法

Array 构造函数有两个 ES6 新增的用于**创建数组**的静态方法：`from()` 和 `of()`。<br>
`from()` 用于将**类数组结构**转换为数组实例，而 `of()` 用于将**一组参数**转换为数组实例。

`Array.from()`的第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个 `length` 属性
和可索引元素的结构。这种方式可用于很多场合（下面是三种常见场景）：

```js
// 字符串会被拆分为单字符数组
console.log(Array.from("Matt")); // ["M", "a", "t", "t"]

// arguments 对象可以被轻松地转换为数组
function getArgsArray() {
  return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4]

// from()也能转换带有必要属性的自定义对象
const arrayLikeObject = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4
};
console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4]
```

`Array.of()`可以把一组参数转换为数组。这个方法用于替代在 ES6 之前常用的 `Array.prototype.slice.call(arguments)`，一种异常笨拙的将 `arguments` 对象转换为数组的写法：

```js
console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
console.log(Array.of(undefined)); // [undefined]
```

## length 数组索引

> 数组 length 属性的独特之处在于，它**不是只读**的。

```js
// 1.从数组末尾删除元素
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 2;
alert(colors[2]); // undefined

// 2.从数组末尾添加元素
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 4;
alert(colors[3]); // undefined

// 3.
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors[99] = "black"; // 添加一种颜色（位置 99）
alert(colors.length); // 100
```

上面最后一种情况，`colors` 数组有一个值被插入到位置 99，结果新 `length` 就变成了 100（99 + 1）。这中间的所有元素，即位置 3~98，实际上并不存在，因此在访问时会返回 undefined（即“数组空位”）。

## 检测数组

- `instanceof`

```js
if (value instanceof Array){
  // 操作数组
}
```

- `Array.isArray`

```js
if (Array.isArray(value)){
  // 操作数组
}
```

使用 `instanceof` 是有前提条件的，书中这样说：

> 使用 instanceof 的问题是假定只有一个全局执行上下文。如果网页里有多个框架，则可能涉及两个不同的全局执行上下文，因此就会有两个不同版本的 Array 构造函数。如果要把数组从一个框架传给另一个框架，则这个数组的构造函数将有别于在第二个框架内本地创建的数组。而 `Array.isArray` 就没有这个问题。

咳咳...我觉得一般不考虑，这两者都是很好的、检测数组的方法。
