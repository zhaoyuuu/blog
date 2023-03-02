# inherit 继承

难度：⭐️⭐️⭐️⭐️

> 💌 继承是**面向对象编程**中讨论最多的话题。很多面向对象语言都支持两种继承：**接口继承**和**实现继承**。前者只继承方法签名，后者继承实际的方法。接口继承在 ECMAScript 中是不可能的，因为函数没有签名。<br>**实现继承是 ECMAScript 唯一支持的继承方式**，而这主要是通过**原型链**实现的。

## 原型链

ECMA-262 把**原型链**定义为 ECMAScript 的**主要继承方式**。其基本思想就是通过原型继承多个引用类型的属性和方法。（原型链的概念不再赘述）

💪 **原型链扩展了原型搜索机制**。我们知道，在读取实例上的属性时，首先会在**实例上**搜索这个属性。如果没找到，则会继承搜索**实例的原型**。

### 默认原型

默认情况下，所有**引用类型**都继承自 **Object**，这也是通过原型链实现的。这也是为什么自定义类型能够继承包括 `toString()`、`valueOf()`在内的所有默认方法的原因。

### 原型与实例关系

> `instanceof` `isPrototypeOf()`

原型与实例的关系可以通过两种方式来确定：

1. 第一种方式是使用 **`instanceof`** 操作符，如果一个实例的**原型链中出现过相应的构造函数**，则 `instanceof` 返回 true。
2. 第二种方式是使用 **`isPrototypeOf()`** 方法

```js
console.log(Object.prototype.isPrototypeOf({})); // true
```

### 原型链的问题

> 1.引用值 2.向上传参

⚠︎ 主要问题出现在原型中包含**引用值**的时候。

```js{2,6}
function DadType() {
  this.colors = ["red", "blue", "green"];
}
function SonType() {}
// 继承 DadType
SonType.prototype = new DadType();
let instance1 = new SonType();
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
let instance2 = new SonType();
console.log(instance2.colors); // "red,blue,green,black"
```

在这个例子中，DadType 构造函数定义了一个 `colors` 属性，其中包含一个数组（**引用值**）。每个 DadType 的实例都会有自己的 colors 属性，包含自己的数组。但是，当 **SonType 通过原型继承 DadType 后**，SonType.prototype 变成了 DadType 的一个实例，因而也获得了自己的 `colors`属性。这类似于创建了 `SonType.prototype.colors` 属性。<br>
**最终结果是，SonType 的所有实例都会共享这个 colors 属性**。这一点通过 `instance1.colors` 上的修改也能反映到 `instance2.colors` 上就可以看出来。

原型链的第二个问题是，子类型在**实例化时不能给父类型的构造函数传参**。事实上，我们无法在不影响所有对象实例的情况下把参数传进父类的构造函数。再加上之前提到的原型中包含引用值的问题，就导致**原型链基本不会被单独使用**。

## 盗用构造函数

“盗用构造函数”（`constructor stealing`，也叫“对象伪装”或“经典继承”）技术的流行，是为了解决原型包含**引用值**导致的继承问题.

基本思路很简单：在**子类构造函数中调用父类构造函数**。利用 `apply()` 和 `call()` 方法创建新对象，为上下文执行构造函数：

```js{6}
function DadType() {
  this.colors = ["red", "blue", "green"];
}
function SonType() {
  // 继承 DadType
  DadType.call(this);
}
let instance1 = new SonType();
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
let instance2 = new SonType();
console.log(instance2.colors); // "red,blue,green"
```

👉 这相当于新的 SonType 对象上运行了 DadType() 函数中的**所有初始化代码**。结果就是**每个实例都会有自己的 colors 属性。**

✔️ **优点：** 相比于使用原型链，盗用构造函数的一个优点就是可以在子类构造函数中**向父类构造函数传参**。

```js{5-8}
function DadType(name){
  this.name = name;
}
function SonType() {
  // 继承 DadType 并传参
  DadType.call(this, "Nicholas");
  // 实例属性
  this.age = 29;
}
let instance = new SonType();
console.log(instance.name); // "Nicholas";
console.log(instance.age); // 29
```

❌ **缺点：** 盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的**方法**，因此所有类型只能使用构造函数模式。由于存在这些问题，**盗用构造函数基本上也不能单独使用**。（没太理解 🤔）

## 组合继承

组合继承（有时候也叫伪经典继承）综合了**原型链**和**盗用构造函数**，将两者的优点集中了起来 👍。基本的思路是使用**原型链继承原型上的属性和方法**，而通过**盗用构造函数继承实例属性**。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

```js{10,14}
function DadType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
DadType.prototype.sayName = function() {
  console.log(this.name);
};
function SonType(name, age){
  // 继承属性
  DadType.call(this, name);
  this.age = age;
}
// 继承方法
SonType.prototype = new DadType();
SonType.prototype.sayAge = function() {
  console.log(this.age);
};
let instance1 = new SonType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
instance1.sayName(); // "Nicholas";
instance1.sayAge(); // 29
let instance2 = new SonType("Greg", 27);
console.log(instance2.colors); // "red,blue,green"
instance2.sayName(); // "Greg";
instance2.sayAge(); // 27
```

在这个例子中，DadType 构造函数定义了两个属性，`name` 和 `colors`，而它的原型上也定义了一个方法叫 `sayName()`。**SonType 构造函数调用了 DadType 构造函数**，传入了 `name` 参数，然后又定义了自己的属性 `age`。此外，**SonType.prototype 也被赋值为 DadType 的实例**。原型赋值之后，又在这个原型上添加了新方法 `sayAge()`。<br>
这样，就可以创建两个 SonType 实例，让这两个实例**都有自己的属性**，包括 `colors`，同时还**共享相同的方法** 🤗。

> 组合继承弥补了原型链和盗用构造函数的不足，是 JavaScript 中**使用最多的继承模式** 👍。而且组合继承也保留了 `instanceof` 操作符和 `isPrototypeOf()` 方法识别合成对象的能力。

## 原型式继承

🔨 如下是原型式继承的核心思想：

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

本质上，上面的 `object()` 是对传入的对象执行了一次**浅复制**。

```js
let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
```

`person.friends` 不仅是 `person` 的属性，也会跟 `anotherPerson` 和 `yetAnotherPerson` 共享。这里实际上克隆了两个 `person`。

ECMAScript 5 通过增加 `Object.create()` 方法将原型式继承的概念规范化，在只有一个参数时，`Object.create()`与这里的 `object()`方法效果相同：

```js
let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
let yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
```

<br>

原型式继承非常适合**不需要单独创建构造函数**，但仍然需要**在对象间共享信息**的场合。

> 要记住，属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的（二者很像）。

## 寄生式继承

🔨 与**原型式继承**比较接近的一种继承方式是**寄生式继承**（`parasitic inheritance`）。<br>
寄生式继承背后的思路类似于**寄生构造函数**和**工厂模式**：创建一个实现继承的函数，以某种方式**增强对象**，然后返回这个对象。基本的寄生继承模式如下：

```js
function createAnother(original){
  let clone = object(original); // 通过调用函数创建一个新对象
  clone.sayHi = function() { // 以某种方式增强这个对象
    console.log("hi");
  };
  return clone; // 返回这个对象
}
```

## 寄生式组合继承

### 🤫 组合继承的缺点（瑕疵）

> 父类构造函数会被调用两次

**组合继承**已经接近完美了，但其实也存在**效率问题**（鸡蛋里挑骨头）。最主要的效率问题就是**父类构造函数始终会被调用两次**：一次在是**创建子类原型**时调用，另一次是在**子类构造函数中调用**。

再把组合继承的例子搬过来看看：

```js{9,12}
function DadType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
DadType.prototype.sayName = function() {
  console.log(this.name);
};
function SonType(name, age){
  DadType.call(this, name); // 第二次调用 DadType()
  this.age = age;
}
SonType.prototype = new DadType(); // 第一次调用 DadType()
SonType.prototype.constructor = SonType;
SonType.prototype.sayAge = function() {
  console.log(this.age);
};
```

❗ 注意调用顺序：

1. 第一次调用 `DadType()` 之后：SonType.prototype 上会有两个属性：`name` 和 `colors`。它们都 DadType 的实例属性，但现在成为了 SonType 的**原型属性**。
2. 在调用 SonType 构造函数时，也会调用 DadType 构造函数，这一次会在新对象上创建实例属性 `name` 和 `colors`。**这两个实例属性会遮蔽原型上同名的属性**。

### 🧐 寄生式组合继承是怎么做的

寄生式组合继承通过**盗用构造函数继承属性**，但使用**混合式原型链继承方法**。基本思路是 不通过调用父类构造函数给子类原型赋值，而是**取得父类原型的一个副本**。<br>

> 说到底就是使用**寄生式继承来继承父类原型**，然后将返回的新对象赋值给**子类原型**。

寄生式组合继承的基本模式如下所示：

```js
function inheritPrototype(SonType, DadType) {
  let prototype = object(DadType.prototype); // 创建对象
  prototype.constructor = SonType; // 增强对象
  SonType.prototype = prototype; // 赋值对象
}
```

这个 `inheritPrototype()` 函数实现了寄生式组合继承的**核心逻辑**。这个函数接收两个参数：**子类**构造函数和**父类**构造函数。在这个函数内部，第一步是**创建父类原型的一个副本**。然后，给返回的 prototype 对象设置 `constructor` 属性，解决由于重写原型导致默认 `constructor` 丢失的问题。最后将**新创建的对象**赋值给**子类型的原型**。

如下例所示，调用 `inheritPrototype()` 就可以实现前面例子中的子类型原型赋值：

```js
function DadType(name) {
 this.name = name;
 this.colors = ["red", "blue", "green"];
}
DadType.prototype.sayName = function() {
 console.log(this.name);
};
function SonType(name, age) {
 DadType.call(this, name);
  this.age = age;
}
inheritPrototype(SonType, DadType);
SonType.prototype.sayAge = function() {
 console.log(this.age);
};
```

这里只调用了一次 DadType 构造函数，避免了 SonType.prototype 上不必要也用不到的属性，因此可以说这个例子的效率更高。

> 👍 寄生式组合继承可以算是引用类型继承的**最佳模式**。

<br>

---

晕 🤯... 让我琢磨琢磨 ...
<br><br>
emmm 不过多看两遍就慢慢清晰啦 😜~
