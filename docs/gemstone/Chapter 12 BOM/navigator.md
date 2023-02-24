# navigator 对象

难度：⭐️

> 💌 `navigator` 现在已经成为客户端标识浏览器的标准。**只要浏览器启用 JavaScript，navigator 对象就一定存在。**但是与其他 BOM 对象一样，每个浏览器都支持自己的属性。

`navigator` 对象身上有很多属性方法，在此一一不列举了（不太常用）。总之，`navigator` 对象的属性**通常用于确定浏览器的类型**。

## 检测插件

👉 检测**浏览器是否安装了某个插件**是开发中常见的需求。除 IE10 及更低版本外的浏览器，都可以通过 `plugins` 数组来确定。这个数组中的每一项都包含如下属性：

- `name`：插件名称。
- `description`：插件介绍。
- `filename`：插件的文件名。
- `length`：由当前插件处理的 MIME 类型数量。

检测插件就是遍历浏览器中可用的插件，并逐个比较插件的 `name` ：

```js
// 插件检测，IE10 及更低版本无效
let hasPlugin = function(name) {
  name = name.toLowerCase();
  for (let plugin of window.navigator.plugins){
    if (plugin.name.toLowerCase().indexOf(name) > -1){
      return true;
    }
  }
  return false;
}
// 检测 Flash
alert(hasPlugin("Flash"));
// 检测 QuickTime
alert(hasPlugin("QuickTime"));
```

## 注册处理程序

> 🤔 没见过，不知道过时没有。

现代浏览器支持 `navigator` 上的（在 HTML5 中定义的）**`registerProtocolHandler()`** 方法。这个方法可以把一个**网站注册为处理某种特定类型信息应用程序**。随着在线 RSS 阅读器和电子邮件客户端的流行，可以借助这个方法将 **Web 应用程序**注册为像**桌面软件一样的默认应用程序**。

要使用 `registerProtocolHandler()`方法，必须传入 3 个参数：**要处理的协议**（如"mailto"或"ftp"）、**处理该协议的 URL**，以及**应用名称**。比如，要把一个 Web 应用程序注册为默认邮件客户端，可以这样做：

```js
navigator.registerProtocolHandler("mailto",
 "http://www.somemailclient.com?cmd=%s",
 "Some Mail Client");
```

这个例子为"mailto"协议注册了一个处理程序，这样邮件地址就可以通过指定的 Web 应用程序打开。注意，第二个参数是负责处理请求的 URL，%s 表示原始的请求。
