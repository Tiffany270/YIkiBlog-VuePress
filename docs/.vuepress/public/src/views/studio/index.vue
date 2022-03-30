<template>
  <page-container>
    <div class="studio">
      <search-form :list="searchList" @on-search="handleSearch" />
      <block-container>
        <XBTable
          title="工作室列表"
          :columns="tableColumns"
          :data="tableData"
          :total="pageTotal"
          :onRowKey="changeRowKey"
          @on-page-change="handlePageChange"
        >
          <template v-slot:handle>
            <el-button
              type="primary"
              v-if="checkPermission('studioManage-export')"
              plain
              @click="handleExportStudio"
              :disabled="!tableData.length"
              ><i class="iconfont xbicon-download2-x"></i> 导出数据</el-button
            >
            <el-button type="primary" v-if="checkPermission('studioManage-add')" plain @click="handleAddStudio"
              ><i class="iconfont xbicon-new"></i> 单个设立工作室</el-button
            >
            <el-button
              type="primary"
              v-if="checkPermission('studioManage-batchSetting')"
              plain
              @click="handleBatchUploadStudios"
              ><i class="iconfont xbicon-Import"></i> 批量设立工作室</el-button
            >
          </template>
        </XBTable>
      </block-container>
      <!-- 详情 -->
      <studio-detail ref="dialogStudioDetail" @on-success="getInitTableData()" />
      <!-- 新增 -->
      <create-studio ref="dialogStudioEdit" @on-success="getInitTableData()" />
      <!-- 批量导入 -->
      <dialog-batch-import-studio ref="dialogUploadStudio" @on-success="getInitTableData()" />
      <!-- 导入失败数据 -->
      <dialog-studio-import-fail ref="dialogStudioFail" />
    </div>
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'
import StudioDetail from './detail/index'
import CreateStudio from './edit/index'
import DialogBatchImportStudio from './components/DialogBatchImportStudio/index'
import { studioSearchItems, getStudioTableCols } from './config'
import { downloadBlobFile } from '@/utils/download-blob-file'
import { queryStudioList, smsNotice, exportStudioData } from '@/apis/studio'
import PageMixin from '@/mixins/Page'
import BasePage from '@/mixins/BasePage'
export default {
  name: 'StudioManage',
  mixins: [PageMixin, BasePage],
  components: {
    SearchForm,
    XBTable,
    StudioDetail,
    CreateStudio,
    DialogBatchImportStudio,
    DialogStudioImportFail: () => import('./components/DialogStudioImportFail')
  },
  data() {
    return {
      searchForm: {},
      searchList: [...studioSearchItems],
      tableColumns: [],
      tableData: [],
      pageTotal: 0,
      isDetailVisible: false,
      isCreateStudioVisible: false,
      isBatchUploadVisible: false
    }
  },
  mounted() {
    this.tableColumns = getStudioTableCols(this)
    this.getInitTableData()
  },
  methods: {
    // 根据数据自定义row-key
    changeRowKey(row, callback) {
      return callback(row.id)
    },
    // 查询
    handleSearch(data) {
      this.searchForm = { ...data }
      this.pages.current = 1
      this.getInitTableData(data)
    },
    // 获取列表数据
    async getInitTableData(data) {
      const formData = data || this.searchForm
      const {
        data: { records, total }
      } = await queryStudioList({
        ...formData,
        ...this.pages
      })
      this.tableData = records
      this.pageTotal = total
    },
    handlePageChange(data) {
      this.pages = data
      this.getInitTableData()
    },
    initDetailData({ id }) {
      this.$refs.dialogStudioDetail.updateView(id)
    },
    // 发信息
    sendSms({ id }) {
      this.$confirm('确认发送短信吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // eslint-disable-next-line prettier/prettier
      }).then(async() => {
        const { code } = await smsNotice({ id })
        if (code === 0) {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
        }
      })
    },
    // 新增
    handleAddStudio() {
      this.$refs.dialogStudioEdit.updateView()
    },
    // 批量导入
    async handleBatchUploadStudios() {
      this.$refs.dialogUploadStudio.updateView()
    },
    // 导入成功
    // handleUploadSuccess(data) {
    //   if (data && data.length) {
    //     this.$refs.dialogStudioFail.show(data)
    //   } else {
    //     this.getInitTableData()
    //   }
    // },
    // 导出
    async handleExportStudio() {
      const res = await exportStudioData({ ...this.searchForm })
      downloadBlobFile(res)
    }
  }
}
</script>
