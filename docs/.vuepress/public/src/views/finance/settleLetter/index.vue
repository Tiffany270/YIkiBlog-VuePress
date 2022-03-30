<template>
  <page-container>
    <searchForm :list="searchList" @on-search="handleSearch" />
    <block-container>
      <XBTable
        ref="XBTable"
        title="结算函"
        :data="tableData"
        :total="total"
        :columns="tableColumns"
        :on-row-key="onRowKey"
        @on-page-change="handlePageChange"
        @on-selection-change="onSelectionChange"
      >
        <template v-slot:handle>
          <el-button type="primary" plain @click="downloadLetter" :disabled="!tableData.length">
            <i class="iconfont xbicon-download1" v-if="checkPermission('clientStatementLetter-export')"></i>导出数据
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
import BaseDialog from '@/mixins/BaseDialog'
import { downloadBlobFile } from '@/utils/download-blob-file'
import { searchItems, getCustomerStatementLetter } from './config'
import { findLetter, exportClientLetter, exportClientLetterSelected } from '@/apis/settleLetter'
export default {
  name: 'SettleLetter',
  components: {
    SearchForm,
    XBTable
  },
  mixins: [pageMixin, BasePage, NumberConverter, BaseDialog],
  data() {
    return {
      id: '',
      letterFile: '',
      total: '0',
      searchForm: {},
      tableData: [],
      tableColumns: [],
      selectedItems: [],
      searchList: [...searchItems]
    }
  },
  computed: {
    isItemSelected() {
      return Array.isArray(this.selectedItems) && this.selectedItems.length
    }
  },
  mounted() {
    this.tableColumns = getCustomerStatementLetter(this)
    this.getFindLetter()
  },
  methods: {
    async updateView(row) {
      this.id = row.id
    },
    // 获取结算函分页查询-主列表
    async getFindLetter() {
      await findLetter({
        ...this.pages,
        ...this.searchForm
      }).then(({ data }) => {
        this.tableData = data.records
        this.total = data.total
        data &&
          data.records.map(item => {
            item.letterFil
          })
      })
    },
    handlePageChange(pages) {
      this.pages = pages
    },
    handleSearch(searchForm) {
      this.searchForm = { ...searchForm }
      this.pages.current = 1
      this.$refs.XBTable.handleClearSelection()
      this.getFindLetter()
    },
    onRowKey(row) {
      return row.id
    },
    onSelectionChange(items) {
      this.selectedItems = items
    },

    // 导出数据（勾选则导出勾选）
    async downloadLetter() {
      if (this.selectedItems.length) {
        const params = {
          ids: this.selectedItems.map(item => Number(item.id))
        }
        const res = await exportClientLetterSelected(params)
        downloadBlobFile(res)
      } else {
        const res = await exportClientLetter({
          ...this.searchForm
        })
        downloadBlobFile(res)
      }
    },
    // 查看
    viewSettleLetter(row) {
      console.log('row', row.id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
