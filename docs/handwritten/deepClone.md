## 简单版（JSON）

```js
const cloneObj = JSON.parse(JSON.stringify(obj))
```
### 使用
```js
/* 克隆对象 */
const obj = {
  name: '刘德华', 
  song: '《给我一杯忘情水》'
}

const cloneObj = JSON.parse(JSON.stringify(obj))  // 拷贝
console.log(cloneObj);  // { name: '刘德华', song: '《给我一杯忘情水》' }
// 改变value
cloneObj.name = '张学友'
cloneObj.song = '《吻别》'
console.log(cloneObj);  // { name: '张学友', song: '《吻别》' }
console.log(obj);  // { name: '刘德华', song: '《给我一杯忘情水》' }  源对象不变，深克隆

/* 克隆数组 */
const arr = [1,2,3]
const cloneArr = JSON.parse(JSON.stringify(arr))
console.log(cloneArr);  // [1,2,3]
```
> 利用JSON实现的深拷贝确实简单，但是会有如下的问题：
**无法实现对函数 、RegExp等特殊对象的克隆**

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

> 既然JSON法深拷贝存在这些问题，在面试的时候面试官肯定不会就这样放过你，我们应该这样写：

## 面试版

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
const arr = [1,2,3]

/* 使用deepClone函数 */
const cloneObj = deepClone(obj)
console.log(cloneObj);  // { name: 'liudehua', sing: [Function: sing], regexp: {} }
cloneObj.sing()  // 给我一杯忘情水~ 

const cloneArr = deepClone(arr)
console.log(cloneArr);  // [ 1, 2, 3 ]
```

> 调用深拷贝方法，若属性为值类型，则直接返回；若属性为引用类型，则递归遍历。这就是我们在解这一类题时的核心的方法。

## 进阶版
blabla