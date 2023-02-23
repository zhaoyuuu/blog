> BOM(Browser Object Model) 是使用 JavaScript 开发 Web 应用程序的核心。BOM 提供了与网页无关的**浏览器功能对象**。

---

# window 对象

难度：⭐️⭐️

> 💌 BOM 的核心是 window 对象，表示**浏览器的实例**。

window 对象在浏览器中有两重身份，一个是 ECMAScript 中的 **`Global` 对象**，另一个就是 **浏览器窗口的 JavaScript 接口**。这意味着网页中定义的所有对象、变量和函数都以 window 作为其 Global 对象，都可以访问其上定义的 parseInt()等全局方法。

## Global 作用域

因为 `window` 对象被复用为 ECMAScript 的 Global 对象，所以**通过 `var` 声明的所有全局变量和函数都会变成 `window` 对象的属性和方法**。但是如果使用 `let` 或 `const` 替代 `var`，则不会把变量添加给全局对象：

```js
// var
var name = 'peter';
alert(window.name); // peter

// let const
let age = 29;
const sayAge = () => alert(this.age);
alert(window.age); // undefined
sayAge(); // undefined
window.sayAge(); // TypeError: window.sayAge is not a function
```

> JavaScript 中有很多对象都暴露在全局作用域中，比如 `location` 和 `navigator`，因而它们也是 `window` 对象的属性。

## 像素比

看到一个之前没见过的定义：<br>
CSS 像素是 Web 开发中使用的统一像素单位。**这个单位的背后其实是一个角度：0.0213°**。
（如果屏幕距离人眼是一臂长，则以这个角度计算的 CSS 像素大小约为 1/96 英寸。）<br>这样定义像素大小是为了**在不同设备上统一标准**。

## 视口位置

度量**文档相对于视口滚动距离**的属性有两对，返回相等的值：`window.pageXoffset / window.scrollX` 和 `window.pageYoffset / window.scrollY`。

可以使用 `scroll()`、`scrollTo()`和 `scrollBy()`方法滚动页面：

```js
// 相对于当前视口向右滚动 40 像素
window.scrollBy(40, 0);
// 滚动到页面左上角
window.scrollTo(0, 0);
```

这几个方法也都接收一个 **`ScrollToOptions` 字典**，除了提供偏移值，还可以通过 **`behavior`** 属性告诉浏览器是否**平滑滚动**。

```js{5,11}
// 正常滚动
window.scrollTo({
  left: 100,
  top: 100,
  behavior: 'auto'
});
// 平滑滚动
window.scrollTo({
  left: 100,
  top: 100,
  behavior: 'smooth'
});
```
