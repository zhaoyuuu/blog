## 深浅拷贝

**实现浅拷贝：**<br>

- `Object.assign()`

```js{4}
const obj = {
  name: 'lin'
}
const newObj = Object.assign({}, obj)
```

- 数组的`slice`方法

```js
const arr = ['lin', 'is', 'handsome']
const newArr = arr.slice(0)
```

- `Array.from()`
- `...`扩展运算符

**实现深拷贝：**<br>
相关链接：[手写深拷贝](/handwritten/deepClone)

## 防抖节流

- 防抖：[手写 debounce 防抖](/handwritten/debounce)
- 节流：[手写 throttle 节流](/handwritten/throttle)

## 闭包

一个函数里面还有一个函数（嵌套函数），里面的函数可以读取外部函数的变量，这种形式就是闭包。

**特点：**<br>

1. 函数嵌套函数
2. 内部函数可以引用外部的参数和变量
3. 参数和变量不会被垃圾回收机制回收

**优点：**<br>

1. 延长变量的生命周期（变量不会被垃圾回收机制清除，始终在内存中）
2. 避免全局变量污染，即私有成员的存在

**缺点：** 内存泄露。

> 在我们的业务代码执行过程中，有些对象它应该被回收，但是又有其他对象引用引用它，因此，GC 不能自动回收。所以，该回收的垃圾对象没有被回收，垃圾对象越堆越多，可用内存越来越少，若可用内存无法存放新的垃圾对象，最终导致内存泄漏。内存泄漏最终会导致内存溢出。

一些运用：

```js
1. 循环延时输出结果 0 1 2 3 4
for(var i=0; i<5; i++){
  (function(i){
    setTimeout(() => {
      console.log(i);
    }, 500*i);
  })(i)
}
```

2. 函数里面声明一个变量 x=0，每次调用让 x++?

```js
function add(){
  let x = 0
  return function(){
    console.log(x++);
  }
}
const ADD = add()
ADD()//0
ADD()//1
ADD()//2
ADD()//3
```
