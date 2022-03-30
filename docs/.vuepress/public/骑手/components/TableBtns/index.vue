<template>
  <div class="table-btns">
    <template v-if="filteredList.length > showNums + 1">
      <el-button
        v-for="(item, key) in dropDownList.begin"
        :key="key"
        :disabled="item.disabled"
        size="mini"
        @click="handleClick(item.fn, row)"
      >
        {{ item.label }}
      </el-button>
      <el-dropdown>
        <el-button style="padding: 5px">
          <i
            class="iconfont icon-more"
            style="font-size: 18px; font-weight: 600"
          ></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, key) in dropDownList.end"
            :key="key"
            :disabled="item.disabled"
            @click.native="handleClick(item.fn, row)"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <template v-else>
      <el-button
        v-for="(item, key) in filteredList"
        :key="key"
        :disabled="item.disabled"
        size="mini"
        @click="handleClick(item.fn, row)"
      >
        {{ item.label }}
      </el-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TableBtns',
  props: {
    /**
     * 传入的配置
     *
     * 数据结构：
     * @param { string } [item.permission] - 权限
     * @param { string } item.label - 按钮名字
     * @param { boolean } [item.disabled] - 是否禁用
     * @param { function } item.fn - 按钮回调
     */
    config: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    /**
     * 放出来的按钮数
     */
    showNums: {
      type: Number,
      default: 2,
      validator(val) {
        return val % 1 === 0 && val >= 0
      }
    },
    /**
     * 传入要处理的列对象
     */
    row: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  computed: {
    filteredList() {
      return this.config.filter(item =>
        item.permission !== undefined ? item.permission : true
      )
    },
    dropDownList() {
      // 如果有三个就完整的显示三个,超过三个的就隐藏显示
      return {
        begin: this.filteredList.slice(0, this.showNums),
        end: this.filteredList.slice(this.showNums)
      }
    }
  },
  methods: {
    handleClick(fn, row) {
      fn && fn(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-btns {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 10px;
  }
  .el-button {
    height: 28px;
    line-height: 0;
    padding: 0 10px;
    font-size: 12px;
    // color: #3368f5;
    // margin-left: 0;
  }
}

.button-more {
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
