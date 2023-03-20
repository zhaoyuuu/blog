# LRUCache 缓存算法

## 💡 Guide:

> leetcode 链接：[LRU 缓存](https://leetcode.cn/problems/lru-cache/)

**定义：** LRU 是 `Least Recently Used` 的缩写，即**最近最少使用**，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。 该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，当须淘汰一个页面时，选择现有页面中其 t 值最大的，即最近最少使用的页面予以淘汰。

![LRU缓存算法](https://cdn.jsdelivr.net/gh/zhaoyuuu/picb@main/lru.png)

**使用场景：** <br>

- 我们操作系统底层的**内存管理**，其中就包括有 LRU 算法
- 我们常见的**缓存服务**，比如 redis 等等
- 比如浏览器的最近**浏览记录存储**
- vue 中的 `keep-alive` 组件使用了 LRU 算法

**实现思路：** <br>

- 实现一个 LRUCache 类型，用来充当存储空间
- 采用 Map 数据结构存储数据，因为它的存取时间复杂度为 O(1)，数组为 O(n)
- 实现 `get` 和 `put` 方法，用来获取和添加数据
- 我们的存储空间有长度限制，所以无需提供删除方法，存储满之后，自动删除最久远的那条数据
- 当使用 `get` 获取数据后，该条数据需要更新到最前面

## 实现

```js
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
```

## 使用

```js
const lru = new LRUCache(3)
lru.put('name', 'test')
lru.put('age', 10)
lru.put('sex', '男')
// Map(3) { 'age' => 10, 'sex' => '男', 'height' => 180 }
lru.get('name')
// Map(3) { 'age' => 10, 'sex' => '男', 'name' => 'test' }
lru.put('height', 180)
// Map(3) { 'sex' => '男', 'name' => 'test', 'height' => 180 }
```
