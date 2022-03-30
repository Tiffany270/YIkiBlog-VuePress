<template>
  <dialog-container :ref="DIALOG_REF" title="账单结款" width="800px">
    <el-form :model="formData" label-width="120px" inline>
      <el-form-item label="账单金额：" prop="tenantNo"> {{ data.totalPay }}元 </el-form-item>
      <el-form-item label="未支付金额："> {{ data.unpaidAmount }}元 </el-form-item>
    </el-form>
    <!-- 校验支付密码 -->
    <el-form :rules="payFormRules" :form="payForm" ref="payForm" :model="payForm">
      <el-form-item label="支付渠道" label-width="80px">
        <el-select placeholder="请选择支付渠道" v-model="payForm.channel">
          <el-option :key="item.value" v-for="item in payChannel" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="支付密码" prop="password">
        <el-input
          v-model.trim="payForm.password"
          autocomplete="off"
          type="password"
          placeholder="请输入支付密码"
          style="width: 220px"
        ></el-input>
        <span style="margin-left: 14px; cursor: pointer" class="login__right__panel__forget" @click="handleSetpassword"
          >忘记密码</span
        >
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <el-input
          v-model.trim="payForm.verifyCode"
          autocomplete="off"
          type="danger"
          placeholder="请输入验证码"
          style="width: 220px; margin-left: 14px"
        ></el-input>
        <el-button
          type="danger"
          plain
          style="width: 104px; margin-left: 14px"
          :disabled="isBtnDisabled"
          @click="getVerificationCode"
          >{{ codeText || '获取验证码' }}</el-button
        >
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button @click="hideDialog">取消</el-button>
      <el-button type="primary" @click="confirm">确认支付</el-button>
    </template>
    <dialog-password ref="DialogPassword" />
  </dialog-container>
</template>

<script>
import { verifyMsg, postPayBill } from '@/apis/settlement'
import BaseDialog from '@/mixins/BaseDialog'
import { staticRules } from '@/utils/validate'
import md5 from 'md5'
import { queryProjecInfoByUser } from '@/apis/user'

export default {
  name: 'DialogBillSettlement',
  components: {
    DialogPassword: () => import(/* webpackChunkName: "DialogPassword" */ '../component/DialogPassword')
  },
  mixins: [BaseDialog],
  data() {
    return {
      codeText: 0,
      formData: {},
      data: {},
      payChannel: [],
      payForm: {
        channel: 'PABANK',
        password: '',
        verifyCode: '',
        billId: ''
      },
      payFormRules: { password: [staticRules('支付密码').required], verifyCode: [staticRules('验证码').required] }
    }
  },
  computed: {
    isBtnDisabled() {
      let flag = false
      if (!this.payForm.password) {
        flag = true
      }
      if (this.context) {
        flag = true
      }
      return flag
    }
  },
  mounted() {},
  methods: {
    async fetchOption() {
      const res = await queryProjecInfoByUser()
      if (res.code === 0) {
        this.payChannel = res.data.payChannels
        this.payForm.channel = this.payChannel[0].value
      }
    },
    updateView(params) {
      this.data = params
      this.fetchOption()
      this.showDialog()
    },
    submitPay() {
      this.$message.success('结款成功')
    },
    // 倒计时
    countdownSeconds() {
      let timer = null
      this.codeText = 60
      timer = setInterval(() => {
        this.codeText--
        if (this.codeText <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    },
    // 获取验证码
    async getVerificationCode() {
      const res = await verifyMsg()
      if (res.code === 0) {
        this.countdownSeconds()
      }
    },
    handleSetpassword() {
      this.$router.push({ name: 'ResetPassword' })
    },
    async confirm() {
      this.$refs['payForm'].validate(async valid => {
        if (valid) {
          const data = {
            channel: this.payForm.channel,
            password: md5(this.payForm.password),
            verifyCode: this.payForm.verifyCode,
            billId: this.data.id
          }
          const res = await postPayBill(data)
          if (res.code === 0) {
            this.$message.success('结款成功')
            this.hideDialog()
          }
        }
      })
    }
  }
}
</script>
