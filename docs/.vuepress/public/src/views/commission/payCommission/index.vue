<template>
  <page-container>
    <div class="studio">
      <search-form :list="searchList" @on-search="handleSearch" />
      <block-container>
        <XBTable
          title="批量打款管理"
          :columns="tableColumns"
          :data="tableData"
          :total="pageTotal"
          @on-page-change="handlePageChange"
        >
          <template v-slot:handle>
            <div v-if="checkPermission('payCommission-importKey')">
              <el-button type="primary" plain @click="handleImport('ONLINE')" v-if="isOnlinePay"
                ><i class="iconfont xbicon-Import"></i> 导入名单</el-button
              >
              <el-button type="primary" plain v-if="isOfflinePay" @click="handleImport('OFFLINE')">
                <i class="iconfont xbicon-Import"></i> 导入线下发放数据
              </el-button>
            </div>
          </template>
        </XBTable>
      </block-container>
    </div>
    <!-- 批量导入 -->
    <dialog-commission-import ref="payImportDialog" />
    <!-- 余额不足提醒 -->
    <dialog-balance-not-enough ref="balanceTipDialog" />
    <!-- 重发数据确认 -->
    <dialog-confirm-repay ref="confirmRepayDialog" />
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'
import BasePage from '@/mixins/BasePage'
import PageMixin from '@/mixins/Page'
import { mapGetters } from 'vuex'
import { PROJECT_STATUS } from '@/maps/enum'
import { commissionSearchItems, getCommissionTableCols } from './config'
import {
  queryPayrollList,
  checkImportPayStatus,
  deletePayrollData,
  checkIsEnoughForBalance,
  cancelRepay
  // rePay
} from '@/apis/payroll'

export default {
  name: 'PayCommission',
  components: {
    SearchForm,
    XBTable,
    DialogCommissionImport: () => import('./components/DialogCommissionImport'),
    DialogBalanceNotEnough: () => import('./components/DialogBalanceNotEnough'),
    DialogConfirmRepay: () => import('./components/DialogConfirmRepay')
  },
  mixins: [BasePage, PageMixin],
  data() {
    return {
      searchForm: {},
      searchList: [...commissionSearchItems],
      tableColumns: [],
      tableData: [],
      pageTotal: 0,
      PROJECT_STATUS
    }
  },
  computed: {
    ...mapGetters(['userProject', 'payChanels', 'userInfo', 'userRoles']),
    isOnlinePay() {
      return (
        this.userProject.projectStatus &&
        this.userProject.projectStatus.value !== PROJECT_STATUS['停用'] &&
        !this.payChanels.find(item => item.value === 'OFFLINE')
      )
    },
    isOfflinePay() {
      return (
        this.userProject.projectStatus &&
        this.userProject.projectStatus.value !== PROJECT_STATUS['停用'] &&
        this.payChanels.find(item => item.value === 'OFFLINE')
      )
    }
  },
  mounted() {
    this.tableColumns = getCommissionTableCols(this)
    this.getInitTableData()
  },
  methods: {
    async getInitTableData(data) {
      const formData = data || this.searchForm
      const {
        data: { records, total }
      } = await queryPayrollList({ ...formData, ...this.pages })
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
    // 导入
    async handleImport(type) {
      const { data } = await checkImportPayStatus()
      // 没有导入数据
      if (!data) {
        this.$refs.payImportDialog.show(type)
      } else {
        // 有导入数据了
        this.$router.push({
          name: 'HandleToPay',
          query: { batchNo: data.batchNo }
        })
      }
    },
    // initDetailData({ batchNo }) {
    //   this.$router.push({
    //     name: 'PayBatchDetail',
    //     query: { batchNo: batchNo }
    //   })
    // },
    // 付款
    async goToPay({ batchNo }) {
      const {
        data: { canPay }
      } = await checkIsEnoughForBalance(batchNo)
      if (canPay) {
        this.$router.push({
          name: 'PassToPay',
          query: {
            batchNo: batchNo
          }
        })
      } else {
        this.$refs.balanceTipDialog.show(batchNo)
      }
    },
    // 删除
    handleDeleteBatchRow({ batchNo }) {
      this.$confirm('您确定要删除当前数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // eslint-disable-next-line
      }).then(async () => {
        const { code } = await deletePayrollData(batchNo)
        if (code === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getInitTableData()
        }
      })
    },
    // 重发
    async handleRepay({ batchNo }) {
      this.$refs.confirmRepayDialog.show(batchNo)
    },
    // 取消重发
    async handleCancelRepay({ batchNo }) {
      this.$confirm('您确定放弃重发吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // eslint-disable-next-line
      }).then(async () => {
        const { code } = await cancelRepay(batchNo)
        if (code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getInitTableData()
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
