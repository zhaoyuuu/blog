## loader 和 plugin 的区别

**loader 是一个转换器**，将 A 文件进行编译成 B 文件，比如：将 `A.less` 转换为 `A.css`，单纯的文件转换过程。

**plugin 是一个扩展器**，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会**监听 webpack 打包过程中的某些节点，执行广泛的任务。**
