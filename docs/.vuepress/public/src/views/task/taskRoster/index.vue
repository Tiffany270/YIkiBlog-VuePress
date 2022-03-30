<template>
  <page-container show-go-back>
    <search-form :list="searchList" @on-search="handleSearch" />
    <block-container>
      <XBTable
        title="任务名单"
        :columns="tableColumns"
        :data="tableData"
        :total="total"
        @on-page-change="handlePageChange"
        v-loading="isLoading"
      >
        <template v-slot:handle>
          <el-button type="primary" plain @click="toUploadRoster">
            <i class="iconfont xbicon-Import"></i>
            上传任务名单</el-button
          >
          <el-button type="primary" plain @click="exportExcel" :disabled="!tableData.length">
            <i class="iconfont xbicon-download1"></i>
            导出数据
          </el-button>
        </template>
      </XBTable>
    </block-container>
    <dialog-upload-roster ref="DialogUploadRoster" :taskId="taskId"></dialog-upload-roster>
    <dialog-task-detail ref="DialogTaskDetail"></dialog-task-detail>
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import Page from '@/mixins/Page'
import SearchForm from '_c/SearchForm'
import XBTable from '_c/XBTable'
import DialogUploadRoster from './DialogUploadRoster'
import DialogTaskDetail from './DialogTaskDetail'
import { getUserList, exportExcel, deleteUser, batchUploadProcess } from '@/apis/taskManage'
import { downloadBlobFile } from '@/utils/download-blob-file'
import { getTableCols, searchItems } from './config'
import { TASK_STATUS } from '../config'

export default {
  name: 'TaskManage',
  components: {
    XBTable,
    SearchForm,
    DialogUploadRoster,
    DialogTaskDetail
  },
  mixins: [BasePage, Page],
  data() {
    return {
      taskId: '',
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
  created() {
    this.taskId = this.$route.query.id
  },
  mounted() {
    this.tableColumns = getTableCols(this)
    this.fetchData()
  },
  methods: {
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
        taskId: this.taskId,
        ...this.searchForm,
        ...this.pages,
        taskStatus: [TASK_STATUS['待接单'], TASK_STATUS['已完成']]
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
      this.$router.push({
        name: 'EditTask',
        query: { isEditStatus: true }
      })
    },
    exportExcel() {
      exportExcel({
        taskId: this.taskId,
        ...this.searchForm,
        taskStatus: [TASK_STATUS['待接单'], TASK_STATUS['已完成']]
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
    toUploadRoster() {
      this.batchUploadProcess()
    },
    batchUploadProcess() {
      batchUploadProcess({ taskId: this.taskId }).then(({ data }) => {
        if (!data) {
          this.$refs.DialogUploadRoster.updateView()
        } else {
          this.$confirm('任务名单导入未完成，是否进入？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            const status = data.submitStatusEnum.value
            if (status === 'NOT_SUBMIT') {
              this.$router.push({
                name: 'TaskRosterCheck',
                query: {
                  taskId: this.taskId
                }
              })
            } else {
              this.$router.push({
                name: 'TaskRosterSubmit',
                query: {
                  taskId: this.taskId
                }
              })
            }
          })
        }
      })
    },
    showDetail(taskId, signAccountId) {
      this.$refs.DialogTaskDetail.updateView(taskId, signAccountId)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/deep/.xb-table__title--right {
  display: flex;
  .file-uploader {
    margin-right: 15px;
  }
}
</style>
