<template>
  <page-container>
    <div class="studio">
      <search-form :list="searchList" @on-search="handleSearch" />
      <block-container>
        <XBTable :columns="tableColumns" :data="tableData" :total="pageTotal" @on-page-change="handlePageChange">
          <template v-slot:handle>
            <el-button
              type="primary"
              :disabled="!tableData.length"
              @click="handleDownload"
              v-if="checkPermission('singleProvision-export')"
              plain
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
import BasePage from '@/mixins/BasePage'
import PageMixin from '@/mixins/Page'
import XBTable from '_c/XBTable/index.vue'
import SearchForm from '_c/SearchForm/index.vue'
import { downloadBlobFile } from '@/utils/download-blob-file'
import { querySingleProvision, downLoadSinglePrivision } from '@/apis/payroll'
import { singleProvisionSearchItems, singleProvisionColumns } from './config'
export default {
  name: 'SingleProvisionQuery',
  components: { SearchForm, XBTable },
  mixins: [BasePage, PageMixin],
  data() {
    return {
      searchList: [...singleProvisionSearchItems],
      tableColumns: [],
      tableData: [],
      searchForm: {},
      pageTotal: 0
    }
  },
  mounted() {
    this.tableColumns = singleProvisionColumns()
    this.getInitTableData()
  },
  methods: {
    async getInitTableData(data) {
      const formData = data || this.searchForm
      const {
        data: { records, total }
      } = await querySingleProvision({
        ...formData,
        ...this.pages
      })
      this.tableData = records || []
      this.pageTotal = total
    },
    handleSearch(data) {
      this.searchForm = { ...data }
      this.pages.current = 1
      this.getInitTableData(data)
    },
    handlePageChange(data) {
      this.pages = data
      this.getInitTableData()
    },
    async handleDownload() {
      const res = await downLoadSinglePrivision({
        ...this.searchForm,
        ...this.pages
      })
      downloadBlobFile(res)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss"></style>
