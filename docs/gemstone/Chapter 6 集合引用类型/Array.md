# Array 数组

难度：⭐️

> 😟 这一块是比较基础的知识，但我并没有完全掌握，所以记录在这

> 💌 除了 Object，Array 应该就是 ECMAScript 中最常用的类型了。

ECMAScript 数组的特点（和其他语言相比）：

- 数组中每个槽位可以存储**任意类型**的数据。这意味着可以创建一个数组，它的第一个元素是字符串，第二个元素是数值，第三个是对象..
- ECMAScript 数组是**动态大小**的，会随着数据添加而自动增长

## 两个新增的方法

> `from()` `of()`

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

上面最后一种情况，`colors` 数组有一个值被插入到位置 99，结果新 `length` 就变成了 100（99 + 1）。这中间的所有元素，即位置 3~98，实际上并不存在，因此在访问时会返回 `undefined`（即**数组空位**）。

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

> 使用 `instanceof` 的问题是假定只有一个全局执行上下文。如果网页里有多个框架，则可能涉及两个不同的全局执行上下文，因此就会有两个不同版本的 Array 构造函数。如果要把数组从一个框架传给另一个框架，则这个数组的构造函数将有别于在第二个框架内本地创建的数组。而 `Array.isArray` 就没有这个问题。

咳咳...我觉得一般不考虑，这两者都是很好的、检测数组的方法。

## 迭代器方法

> `keys()` `values()` `entries()`

在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的方法：`keys()`、`values()`和
`entries()`。`keys()`返回**数组索引**的迭代器，`values()`返回**数组元素**的迭代器，而 `entries()`返回**索引/值对**的迭代器。<br>
注意，返回值都是**迭代器**，需要（可以）通过 `Array.from` 转为数组实例。

```js
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());
console.log(aKeys); // [0, 1, 2, 3]
console.log(aValues); // ["foo", "bar", "baz", "qux"]
console.log(aEntries); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
```

使用 ES6 的**解构**可以非常容易地在循环中拆分键/值对：

```js
const a = ["foo", "bar", "baz", "qux"];
for (const [idx, element] of a.entries()) {
 alert(idx);
 alert(element);
}
// 0
// foo
// 1
// bar
// 2
// baz
// 3
// qux
```

## 复制和填充方法

> `copyWithin()` `fill()`

### fill()方法

使用 `fill()` 方法可以**向一个已有的数组中插入全部或部分相同的值**。**开始索引**用于指定开始填充的位置（optional）。如果不提供**结束索引**，则一直填充到数组末尾。**负值索引从数组末尾开始计算**（你可以将负索引想象成数组长度加上它得到的一个正索引）

```js
const zeroes = [0, 0, 0, 0, 0];
// 用 6 填充索引大于等于 3 的元素
zeroes.fill(6, 3);
console.log(zeroes); // [0, 0, 0, 6, 6]
zeroes.fill(0); // 重置
// 用 7 填充索引大于等于 1 且小于 3 的元素
zeroes.fill(7, 1, 3);
console.log(zeroes); // [0, 7, 7, 0, 0];
zeroes.fill(0); // 重置
// 用 8 填充索引大于等于 1 且小于 4 的元素
// (-4 + zeroes.length = 1)
// (-1 + zeroes.length = 4)
zeroes.fill(8, -4, -1);
console.log(zeroes); // [0, 8, 8, 8, 0];
```

`fill()`静默忽略**超出数组边界、零长度及方向相反**的索引范围：

```js
// 索引过低，忽略
zeroes.fill(1, -10, -6);
console.log(zeroes); // [0, 0, 0, 0, 0]
// 索引过高，忽略
zeroes.fill(1, 10, 15);
console.log(zeroes); // [0, 0, 0, 0, 0]
// 索引反向，忽略
zeroes.fill(2, 4, 2);
console.log(zeroes); // [0, 0, 0, 0, 0]
// 索引部分可用，填充可用部分
zeroes.fill(4, 3, 10)
console.log(zeroes); // [0, 0, 0, 4, 4]
```

### copyWithin()方法

`copyWithin()`会按照指定范围**浅复制数组中的部分内容**，然后将它们**插入到指定索引开始的位置**。

> 开始索引和结束索引的规则 与 `fill()` 相同。

```js
let ints,
  reset = () => (ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
reset()
// 从 ints 中复制索引 0 开始的内容，插入到索引 5 开始的位置
// 在源索引或目标索引到达数组边界时停止
ints.copyWithin(5)
console.log(ints) // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
reset()
// 从 ints 中复制索引 5 开始的内容，插入到索引 0 开始的位置
ints.copyWithin(0, 5)
console.log(ints) // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
```

## 排序方法

> `reverse()` `sort()`

### reverse()方法

```js
let values = [1, 2, 3, 4, 5];
values.reverse();
alert(values); // 5,4,3,2,1
```

直观，但不灵活。

### sort()方法

默认情况下，`sort()`会按照升序重新排列数组元素，即最小的值在前面，最大的值在后面。为此，
**`sort()`会在每一项上调用`String()`转型函数，然后比较字符串来决定顺序**。即使数组的元素都是数值，也会先把数组转换为字符串再比较、排序。

```js{3}
let values = [0, 1, 5, 10, 15];
values.sort();
alert(values); // 0,1,10,15,5
```

一开始数组中数值的顺序是正确的，但调用 `sort()` 会**按照这些数值的字符串形式重新排序**。因此，**即使 5 小于 10，但字符串"10"在字符串"5"的前头，所以 10 还是会排到 5 前面**。

可以给 `sort()` 传入一个比较函数（常用做法），不再赘述。

## 归并方法

> `reduce()` 方法从数组第一项开始遍历到最后一项。而 `reduceRight()` 从最后一项开始遍历至第一项。

- 传给 `reduce()` 和 `reduceRight()` 的函数接收 4 个参数：上一个归并值、当前项、当前项的索引和数组本身 **(prev, cur, index, array)**
- 这个函数**返回的任何值**都会**作为下一次调用同一个函数的第一个参数**
  > 如果**没有**给这两个方法传入可选的第二个参数（作为归并起点值），则**第一次迭代将从数组的第二项开始**，因此传给归并函数的第一个参数是数组的第一项，第二个参数是数组的第二项。

```js
let values = [1, 2, 3, 4, 5];
let sum = values.reduce((prev, cur, index, array) => prev + cur);
alert(sum); // 15
```

`reduceRight()`方法与之类似，只是方向相反，除此之外，这两个方法没什么区别。
