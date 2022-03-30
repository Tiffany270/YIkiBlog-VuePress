export const numberConverter = {
  taxConvert(val) {
    return parseFloat(val).toFixed(1) + '%'
  },
  moneyConvert(val) {
    if (Number.isNaN(parseFloat(val))) {
      return '0.00'
    } else {
      const num = parseFloat(val).toFixed(2)
      const re = /(\d{1,3})(?=(\d{3})+(?:\.))/g
      return num.replace(re, '$1,')
    }
  },
  strokeCountConvert(val) {
    if (Number.isNaN(+val)) {
      return 0
    } else {
      let num = (+val).toString()
      num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return num
    }
  },
  /**
   * 给正数前面加个+
   * @param val
   * @param original
   * @return {*}
   */
  plusPrefixConvert(val, original) {
    if (!Number.isNaN(original)) {
      return (original > 0 ? '+' : '') + val
    } else if (!Number.isNaN(val)) {
      return (val > 0 ? '+' : '') + val
    } else {
      return val
    }
  }
}

// 此处所列的字段需要转换金额
const moneyFieldList = ['expspay', 'serviceCharge', 'totalAmount', 'totalTax', 'poundage', 'receivable']
// 此处所列字段不需要累计
const noAddingFieldList = ['number', 'projectName']

// 税率的百分比转换

export default {
  filters: {
    taxConvert(tax) {
      return numberConverter.taxConvert(tax)
    },
    moneyConvert(money) {
      return numberConverter.moneyConvert(money)
    },
    strokeCountConvert(val) {
      return numberConverter.strokeCountConvert(val)
    },
    plusPrefixConvert(val, original) {
      return numberConverter.plusPrefixConvert(val, original)
    }
  },
  methods: {
    summaryWithMoneyConvert({ columns, data }) {
      const sums = []
      const needHandle = []
      columns.forEach((column, idx) => {
        if (moneyFieldList.indexOf(column.property) !== -1) {
          needHandle.push(idx)
        }
        if (idx === 0) {
          sums[idx] = '合计'
          return
        }
        if (!noAddingFieldList.includes(column.property)) {
          if (data) {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[idx] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              })
            }
          }
        }
      })
      for (let i = 0; i <= sums.length - 1; i++) {
        if (typeof sums[i] === 'number' && !isNaN(sums[i])) {
          if (needHandle.indexOf(i) !== -1) {
            sums[i] = numberConverter.moneyConvert(sums[i])
          }
        }
      }
      return sums
    }
  }
}
