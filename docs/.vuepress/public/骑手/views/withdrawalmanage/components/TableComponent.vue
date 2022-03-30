<template>
  <div class="reward-table">
    <search-form
      :list="active === 'reward' ? rewardSearchItems : withdrawalSearchItems"
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
      :columns="active === 'reward' ? rewardColumns : withdrawalColumns"
      :data="data"
      :page-size="20"
      :total="pageTotal"
      :on-row-key="row => row.id"
      @on-page-change="handlePageChange"
      @on-selection-change="handleSelectionChange"
    ></xb-table>
    <div class="batch-approval" v-show="active === 'withdrawal'">
      <el-button
        type="primary"
        size="small"
        :disabled="!selectedRows.length"
        @click="batchApproval"
      >
        批量审核
      </el-button>
      <span>合计：123,456,789.23元</span>
    </div>
    <dialog-detail ref="DialogDetail" />
    <dialog-batch-approval ref="DialogBatchApproval" />
  </div>
</template>
<script>
import HandleBlock from '@components/HandleBlock'
import SearchForm from '@components/SearchForm'
import DialogDetail from './DialogDetail.vue'
import DialogBatchApproval from './DialogBatchApproval.vue'
import Table from '@/mixin/Table'
import {
  rewardSearchItems,
  rewardColumns,
  withdrawalSearchItems,
  withdrawalColumns
} from './config'

export default {
  components: {
    HandleBlock,
    SearchForm,
    DialogDetail,
    DialogBatchApproval
  },
  mixins: [Table],
  props: {
    active: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: [{}],
      pageTotal: 0,
      rewardSearchItems,
      rewardColumns,
      withdrawalSearchItems,
      withdrawalColumns: [],
      selectedRows: []
    }
  },
  created() {
    this.withdrawalColumns = withdrawalColumns(this)
  },
  methods: {
    handleSearch() {},
    handleReset() {},
    handlePageChange() {},
    handleSelectionChange() {},
    openDialogApproval() {
      this.$refs.DialogDetail.updateView()
    },
    openDialogDetail() {
      this.$refs.DialogDetail.updateView()
    },
    batchApproval() {
      this.$refs.DialogBatchApproval.updateView()
    },
    exportData() {}
  }
}
</script>
<style lang="scss" scoped>
.batch-approval {
  display: flex;
  align-items: center;
  margin-top: -32px;
  .el-button {
    margin-right: 10px;
  }
}
</style>
