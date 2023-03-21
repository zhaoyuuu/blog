function throttle(fn, wait) {
  let pre = 0
  return function (...args) {
    const now = new Date()
    if (now - pre >= wait) {
      fn.apply(that, args)
      pre = now
    }
  }
}
