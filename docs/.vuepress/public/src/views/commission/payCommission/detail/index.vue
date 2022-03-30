<template>
  <page-container show-go-back :go-back-method="handleCustomGoBack">
    <div class="batch-detail">
      <!-- 付款单信息 -->
      <payment-info :batchPayInfo="paymentInfoDetail" />
      <!-- 付款单明细 -->
      <batch-pay-result :batchPayInfo="paymentInfoDetail" />
    </div>
    <template v-slot:bottomBarRight>
      <el-button type="info" plain @click="handleDownloadPayrollDetail">下载发放明细</el-button>
      <el-button type="info" plain @click="handleDownloadPayFailDetail">下载校验失败明细</el-button>
      <el-button
        type="info"
        plain
        v-if="
          paymentInfoDetail.tollFlowStateEnum &&
          paymentInfoDetail.tollFlowStateEnum.value === FLOW_STATE_ENUM['失效'] &&
          (userRoles.find(item => item === AUTH_ROLES['管理员']) || userRoles.find(item => item === AUTH_ROLES['制单']))
        "
        @click="handleRepay"
        >重发</el-button
      >
      <el-button
        type="info"
        plain
        v-if="
          paymentInfoDetail.tollFlowStateEnum &&
          paymentInfoDetail.tollFlowStateEnum.value === FLOW_STATE_ENUM['失效'] &&
          (userRoles.find(item => item === AUTH_ROLES['管理员']) || userRoles.find(item => item === AUTH_ROLES['制单']))
        "
        @click="quitRepay"
        >放弃重发</el-button
      >
      <el-button
        type="primary"
        plain
        v-if="
          paymentInfoDetail.tollFlowStateEnum &&
          paymentInfoDetail.tollFlowStateEnum.value === FLOW_STATE_ENUM['待付款'] &&
          paymentInfoDetail.tollFlowStatusEnum.value === FLOW_STATUS_ENUM['待付款'] &&
          paymentInfoDetail.tollFlowStateEnum.value !== FLOW_STATE_ENUM['失效'] &&
          (userRoles.find(item => item === AUTH_ROLES['管理员']) || userRoles.find(item => item === AUTH_ROLES['发放']))
        "
        @click="handleToPay"
        >付款</el-button
      >
      <el-button
        type="primary"
        @click="handleToApproval('PASS')"
        v-if="
          paymentInfoDetail.tollFlowStatusEnum &&
          paymentInfoDetail.tollFlowStateEnum &&
          paymentInfoDetail.tollFlowStatusEnum.value === FLOW_STATUS_ENUM['待审核'] &&
          paymentInfoDetail.tollFlowStateEnum.value === FLOW_STATE_ENUM['待付款'] &&
          paymentInfoDetail.tollFlowStateEnum.value !== FLOW_STATE_ENUM['失效'] &&
          (userRoles.find(item => item === AUTH_ROLES['管理员']) || userRoles.find(item => item === AUTH_ROLES['审核']))
        "
        >审核通过</el-button
      >
      <el-button
        type="primary"
        @click="handleToApproval('REFUSE')"
        v-if="
          paymentInfoDetail.tollFlowStatusEnum &&
          paymentInfoDetail.tollFlowStateEnum &&
          paymentInfoDetail.tollFlowStatusEnum.value === FLOW_STATUS_ENUM['待审核'] &&
          paymentInfoDetail.tollFlowStateEnum.value === FLOW_STATE_ENUM['待付款'] &&
          (userRoles.find(item => item === AUTH_ROLES['管理员']) || userRoles.find(item => item === AUTH_ROLES['审核']))
        "
        >审核不通过</el-button
      >
    </template>
    <!-- 重发数据确认 -->
    <dialog-confirm-repay ref="confirmRepayDialog" />
    <!-- 余额不足提醒 -->
    <dialog-balance-not-enough ref="balanceTipDialog" />
    <!-- // 审核不通过 -->
    <approval-refuse-form ref="refuseForm" @on-success="handleRefuseSuccess" />
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import PaymentInfo from './PaymentInfo'
import BatchPayResult from './BatchPayResult'
import { FLOW_STATE_ENUM, FLOW_STATUS_ENUM, AUTH_ROLES } from '@/maps/enum'
import { downloadBlobFile } from '@/utils/download-blob-file'
import {
  queryBatchDetail,
  cancelRepay,
  checkIsEnoughForBalance,
  downloadPayDetail,
  downloadPayFailDetail,
  // cancelPayroll,
  batchApproval
} from '@/apis/payroll'
import { mapGetters } from 'vuex'
export default {
  name: 'PayBatchDetail',
  components: {
    PaymentInfo,
    BatchPayResult,
    DialogBalanceNotEnough: () => import('../components/DialogBalanceNotEnough'),
    DialogConfirmRepay: () => import('../components/DialogConfirmRepay'),
    ApprovalRefuseForm: () => import('_c/ApprovalRefuseForm')
  },
  mixins: [BasePage],
  data() {
    return {
      batchNo: '',
      paymentInfoDetail: {},
      FLOW_STATE_ENUM: Object.freeze(FLOW_STATE_ENUM),
      FLOW_STATUS_ENUM: Object.freeze(FLOW_STATUS_ENUM),
      AUTH_ROLES: Object.freeze(AUTH_ROLES)
    }
  },
  computed: {
    ...mapGetters(['userRoles'])
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        this.batchNo = newRoute.query.batchNo
        this.batchNo && this.getPaymentInfo()
      }
    }
  },
  methods: {
    // 获取付款单信息
    async getPaymentInfo() {
      this.$loading({ text: '加载中...' })
      const { data } = await queryBatchDetail(this.batchNo)
      this.$loading().close()
      data && !data.tollFlowStatusEnum && (data.tollFlowStatusEnum = { label: '', value: '' })
      this.paymentInfoDetail = data || {}
    },
    // 重发
    async handleRepay() {
      this.$refs.confirmRepayDialog.show(this.batchNo)
    },
    // 放弃重发
    quitRepay() {
      this.$confirm('您确定放弃重发吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // eslint-disable-next-line
      }).then(async () => {
        const { code } = await cancelRepay(this.batchNo)
        if (code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$router.go(-1)
        }
      })
    },
    // 付款
    async handleToPay() {
      const {
        data: { canPay }
      } = await checkIsEnoughForBalance(this.batchNo)
      if (canPay) {
        this.$router.push({
          name: 'PassToPay',
          query: {
            batchNo: this.batchNo
          }
        })
      } else {
        this.$refs.balanceTipDialog.show(this.batchNo)
      }
    },
    // 下载发放明细
    async handleDownloadPayrollDetail() {
      const res = await downloadPayDetail(this.batchNo)
      downloadBlobFile(res)
    },
    // 下载发放失败明细
    async handleDownloadPayFailDetail() {
      const res = await downloadPayFailDetail(this.batchNo)
      downloadBlobFile(res)
    },
    // 审核
    handleToApproval(type) {
      type === 'PASS' ? this.handleApprovalPass() : this.handleApprovalRefuse()
    },
    // 通过
    handleApprovalPass() {
      this.$confirm('您确定审核通过吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // eslint-disable-next-line
      }).then(async () => {
        const res = await batchApproval({
          batchNo: this.batchNo,
          pass: true
        })
        if (res.code === 0) {
          this.$message.success('审核完成')
          this.getPaymentInfo()
        }
      })
    },
    // 拒绝
    handleApprovalRefuse() {
      this.$refs.refuseForm.show()
    },
    async handleRefuseSuccess(formData) {
      const res = await batchApproval({
        batchNo: this.batchNo,
        pass: false,
        remark: formData.remark
      })
      if (res.code === 0) {
        this.$refs.refuseForm.hideDialog()
        this.$message.success('审核完成')
        this.$router.push({ name: 'PayCommission' })
      }
    },
    // 返回
    handleCustomGoBack() {
      this.$router.replace({ name: 'PayCommission' })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(batch-detail) {
}
</style>
