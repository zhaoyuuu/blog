# class 类

难度：⭐️⭐️⭐️⭐️

前几节深入讲解了如何只使用 **ECMAScript 5 的特性来模拟**类似于类（class-like）的行为。不难看出，各种策略都有自己的问题，也有相应的妥协。正因为如此，实现继承的代码也显得非常**冗长和混乱**。为解决这些问题，ECMAScript 6 新引入的 **class** 关键字具有**正式定义类**的能力。

> 💌 虽然 ECMAScript 6 类表面上看起来可以支持正式的**面向对象编程**，但实际上它背后使用的仍然是**原型和构造函数**的概念(语法糖 🍭)。

## 类定义

与函数类型相似，定义类也有两种主要方式：**类声明**和**类表达式**。这两种方式都使用 `class` 关键字加大括号：

```js
// 类声明
class Person {}
// 类表达式
const Animal = class {};
```

- 与函数表达式类似，类表达式在它们**被求值前也不能引用**。不过，与**函数定义不同**的是，虽然**函数声明可以提升，但类定义不能**：

```js{5,13}
console.log(FunctionExpression); // undefined
var FunctionExpression = function() {};
console.log(FunctionExpression); // function() {}

console.log(FunctionDeclaration); // FunctionDeclaration() {}
function FunctionDeclaration() {}
console.log(FunctionDeclaration); // FunctionDeclaration() {}

console.log(ClassExpression); // undefined
var ClassExpression = class {};
console.log(ClassExpression); // class {}

console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
class ClassDeclaration {}
console.log(ClassDeclaration); // class ClassDeclaration {}
```

- 另一个跟函数声明不同的地方是，函数受**函数作用域**限制，而类受**块作用域**限制：

```js
{
 function FunctionDeclaration() {}
 class ClassDeclaration {}
}
console.log(FunctionDeclaration); // FunctionDeclaration() {}
console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
```

### 类的构成

类可以包含**构造函数方法**、**实例方法**、**获取&设置 函数**和**静态类方法**。但这些都不是必需的，空的类定义照样有效。

```js
// 空类定义，有效
class Foo {}
// 有构造函数的类，有效
class Bar {
  constructor() {}
}
// 有获取函数的类，有效
class Baz {
  get myBaz() {}
}
// 有静态方法的类，有效
class Qux {
  static myQux() {}
}
```

## 类构造函数

`constructor` 关键字用于在**类定义块**内部**创建类的构造函数**。方法名 `constructor` 会告诉解释器在**使用 new 操作符创建类的新实例**时，应该调用这个函数。

> 构造函数的定义不是必需的，不定义构造函数相当于将构造函数定义为空函数。

### 实例化

使用 **`new` 调用类的构造函数**会执行如下操作（和构造函数一致）：

1. 在内存中**创建一个新对象**。
2. 这个新对象内部的 `__proto__` 指针被赋值为构造函数的 `prototype` 属性（**接上原型链**）。
3. 构造函数内部的 `this` 被赋值为这个新对象（即 **`this` 指向新对象**）。
4. **执行**构造函数内部的代码（给新对象添加属性）。
5. 如果**构造函数返回非空对象**，则返回该对象；**否则**，返回刚创建的新对象。

🟢 默认情况下，类构造函数会在执行之后返回 `this` 对象。<br>
🟡 不过，如果返回的**不是 `this` 对象**，而是其他对象（构造函数内部返回的非空对象），那么这个对象**不会**通过 `instanceof` 操作符检测出跟类有关联，因为这个对象的原型指针并没有被修改。

```js
class Person {
  constructor(override) {
  this.foo = 'foo';
    if (override) {
      return {
        bar: 'bar'
      };
    }
  }
}
let p1 = new Person(),
p2 = new Person(true);
console.log(p1); // Person{ foo: 'foo' }
console.log(p1 instanceof Person); // true
console.log(p2); // { bar: 'bar' }
console.log(p2 instanceof Person); // false
```

<br>

👉 类构造函数与构造函数的**主要区别**是，调用类构造函数**必须使用 `new` 操作符**。而普通构造函数如果不使用 new 调用，那么就会以**全局的 `this`（通常是 `window`）** 作为内部对象。调用类构造函数时如果忘了使用 `new` 则会**抛出错误**：

```js
function Person() {}
class Animal {}
// 把 window 作为 this 来构建实例
let p = Person();
let a = Animal();
// TypeError: class constructor Animal cannot be invoked without 'new'
```

### 把类当成特殊函数

ECMAScript 中没有正式的类这个类型。从各方面来看，**ECMAScript 类就是一种特殊函数**。声明一个类之后，通过 `typeof` 操作符检测类标识符，表明它是一个函数：

```js{3}
class Person {}
console.log(Person); // class Person {}
console.log(typeof Person); // function
```

类标识符有 `prototype` 属性，而这个原型也有一个 `constructor` 属性指向类自身：

```js
class Person{}
console.log(Person.prototype); // { constructor: f() }
console.log(Person === Person.prototype.constructor); // true
```

## 实例、原型和类成员

类的语法可以非常方便地定义应该存在于**实例上的成员**、应该存在于**原型上的成员**，以及应该存在于**类本身的成员**。

### 实例成员

每个实例都对应一个**唯一的成员对象**，这意味着所有成员都**不会在原型上共享**：

```js{12-14}
class Person {
  constructor() {
    this.name = new String('Jack');
    this.sayName = () => console.log(this.name);
    this.nicknames = ['Jake', 'J-Dog']
  }
}
let p1 = new Person(),
p2 = new Person();
p1.sayName(); // Jack
p2.sayName(); // Jack
console.log(p1.name === p2.name); // false
console.log(p1.sayName === p2.sayName); // false
console.log(p1.nicknames === p2.nicknames); // false
```

### 原型方法与访问器

为了在**实例间共享方法**，类定义语法把在**类块中定义的方法**作为**原型方法**：

```js{6-9}
class Person {
  constructor() {
    // 添加到 this 的所有内容都会存在于不同的实例上
    this.locate = () => console.log('instance')
  }
  // 在类块中定义的所有内容都会定义在类的原型上
  locate() {
    console.log('prototype')
  }
}
let p = new Person()
p.locate() // instance
Person.prototype.locate() // prototype
```

可以把**方法**定义在类构造函数中或者类块中，但**不能**在类块中给原型添加**原始值或对象**作为成员数据：

```js
class Person {
  name: 'Jake'
}
// Uncaught SyntaxError: Unexpected token
```

**类方法等同于对象属性**，因此可以使用字符串、符号或计算的值作为键：

```js
const symbolKey = Symbol('symbolKey');
class Person {
  stringKey() {
    console.log('invoked stringKey');
  }
  [symbolKey]() {
    console.log('invoked symbolKey');
  }
  ['computed' + 'Key']() {
    console.log('invoked computedKey');
  }
}
let p = new Person();
p.stringKey(); // invoked stringKey
p[symbolKey](); // invoked symbolKey
p.computedKey(); // invoked computedKey
```

类定义也支持**获取和设置访问器**。语法与行为跟**普通对象**一样：

```js
class Person {
  set name(newName) {
    this.name_ = newName;
  }
  get name() {
    return this.name_;
  }
}
let p = new Person();
p.name = 'Jake';
console.log(p.name); // Jake
```

### 静态类方法

可以在类上定义静态方法。这些方法通常用于**执行不特定于实例的操作**，也**不要求存在类的实例**。<br>
静态类成员在类定义中使用 `static` 关键字作为前缀。**在静态成员中，`this` 引用类自身**。其他所有约定跟原型成员一样：

```js{10-13}
class Person {
  constructor() {
    // 添加到 this 的所有内容都会存在于不同的实例上
    this.locate = () => console.log('instance', this)
  }
  // 定义在类的原型对象上
  locate() {
    console.log('prototype', this)
  }
  // 定义在类本身上
  static locate() {
    console.log('class', this)
  }
}
let p = new Person()
p.locate() // instance, Person {}
Person.prototype.locate() // prototype, {constructor: ... }
Person.locate() // class, class Person {}
```

### 非函数原型和类成员

如上面所说，**不能**在类块中给原型添加**原始值或对象**作为成员数据，但在类定义外部，可以手动添加：

```js{6-9}
class Person {
  sayName() {
    console.log(`${Person.greeting} ${this.name}`)
  }
}
// 在类上定义数据成员
Person.greeting = 'My name is'
// 在原型上定义数据成员
Person.prototype.name = 'Jake'
let p = new Person()
p.sayName() // My name is Jake
```

## 继承

✨ ECMAScript 6 新增特性中**最出色**的一个就是**原生支持了类继承机制**。

> 虽然类继承使用的是新语法，但背后依旧使用的是原型链。

### 继承基础 extends

使用 `extends` 关键字，就可以继承**任何拥有 `[[Construct]]` 和原型的对象**。很大程度上，这意味着**不仅可以继承一个类**，也可以继承**普通的构造函数**（保持向后兼容）：

```js
class Vehicle {}
// 继承类
class Bus extends Vehicle {}
let b = new Bus();
console.log(b instanceof Bus); // true
console.log(b instanceof Vehicle); // true

function Person() {}
// 继承普通构造函数
class Engineer extends Person {}
let e = new Engineer();
console.log(e instanceof Engineer); // true
console.log(e instanceof Person); // true
```

### 构造函数 和 super()

**派生类**的方法可以通过 `super` 关键字引用它们的原型。这个关键字**只能在派生类中使用**，而且仅限于**类构造函数**、**实例方法**和**静态方法**内部。<br>

在类构造函数中使用 `super` 可以**调用父类构造函数**。

```js{9}
class Vehicle {
  constructor() {
    this.hasEngine = true
  }
}
class Bus extends Vehicle {
  constructor() {
    // 不要在调用 super()之前引用 this，否则会抛出 ReferenceError
    super() // 相当于 super.constructor()
    console.log(this instanceof Vehicle) // true
    console.log(this) // Bus { hasEngine: true }
  }
}
new Bus()
```

在静态方法中可以通过 `super` 调用**继承的类上定义的静态方法**：

```js{8}
class Vehicle {
  static identify() {
    console.log('vehicle')
  }
}
class Bus extends Vehicle {
  static identify() {
    super.identify()
  }
}
Bus.identify() // vehicle
```

在使用 `super` 时要注意几个问题：

- `super` 只能在 **派生类** **构造函数**和**静态方法**中使用：

```js
class Vehicle {
  constructor() {
    super()
    // SyntaxError: 'super' keyword unexpected
  }
}
```

- 不能单独引用 `super` 关键字，要么用它**调用构造函数**，要么用它**引用静态方法**：

```js
class Vehicle {}
class Bus extends Vehicle {
  constructor() {
     console.log(super);
    // SyntaxError: 'super' keyword unexpected here
  }
}
```

- 调用 `super()` 会调用父类构造函数，并将返回的实例赋值给 `this`：

```js
class Vehicle {}
class Bus extends Vehicle {
  constructor() {
    super()
    console.log(this instanceof Vehicle)
  }
}
new Bus() // true
```

- `super()`的行为如同**调用构造函数**，如果需要给父类构造函数**传参**，则需要**手动传入**：

```js{8,11}
class Vehicle {
  constructor(licensePlate) {
    this.licensePlate = licensePlate
  }
}
class Bus extends Vehicle {
  constructor(licensePlate) {
    super(licensePlate)
  }
}
console.log(new Bus('1337H4X')) // Bus { licensePlate: '1337H4X' }
```

- 如果**没有定义类构造函数**，在实例化派生类时会**调用 `super()`**，而且会传入所有传给派生类的参数：

```js
class Vehicle {
  constructor(licensePlate) {
    this.licensePlate = licensePlate
  }
}
class Bus extends Vehicle {}
console.log(new Bus('1337H4X')) // Bus { licensePlate: '1337H4X' }
```

- 在类构造函数中，不能在调用 `super()`之前引用 `this`：

```js
class Vehicle {}
class Bus extends Vehicle {
  constructor() {
    console.log(this)
  }
}
new Bus()
// ReferenceError: Must call super constructor in derived class
// before accessing 'this' or returning from derived constructor
```

- 如果在派生类中**显式定义了构造函数**，则要么必须在其中**调用 `super()`**，要么必须在其中**返回一个对象**：

```js{5,10}
class Vehicle {}
class Car extends Vehicle {}
class Bus extends Vehicle {
  constructor() {
    super()
  }
}
class Van extends Vehicle {
  constructor() {
    return {}
  }
}
console.log(new Car()) // Car {}
console.log(new Bus()) // Bus {}
console.log(new Van()) // {}
```

### 抽象基类

有时候可能需要定义这样一个类，它**可供其他类继承**，但**本身不会被实例化**。虽然 ECMAScript 没有专门支持这种类的语法 ，但通过 **`new.target`** 也很容易实现。`new.target` **保存通过 `new` 关键字调用的类或函数**，通过在**实例化时检测 `new.target` 是不是抽象基类**，可以阻止对抽象基类的实例化：

```js{5-7,14}
// 抽象基类
class Vehicle {
  constructor() {
    console.log(new.target)
    if (new.target === Vehicle) {
      throw new Error('Vehicle cannot be directly instantiated')
    }
  }
}
// 派生类
class Bus extends Vehicle {}
new Bus() // class Bus {}
new Vehicle() // class Vehicle {}
// Error: Vehicle cannot be directly instantiated
```

另外，通过在**抽象基类构造函数中进行检查**，可以要求**派生类**必须定义某个方法。因为原型方法在调用类构造函数之前就已经存在了，所以可以通过 `this` 关键字来检查相应的方法：

```js{7-9,20}
// 抽象基类
class Vehicle {
  constructor() {
    if (new.target === Vehicle) {
      throw new Error('Vehicle cannot be directly instantiated')
    }
    if (!this.foo) {
      throw new Error('Inheriting class must define foo()')
    }
    console.log('success!')
  }
}
// 派生类
class Bus extends Vehicle {
  foo() {}
}
// 派生类
class Van extends Vehicle {}
new Bus() // success!
new Van() // Error: Inheriting class must define foo()
```

### 继承内置类型

ES6 类为**继承内置引用类型**提供了顺畅的机制，开发者可以方便地扩展内置类型：

```js
class SuperArray extends Array {
  shuffle() {
    // 洗牌算法
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this[i], this[j]] = [this[j], this[i]]
    }
  }
}
let a = new SuperArray(1, 2, 3, 4, 5)
console.log(a instanceof Array) // true
console.log(a instanceof SuperArray) // true
console.log(a) // [1, 2, 3, 4, 5]
a.shuffle()
console.log(a) // [3, 1, 4, 5, 2]
```

<br>

---

🎉 class 类 这部分的内容还是蛮多的，也比较重要。我现在复习 class 就看这篇文章，绝大多数（书中）知识点都囊括了，希望可以帮助到你~ ❤
