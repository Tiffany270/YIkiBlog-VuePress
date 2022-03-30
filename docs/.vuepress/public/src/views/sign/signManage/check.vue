<template>
  <page-container show-go-back>
    <div class="check">
      <template v-if="pageStatus === 2">
        <search-form :list="searchList" @on-search="handleSearch" />
        <!-- <styled-title class="check__styleTitle">协议名称：</styled-title>
        <span class="check__titleText"
          >133
          <a href="">查看协议</a>
        </span>
        <styled-title class="check__styleTitle">签约合同数：</styled-title>
        <span class="check__titleText">133</span> -->
        <block-container>
          <XBTable
            :columns="tableColumns"
            :data="tableData"
            :total="pageTotal"
            @on-page-change="handlePageChange"
            @on-selection-change="selectionChange"
          >
            <template v-slot:tab>
              <el-tabs v-model="type" @tab-click="fetchDataWithPaginationReset">
                <el-tab-pane :label="'校验失败(' + failCount + ')'" name="fail" />
                <el-tab-pane :label="'校验成功(' + successCount + ')'" name="success" />
              </el-tabs>
            </template>
            <template v-slot:handle>
              <el-button style="visibility: hidden" disabled>占位</el-button>
              <template v-if="type === 'fail'">
                <el-button :disabled="!selectionList.length" @click="delMsg()" plain>批量删除</el-button>
                <el-button :loading="exportLoading" :disabled="!tableData.length" @click="exportSignTem()" plain>
                  <i class="iconfont xbicon-download1"></i>
                  导出失败数据</el-button
                >
                <!-- <el-button
                  :disabled="!tableData.length"
                  @click="downloadResult"
                  type="primary"
                  plain
                  >导入更正数据</el-button
                > -->
                <fileUploader
                  :normal-method="uploadList"
                  :btn-disabled="!tableData.length"
                  accept=".xlsx,.xls"
                  again-file="导入更正数据"
                  style="display: inline-block; margin: 0 10px"
                  tip=""
                  no-success-hint
                  undownloadable
                />
              </template>
              <!-- <el-button @click="stopImport()" plain>放弃上传</el-button>
              <el-button @click="submit()" plain>立刻提交</el-button> -->
            </template>
          </XBTable>
        </block-container>
      </template>
      <template v-else-if="pageStatus === 1">
        <div class="progress-box">
          <progress-loding :percentage="percentage" />
          <h4>数据准备中...</h4>
          <p class="animated">{{ hintText }}</p>
          <el-button size="mini" type="primary" @click="stopImport">放弃上传</el-button>
        </div>
      </template>
    </div>
    <template v-if="pageStatus === 2" v-slot:bottomBarRight>
      <el-button @click="stopImport()" plain>放弃上传</el-button>
      <el-button @click="submit()" :disabled="!successCount" plain>立刻提交</el-button>
    </template>
    <dialog-edit ref="DialogEdit" @after-submit="fetchDataGet" />
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'
import fileUploader from '_c/FileUploader1'

import {
  signManageListSearchItems,
  signManageListTableCols,
  signManageListTableColsSuccess
} from './component/config.js'
import DialogEdit from './component/DialogEdit.vue'
// import StyledTitle from '_c/StyledTitle/index.vue'
import {
  getSignProcess,
  getSignTem,
  getExtraMessage,
  delSignTem,
  importEditSignTem,
  exportSignTem,
  cancelSignTem,
  addSignAccount
} from '@/apis/signManage'
import progressLoding from './component/progressLoding'
import BasePage from '@/mixins/BasePage'
import PageMixin from '@/mixins/Page'
import { downloadBlobFile } from '@/utils/handleDownload'
import { mapGetters } from 'vuex'

export default {
  name: 'SignManage',
  components: {
    SearchForm,
    XBTable,
    DialogEdit,
    // StyledTitle,
    progressLoding,
    fileUploader
  },
  mixins: [BasePage, PageMixin],
  data() {
    return {
      searchList: [...signManageListSearchItems],
      tableColumns: [],
      tableData: [],
      failCount: 0,
      successCount: 0,
      tableKey: 0,
      type: 'fail',
      pageStatus: 0,
      percentage: 10, // 进度
      selectionList: [],
      pageTotal: 0,
      hints: [
        '校验失败的数据，你可以编辑后再次提交校验，也可删除',
        '数据上传过程中您可离开此页面，数据将在后台继续完成上传'
      ],
      searchForm: {},
      idx: 0,
      uploadDisabled: true,
      exportLoading: false,
      isFirst: true
    }
  },
  mounted() {
    this.checkInitStatus()
    this.searchForm.successFlag = false
    this.tableColumns = signManageListTableCols(this)
  },
  watch: {
    type: {
      // immediate: true,
      handler(val) {
        switch (val) {
          case 'fail':
            this.searchForm.successFlag = false
            this.handleSearch()
            this.tableColumns = signManageListTableCols(this)
            break
          case 'success':
            this.searchForm.successFlag = true
            this.tableColumns = signManageListTableColsSuccess()
            this.handleSearch()
            break
        }
      }
    }
  },
  computed: {
    ...mapGetters(['projectId']),
    hintText() {
      const currIdx = this.idx % this.hints.length
      return this.hints[currIdx]
    }
  },
  methods: {
    handleSearch(data) {
      this.searchForm = { ...data, successFlag: this.searchForm.successFlag }
      this.pages.current = 1
      this.fetchDataGet()
    },
    handlePageChange(data) {
      this.pages = data
      this.fetchDataGet()
    },
    // 上传文件
    uploadList(file) {
      return new Promise((resolve, reject) => {
        importEditSignTem({
          projectId: this.projectId,
          file
        })
          .then(() => {
            resolve('1')
            this.fetchDataGet()
          })
          .catch(() => {
            reject()
          })
      })
    },
    exportSignTem() {
      this.exportLoading = true
      exportSignTem(this.projectId)
        .then(data => {
          downloadBlobFile(data)
          this.exportLoading = false
        })
        .catch(() => {
          this.exportLoading = false
        })
    },
    startCarousel() {
      this.timerId = setInterval(() => {
        setTimeout(() => {
          this.idx++
        }, 500)
      }, 5000)
    },
    checkInitStatus() {
      getSignProcess(this.projectId)
        .then(({ data }) => {
          if (data && data.total) {
            if (data.current < data.total) {
              this.pageStatus = 1
              this.percentage = parseFloat(((data.current / data.total) * 100).toFixed(1))
              this.startCarousel()
              this.timerId = setTimeout(() => {
                // 加上轮训，防止出现卡死情况
                this.checkInitStatus()
              }, 5000)
            } else {
              this.pageStatus = 2
              this.$nextTick(() => {
                this.fetchDataGet()
              })
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
    goBack() {
      this.$router.push({ name: 'SignManage' })
    },
    fetchDataWithPaginationReset() {
      this.tableKey = Math.random()
    },
    fetchDataGet() {
      getSignTem({
        ...this.searchForm,
        ...this.pages,
        projectId: this.projectId
      }).then(({ data }) => {
        this.tableData = data.records
        this.pageTotal = data.total
      })
      getExtraMessage(this.projectId).then(({ data }) => {
        this.failCount = data.errorSize
        this.successCount = data.successSize
        if (!data.errorSize && !data.successSize) {
          this.goBack()
        } else if (this.failCount === 0 && this.isFirst) {
          // 第一次没有失败时，跳转到成功页面
          this.type = 'success'
        }
        this.isFirst = false
      })
    },
    selectionChange(selection) {
      // if (val.length) {
      //   this.canDel = true
      // } else {
      //   this.canDel = false
      // }
      this.selectionList = selection
    },
    stopImport() {
      this.$confirm('确认放弃本批次导入?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        cancelSignTem(this.projectId).then(() => {
          this.goBack()
        })
      })
    },
    // restart() {
    //   // cancelSign().then(() => {
    //   this.$router.go(-1)
    //   // })
    // },
    submit() {
      if (this.failCount) {
        this.$confirm('还有数据未校验成功，确定放弃该数据并提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '返回修改'
        }).then(() => {
          const msg = this.$message({
            type: 'info',
            message: '正在处理中……',
            duration: 0
          })
          addSignAccount({ projectId: this.projectId })
            .then(() => {
              msg.close()
              this.$router.replace({
                name: 'SubmitConfirm'
              })
            })
            .catch(() => {
              msg.close()
            })
        })
      } else {
        addSignAccount({ projectId: this.projectId }).then(() => {
          this.$router.replace({
            name: 'SubmitConfirm'
          })
        })
      }
    },
    delMsg(ids) {
      this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const msg = this.$message({
          type: 'info',
          message: '正在处理中……',
          duration: 0
        })
        const form = {
          ids,
          projectId: this.projectId
        }
        delSignTem(form)
          .then(() => {
            msg.close()
            this.fetchDataGet()
          })
          .catch(() => {
            msg.close()
          })
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/index';
@include b(check) {
  height: 98%;
  // .el-tabs {
  //   position: absolute;
  //   top: px;
  //   left: 0;
  // }
  .xb-table__title {
    height: auto;
    padding: 0;
    .el-tabs__header {
      margin: 0;
    }
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
