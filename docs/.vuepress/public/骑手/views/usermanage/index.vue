<template>
  <page-container>
    <block-container>
      <search-form
        :list="searchList"
        @on-search="handleSearch"
        @on-reset="handleReset"
      />
      <handle-block>
        <template #right>
          <div>
            <el-button type="primary" size="small" @click="exportData">
              导出数据
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="openBatchCashBackDialog"
            >
              批量返现
            </el-button>
          </div>
        </template>
      </handle-block>
      <xb-table
        :columns="columns"
        :data="data"
        :page-size="20"
        :total="pageTotal"
        @on-page-change="handlePageChange"
      ></xb-table>
    </block-container>
    <dialog-detail ref="DialogDetail" />
    <dialog-batch-cash-back ref="DialogBatchCashBack"></dialog-batch-cash-back>
    <dialog-import-result ref="DialogImportResult"></dialog-import-result>
  </page-container>
</template>
<script>
import { searchItems, columns } from './config'
import PageContainer from '@components/PageContainer'
import BlockContainer from '@components/BlockContainer'
import HandleBlock from '@components/HandleBlock'
import SearchForm from '@components/SearchForm'
import Table from '@/mixin/Table'
import DialogDetail from './components/DialogDetail'
import DialogBatchCashBack from './components/DialogBatchCashBack'
import DialogImportResult from './components/DialogImportResult'
export default {
  components: {
    PageContainer,
    HandleBlock,
    SearchForm,
    BlockContainer,
    DialogDetail,
    DialogBatchCashBack,
    DialogImportResult
  },
  mixins: [Table],
  data() {
    return {
      searchForm: {},
      searchList: [...searchItems],
      changeSearchList: true,
      columns: [],
      data: [{}],
      pageTotal: 0
    }
  },
  mounted() {
    this.columns = columns(this)
  },
  methods: {
    handleSearch(searchForm) {
      this.pages.current = 1
      this.searchForm = { ...this.searchForm, ...searchForm }
      console.log(searchForm)
      this.getList()
    },
    handleReset() {
      this.pages.current = 1
      this.searchForm = {}
      this.getList()
    },
    handlePageChange(data) {
      this.pages = data
      this.getList()
    },
    getList() {
      // const data = { ...this.pages, ...this.searchForm }
      // getList(data).then(res => {
      //   this.data = res.data.records
      //   this.pageTotal = res.data.total
      // })
    },
    exportData() {
      this.$refs.DialogImportResult.updateView()
    },
    openDetailDialog(id) {
      this.$refs.DialogDetail.updateView(id)
    },
    openBatchCashBackDialog() {
      this.$refs.DialogBatchCashBack.updateView()
    }
  }
}
</script>
