<template>
  <page-container>
    <search-form :list="searchList" @on-search="handleSearch" />
    <block-container>
      <XBTable
        title="待处理任务管理"
        :columns="tableColumns"
        :data="tableData"
        :total="total"
        :onRowKey="changeRowKey"
        @on-page-change="handlePageChange"
        @on-selection-change="handleSelectionChange"
        v-loading="isLoading"
      >
        <template v-slot:handle>
          <el-button
            type="primary"
            v-if="checkPermission('taskPending-batchFinish')"
            plain
            @click="toCompleteTask"
            :disabled="!tableData.length"
          >
            <i class="iconfont xbicon-complete"></i>
            批量完成
          </el-button>
          <el-button
            type="primary"
            v-if="checkPermission('taskPending-export')"
            plain
            @click="exportExcel"
            :disabled="!tableData.length"
          >
            <i class="iconfont xbicon-download1"></i>
            导出名单
          </el-button>
        </template>
      </XBTable>
    </block-container>
    <dialog-task-detail ref="DialogTaskDetail"></dialog-task-detail>
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import Page from '@/mixins/Page'
import SearchForm from '_c/SearchForm'
import XBTable from '_c/XBTable'
import DialogTaskDetail from '../taskRoster/DialogTaskDetail'
import { getTableCols, searchItems } from './config'
import { getUserList, verifyUsetTaskResult, exportExcel, deleteUser } from '@/apis/taskManage'
import { downloadBlobFile } from '@/utils/download-blob-file'
import { TASK_STATUS } from '../config'
import { SIGN_STATUS } from '@/maps/enum'

export default {
  name: 'TaskManage',
  components: {
    XBTable,
    SearchForm,
    DialogTaskDetail
  },
  mixins: [BasePage, Page],
  data() {
    return {
      searchList: [...searchItems],
      isLoading: false,
      total: 0,
      tableData: [],
      tableColumns: [],
      searchForm: {},
      taskUsers: [],
      taskUserIds: []
    }
  },
  mounted() {
    this.tableColumns = getTableCols(this)
    this.fetchData()
  },
  methods: {
    handleSelectionChange(selectedRow) {
      this.taskUsers = selectedRow
    },
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
      getUserList({
        ...this.searchForm,
        taskId: this.taskId,
        taskStatus: [TASK_STATUS['已接单']],
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
    exportExcel() {
      exportExcel({
        taskId: this.taskId,
        taskStatus: [TASK_STATUS['已接单']]
      }).then(res => {
        downloadBlobFile(res)
      })
    },
    removeTaskUser(id) {
      this.$confirm('请问是否移除该客户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteUser(id).then(res => {
          if (res.data) {
            this.$message.success('移除成功')
            this.fetchData()
          }
        })
      })
    },
    // 根据数据自定义row-key
    changeRowKey(row, callback) {
      return callback(row.id)
    },
    toComplete(taskUser) {
      this.taskUsers = [taskUser]
      this.toCompleteTask()
    },
    toCompleteTask() {
      if (!this.taskUsers.length) {
        this.$message('请先选择数据')
      } else if (this.taskUsers.length === 1) {
        const user = this.taskUsers[0]
        if (user.signStatus.value !== SIGN_STATUS['已签约']) {
          this.$message('用户未签约')
        } else {
          this.$confirm('请确认是否变更用户状态为已完成？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            const taskUserIds = this.taskUsers.map(user => user.id)
            this.verifyUsetTaskResult(taskUserIds)
          })
        }
      } else {
        const canCompleteUsers = this.taskUsers.filter(user => user.signStatus.value === SIGN_STATUS['已签约'])
        const taskUserIds = canCompleteUsers.map(user => user.id)
        const canLen = canCompleteUsers.length
        const allLen = this.taskUsers.length
        if (canLen !== allLen) {
          this.$confirm(`${allLen - canLen}个用户未签约，请确认是否放弃变更未签约用户的任务状态？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            if (!canLen) return
            this.verifyUsetTaskResult(taskUserIds)
          })
        } else {
          this.verifyUsetTaskResult(taskUserIds)
        }
      }
    },
    verifyUsetTaskResult(taskUserIds) {
      verifyUsetTaskResult(taskUserIds).then(res => {
        if (res.data) {
          this.fetchData()
        }
      })
    },
    showDetail(taskId, signAccountId) {
      this.$refs.DialogTaskDetail.updateView(taskId, signAccountId)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
