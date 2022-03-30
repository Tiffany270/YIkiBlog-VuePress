<template>
  <page-container>
    <div class="comment-manage">
      <block-container>
        <searchForm
          :list="searchList"
          @on-search="handleSearch"
          @on-reset="handleReset"
        ></searchForm>
        <handle-block>
          <template v-slot:right>
            <el-button
              plain
              size="small"
              @click="commentEdit"
              :disabled="
                !selectedItems.length ||
                (includedValue(0) && includedValue(4)) ||
                includedValue(1) ||
                includedValue(2)
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
                includedValue(0) ||
                includedValue(4)
              "
            >
              发布
            </el-button>
            <el-button
              plain
              size="small"
              @click="handleOffTheShelf"
              :disabled="
                !selectedItems.length ||
                includedValue(2) ||
                includedValue(0) ||
                includedValue(4)
              "
            >
              下架
            </el-button>
          </template>
        </handle-block>
        <xb-table
          ref="commentTable"
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
    <dialog-comment-detail ref="DialogCommentDetail"></dialog-comment-detail>
    <dialog-off-the-shelf ref="DialogOffTheShelf"></dialog-off-the-shelf>
    <dialog-comment-release ref="DialogCommentRelease"></dialog-comment-release>
    <dialog-comment-batch-audit
      ref="DialogCommentBatchAudit"
    ></dialog-comment-batch-audit>
    <dialog-comment-single-audit
      ref="DialogCommentSingleAudit"
    ></dialog-comment-single-audit>
  </page-container>
</template>
<script>
import PageContainer from '@components/PageContainer'
import BlockContainer from '@components/BlockContainer'
import SearchForm from '@components/SearchForm'
import HandleBlock from '@components/HandleBlock'
import Table from '@/mixin/Table'
import Pagination from '@/mixin/Pagination'
import BasePage from '@/mixin/BasePage'
import { searchList, tableColumns } from './config'
import { getCommentManageList } from '@/api/contentMange'
import DialogOffTheShelf from './components/DialogOffTheShelf.vue'
import DialogCommentRelease from './components/DialogCommentRelease.vue'
import DialogCommentDetail from './components/DialogCommentDetail.vue'
import DialogCommentBatchAudit from './components/DialogCommentBatchAudit.vue'
import DialogCommentSingleAudit from './components/DialogCommentSingleAudit.vue'
export default {
  name: 'contentManage', //评论管理
  provide() {
    return {
      fatherMethod: this.fatherMethodHandle
    }
  },
  components: {
    PageContainer,
    BlockContainer,
    SearchForm,
    HandleBlock,
    DialogOffTheShelf,
    DialogCommentRelease,
    DialogCommentDetail,
    DialogCommentBatchAudit,
    DialogCommentSingleAudit
  },
  mixins: [Table, Pagination, BasePage],
  data() {
    return {
      pageTotal: 0,
      tableData: [],
      tableColumns: [],
      searchForm: {
        createdEndDate: '',
        createdStartDate: '',
        mobile: '',
        status: ''
      },
      searchList: [...searchList],
      selectedItems: [],
      statusSArr: []
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
    this.findCommentManageList()
  },
  methods: {
    fatherMethodHandle() {
      this.findCommentManageList()
      this.$refs.commentTable.handleClearSelection()
    },
    // 获取评论管理列表
    async findCommentManageList(data) {
      const formData = data || this.searchForm
      const {
        data: { records, total }
      } = await getCommentManageList({
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
      this.findCommentManageList(searchForm)
    },
    handleReset() {
      this.searchForm = {}
      this.pages.current = 1
      this.$refs.commentTable.handleClearSelection()
      this.findCommentManageList()
    },
    handlePageChange(pages) {
      this.pages = pages
      this.findCommentManageList()
    },
    // 勾选事件
    onSelectionChange(selectedItems) {
      this.selectedItems = selectedItems
      this.selectId = this.selectedItems.map(item => item.id)
      const statusArr = this.selectedItems.map(item => item.status)
      this.selectedStatus = statusArr.map(item => item.code)
      this.statusSArr = this.selectedStatus
      this.editStatus = parseInt(this.selectedStatus)
    },
    includedValue(val) {
      const statusSArr = this.statusSArr
      if (statusSArr.length > 0) {
        return statusSArr.some(value => {
          return value === val
        })
      }
      return false
    },
    // 评论审核
    commentEdit() {
      if (this.selectedItems.length === 1) {
        this.$refs.DialogCommentSingleAudit.updateView(
          this.selectId,
          this.editStatus
        )
      } else if (this.selectedItems.length > 0) {
        this.$refs.DialogCommentBatchAudit.updateView(
          this.selectId,
          this.editStatus
        )
      }
    },
    // 评论发布
    handleRelease() {
      this.$refs.DialogCommentRelease.updateView(this.selectId)
    },
    // 评论下架
    handleOffTheShelf() {
      this.$refs.DialogOffTheShelf.updateView(this.selectId)
    },
    // 评论详情
    openDialogCommentDetail(row) {
      this.$refs.DialogCommentDetail.updateView(row)
    }
  }
}
</script>
