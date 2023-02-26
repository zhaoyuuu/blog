# async & await 异步函数

难度：⭐️⭐️⭐️

> 💌 `async/await` 是 ES8 规范新增的。这个特性从行为和语法上都增强了 JavaScript，让以**同步方式写的代码**能够**异步执行**。

下面来看一个最简单的例子，这个期约（`promise`）在超时之后会解决为一个值：

```js
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
```

如果程序中的其他代码要在这个值（3）可用时**访问它**，则需要写一个**解决处理程序**：

```js
p.then((x) => console.log(x)); // 3
```

这其实是很**不方便**的，因为其他代码都必须塞到期约处理程序中。ES8 为此提供了 `async/await` 关键字。

## 异步函数

> `async` `await`

ES8 的` async/await` 旨在解决利用**异步结构组织代码**的问题，为其增加了两个新关键字：`async` 和 `await`。

### async

🧱 **`async` 关键字用于声明异步函数**。使用 `async` 关键字可以让函数具有**异步特征**，但总体上其代码**仍然是同步求值的**❗️。而在参数或闭包方面，异步函数仍然具有普通 JavaScript 函数的正常行为：

```js
async function foo() {
  console.log(1);
}
foo();
console.log(2);
// 1
// 2
```

🧱 异步函数如果使用 **`return` 关键字返回了值**（如果没有 `return` 则会返回 `undefined`），这个值会**被 `Promise.resolve()`包装成一个期约对象**。**异步函数始终返回期约对象**：

```js
async function foo() {
  console.log(1);
  return 3;
}
// 给返回的期约添加一个解决处理程序
foo().then(console.log);
console.log(2);
// 1
// 2
// 3
```

🧱 **异步函数的返回值**期待（但**实际上并不要求**）一个实现 `thenable` 接口的对象，但常规的值也可以：

```js
// 返回一个原始值
async function foo() {
  return 'foo';
}
foo().then(console.log);
// foo

// 返回一个实现了 thenable 接口的非期约对象
async function baz() {
  const thenable = {
    then(callback) { callback('baz'); }
  };
  return thenable;
}
baz().then(console.log);
// baz
```

> - 如果返回的是实现 `thenable` 接口的对象，则这个对象可以由提供给 `then()`的处理程序 **“解包”**
> - 如果不是，则返回值就被当作已经解决的期约

⚠ 不过，**拒绝期约**的错误不会被异步函数捕获：

```js{3,10}
async function foo() {
  console.log(1);
  Promise.reject(3);
}
// Attach a rejected handler to the returned promise
foo().catch(console.log);
console.log(2);
// 1
// 2
// Uncaught (in promise): 3
```

### await

因为异步函数主要针对**不会马上完成**的任务，所以自然需要一种**暂停和恢复执行**的能力。使用 `await` 关键字可以**暂停**异步函数代码的执行，**等待期约解决**。

```js{7}
// 1000 毫秒后异步打印"baz"
async function baz() {
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  console.log('baz');
}
baz();
// baz（1000 毫秒后）
```

❗️ **注意：**`await` 关键字会**暂停执行异步函数后面的代码**，让出 JavaScript 运行时的执行线程（这个行为与生成器函数中的 `yield` 关键字是一样的）。`await` 关键字同样是**尝试“解包”对象的值**，然后将这个值**传给表达式**，再**异步恢复异步函数的执行**。

**`await` 关键字**期待（但**实际上并不要求**）一个实现 `thenable` 接口的对象，但常规的值也可以。这一点跟**异步函数的返回值**一致：

```js
// 等待一个原始值
async function foo() {
  console.log(await 'foo');
}
foo();
// foo
// 等待一个实现了 thenable 接口的非期约对象
async function baz() {
  const thenable = {
    then(callback) { callback('baz'); }
  };
 console.log(await thenable);
}
baz();
// baz
// 等待一个期约
async function qux() {
  console.log(await Promise.resolve('qux'));
}
qux();
// qux
```

如我们在异步函数里演示的，**单独的 `Promise.reject()` 不会被异步函数捕获**，而会抛出未捕获错误。But❗️ However❗️ 对**拒绝的期约**使用 **`await`** 则会**释放（unwrap）错误值**（将拒绝期约返回）：

```js{3,4,11}
async function foo() {
  console.log(1);
  await Promise.reject(3);
  console.log(4); // 这行代码不会执行
}
// 给返回的期约添加一个拒绝处理程序
foo().catch(console.log);
console.log(2);
// 1
// 2
// 3
```

### await 的限制

`await` 关键字**必须在异步函数中使用**，不能在顶级上下文如`<script>`标签或模块中使用。

## 停止和恢复执行

> TC39 对 `await` **后面是期约的情况**如何处理做过一次修改。修改前：`Promise.resolve()` 会生成**两个异步任务**；修改后：`Promise.resolve()` 只会生成**一个异步任务**。接下来所示代码的结果都是现在（修改后）的实际情况。

```js
async function foo() {
  console.log(await Promise.resolve('foo'))
}
async function bar() {
  console.log(await 'bar')
}
async function baz() {
  console.log('baz')
}
foo()
bar()
baz()
// baz
// foo
// bar
```

**`async/await` 中真正起作用的是 `await`。**`async` 关键字，无论从哪方面来看，都**不过是一个标识符**（好轻蔑的语气 😂）。毕竟，异步函数如果不包含 `await` 关键字，其执行基本上跟普通函数没有什么区别。

要完全理解 `await` 关键字，必须知道它**并非只是等待一个值可用那么简单**。JavaScript 运行时在碰到 `await` 关键字时，会**记录在哪里暂停执行**。**等到 `await` 右边的值可用**了，JavaScript 运行时会**向消息队列中推送一个任务**，这个任务会**恢复异步函数的执行**。<br>
因此，即使 `await` 后面跟着一个**立即可用**的值，函数的其余部分也会被**异步求值**：

```js{3}
async function foo() {
  console.log(2);
  await null;  // null 是一个立即可用的值，但 await 也会暂停执行
  console.log(4);
}
console.log(1);
foo();
console.log(3);
// 1
// 2
// 3
// 4
```

控制台中输出结果的顺序很好地解释了**运行时的工作过程**：

1.  打印 1；
2.  调用异步函数 foo()；
3.  （在 foo()中）打印 2；
4.  （在 foo()中）`await` 关键字**暂停执行**，为立即可用的值 `null` **向消息队列中添加一个任务**；
5.  foo()退出；
6.  打印 3；
7.  **同步线程的代码执行完毕**；
8.  JavaScript 运行时**从消息队列中取出任务，恢复异步函数执行**；
9.  （在 foo()中）恢复执行，`await` 取得 `null` 值（这里并没有使用）；
10. （在 foo()中）打印 4；
11. foo()返回。

如果 `await` **后面是一个期约**，也是一样的执行顺序，没有区别：

```js{3,8}
async function foo() {
  console.log(2)
  console.log(await Promise.resolve(8))
  console.log(9)
}
async function bar() {
  console.log(4)
  console.log(await 6)
  console.log(7)
}
console.log(1)
foo()
console.log(3)
bar()
console.log(5)
// 1
// 2
// 3
// 4
// 5
// 8
// 9
// 6
// 7
```

> 这里书中应该写的是修改前的情况，即：`await` 后面是一个期约的时候，为了执行异步函数，会有**两个任务**被添加到消息队列并被异步求值。现在（修改后）更好理解 🤗。

---

✨ 总之，通过期约和 `async/await`，不仅可以实现之前**难以实现或不可能实现**的任务，而且也能写出**更清晰、简洁**，并且**容易理解、调试**的代码。
