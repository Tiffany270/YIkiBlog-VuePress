<template>
  <page-container>
    <div class="statistics-data">
      <div class="statistics-data-display">
        <div class="statistics-data-title">
          <i class="iconfont xbicon-statistics" />
          数据统计
        </div>
        <div class="statistics-data-container">
          <div v-for="(item, key) in statementDisplay" :key="key" class="data-container">
            {{ item.title }}(元)：{{ detail && detail[item.key] | moneyConvert }}
          </div>
        </div>
      </div>
    </div>
    <search-form :list="searchList" @on-search="handleSearch" />
    <block-container>
      <XBTable
        ref="XBTable"
        title="结算对账单"
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
            <i class="iconfont xbicon-download1" v-if="checkPermission('settlementStatement-export')"></i>导出数据
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
import { searchList, getCustomerStatementColumns, statementDisplay } from './config'
import {
  findListClientPlatform,
  queryStatisticsListClientPlatform,
  exportClientPlatformExport,
  exportClientPlatformSelected
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
      statementDisplay,
      detail: {},
      total: 0,
      tableData: [],
      tableColumns: [],
      searchForm: {},
      searchList: [...searchList],
      selectedItems: []
    }
  },
  mounted() {
    this.tableColumns = getCustomerStatementColumns(this)
    this.fetchListClientPlatform()
    this.fetchStatisticsListClientPlatform()
  },
  methods: {
    // 获取结算对账单列表
    fetchListClientPlatform() {
      findListClientPlatform({
        ...this.pages,
        ...this.searchForm
      }).then(({ data }) => {
        this.tableData = data.records
        this.total = data.total
      })
    },
    // 结算对账单-统计数据
    async fetchStatisticsListClientPlatform() {
      const res = await queryStatisticsListClientPlatform()
      this.detail = res.data
    },
    handleSearch(searchForm) {
      this.searchForm = { ...searchForm }
      this.pages.current = 1
      this.$refs.XBTable.handleClearSelection()
      this.fetchListClientPlatform()
    },

    handlePageChange(pages) {
      this.page = pages
    },
    onSelectionChange(items) {
      this.selectedItems = items
    },
    // 导出列表数据（勾选则导出勾选）
    async downloadList() {
      if (this.selectedItems.length) {
        const params = {
          ids: this.selectedItems.map(item => Number(item.id))
        }
        const res = await exportClientPlatformSelected(params)
        downloadBlobFile(res)
      } else {
        const res = await exportClientPlatformExport({
          ...this.searchForm
        })
        downloadBlobFile(res)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
