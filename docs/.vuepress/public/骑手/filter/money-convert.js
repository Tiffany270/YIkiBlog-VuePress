import Vue from 'vue'
import { moneyConvert } from '@/utils/util'
Vue.filter('moneyConvert', (value, flag) => {
  if (!flag) {
    return value
  }
  return moneyConvert(value)
})
