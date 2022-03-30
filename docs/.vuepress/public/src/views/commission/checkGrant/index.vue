<template>
  <page-container>
    <div class="studio">
      <search-form :list="searchList" @on-search="handleSearch" />
      <block-container>
        <XBTable
          title="批量打款明细"
          :columns="tableColumns"
          :data="tableData"
          :total="pageTotal"
          @on-page-change="handlePageChange"
        >
          <template v-slot:handle>
            <el-button
              type="primary"
              v-if="checkPermission('checkGrant-export')"
              plain
              @click="handleDownloadDetail"
              :disabled="!tableData.length"
            >
              <i class="iconfont xbicon-download1"></i>导出数据</el-button
            >
          </template>
        </XBTable>
      </block-container>
    </div>
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'
import { grantSearchItems, grantTableCols } from './config'
import BasePage from '@/mixins/BasePage'
import PageMixin from '@/mixins/Page'
import { queryPayrollDetail, downloadPayrollDetail } from '@/apis/payroll'
import { downloadBlobFile } from '@/utils/download-blob-file'
export default {
  name: 'CheckGrant',
  components: {
    SearchForm,
    XBTable
  },
  mixins: [BasePage, PageMixin],
  data() {
    return {
      searchList: [...grantSearchItems],
      tableColumns: [...grantTableCols],
      tableData: [],
      searchForm: {},
      pageTotal: 0
    }
  },
  mounted() {
    this.getInitTableData()
  },
  methods: {
    // 查询
    handleSearch(data) {
      this.searchForm = { ...data }
      this.pages.current = 1
      this.getInitTableData(data)
    },
    // 获取列表数据
    async getInitTableData(data) {
      const formData = data || this.searchForm
      const {
        data: { records, total }
      } = await queryPayrollDetail({
        ...formData,
        ...this.pages
      })
      this.tableData = records
      this.pageTotal = total
    },
    handlePageChange(data) {
      this.pages = data
      this.getInitTableData()
    },
    async handleDownloadDetail() {
      const res = await downloadPayrollDetail({
        ...this.searchForm,
        ...this.pages
      })
      downloadBlobFile(res)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
