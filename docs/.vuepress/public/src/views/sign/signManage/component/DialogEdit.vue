<template>
  <dialog-container :ref="DIALOG_REF" title="编辑" @closed="resetDialog" width="40%">
    <el-form ref="form" inline :model="formData" :rules="rules" label-width="120px" label-position="right">
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号码" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="formData.realName" placeholder="请输入姓名" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="certNo">
        <el-input v-model="formData.certNo" placeholder="请输入身份证" style="width: 240px"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hideDialog">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import { createStudioForm } from './config'
import { staticRules } from '@/utils/validate'
import { updateTem } from '@/apis/signManage'
export default {
  name: 'DialogEdit',
  mixins: [BaseDialog],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: { ...createStudioForm },
      rules: {
        mobile: [staticRules().required],
        certNo: [staticRules().required],
        realName: [staticRules().required]
      }
    }
  },
  methods: {
    updateView(row) {
      this.formData = { ...row }
      this.showDialog()
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          updateTem(this.formData).then(() => {
            this.hideDialog()
            this.$emit('after-submit')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
