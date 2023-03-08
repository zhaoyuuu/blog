# history 对象

难度：⭐️

> 💌 `history` 对象表示当前窗口首次使用以来用户的**导航历史记录**。因为 `history` 是 `window` 的属性，所以每个 `window` 都有自己的 `history` 对象。出于安全考虑，这个对象**不会暴露**用户访问过的 URL，但可以通过它在**不知道实际 URL 的情况下前进和后退**。

## 导航

> 方法：`go()` `forward()` `back()` 属性：`length`

**_👉 go()_**

```js
// 后退一页
history.go(-1);
// 前进一页
history.go(1);
// 前进两页
history.go(2);
```

**_👉 forward() & back()_**

```js
// 后退一页
history.back();
// 前进一页
history.forward();
```

<br>

此外，`history` 对象还有一个 `length` 属性，表示**历史记录中有多个条目**。通过以下方法测试这个值，可以确定**用户浏览器的起点是不是你的页面**：

```js
if (history.length == 1){
  // 这是用户窗口中的第一个页面
}
```

> ✨ `history` 对象通常被用于创建“后退”和“前进”按钮，以及确定页面是不是用户历史记录中的第一条记录。

## 历史状态管理

> `pushState()` `popState()` `replaceState()`

🤔 现代 Web 应用程序开发中最难的环节之一就是历史记录管理。为解决这个问题，首先出现的是 **`hashchange` 事件**。HTML5 也为 `history` 对象增加了方便的**状态管理特性**。

`hashchange` 会在页面 URL 的散列变化时被触发，开发者可以在此时执行某些操作。而**状态管理 API** 则可以让开发者改变浏览器 URL 而不会加载新页面。

- 可以使用 **`history.pushState()`** 方法。这个方法接收 3 个参数：一个 `state` 对象、一个新状态的标题 和 一个（可选的）相对 URL。例如：

```js
let stateObject = {foo:"bar"};
history.pushState(stateObject, "My title", "baz.html");
```

`pushState()`方法执行后，状态信息就会被推到历史记录中，浏览器地址栏也会改变以反映新的相对 URL。

- 因为 `pushState()` 会创建新的历史记录，所以也会相应地启用“后退”按钮。此时单击“后退”按钮，就会触发 window 对象上的 **`popstate` 事件**：

```js
window.addEventListener("popstate", (event) => {
  let state = event.state;
  if (state) { // 第一个页面加载时状态是 null
    processState(state);
  }
});
```

- 也可以使用 **`replaceState()`** 并传入与 `pushState()` 同样的前两个参数来更新状态。更新状态不会创建新历史记录，只会**覆盖当前状态**：

```js
history.replaceState({newFoo: "newBar"}, "New title");
```
