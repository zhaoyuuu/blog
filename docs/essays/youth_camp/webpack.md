# webpack 课堂随记

> 本质上是一种 前端资源 **编译、打包工具**。

webpack 的配置超级复杂，有一百多项，其中很多配置项还会牵扯到很多东西。

按使用频率：

- `entry / ouput`
- `module / plugins`
- `mode`
- `watch / devServer / devtool`

### 处理 css ：

1. 安装 `css-loader` `style-loader`
2. 添加`module`处理 css 文件

```json
module: {
  rules: [{
    test: /\.css/i,
    use: ["style-loader", "css-loader"]
  }]
}
```

### 处理 js:

`babel-loader`

---

### HMR(Hot Module Replacement): 模块热替换

核心配置项：

```json
devServer: {
  hot: true
}
```

### tree shaking

树摇，用于删除一些 `dead code`

### 其他工具

- 缓存
- sourcemap
- 性能监控
- 日志
- 代码压缩
- 分包
- ...
