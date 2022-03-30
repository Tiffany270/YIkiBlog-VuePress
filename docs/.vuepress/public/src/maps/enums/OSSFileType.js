// Oss文件类型
export const OSSFileTypeEnum = {
  SALARY_TAX: 'SALARY_TAX', // 老版本路径

  VOUCHER: 'VOUCHER', // 电子回单
  INSURANCE: 'INSURANCE', // 社会保险费申报个人明细

  // 工作室相关
  STUDIO_LICENSE: 'STUDIO_LICENSE', // 营业执照
  STUDIO_IMAGE: 'STUDIO_IMAGE', // 人脸识别照片
  STUDIO_VIDEO: 'STUDIO_VIDEO', // 人脸识别视频
  STUDIO_CANCEL_ATTACHMENT: 'STUDIO_CANCEL_ATTACHMENT', // 注销附件

  // 合同相关
  CONTRACT: 'CONTRACT', // 电子合同
  CONTRACT_IMG: 'CONTRACT_IMG', // 合同图片
  SEAL_IMG: 'SEAL_IMG', // 印章图片
  SIGN_VOUCHER: 'SIGN_VOUCHER', // OSS合同签署凭证存放路径

  // 服务商相关
  TENANT_AUDIT_INFO: 'TENANT_AUDIT_INFO', // 服务商准入信息
  TENANT_IMG: 'TENANT_IMG', // 服务商相关的普通图片

  BILL: 'BILL', // 账单
  INVOICE: 'INVOICE', // 发票
  STATEMENT: 'STATEMENT', // 结算函
  RECONCILE_SUBPACKAGE: 'RECONCILE_SUBPACKAGE', // 调拨资金对账
  TAX_DECLARATION: 'TAX_DECLARATION', // 税费申报PDF
  RECONCILIATION: 'RECONCILIATION', // 对账文件
  PAYMENT_DATA: 'PAYMENT_DATA', // 代发数据
  BILL_PAY: 'BILL_PAY', // 付款单
  GLOBAL_EXPORT: 'GLOBAL_EXPORT', // 列表导出（切面）
  IDENTITY_CARD: 'IDENTITY_CARD', // 身份证
  ANNOUNCEMENT: 'ANNOUNCEMENT', // 公告附件

  // 财务相关
  FINANCE_RECHARGE: 'FINANCE_RECHARGE', // 充值附件
  FINANCE_WITHDRAW: 'FINANCE_WITHDRAW', // 提现附件

  CLIENT_INFO: 'CLIENT_INFO', // 客户信息
  MENU: 'MENU', // 菜单图标
  SZ_ASSIGNMENT: 'SZ_ASSIGNMENT', // 闪众任务图片

  // 生成永久的url.慎用
  STATIC: 'STATIC', // 静态文件

  // 服务商相关的普通图片 静态文件
  TENANT_IMG_STATIC: 'TENANT_IMG_STATIC' // 服务商相关的普通图片 静态文件
}

/**
 * 是否为OSSFileTypeEnum的值
 * @param {any} val
 * @return {void}
 */
export function isOSSFileTypeEnumOrFail(val) {
  if (!Object.values(OSSFileTypeEnum).includes(val)) {
    throw new TypeError(`OSSFileTypeEnum中不存在此枚举值: ${val}, 请检查自身代码，或询问后端进行补充`)
  }
}
