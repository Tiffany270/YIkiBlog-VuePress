<template>
  <page-container show-go-back>
    <div class="handle-pay">
      <top-steper :list="STEPER_TEXT_LIST" :current="0" />
      <handle-valid-process
        :isValidating="isValidating"
        :isInit="isInit"
        :batchPayDetail="batchPayDetail"
        :totalCount="totalCount"
        :successCount="successCount"
        :failCount="failCount"
        @on-change="getValidProgress"
        @on-finish="handeValidFinish"
      />
      <handle-valid-result
        :isValidating="isValidating"
        :isInit="isInit"
        :isFetchingCount="isFetchingCount"
        :batchNo="batchNo"
        :successCount="successCount"
        :failCount="failCount"
        @on-change="getInitData"
      />
    </div>
    <template v-slot:bottomBarRight>
      <el-button type="text" style="margin-right: 15px" @click="giveUpPay" v-preventReClick>放弃发放</el-button>
      <!-- :disabled="successCount > 0 && !isValidating" -->
      <el-button type="primary" @click="nextStep" :disabled="!successCount" v-preventReClick>下一步</el-button>
    </template>
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import TopSteper from '_c/TopSteper'
import HandleValidProcess from './components/HandleValidProcess'
import HandleValidResult from './components/HandleValidResult'
import { STEPER_TEXT_LIST } from '../config'
import {
  // queryImportResultData,
  checkImportPayStatus,
  queryImportPayrollProgress,
  queryPayAmountAndAccountInfo,
  cancelPay
} from '@/apis/payroll'
export default {
  name: 'HandleToPay',
  components: {
    TopSteper,
    HandleValidProcess,
    HandleValidResult
  },
  mixins: [BasePage],
  data() {
    return {
      STEPER_TEXT_LIST,
      // 是否还在校验中
      isValidating: true,
      // 初始化状态
      isInit: true,
      // 是否正在获取数量中
      isFetchingCount: false,
      // 发放金额总计和发放账户信息
      batchPayDetail: {},
      // 总共条数
      totalCount: 0,
      // 成功条数
      successCount: 0,
      // 失败条数
      failCount: 0
    }
  },
  computed: {
    batchNo() {
      return this.$route.query.batchNo || ''
    }
  },
  mounted() {
    this.getInitData()
  },
  methods: {
    // 获取初始化数据
    async getInitData() {
      this.isInit = true
      await this.getPayrollTotal()
      await this.checkValidStatus()
      this.getValidProgress()
    },
    // 获取批次发放数据总计和发放账户信息
    async getPayrollTotal() {
      const { data } = await queryPayAmountAndAccountInfo(this.batchNo)
      this.batchPayDetail = data || {}
    },
    // 查询批次导入校验状态
    async checkValidStatus() {
      const { data } = await checkImportPayStatus()
      data && (this.isValidating = data.status === 'UPLOAD')
    },
    // 获取上传结果 => 计算上传进度
    async getValidProgress() {
      this.isFetchingCount = true
      const { data } = await queryImportPayrollProgress({
        batchNo: this.batchNo
      })
      this.totalCount = data.totalCount
      this.successCount = data.successCount
      this.failCount = data.failCount
      this.isInit = false
      this.isFetchingCount = false
    },
    // 校验完成回调
    handeValidFinish() {
      // 校验完成改状态
      this.isValidating = false
      // 更新状态
      this.checkValidStatus()
      // 更新数据
      this.getPayrollTotal()
    },
    // 放弃发放
    giveUpPay() {
      this.$confirm('确认放弃本批次导入?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.stopToPay()
      })
    },
    // 停止发放
    async stopToPay() {
      const { code } = await cancelPay(this.batchNo)
      if (code === 0) {
        this.$router.push({ name: 'PayCommission' })
      }
    },
    nextStep() {
      this.$router.push({
        name: 'ConfirmToPay',
        query: { batchNo: this.batchNo }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '@/styles/mixin';
@include b(handle-pay) {
  @include e(container) {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
}
</style>
