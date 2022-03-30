<template>
  <page-container show-go-back>
    <div class="statistics-data">
      <div class="statistics-data-display">
        <div class="statistics-data-container">
          <div class="data-container">所属月份：{{ this.reportPeriod }}</div>
          <div v-for="(item, key) in statementDetailDisplay" :key="key" class="data-container">
            {{ item.title }}(元)：{{ detail && detail[item.key] | moneyConvert }}
          </div>
        </div>
      </div>
    </div>
    <search-form :list="searchList" @on-search="handleSearch" />
    <block-container>
      <XBTable
        ref="XBTable"
        title="结算对账单详情"
        :data="tableData"
        :columns="tableColumns"
        :total="total"
        @on-page-change="handlePageChange"
        @on-selection-change="onSelectionChange"
        :on-row-key="
          row => {
            return row.id
          }
        "
      >
        <template v-slot:handle>
          <el-button :disabled="!tableData.length" type="primary" plain @click="downloadList">
            <i class="iconfont xbicon-download1" v-if="checkPermission('statementList-download')"></i>导出列表数据
          </el-button>
        </template>
      </XBTable>
    </block-container>
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'
import pageMixin from '@/mixins/Page'
import BasePage from '@/mixins/BasePage'
import NumberConverter from '@/mixins/NumberConverter'
import { searchList, getCustomerStatementColumns, statementDetailDisplay } from './config'
import {
  findSettleBillStatisticsDetailPage,
  downLoadSettleBillStatisticsDetail,
  downloadSettleBillStatisticsDetailSelected
} from '@/apis/statement'
import { downloadBlobFile } from '@/utils/download-blob-file'
export default {
  name: 'Statement',
  components: {
    SearchForm,
    XBTable
  },
  mixins: [pageMixin, BasePage, NumberConverter],
  data() {
    return {
      statementDetailDisplay,

      detail: {},
      total: 0,
      tableData: [],
      tableColumns: [],
      searchForm: {},
      searchList: [...searchList],
      selectedItems: []
    }
  },
  created() {
    this.reportPeriod = this.$route.query.belongMonth
  },
  mounted() {
    this.tableColumns = getCustomerStatementColumns(this)
    this.fetchSettleBillStatisticsDetailPage()
  },
  methods: {
    // 获取结算对账单列表
    async fetchSettleBillStatisticsDetailPage() {
      await findSettleBillStatisticsDetailPage({
        ...this.pages,
        ...this.searchForm,
        reportPeriod: this.reportPeriod
      }).then(({ data, extra }) => {
        this.tableData = data.records
        this.total = data.total
        this.detail = extra
      })
    },
    handleSearch(searchForm) {
      this.searchForm = { ...searchForm }
      this.pages.current = 1
      this.$refs.XBTable.handleClearSelection()
      this.fetchSettleBillStatisticsDetailPage()
    },
    handlePageChange(pages) {
      this.page = pages
      this.fetchSettleBillStatisticsDetailPage()
    },
    onSelectionChange(items) {
      this.selectedItems = items
    },
    // 导出列表数据（勾选则导出勾选）
    async downloadList() {
      if (this.selectedItems.length) {
        const params = {
          ids: this.selectedItems.map(item => Number(item.id)),
          reportPeriod: this.reportPeriod
        }
        const res = await downloadSettleBillStatisticsDetailSelected(params)
        downloadBlobFile(res)
      } else {
        const res = await downLoadSettleBillStatisticsDetail({
          ...this.searchForm
        })
        downloadBlobFile(res)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
