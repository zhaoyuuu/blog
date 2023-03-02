# WeakMap 弱映射

难度：⭐️⭐️

> 💌 ECMAScript 6 新增的“弱映射”（WeakMap）是一种新的集合类型，为这门语言带来了**增强的**键/值对存储机制。WeakMap 是 Map 的“兄弟”类型，**其 API 也是 Map 的子集**。<br>
> WeakMap 中的“weak”（弱），描述的是 JavaScript **垃圾回收程序对待“弱映射”中键的方式**。

## 基本 API

> `set()` | `get()` `has()` | `delete()`

```js
const wm = new WeakMap();
```

弱映射中的 **“键”: 只能是 Object 或者继承自 Object 的类型**，尝试使用非对象设置键会抛出 TypeError。“值”的类型没有限制。

```js{5}
// 初始化是全有或全无的操作
// 只要有一个键无效就会抛出错误，导致整个初始化失败
const wm2 = new WeakMap([
  [key1, "val1"],
  ["BADKEY", "val2"],
  [key3, "val3"]
]);
// TypeError: Invalid value used as WeakMap key
typeof wm2;
// ReferenceError: wm2 is not defined
// 原始值可以先包装成对象再用作键
const stringKey = new String("key1");
const wm3 = new WeakMap([
  stringKey, "val1"
]);
alert(wm3.get(stringKey)); // "val1"
```

初始化之后可以使用 `set()` 再添加键/值对，可以使用 `get()`和 `has()`查询，还可以使用 `delete()`删除（同 Map）。

## 弱键

WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，**这些键不属于正式的引用，不会阻止垃圾回收**。<br>但要注意的是，**弱映射中值的引用可不是“弱弱地拿着”的**。只要键存在，键/值对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收。

```js
const wm = new WeakMap();
const container = {
 key: {}
};
wm.set(container.key, "val");
function removeReference() {
 container.key = null;
}
```

`container` 对象维护着一个对弱映射键的引用，因此这个**对象键不会成为垃圾回收的目标**。不过，如果调用了 `removeReference()`，就会**摧毁键对象的最后一个引用**，垃圾回收程序就可以把这个键/值对清理掉。

## 不可迭代键

因为 WeakMap 中的键/值对任何时候都可能被销毁(GC)，所以没必要提供迭代其键/值对的能力。当然，也用不着像 `clear()`这样一次性销毁所有键/值的方法。

WeakMap 实例之所以限制只能用对象作为键，是为了保证**只有通过键对象的引用才能取得值**。

> 如果允许原始值，那就没办法区分**初始化时**使用的字符串字面量和**初始化之后**使用的一个相等的字符串了。

## 使用弱映射

- 私有变量（略）
- DOM 节点元数据

  ```js
  const m = new Map();
  const loginButton = document.querySelector('#login');
  // 给这个节点关联一些元数据
  m.set(loginButton, {disabled: true});
  ```

  ❌ 假设在上面的代码执行后，页面被 JavaScript 改变了，**原来的登录按钮从 DOM 树中被删掉了**。但由于映射中还保存着按钮的引用，所以**对应的 DOM 节点仍然会逗留在内存中**，除非明确将其从映射中删除或者等到映射本身被销毁。<br><br>
  ✔︎ 如果这里使用的是**弱映射**，如以下代码所示，那么当节点从 DOM 树中被删除后，**垃圾回收程序就可以立即释放其内存**（假设没有其他地方引用这个对象）：

  ```js{1}
  const wm = new WeakMap();
  const loginButton = document.querySelector('#login');
  // 给这个节点关联一些元数据
  wm.set(loginButton, {disabled: true});
  ```
