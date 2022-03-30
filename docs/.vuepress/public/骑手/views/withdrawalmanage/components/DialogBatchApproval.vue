<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="提现审核"
    width="1000px"
    class="dialog-detail"
  >
    <div class="dialog-container">
      <styled-title>用户提现审核</styled-title>
      <info-list :labelData="labelData" :data="data"></info-list>
      <styled-title>审核意见</styled-title>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        class="form"
        label-width="100px"
      >
        <el-form-item label="审核结果：" prop="type">
          <el-radio-group v-model="form.type" @change="changeType">
            <el-radio label="pass">通过</el-radio>
            <el-radio label="unpass">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" prop="remind">
          <el-input
            type="textarea"
            v-model="form.remind"
            maxlength="500"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="footer-btns">
        <el-button @click="closeDialog" size="small">取消</el-button>
        <el-button type="primary" @click="submit" size="small">提交</el-button>
      </div>
    </div>
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
import Table from '@/mixin/Table'
import InfoList from '@/components/InfoList'
import StyledTitle from '@/components/StyledTitle'

export default {
  name: 'DialogDetail',
  mixins: [Dialog, Table],
  components: {
    InfoList,
    StyledTitle
  },
  data() {
    return {
      labelData: [
        {
          label: '合计提现：',
          key: 'total'
        },
        {
          label: '提现人数：',
          key: 'num'
        }
      ],
      data: {
        total: '￥123,456,789.23',
        num: '50'
      },
      form: {
        type: 'pass',
        remind: ''
      },
      rules: {
        type: [{ required: true, message: '请选择审核结果', trigger: 'change' }]
      }
    }
  },
  created() {},
  methods: {
    updateView() {
      this.showDialog()
    },
    changeType(val) {
      this.form.type = val
    },
    closeDialog() {
      this.hideDialog()
    },
    submit() {}
  }
}
</script>
<style lang="scss" scoped>
.dialog-detail {
  .dialog-container {
    .styled-title {
      margin: 30px 0 20px;
    }
    .el-textarea {
      width: 600px;
    }
    .footer-btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
