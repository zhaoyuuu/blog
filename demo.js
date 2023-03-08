function inherite(Son, Dad) {
  const dadProto = object(Dad.prototype)
  Son.prototype = dadProto
  dadProto.constructor = Son
}

function object(obj) {
  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}
