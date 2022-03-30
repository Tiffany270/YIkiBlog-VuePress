<template>
  <dialog-container :ref="DIALOG_REF" :title="title" width="550px" @closed="beforeClose">
    <el-form ref="form" :model="form" label-width="100px">
      <!-- <el-form-item label="支付密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入支付密码"
        />
        <el-button
          type="text"
          class="text-hint"
          @click="$router.push({ name: 'ResetPassword' })"
        >
          {{ userProject.hasPayPassword ? '忘记密码？' : '设置支付密码' }}
        </el-button>
      </el-form-item>
      <el-form-item label="验证码" prop="smsCode">
        <el-input v-model="form.smsCode" placeholder="请输入验证码" />
        <el-button :disabled="smsBtnDisabled" type="text" class="text-hint" @click="showCaptcha">
          {{ btnText }}
        </el-button>
      </el-form-item> -->
      <el-form-item label="支付密码" prop="password">
        <el-input v-model.trim="form.password" style="width: 200px" type="password" show-password></el-input>
        <el-button
          type="text"
          style="color: #999999; margin-left: 14px; font-size: 12px"
          @click="$router.push({ name: 'ResetPassword' })"
          >忘记密码？</el-button
        >
      </el-form-item>
      <el-form-item label="验证码" prop="smsCode">
        <el-input v-model.trim="form.smsCode" style="width: 200px"></el-input>
        <el-button
          type="danger"
          plain
          style="width: 104px; margin-left: 14px"
          :disabled="smsBtnDisabled"
          @click="showCaptcha"
          >{{ btnText || '获取验证码' }}</el-button
        >
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hideDialog">取消</el-button>
      <el-button :disabled="submitDisabled" type="primary" @click="submitForm"> 确认提现 </el-button>
    </div>
    <captcha ref="captcha" @captchSuccess="sendSmsCode" />
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import Captcha from '_c/Captcha'
import { confirmPassword, getWithdrawSmsCode } from '@/apis/wallet'
import { mapGetters } from 'vuex'
export default {
  name: 'DialogConfirmWithdraw',
  components: { Captcha },
  mixins: [BaseDialog],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        password: '',
        smsCode: ''
      },
      rules: {},
      btnTimer: 0,
      timerId: null
    }
  },
  computed: {
    ...mapGetters(['userProject']),
    submitDisabled() {
      return !(this.form.password && this.form.smsCode)
    },
    smsBtnDisabled() {
      return this.btnTimer > 0
    },
    btnText() {
      if (this.btnTimer > 0) {
        return this.btnTimer + 's'
      } else {
        return '获取验证码'
      }
    }
  },
  methods: {
    async updateView() {
      this.showDialog()
    },
    sendSmsCode(validate) {
      // 发送短信
      getWithdrawSmsCode({ validate }).then(() => {
        this.btnCountDown()
      })
    },
    showCaptcha() {
      this.$refs.captcha.updateView()
    },
    async submitForm() {
      // 校验验证码
      confirmPassword(this.form).then(({ data }) => {
        this.$emit('verified', data.ctoken)
        this.hideDialog()
      })
    },
    btnCountDown() {
      if (this.btnTimer <= 0) {
        this.btnTimer = 59
        this.timerId = setInterval(() => {
          this.btnTimer--
          if (this.btnTimer <= 0) {
            this.resetTimer()
          }
        }, 1000)
        this.$once('hook:beforeDestroy', this.resetTimer)
      }
    },
    resetTimer() {
      this.btnTimer = 0
      clearInterval(this.timerId)
    },
    beforeClose() {
      this.resetTimer()
      this.resetDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.withdraw-able-amount {
  color: #3360e1;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
.withdraw-hint {
  color: #e6a422;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
}
</style>
