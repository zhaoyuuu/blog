export default {
  title: "zhaoyuuu's blog",
  lastUpdated: true,
  description: 'Just playing around.',
  themeConfig: {
    siteTitle: 'zhaoyuuu',
    logo: '/assets/logo.svg',
    editLink: {
      pattern: 'https://github.com/zhaoyuuu/blog/tree/master/docs/:path',
      text: 'Edit this page on GitHub',
    },
    nav: [{ text: 'Guide', link: '/guide/' }],
    sidebar: [
      {
        text: 'gemstone 红宝书',
        items: [
          { text: '0 introduction', link: '/gemstone/intro' },
          {
            text: 'Chapter 4 变量、作用域与内存',
            items: [
              {
                text: '参数的传递',
                link: '/gemstone/Chapter 4 变量、作用域与内存/传递参数',
              },
            ],
          },
        ],
      },
      {
        text: 'handwritten 手写',
        // collapsed: true,
        items: [
          { text: '0 introduction', link: '/handwritten/intro' },
          { text: '1 实现防抖函数（debounce）', link: '/handwritten/debounce' },
          { text: '2 实现节流函数（throttle）', link: '/handwritten/throttle' },
          { text: '3 实现instanceof', link: '/handwritten/instanceof' },
          { text: '4 实现new的过程', link: '/handwritten/new' },
          { text: '5 实现call方法', link: '/handwritten/call' },
          { text: '6 实现apply方法', link: '/handwritten/apply' },
          { text: '7 实现bind方法', link: '/handwritten/bind' },
          { text: '8 实现深拷贝', link: '/handwritten/deepClone' },
          {
            text: '9 实现setInterval和setTimeout',
            link: '/handwritten/setInterval(setTimeout)',
          },
          { text: '10 数组合集', link: '/handwritten/array_collection' },
          { text: '11 Promise合集', link: '/handwritten/promise_collection' },
          { text: '12 实现AJAX', link: '/handwritten/ajax' },
          { text: '13 手写常见排序', link: '/handwritten/sort' },
          { text: '14 Object合集', link: '/handwritten/Object' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/zhaoyuuu/blog' }],
  },
}
