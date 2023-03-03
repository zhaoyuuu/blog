# function 函数

难度：⭐️⭐️⭐️

> 💌 函数是 ECMAScript 中**最有意思**的部分之一，这主要是因为**函数实际上是对象**。每个函数都是 `Function` 类型的实例，而 `Function` 也有属性和方法，跟其他引用类型一样。

👉 书中没有把 函数 这一章节分成很多 section（不像其他章节）。为了和书中结构统一，我将按书中的顺序，把函数的所有内容都在**这一篇文章**中呈现 ❤。

## 箭头函数

箭头函数虽然**语法简洁**，但也有很多场合不适用。箭头函数不能使用 `arguments`、`super` 和 `new.target`，也不能用作构造函数。此外，箭头函数也没有 `prototype` 属性。

## 函数名 name

ECMAScript 6 的**所有函数对象**都会暴露一个只读的 `name` 属性，其中包含关于函数的信息。多数情况下，这个属性中保存的就是一个**函数标识符**，或者说是一个字符串化的变量名。即使函数没有名称，也会如实显示成空字符串。如果它是使用 `Function` 构造函数创建的，则会标识成 `"anonymous"`：

```js
function foo() {}
let bar = function() {};
let baz = () => {};
console.log(foo.name); // foo
console.log(bar.name); // bar
console.log(baz.name); // baz
console.log((() => {}).name); //（空字符串）
console.log((new Function()).name); // anonymous
```

## 理解参数

定义函数时要接收两个参数，并不意味着调用时就传两个参数。你可以传一个、三个，甚至一个也不传，解释器都不会报错。<br>

👉 之所以会这样，主要是因为 ECMAScript **函数的参数在内部表现为一个数组**。函数被调用时总会接收一个数组，但函数并不关心这个数组中包含什么。<br>

事实上，在使用 `function` 关键字定义（**非箭头**）函数时，可以在函数内部访问 **`arguments` 对象**，从中取得传进来的每个参数值。

**_arguments 对象_**<br>

- `arguments` 对象是一个**类数组对象**（但不是 `Array` 的实例），因此可以使用中括号语法访问其中的元素：

```js{5,6}
function sayHi(name, message) {
  console.log("Hello " + name + ", " + message);
}
// 可以通过 arguments[0]取得相同的参数值。因此，
// 把函数重写成不声明参数也可以
function sayHi() {
  console.log("Hello " + arguments[0] + ", " + arguments[1]);
}
```

在重写后的代码中，**没有命名参数**。`name` 和 `message` 参数都不见了，但函数照样可以调用。这就表明，ECMAScript 函数的**参数只是为了方便才写出来的，并不是必须写出来**的。

- `arguments` 对象的另一个有意思的地方就是，它的值始终会与对应的命名参数同步。来看下面的例子：

```js
function doAdd(num1, num2) {
  arguments[1] = 10;
  console.log(arguments[0] + num2);
}
```

这个 `doAdd()` 函数把第二个参数的值重写为 10。因为 `arguments` 对象的值会**自动同步到对应的命名参数**，所以修改 `arguments[1]`也会修改 `num2` 的值，因此两者的值都是 10。

> 但这并不意味着它们都访问同一个内存地址，它们在内存中还是分开的，只不过会**保持同步**而已。

⚠ 需要注意的是：如果只传了一个参数，然后把 `arguments[1]` 设置为某个值，那么这个值并不会反映到第二个命名参数。这是因为 **`arguments` 对象的长度**是根据**传入的参数个数**，而非**定义函数时**给出的**命名参数个数**确定的：

```js
function add(num1, num2) {
  arguments[1] = 100
  return num1 + num2
}
console.log(add(10)) // NaN
```

调用 `add` 函数的时候，只传入了一个参数，所以 **`arguments` 的长度也就是 1** 。就算在 `add` 函数内部给 `arguments[1]` 赋值也不会影响到 `num2` 的值，`num2` 仍然是 `undefined` 。所以最终结果是 `10 + undefined` => `NaN`

> **严格模式下**，`arguments` 会有一些变化。首先，像前面那样给 `arguments[1]` 赋值**不会再影响 `num2` 的值**。就算把 `arguments[1]`设置为 10，`num2` 的值仍然还是传入的值。其次，在函数中尝试重写 `arguments` 对象会导致语法错误。（代码也不会执行。）

**_箭头函数中的参数_**<br>
如果函数是使用箭头语法定义的，那么传给函数的参数将**不能使用 `arguments` 关键字访问**，而只能通过**定义的命名参数**访问：

```js{8}
function foo() {
  console.log(arguments[0]);
}
foo(5); // 5
let bar = () => {
  console.log(arguments[0]);
};
bar(5); // ReferenceError: arguments is not defined
```

## 默认参数值

ECMAScript 6 之后，函数支持显式定义默认参数：

```js
function makeKing(name = 'Henry') {
  return `King ${name} VIII`;
}
console.log(makeKing('Louis')); // 'King Louis VIII'
console.log(makeKing()); // 'King Henry VIII'
```

给参数传 **`undefined` 相当于没有传值**，这样可以利用多个独立的默认值：

```js{6}
function makeKing(name = 'Henry', numerals = 'VIII') {
  return `King ${name} ${numerals}`;
}
console.log(makeKing()); // 'King Henry VIII'
console.log(makeKing('Louis')); // 'King Louis VIII'
console.log(makeKing(undefined, 'VI')); // 'King Henry VI'
```

在使用默认参数时，`arguments` 对象的值**不反映参数的默认值**，只反映**传给函数的参数**。当然，跟 ES5 严格模式一样，修改命名参数也不会影响 `arguments` 对象，**它始终以调用函数时传入的值为准**：

```js{5}
function makeKing(name = 'Henry') {
  name = 'Louis';
  return `King ${arguments[0]}`;
}
console.log(makeKing()); // 'King undefined'
console.log(makeKing('Louis')); // 'King Louis'
```

### 默认参数作用域

给多个参数定义默认值实际上跟使用 `let` 关键字**顺序声明变量**一样。比如下面这段代码：

```js
function makeKing(name = 'Henry', numerals = 'VIII') {
  return `King ${name} ${numerals}`;
}
console.log(makeKing()); // King Henry VIII
```

这里的默认参数会按照**定义它们的顺序依次被初始化**。可以依照如下示例想象一下这个过程：

```js{2,3}
function makeKing() {
  let name = 'Henry';
  let numerals = 'VIII';
  return `King ${name} ${numerals}`;
}
```

因为参数是按顺序初始化的，所以**后定义**默认值的参数可以引用**先定义**的参数：

```js{1}
function makeKing(name = 'Henry', numerals = name) {
  return `King ${name} ${numerals}`;
}
console.log(makeKing()); // King Henry Henry
```

## 参数扩展与收集

ECMAScript 6 新增了**扩展操作符**，使用它可以非常简洁地操作和组合集合数据。扩展操作符既可以用于**调用函数时传参**，也可以用于**定义函数参数**。

**_扩展参数_**<br>
示例如下：

```js
function getProduct(a, b, c = 1) {
  return a * b * c;
}
let getSum = (a, b, c = 0) => {
  return a + b + c;
}
console.log(getProduct(...[1,2])); // 2
console.log(getProduct(...[1,2,3])); // 6
console.log(getProduct(...[1,2,3,4])); // 6
console.log(getSum(...[0,1])); // 1
console.log(getSum(...[0,1,2])); // 3
console.log(getSum(...[0,1,2,3])); // 3
```

**_收集参数_**

在构思函数定义时，可以使用扩展操作符把**不同长度的独立参数组合为一个数组**。

> 这有点类似 `arguments` 对象的构造机制，只不过收集参数的结果会得到一个 `Array` 实例。

```js
function getSum(...values) {
  // 顺序累加 values 中的所有值
  // 初始值的总和为 0
  return values.reduce((x, y) => x + y, 0);
}
console.log(getSum(1,2,3)); // 6
```

收集参数的前面如果还有命名参数，则只会收集**其余的参数**，如果没有则会得到空数组。因为收集参数的结果可变，所以**只能把它作为最后一个参数**。

```js
// 不可以
function getProduct(...values, lastValue) {}
// 可以
function ignoreFirst(firstValue, ...values) {
  console.log(values);
}
ignoreFirst(); // []
ignoreFirst(1); // []
ignoreFirst(1,2); // [2]
ignoreFirst(1,2,3); // [2, 3]
```

## 函数声明与函数表达式

本章到现在一直没有把**函数声明**和**函数表达式**区分得很清楚。事实上，`JavaScript` 引擎在加载数据时对它们是区别对待的。

```js
// 没问题
console.log(sum(10, 10));
function sum(num1, num2) {
  return num1 + num2;
}
```

以上代码可以正常运行，因为函数声明会在**任何代码执行之前先被读取并添加到执行上下文**。这个过程叫作**函数声明提升（function declaration hoisting）**。在执行代码时，JavaScript 引擎会先执行一遍扫描，把发现的函数声明**提升到源代码树的顶部**。因此即使函数定义出现在调用它们的代码之后，引擎也会把函数声明提升到顶部。<br><br>
如果把前面代码中的函数声明**改为等价的函数表达式**，那么执行的时候就会出错：

```js
// 会出错
console.log(sum(10, 10));
let sum = function(num1, num2) {
  return num1 + num2;
};
```

使用 `let`/`const`/`var` 声明的函数不存在 **函数声明提升**，而是遵循 `let`/`const`/`var` 本身的声明法则。

## 函数内部

> 在 ECMAScript 5 中，函数内部存在两个特殊的对象：`arguments` 和 `this`。ECMAScript 6 又新增了 `new.target` 属性。

### arguments

`arguments` 对象前面讨论过多次了，它是一个**类数组对象**，包含**调用函数时传入的所有参数**（这一点反复强调了）。<br>
但 `arguments` 对象其实还有一个 `callee` 属性，是一个指向 `arguments` 对象所在函数的指针。来看下面这个经典的阶乘函数：

```js
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
```

但是，这个函数要正确执行就**必须保证函数名是 `factorial`**，从而导致了紧密耦合。使用 `arguments.callee` 就可以让函数逻辑与函数名解耦：

```js{5}
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}
```

这个重写之后的 `factorial()` 函数已经用 `arguments.callee` 代替了之前**硬编码**的 `factorial`。这意味着无论函数叫什么名称，都可以引用正确的函数。<br>
因此在编写**递归函数**时，`arguments.callee` 是引用当前函数的首选。

### this

另一个特殊的对象是 `this`，它在**标准函数**和**箭头函数**中有不同的行为 ❗️<br>

🟢 **在标准函数中**，`this` 引用的是**把函数当成方法调用的上下文对象**，这时候通常称其为 `this` 值（在网页的全局上下文中调用函数时，`this` 指向 `windows`）。来看下面的例子：

```js
window.color = 'red';
let o = {
  color: 'blue'
};
function sayColor() {
  console.log(this.color);
}
sayColor(); // 'red'
o.sayColor = sayColor;
o.sayColor(); // 'blue'
```

🟡 **在箭头函数中**，`this` 引用的是**定义箭头函数的上下文**。下面的例子演示了这一点。在对 `sayColor()` 的两次调用中，`this` 引用的都是 `window` 对象，**因为这个箭头函数是在 `window` 上下文中定义的**：

```js
window.color = 'red';
let o = {
  color: 'blue'
};
let sayColor = () => console.log(this.color);
sayColor(); // 'red'
o.sayColor = sayColor;
o.sayColor(); // 'red'
```

> 函数名只是保存指针的变量。因此全局定义的 `sayColor()` 函数和 `o.sayColor()` 是**同一个函数**，只不过执行的上下文不同。

👉 在事件回调或定时回调中调用某个函数时，`this` 值指向的并非想要的对象。此时将回调函数写成箭头函数就可以解决问题。这就是因为箭头函数中的 `this` 会保留定义该函数时的上下文：

```js
function King() {
  this.royaltyName = 'Henry';
  // this 引用 King 的实例
  setTimeout(() => console.log(this.royaltyName), 1000);
}
function Queen() {
  this.royaltyName = 'Elizabeth';
  // this 引用 window 对象
  setTimeout(function() { console.log(this.royaltyName); }, 1000);
}
new King(); // Henry
new Queen(); // undefined
```

### caller

这个属性引用的是**调用当前函数的函数**，或者如果是在全局作用域中调用的则为 `null`。比如：

```js
function outer() {
  inner();
}
function inner() {
  console.log(inner.caller);
}
outer();
```

以上代码会显示 `outer()` 函数的源代码。这是因为 `ourter()` 调用了 `inner()`，`inner.caller`指向 `outer()`。

### new.target

ECMAScript 6 新增了**检测函数是否使用 `new` 关键字调用**的 `new.target` 属性。如果函数是正常调用的，则 `new.target` 的值是 `undefined`；如果是使用 `new` 关键字调用的，则 `new.target` 将引用**被调用的构造函数**：

```js
function King() {
  if (!new.target) {
    throw 'King must be instantiated using "new"'
  }
  console.log('King instantiated using "new"');
}
new King(); // King instantiated using "new"
King(); // Error: King must be instantiated using "new"
```

## 函数属性与方法

ECMAScript 中的函数是对象，因此有属性和方法。每个函数都有两个属性：`length` 和 `prototype`。

**_length_**<br>
`length` 属性保存函数定义的**命名参数的个数**：

```js
function sayName(name) {
  console.log(name);
}
function sum(num1, num2) {
  return num1 + num2;
}
function sayHi() {
  console.log("hi");
}
console.log(sayName.length); // 1
console.log(sum.length); // 2
console.log(sayHi.length); // 0
```

**_prototype_**<br>
`prototype` 是保存引用类型**所有实例方法**的地方，这意味着 `toString()`、`valueOf()`等方法实际上都保存在 `prototype` 上，进而由所有实例共享。这个属性在自定义类型时特别重要。（相关内容已经在第 8 章详细介绍过了。）在 ECMAScript 5 中，`prototype` 属性是**不可枚举**的，因此使用 `for-in` 循环不会返回这个属性。

**_call apply_**<br>
`apply()`方法接收两个参数：函数内 `this` 的值和一个参数数组。第二个参数可以是 `Array` 的实例，**但也可以是 `arguments` 对象**：

```js
function callSum1(num1, num2) {
  return sum.apply(this, arguments); // 传入 arguments 对象
}
```

`call()` 和 `apply()` 等价，到底是使用 `apply()`还是 `call()`，完全取决于怎么给要调用的函数传参更方便。

## 函数表达式

理解函数声明与函数表达式之间的区别，关键是**理解提升**。比如，以下代码的执行结果可能会出乎意料：

```js
// 千万别这样做！
if (condition) {
  function sayHi() {
    console.log('Hi!');
  }
} else {
  function sayHi() {
    console.log('Yo!');
  }
}
```

下面声明的 `sayHi()` 会**覆盖**上面的 `sayHi()`，是很危险的做法。不过，如果把上面的函数声明**换成函数表达式**就没问题了：

```js
// 没问题
let sayHi;
if (condition) {
  sayHi = function() {
    console.log("Hi!");
  };
} else {
  sayHi = function() {
    console.log("Yo!");
  };
}
```

## 闭包

闭包指的是那些**引用了另一个函数作用域中变量**的**函数**，通常是在嵌套函数中实现的。

本书在第 4 章曾介绍过**作用域链**的概念。理解作用域链创建和使用的细节对理解闭包非常重要：<br>
在调用一个函数时，会为这个函数调用创建一个**执行上下文**，并创建一个**作用域链**。然后用 **`arguments` 和其他命名参数**来初始化这个函数的**活动对象**。外部函数的活动对象是内部函数作用域链上的**第二个对象**。这个作用域链一直向外**串起了所有包含函数的活动对象**，直到**全局执行上下文**才终止。<br>

函数内部的代码在访问变量时，就会使用给定的名称从作用域链中查找变量。函数执行完毕后，局部活动对象会被销毁，内存中就只剩下全局作用域。不过，闭包就不一样了。

👉 因为**外部函数的活动对象还被闭包函数引用着**，所以它的活动对象仍然会保留在内存中，直到**闭包函数被销毁后**才会被销毁。
