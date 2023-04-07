提一下 **以往的（过时的）** 异步编程模式：`setTimeout()` 和 回调函数 。<br>
❌ **缺点：** 随着代码越来越复杂，回调策略是**不具有扩展性**的。**“回调地狱”** 这个称呼可谓名至实归 👎。嵌套回调的代码维护起来就是噩梦。

---

# promise 期约

难度：⭐️⭐️⭐️

> 💌 期约是对**尚不存在**结果的一个替身。

ECMAScript 6 增加了对 Promises/A+ 规范的完善支持，即 `Promise` 类型。一经推出，`Promise` 就大受欢迎，成为了**主导性的异步编程机制**。所有现代浏览器都支持 ES6 期约，很多其他浏览器 API（如`fetch()`和 `Battery Status API`）也以 `promise` 为基础。

## promise 基础

> 👉 如果你之前了解过 `promise` ，那这一节对你来说其实没多少新的知识。但是我发现书中有很多说法是我之前没见过的，乍一看觉得故弄玄虚，但仔细琢磨一下就可以发现这些语言组织得很精妙，是最一针见血的描述 🥳。比起市面上 加工过的、千篇一律 的“水文”好一百倍。

### 状态机

期约是一个**有状态的对象**，可能处于如下 3 种状态之一：

- 待定（`pending`）
- 兑现（`fulfilled`，有时候也称为“解决”，`resolved`）
- 拒绝（`rejected`）

状态机的基本概念不再赘述，值得注意的是，**期约的状态是私有的**，不能直接通过 JavaScript 检测到。这主要是为了避免根据读取到的期约状态，以同步方式处理期约对象。另外，期约的状态也不能被外部 JavaScript 代码修改。这与不能读取该状态的原因是一样的：**期约故意将异步行为封装起来，从而隔离外部的同步代码**。

### Promise.resolve()

🟢 使用这个静态方法，实际上可以把任何值都**转换为一个期约**：

```js
// 多余的参数会忽略
setTimeout(console.log, 0, Promise.resolve(4, 5, 6));
// Promise <resolved>: 4
```

🔴 对这个静态方法而言，如果传入的参数**本身是一个期约**，那它的行为就类似于一个**空包装**。因此，`Promise.resolve() `可以说是一个**幂等方法**：

```js
let p = Promise.resolve(7);
setTimeout(console.log, 0, p === Promise.resolve(p));
// true
setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p)));
// true
```

> 可以看到，`Promise.resolve()` 检测到参数是一个 `promsie` 对象之后，**原封不动**的返回这个 `promsie` 对象。

⚠ 注意，这个静态方法能够**包装任何非期约值**，包括**错误对象**，并将其转换为**解决的期约**。因此，也可能导致不符合预期的行为：

```js
let p = Promise.resolve(new Error('foo'));
setTimeout(console.log, 0, p);
// Promise <resolved>: Error: foo
```

> 如上，错误对象先被转换成**状态为 `resolved` 的期约**，然后幂等返回。所以最后返回值是一个 `resolved` 期约（反直觉）。但是错误对象也是对象，`Promise.resolve()` 这样做也是很好理解的。

### Promise.reject()

与 `Promise.resolve()`类似，`Promise.reject()`会实例化一个拒绝的期约并抛出一个异步错误。<br>
❗️ **关键在于：**`Promise.reject()`并没有照搬 `Promise.resolve()`的幂等逻辑。如果给它传一个**期约对象**，则这个期约会成为它**返回的拒绝期约的理由**：

```js
console.log(Promise.reject(Promise.resolve()))
// Promise { <rejected> Promise { undefined } }
```

<br>

啰嗦几句 🙃：<br>
就方法名称来看，直觉上我们会认为 `Promise.resolve()` 和 `Promise.reject()` 的逻辑设计应该一样，可事实并非如此。就像上面所演示的，`Promise.reject()` 不遵从幂等逻辑，换做`Promise.resolve()`的话，结果会是这样：

```js
console.log(Promise.resolve(Promise.resolve()))
// Promise { undefined }
```

### 同步/异步执行的二元性

Promise 的设计很大程度上会导致一种完全不同于 JavaScript 的计算模式。下面的例子完美地展示了这一点，其中包含了两种模式下抛出错误的情形：

```js
try {
  throw new Error('foo');
} catch(e) {
  console.log(e); // Error: foo
}
try {
  Promise.reject(new Error('bar'));
} catch(e) {
  console.log(e);
}
// Uncaught (in promise) Error: bar
```

第一个 `try/catch` 抛出并捕获了错误，第二个 `try/catch` 抛出错误却没有捕获到，是因为它没有通过**异步模式**捕获错误。

> 👉 从这里就可以看出期约真正的异步特性：它们是同步对象（在同步执行模式中使用），但也是异步执行模式的媒介。

在前面的例子中，**拒绝期约的错误**并没有抛到执行**同步代码的线程**里，而是通过浏览器**异步消息队列**来处理的。因此，`try/catch` 块并不能捕获该错误。<br>

> ✨ 代码一旦开始以**异步模式**执行，则**唯一与之交互的方式**就是使用异步结构——更具体地说，就是**期约的方法**。

## 期约的实例方法

🌉 期约实例的方法是连接**外部同步代码**与**内部异步代码**之间的桥梁。

### Thenable 接口

在 ECMAScript 暴露的异步结构中，任何对象都有一个 `then()` 方法。

### Promise.prototype.then()

这个 then()方法接收最多两个参数：`onResolved` 处理程序和 `onRejected` 处理程序。因为期约只能转换为最终状态一次，所以这两个操作一定是**互斥**的。

❗️ 注意返回值：<br>
这个新期约实例基于 `onResovled` 处理程序的返回值构建。换句话说，该处理程序的**返回值会通过 `Promise.resolve()` 包装来生成新期约**。

- 如果**没有提供这个处理程序**，则 `Promise.resolve()` 就会包装上一个期约解决之后的值。
- 如果**没有显式的返回语句**，则 `Promise.resolve()`会包装默认的返回值 `undefined`。

```js
let p1 = Promise.resolve('foo');
// 若调用 then()时不传处理程序，则原样向后传
let p2 = p1.then();
setTimeout(console.log, 0, p2); // Promise <resolved>: foo
// 没有显式的返回语句
let p3 = p1.then(() => console.log('no return'));
setTimeout(console.log, 0, p3); // Promise <resolved>: undefined
```

- 如果**有显式的返回值**，则 `Promise.resolve()`会包装这个值（一般情况）：

```js
let p8 = p1.then(() => new Promise(() => {}));
let p9 = p1.then(() => Promise.reject());
// Uncaught (in promise): undefined
setTimeout(console.log, 0, p8); // Promise <pending>
setTimeout(console.log, 0, p9); // Promise <rejected>: undefined
```

<br>

👉 `onRejected` 处理程序也与之类似：`onRejected` 处理程序返回的值**也会被 `Promise.resolve()`包装**。

### Promise.prototype.catch()

这个方法只接收一个参数：`onRejected` 处理程序。事实上，这个方法就是一个**语法糖**🍭，调用它就相当于调用 `Promise.prototype. then(null, onRejected)`。

**返回值：** 在返回新期约实例方面，`Promise.prototype.catch()`的行为与 `Promise.prototype.then()`的 `onRejected` 处理程序是一样的 🤗。

### Promise.prototype.finally()

这个新期约实例不同于 `then()`或 `catch()`方式**返回的实例**（返回值）。因为 `onFinally` 被设计为一个**状态无关**的方法，所以在大多数情况下它将表现为**父期约的传递**。对于已解决状态和被拒绝状态都是如此：

```js
let p1 = Promise.resolve('foo');
// 这里都会原样后传
let p2 = p1.finally();
let p3 = p1.finally(() => undefined);
let p4 = p1.finally(() => {});
let p5 = p1.finally(() => Promise.resolve());
let p6 = p1.finally(() => 'bar');
let p7 = p1.finally(() => Promise.resolve('bar'));
let p8 = p1.finally(() => Error('qux'));
setTimeout(console.log, 0, p2); // Promise <resolved>: foo
setTimeout(console.log, 0, p3); // Promise <resolved>: foo
setTimeout(console.log, 0, p4); // Promise <resolved>: foo
setTimeout(console.log, 0, p5); // Promise <resolved>: foo
setTimeout(console.log, 0, p6); // Promise <resolved>: foo
setTimeout(console.log, 0, p7); // Promise <resolved>: foo
setTimeout(console.log, 0, p8); // Promise <resolved>: foo
```

### 非重入期约方法（执行顺序）

当期约进入落定状态时，与该状态相关的处理程序仅仅会被**排期**，而非立即执行。

```js
// 创建解决的期约
let p = Promise.resolve();
// 添加解决处理程序
// 直觉上，这个处理程序会等期约一解决就执行
p.then(() => console.log('onResolved handler'));
// 同步输出，证明 then()已经返回
console.log('then() returns');
// 实际的输出：
// then() returns
// onResolved handler
```

非重入适用于 `onResolved/onRejected` 处理程序、`catch()`处理程序和 `finally()`处理程序：

```js{17-20}
let p1 = Promise.resolve();
p1.then(() => console.log('p1.then() onResolved'));
console.log('p1.then() returns');
let p2 = Promise.reject();
p2.then(null, () => console.log('p2.then() onRejected'));
console.log('p2.then() returns');
let p3 = Promise.reject();
p3.catch(() => console.log('p3.catch() onRejected'));
console.log('p3.catch() returns');
let p4 = Promise.resolve();
p4.finally(() => console.log('p4.finally() onFinally'));
console.log('p4.finally() returns');
// p1.then() returns
// p2.then() returns
// p3.catch() returns
// p4.finally() returns
// p1.then() onResolved
// p2.then() onRejected
// p3.catch() onRejected
// p4.finally() onFinally
```

> 用过 `promise` 的同学应该对上面的输出结果**不会感到丝毫意外**，这里主要是介绍一下 **“非重入”** 这一概念。

## 期约连锁与期约合成

让每个执行器都**返回一个期约实例**，这样就可以让每个后续期约都等待之前的期约，也就是**串行化异步任务**。比如，可以像下面这样让每个期约在一定时间后解决：

```js
let p1 = new Promise((resolve, reject) => {
  console.log('p1 executor')
  setTimeout(resolve, 1000)
})
p1.then(
  () =>
    new Promise((resolve, reject) => {
      console.log('p2 executor')
      setTimeout(resolve, 1000)
    })
)
  .then(
    () =>
      new Promise((resolve, reject) => {
        console.log('p3 executor')
        setTimeout(resolve, 1000)
      })
  )
  .then(
    () =>
      new Promise((resolve, reject) => {
        console.log('p4 executor')
        setTimeout(resolve, 1000)
      })
  )
// p1 executor（1 秒后）
// p2 executor（2 秒后）
// p3 executor（3 秒后）
// p4 executor（4 秒后）
```

每个后续的处理程序都会**等待前一个期约解决**，然后**实例化一个新期约并返回它**。这种结构可以简洁地将异步任务串行化，**解决之前回调地狱的难题**👍。

### Promise.all()

`Promise.all()`静态方法创建的期约会在**一组期约全部解决之后再解决**。这个静态方法接收一个**可迭代对象**，返回一个新期约：

```js
let p1 = Promise.all([
  Promise.resolve(),
  Promise.resolve()
]);
// 可迭代对象中的元素会通过 Promise.resolve()转换为期约
let p2 = Promise.all([3, 4]);
// 空的可迭代对象等价于 Promise.resolve()
let p3 = Promise.all([]);
```

如果至少有一个包含的期约**待定**，则合成的期约也会**待定**。如果有一个包含的期约**拒绝**，则合成的期约也会**拒绝**：

```js{7}
// 永远待定
let p1 = Promise.all([new Promise(() => {})]);
setTimeout(console.log, 0, p1); // Promise <pending>
// 一次拒绝会导致最终期约拒绝
let p2 = Promise.all([
  Promise.resolve(),
  Promise.reject(),
  Promise.resolve()
]);
setTimeout(console.log, 0, p2); // Promise <rejected>
```

❗️ **注意：** 如果有期约拒绝，则 **第一个拒绝的期约** 会将自己的理由作为合成期约的拒绝理由。之后再拒绝的期约不会影响最终期约的拒绝理由。**不过，这并不影响所有包含期约正常的拒绝操作。** 合成的期约会静默处理**所有**包含期约的**拒绝操作**，如下所示：

```js
// 虽然只有第一个期约的拒绝理由会进入
// 拒绝处理程序，第二个期约的拒绝也
// 会被静默处理，不会有错误跑掉
let p = Promise.all([
  Promise.reject(3),
  new Promise((resolve, reject) => setTimeout(reject, 1000))
]);
p.catch((reason) => setTimeout(console.log, 0, reason)); // 3
// 没有未处理的错误
```

### Promise.race()

`Promise.race()`静态方法返回一个包装期约，是一组集合中**最先解决或拒绝**的期约。这个方法接收一个**可迭代对象**，返回一个新期约。

如果有一个期约拒绝，只要它是第一个落定的，就会成为拒绝合成期约的理由。之后再拒绝的期约不会影响最终期约的拒绝理由。不过，这并不影响所有包含期约正常的拒绝操作。**与 `Promise.all()` 类似，合成的期约会静默处理所有包含期约的拒绝操作**。

## 期约扩展

感觉用的不多？先挖个坑 😘。
