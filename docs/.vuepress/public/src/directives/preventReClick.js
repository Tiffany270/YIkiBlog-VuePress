/** 自定义指令防快速重复点击 */
import Vue from 'vue'

Vue.directive('preventReClick', {
  inserted(el) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, 2000)
      }
    })
  }
})
