<template>
  <page-container>
    <div class="statistics-data">
      <div class="statistics-data-display">
        <div class="statistics-data-title">
          <i class="iconfont xbicon-statistics" />
          数据统计
        </div>
        <div class="statistics-data-container">
          <div v-for="(item, key) in BillSummaryDisplay" :key="key" class="data-container">
            {{ item.title }}(元)：{{ item.isMinus && detail[item.key] ? '-' : '' }}{{ detail[item.key] | moneyConvert }}
          </div>
        </div>
      </div>
    </div>
    <search-form :list="searchList" @on-search="handleSearch" />
    <block-container>
      <XBTable
        title="结算账单"
        :columns="tableColumns"
        :data="tableData"
        :total="total"
        @on-page-change="handlePageChange"
        @on-selection-change="onSelectionChange"
      >
        <template v-slot:handle>
          <el-button
            v-if="checkPermission('settlementReceipt-export')"
            :disabled="!tableData.length"
            type="primary"
            plain
            @click="downloadList(true)"
          >
            <i class="iconfont xbicon-download1"></i>导出数据
          </el-button>
          <!-- <el-button
            :disabled="!tableData.length"
            type="primary"
            plain
            @click="downloadList(false)"
            >批量下载</el-button
          > -->
        </template>
      </XBTable>
    </block-container>
    <dialog-bill-settlement ref="DialogBillSettlement"></dialog-bill-settlement>
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import Page from '@/mixins/Page'
import SearchForm from '_c/SearchForm'
import XBTable from '_c/XBTable'
import { getTableCols, searchItems, BillSummaryDisplay } from './config'
import { settlementBillToBListPage, settlementBillToBDownload, settlementBillToBDownloadAll } from '@/apis/settlement'
import { downloadBlobFile } from '@/utils/download-blob-file'
import DialogBillSettlement from './components/DialogBillSettlement.vue'
import { downloadFileFromOss } from '@/utils/oss-uploader/utilities/download-file-from-oss'

export default {
  name: 'Settlement',
  components: {
    XBTable,
    SearchForm,
    DialogBillSettlement
  },
  mixins: [BasePage, Page, searchItems],
  data() {
    return {
      searchList: [],
      BillSummaryDisplay,
      detail: {},
      isLoading: false,
      selectedItems: [],
      total: 0,
      tableData: [],
      tableColumns: [],
      searchForm: {}
    }
  },
  mounted() {
    console.log('yiki')
    this.tableColumns = getTableCols(this)
    this.fetchData()
  },
  methods: {
    handlePageChange(pages) {
      this.pages = pages
      this.fetchData()
    },
    onSelectionChange(items) {
      this.selectedItems = items
    },
    handleSearch(data) {
      this.searchForm = { ...data }
      this.pages.current = 1
      this.fetchData()
    },
    // 获取列表数据
    fetchData() {
      this.isLoading = true
      settlementBillToBListPage({
        ...this.searchForm,
        ...this.pages
      })
        .then(({ data, extra }) => {
          this.isLoading = false
          this.tableData = data.records
          this.total = data.total
          this.detail = extra.statistics || {}
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    downloadList() {
      if (!this.selectedItems.length) {
        settlementBillToBDownloadAll({ ...this.searchForm }).then(res => {
          downloadBlobFile(res)
        })
      } else {
        const idsStr = this.selectedItems.map(e => Number(e.id))
        settlementBillToBDownload({ ids: idsStr }).then(res => {
          downloadBlobFile(res)
        })
      }
    },
    async handleDownLoad(fileIdOrUrl) {
      downloadFileFromOss(fileIdOrUrl)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
