# cookie

难度：⭐️⭐️

> 💌 随着 Web 应用程序的出现，直接在客户端存储用户信息的需求也随之出现。对该问题的第一个解决方案就是 cookie。

HTTP cookie 通常也叫作 cookie，最初用于在**客户端存储会话信息**。这个规范要求**服务器在响应 HTTP 请求时**，通过发送 `Set-Cookie` HTTP 头部包含会话信息：

```text{3}
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
Other-header: other-header-value
```

浏览器会存储这些会话信息，并在之后的每个请求中都会通过 HTTP 头部 cookie 再将它们发回服务器：

```text{2}
GET /index.jsl HTTP/1.1
Cookie: name=value
Other-header: other-header-value
```

这些发送回服务器的额外信息可用于**唯一标识**发送请求的客户端。

## 限制

**cookie 是与特定域绑定的。** 设置 cookie 后，它会与请求一起发送到创建它的域。这个限制能保证 cookie 中存储的信息只对被认可的接收者开放，不被其他域访问。

为保证 cookie 不会被恶意利用，浏览器会对其加以限制：

- 不超过 300 个 cookie
- 每个 cookie 不超过 4096 字节
- 每个域不超过 20 个 cookie
- 每个域不超过 81 920 字节

每个域能设置的 cookie 总数也是受限的，但不同浏览器的限制不同。如果 cookie 总数超过了单个域的上限，浏览器就会删除之前设置的 cookie （一般是采用[LRU 算法](/handwritten/LRU)）。

## cookie 的构成

- **名称：** 唯一标识 cookie 的名称。cookie 名不区分大小写，因此 myCookie 和 MyCookie 是同一个名称。**cookie 名必须经过 URL 编码。**
- **值：** 存储在 cookie 里的字符串值。**这个值必须经过 URL 编码。**
- **域：** cookie 有效的域。
- **路径：** 请求 URL 中包含这个路径才会把 cookie 发送到服务器。
- **过期时间：** 表示何时删除 cookie 的时间戳（即什么时间之后就不发送到服务器了）。
- **安全标志：** 设置之后，只在使用 SSL 安全连接的情况下才会把 cookie 发送到服务器。

这些参数在 **`Set-Cookie`** 头部中使用分号加空格隔开：

```text{3}
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 GMT; domain=.wrox.com
Other-header: other-header-value
```

安全标志 `secure` 是 cookie 中唯一的非名/值对，只需一个 `secure` 就可以了：

```text{3}
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; domain=.wrox.com; path=/; secure
Other-header: other-header-value
```

## JavaScript 中的 cookie

在 JavaScript 中处理 cookie 比较麻烦，因为**接口过于简单**，只有 BOM 的 `document.cookie` 属性。<br>
`document.cookie` 返回包含页面中所有有效 cookie 的字符串（根据域、路径、过期时间和安全设置），以分号分隔，如下面的例子所示：

```
name1=value1;name2=value2;name3=value3
```

所有**名和值都是 URL 编码**的，因此必须使用 `decodeURIComponent()` 解码。

因为在 JavaScript 中读写 cookie 不是很直观，所以可以通过辅助函数来简化相应的操作。（在此不做演示了）

## 使用 cookie 的注意事项

- 还有一种叫作 **HTTP-only** 的 cookie。HTTP-only 可以在浏览器设置，也可以在服务器设置，但**只能在服务器上读取，这是因为 JavaScript 无法取得这种 cookie 的值**。
- 因为所有 cookie 都会作为请求头部由浏览器发送给服务器，所以在 cookie 中保存大量信息可能会影响特定域浏览器请求的性能。保存的 cookie 越大，请求完成的时间就越长。即使浏览器对 cookie 大小有限制，最好还是尽可能**只通过 cookie 保存必要信息，以避免性能问题**。
- 不要在 cookie 中存储**重要或敏感的信息**。cookie 数据不是保存在安全的环境中，因此任何人都可能获得。应该避免把信用卡号或个人地址等信息保存在 cookie 中。
