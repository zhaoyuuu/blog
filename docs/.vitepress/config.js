export default {
  title: "zhaoyuuu's blog",
  description: '个人博客，记录前端一些 有深度/有价值/有意思 的东西',
  lastUpdated: true,
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/blog/favicon.ico' }],
  ],
  themeConfig: {
    siteTitle: 'zhaoyuuu',
    logo: 'https://raw.githubusercontent.com/zhaoyuuu/blog/206b969f0a010b2de78851fcecf01a00a96b1626/docs/assets/logo.svg',
    editLink: {
      pattern: 'https://github.com/zhaoyuuu/blog/tree/master/docs/:path',
      text: 'Edit this page on GitHub',
    },
    algolia: {
      appId: 'C0OGQMFGT6',
      apiKey: '0f74937ff77db348efcb49e778156698',
      indexName: 'zhaoyuuuio',
    },
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'About Me', link: '/about_me' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/zhaoyuuu/blog' }],
    sidebar: [
      {
        text: 'gemstone 红宝书',
        items: [
          { text: 'introduction', link: '/gemstone/intro' },
          {
            text: 'Chapter 4 变量、作用域与内存',
            collapsed: true,
            items: [
              {
                text: '参数的传递',
                link: '/gemstone/Chapter 4 变量、作用域与内存/传递参数',
              },
              {
                text: '执行上下文与作用域链',
                link: '/gemstone/Chapter 4 变量、作用域与内存/执行上下文与作用域链',
              },
              {
                text: '垃圾回收',
                link: '/gemstone/Chapter 4 变量、作用域与内存/垃圾回收',
              },
            ],
          },
          {
            text: 'Chapter 6 集合引用类型',
            collapsed: true,
            items: [
              {
                text: 'Object',
                link: '/gemstone/Chapter 6 集合引用类型/Object',
              },
              {
                text: 'Array',
                link: '/gemstone/Chapter 6 集合引用类型/Array',
              },
              {
                text: 'Map',
                link: '/gemstone/Chapter 6 集合引用类型/Map',
              },
              {
                text: 'WeakMap',
                link: '/gemstone/Chapter 6 集合引用类型/WeakMap',
              },
              {
                text: 'Set',
                link: '/gemstone/Chapter 6 集合引用类型/Set',
              },
              {
                text: 'WeakSet',
                link: '/gemstone/Chapter 6 集合引用类型/WeakSet',
              },
            ],
          },
          {
            text: 'Chapter 8 对象、类与面向对象编程',
            collapsed: true,
            items: [
              {
                text: '理解对象',
                link: '/gemstone/Chapter 8 对象、类与面向对象编程/understand_object',
              },
              {
                text: '创建对象',
                link: '/gemstone/Chapter 8 对象、类与面向对象编程/create_object',
              },
              {
                text: 'inherit 继承',
                link: '/gemstone/Chapter 8 对象、类与面向对象编程/inherit',
              },

              {
                text: 'class 类',
                link: '/gemstone/Chapter 8 对象、类与面向对象编程/class',
              },
            ],
          },
          {
            text: 'Chapter 9 代理与反射',
            collapsed: true,
            items: [
              {
                text: '代理基础',
                link: '/gemstone/Chapter 9 代理与反射/代理基础',
              },
            ],
          },
          {
            text: 'Chapter 10 函数',
            collapsed: true,
            items: [
              {
                text: 'function',
                link: '/gemstone/Chapter 10 函数/function',
              },
            ],
          },
          {
            text: 'Chapter 11 期约与异步函数',
            collapsed: true,
            items: [
              {
                text: 'promise',
                link: '/gemstone/Chapter 11 期约与异步函数/promise',
              },
              {
                text: 'async & await',
                link: '/gemstone/Chapter 11 期约与异步函数/async&await',
              },
            ],
          },
          {
            text: 'Chapter 12 BOM',
            collapsed: true,
            items: [
              {
                text: 'window',
                link: '/gemstone/Chapter 12 BOM/window',
              },
              {
                text: 'location',
                link: '/gemstone/Chapter 12 BOM/location',
              },
              {
                text: 'navigator',
                link: '/gemstone/Chapter 12 BOM/navigator',
              },
              {
                text: 'screen',
                link: '/gemstone/Chapter 12 BOM/screen',
              },
              {
                text: 'history',
                link: '/gemstone/Chapter 12 BOM/history',
              },
            ],
          },
          {
            text: 'Chapter 23 JSON',
            // collapsed: true,
            items: [
              {
                text: 'JSON',
                link: '/gemstone/Chapter 23 JSON/json',
              },
            ],
          },
        ],
      },
      {
        text: 'handwritten 手写',
        collapsed: true,
        items: [
          { text: '0 introduction', link: '/handwritten/intro' },
          { text: '1 debounce', link: '/handwritten/debounce' },
          { text: '2 throttle', link: '/handwritten/throttle' },
          { text: '3 instanceof', link: '/handwritten/instanceof' },
          { text: '4 new', link: '/handwritten/new' },
          { text: '5 Funtion.prototype.call', link: '/handwritten/call' },
          { text: '6 Function.prototype.apply', link: '/handwritten/apply' },
          { text: '7 Function.prototype.bind', link: '/handwritten/bind' },
          { text: '8 deepclone', link: '/handwritten/deepClone' },
          {
            text: '9 setInterval & setTimeout',
            link: '/handwritten/setInterval(setTimeout)',
          },
          {
            text: '10 Array-collection',
            link: '/handwritten/array_collection',
          },
          {
            text: '11 Promise-collection',
            link: '/handwritten/promise_collection',
          },
          { text: '12 AJAX', link: '/handwritten/ajax' },
          { text: '13 Sort-collection', link: '/handwritten/sort' },
          { text: '14 Object-collection', link: '/handwritten/Object' },
          { text: '15 JSONP', link: '/handwritten/JSONP' },
          { text: '16 Infinite-sum', link: '/handwritten/infinite_sum' },
        ],
      },
      {
        text: 'essays 随笔',
        collapsed: true,
        items: [
          { text: 'introduction', link: '/essays/intro' },
          {
            text: 'youth_traning_camp 青训营',
            items: [
              {
                text: 'violet-design',
                link: '/essays/youth_camp/violet-design',
              },
              { text: 'webpack', link: '/essays/youth_camp/webpack' },
            ],
          },
        ],
      },
    ],
  },
}
