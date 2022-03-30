<template>
  <dialog-container :ref="DIALOG_REF" title="审核不通过原因" width="500px" @closed="resetDialog">
    <el-form ref="form" inline :model="reasonForm" :rules="reasonRules" label-width="180px" label-position="right">
      <el-form-item label="" prop="remark">
        <el-input
          v-model="reasonForm.remark"
          type="textarea"
          placeholder="请输入审核不通过原因"
          style="width: 450px"
          resize="none"
          :autosize="{ minRows: 6, maxRows: 6 }"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hideDialog">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import { staticRules } from '@/utils/validate'
export default {
  name: 'ApprovalRefuseForm',
  mixins: [BaseDialog],
  data() {
    return {
      reasonForm: {
        remark: ''
      },
      reasonRules: {
        remark: [staticRules('审核不通过原因').required]
      }
    }
  },

  methods: {
    show() {
      this.showDialog()
    },
    handleSubmit() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          this.$emit('on-success', this.reasonForm)
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
