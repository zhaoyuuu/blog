# location 对象

难度：⭐️⭐️

> 💌 `location` 是**最有用的 BOM 对象之一**，提供了当前窗口中**加载文档的信息**，以及通常的**导航功能**。

> 这个对象独特的地方在于，它既是 `window` 的属性，也是 `document` 的属性。也就是说，`window.location` 和 `document.location` 指向同一个对象 😉。

假设浏览器当前加载的 URL 是 http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents， `location` 对象的内容如下表所示：

|       属性        |                            值                            |                        说明（if need）                         |
| :---------------: | :------------------------------------------------------: | :------------------------------------------------------------: |
|   location.hash   |                       "#contents"                        |                                                                |
|   location.host   |                    "www.wrox.com:80"                     |                      服务器名**及端口号**                      |
| location.hostname |                      "www.wrox.com"                      |                            服务器名                            |
|   location.href   | "http://www.wrox.com:80/WileyCDA/?q=javascript#contents" | 当前加载页面的完整 URL（location 的 toString()方法返回这个值） |
| location.pathname |                       "/WileyCDA/"                       |                                                                |
|   location.port   |                           "80"                           |                                                                |
| location.protocol |                         "http:"                          |                                                                |
|  location.search  |                     "?q=javascript"                      |                                                                |
| location.username |                        "foouser"                         |                       域名前指定的用户名                       |
| location.password |                      "barpassword"                       |                        域名前指定的密码                        |
|  location.origin  |                  "http://www.wrox.com"                   |                      URL 的源地址（只读）                      |

## 查询字符串

### 解析查询字符串

虽然 `location.search` 返回了从问号开始直到 URL 末尾的所有内容，但没有办法**逐个访问每个查询参数**。下面的函数解析了查询字符串，并返回一个以每个查询参数为属性的对象：

```js
let getQueryStringArgs = function () {
  // 取得没有开头问号的查询字符串
  let qs = location.search.length > 0 ? location.search.substring(1) : '',
    // 保存数据的对象
    args = {}
  // 把每个参数添加到 args 对象
  for (let item of qs.split('&').map(kv => kv.split('='))) {
    let name = decodeURIComponent(item[0]),
      value = decodeURIComponent(item[1])
    if (name.length) {
      args[name] = value
    }
  }
  return args
}

```

这个函数首先删除了查询字符串开头的问号，当然前提是 `location.search` 必须有内容。解析后的参数将被保存到 `args` 对象，这个对象以字面量形式创建。接着，先把查询字符串按照 `&` 分割成数组，每个元素的形式为 `name=value`。for 循环迭代这个数组，将每一个元素按照 `=` 分割成数组，这个数组第一项是参数名，第二项是参数值。参数名和参数值在**使用 `decodeURIComponent()` 解码**后（这是因为**查询字符串通常是被编码后的格式**）分别保存在 `name` 和 `value` 变量中。最后，`name` 作为属性而 `value` 作为该属性的值被添加到 `args` 对象。

### URLSearchParams

`URLSearchParams` 提供了一组标准 API 方法，通过它们可以**检查和修改查询字符串**。给`URLSearchParams` 构造函数传入一个查询字符串，就可以**创建一个实例**。这个实例上暴露了 **`get()`** 、**`set()`** 和 **`delete()`** 等方法，可以对查询字符串执行相应操作。

```js
let qs = "?q=javascript&num=10";
let searchParams = new URLSearchParams(qs);
alert(searchParams.toString()); // " q=javascript&num=10"
searchParams.has("num"); // true
searchParams.get("num"); // 10
searchParams.set("page", "3");
alert(searchParams.toString()); // " q=javascript&num=10&page=3"
searchParams.delete("q");
alert(searchParams.toString()); // " num=10&page=3"
```

大多数支持 `URLSearchParams` 的浏览器也支持将 `URLSearchParams` 的实例用作**可迭代对象**：

```js
let qs = "?q=javascript&num=10";
let searchParams = new URLSearchParams(qs);
for (let param of searchParams) {
  console.log(param);
}
// ["q", "javascript"]
// ["num", "10"]
```

## 操作地址

> `location.assign()` `window.location` `location.href`

可以通过修改 `location` 对象修改浏览器的地址，有以下三种方法（等价）：

```js
location.assign("http://www.wrox.com");
window.location = "http://www.wrox.com";
location.href = "http://www.wrox.com";
```

修改 `location` 对象的属性也会修改当前加载的页面。其中，hash、search、hostname、pathname 和 port 属性被设置为新值之后都会**修改当前 URL**：

```js
// 假设当前 URL 为 http://www.wrox.com/WileyCDA/
// 把 URL 修改为 http://www.wrox.com/WileyCDA/#section1
location.hash = "#section1";
// 把 URL 修改为 http://www.wrox.com/WileyCDA/?q=javascript
location.search = "?q=javascript";
// 把 URL 修改为 http://www.somewhere.com/WileyCDA/
location.hostname = "www.somewhere.com";
...
```

> **除了 `hash` 之外**，只要修改 location 的一个属性，就会导致页面**重新加载新 URL**。

`reload()`也可以修改地址，它能重新加载当前显示的页面。调用 `reload()`而**不传参数**，页面会以**最有效的方式**重新加载。也就是说，如果页面自上次请求以来没有修改过，浏览器可能会**从缓存中加载页面**。如果想**强制从服务器重新加载**，可以像下面这样给 `reload()`传个 `true` ：

```js{2}
location.reload(); // 重新加载，可能是从缓存加载
location.reload(true); // 重新加载，从服务器加载
```
