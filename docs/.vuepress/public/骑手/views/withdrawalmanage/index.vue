<template>
  <page-container>
    <block-container style="margin-bottom: 20px">
      <div class="total-top">
        <styled-title style="margin-bottom: 0">数据统计</styled-title>
        <el-date-picker
          v-model="totalTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="card-group">
        <div class="card-box"></div>
        <div class="card-box">
          <div class="money-card"></div>
          <div class="money-card"></div>
        </div>
        <div class="card-box">
          <div class="people-card"></div>
          <div class="people-card"></div>
        </div>
      </div>
    </block-container>
    <block-container>
      <el-button-group>
        <el-button
          type="primary"
          size="small"
          :plain="active !== 'reward'"
          @click="changeActive('reward')"
        >
          奖励记录
        </el-button>
        <el-button
          type="primary"
          size="small"
          :plain="active !== 'withdrawal'"
          @click="changeActive('withdrawal')"
        >
          提现记录
        </el-button>
      </el-button-group>
      <table-component
        v-show="active === 'reward'"
        active="reward"
      ></table-component>
      <table-component
        v-show="active === 'withdrawal'"
        active="withdrawal"
      ></table-component>
    </block-container>
  </page-container>
</template>
<script>
import PageContainer from '@components/PageContainer'
import BlockContainer from '@components/BlockContainer'
import StyledTitle from '@components/StyledTitle'
import TableComponent from './components/TableComponent.vue'
export default {
  components: {
    PageContainer,
    BlockContainer,
    StyledTitle,
    TableComponent
  },
  data() {
    return {
      totalTime: '',
      active: 'reward',
      searchForm: {},
      changeSearchList: true
    }
  },
  mounted() {},
  methods: {
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
    openDetailDialog() {
      this.$refs.DialogDetail.updateView()
    },
    openEditDialog() {},
    addActive() {}
  }
}
</script>
<style lang="scss" scoped>
.total-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-group {
  display: flex;
  justify-content: space-between;
  .card-box {
    flex: 1;
    &:nth-child(2) {
      margin: 0 50px;
    }
  }
}
.el-button-group {
  margin-bottom: 20px;
}
</style>
