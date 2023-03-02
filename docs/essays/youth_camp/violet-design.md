# violet-design 组件库

> 第五届字节跳动青训营（冬季）发布了三个项目选题：组件库、掘金站点（SSR）以及 数据可视化。我们组选择的是组件库。

<p align='center'>
  <img src="https://github.com/zhaoyuuu/blog/blob/master/docs/assets/violet-logo.PNG?raw=true">
</p>

相关链接：

- [Github 地址](https://github.com/zhaoyuuu/violet-design)
- [文档站地址](https://zhaoyuuu.github.io/violet-design/)
- [npm 地址](https://www.npmjs.com/package/violet-desig)

<!-- 这是一次很美好的团队协作经历，我在这次项目中学到了很多，也结交了六个可爱的队友。 -->

## 文章初衷

向你展示我们是怎么**从 0 到 1 开发组件库**的（魔鬼都在细节中~），如果你觉得我们做得不错、或者对你有所启发的话，请给我们的仓库一个 `star` ，这对我们来说帮助很大 🙏。

> 如果你想快速的了解`violet-design`，我们录制了[精美的视频](https://www.bilibili.com/video/BV1fR4y1v7VU/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click)供你选择。

## 技术选型（at the beginning）

🔮 我们选择 `React18 + TS` 的组合作为 JS 开发框架 👉 使用 [`create-react-app`](https://create-react-app.dev/) 初始化项目。

---

> 虽然 Vite 是冉冉升起的新星、相对于 webpack 有很多优势，但是如果你之前没有 **从 0 到 1** 构建项目，我更推荐你使用 `create-react-app` 初始化项目。通过这一行命令，你基本上不需要再手动配置 webpack 。

---

🎖 由于该项目性质的特殊性，我们需要**保证组件的质量**。我们使用 `create-react-app` 之后项目开箱急用的**单元测试**工具：[`React-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)。

---

🎈 一般的，你需要一个站点来**展示你的组件**。我们选用 [storybook](https://storybook.js.org/) 来构建文档站，它的优势很明显：

- 跟其他的生成文档站工具相比，你在开发组件的时候就可以结合它进行调试，很方便
- 而且 storybook 可以内嵌在当前 react 项目里，不需要另建一个项目用来开发文档（回避了 monorepo）

> 虽然它的缺点也很明显..就是 UI 很丑..不过为了在有限的时间里，将我们更多的精力放在组件库本身，我们还是选择了它，并且感到庆幸 🤗。

---

🎯 现代的前端开发样式越来越复杂，一般的，你需要选择一种 **css 预处理器**（`less` / `scss` / ...）。我们选择了 `scss` 。

---

✨ 我们使用 webpack 作为项目的构建工具，但是在项目后期打包的时候，我们使用 **`Rollup` 打包**，因 `Rollup` 设计之初就是面向 ES Module 的，构建出**结构扁平、性能出众**的**类库**。而我们的组件库正好就是它所说的“类库”。

---

🌸 在项目之初我们就指定了**科学、规范**的**目录结构**，在此仅展示`src`下的目录结构：<br>
src -- 项目的源代码<br>
├─index.tsx -- js 打包入口文件<br>
├─assets -- 静态资源<br>
├─hooks -- 自定义 hook 文件夹<br>
├─stories -- stories 相关的文件夹<br>
│ <br>
├─**components** -- 项目各组件源码<br>
│ Affix（举例，以展示**组件文件格式**）<br>
│ \_style.scss -- 组件样式<br>
│ index.tsx -- 暴露组件<br>
│ affix.test.tsx -- 单元测试<br>
│ affix.tsx -- 组件实现<br>
│ affix.stories.tsx -- 组件 story<br>
│ <br>
├─styles -- 汇总项目样式的文件夹<br>
│ index.scss -- 项目样式的入口文件<br>
│ \_animation.scss -- 一些统一动画的样式<br>
│ \_mixin.scss -- scss mixin<br>
│ \_reboot.scss -- 统一浏览器样式<br>
│ \_variables.scss -- 样式变量<br>
│ <br>
└─_utils -- 工具<br>

<br>

> 完整技术选型相关链接：[violet-design 技术选型文档](https://ecve7bk5mc.feishu.cn/docx/YLv2dHs0DoUzwUxFBGhcxXs3nzc)

## 关于团队协作 💎

> 作为没有工作经验的大学生，团队协作是很容易被忽视的一块（**但其实非常重要 ❗️**）。我们队内有同学实习过，接触过实际工作中的团队协作，然后加上我们对这一块的重视，我认为我们在协作这方面做得不错。

接下来，我将从 **git 流程**、**css 样式** 以及 **开发规范** 三个方面来展示我们的团队协作。

### git 流程

1. 将需求拆分至**更小**的模块, 同时也尽可能不损失**清晰的语义**, 避免多人提交代码时的冲突
2. 在 local repository 中通过 `git checkout -b <BRANCHNAME> origin/master` 创建分支, 并将需求提交至分支
3. git commit 提交代码, `commit`信息尽量遵循 [conventioanl commits](https://www.conventionalcommits.org/en/v1.0.0/), 如果有 `lint 错误`或者`测试不通过`, 修复之后进行下一步
4. `git push origin <BRANCHNAME>` 提交代码至远程仓库
5. 在 github 上发起 `pr` , 通过 `code review` 之后，将当前 branch 合并至 master 分支
6. 如果该分支之后大概率不会被用到，使用`git push origin --delete <BRANCHNAME>`删除分支

> 虽然和大厂里的 git 流程相比，我们还是省去了一些环节，但是主要的（重要的）环节都保留了。对于我们这个小团队（7 个人，而且有同学对 git 不熟悉）来说，这个流程能够非常好的运作。

### css 样式

👉 **_css 命名_**

前端团队的 **css 命名规范** 是十分重要的，而且对于组件库来说，更需要团队制定一套 css 规范 以产出**统一、规范**的 css 代码。具体的规范细节如下 👇

- 遵循 [BEM 约定](http://getbem.com/naming/), 以减少 CSS 冲突和覆盖的可能（我们采取了 `bem` 的设计思路，在此基础上自定义了`b`/`e`/`m`之间的连接符号）
- 命名同时遵从 **小驼峰** 命名法
- 添加组件库统一前缀 `violet`

最终， css 命名的示例如下：

- `violetSearchBar__input--disabled`
- `violetModal__footer__confirmButton--show`

👉 **_样式交互的统一_**

一般成熟的组件库都有统一的样式、交互（设计风格，参考 [antd](https://ant.design/docs/spec/introduce-cn)），我们也为此做出了一些努力。<br>
相关链接：[violet-design 组件设计](https://y6gbjg9hbn.feishu.cn/docx/YILYdhh2jo4SR1xrFLAcwr5cnie)

### 开发规范

为了统一我们团队的开发行为、减少“低质量”代码，我们在开发阶段制定了一些规范，同时也使用到一些工具来帮助我们：

- 统一`Nodejs`版本：`16.x`
- 使用 [`Eslint`](https://eslint.org/) 检查 JS 代码，帮助团队的开发人员避免代码中的常见错误和不规范的用法。
  > 相关链接：[12 essential ESLint rules for React](https://blog.logrocket.com/12-essential-eslint-rules-react)（宝藏文章，很推荐！）
- 使用 [`Pretter`](https://prettier.io/docs/en/index.html) 格式化代码，统一团队代码风格
  > 一键自动格式化真的上头，我现在每个项目都会接入`Prettier`😂
- 借助 [Husky](https://typicode.github.io/husky/#/) + [Lint-staged](https://www.npmjs.com/package/lint-staged) 在 `pre-commit` 的时候运行 **单元测试** 和 **`npx lint-staged`**，防止不合格的代码进入远程仓库

  > `Lint-staged` 官网原话，可以说很直白了：`Run linters against staged git files and don't let 💩 slip into your code base`😂

  > 使用 `Husky` 一定去看官网！最近新版本的 `Husky` 的使用方法变动很大。

## 后期工作

> 以上说的都是**项目初期**我们注意的点，可以看到注意事项还是比较多的。**项目中期**的工作其实就比较 normal 了，无非是学习技术、并遵循上面制定的规则去录入组件。

而到**项目后期**，似乎又有那么一点不一样（有意思）了 😋。

### 部署文档站

借助 storybook 构建的文档站大致成型，我们想要互联网上所有人都可以通过一个链接访问我们的文档站，这时候就需要我们**部署文档站**。<br>
我们是借助 [`github-pages`](https://pages.github.com/) 来部署的，同样推荐的解决方案还有 [vercel](https://vercel.com/) 。

> `github-pages` 文档写的非常好！`vercel`比起 `github-pages` 更加“自动”，但是生成的网址似乎对**访问者的网络**有更高的要求。

我们借助 [`@storybook/storybook-deployer`](https://www.npmjs.com/package/@storybook/storybook-deployer)帮助我们打包、部署 storybook。

### 发布 npm

- **想要发布包到 npm 上，首先你需要把你想要的文件打包在一起。** 我们借助 `Rollup` 来打包，`Rollup` 配置可以在 `/rollup` 文件夹下看到。最后我们打包生成三个我们想要的文件：**esm 格式的 JS 文件**、**umd 格式的 JS 文件**，以及 **css 样式文件**。

👉 经测试，使用 `Rollup` 打包生成的 `esm` 格式的 JS 加上 CSS 代码，相较于使用 `tsc` + `node-sass` 进行打包，体积由 440Kb 减小到 276Kb（ **减小了 37%** ）。

> 注意，打包的入口文件在 **目录结构** 里也提到了，即：`src/index.tsx` 是 JS 入口文件，`src/styles/index.scss` 是样式入口文件。

- 接下来就是把这些打包生成的文件上传到 npm：[npm 发包官方教程](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)

> **`package.json` 文件中有很多跟 npm 相关的配置项**，所以写好 `package.json` 可以让你的包在 npm 上显示得更加丰满。推荐：[package.json 配置完全解读](https://juejin.cn/post/7161392772665540644)

### CICD

CICD 即持续部署、持续交付。<br>
我们采用 [`github-actions`](https://github.com/features/actions) 进行 cicd，实现以下自动化流程：

- `release` 新版本的时候自动更新远程 npm
- push 新代码到 `master` 分支的时候自动部署、更新文档站。

> github 的文档写的太好了，点赞 🥰！<br> `violet-design`相关自动化脚本源码看[这里](https://github.com/zhaoyuuu/violet-design/tree/master/.github/workflows)

相关链接：[GitHub Actions 入门教程（阮一峰）](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

---

🎉 以上就是 `violet-design` 的全部内容了，本文并没有“手把手”教你怎么开发，而是向你展示我们在每个阶段都做了什么。<br>
✨ `violet-design` 所有的开发路线、技术亮点 我们都已经毫无保留地将它呈现给你了。还有夹杂在这篇文章中、随处可见的每一个超链接，都是我们在 开发这个组件库的过程中 寻找到的宝石 💎，希望它们（一定）可以帮助到你。<br>
<br>

如果你不介意的话，还请给 `violet-design` 一个 star⭐，这对我们帮助很大，[violet-design -- github](https://github.com/zhaoyuuu/violet-design)。
