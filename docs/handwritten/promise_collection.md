## 1 实现Promise.resolve
### 思路
- 传参为一个 `Promise`, 则直接返回它。
- 传参为一个 `thenable` 对象，**返回的 `Promise` 会跟随这个对象，采用它的最终状态作为自己的状态。**
- 其他情况，直接返回以该值为成功状态的`promise`对象。

```js
Promise._resolve = (param) => {
  if(param instanceof Promise) return param
  return new Promise((resolve, reject) => {
    if(param && param.then) {
      param.then(resolve, reject)
    }
    else {
      resolve(param)
    }
  })
}

// 使用
const p1 = Promise._resolve(12)
console.log(p1);  // Promise { 12 }
const p2 = Promise._resolve(new Promise((res, rej) => { res(12) }))
console.log(p2);  // Promise { 12 }  状态：成功
const p3 = Promise._resolve(new Promise((res, rej) => { rej(12) }))
console.log(p3);  // Promise { <rejected> 12 }  状态：失败
// thenable
var thenable = { then: function(resolve) {
  resolve("Resolving");
}};
const p4 = Promise._resolve(thenable)
p4.then(val => {
  console.log(val);  // Resolving
}, err => {
  // 不会被调用
})
```

## 2 实现Promise.reject
> Promise.reject 中传入的参数会作为一个 reason 原封不动地往下传：
```js
Promise._reject = (reason) => {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

// 使用
Promise._reject(new Error('fail!'))
  .then(val => {
    // 不会被调用
  }, err => {
    console.log(err);  // Error: fail!
  })
```

## 3 实现Promise.prototype.finally
```js
Promise.prototype._finally = function(callback) {
  return this.then(data => {
    return Promise.resolve(callback()).then(() => data)
  }, err => {
    return Promise.resolve(callback()).then(() => {
      throw err; // 把之前的失败的err，抛出去
    });
  })
}

// 使用
// 1 简单的情况
Promise.resolve(12)
  ._finally((data) => { // 这里传入的函数，无论如何都会执行
  console.log(data); // undefined
})
// 2 这里只要reject，都会走到下一个then的err中
Promise.reject(12)
  ._finally((data) => {
    console.log(data); // undefined
  })
  .then(data => {
    console.log(data);
  }, err => {
    console.log(err, 'err'); // 12 err
  })
// 3 一开始就成功之后，会等待finally里的promise执行完毕后，再把前面的data传递到下一个then中
Promise.resolve(12)
  ._finally((data) => {
    console.log(data); // undefined
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('ok');
      }, 3000)
    })
  })
  .then(data => {
    console.log(data, 'success'); // 12 success
  }, err => {
    console.log(err, 'err');
  })
// 4 虽然一开始成功，但是只要finally函数中的promise失败了，就会把其失败的值传递到下一个then的err中
Promise.resolve(12)
  ._finally((data) => {
    console.log(data); // undefined
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('rejected');
      }, 3000)
    })
  })
  .then(data => {
    console.log(data, 'success');
  }, err => {
    console.log(err, 'err'); // rejected err
  })
// 5 虽然一开始失败，但是也要等finally中的promise执行完，才能把一开始的err传递到err的回调中
Promise.reject(12)
  ._finally((data) => {
    console.log(data); // undefined
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('resolve');
      }, 3000)
    })
  })
  .then(data => {
    console.log(data, 'success');
  }, err => {
    console.log(err, 'err'); // 12 err
  })
```

## 4 实现Promise.all
```js
Promise._all = function(iterable) {
  return new Promise((resolve, reject) => {
    let index = 0 
    const res = []
    const len = iterable.length
    if(len === 0) {
      resolve(res)
    }

    for(let i of iterable) {
      // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
      Promise.resolve(i)
        .then(val => {
          res.push(val)
          index++  // index是为了防止 i 是异步任务而提前 resolve
          if(index === len) resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    }
    
  })
}

// 使用
const p1 = Promise.resolve(3);
const p2 = 1337;
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise._all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
```

## 5 实现Promise.allSettled
```js
Promise._allSettled = function(iterable) {
  return new Promise((resolve, reject) => {
    const res = [], len = iterable.length
    let index = 0
    for(let i = 0; i < len; i++) {
      Promise.resolve(iterable[i])
        .then(val => {
          const data = { status: 'fulfilled', value: val }
          setData(i, data)
        }, err => {
          const data = { status: 'rejected', reason: err }
          setData(i, data)
        })
    }

    function setData(i, data) {
      res[i] = data  // 采用索引i的形式设置res的值，是为了最后res里的顺序和传入的参数顺序一致，不受 异步 的影响
      index++
      if(index === len) resolve(res)
    }
  })

}

// 使用
Promise._allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("an error")),
]).then((values) => console.log(values));

// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: an error }
// ]
```

## 6 实现Promise.race
```js
Promise._race = function(iterable) {
  return new Promise((resolve, reject) => {
    const len = iterable.length
    for(let i = 0; i < len; i++) {
      Promise.resolve(iterable[i])
        .then(val => {
          resolve(val)
        }, err => {
          reject(err)
        })
    }
  })  
}

// 使用
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'two');
});

Promise._race([promise1, promise2]).then(val => {
  console.log(val);  // 未被调用
}, err => {
  console.log(err);  // two
  // Both resolve, but promise2 is faster
});
```