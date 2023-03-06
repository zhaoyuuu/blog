# JSONP 请求

JSONP，全称 `JSON with Padding`，为了解决跨域的问题而出现，但它**只能处理 GET 跨域**。虽然现在基本上都使用 `CORS` 跨域，但仍然要知道它，毕竟面试会问 🙃。

JSONP 基于两个原理:

- 动态创建 `script`，使用 `script.src` 加载请求跨过跨域
- `script.src` 加载的脚本内容为 JSONP: 即 PADDING(JSON) 格式

## 实现

```js
const jsonp = ({ url, params, callback }) => {
  return new Promise((resolve, reject) => {
    window[callback] = data => {
      resolve(data)
      document.removeChild(script)
    }
    const arr = []
    for (let key in params) {
      arr.push(`${key}=${params[key]}`)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `${url}?callback=${callback}&${arr.join('&')}`
    document.body.appendChild(script)
  })
}
```

## 使用

```js
jsonp({
  url: 'https://suggest.taobao.com/sug',
  callback: 'getData',
  params: {
    q: 'iphone手机',
    code: 'utf-8'
  },
}).then(data=>{console.log(data)})
```

## 服务器端

JSONP 需要服务端进行配合，返回 `JSON With Padding` 数据，可以了解一下:

```js
const http = require("http");
const url = require("url");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const params = qs.parse(query);

  const data = { name: "shanyue", id: params.id };

  if (params.callback) {
    // 服务端将要返回的字符串
    str = `${params.callback}(${JSON.stringify(data)})`;
    res.end(str);
  } else {
    res.end();
  }
});

server.listen(10010, () => console.log("Done"));
```
