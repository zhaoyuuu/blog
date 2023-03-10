# Observe Pattern 观察者模式

💡 **Guide:**

- 观察者属于行为模式，当一个对象改变时，会**通知订阅者**做相应的处理。
- 是一种**低耦合**的方式，观察者和被观察者之间**不互相依赖**。
- 缺点或者说需要注意的点：1、如果观察者很多，要**通知**所有的观察者需要很多时间 2、**观察者之间互相循环调用**，会导致系统崩溃。

## 实现

**_Subject 被观察者_**

```js
// 被观察者（学生）
class Subject {
  constructor(name) {
    this.name = name
    this.state = 'just so so'
    this.observers = []
  }
  addObserver(o) {
    this.observers.push(o)
  }
  setState(newState) {
    this.state = newState
    this.observers.forEach(o => o.update(this))
  }
}
```

**_Observer 观察者_**

```js
// 观察者（老师、家长）
class Observer {
  constructor(name) {
    this.name = name
  }
  update(student) {
    console.log(
      `${this.name}得到消息，学生${student.name}的状态更新为${student.state}`
    )
  }
}
```

## 使用

```js
// 1.初始化对象
const student = new Subject('peter')
const teacher = new Observer('老师')
const parent = new Observer('家长')
// 2.观察（被观察）之前，需要先建立联系（互相认识）
student.addObserver(teacher)
student.addObserver(parent)
// 3.改变 student 状态
student.setState('happy')
// 老师得到消息，学生peter的状态更新为happy
// 家长得到消息，学生peter的状态更新为happy
```
