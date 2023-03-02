class Human {
  say() {
    console.log('say')
  }
}
class Person extends Human {}
const p = new Person()
console.log(p.__proto__.__proto__.__proto__.constructor)
