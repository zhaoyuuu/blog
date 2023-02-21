## 1 原生实现
```js
function ajax(url) {
  // 1. 创建 xhr 实例对象
  const xhr = new XMLHttpRequest()
  // 2. 设置处理服务器响应
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4) {
      if(xhr.status >= 200 && xhr.status < 300) {
        // 处理响应...
        const res = JSON.parse(xhr.responseText)
        console.log(res);
      }
    }
  }
  // 3. 通过调用 HTTP 请求对象的 open() 和 send() 方法，发送请求
  xhr.open('get', url)
  xhr.send()
}
```

## 2 Promise封装
```js
function ajax_promise(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if(xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText))
        }
        else {
          reject('fail!')
        }
      }
    }
    xhr.open('get', url)
    xhr.send()
  })
}

// 使用
const url = '/data.json'
ajax(url)
  .then(res => console.log(res))
  .catch(reason => console.log(reason))
```