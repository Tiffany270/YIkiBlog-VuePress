<template>
  <dialog-container :ref="DIALOG_REF" title="忘记登录密码" @closed="resetAll" width="560px">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px" size="medium">
      <template v-if="step === 1">
        <el-form-item label="账号" prop="mobile">
          <el-input
            ref="codeInput"
            v-model.trim="form.mobile"
            style="width: 275px"
            maxlength="18"
            placeholder="请输入账号"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="smsCode">
          <el-input
            ref="codeInput"
            v-model.trim="form.smsCode"
            style="width: 150px"
            maxlength="6"
            placeholder="请输入验证码"
            autocomplete="off"
          />
          <el-button
            :disabled="btnTimer > 0"
            :type="!btnTimer ? 'primary' : ''"
            :plain="!btnTimer"
            style="margin-left: 12px"
            @click="sendSmsCode"
            >{{ btnText }}</el-button
          >
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="新密码" prop="password">
          <el-popover placement="right" trigger="hover">
            <p class="popover-tips">密码由8-20位字符组成，需包含大、小写字母及数字</p>
            <p class="popover-tips">不能含连续4个及以上的重复字符（例如：8888）</p>
            <el-input
              v-model.trim="form.password"
              maxlength="20"
              type="password"
              placeholder="8~20位大写、小写、数字组合"
              autocomplete="off"
              style="width: 275px"
              slot="reference"
            />
          </el-popover>
        </el-form-item>
        <el-form-item label="确认密码" prop="surePassword">
          <el-input
            v-model.trim="form.surePassword"
            :placeholder="`请再次输入密码`"
            clearable
            type="password"
            style="width: 275px"
          />
        </el-form-item>
      </template>
    </el-form>
    <captcha ref="captcha" @captchSuccess="successCaptcha" />
    <div slot="footer">
      <el-button size="small" @click="hideDialog">取消</el-button>
      <el-button :disabled="disabledBtn" size="small" type="primary" @click="submitForm">{{ submitText }}</el-button>
    </div>
  </dialog-container>
</template>

<script>
import { sendCodeByCaptcha, forgetLoginPassword, forgetPassword } from '@/apis/setting'

import BaseDialog from '@/mixins/BaseDialog'
import captcha from '_c/Captcha/index'
import { staticRules } from '@/utils/validate'
import { validate_newPassword, validate_surePassword } from '@/utils/regex'

export default {
  name: 'DialogPasswordSetting',
  components: { captcha },
  mixins: [BaseDialog],
  data() {
    return {
      disabledBtn: false,
      form: {
        mobile: '',
        smsCode: '',
        password: '',
        code: '',
        domain: process.env.NODE_ENV === 'production' ? location.hostname.split('.')[0] : 'xinbao'
      },
      step: 1,
      rules: {
        mobile: [staticRules().required],
        smsCode: [staticRules().required],
        password: [{ trigger: 'change', validator: validate_newPassword }, staticRules().required],
        surePassword: [{ trigger: 'change', validator: validate_surePassword }, staticRules().required]
      },
      btnTimer: 0,
      timerId: '',
      counter: 3
    }
  },
  computed: {
    btnText() {
      return this.btnTimer ? `${this.btnTimer}s` : '获取验证码'
    },
    submitText() {
      return this.step === 1 ? `下一步` : '提交'
    }
  },
  methods: {
    updateView() {
      this.showDialog()
    },
    successCaptcha(validate) {
      // 滑块验证通过 发起短信请求
      sendCodeByCaptcha({
        mobile: this.form.mobile,
        validate,
        domain: process.env.NODE_ENV === 'production' ? location.hostname.split('.')[0] : 'xinbao'
      })
        .then(() => {
          this.btnCountDown()
        })
        .catch(() => {
          this.resetTimer()
        })
    },
    resetTimer() {
      this.btnTimer = 0
      clearInterval(this.timerId)
    },
    sendSmsCode() {
      if (!this.form.mobile) {
        this.$message.error('手机号不能为空')
        return
      }
      this.$refs.captcha.updateView()
    },
    btnCountDown() {
      if (this.btnTimer === 0) {
        this.btnTimer = 59
        this.timerId = setInterval(() => {
          this.btnTimer--
          if (this.btnTimer <= 0) {
            this.resetTimer()
          }
        }, 1000)
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.step === 1) {
            forgetPassword({ ...this.form }).then(({ data }) => {
              this.step++
              this.form.code = data.code
            })
          } else {
            this.disabledBtn = true
            forgetLoginPassword({
              ...this.form
            })
              .then(() => {
                this.disabledBtn = false
                this.hideDialog()
                this.$message.success('设置成功')
              })
              .catch(() => {
                this.disabledBtn = false
              })
          }
        }
      })
    },
    resetAll() {
      clearInterval(this.timerId)
      this.resetDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.modify-success-content {
  text-align: center;
  padding: 30px 0 90px;
  .svg-icon {
    font-size: 80px;
  }
  .modify-success-text {
    margin: 20px 0 14px;
    font-weight: 500;
    line-height: 22px;
  }
  .color-test-link {
    cursor: pointer;
    color: #6676ff;
  }
}
.popover-tips {
  margin: 0;
  &:before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin: 0 6px 0 0;
    vertical-align: middle;
    background-color: #6676ff;
  }
}
</style>
