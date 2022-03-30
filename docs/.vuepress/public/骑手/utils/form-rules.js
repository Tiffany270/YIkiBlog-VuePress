import {
  isValidEmail,
  isValidMobile,
  isValidPhone,
  isCrediCodeFalse,
  isNameFalse,
  isValidID,
  isValidID2,
  isContact,
  isBlank,
  isBankNo,
  isOpenBankNo,
  isEpName
} from './regex-validate'
/**
 * 表单校验规则
 * @param {string} fildName 表单中文字段
 * @param {string} triggerType 触发方式 blur | change
 * @returns
 */
export const formRules = (fildName = '', triggerType = 'blur') => {
  return {
    // 必填项
    required: {
      required: true,
      message:
        triggerType === 'blur' ? `请输入${fildName}` : `请选择${fildName}`,
      trigger: triggerType
    },
    // 手机号
    mobile: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (!isValidMobile(value)) {
          cb(new Error(`请输入有效的${fildName}`))
        } else {
          cb()
        }
      }
    },
    // 邮箱
    email: {
      trigger: 'change',
      validator(rule, value, cb) {
        if (value) {
          if (isValidEmail(value)) {
            cb(new Error('请输入有效的邮箱账号'))
          } else {
            cb()
          }
        } else {
          cb()
        }
      }
    },
    // 电话(手机&座机)
    phone: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (isValidPhone(value)) {
          cb(new Error(`${fildName}不合法`))
        } else {
          cb()
        }
      }
    },
    // 最大值和最小值
    stringMinMax(min, max) {
      return {
        trigger: 'blur',
        validator(rule, value, cb) {
          const str = value.toString()
          if (str.length < min) {
            cb(new Error(`字符数必须大于${min}个字符`))
          } else if (str.length > max) {
            cb(new Error(`字符数必须少于${max}个字符`))
          } else {
            cb()
          }
        }
      }
    },
    // 统一信用代码
    creditCode: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (!isCrediCodeFalse(value)) {
          cb(new Error(`请输入有效的${fildName}`))
        } else {
          cb()
        }
      }
    },
    epName: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (!isEpName(value)) {
          cb(new Error(`请输入有效的${fildName}`))
        } else {
          cb()
        }
      }
    },
    //xx代表人/法人/联系人
    representName: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (!isNameFalse(value)) {
          cb(new Error(`请输入有效的${fildName}`))
        } else {
          cb()
        }
      }
    },
    //身份证
    cardId: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (!isValidID(value) && value !== '') {
          cb(new Error(`请输入有效的${fildName}`))
        } else {
          cb()
        }
      }
    },
    cardId2: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (!isValidID2(value)) {
          cb(new Error(`请输入有效的${fildName}`))
        } else {
          cb()
        }
      }
    },
    // 联系手机号（不含座机）
    contact: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (value && !isContact(value)) {
          cb(new Error(`${fildName}格式错误`))
        } else {
          cb()
        }
      }
    },
    //验证空格
    blank: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (isBlank(value)) {
          cb(new Error(`${fildName}不能全为空格`))
        } else {
          cb()
        }
      }
    },
    bankNum: {
      trigger: triggerType,
      validator(rule, value, cb) {
        const reg = /^([0-9]{1,20})?$/g
        if (value !== '' && reg.test(value)) {
          cb()
        } else {
          cb(new Error(`${fildName}不合格`))
        }
      }
    },
    //银行账号格式
    bankNo: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (value !== '' && !isBankNo(value)) {
          cb(new Error(`请输入有效的${fildName}`))
        } else {
          cb()
        }
      }
    },
    openBankNo: {
      trigger: triggerType,
      validator(rule, value, cb) {
        if (isOpenBankNo(value)) {
          cb(new Error(`请输入有效的${fildName}`))
        } else {
          cb()
        }
      }
    }
  }
}
