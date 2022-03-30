<template>
  <page-container show-go-back>
    <div class="check">
      <template v-if="pageStatus === 2">
        <block-container>
          <XBTable :columns="tableColumns" :data="tableData" :total="pageTotal" @on-page-change="handlePageChange">
            <template v-slot:tab>
              <el-tabs v-model="type" @tab-click="fetchDataWithPaginationReset">
                <el-tab-pane :label="'校验失败(' + failCount + ')'" name="fail" />
                <el-tab-pane :label="'校验成功(' + successCount + ')'" name="success" />
              </el-tabs>
            </template>
            <template v-slot:handle>
              <el-button style="visibility: hidden" disabled>占位</el-button>
              <template v-if="type === 'fail'">
                <el-button
                  :loading="exportLoading"
                  :disabled="!tableData.length"
                  @click="exportFailedExcel"
                  type="primary"
                  plain
                >
                  <i class="iconfont xbicon-download1"></i>
                  导出失败数据</el-button
                >
              </template>
            </template>
          </XBTable>
        </block-container>
      </template>
      <template v-else-if="pageStatus === 1">
        <div class="progress-box">
          <progress-loading :percentage="percentage" />
          <h4>数据准备中...</h4>
          <p class="animated">{{ hintText }}</p>
          <el-button size="mini" type="primary" @click="stopImport">放弃上传</el-button>
        </div>
      </template>
    </div>
    <template v-if="pageStatus === 2" v-slot:bottomBarRight>
      <el-button @click="stopImport" plain>放弃上传</el-button>
      <el-button @click="submit" :disabled="!successCount" plain>立刻提交</el-button>
    </template>
  </page-container>
</template>

<script>
import XBTable from '_c/XBTable/index.vue'

import { failedCols, successedCols } from './config.js'
import {
  batchUploadProcess,
  getCheckPage,
  exportFailedExcel,
  operateUploadResult,
  uploadCount
} from '@/apis/taskManage'
import progressLoading from './component/progressLoading'
import BasePage from '@/mixins/BasePage'
import PageMixin from '@/mixins/Page'
import { downloadBlobFile } from '@/utils/handleDownload'

export default {
  name: 'SignManage',
  components: {
    XBTable,
    progressLoading
  },
  mixins: [BasePage, PageMixin],
  data() {
    return {
      taskId: '',
      tableColumns: [],
      tableData: [],
      failCount: 0,
      successCount: 0,
      tableKey: 0,
      type: 'fail',
      pageStatus: 2,
      percentage: 10, // 进度
      selectionList: [],
      pageTotal: 0,
      hintText: '数据上传过程中您可离开此页面，数据将在后台继续完成上传',
      successFlag: false,
      idx: 0,
      uploadDisabled: true,
      exportLoading: false
    }
  },
  created() {
    this.key = this.$route.query.key
    this.taskId = this.$route.query.taskId
  },
  mounted() {
    this.checkInitStatus()
    this.successFlag = false
    this.tableColumns = failedCols
  },
  watch: {
    type: {
      handler(val) {
        switch (val) {
          case 'fail':
            this.successFlag = false
            this.handleSearch()
            this.tableColumns = failedCols
            break
          case 'success':
            this.successFlag = true
            this.tableColumns = successedCols
            this.handleSearch()
            break
        }
      }
    }
  },
  methods: {
    handleSearch() {
      this.pages.current = 1
      this.fetchDataGet()
    },
    handlePageChange(data) {
      this.pages = data
      this.fetchDataGet()
    },
    exportFailedExcel() {
      this.exportLoading = true
      exportFailedExcel({ taskId: this.taskId })
        .then(data => {
          downloadBlobFile(data)
          this.exportLoading = false
        })
        .catch(() => {
          this.exportLoading = false
        })
    },
    checkInitStatus() {
      if (this.key) {
        this.batchUploadProcess()
      } else {
        this.uploadCount()
      }
    },
    batchUploadProcess() {
      batchUploadProcess({ taskId: this.taskId })
        .then(({ data }) => {
          if (data && data.total) {
            if (data.current < data.total || data.status.value !== 'DONE') {
              this.pageStatus = 1
              this.percentage = parseFloat(((data.current / data.total) * 100).toFixed(1))
              this.timerId = setTimeout(() => {
                // 加上轮训，防止出现卡死情况
                this.checkInitStatus()
              }, 1000)
            } else {
              this.pageStatus = 2
              this.uploadCount()
            }
          } else {
            // 总数没值时回到列表
            this.goBack()
          }
        })
        .catch(() => {
          this.goBack()
        })
    },
    uploadCount() {
      uploadCount({ taskId: this.taskId }).then(({ data }) => {
        this.failCount = data.failCount
        this.successCount = data.successCount
        if (this.failCount === 0) {
          // 没有失败时，跳转到成功页面
          this.type = 'success'
        } else {
          this.fetchDataGet()
        }
      })
    },
    goBack() {
      this.$router.back()
    },
    fetchDataWithPaginationReset() {
      this.tableKey = Math.random()
    },
    fetchDataGet() {
      getCheckPage({
        ...this.pages,
        taskId: this.taskId,
        status: this.successFlag ? 'SUCCESS' : 'FAIL'
      }).then(({ data }) => {
        this.tableData = data.records
        this.pageTotal = data.total
      })
    },
    stopImport() {
      this.$confirm('请确认是否取消上传任务名单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        operateUploadResult({ taskId: this.taskId, status: 'CANCEL' }).then(() => {
          this.$message.success('取消成功')
          this.goBack()
        })
      })
    },
    submit() {
      if (this.failCount) {
        this.$confirm(`存在${this.failCount}条校验失败数据，请确认是否放弃提交校验失败的数据？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          const msg = this.$message({
            type: 'info',
            message: '正在处理中……',
            duration: 0
          })
          operateUploadResult({ taskId: this.taskId, status: 'CONFIRM' })
            .then(() => {
              msg.close()
              this.$message.success('提交成功')
              this.gotoConfirm()
            })
            .catch(() => {
              msg.close()
            })
        })
      } else {
        operateUploadResult({ taskId: this.taskId, status: 'CONFIRM' }).then(() => {
          this.$message.success('提交成功')
          this.gotoConfirm()
        })
      }
    },
    gotoConfirm() {
      this.$router.replace({
        name: 'TaskRosterSubmit',
        query: {
          key: this.key,
          taskId: this.taskId
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '@/styles/index';
/deep/.xb-table__title {
  padding: 0;
}
@include b(check) {
  height: 98%;
  .el-tabs {
    position: absolute;
    top: 15px;
    left: 0;
  }
  @include e(styleTitle) {
    display: inline-block;
  }
  @include e(titleText) {
    margin-right: 20px;
  }
}
.tips {
  text-align: center;
  h4 {
    font-weight: 500;
    // color: $color-text-main;
    line-height: 24px;
    // font-size: $title-fsz;
    &:before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      // background: url('/static/images/icon_prompt.png') center no-repeat;
      position: relative;
      left: -10px;
      vertical-align: bottom;
    }
  }
}
.progress-box {
  background: #fff;
  text-align: center;
  height: 100%;
  .el-progress.el-progress--circle {
    margin-top: 150px;
  }
  h4 {
    margin: 30px 0;
    font-size: 16px;
  }
  .animated {
    // color: $color-text-not-important;
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    margin: 0 auto;
    padding: 10px 0;
    width: 500px;
    margin-bottom: 30px;
    border-radius: 8px;
  }
}
</style>
