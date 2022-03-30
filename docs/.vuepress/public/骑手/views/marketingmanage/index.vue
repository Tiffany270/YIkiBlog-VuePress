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
            <el-button type="primary" size="small" @click="addActive">
              添加活动
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
    <dialog-edit ref="DialogEdit"></dialog-edit>
  </page-container>
</template>
<script>
import { searchItems, columns } from './config'
import PageContainer from '@components/PageContainer'
import BlockContainer from '@components/BlockContainer'
import HandleBlock from '@components/HandleBlock'
import SearchForm from '@components/SearchForm'
import Table from '@/mixin/Table'
import DialogDetail from './components/DialogDetail.vue'
import DialogEdit from './components/DialogEdit.vue'
export default {
  components: {
    PageContainer,
    HandleBlock,
    SearchForm,
    BlockContainer,
    DialogDetail,
    DialogEdit
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
    openDetailDialog() {
      this.$refs.DialogDetail.updateView()
    },
    openEditDialog() {},
    addActive() {
      this.$refs.DialogEdit.updateView()
    }
  }
}
</script>
