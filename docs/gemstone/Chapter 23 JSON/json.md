# JSON

难度：⭐️⭐️

> 💌 理解 JSON 最关键的一点是要把它当成一种**数据格式**，而**不是编程语言**。JSON 不属于 JavaScript，它们只是**拥有相同的语法**而已。JSON 也不是只能在 JavaScript 中使用，它是一种**通用数据格式**。很多语言都有**解析和序列化** JSON 的内置能力。

## syntax 语法

JSON 语法支持表示 3 种类型的值：

- **简单值：** 字符串、数值、布尔值和 `null` 可以在 JSON 中出现，就像在 JavaScript 中一样。特殊值 `undefined` 不可以。
- **对象：** 第一种复杂数据类型，对象表示有序键/值对。每个值可以是简单值，也可以是复杂类型。
- **数组：** 第二种复杂数据类型，数组表示可以通过数值索引访问的值的有序列表。数组的值可以是任意类型，包括简单值、对象，甚至其他数组。

> JSON **没有变量、函数或对象实例的概念**。JSON 的所有记号都只为表示**结构化数据**，虽然它借用了 JavaScript 的语法，但是千万不要把它跟 JavaScript 语言混淆。

👉 对象和数组通常会作为 JSON 数组的顶级结构（尽管不是必需的），以便创建大型复杂数据结构。

## 解析与序列化

🤗 JSON 可以**直接被解析成可用的 JavaScript 对象**。与**解析为 DOM 文档的 XML** 相比，这个优势非常明显。

### JSON 对象

JSON 对象有两个方法：`stringify()` 和 `parse()`。在简单的情况下，这两个方法分别可以将 JavaScript 序列化为 JSON 字符串，以及将 JSON 解析为原生 JavaScript 值。

在序列化 JavaScript 对象时，所有**函数**和**原型成员**都会有意地在结果中省略。此外，值为 `undefined` 的任何属性也会被跳过。最终得到的就是**所有实例属性**均为**有效 JSON 数据类型**的表示。

### 序列化选项

`JSON.stringify()` 方法除了要序列化的对象，还可以**接收两个参数**。这两个参数可以用于指定其他序列化 JavaScript 对象的方式。第一个参数是**过滤器**，可以是数组或函数；第二个参数是用于**缩进**结果 JSON 字符串的选项。

**_1. 过滤器_**<br>

- 如果第二个参数是一个**数组**，那么 `JSON.stringify()` 返回的结果只会包含该数组中列出的对象属性：

```js
let book = {
  title: "Professional JavaScript",
  authors: [
    "Nicholas C. Zakas",
    "Matt Frisbie"
  ],
  edition: 4,
  year: 2017
};
let jsonText = JSON.stringify(book, ["title", "edition"]);
```

在这个例子中，`JSON.stringify()` 方法的第二个参数是一个包含两个字符串的数组：`"title"` 和 `"edition"`。它们对应着要序列化的对象中的属性，因此结果 JSON 字符串中只会包含这两个属性：

```json
{"title":"Professional JavaScript","edition":4}
```

如果第二个参数是一个**函数**，则行为又有不同。提供的函数接收两个参数：属性名（key）和属性值（value）。可以根据这个 `key` 决定要对相应属性执行什么操作：

```js
let jsonText = JSON.stringify(book, (key, value) => {
  switch(key) {
    case "authors":
    return value.join(",")

    case "year":
    return 5000;

    case "edition":
    return undefined;

    default:
    return value;
  }
});
```

**注意：** 最后一定要提供**默认返回值**，以便返回其他属性传入的值。

最终结果：

```json
{"title":"Professional JavaScript","authors":"Nicholas C. Zakas,Matt Frisbie","year":5000}
```

**_2. 字符缩进_**<br>
如果想每级缩进 4 个空格，可以这样：

```js{4}
let jsonText = JSON.stringify(
  book,
  null,
  4
);
```

这样得到的 `jsonText` 格式如下：

```json
{
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas",
        "Matt Frisbie"
    ],
    "edition": 4,
    "year": 2017
}
```

## 解析选项

**`JSON.parse()`** 方法也可以接收一个额外的参数，这个函数会针对**每个键/值对都调用一次**。区别于传给 `JSON.stringify()` 的起过滤作用的**替代函数（replacer）**，这个函数被称为**还原函数（reviver）**。

还原函数经常被用于把**日期字符串**转换为 **Date 对象**：

```js{9,12-13}
let book = {
  title: "Professional JavaScript",
  authors: [
    "Nicholas C. Zakas",
    "Matt Frisbie"
  ],
  edition: 4,
  year: 2017,
  releaseDate: new Date(2017, 11, 1)
};
let jsonText = JSON.stringify(book);
let bookCopy = JSON.parse(jsonText,
 (key, value) => key == "releaseDate" ? new Date(value) : value);

alert(bookCopy.releaseDate.getFullYear());
```

以上代码在 `book` 对象中增加了 `releaseDate` 属性，是一个 `Date` 对象。这个对象在**被序列化为 JSON 字符串**后，又被**重新解析为一个对象** `bookCopy`。这里的还原函数会查找`"releaseDate"`键，如果找到就会根据它的日期字符串创建新的 `Date` 对象。得到的 `bookCopy.releaseDate` 属性又**变回了 Date 对象**，因此可以调用其 `getFullYear()` 方法。
