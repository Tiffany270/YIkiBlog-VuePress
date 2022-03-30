<template>
  <dialog-container :ref="DIALOG_REF" title="重发数据确认" width="950px" class="repay-confirm-dialog">
    <div class="repay-confirm-dialog__warning">
      <i class="iconfont xbicon-warning" style="color: #faa700; font-size: 20px"></i>
      <span style="margin-left: 10px; font-size: 12px"
        >仅可进行一次重发操作，请收集正确的重发信息后再点击【确认】进行下一步操作</span
      >
    </div>
    <div class="repay-confirm-dialog__list">
      <detail-list :row="2" :labelData="repayLabelData" :data="repayInfo"></detail-list>
    </div>
    <XBTable
      :hasHandle="false"
      :columns="confirmRepayColumns"
      :data="confirmRepayData"
      :total="pageTotal"
      @on-page-change="handlePageChange"
    >
    </XBTable>
    <div slot="footer">
      <el-button @click="hideDialog()">取消</el-button>
      <el-button type="primary" @click="handleConfirm" v-preventReClick>确定</el-button>
    </div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import DetailList from '_c/DetailList'
import XBTable from '_c/XBTable/index.vue'
import PageMixin from '@/mixins/Page'
import { confirmRepayColumns } from '../../config'
import { confirmRepay, rePay } from '@/apis/payroll'
export default {
  name: 'DialogConfirmRepay',
  mixins: [BaseDialog, PageMixin],
  components: {
    DetailList,
    XBTable
  },
  data() {
    return {
      repayLabelData: [
        { label: '原批次号', key: 'batchNo' },
        { label: '原申请时间', key: 'createdDate' },
        { label: '可重发笔数（笔）', key: 'totalCount' },
        { label: '重发金额（元）', key: 'totalAmount', type: 'money' }
      ],
      repayInfo: {},
      confirmRepayColumns,
      confirmRepayData: [],
      pageTotal: 0,
      batchNo: ''
    }
  },

  methods: {
    show(batchNo) {
      this.batchNo = batchNo
      this.getRepayData()
      this.showDialog()
    },
    async getRepayData() {
      const {
        extra: { detail },
        data: { records, total }
      } = await confirmRepay({ batchNo: this.batchNo })
      this.repayInfo = detail || {}
      this.confirmRepayData = records || []
      this.pageTotal = total || 0
    },
    handlePageChange(pages) {
      this.pages = pages
      this.getRepayData()
    },
    async handleConfirm() {
      const { code, data } = await rePay({ batchNo: this.batchNo })
      if (code === 0) {
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

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(repay-confirm-dialog) {
  .dialog-body {
    position: relative;
  }
  @include e(warning) {
    height: 40px;
    line-height: 40px;
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    background-color: #fffcdd;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
  }
  @include e(list) {
    padding-top: 38px;
  }
}
</style>
