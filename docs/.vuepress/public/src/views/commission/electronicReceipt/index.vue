<template>
  <page-container>
    <div class="studio">
      <search-form :list="searchList" @on-search="handleSearch" />
      <block-container>
        <XBTable
          title="电子回单管理"
          :columns="tableColumns"
          :data="tableData"
          :total="pageTotal"
          @on-page-change="handlePageChange"
        >
        </XBTable>
      </block-container>
    </div>
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'
import { eleReceiptSearchItems, getEleReceiptColumns } from './config'
import BasePage from '@/mixins/BasePage'
import PageMixin from '@/mixins/Page'
import { queryEReceipt, downloadEReceipt } from '@/apis/payroll'
import { downloadBlobFile } from '@/utils/download-blob-file'
export default {
  name: 'ElectronicReceipt',
  components: {
    SearchForm,
    XBTable
  },
  mixins: [BasePage, PageMixin],
  data() {
    return {
      searchList: [...eleReceiptSearchItems],
      tableColumns: [],
      tableData: [],
      searchForm: {},
      pageTotal: 0
    }
  },
  mounted() {
    this.tableColumns = getEleReceiptColumns(this)
    this.getInitTableData()
  },
  methods: {
    async getInitTableData() {
      const {
        data: { records, total }
      } = await queryEReceipt({
        ...this.searchForm,
        ...this.pages
      })
      this.tableData = records || []
      this.pageTotal = total
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
    async handleDownload({ id }) {
      const res = await downloadEReceipt(id)
      downloadBlobFile(res)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
