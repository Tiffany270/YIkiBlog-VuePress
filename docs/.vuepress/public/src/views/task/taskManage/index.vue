<template>
  <page-container>
    <search-form :list="searchList" @on-search="handleSearch" />
    <block-container>
      <XBTable
        title="任务管理"
        :columns="tableColumns"
        :data="tableData"
        :total="total"
        @on-page-change="handlePageChange"
        v-loading="isLoading"
      >
        <template v-slot:handle>
          <el-button type="primary" plain v-if="checkPermission('taskManage-add')" @click="toBuildTask">
            <i class="iconfont xbicon-new"></i>
            新建任务
          </el-button>
        </template>
      </XBTable>
    </block-container>
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import Page from '@/mixins/Page'
import SearchForm from '_c/SearchForm'
import XBTable from '_c/XBTable'
import { getTableCols, searchItems } from './config'
import { getPage, withDrawTask } from '@/apis/taskManage'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TaskManage',
  components: {
    XBTable,
    SearchForm
  },
  mixins: [BasePage, Page],
  data() {
    return {
      searchList: [...searchItems],
      detail: {},
      isLoading: false,
      selectedItems: [],
      total: 0,
      tableData: [],
      tableColumns: [],
      searchForm: {}
    }
  },
  computed: {
    ...mapGetters(['canUseAgreements'])
  },
  mounted() {
    this.tableColumns = getTableCols(this)
    this.fetchData()
  },
  methods: {
    ...mapActions(['UPDATE_CAN_USE_AGREEMENTS']),
    handlePageChange(pages) {
      this.pages = pages
      this.fetchData()
    },
    handleSearch(data) {
      this.searchForm = { ...data }
      this.pages.current = 1
      this.fetchData()
    },
    // 获取列表数据
    fetchData() {
      this.isLoading = true
      getPage({
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
    toBuildTask() {
      this.UPDATE_CAN_USE_AGREEMENTS().then(() => {
        if (this.canUseAgreements.length) {
          this.$router.push({
            name: 'EditTask',
            query: { isEditStatus: true }
          })
        } else {
          this.$message.error('暂无可用C端协议，请联系运营人员')
        }
      })
    },
    withDrawTask(id) {
      withDrawTask(id).then(res => {
        if (res.data) {
          this.$message.success('撤回成功')
          this.fetchData()
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
