<template>
  <page-container show-go-back>
    <div class="confirm-pay">
      <top-steper :list="STEPER_TEXT_LIST" :current="1" />
      <pay-confirm-info-total :confirmTotal="confirmTotal" />
      <pay-confirm-info-detail :tableData="confirmDetail" :total="pageTotal" @on-page-change="handlePageChange" />
    </div>
    <template v-slot:bottomBarRight>
      <!-- <el-button type="text" style="margin-right: 15px" @click="$router.go(-1)">上一步</el-button> -->
      <el-button
        type="primary"
        @click="handleReSubmit"
        v-preventReClick
        v-if="
          confirmTotal.expireStatus &&
          confirmTotal.expireStatus.value &&
          confirmTotal.expireStatus.value !== PAY_EXPIRE_STATUS['正常']
        "
        >重新提交</el-button
      >
      <el-button type="primary" @click="handleConfirmPayment" v-else v-preventReClick>提交审核</el-button>
    </template>
    <!-- 余额不足弹框 -->
    <dialog-balance-not-enough ref="balanceTip" />
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import TopSteper from '_c/TopSteper'
import PayConfirmInfoTotal from './components/PayConfirmInfoTotal'
import PayConfirmInfoDetail from './components/PayConfirmInfoDetail'
// import DialogBalanceNotEnough from '../components/DialogBalanceNotEnough'
import { STEPER_TEXT_LIST } from '../config'
import {
  previewPayroll,
  queryPreviewPayrollDetail,
  submitPayData,
  // checkIsEnoughForBalance,
  timeoutReSubmit
} from '@/apis/payroll'
import PageMixin from '@/mixins/Page'
import { PAY_EXPIRE_STATUS, AUTH_ROLES } from '@/maps/enum'
// import { ChannelEnum } from '@/maps/enums/ChannelEnum'
import { mapGetters } from 'vuex'
export default {
  name: 'ConfirmToPay',
  mixins: [BasePage, PageMixin],
  components: {
    TopSteper,
    PayConfirmInfoTotal,
    PayConfirmInfoDetail,
    DialogBalanceNotEnough: () =>
      import(/* webpackChunkName: "DialogBalanceNotEnough" */ '../components/DialogBalanceNotEnough')
  },
  data() {
    return {
      STEPER_TEXT_LIST,
      confirmTotal: {},
      confirmDetail: [],
      pageTotal: 0,
      PAY_EXPIRE_STATUS
    }
  },
  computed: {
    batchNo() {
      return this.$route.query.batchNo || ''
    },
    ...mapGetters(['payChanels', 'userRoles'])
  },
  mounted() {
    this.getPreviewPayrollData()
    this.getPayrollDetailList()
  },
  methods: {
    // 获取代发数据
    async getPreviewPayrollData() {
      const { data } = await previewPayroll({ batchNo: this.batchNo })
      this.confirmTotal = data || {}
    },
    // 获取分佣明细
    async getPayrollDetailList() {
      const { data } = await queryPreviewPayrollDetail({
        batchNo: this.batchNo,
        ...this.pages
      })
      this.confirmDetail = (data && data.records) || []
      this.pageTotal = (data && data.total) || 0
    },
    handlePageChange(data) {
      this.pages = data
      this.getPayrollDetailList()
    },
    // 发放
    handleToApproval() {
      // 有管理权限的进入审核页面
      if (
        this.userRoles.find(item => item === AUTH_ROLES['管理员']) ||
        this.userRoles.find(item => item === AUTH_ROLES['审核'])
      ) {
        this.$router.push({
          name: 'PayBatchDetail',
          query: { batchNo: this.batchNo }
        })
      } else {
        // 没有审核权限跳列表
        this.$alert('批次代发提交成功', '提示', {
          confirmButtonText: '返回佣金代发列表',
          callback: () => {
            this.$router.push({ name: 'PayCommission' })
          }
        })
        //   this.$confirm('批次代发提交成功', '提示', {
        //     confirmButtonText: '返回列表'
        //     // eslint-disable-next-line
        // }).then(async () => {
        //     this.$router.push({ name: 'PayCommission' })
        //   })
      }
    },
    // 线上发放
    // async handlePayOnline() {
    //   // 检查余额是否充足
    //   const {
    //     data: { canPay }
    //   } = await checkIsEnoughForBalance(this.batchNo)
    //   if (canPay) {
    //     // 有钱 可以付 ->跳去支付
    //     this.$router.push({
    //       name: 'PassToPay',
    //       query: {
    //         batchNo: this.batchNo
    //       }
    //     })
    //   } else {
    //     // 没钱提示弹框
    //     this.$refs.balanceTip.show(this.batchNo)
    //   }
    // },
    async handleConfirmPayment() {
      // eslint-disable-next-line prettier/prettier
      submitPayData({ batchNo: this.batchNo }).then(async() => {
        // 去审核
        this.handleToApproval()
        // 检查发放渠道是线下还是线上
        // if (this.payChanels && Array.isArray(this.payChanels) && this.payChanels[0].value === ChannelEnum.OFFLINE) {
        //   // 线下发放
        //   this.handlePayOffline()
        // } else {
        //   // 线上发放
        //   this.handlePayOnline()
        // }
      })
    },
    async handleReSubmit() {
      const { data } = await timeoutReSubmit({ batchNo: this.batchNo })
      if (data) {
        this.$router.push({
          name: 'HandleToPay',
          query: {
            batchNo: data
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
