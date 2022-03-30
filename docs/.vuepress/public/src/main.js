import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import '@/directives/preventReClick'
import '@/axb-ement-ui'
import animated from 'animate.css'
import '@/filters'
// 省略部分代码
Vue.use(animated)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
