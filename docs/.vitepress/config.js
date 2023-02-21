export default {
  title: 'VitePress',
  description: 'Just playing around.',
  themeConfig: {
    siteTitle: 'My Custom Title',
    logo: '/logo.svg', // 无效
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Configs', link: '/configs' },
      { text: 'Changelog', link: 'https://github.com/...' },
    ],
    sidebar: [
      {
        text: 'Config',
        items: [
          { text: 'index', link: '/config/' },
          { text: 'two', link: '/config/two' },
        ],
      },
      {
        text: 'Section Title B',
        items: [
          { text: 'Item C', link: '/item-c' },
          { text: 'Item D', link: '/item-d' },
        ],
      },
    ],
  },
}
