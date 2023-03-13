const p = new Promise((resolve, reject) => {
  reject('rejected')
  resolve('resolved')
})
p.catch(err => console.log(err))
p.catch(err => console.log(err)).then(val => console.log(val))
