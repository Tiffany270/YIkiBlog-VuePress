<template>
  <dialog-container :ref="DIALOG_REF" :title="`${isSet ? '修改' : '设置'}收票地址`" @closed="resetDialog" width="560px">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="medium">
      <el-form-item label="收件人" prop="personName">
        <el-input v-model.trim="form.personName" placeholder="请输入收票人姓名" clearable />
      </el-form-item>
      <el-form-item label="联系电话" prop="personPhone">
        <el-input v-model.trim="form.personPhone" placeholder="请输入收票人联系电话" clearable />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <city-picker ref="CityPicker" v-model.trim="cityArray" />
        <el-input
          v-model.trim="form.address"
          style="width: 320px !important; margin-top: 12px"
          placeholder="请输入详细地址"
          clearable
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hideDialog">取消</el-button>
      <el-button :loading="btnLoading" type="primary" @click="submitForm">确定</el-button>
    </div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import CityPicker from '_c/CityPicker'
import { staticRules } from '@/utils/validate'
import { updateSettingInfo, getSettingInfo } from '@/apis/setting'

export default {
  name: 'DialogEdit',
  components: { CityPicker },
  mixins: [BaseDialog],
  data() {
    return {
      btnLoading: false,
      isSet: false,
      form: {
        personName: '',
        personPhone: '',
        province: '',
        city: '',
        county: '',
        address: ''
      },
      cityArray: [],
      rules: {
        personName: [staticRules().required, staticRules('收件人').stringMinMax(0, 30)],
        personPhone: [staticRules('联系电话').required, staticRules('联系电话').contactNumber],
        province: [staticRules().required],
        city: [staticRules().required],
        county: [staticRules().required],
        address: [staticRules().required, staticRules('详细地址').stringMinMax(0, 30)]
      }
    }
  },
  watch: {
    cityArray(val) {
      this.form.province = val[0]
      this.form.city = val[1]
      this.form.county = val[2]
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnLoading = true
          updateSettingInfo({
            ...this.form,
            updateType: 'ADDRESS',
            area: this.form.county
          })
            .then(() => {
              this.hideDialog()
              this.$emit('after-submit')
              this.btnLoading = false
            })
            .catch(() => {
              this.btnLoading = false
            })
        }
      })
    },
    async updateView(contactName) {
      this.isSet = contactName
      await getSettingInfo()
        .then(({ data }) => {
          this.form.personName = data.personName
          this.form.personPhone = data.personPhone
          this.form.address = data.address
          this.cityArray = [data.province, data.city, data.area]
        })
        .catch(() => {})
      this.showDialog()
    }
  }
}
</script>
