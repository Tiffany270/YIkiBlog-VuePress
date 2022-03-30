<template>
  <page-container>
    <div class="invoice">
      <search-form :list="searchList" @on-search="handleSearch" />
      <block-container>
        <XBTable
          title="开票管理"
          :columns="tableColumns"
          :data="tableData"
          :total="pageTotal"
          @on-page-change="handlePageChange"
        >
          <template v-slot:handle>
            <el-dropdown @command="handleAddInvoice">
              <el-button type="primary" plain v-if="checkPermission('invoiceManage-add')">
                <i class="iconfont xbicon-new"></i>
                新增开票<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="bill">按账单</el-dropdown-item>
                <el-dropdown-item command="pre">预开票</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </XBTable>
      </block-container>
    </div>
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'
import { invoiceSearchItems, getInvoiceTableColumns } from './config'
import BasePage from '@/mixins/BasePage'
import PageMixin from '@/mixins/Page'
import { queryInvoiceList, revokeInvoiceRow, queryCanPreInvoice } from '@/apis/invoice'
export default {
  name: 'InvoiceManage',
  components: {
    SearchForm,
    XBTable
  },
  mixins: [BasePage, PageMixin],
  data() {
    return {
      searchList: [...invoiceSearchItems],
      tableColumns: [],
      tableData: [],
      pageTotal: 0
    }
  },
  mounted() {
    this.tableColumns = getInvoiceTableColumns(this)
    this.getInitTableData()
  },
  methods: {
    async getInitTableData(data) {
      const formData = data || this.searchForm
      const {
        data: { records, total }
      } = await queryInvoiceList({ ...formData, ...this.pages })
      this.tableData = records || []
      this.pageTotal = total || 0
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
    // 新增开票
    async handleAddInvoice(val) {
      /* eslint-disable*/
      if (val === 'pre') {
        const res = await queryCanPreInvoice()
        if (res.code === 0) {
          typeof res.data === 'boolean' && !res.data ? this.$message.warning('当前项目还存在账单未开票，请优先使用账单开票！') : this.$router.push({
            name: 'SubmitInvoice',
            query: {
              source: 'pre'
            }
         })
        }
        return
      }
      this.$router.push({ name: 'Bill' })
    },
    // 查看详情
    goToDetail({ id }) {
      this.$router.push({
        name: 'InvoiceDetail',
        query: {
          id
        }
      })
    },
    // 撤销
    async handleRevokeInvoice(id) {
      this.$confirm('您确定要撤销当前开票申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // eslint-disable-next-line
      }).then(async () => {
        const { code } = await revokeInvoiceRow(id)
        if (code === 0) {
          this.$message({
            type: 'success',
            message: '撤销成功'
          })
          this.getInitTableData()
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
