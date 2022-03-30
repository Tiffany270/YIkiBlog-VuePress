import Vue from 'vue'
import { getDate } from '@/utils/util'
Vue.filter('formatDate', (value, flag) => {
  if (!value || !flag) {
    return value
  }
  return getDate(value, 'yyyymmddhhmmss', '-')
})
