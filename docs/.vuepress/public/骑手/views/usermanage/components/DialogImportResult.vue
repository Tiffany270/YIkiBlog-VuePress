<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="导入结果"
    width="1000px"
    class="dialog-import-result"
  >
    <div class="dialog-container">
      <div class="btn-container">
        <el-button-group>
          <el-button
            type="primary"
            size="small"
            :plain="active !== 'success'"
            @click="changeActive('success')"
          >
            成功{{ successTotal ? '(' + successTotal + ')' : '' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :plain="active !== 'fail'"
            @click="changeActive('fail')"
          >
            失败{{ failTotal ? '(' + failTotal + ')' : '' }}
          </el-button>
        </el-button-group>
        <el-button
          type="primary"
          size="small"
          @click="changeActive('success')"
          v-show="active === 'fail'"
        >
          导出数据
        </el-button>
      </div>
      <div class="table-container">
        <xb-table
          v-if="active === 'success'"
          :columns="successColumns"
          :data="successData"
          has-border
        ></xb-table>
        <xb-table
          v-else
          :columns="failColumns"
          :data="failData"
          has-border
        ></xb-table>
        <p style="margin-top: -25px; color: #f2ba96; font-size: 16px">
          温馨提示： 点击确认按钮后只会对校验成功的数据做提交
        </p>
      </div>
      <div class="footer-btns">
        <el-button plain @click="changeActive('success')">放弃上传</el-button>
        <el-button type="primary" @click="changeActive('fail')">
          确认上传
        </el-button>
      </div>
    </div>
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
import Table from '@/mixin/Table'
import { successColumns, failColumns } from './config'

export default {
  name: 'DialogImportResult',
  mixins: [Dialog, Table],
  components: {},
  data() {
    return {
      successColumns,
      successData: [],
      successTotal: 0,
      failColumns,
      failData: [],
      failTotal: 0,
      active: 'success'
    }
  },
  created() {},
  methods: {
    updateView() {
      this.showDialog()
    },
    changeActive(active) {
      this.active = active
      console.log(this.active)
    },
    dowloadFile() {}
  }
}
</script>
<style lang="scss" scoped>
.dialog-import-result {
  .dialog-container {
    .btn-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .table-container {
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
    .footer-btns {
      text-align: center;
    }
  }
}
</style>
