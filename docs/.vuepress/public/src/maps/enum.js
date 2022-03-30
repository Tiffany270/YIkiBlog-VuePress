// 查询表单类型
export const FormItemTypes = {
  Input: 'input',
  Select: 'select',
  Cascader: 'cascader',
  Number: 'number',
  Num2Num: 'num2num',
  Month: 'month',
  Date: 'date'
}

// 发放状态
export const payStatusEnum = {
  INIT: '导入',
  PAY_HANDLE: '待付款',
  PAY_CHECKING: '待审核',
  PAY_CHECKING_FAIL: '驳回',
  PAID: '正在代发',
  REHANDLE_PAID: '正在重发',
  REHANDLE_PREPARE: '重发待审核',
  REHANDLE_CHECKING_FAIL: '重发驳回',
  REHANDLE_CHECKING_SUCCESS: '重发待付款',
  PAY_FAIL: '部分完成',
  PAY_SUCCESS: '已完成'
}
// 数据来源
export const dataSourcesEnum = {
  MANAGER: '管理端',
  WEB: 'B端',
  API: 'API',
  SZONE: '闪众',
  WECHAT: 'C端',
  H5: 'H5',
  THIRD: '第三方',
  HANDUP: '挂起订单发放',
  EXPIRE: '超时订单发放'
}
// 发放流程 枚举   终态
export const FLOW_STATE_ENUM = {
  待付款: 'PAY_PENDING',
  已完成: 'PAY_SUCCESS',
  部分完成: 'PAY_FAIL',
  失效: 'INVALID',
  作废: 'USELESS'
}
// 发放流程状态 - 过程态
export const FLOW_STATUS_ENUM = {
  导入: 'INIT',
  待付款: 'PAY_HANDLE',
  正在代发: 'PAID',
  已完成: 'PAY_SUCCESS',
  部分完成: 'PAY_FAIL',
  待审核: 'PAY_CHECKING',
  驳回: 'PAY_CHECKING_FAIL'
}
// 批次发放订单支付超时状态
export const PAY_EXPIRE_STATUS = {
  正常: 'NORMAL',
  已超时: 'TIMEOUT',
  已跨月: 'ACROSS_MONTH'
}
// 项目状态枚举
export const PROJECT_STATUS = {
  启用: 'NORMAL',
  停用: 'BLOCKED'
}
// 签约状态
export const SIGN_STATUS = {
  待签约: 'NOT_SIGN',
  已签约: 'SIGNED',
  已作废: 'INVALID',
  已注销: 'CANCELLATION'
}
// 签约数据提交状态
export const SIGN_SUBMIT_STATUS = {
  未提交: 'NOT_SUBMIT',
  提交中: 'SUBMITTING',
  已提交: 'SUBMITTED'
}
// 任务状态
export const TASK_STATUS = {
  待审核: 'PENDING',
  已上线: 'PASS',
  已下线: 'EXPIRE',
  已撤回: 'WITHDRAW',
  驳回: 'NO_PASS'
}
// 权限角色
export const AUTH_ROLES = {
  管理员: 'ADMIN',
  制单: 'PREPARE',
  审核: 'AUDIT',
  发放: 'EXECUTE'
}

// 公告状态
export const AnnouncementStatus = {
  待发布: 'WAIT_PUBLISH',
  待生效: 'WAIT_ENABLE',
  已发布: 'ENABLE',
  失效: 'DISABLE'
}

// 消息类型
export const newsTypes = {
  待办: 'BACKLOG_LIST',
  通知: 'NOTICE_LIST',
  公告: 'ANNOUNCEMENT_LIST'
}
