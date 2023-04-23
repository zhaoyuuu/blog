# CSS 面试题合集

## 重绘 vs 重排

🟡 以下操作引起**重绘**：

- color
- border-style
- border-radius
- text-decoration
- box-shadow
- background
- ...

🔴 以下操作引起**重排**：

- 页面初次渲染
- 添加/删除可见的 DOM 元素
- 改变元素位置
- 改变元素尺寸
- 改变浏览器窗口大小 resize
- 查询 DOM 属性，比如 offsetWidth offsetHeight

💡 **优化建议：减少重排次数、减小重排范围**

1. **样式集中改变** => 改变 class 来一次性改变样式
2. 将 **DOM 离线**
   1. 需要频繁修改样式时，display:none 隐藏，修改完之后再显示
   2. absolute / fixed 脱离文档流
   3. 善用内存。在内存中多次操作 DOM，再添加到整个 DOM 树。
