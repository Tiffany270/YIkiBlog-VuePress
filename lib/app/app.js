import Vue from 'vue'
import Router from 'vue-router'
import dataMixin from './dataMixin'
import store from './store'
import { routes } from '@temp/routes'
import { siteData } from '@temp/siteData'
import enhanceApp from '@temp/enhanceApp'
import themeEnhanceApp from '@temp/themeEnhanceApp'
import axios from 'axios'

// generated from user config
import('@temp/style.styl')

// built-in components
import Content from './components/Content'
import OutboundLink from './components/OutboundLink.vue'
import ClientOnly from './components/ClientOnly'
import Projectwrapper from './components/Projectwrapper'
import Loginformexam from './components/Loginformexam'
import Flexbox from './components/Flexbox'

// suggest dev server restart on base change
if (module.hot) {
  const prevBase = siteData.base
  module.hot.accept('./.temp/siteData', () => {
    if (siteData.base !== prevBase) {
      window.alert(
        `[vuepress] Site base has changed. ` +
        `Please restart dev server to ensure correct asset paths.`
      )
    }
  })
}
Vue.prototype.$servePath = 'http://localhost:2727/'
Vue.config.productionTip = false
Vue.use(Router)
Vue.prototype.$http = axios
// mixin for exposing $site and $page
Vue.mixin(dataMixin(siteData))
// component for rendering markdown content and setting title etc.
Vue.component('Content', Content)
Vue.component('OutboundLink', OutboundLink)
Vue.component('Badge', () => import('./components/Badge.vue'))
// component for client-only content
Vue.component('ClientOnly', ClientOnly)

Vue.component('Projectwrapper', Projectwrapper)
Vue.component('Loginformexam', Loginformexam)
Vue.component('Flexbox', Flexbox)

// global helper for adding base path to absolute urls
Vue.prototype.$withBase = function (path) {
  const base = this.$site.base
  if (path.charAt(0) === '/') {
    return base + path.slice(1)
  } else {
    return path
  }
}
const newRouters = [
  {
    path: '/PJwrapper',
    component: Projectwrapper,
    children: [
      {
        path: 'Loginform',
        component: Loginformexam
      },
      {
        path: 'FlexBox',
        component: Flexbox
      }
    ]
  }
  // { path: '/407', component: NotFound }
]

export function createApp () {
  const router = new Router({
    base: siteData.base,
    mode: 'history',
    fallback: false,
    routes: routes.concat(newRouters), // 自己添加自己的路由
    scrollBehavior: (to, from, saved) => {
      if (saved) {
        return saved
      } else if (to.hash) {
        if (store.disableScrollBehavior) {
          return false
        }
        return {
          selector: to.hash
        }
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  // redirect /foo to /foo/
  router.beforeEach((to, from, next) => {
    if (!/(\/|\.html)$/.test(to.path)) {
      next(Object.assign({}, to, {
        path: to.path + '/'
      }))
    } else {
      next()
    }
  })

  const options = {}

  themeEnhanceApp({ Vue, options, router, siteData })
  enhanceApp({ Vue, options, router, siteData })

  const app = new Vue(
    Object.assign(options, {
      router,
      render (h) {
        return h('div', { attrs: { id: 'app' }}, [
          h('router-view', { ref: 'layout' })
        ])
      }
    })
  )

  return { app, router }
}