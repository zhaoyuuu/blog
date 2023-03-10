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
