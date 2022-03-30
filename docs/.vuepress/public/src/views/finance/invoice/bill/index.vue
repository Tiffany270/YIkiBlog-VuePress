<template>
  <page-container show-go-back>
    <div class="bill">
      <!-- 警告 -->
      <div class="bill__warning">
        <warn-tips>有多个可申请开票的账单，建议您合并申请开票！</warn-tips>
      </div>
      <!-- 查询 -->
      <search-form :list="searchList" @on-search="handleSearch" />
      <!-- 列表 -->
      <block-container>
        <XBTable
          title="账单列表"
          :columns="billColumns"
          :data="billTableData"
          :total="pageTotal"
          :onRowKey="(row, callback) => callback(row.id)"
          @on-page-change="handlePageChange"
          @on-selection-change="handleSelection"
        >
        </XBTable>
      </block-container>
      <!-- 下一步 -->
    </div>
    <template v-slot:bottomBarRight>
      <div>
        <span class="bill__next__text">
          <span class="bill__next__text--selected"
            >已选 <span class="count">{{ selectedBillNos.length }}</span
            >条</span
          >
          <span class="bill__next__text--total"
            >申请开票金额合计 <span class="count">{{ calculateInvoiceAmountTotal | moneyConvert }}</span
            >元</span
          >
        </span>
        <el-button type="primary" @click="next" :disabled="!canNext">下一步</el-button>
      </div>
    </template>
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import WarnTips from '_c/WarnTips/index.vue'
import XBTable from '_c/XBTable/index.vue'
import { billSearchItems, billColumns } from '../config'
import BasePage from '@/mixins/BasePage'
import PageMixin from '@/mixins/Page'
import { queryInvoiceBill, queryNegativeInvoiceAmount } from '@/apis/invoice'
export default {
  name: 'Bill',
  components: {
    SearchForm,
    WarnTips,
    XBTable
  },
  mixins: [BasePage, PageMixin],
  data() {
    return {
      searchList: [...billSearchItems],
      billColumns,
      billTableData: [],
      searchForm: {},
      pageTotal: 0,
      negativeInvoiceAmount: 0,
      // 选中要开票的账单
      selectedBillList: [],
      // 账单开票金额合计
      billInvoiceAmountTotal: 0,
      // 选中的账单id
      selectedBillNos: []
    }
  },
  computed: {
    canNext() {
      return this.calculateInvoiceAmountTotal > 0
    },
    calculateInvoiceAmountTotal() {
      return !this.billInvoiceAmountTotal
        ? this.negativeInvoiceAmount
        : Number((this.billInvoiceAmountTotal + this.negativeInvoiceAmount).toFixed(2))
    }
  },
  mounted() {
    this.getInitTableData()
    this.getNegativeInvoiceAmount()
  },
  methods: {
    async getInitTableData(data) {
      const formData = data || this.searchForm
      const {
        data: { records, total }
      } = await queryInvoiceBill({ ...formData, ...this.pages })
      this.billTableData = records || []
      this.pageTotal = total || 0
    },
    // 获取负数账单数据
    async getNegativeInvoiceAmount() {
      const res = await queryNegativeInvoiceAmount()
      this.negativeInvoiceAmount = (res.data && Number(res.data)) || 0
    },
    // 查询
    handleSearch(data) {
      this.searchForm = { ...data }
      this.pages.current = 1
      this.getInitTableData(data)
    },
    handlePageChange(data) {
      this.pages = data
      this.getInitTableData()
    },
    handleSelection(selection) {
      let amount = 0
      this.selectedBillNos = selection.map(item => {
        amount += Number(item.canInvoiceAmount)
        return item.billNo
      })
      this.billInvoiceAmountTotal = amount
    },
    // 下一步
    async next() {
      this.$router.push({
        name: 'SubmitInvoice',
        query: {
          billNos: this.selectedBillNos.join(','),
          source: 'bill'
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/index';
@include b(bill) {
  padding-bottom: 120px;
  box-sizing: border-box;
  @include e(warning) {
    width: 100%;
    height: 60px;
    line-height: 36px;
    background-color: white;
    border-radius: 5px;
    padding: 11px 20px;
    box-sizing: border-box;
    margin-bottom: 15px;
  }
  @include e(next) {
    position: fixed;
    bottom: 0;
    right: 0px;
    height: 72px;
    line-height: 72px;
    text-align: right;
    background-color: #fff;
    border-bottom: 1px solid #e3e6ed;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    padding: 0 34px;
    @include e(text) {
      margin-right: 20px;
      @include m(selected) {
        margin-right: 10px;
      }
      .count {
        margin: 0 5px;
        font-size: 15px;
        font-weight: 600;
        color: #cc3333;
      }
    }
  }
}
</style>
