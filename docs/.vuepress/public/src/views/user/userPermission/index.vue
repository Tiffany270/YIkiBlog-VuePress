<template>
  <page-container>
    <search-form :list="searchList" @on-search="handleSearch" />
    <block-container>
      <XBTable :columns="tableColumns" :data="tableData" :total="total" @on-page-change="handlePageChange">
        <template v-slot:tab>用户权限</template>
        <template v-slot:handle>
          <el-button
            v-if="checkPermission('userPermission-add')"
            type="primary"
            @click="
              $refs['diglogRole'].updateView({
                title: '添加用户',
                actionType: 'add'
              })
            "
            plain
          >
            <i class="iconfont xbicon-new"></i>
            添加用户
          </el-button>
        </template>
      </XBTable>
    </block-container>
    <diglog-role ref="diglogRole" @fetch="fetchData" />
  </page-container>
</template>

<script>
import XBTable from '_c/XBTable'
import SearchForm from '_c/SearchForm'
import PageMixin from '@/mixins/Page'
import BasePage from '@/mixins/BasePage'
import { riskControlToBPage, deleteRiskControlToB } from '@/apis/userManage'
import diglogRole from './components/dialogRole'
import { getTableColumnsConfig, searchList } from './config'
export default {
  components: { SearchForm, XBTable, diglogRole },
  mixins: [PageMixin, BasePage],
  data() {
    return {
      total: 0,
      searchForm: {},
      searchList: [...searchList],
      tableColumns: [],
      tableData: []
    }
  },
  mounted() {
    this.tableColumns = getTableColumnsConfig(this)
    this.fetchData()
  },
  methods: {
    fetchData() {
      riskControlToBPage({ ...this.searchForm, ...this.pages })
        .then(res => {
          this.tableData = res.data.records || []
          this.total = res.data.total || 0
        })
        .catch(() => {})
    },
    deleteUser(type, accountId) {
      this.$confirm('确认是否删除该用户?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteRiskControlToB(type, accountId).then(() => {
          this.fetchData()
        })
      })
    },
    handleSearch(searchForm) {
      this.searchForm = { ...searchForm }
      this.pages.current = 1
      this.fetchData()
    },
    handlePageChange(pages) {
      this.pages = pages
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped></style>
