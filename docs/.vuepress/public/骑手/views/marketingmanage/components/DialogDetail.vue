<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="活动详情"
    width="1000px"
    class="dialog-detail"
  >
    <div class="dialog-container">
      <el-button-group>
        <el-button
          type="primary"
          size="small"
          :plain="active !== 'detail'"
          @click="changeActive('detail')"
        >
          活动详情
        </el-button>
        <el-button
          type="primary"
          size="small"
          :plain="active !== 'records'"
          @click="changeActive('records')"
        >
          邀请记录
        </el-button>
      </el-button-group>
      <div class="active-detail" v-show="active === 'detail'">
        <info-list :labelData="labelData" :data="data" :row="1">
          <template #rule>
            <reward-rule></reward-rule>
          </template>
        </info-list>
      </div>
      <div class="invite-records" v-show="active === 'records'">
        <block-container>
          <search-form
            :list="searchList"
            @on-search="handleSearch"
            @on-reset="handleReset"
          />
          <handle-block>
            <template #right>
              <div>
                <el-button type="primary" size="small" @click="exportData">
                  导出数据
                </el-button>
              </div>
            </template>
          </handle-block>
          <xb-table
            :columns="columns"
            :data="record"
            :total="pageTotal"
            @on-page-change="handlePageChange"
          ></xb-table>
        </block-container>
      </div>
    </div>
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
import Table from '@/mixin/Table'
import InfoList from '@/components/InfoList'
import SearchForm from '@components/SearchForm'
import BlockContainer from '@components/BlockContainer'
import HandleBlock from '@components/HandleBlock'
import RewardRule from './RewardRule'
import { searchItems, columns } from './config'

export default {
  name: 'DialogDetail',
  mixins: [Dialog, Table],
  components: {
    InfoList,
    RewardRule,
    SearchForm,
    BlockContainer,
    HandleBlock
  },
  data() {
    return {
      labelData: [
        {
          label: '活动时间：',
          key: 'time'
        },
        {
          label: '活动标题：',
          key: 'title'
        },
        {
          label: '参与活动人数',
          key: 'num'
        },
        {
          label: '奖励规则',
          slot: 'rule'
        }
      ],
      data: {
        time: '2020/03/27 - 2020/04/17',
        title: '活动1期',
        num: '300人'
      },
      active: 'detail',
      searchList: searchItems,
      columns,
      record: [{}],
      pageTotal: 0
    }
  },
  created() {
    // this.appendixColumns = appendixColumns(this)
  },
  methods: {
    updateView() {
      this.showDialog()
    },
    changeActive(active) {
      this.active = active
    },
    handleSearch(searchForm) {
      this.pages.current = 1
      this.searchForm = { ...this.searchForm, ...searchForm }
      console.log(searchForm)
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
    getList() {
      // const data = { ...this.pages, ...this.searchForm }
      // getList(data).then(res => {
      //   this.data = res.data.records
      //   this.pageTotal = res.data.total
      // })
    },
    exportData() {}
  }
}
</script>
<style lang="scss" scoped>
.dialog-detail {
  .dialog-container {
    .el-button-group {
      margin-bottom: 20px;
    }
    .styled-title {
      margin: 30px 0 20px;
    }
    .card-img {
      width: 158px;
      height: 100px;
      cursor: pointer;
    }
    .table-container {
      padding: 0 20px;
    }
  }
}
</style>
