<template>
  <page-container>
    <block-container>
      <search-form
        :list="searchList"
        :key="changeSearchList"
        @on-search="handleSearch"
        @on-reset="handleReset"
      />
      <handle-block>
        <template #right>
          <div>
            <el-button
              size="small"
              plain
              @click="deleteSuggestion"
              :disabled="selection.length === 0 ? true : false"
            >
              <i class="iconfont icon-icon-new"></i>
              删除
            </el-button>
          </div>
        </template>
      </handle-block>
      <xb-table
        ref="suggestionTable"
        :max-height="980"
        :columns="columns"
        :data="suggestionData"
        :on-row-key="row => row.id"
        @on-page-change="handlePageChange"
        @on-selection-change="handleSelectionChange"
        :total="pageTotal"
      ></xb-table>
    </block-container>
    <suggestion-show-detail ref="SuggestionShowDetail"></suggestion-show-detail>
  </page-container>
</template>
<script>
import { searchItems, columns } from './config'
import PageContainer from '@components/PageContainer'
import BlockContainer from '@components/BlockContainer'
import HandleBlock from '@components/HandleBlock'
import SearchForm from '@components/SearchForm'
import Table from '@/mixin/Table'
import Dialog from '@/mixin/Dialog'

import { findSuggestion, suggestiondelete } from '@/api/suggestion'
import SuggestionShowDetail from './components/SuggestionShowDetail.vue'
export default {
  components: {
    PageContainer,
    SearchForm,
    BlockContainer,
    HandleBlock,

    SuggestionShowDetail
  },
  mixins: [Table, Dialog],
  data() {
    return {
      searchList: [...searchItems],
      changeSearchList: true,
      columns: [],
      pageTotal: 0,
      searchForm: {},
      suggestionData: [],
      selection: []
    }
  },

  mounted() {
    this.columns = columns(this)
    this.getSuggestion()
  },
  methods: {
    getSuggestion() {
      findSuggestion({ ...this.pages, ...this.searchForm }).then(res => {
        this.pageTotal = res.data.total
        this.suggestionData = res.data.records
        console.log(res.data, 'res.data')
      })
    },
    handleSelectionChange(selection) {
      this.selection = selection
    },
    deleteSuggestion() {
      const id = this.selection.map(item => item.id)
      this.$confirm(
        `是否删除此问题？
  删除后数据将无法恢复！`,
        '删除问题反馈',
        {
          type: 'aler',
          confirmButtonText: '是',
          cancelButtonText: '否'
        }
      ).then(async () => {
        console.log(id, 'id') // 是
        let ids = {
          ids: id
        }
        const data = await suggestiondelete(ids)
        if (data.code === 0) {
          this.$message.success('删除成功')
          this.handleReset()
        }
      })
    },
    handlePageChange(pages) {
      console.log(this.selection.length, 'this.selection')
      // const data = {
      //   pageNum: pages.current,
      //   pageSize: pages.size
      // }
      this.pages = pages
      this.getSuggestion()
    },
    handleSearch(searchForm) {
      this.pages.current = 1
      this.searchForm = { ...this.searchForm, ...searchForm }
      this.getSuggestion()
    },
    handleReset() {
      this.searchForm = {}
      this.pages.current = 1
      this.handleClearSelection
      this.getSuggestion()
    },
    handleClearSelection() {
      this.selection = []
    },
    openSuggestionDialog(row) {
      this.$refs.SuggestionShowDetail.updateView(row)
    }
  }
}
</script>
