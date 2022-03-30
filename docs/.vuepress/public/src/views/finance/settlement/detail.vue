<template>
  <page-container show-go-back>
    <search-form :list="searchList" @on-search="handleSearch" />
    <block-container>
      <XBTable
        v-loading="isLoading"
        title="账单详情列表"
        :columns="tableColumns"
        :data="tableData"
        :total="total"
        :on-row-key="onRowKey"
        @on-page-change="handlePageChange"
        @on-selection-change="onSelectionChange"
      >
        <template v-slot:handle>
          <el-button type="primary" plain :disabled="!tableData.length" @click="downloadList()">
            <i class="iconfont xbicon-download1"></i>下载明细</el-button
          >
        </template>
      </XBTable>
    </block-container>
    <!-- <template v-slot:bottomBarLeft>
      <el-button
        v-if="isItemSelected"
        type="primary"
        @click="downloadList(false)"
        >下载</el-button
      >
    </template> -->
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'
import pageMixin from '@/mixins/Page'
import BasePage from '@/mixins/BasePage'
import { searchDetailItems, getTableDetailCols } from './config'
import { settlementBillDetailListPage, settlementBillDetailToBDownload } from '@/apis/settlement'
import { downloadBlobFile } from '@/utils/download-blob-file'

export default {
  name: 'DetailBill',
  components: {
    SearchForm,
    XBTable
  },
  mixins: [pageMixin, BasePage, searchDetailItems],
  data() {
    return {
      isLoading: false,
      id: '',
      searchList: [],
      searchForm: {},
      tableColumns: [],
      tableData: [],
      total: 0,
      selectedItems: []
    }
  },
  computed: {
    isItemSelected() {
      return this.selectedItems.length
    }
  },
  created() {
    this.id = this.$route.query.id
    this.tableColumns = getTableDetailCols(this)
    this.fetchData()
  },
  methods: {
    // 获取列表数据
    fetchData() {
      this.isLoading = true
      settlementBillDetailListPage(this.id, {
        ...this.searchForm,
        ...this.pages
      })
        .then(({ data }) => {
          this.isLoading = false
          this.tableData = data.records
          this.total = data.total
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    onRowKey(row) {
      return row.id
    },
    handleSearch(data) {
      this.searchForm = { ...data }
      this.pages.current = 1
      this.fetchData()
    },
    handlePageChange(pages) {
      this.pages = pages
      this.fetchData()
    },
    onSelectionChange(items) {
      this.selectedItems = items
    },
    downloadList() {
      settlementBillDetailToBDownload({ ...this.searchForm, id: this.id }).then(res => {
        downloadBlobFile(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
