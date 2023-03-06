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

jsonp({
  url: 'http://suggest.taobao.com/sug',
  callback: 'getData',
  params: {
    q: 'iphone手机',
    code: 'utf-8',
  },
}).then(data => {
  console.log(data)
})
