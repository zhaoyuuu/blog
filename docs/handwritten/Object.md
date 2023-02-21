## 1 实现Object.create
```js
Object._create = function(proto) {
  function Fn(){}
  Fn.prototype = proto
  return new Fn()
}

// 使用
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object._create(person);  // me的原型对象是person

me.name = 'zhaoyuuu'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // Inherited properties can be overwritten

me.printIntroduction();  // My name is zhaoyuuu. Am I human? true
```

## 2 实现Object.freeze
```js
Object._freeze = function(obj) {
  Object.seal(obj)  // 封闭对象
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      Object.defineProperty(obj, key, {
        writable: false  // 设置只读
      })
      // 递归
      if(obj[key] instanceof Object) Object._freeze(obj[key])
    }
  }
}

// 使用
function Person() {}
Person.prototype.age = 21
const me = new Person()
me.name = 'zhaoyuuu'

Object._freeze(me)

me.name = 'liudehua'  // 试图修改属性值
me.age = 78
console.log(me.name, me.age);  // zhaoyuuu 21 ————修改失败
```

## 3 实现Object.is
`Object.is`不会像 `==` 一样，在判断前对两边的变量进行强制转换。
`Object.is`更像 `===` ，但有以下两点区别：
1. `===` 运算符（也包括 `==` 运算符）将数字 -0 和 +0 视为相等
2. `NaN === NaN` 结果为false

```js
Object._is = function(x, y) {
  // +0 和 -0 的情况
  if(x === 0 && y === 0) {
    return (1 / x) === (1 / y)
  }
  // x,y都是 NaN 的情况
  if(x !== x && y !== y) return true

  return x === y
}

// 使用
console.log(-0 === +0);  // true
console.log(Object._is(-0, +0));  // false

console.log(NaN === NaN);  // false
console.log(Object._is(NaN, NaN));  // true
```