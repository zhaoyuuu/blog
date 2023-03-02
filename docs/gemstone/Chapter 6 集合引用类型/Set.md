# Set 集合

难度：⭐️

> 💌 ECMAScript 6 新增的 Set 是一种新集合类型，为这门语言带来**集合数据结构**。Set 在很多方面都像是**加强的 Map**，这是因为它们的大多数 API 和行为都是共有的。

## 基本 API

> `add()` | `has()` | `size` | `delete()` `clear()`

```js
const m = new Set();
```

如果想在**创建的同时初始化实例**，则可以给 Set 构造函数传入一个**可迭代对象**，其中需要包含插入到新集合实例中的元素：

```js
// 使用数组初始化集合
const s1 = new Set(["val1", "val2", "val3"]);
alert(s1.size); // 3
// 使用自定义迭代器初始化集合
const s2 = new Set({
  [Symbol.iterator]: function*() {
    yield "val1";
    yield "val2";
    yield "val3";
  }
});
alert(s2.size); // 3
```

初始化之后，可以使用 `add()`增加值，使用 `has()`查询，通过 `size` 取得元素数量，以及使用 `delete()`和 `clear()`删除元素

> 与 Map 类似，Set 可以包含**任何 JavaScript 数据类型**作为值。

## 顺序与迭代

跟 Map 十分相似：集合实例可以提供一个迭代器（`Iterator`），能以插入顺序生成集合内容。可以通过 `values()`方法及其别名方法 `keys()`（或者 `Symbol.iterator` 属性，它引用 `values()`）取得这个迭代器。（代码略）

因为 **`values()` 是默认迭代器**，所以可以直接对集合实例使用**扩展操作**，把**集合转换为数组**：

```js
const s = new Set(["val1", "val2", "val3"]);
console.log([...s]); // ["val1", "val2", "val3"]
```

<br>

---

从各方面来看，Set 跟 Map 都很相似，只是 API 稍有调整。
