# WeakSet 弱集合

难度：⭐️⭐️

> 💌 WeakSet 是 Set 的“兄弟”类型，**其 API 也是 Set 的子集**。WeakSet 中的“weak”（弱），描述的是 JavaScript **垃圾回收程序对待“弱集合”中值的方式**。

> ✨ `WeakSet 和 Set 的关系` 相比于 `WeakMap 和 Map 的关系`，不能说一模一样，只能说是一个模子刻出来的（WeakMap 弱的是“键”，WeakSet 弱的是“值”）。

## 基本 API

```js
const ws = new WeakSet();
```

弱集合中的**值只能是 Object 或者继承自 Object 的类型**，尝试使用非对象设置值会抛出 TypeError。

```js
// 初始化是全有或全无的操作
// 只要有一个值无效就会抛出错误，导致整个初始化失败
const ws2 = new WeakSet([val1, "BADVAL", val3]);
// TypeError: Invalid value used in WeakSet
typeof ws2;
// ReferenceError: ws2 is not defined
// 原始值可以先包装成对象再用作值
const stringVal = new String("val1");
const ws3 = new WeakSet([stringVal]);
alert(ws3.has(stringVal)); // true
```

## 弱值

同 [WeakMap 弱键](/gemstone/Chapter%206%20集合引用类型/WeakMap.html#弱键)，只不过**弱键变成了弱值**。

```js
const ws = new WeakSet();
const container = {
  val: {}
};
ws.add(container.val);
function removeReference() {
  container.val = null;
}
```

`container` 对象维护着一个**对弱集合值的引用**，因此这个对象值不会成为垃圾回收的目标。不过，如果调用了 `removeReference()`，就会**摧毁值对象的最后一个引用**，垃圾回收程序就可以把这个值清理掉。

## 不可迭代值

WeakSet 之所以限制只能用对象作为值，是为了保证**只有通过值对象的引用才能取得值**。

> 如果允许原始值，那就没办法区分**初始化时**使用的字符串字面量和**初始化之后**使用的一个相等的字符串了。

<br>

---

WeakSet 和 WeakMap 实在是太像了。
