<template>
  <page-container>
    <div class="bill-manage">
      <block-container>
        <search-form
          :key="changeSearchList"
          :list="searchList"
          @on-search="handleSearch"
          @on-reset="handleReset"
        />
        <handle-block>
          <template #right>
            <div>
              <el-button size="small" plain @click="addTopic">
                <i class="iconfont icon-icon-new"></i>
                设置主题
              </el-button>
            </div>
          </template>
        </handle-block>
        <xb-table
          ref="ticketTable"
          :is-loading="isLoading"
          :columns="columns"
          :data="data"
          :on-row-key="row => row.id"
          :total="pageTotal"
          :max-height="980"
          @on-page-change="handlePageChange"
          @on-selection-change="handleSelectionChange"
        >
          <template #contributeContent="{ row }">
            <p
              class="ellipsis"
              style="cursor: pointer"
              :title="row.contributeContent"
              @click="openDialogShowContent(row.contributeContent)"
            >
              {{ row.contributeContent }}
            </p>
          </template>
          <template #photo="{ row }">
            <span
              style="color: blue; cursor: pointer"
              @click="openDialogShowPic(row)"
            >
              点击查看
            </span>
          </template>
        </xb-table>
      </block-container>
    </div>
    <dialog-add-topic
      ref="DialogAddTopic"
      @add-success="handleSuccess"
    ></dialog-add-topic>
    <dialog-show-content ref="DialogShowContent"></dialog-show-content>
    <dialog-show-pic ref="DialogShowPic"></dialog-show-pic>
    <dialog-show-approval
      ref="DialogShowApproval"
      @approval-success="handleSuccess"
    ></dialog-show-approval>
  </page-container>
</template>

<script>
import PageContainer from '@components/PageContainer'
import BlockContainer from '@components/BlockContainer'
import SearchForm from '@components/SearchForm'
import HandleBlock from '@components/HandleBlock'
import Table from '@/mixin/Table'
import {
  getList,
  getAllTopic,
  deleteContributionById
} from '@/api/contribution'
import DialogShowPic from '../components/DialogShowPic.vue'
import DialogShowContent from '../components/DialogShowContent.vue'
import DialogShowApproval from '../components/DialogShowApproval.vue'
import DialogAddTopic from '../components/DialogAddTopic.vue'
import { columns, searchList } from './config'
export default {
  name: 'TicketManage',
  components: {
    PageContainer,
    BlockContainer,
    SearchForm,
    HandleBlock,
    DialogShowPic,
    DialogShowContent,
    DialogShowApproval,
    DialogAddTopic
  },
  mixins: [Table],
  data() {
    return {
      changeSearchList: true,
      searchList,
      columns: [],
      data: [],
      searchForm: {},
      pageTotal: 0,
      selection: [],
      isLoading: false,
      topicList: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getAllTopic()
    this.getList()
    this.columns = columns(this)
  },
  methods: {
    handleSearch(searchForm) {
      this.pages.current = 1
      this.searchForm = { ...this.searchForm, ...searchForm }
      this.getList()
    },
    handleReset() {
      this.pages.current = 1
      this.searchForm = {}
      this.getList()
    },
    handlePageChange(data) {
      this.pages = data
      this.getList()
    },
    handleSelectionChange(selection) {
      this.selection = selection
    },
    getList() {
      const data = { ...this.pages, ...this.searchForm }
      getList(data).then(res => {
        this.data = res.data.records
        this.pageTotal = res.data.total
      })
    },
    addTopic() {
      this.$refs.DialogAddTopic.updateView()
    },
    getAllTopic() {
      getAllTopic().then(res => {
        const topicList = res.data
        this.topicList = topicList
        this.changeSearchList = false
        this.searchList = searchList.map(item => {
          if (item.key === 'topicId') {
            item.option = topicList.map(it => {
              return {
                value: it.id,
                label: it.topicName
              }
            })
          }
          return item
        })
        this.changeSearchList = true
      })
    },
    openDialogShowPic(row) {
      this.$refs.DialogShowPic.updateView(row)
    },
    openDialogShowContent(contributeContent) {
      this.$refs.DialogShowContent.updateView(contributeContent)
    },
    openApprovalDialog(id) {
      this.$refs.DialogShowApproval.updateView(id)
    },
    deleteContributionById(id) {
      this.$confirm('确定要删除该投稿吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteContributionById(id).then(res => {
          if (res && res.data) {
            this.$message.success('删除成功')
            this.handleSuccess()
          }
        })
      })
    },
    handleSuccess() {
      this.getList()
      this.getAllTopic()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
