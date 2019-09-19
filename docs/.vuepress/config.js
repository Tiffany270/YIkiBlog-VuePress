module.exports = {
  dest: 'vuepress',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Yiki - Be a cool coder',
      description: 'Yiki - Be a cool coder'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  theme: 'vue',
  themeConfig: {
    repo: 'Tiffany270/YIkiBlog-VuePress',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        nav: [
          {

            text: 'Blog',
            items: [
              {
                text: 'Algorithms',
                items: [{
                  text: 'Algorithm',
                  link: '/Algorithms/'
                },
                {
                  text: 'LeetCode',
                  link: '/guide/'
                }
                ]
              },
              {
                text: '前端',
                items: [{ text: '1', link: '/guide/' }, { text: '2', link: '/guide/' }]
              },
            ]
          },
          {
            text: 'Project Demo',
            link: 'http://localhost:8080/PJwrapper/flexBox'
          },
          {
            text: 'Resume',
            link: '/default-theme-config/'
          },
          {
            text: 'Friends',
            link: '/x'
          }
        ],
        sidebar: {
          '/Algorithms/': titleAlgorithms('Algorithms'),
          '/guide/': genSidebarConfig('Guide'),
        }
      }
    }
  }
}

function titleAlgorithms(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'selectSort',
        'basic-config',
        'assets',
        'getting-started',
        'markdown',
        'using-vue',
        'custom-themes',
        'i18n',
        'deploy'
      ]
    }
  ]
}
function genSidebarConfig(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'custom-themes',
        'i18n',
        'getting-started',
        'deploy'
      ]
    }
  ]
}

