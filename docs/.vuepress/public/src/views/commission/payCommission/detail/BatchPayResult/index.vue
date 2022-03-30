<template>
  <block-container>
    <div class="batchpay-result">
      <div class="finished-result" v-if="hasPaid">
        <el-tabs v-model="currentResult" @tab-click="handleChangeTabs">
          <el-tab-pane
            :label="`成功(${
              Array.isArray(this.payChanels) && this.payChanels[0].value === 'OFFLINE'
                ? pageTotal
                : Number(batchPayInfo.successCount) || 0
            })`"
            name="SUCCESS"
          >
            <XBTable
              :hasHandle="false"
              :columns="paySuccessColumns"
              :data="successTableData"
              :total="pageTotal"
              @on-page-change="handlePageChange"
            >
            </XBTable>
          </el-tab-pane>
          <el-tab-pane
            :label="`失败(${
              Array.isArray(this.payChanels) && this.payChanels[0].value === 'OFFLINE'
                ? 0
                : Number(batchPayInfo.totalCount) - Number(batchPayInfo.successCount) || 0
            })`"
            name="FAIL"
          >
            <XBTable
              :hasHandle="false"
              :columns="payFailColumns"
              :data="failTableData"
              :total="pageTotal"
              @on-page-change="handlePageChange"
            >
            </XBTable>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="unfinsh-result" v-else>
        <XBTable
          :total="pageTotal"
          :columns="payUnfinishColumns"
          :data="payUnfinishTableData"
          @on-page-change="handlePageChange"
        >
        </XBTable>
      </div>
    </div>
  </block-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import XBTable from '_c/XBTable/index.vue'
import PageMixin from '@/mixins/Page'
import { payUnfinishColumns, paySuccessColumns, payFailColumns } from '../../config'
import { queryPayrollDetailOrderList, queryPayrollDetail } from '@/apis/payroll'
import { FLOW_STATUS_ENUM, FLOW_STATE_ENUM } from '@/maps/enum'
import { mapGetters } from 'vuex'
export default {
  name: 'BatchPayResult',
  mixins: [BasePage, PageMixin],
  components: {
    XBTable
  },
  props: {
    batchPayInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    hasPaid() {
      return (
        (this.batchPayInfo.tollFlowStateEnum &&
          this.batchPayInfo.tollFlowStateEnum.value === FLOW_STATUS_ENUM['已完成']) ||
        (this.batchPayInfo.tollFlowStateEnum &&
          this.batchPayInfo.tollFlowStateEnum.value === FLOW_STATUS_ENUM['部分完成'])
      )
    },
    batchNo() {
      return this.batchPayInfo.batchNo
    },
    ...mapGetters(['payChanels'])
  },
  data() {
    return {
      payUnfinishColumns,
      payUnfinishTableData: [],
      currentResult: 'FAIL',
      payFailColumns,
      failTableData: [],
      paySuccessColumns,
      successTableData: [],
      pageTotal: 0
    }
  },
  watch: {
    batchPayInfo: {
      deep: true,
      handler(data) {
        if (Number(data.totalCount) - Number(data.successCount) === 0) {
          this.currentResult = 'SUCCESS'
        }
        // 线下发放时候直接取成功的数据
        if (Array.isArray(this.payChanels) && this.payChanels[0].value === 'OFFLINE') {
          this.currentResult = 'SUCCESS'
        }
        ;(data.tollFlowStateEnum && data.tollFlowStateEnum.value === FLOW_STATUS_ENUM['已完成']) ||
        (data.tollFlowStateEnum && data.tollFlowStateEnum.value === FLOW_STATUS_ENUM['部分完成'])
          ? this.getPaidBatchData()
          : this.getUnPaidBatchPayData()
      }
    }
  },
  mounted() {
    this.handleShowStatus()
  },
  methods: {
    // 动态展示未发放完成状态
    handleShowStatus() {
      /* 展示订单de状态，status=PAID、state=PAY_SUCCESS、state=PAY_FAIL 20210804 1900 由zenggui提供*/
      // 动态展示状态
      if (
        (this.batchPayInfo.tollFlowStateEnum &&
          this.batchPayInfo.tollFlowStateEnum.value === FLOW_STATE_ENUM['已完成']) ||
        (this.batchPayInfo.tollFlowStateEnum &&
          this.batchPayInfo.tollFlowStateEnum.value === FLOW_STATE_ENUM['部分完成']) ||
        (this.batchPayInfo.tollFlowStatusEnum &&
          this.batchPayInfo.tollFlowStatusEnum.value === FLOW_STATUS_ENUM['正在代发'])
      ) {
        this.payUnfinishColumns.push({
          label: '状态',
          prop: 'orderStatus',
          fixed: 'right',
          minWidth: 200,
          callback: row => {
            return row.orderStatus && row.orderStatus.label
          }
        })
      }
    },
    // 获取未发放批次数据
    async getUnPaidBatchPayData() {
      const {
        data: { records, total }
      } = await queryPayrollDetailOrderList({
        batchNo: this.batchNo,
        ...this.pages
      })
      this.payUnfinishTableData = records || []
      this.pageTotal = total
    },
    // 获取发放完之后的成功或者失败数据
    async getPaidBatchData() {
      const {
        data: { records, total }
      } = await queryPayrollDetail({
        batchNo: this.batchNo,
        status: this.currentResult,
        ...this.pages
      })
      if (this.currentResult === 'SUCCESS') {
        this.successTableData = records || []
        this.pageTotal = total
      } else {
        this.failTableData = records || []
        this.pageTotal = total
      }
    },
    handlePageChange(data) {
      this.pages = data
      this.hasPaid ? this.getPaidBatchData() : this.getUnPaidBatchPayData()
    },
    handleChangeTabs() {
      this.pages.current = 1
      this.getPaidBatchData()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
