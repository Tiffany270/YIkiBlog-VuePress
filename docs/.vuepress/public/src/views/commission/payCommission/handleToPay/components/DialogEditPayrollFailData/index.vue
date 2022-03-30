<template>
  <dialog-container :ref="DIALOG_REF" title="编辑" width="500px" @closed="resetDialog">
    <el-form ref="form" inline :model="formData" :rules="formRules" label-width="120px" label-position="right">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model.trim="formData.realName" placeholder="请输入姓名" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="证件号码" prop="cardNo">
        <el-input v-model.trim="formData.cardNo" placeholder="请输入证件号码" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="收款账号" prop="accountNo">
        <el-input v-model.trim="formData.accountNo" placeholder="请输入收款账号" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model.trim="formData.mobile" placeholder="请输入手机号码" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="金额">
        <span>{{ formData.amount | moneyConvert }}</span>
      </el-form-item>
      <el-form-item label="商户备注" prop="merchantCustom">
        <el-input v-model.trim="formData.merchantCustom" placeholder="请输入商户备注" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="商户订单号" prop="transNo">
        <el-input v-model.trim="formData.transNo" placeholder="请输入商户订单号" style="width: 240px"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hideDialog">取消</el-button>
      <el-button type="primary" @click="handleSubmit" v-preventReClick>确定</el-button>
    </div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import { staticRules } from '@/utils/validate'
import { editPayOrder } from '@/apis/payroll'
export default {
  name: 'DialogEditPayrollFailData',
  mixins: [BaseDialog],
  data() {
    return {
      formData: {
        realName: '',
        cardNo: '',
        accountNo: '',
        mobile: '',
        amount: '',
        merchantCustom: '',
        transNo: '',
        batchNo: '',
        id: ''
      },
      formRules: {
        realName: [staticRules('姓名').required, staticRules('姓名').stringMinMax(0, 30)],
        cardNo: [staticRules('证件号码').required, staticRules('证件号码').stringMinMax(0, 18)],
        accountNo: [staticRules('收款账号').required, staticRules('收款账号').stringMinMax(0, 30)],
        mobile: [staticRules('手机号码').mobile],
        merchantCustom: [staticRules('商户备注').stringMinMax(0, 30)],
        transNo: [staticRules('商户订单号').stringMinMax(0, 30)]
      }
    }
  },

  methods: {
    show(row) {
      this.initFormData(row)
      this.showDialog()
    },
    initFormData(row) {
      for (const key in this.formData) {
        this.formData[key] = typeof row[key] === 'string' ? row[key].replace(/\s+/g, '') : row[key]
      }
    },
    handleSubmit() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          const { code } = await editPayOrder({ ...this.formData })
          this.$emit('on-edit-change')
          if (code === 0) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.hideDialog()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
