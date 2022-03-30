<template>
  <div class="xb-table">
    <div class="xb-table__title" v-if="hasHandle">
      <div class="xb-table__title--left">
        <div v-if="title">{{ title }}</div>
        <!-- 左侧插槽 -->
        <slot name="tab"></slot>
      </div>
      <div class="xb-table__title--right">
        <!-- 操作栏插槽 -->
        <slot name="handle"></slot>
      </div>
    </div>
    <div class="xb-table__content">
      <el-table
        ref="xbtable"
        :data="data"
        style="width: 100%"
        :row-key="getRowKey"
        :max-height="maxHeight"
        :header-row-style="handleRowStyle"
        :row-style="handleRowStyle"
        @selection-change="handleSelectionChange"
      >
        <template v-for="item in columns">
          <!-- 多选框 -->
          <el-table-column
            v-if="item.type === 'selection'"
            :key="item.type"
            type="selection"
            align="center"
            fixed="left"
            :width="item.width || '50px'"
            :reserve-selection="true"
          ></el-table-column>
          <!-- 序号 -->
          <el-table-column
            v-else-if="item.type === 'index'"
            :key="item.type"
            type="index"
            align="center"
            label="序号"
            fixed="left"
            :width="item.width || '50px'"
          >
            <template slot-scope="scope">
              <!-- {{ scope.$index + 1 }} -->
              <span>{{ (pages.current - 1) * pages.size + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <!-- 需要转换字段渲染 -->
          <el-table-column
            v-else-if="item.callback"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            show-overflow-tooltip
            :fixed="item.fixed"
          >
            <template slot-scope="scope">
              <!-- eslint-disable-next-line -->
              <span v-html="item.callback && item.callback(scope.row)"></span>
            </template>
          </el-table-column>
          <!--   || 自定义表格内容(包括并不限于组件)-具名插槽&&作用域插槽 -->
          <el-table-column
            v-else-if="item.slot"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
          >
            <template slot-scope="scope">
              <slot :name="item.slot" :row="scope.row"></slot>
            </template>
          </el-table-column>
          <!--使用render函数,定制化相关操作-->
          <el-table-column
            v-else-if="item.render"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            align="center"
          >
            <template slot-scope="scope">
              <render-slot :render="item.render" :row="scope.row" :index="scope.$index" :column="item" />
            </template>
          </el-table-column>
          <!--右边固定操作-->
          <el-table-column
            v-else-if="item.type === 'action'"
            :key="item.prop"
            :width="item.width"
            :label="item.label"
            fixed="right"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <slot :name="item.slot" :row="scope.row"></slot> -->
              <table-btns :config="item.config(scope.row)" :row="scope.row"></table-btns>
            </template>
          </el-table-column>
          <!-- 普通文本渲染 -->
          <el-table-column
            v-else
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            show-overflow-tooltip
          >
          </el-table-column>
        </template>
        <div class="xb-table__content--nodata" slot="empty">
          <no-data type="table" />
        </div>
      </el-table>
    </div>
    <div class="xb-table__pages" v-if="hasPage">
      <el-pagination
        background
        layout="total,sizes,prev, pager, next"
        :current-page.sync="pages.current"
        :page-size="pages.size"
        :total="pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import PageMixin from '@/mixins/Page'
import TableBtns from '_c/TableBtns/index.vue'
import renderSlot from './renderSlot'
import NoData from '_c/NoData'
export default {
  name: 'XBTable',
  mixins: [PageMixin],
  components: {
    TableBtns,
    renderSlot,
    NoData
  },
  props: {
    hasHandle: {
      type: Boolean,
      default: true
    },
    hasPage: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    config: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    total: [String, Number],
    onRowKey: {
      type: Function,
      // eslint-disable-next-line prettier/prettier
      default: function() {}
    },
    maxHeight: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    pageTotal() {
      return typeof this.total === 'string' ? Number(this.total) : this.total
    }
  },
  methods: {
    getRowKey(row) {
      return this.onRowKey(row, val => {
        return val
      })
    },
    handleRowStyle() {
      return {
        height: '54px'
      }
    },
    // 多选
    handleSelectionChange(selections) {
      this.$emit('on-selection-change', selections)
    },
    // 切换分页
    handleCurrentChange(val) {
      this.changePageNum(val)
      this.$emit('on-page-change', this.pages)
    },
    handleSizeChange(val) {
      this.changePageSize(val)
      this.$emit('on-page-change', this.pages)
    },
    handleClearSelection() {
      this.$refs.xbtable.clearSelection()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/index';
@include b(xb-table) {
  width: 100%;
  // min-height: calc(100% - 120px);
  background: #fff;
  // border-radius: 8px;
  // padding: 20px 24px;
  box-sizing: border-box;
  @include e(title) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    height: 54px;
    @include m(left) {
      // font-weight: bold;
      font-size: 16px;
      color: #999;
    }
    @include m(right) {
      .el-button {
        height: 32px;
        line-height: 0;
        padding: 4px 12px;
        font-size: 14px;
        background-color: #fff;
      }
    }
  }
  @include e(content) {
    border-top: 1px solid #d9d9d9;
    box-sizing: border-box;
  }
  @include e(pages) {
    margin-top: 25px;
    text-align: right;
  }
  .el-table th.is-leaf,
  .el-table td {
    border-bottom: 1px solid #d9d9d9;
  }
  .el-table__body-wrapper {
    min-height: 300px;
  }
  .el-table__empty-text {
    line-height: 0;
  }
  .el-table th {
    font-weight: 400;
  }
}
</style>
