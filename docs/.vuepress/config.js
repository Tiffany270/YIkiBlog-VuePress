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
            text: 'Front-End-Framework',
            items: [
              { text: 'vue2.0', link: '/Vue/' },
              { text: 'vue3.0', link: '/Vue3/' },
              { text: 'vue-extra-library', link: '/Vue-extra-library/' },
              { text: 'react', link: '/React/' },
              { text: 'Webpack', link: '/Webpack/' },
              { text: 'Angular', link: '/Angular/' },
              { text: '小程序', link: '/mini-program/' },
            ]
          },
          {
            text: 'Front-End-lang',
            items: [
              { text: 'TypeScript', link: '/TypeScript/' },
              { text: 'ECMAScript', link: '/ECMAScript/' },
              { text: 'JavaScript', link: '/JavaScript/' },
              { text: 'Nodejs', link: '/Node/' },
              { text: 'Rxjs', link: '/Rxjs/' },
            ]
          },
          {
            text: 'Rear-End',
            items: [
              { text: 'RegExp', link: '/RegExp/' },
              { text: 'SpringBoot', link: '/SpringBoot/' },
              { text: 'Redis', link: '/Redis/' },
              { text: 'Mysql', link: '/Mysql/' },
              { text: 'Nginx', link: '/Nginx/' },
              { text: 'Git', link: '/Git/' },
            ]
          },
          {
            text: 'CS',
            items: [
              {
                text: 'Algorithm',
                link: '/Algorithms/'
              },
              {
                text: 'LeetCode',
                link: '/Leetcode/'
              },
              { text: 'CSAPP', link: '/csapp/' },
            ]
          },
          { text: 'Q&A', link: '/Interviews/' },
          { text: 'BLOG', link: '/Diary/' },
          { text: 'Project Demo', link: '/PJwrapper/GuiderLink/' },
        ],
        sidebar: {
          '/Algorithms/': [
            {
              collapsable: false,
              children: [
                '',
                'JZoffer',
              ]
            }
          ],
          '/Leetcode/': [
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
                '07Spring-Redis-Cache',
                '08Springboot-Jedis'

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
          '/Git/': [
            {
              collapsable: false,
              children: [
                '',
                '01',
                '02',
                '03'
              ]
            }
          ],
          '/Node/': [
            {
              collapsable: false,
              children: [
                '',
                '01'
              ]
            }
          ],
          '/Diary/': [
            {
              collapsable: false,
              children: [
                '',
                '2022-06',
                '2020-08',
                '2020-06',
                '2019-11',
                '2019-10',
              ]
            }
          ],
          '/Language/': [
            {
              collapsable: false,
              children: [
                '',
                'English',
              ]
            }
          ],
          '/Interviews/': [
            {
              collapsable: false,
              children: [
                '',
                'js',
                'es6',
                'eventloop',
                'http',
                'CORS',
                'css',
                'html',
                'luan',
                'broswer',
                'file',
                'module',
                'testment',
                'vue',
                'webpack',
                'hide'
              ]
            }
          ],
          '/React/': [
            {
              collapsable: false,
              children: [
                '',
                'redux',
                'yiki',
                'diff'
              ]
            }
          ],
          '/mini-program/': [
            {
              collapsable: false,
              children: [
                '',
                'base',
                'advance',
                'yiki'
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
              ]
            }
          ],
          '/ECMAScript/': [
            {
              collapsable: false,
              children: [
                '',
                '01',
                '02',
                '03',
                '04',
                '06',
                '05'
              ]
            }
          ],
          '/Webpack/': [
            {
              collapsable: false,
              children: [
                '',
                '01',
                '02',
                'ad_00',
                'ad_01',
                'ad_02',
                'ad_03',
                '03',
                '10_compiler',
                '11_compilation',
                '04_loader',
                '06_plugin',
                '07_tapable',
                '05_bundle',
                '09_tree_shaking',
              ]
            }
          ],
          '/Angular/': [
            {
              collapsable: false,
              children: [
                '',
              ]
            }
          ],
          '/Rxjs/': [
            {
              collapsable: false,
              children: [
                '',
              ]
            }
          ],
          '/Vue-extra-library/': [
            {
              collapsable: false,
              children: [
                '',
                '01',
                '02',
                '03',
                '04',
                '05',
                '06'
              ]
            }
          ],
          '/Vue/': [
            {
              collapsable: false,
              children: [
                '',
                'start',
                'new-vue',
                'merge',
                '03',
                '06',
                '06-async-update',
                'patch',
                'diff',
                '04',
                '04-compiler-ast',
                '05',
                '10',
                '11',
                '07',
                '08',
                '09',
                '12',
              ]
            }
          ],
          '/Vue3/': [
            {
              collapsable: false,
              children: [
                '',
                'learn04',
                'learn05',
                '01',
                '02',
                '02-1',
                '03',
                'diff'
              ]
            }
          ],
          '/TypeScript/': [
            {
              collapsable: false,
              children: [
                '',
                '01',
                '02',
                '03',
                '04',
                '05',
                '06'
              ]
            }
          ],
          '/csapp/': [
            {
              collapsable: false,
              children: [
                '',
                '01_InformationStorage'
              ]
            }
          ],
          '/RegExp/': [
            {
              collapsable: false,
              children: [
                '',
                '01',
                '02'
              ]
            }
          ]
        }
      }
    }
  }
}


