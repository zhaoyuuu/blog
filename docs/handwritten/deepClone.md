# deepclone 深拷贝

💡 **Guide:** 两种实现方式：JSON / 递归函数。

## 简洁版（JSON）

**_实现：_**

```js
const cloneObj = JSON.parse(JSON.stringify(obj))
```

**_使用_：**

```js
const obj = {
  name: '刘德华',
  song: '《给我一杯忘情水》'
}
// 拷贝 obj
const cloneObj = JSON.parse(JSON.stringify(obj))
console.log(cloneObj);  // { name: '刘德华', song: '《给我一杯忘情水》' }
// 改变属性值
cloneObj.name = '张学友'
cloneObj.song = '《吻别》'
console.log(cloneObj);  // { name: '张学友', song: '《吻别》' }
console.log(obj);  // { name: '刘德华', song: '《给我一杯忘情水》' } （不影响源对象，即深克隆）
```

⚠ 利用 JSON 实现的深拷贝确实简单，但是会有如下的问题：无法实现对**函数 、RegExp 等特殊对象的克隆**。

```js
const obj = {
  name: 'liudehua',
  sing: () => {
    console.log('给我一杯忘情水~');
  },
  regexp: /^\d{4}(\-)\d{1,2}\1\d{1,2}$/
}

const cloneObj = JSON.parse(JSON.stringify(obj))
console.log(cloneObj);  // { name: 'liudehua', regexp: {} }   问题：sing函数没有拷贝，正则表达式拷贝错误

```

既然 JSON 法深拷贝存在这些问题，在面试的时候面试官肯定不会就这样放过你 🙃，面试中我们可以这样写 👇

## 面试版（递归）

```js
function deepClone(obj) {
  // 简单数据类型，直接返回
  if(typeof obj !== 'object' || obj === null) {
    return obj
  }
  // 传入数组则输出数组，传入对象则输出对象
  const res = obj instanceof Array ? [] : {}
  // 遍历对象的key
  for(let key in obj) {
    // 如果key是对象的自有属性（for..in 会遍历出原型链上的属性）
    if(obj.hasOwnProperty(key)) {
      // 递归调用深拷贝方法
      res[key] = deepClone(obj[key])
    }
  }

  return res
}
```

### 使用

```js
/* 声明 obj arr */
const obj = {
  name: 'liudehua',
  sing: () => {
    console.log('给我一杯忘情水~');
  },
  regexp: /^\d{4}(\-)\d{1,2}\1\d{1,2}$/
}

/* 使用deepClone函数 */
const cloneObj = deepClone(obj)
console.log(cloneObj);  // { name: 'liudehua', sing: [Function: sing], regexp: {} }
cloneObj.sing()  // 给我一杯忘情水~
```

👉 若属性为**原始值，直接返回**；若属性为**引用类型，则递归遍历**。这就是我们在解这一类题时的核心的方法。
