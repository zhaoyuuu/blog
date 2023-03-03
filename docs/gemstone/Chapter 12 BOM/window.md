> BOM(Browser Object Model) 是使用 JavaScript 开发 Web 应用程序的核心。BOM 提供了与网页无关的**浏览器功能对象**。

---

# window 对象

难度：⭐️⭐️

> 💌 BOM 的核心是 window 对象，表示**浏览器的实例**。这一块不难，但是是很容易被忽视的内容。

window 对象在浏览器中有两重身份，一个是 ECMAScript 中的 **`Global` 对象**，另一个就是 **浏览器窗口的 JavaScript 接口**。这意味着网页中定义的所有对象、变量和函数都以 window 作为其 Global 对象，都可以访问其上定义的 `parseInt()`等全局方法。

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

## 导航与打开新窗口

> window.open()

`window.open()` 方法可以用于导航到指定 URL，也可以用于打开新浏览器窗口。这个方法通常接收 3 个参数：要加载的 **URL**、**目标窗口**、**特性字符串**。

```js
window.open("http://www.wrox.com/", "topFrame");
```

执行这行代码的结果就如同用户点击了一个 **href 属性为"http://www.wrox.com"** 、 **target 属性为"topFrame"** 的链接。<br>
如果有一个窗口名叫"topFrame"，则这个窗口就会打开这个 URL；否则就会打开一个新窗口并将其命名为"topFrame"（但是这个我在 Chrome 上试验，没有得到预期的效果）。<br>
第二个参数也可以是一个特殊的窗口名，比如`_self`、`_parent`、`_top` 或`_blank`。

**特性字符串**是一个逗号分隔的设置字符串，用于指定**新窗口包含的特性**：

```js{3}
let wroxWin = window.open("http://www.wrox.com/",
  "wroxWindow",
  "height=400,width=400,top=10,left=10,resizable=yes");

wroxWin.close();  // 关闭该窗口
```

上面就用到了一些常用的特性字符串。

## 定时器

> `setTimeout()` `setInterval()`

### setTimeout()

```js
// 在 1 秒后显示警告框
setTimeout(() => alert("Hello world!"), 1000);
```

JavaScript 是单线程的，所以每次只能执行一段代码。**为了调度不同代码的执行**，JavaScript 维护了一个**任务队列**，其中的任务会按照添加到队列的先后顺序执行。`setTimeout()`的第二个参数只是告诉 JavaScript 引擎**在指定的毫秒数过后把任务添加到这个队列**。
<br>

> ❗❗ **由此可知：** 如果队列是空的，则会立即执行该代码。如果队列不是空的，则代码必须等待前面的任务执行完才能执行。

### setInterval()

```js
setInterval(() => alert("Hello world!"), 10000);
```

⚠ **注意：**这里的关键点是，第二个参数，也就是间隔时间，指的是**向队列添加新任务之前等待的时间**。比如，调用 `setInterval()` 的时间为 01:00:00，间隔时间为 3000 毫秒。这意味着 01:00:03 时，浏览器会把任务添加到执行队列。**浏览器不关心这个任务什么时候执行或者执行要花多长时间**。因此，到了 01:00:06，它会再向队列中添加一个任务。

> 由此可看出，执行时间短、非阻塞的回调函数比较适合 `setInterval()` （高情商 🤨）。说直白一点，一个任务**结束**和下一个任务**开始**之间的时间间隔是**无法保证**的，**有些循环定时任务可能会因此而被跳过**！`setIntervale()` 在实践中很少会在生产环境下使用。

相关链接：[基于 setTimeout 实现 setInterval](</handwritten/setInterval(setTimeout)>)

ps：相对于 `setTimeout()`而言，**取消定时**的能力对 `setInterval()`更加重要。毕竟，如果一直不管它，那么定时任务会一直执行到页面卸载。

## 系统对话框

> `alert()` `confirm()` `prompt()`

使用 `alert()`、`confirm()`和 `prompt()`方法，可以让浏览器调用系统对话框向用户显示消息。这些对话框都是**同步**的模态对话框，即在它们显示的时候，**代码会停止执行**，在它们消失以后，代码才会恢复执行。

### alert()

`alert()`只接收一个参数。调用 `alert()`时，传入的字符串会显示在一个系统对话框中。对话框只有一个“OK”（确定）按钮。如果传给 `alert()`的参数**不是一个原始字符串**，则会**调用这个值的 `toString()`方法将其转换为字符串**。

### confirm()

确认框有两个按钮：“Cancel”（取消）和“OK”（确定）。使用示例：

```js
if (confirm("Are you sure?")) {
  alert("I'm so glad you're sure!");
} else {
  alert("I'm sorry to hear you're not sure.");
}
```

### prompt()

除了 OK 和 Cancel 按钮，提示框还会显示一个文本框，让用户**输入内容**。如果用户单击了 OK 按钮，则 `prompt()`会**返回文本框中的值**。如果用户单击了 Cancel 按钮，或者对话框被关闭，则 `prompt()`会**返回 null**。下面是一个例子：

```js
let result = prompt("What is your name? ", "");
if (result !== null) {
  alert("Welcome, " + result);
}
```

> 由于不需要 HTML 和 CSS，系统对话框是 Web 应用程序**最简单快捷**的沟通手段。
