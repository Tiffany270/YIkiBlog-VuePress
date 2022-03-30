<template>
  <page-container>
    <div class="studio">
      <search-form :list="searchList" @on-search="handleSearch" />
      <block-container>
        <XBTable
          title="非内地名单管理"
          :columns="tableColumns"
          :data="tableData"
          :total="pageTotal"
          @on-page-change="handlePageChange"
        >
          <template v-slot:handle>
            <el-button type="primary" plain @click="exportNonMainlandList" :disabled="!tableData.length">
              <i class="iconfont xbicon-download1" v-if="checkPermission('nonMainlandList-export')"></i>
              导出数据
            </el-button>
            <el-button type="primary" plain @click="handleAdd" v-if="checkPermission('nonMainlandList-add')">
              <i class="iconfont xbicon-new"></i> 新增
            </el-button>
          </template>
        </XBTable>
      </block-container>
    </div>
    <!-- 新增 -->
    <dialog-add ref="DialogAdd" @after-submit="getInitTableData" />
    <!-- 编辑 -->
    <dialog-edit ref="DialogEdit" @after-submit="getInitTableData" />
    <!-- 详情 -->
    <dialog-detail ref="DialogDetail" />
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'
import BasePage from '@/mixins/BasePage'
import PageMixin from '@/mixins/Page'
import DialogAdd from './components/DialogAdd'
import DialogEdit from './components/DialogEdit'
import DialogDetail from './components/DialogDetail'
import { mapGetters } from 'vuex'
import { PROJECT_STATUS } from '@/maps/enum'
import { nonMainlandListSearchItems, getNonMainlandListTableCols } from './config'
import { getNonMainlandList, exportNonMainlandList } from '@/apis/signManage'
import { downloadBlobFile } from '@/utils/download-blob-file'

export default {
  name: 'PayCommission',
  components: {
    SearchForm,
    XBTable,
    DialogAdd,
    DialogEdit,
    DialogDetail
  },
  mixins: [BasePage, PageMixin],
  data() {
    return {
      searchForm: {},
      searchList: [...nonMainlandListSearchItems],
      tableColumns: [],
      tableData: [],
      pageTotal: 0,
      PROJECT_STATUS
    }
  },
  computed: {
    ...mapGetters(['userProject', 'payChanels']),
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
    this.tableColumns = getNonMainlandListTableCols(this)
    this.getInitTableData()
  },
  methods: {
    async getInitTableData() {
      const {
        data: { records, total }
      } = await getNonMainlandList({ ...this.searchForm, ...this.pages })
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
    initDetailData(id) {
      this.$refs.DialogDetail.updateView(id)
    },
    handleAdd() {
      this.$refs.DialogAdd.updateView()
    },
    async handleUpdate(id) {
      this.$refs.DialogEdit.updateView(id)
    },
    exportNonMainlandList() {
      exportNonMainlandList({ ...this.searchForm }).then(res => {
        downloadBlobFile(res)
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
