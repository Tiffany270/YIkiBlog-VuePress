<template>
  <page-container>
    <div id="content-manage">
      <block-container>
        <searchForm
          :list="searchList"
          @on-search="handleSearch"
          @on-reset="handleReset"
        ></searchForm>
        <handle-block>
          <template #right>
            <div>
              <el-button plain size="small" @click="releaseSetting">
                <i class="iconfont icon-icon-new"></i>
                设置
              </el-button>
            </div>
          </template>
        </handle-block>
        <handle-block>
          <template v-slot:right>
            <el-button
              plain
              size="small"
              @click="handleAudit"
              :disabled="
                !selectedItems.length ||
                (includedValue(0) && includedValue(4)) ||
                includedValue(1) ||
                includedValue(2) ||
                includedValue(3)
              "
            >
              审核
            </el-button>
            <el-button
              plain
              size="small"
              @click="handleRelease"
              :disabled="
                !selectedItems.length ||
                includedValue(1) ||
                includedValue(3) ||
                includedValue(4) ||
                includedValue(0)
              "
            >
              发布
            </el-button>
            <el-button
              plain
              size="small"
              @click="handleUndercarriage"
              :disabled="
                !selectedItems.length ||
                includedValue(2) ||
                includedValue(3) ||
                includedValue(4) ||
                includedValue(0)
              "
            >
              下架
            </el-button>
          </template>
        </handle-block>
        <xb-table
          ref="contentTable"
          :columns="tableColumns"
          :data="tableData"
          :max-height="980"
          :on-row-key="row => row.id"
          :total="pageTotal"
          @on-page-change="handlePageChange"
          @on-selection-change="onSelectionChange"
          :disabled="!selectedItems.length"
        ></xb-table>
      </block-container>
    </div>
    <dialog-content-detail ref="DialogContentDetail"></dialog-content-detail>
    <dialog-content-edit ref="DialogContentEdit"></dialog-content-edit>
    <dialog-batch-audit ref="DialogBatchAudit"></dialog-batch-audit>
    <dialog-single-audit ref="DialogSingleAudit"></dialog-single-audit>
    <dialog-release ref="DialogRelease"></dialog-release>
    <dialog-undercarriage ref="DialogUndercarriage"></dialog-undercarriage>
    <dialog-release-setting ref="DialogReleaseSetting"></dialog-release-setting>
  </page-container>
</template>
<script>
import PageContainer from '@components/PageContainer'
import BlockContainer from '@components/BlockContainer'
import SearchForm from '@components/SearchForm'
import HandleBlock from '@components/HandleBlock'
import Pagination from '@/mixin/Pagination'
import BasePage from '@/mixin/BasePage'
import Table from '@/mixin/Table'
import { searchList, tableColumns } from './config'
import { getContentMangeList, getAuditStatus } from '@/api/contentMange'
import DialogContentDetail from './components/DialogContentDetail.vue'
import DialogContentEdit from './components/DialogContentEdit.vue'
import DialogBatchAudit from './components/DialogBatchAudit.vue'
import DialogRelease from './components/DialogRelease.vue'
import DialogUndercarriage from './components/DialogUndercarriage.vue'
import DialogReleaseSetting from './components/DialogReleaseSetting.vue'
import DialogSingleAudit from './components/DialogSingleAudit.vue'
export default {
  name: 'contentManage', //内容管理
  components: {
    PageContainer,
    BlockContainer,
    SearchForm,
    HandleBlock,
    DialogContentDetail,
    DialogContentEdit,
    DialogBatchAudit,
    DialogRelease,
    DialogUndercarriage,
    DialogReleaseSetting,
    DialogSingleAudit
  },
  provide() {
    return {
      fatherMethod: this.fatherMethodHandle
    }
  },
  mixins: [Table, Pagination, BasePage],
  data() {
    return {
      pageTotal: 0,
      searchForm: {
        createdEndDate: '',
        createdStartDate: '',
        mobile: '',
        status: ''
      },
      searchList: [...searchList],
      tableColumns: [],
      tableData: [],
      selectedItems: [],
      newStatusArr: []
    }
  },
  computed: {
    isItemSelected() {
      return Array.isArray(this.selectedItems) && this.selectedItems.length
    }
  },
  watch: {},
  mounted() {
    this.tableColumns = tableColumns(this)
    this.findContentMangeList()
    this.findAuditStatus() //调用
  },
  methods: {
    fatherMethodHandle() {
      this.findContentMangeList()
      this.findAuditStatus()
      this.$refs.contentTable.handleClearSelection()
    },
    // 内容管理-获取内容审核状态是否开启
    async findAuditStatus() {
      const res = await getAuditStatus()
      this.isOpenAudit = res.data.isOpenAudit
    },
    // 获取内容管理列表
    async findContentMangeList(data) {
      const formData = data || this.searchForm
      const {
        data: { records, total }
      } = await getContentMangeList({
        ...formData,
        ...this.pages,
        pageNum: this.pages.current,
        pageSize: this.pages.size
      })
      this.tableData = records
      this.pageTotal = total
    },
    handleSearch(searchForm) {
      this.searchForm = { ...searchForm, searchForm }
      this.pages.current = 1
      this.findContentMangeList(searchForm)
    },
    handleReset() {
      this.searchForm = {}
      this.pages.current = 1
      this.$refs.contentTable.handleClearSelection()
      this.findContentMangeList()
    },
    handlePageChange(pages) {
      this.pages = pages
      this.findContentMangeList()
    },
    // 勾选事件
    onSelectionChange(selectedItems) {
      this.selectedItems = selectedItems
      this.selectId = this.selectedItems.map(item => item.id)
      this.statusArr = this.selectedItems.map(item => item.status)
      this.selectedStatus = this.statusArr.map(item => item.status)
      this.newStatusArr = this.statusArr
      // 将状态数组转为数值
      this.selectStatus = parseInt(this.statusArr.toString())
    },
    includedValue(val) {
      const newStatusArr = this.newStatusArr
      if (newStatusArr.length > 0) {
        return newStatusArr.some(value => {
          return value === val
        })
      }
      return false
    },
    // 内容详情
    openDialogContentDetail(row) {
      this.$refs.DialogContentDetail.updateView(
        row,
        this.selectId,
        this.selectStatus
      )
    },
    // 内容编辑
    openDialogContentEdit(row) {
      this.$refs.DialogContentEdit.updateView(row)
    },
    // 审核
    handleAudit() {
      if (this.selectedItems.length === 1) {
        this.$refs.DialogSingleAudit.updateView(
          this.selectId,
          this.selectStatus
        )
      } else if (this.selectedItems.length !== 0) {
        this.$refs.DialogBatchAudit.updateView(this.selectId, this.selectStatus)
      }
    },
    // 发布
    handleRelease() {
      this.$refs.DialogRelease.updateView(this.selectId)
    },
    // 下架
    handleUndercarriage() {
      this.$refs.DialogUndercarriage.updateView(this.selectId)
    },
    // 设置
    releaseSetting() {
      this.$refs.DialogReleaseSetting.updateView(
        this.selectId,
        this.selectStatus,
        this.isOpenAudit
      )
    }
  }
}
</script>
