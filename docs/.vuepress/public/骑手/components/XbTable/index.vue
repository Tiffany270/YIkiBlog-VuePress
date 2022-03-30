<template>
  <div class="xb-table">
    <div class="xb-table__content" :class="{ 'with-border': !hasBorder }">
      <el-table
        ref="xbtable"
        v-loading="isLoading"
        element-loading-text="加载中..."
        :data="data"
        :border="hasBorder"
        :stripe="hasStripe"
        style="width: 100%"
        :row-key="getRowKey"
        :max-height="maxHeight"
        :header-row-style="handleRowStyle"
        :row-style="handleRowStyle"
        :row-class-name="rowClassName"
        :tree-props="{ children: 'children' }"
        :show-summary="showSummary"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
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
            :selectable="item.selectable || defaultSelectable"
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
              <span>
                {{ (pages.current - 1) * pages.size + scope.$index + 1 }}
              </span>
            </template>
          </el-table-column>
          <!-- 需要转换字段渲染 -->
          <el-table-column
            v-else-if="item.callback"
            :align="item.align ? item.align : hasBorder ? 'center' : 'left'"
            :header-align="
              item.headerAlign
                ? item.headerAlign
                : hasBorder
                ? 'center'
                : 'left'
            "
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            show-overflow-tooltip
            :fixed="item.fixed"
            :filter-method="item.filterMethod"
            :filters="item.filters"
          >
            <template slot-scope="scope">
              <span v-html="item.callback && item.callback(scope.row)"></span>
            </template>
          </el-table-column>
          <!--   || 自定义表格内容(包括并不限于组件)-具名插槽&&作用域插槽 -->
          <el-table-column
            :align="hasBorder ? 'center' : 'left'"
            v-else-if="item.slot"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            label-class-name="label-space-style"
            class-name="multi-row"
            :fixed="item.fixed"
          >
            <template slot-scope="scope">
              <slot :name="item.slot" :row="scope.row"></slot>
            </template>
          </el-table-column>
          <!--使用render函数,定制化相关操作-->
          <el-table-column
            :align="hasBorder ? 'center' : 'left'"
            v-else-if="item.render"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
          >
            <template slot-scope="scope">
              <render-slot
                :render="item.render"
                :row="scope.row"
                :index="scope.$index"
                :column="item"
              />
            </template>
          </el-table-column>
          <!--右边固定操作-->
          <el-table-column
            v-else-if="item.type === 'action'"
            :key="item.prop"
            :label="item.label"
            :width="item.width"
            fixed="right"
            align="center"
          >
            <template slot-scope="scope">
              <table-btns
                :config="item.config(scope.row)"
                :row="scope.row"
              ></table-btns>
            </template>
          </el-table-column>
          <!-- 多级表头 -->
          <el-table-column
            v-else-if="item.type === 'multistage'"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :min-width="item.minWidth"
            show-overflow-tooltip
            :align="hasBorder ? 'center' : 'left'"
          >
            <template v-for="item1 in item.children">
              <el-table-column
                :key="item1.prop"
                :prop="item1.prop"
                :label="item1.label"
                :width="item1.width"
                :min-width="item1.minWidth"
                show-overflow-tooltip
                :header-align="item1.headerAlign ? item1.headerAlign : 'center'"
                :align="item1.align ? item1.align : 'center'"
              ></el-table-column>
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
            :align="item.align ? item.align : hasBorder ? 'center' : 'left'"
            :header-align="
              item.headerAlign
                ? item.headerAlign
                : hasBorder
                ? 'center'
                : 'left'
            "
            :filter-method="item.filterMethod"
            :filters="item.filters"
          ></el-table-column>
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
        :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200]"
        :page-size="pages.size"
        :total="pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import PageMixin from '@/mixin/Pagination'
import NoData from '@components/NoData'
import TableBtns from '@components/TableBtns/index.vue'
import renderSlot from './renderSlot'
export default {
  name: 'XbTable',
  mixins: [PageMixin],
  components: {
    TableBtns,
    renderSlot,
    NoData
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    hasBorder: {
      type: Boolean,
      default: false
    },
    hasStripe: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    total: {
      type: [String, Number],
      default: 0
    },
    hasPage: {
      type: Boolean,
      default: true
    },
    onRowKey: {
      type: Function,
      default: () => {}
    },
    maxHeight: {
      type: [String, Number],
      default: null
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    summaryMethod: {
      type: Function,
      default: () => []
    },
    spanMethod: {
      type: Function,
      default: () => {}
    },
    rowClassName: {
      type: [String, Function],
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  computed: {
    pageTotal() {
      return typeof this.total === 'string' ? Number(this.total) : this.total
    }
  },
  created() {
    this.pages.size = this.pageSize
  },
  methods: {
    defaultSelectable() {
      return true
    },
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
    // 清楚复选框选中的缓存
    handleClearSelection() {
      this.$refs.xbtable.clearSelection()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.xb-table {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  &__content {
    //
    box-sizing: border-box;
  }
  .with-border {
    border-top: 1px solid #eeeeee;
  }
  &__pages {
    margin-top: 25px;
    text-align: right;
  }
  .el-table th.el-table__cell,
  .el-table thead.is-group th.el-table__cell {
    background: #fafafa;
    color: #333333;
    font-size: 13px;
    font-weight: 400;
    font-family: PingFangSC, PingFangSC-Regular;
  }
  .el-table td.el-table__cell {
    color: #333333;
    font-size: 13px;
    font-weight: 400;
    font-family: PingFangSC, PingFangSC-Regular;
  }
  .el-table th {
    font-weight: 400;
  }
  .el-table__body-wrapper {
    min-height: 300px;
  }
  .el-table__empty-text {
    line-height: 0;
  }
  // 重置筛选图标
  .el-icon-arrow-down {
    vertical-align: middle;
  }
  .el-icon-arrow-down::before {
    font-family: 'iconfont';
    content: '\e68f';
    font-size: 20px;
  }
}
// 表格table多行数据的公共内置样式
.el-table .multi-row {
  padding: 0 !important;
  .cell {
    padding: 0 !important;
    .multi-row-data {
      border-bottom: 1px solid #ebeef5;
      width: 100% !important;
      padding: 0 10px;
      line-height: 23px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
