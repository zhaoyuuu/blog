/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  this.map = new Map() // 存储数据
  this.length = capacity // 存储长度
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const map = this.map

  if (!map.has(key)) {
    // 未找到，返回-1
    return -1
  } else {
    const val = map.get(key)
    // 删除元素
    map.delete(key)
    // 重新放到map最前面
    map.set(key, val)
    return val
  }
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const map = this.map,
    len = this.length
  // map有的话，删除，重新放到map最前面
  if (map.has(key)) {
    map.delete(key)
  }
  map.set(key, value)
  // 如果超出了容量，则需要删除最久的数据
  if (map.size > len) {
    // 删除map最老的数据
    const deleteKey = map.keys().next().value
    map.delete(deleteKey)
  }
}

const lru = new LRUCache(3)
lru.put('name', 'test')
lru.put('age', 10)
lru.put('sex', '男')
// Map(3) { 'age' => 10, 'sex' => '男', 'height' => 180 }
lru.get('name')
// Map(3) { 'age' => 10, 'sex' => '男', 'name' => 'test' }
lru.put('height', 180)
// Map(3) { 'sex' => '男', 'name' => 'test', 'height' => 180 }
