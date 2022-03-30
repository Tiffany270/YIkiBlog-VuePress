<template>
  <block-container>
    <div class="valid-result">
      <el-tabs v-model="currentResult" @tab-click="handleChangeTabs">
        <el-tab-pane :label="`校验失败(${failCount}条)`" name="FAIL">
          <div class="fail-handle">
            <el-button
              type="primary"
              plain
              size="mini"
              :disabled="!failTableData.length"
              @click="handleBatchDeleteFailData"
              v-preventReClick
              ><i class="iconfont xbicon-delete"></i> 删除失败数据</el-button
            >
            <el-button
              type="primary"
              plain
              size="mini"
              style="margin-right: 10px"
              :disabled="!failTableData.length"
              @click="handleExportFailData"
              v-preventReClick
              ><i class="iconfont xbicon-download1"></i> 导出失败数据</el-button
            >
            <file-uploader
              button-text="导入更正数据"
              :acceptType="UploadFileTypes.XLS"
              :isBtnDisabled="!failTableData.length"
              :requestParams="{ batchNo: batchNo }"
              :requestMethod="importEditPayrollData"
              @on-success="handleEditUploadSuccess"
            />
          </div>
          <XBTable
            :hasHandle="false"
            :columns="failColumns"
            :data="failTableData"
            :total="pageTotal"
            @on-page-change="handlePageChange"
            @on-selection-change="handleRowSelection"
          >
          </XBTable>
        </el-tab-pane>
        <el-tab-pane :label="`校验成功(${successCount}条)`" name="SUCCESS">
          <XBTable
            :hasHandle="false"
            :columns="successColumns"
            :data="successTableData"
            :total="pageTotal"
            @on-page-change="handlePageChange"
          >
          </XBTable>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 编辑弹框 -->
    <dialog-edit-payroll-fail-data ref="editFileForm" @on-edit-change="handleEditChange" />
  </block-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import XBTable from '_c/XBTable/index.vue'
import FileUploader from '_c/FileUploader'
// import DialogEditPayrollFailData from '../../components/DialogEditPayrollFailData'
import { getFailColumns, successColumns } from '../../../config'
import { queryImportResultData, deletePayOrder, exportFailPayrollData, importEditPayrollData } from '@/apis/payroll'
import PageMixin from '@/mixins/Page'
import { downloadBlobFile } from '@/utils/download-blob-file'
import { UploadFileTypes } from '@/maps/enums/UploadTypes'
export default {
  name: 'HandleValidResult',
  components: {
    XBTable,
    DialogEditPayrollFailData: () =>
      import(/* webpackChunkName: "DialogEditPayrollFailData" */ '../../components/DialogEditPayrollFailData'),
    FileUploader
  },
  mixins: [BasePage, PageMixin],
  props: {
    isInit: {
      type: Boolean,
      default: false
    },
    isValidating: {
      type: Boolean,
      default: false
    },
    isFetchingCount: {
      type: Boolean,
      default: false
    },
    batchNo: {
      type: String,
      default: ''
    },
    successCount: {
      type: Number,
      default: 0
    },
    failCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentResult: 'FAIL',
      resultQuery: {
        status: 'FAIL',
        batchNo: this.batchNo
      },
      failColumns: [],
      failTableData: [],
      successColumns,
      successTableData: [],
      pageTotal: 0,
      importEditPayrollData,
      selectedFailData: [],
      UploadFileTypes
    }
  },
  watch: {
    isFetchingCount(bool) {
      // 获取到数量 同时校验完成就要更新下列表结果数据
      if (!bool && !this.isValidating && !this.isInit) {
        if (this.failCount === 0) {
          this.resultQuery.status = 'SUCCESS'
          this.currentResult = 'SUCCESS'
        }
        this.fetchResultData()
      }
    },
    isValidating(bool) {
      // 校验完成，同时需要校验数据获取到之后再获取校验结果
      if (!bool && !this.isInit) {
        if (this.failCount === 0) {
          this.resultQuery.status = 'SUCCESS'
          this.currentResult = 'SUCCESS'
        }
        this.fetchResultData()
      }
    },
    failCount(val) {
      if (val === 0 && this.successCount === 0 && !this.isValidating) {
        this.$router.replace({ name: 'PayCommission' })
      }
    }
  },
  mounted() {
    this.failColumns = getFailColumns(this)
  },
  methods: {
    fetchResultData() {
      this.pages.current = 1
      this.getValidResultData()
    },
    // 获取校验后数据
    async getValidResultData() {
      const { data } = await queryImportResultData({
        ...this.resultQuery,
        ...this.pages
      })
      this.pageTotal = data.total
      if (this.resultQuery.status === 'SUCCESS') {
        this.successTableData = data.records || []
      } else {
        this.failTableData = data.records || []
      }
    },
    handleEdit(row) {
      this.$refs.editFileForm.show(row)
    },
    // 删除
    handleDeleteRowData({ batchNo, id }) {
      this.$confirm('您确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // eslint-disable-next-line
      }).then(async () => {
        const { code } = await deletePayOrder({ batchNo, orderIds: [id] })
        if (code === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$emit('on-change')
        }
      })
    },
    handleChangeTabs({ name }) {
      this.resultQuery.status = name
      this.fetchResultData()
    },
    handlePageChange(data) {
      this.pages = data
      this.getValidResultData()
    },
    async handleRowSelection(selection) {
      this.selectedFailData = selection
    },
    // 批量删除
    handleBatchDeleteFailData() {
      const rowList = this.selectedFailData
      if (!rowList.length) {
        this.$message({
          type: 'warning',
          message: '请选择您要删除的数据？'
        })
        return
      }
      const orderIds = rowList.map(item => item.id)
      this.$confirm('您确定批量删除选中数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // eslint-disable-next-line
      }).then(async () => {
        const { code } = await deletePayOrder({
          batchNo: this.batchNo,
          orderIds
        })
        if (code === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$emit('on-change')
        }
      })
    },
    // 编辑成功
    handleEditChange() {
      this.$emit('on-change')
    },
    // 导入更正数据
    async handleExportFailData() {
      const res = await exportFailPayrollData({ batchNo: this.batchNo })
      downloadBlobFile(res)
    },
    // 导入更正成功
    handleEditUploadSuccess() {
      // this.resultQuery.status = 'SUCCESS'
      // this.currentResult = 'SUCCESS'
      this.$emit('on-change')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.fail-handle {
  margin-bottom: 10px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
}
</style>
