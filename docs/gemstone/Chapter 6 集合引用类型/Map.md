# Map 字典

难度：⭐️

> 💌 作为 ECMAScript 6 的新增特性，Map 是一种新的集合类型，为这门语言带来了**真正的键/值存储机制**。

## 基本 API

> `set()` | `get()` `has()` | `size` | `delete()` `clear()`

```js
const m = new Map();
```

如果想在**创建的同时初始化实例**，可以给 Map 构造函数传入一个**可迭代对象**，需要包含**键/值对数组**:

```js
// 使用嵌套数组初始化映射
const m1 = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"]
]);
alert(m1.size); // 3
// 使用自定义迭代器初始化映射
const m2 = new Map({
  [Symbol.iterator]: function*() {
    yield ["key1", "val1"];
    yield ["key2", "val2"];
    yield ["key3", "val3"];
  }
});
alert(m2.size); // 3
```

初始化之后，可以使用 `set()` 方法再添加键/值对。另外，可以使用 `get()`和 `has()`进行查询，可以通过 `size` 属性获取映射中的键/值对的数量，还可以使用 `delete()`和 `clear()`删除值。（无演示）

> 与 Object 只能使用数值、字符串或符号作为键不同，Map 可以使用任何 JavaScript 数据类型作为键。

## 顺序与迭代

与 Object 类型的一个主要差异是，Map 实例会维护键值对的插入顺序，因此可以根据插入顺序**执行迭代操作**。
映射实例可以提供一个迭代器（`Iterator`），能以插入顺序生成`[key, value]`形式的数组。可以
通过 **`entries()`** 方法（或者 **`Symbol.iterator`** 属性，它引用 `entries()`）取得这个迭代器：

```js
const m = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"]
]);
alert(m.entries === m[Symbol.iterator]); // true
for (let pair of m.entries()) {
  alert(pair);
}
// [key1,val1]
// [key2,val2]
// [key3,val3]
for (let pair of m[Symbol.iterator]()) {
  alert(pair);
}
// [key1,val1]
// [key2,val2]
// [key3,val3]
```

## 选择 Object🔵 还是 Map🟢

对于多数 Web 开发任务来说，选择 Object 还是 Map 只是个人偏好问题，影响不大。不过，对于
在乎内存和性能的开发者来说，对象和映射之间确实存在显著的差别。

- **内存占用 - Map🟢** <br>
  不同浏览器的情况不同，但给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。
- **插入性能 - Map🟢**<br>
  向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快
  一点儿。
- **查找速度 - Object🔵**<br>
  与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对，
  则 Object 有时候速度更快。
- **删除性能 - Map🟢**<br>
  对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。如果代码涉及大量删除操作，那么毫无疑问应该选择 Map。
