# function 函数

> 函数是 ECMAScript 中**最有意思**的部分之一，这主要是因为**函数实际上是对象**。每个函数都是 `Function` 类型的实例，而 `Function` 也有属性和方法，跟其他引用类型一样。

👉 书中没有把 函数 这一章节分成很多 section（不像其他章节）。为了和书中结构统一，我将按书中的顺序，把函数的所有内容都在**这一篇文章**中呈现。

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

> 之所以会这样，主要是因为 ECMAScript **函数的参数在内部表现为一个数组**。函数被调用时总会接收一个数组，但函数并不关心这个数组中包含什么。<br>

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
