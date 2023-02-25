// class CancelToken {
//   constructor(cancelFn) {
//     this.promise = new Promise((resolve, reject) => {
//       cancelFn(() => {
//         resolve()
//       })
//     })
//   }
// }
// const startButton = document.querySelector('#start')
// const cancelButton = document.querySelector('#cancel')
// function cancellableDelayedResolve(delay) {
//   return new Promise((resolve, reject) => {
//     const id = setTimeout(() => {
//       resolve()
//     }, delay)
//     const cancelToken = new CancelToken(cancelCallback =>
//       cancelButton.addEventListener('click', cancelCallback)
//     )
//     cancelToken.promise.then(() => clearTimeout(id))
//   })
// }

// startButton.addEventListener('click', () => cancellableDelayedResolve(1000))

// class TrackablePromise extends Promise {
//   constructor(executor) {
//     const notifyHandlers = []
//     super((resolve, reject) => {
//       return executor(resolve, reject, status => {
//         notifyHandlers.map(handler => handler(status))
//       })
//     })
//     this.notifyHandlers = notifyHandlers
//   }
//   notify(notifyHandler) {
//     this.notifyHandlers.push(notifyHandler)
//     return this
//   }
// }

console.log(Promise.reject(Promise.resolve()))
