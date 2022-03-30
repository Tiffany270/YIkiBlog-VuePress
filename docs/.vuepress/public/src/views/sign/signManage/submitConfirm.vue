<template>
  <page-container :key="pageStatus">
    <div class="check">
      <template v-if="pageStatus === 2">
        <search-form :list="searchList" @on-search="handleSearch" />
        <block-container>
          <XBTable :columns="tableColumns" :data="tableData" :total="pageTotal" @on-page-change="handlePageChange">
            <template v-slot:tab>
              <el-tabs v-model="type" @tab-click="fetchDataWithPaginationReset">
                <el-tab-pane :label="'提交失败(' + failCount + ')'" name="fail" />
                <el-tab-pane :label="'提交成功(' + successCount + ')'" name="success" />
              </el-tabs>
            </template>
            <template v-slot:handle>
              <el-button style="visibility: hidden" disabled>占位</el-button>
              <template v-if="type === 'fail'">
                <el-button :loading="exportLoading" :disabled="!tableData.length" @click="exportSignTem()" plain>
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
          <progress-loding :percentage="percentage" />
          <h4>数据准备中...</h4>
          <p class="animated">{{ hints }}</p>
        </div>
      </template>
    </div>
    <template v-if="pageStatus === 2" v-slot:bottomBarRight>
      <el-button @click="submit()" plain>完成</el-button>
    </template>
    <dialog-edit ref="DialogEdit" @after-submit="fetchDataGet" />
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'

import { signManageListSearchItems, getSubmitFailList, getSubmitSuccessList } from './component/config.js'
import DialogEdit from './component/DialogEdit.vue'
import { getSignProcess, getSignTem, getExtraMessage, exportSignTem, endSubmit } from '@/apis/signManage'
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
    progressLoding
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
      pageTotal: 0,
      hints: '数据提交过程中您可离开此页面，数据将在后台继续完成提交',
      searchForm: {},
      uploadDisabled: true,
      exportLoading: false,
      isFirst: true
    }
  },
  mounted() {
    this.checkInitStatus()
    this.searchForm.successFlag = false
    this.tableColumns = getSubmitFailList(this)
  },
  watch: {
    type: {
      handler(val) {
        switch (val) {
          case 'fail':
            this.searchForm.successFlag = false
            this.handleSearch()
            this.tableColumns = getSubmitFailList(this)
            break
          case 'success':
            this.searchForm.successFlag = true
            this.tableColumns = getSubmitSuccessList()
            this.handleSearch()
            break
        }
      }
    }
  },
  computed: {
    ...mapGetters(['projectId'])
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
    checkInitStatus() {
      getSignProcess(this.projectId)
        .then(({ data }) => {
          if (data && data.totalSubmit) {
            if (data.currentSubmit < data.totalSubmit) {
              this.pageStatus = 1
              this.percentage = parseFloat(((data.currentSubmit / data.totalSubmit) * 100).toFixed(1))
              // this.startCarousel()
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
    // stopImport() {
    //   this.$confirm('确认放弃本批次导入?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消'
    //   }).then(() => {
    //     cancelSignTem(this.projectId).then(() => {
    //       this.goBack()
    //     })
    //   })
    // },
    submit() {
      if (this.failCount) {
        this.$confirm('点击确定后提交失败的数据会被清除，若有需要可先导出失败数据再点击完成！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '我再看看'
        }).then(() => {
          const msg = this.$message({
            type: 'info',
            message: '正在处理中……',
            duration: 0
          })
          endSubmit({ projectId: this.projectId })
            .then(() => {
              msg.close()
              this.goBack()
            })
            .catch(() => {
              msg.close()
            })
        })
      } else {
        endSubmit({ projectId: this.projectId }).then(() => {
          this.goBack()
        })
      }
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
  //   top: 8px;
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
