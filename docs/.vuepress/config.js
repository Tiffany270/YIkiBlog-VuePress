module.exports = {
  base: '/vuepress/',
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
                  link: '/Leetcode/'
                }
                ]
              },
              {
                text: 'front-end',
                items: [
                  { text: 'vue', link: '/Vue/' },
                  { text: 'react', link: '/React/' },
                  { text: 'angular2', link: '/angular2/' },
                  { text: 'JavaScript', link: '/JavaScript/' },
                  { text: 'webpack', link: '/Webpack/' }
                ]
              },
              {
                text: 'rear-end',
                items: [
                  { text: 'SpringBoot', link: '/SpringBoot/' },
                  { text: 'Mysql', link: '/Mysql/' },
                ]
              },
              {
                text: 'Linux',
                items: [
                  { text: 'Redis', link: '/Redis/' },
                  { text: 'Nginx', link: '/Nginx/' },
                ]

              },
            ]
          },
          {
            text: 'Diary',
            link: '/Diary/'
          },
          {
            text: 'Project Demo',
            link: '/PJwrapper/GuiderLink/'
          },
          {
            text: 'Friends',
            link: '/x'
          }
        ],
        sidebar: {
          '/Algorithms/': [
            {
              collapsable: false,
              children: [
                '',
                'JZoffer'
              ]
            }
          ], '/Leetcode/': [
            {
              collapsable: false,
              children: [
                '',
              ]
            }
          ],
          '/Redis/': [
            {
              collapsable: false,
              children: [
                '',
                '01DataType',
                '02Persistence',
                '03Transaction',
                '04PublishSubscribe',
                '05MasterSlave',
                '06Springboot-redis',
                '07Spring-Redis-Cache'

              ]
            }
          ],
          '/Nginx/': [
            {
              collapsable: false,
              children: [
                '',
                '01Orders',
              ]
            }
          ],
          '/Diary/': [
            {
              collapsable: false,
              children: [
                '',
                '2019-10',
                '2019-11',
                '2020-06',
              ]
            }
          ],
          '/React/': [
            {
              collapsable: false,
              children: [
                '',
                'redux'
              ]
            }
          ],
          '/SpringBoot/': [
            {
              collapsable: false,
              children: [
                '',
                '01SpringSecurity',
                '02JWT'
              ]
            }
          ],
          '/Mysql/': [
            {
              collapsable: false,
              children: [
                '',
                '01',
                '02',
                '03',
                '04',
                '05'
              ]
            }
          ],
          '/JavaScript/': [
            {
              collapsable: false,
              children: [
                '',
                'TheDefinitiveGuide',
                'ProfessionalForJS',
                'Interview'
              ]
            }
          ],
          '/Webpack/': [
            {
              collapsable: false,
              children: [
                '',
                '01',
              ]
            }
          ],
          '/Vue/': [
            {
              collapsable: false,
              children: [
                '',
                '01',
              ]
            }
          ],

        }
      }
    }
  }
}


