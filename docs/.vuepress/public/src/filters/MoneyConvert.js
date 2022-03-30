import Vue from 'vue'
import { toThousands } from '@/utils/util'

Vue.filter('moneyConvert', value => {
  return toThousands(value)
})

Vue.filter('formatMoney', value => {
  if (Number.isNaN(parseFloat(value))) {
    return '0.00'
  } else {
    const num = parseFloat(value).toFixed(2)
    const re = /(\d{1,3})(?=(\d{3})+(?:\.))/g
    return num.replace(re, '$1,')
  }
})
