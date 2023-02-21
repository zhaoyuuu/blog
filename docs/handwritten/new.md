## 思路
1. 创建一个全新的对象
2. 这个对象的`__proto__`要指向构造函数的原型`prototype`
3. 执行构造函数，使用 `call/apply` **改变 this 的指向**
4. 返回值为object类型则作为new方法的返回值返回，否则返回上述全新对象

## 实现
```js
function _new(constructorFn, ...args) {
  // 创建一个新对象，并绑定原型链
  const newObj = Object.create(constructorFn.prototype)
  // 添加属性到新对象上 并获取obj函数的结果
  const ret = constructorFn.apply(newObj, args)  // 改变 this 指向
  // 如果执行结果有返回值并且是一个对象, 返回执行的结果,
  // 否则, 返回新创建的对象
  return typeof ret === 'object' ? ret : newObj
}
```

## 使用
```js
// 定义构造函数 Person
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function() {
  console.log(`我叫${this.name},我今年${this.age}岁`);
}

// 使用 _new
const me = _new(Person, 'zhaoyuuu', 20)
console.log(me);  // Person { name: 'zhaoyuuu', age: 20 }
console.log(me.name);  // zhaoyuuu
me.say()  // 我叫zhaoyuuu,我今年20岁
```

特殊的，如果构造函数返回一个对象：
```js
function Person(name, age) {
  this.name = name
  this.age = age
  return {
    ming_zi: 'liudehua',
    nian_ji: 40
  }
}
Person.prototype.say = function() {
  console.log(`我叫${this.name},我今年${this.age}岁`);
}

const me = _new(Person, 'zhaoyuuu', 20)
console.log(me);  // { ming_zi: 'liudehua',nian_ji: 40 }
console.log(me.ming_zi);  // liudehua
me.say()  // 报错：me.say is not a function。 因为返回的不是 newObj ，这个对象没有绑定原型链
```