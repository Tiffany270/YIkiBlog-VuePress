// 直接用在element form上的校验方法，分动态和静态、特殊
import { isValidValue } from '@/utils/util'
/** 静态校验
 */
export const staticRules = (fildName = '', triggerType = 'blur') => {
  return {
    // 必填项
    required: {
      required: true,
      message: triggerType === 'blur' ? `请输入${fildName}` : `请选择${fildName}`,
      trigger: triggerType
    },
    // 合法字段名
    validName: {
      trigger: triggerType,
      validator(rule, value, cb) {
        const flag = /^[——A-Za-z0-9-\(\)\u4e00-\u9fa5\_()（）-]{0,}$/
        if (flag.test(value)) {
          cb()
        } else {
          cb(new Error(`${fildName}不能包含特殊符号`))
        }
      }
    },
    // 手机号
    mobile: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (isValidValue(value)) {
          if (!/^1\d{10}$/.test(value)) {
            cb(new Error(`请输入正确的${fildName}`))
          } else {
            cb()
          }
        } else {
          cb()
        }
      }
    },
    // 联系电话-手机&座机
    contactNumber: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (isValidValue(value)) {
          if (!/^(1[0-9]{10}$)$|(^(0\d{10})|^(0\d{2}-\d{8}))$/.test(value)) {
            cb(new Error(`${fildName}不合法`))
          } else {
            cb()
          }
        } else {
          cb()
        }
      }
    },
    // 数字
    number: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (Number.isNaN(+value)) {
          cb(new Error(`${fildName}必须为数字`))
        } else {
          cb()
        }
      }
    },
    limitNum(min, max, isInt) {
      return {
        trigger: triggerType,
        validator(rule, value, cb) {
          if (Number.isNaN(+value)) {
            cb(new Error(`${fildName}必须为数字`))
          } else if (isInt && value % 1 !== 0) {
            cb(new Error(`${fildName}必须为整数`))
          } else {
            if (value < min) {
              cb(new Error(`${fildName}不能小于${min}`))
            } else if (value > max) {
              cb(new Error(`${fildName}不能超过${max}`))
            } else {
              cb()
            }
          }
        }
      }
    },
    limitNFloat(n = 2, min, max) {
      return {
        trigger: triggerType,
        validator(rule, value, cb) {
          if (Number.isNaN(+value)) {
            cb(new Error(`${fildName}必须为数字`))
          } else {
            if (value <= min) {
              cb(new Error(`必须大于${min}`))
            }
            if (value > max) {
              cb(new Error(`不能超过${max}`))
            }
            if (value.indexOf('.') > -1) {
              const float = value.split('.')[1]
              if (float.length > n) {
                cb(new Error(`最多输入${n}小数`))
              }
            }
            cb()
          }
        }
      }
    },
    // 银行卡
    bankNum: {
      trigger: triggerType,
      validator(rule, value, cb) {
        const reg = /^([0-9]{1,22})?$/g
        if (reg.test(value)) {
          cb()
        } else {
          cb(new Error('银行账号必须为不超过22位的数字'))
        }
      }
    },
    /**
     * @param min 最小字符数
     * @param max 最大字符数
     */
    stringMinMax(min, max) {
      return {
        trigger: triggerType,
        validator(rule, value, cb) {
          if (isValidValue(value)) {
            const str = value.toString()
            if (str.length < min) {
              cb(new Error(`${fildName}必须大于${min}个字符`))
            } else if (str.length > max) {
              cb(new Error(`${fildName}必须少于${max}个字符`))
            } else {
              cb()
            }
          } else {
            cb()
          }
        }
      }
    },
    // 金额不为0
    moneyNotZero: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (Number(value) === 0) {
          cb(new Error(`${fildName}不能为0`))
        } else {
          cb()
        }
      }
    },
    // 字母和数字组合及位数
    combineEnAndNumMinMax(min, max) {
      return {
        trigger: triggerType,
        validator(rule, value, cb) {
          const reg = /^[A-Za-z0-9]{1,20}?$/g
          if (reg.test(value)) {
            const str = value.toString()
            if (str.length < min) {
              cb(new Error(`${fildName}必须大于${min}位`))
            } else if (str.length > max) {
              cb(new Error(`${fildName}必须少于${max}位`))
            } else {
              cb()
            }
          } else {
            cb(new Error(`${fildName}必须为数字和字母组合`))
          }
        }
      }
    },
    iptPwd: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (/([0-9a-zA-Z])\1{3}/.test(value) || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(value)) {
          cb(new Error('密码不符合要求，请重新设置'))
        } else {
          cb()
        }
      }
    },
    smsCode: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (/^[A-Za-z0-9]{6}$/.test(value)) {
          cb()
        } else {
          cb(new Error('验证码由6位字符组成'))
        }
      }
    }
  }
}
