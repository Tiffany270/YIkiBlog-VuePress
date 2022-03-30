<template>
  <dialog-container :ref="DIALOG_REF" :title="title" @closed="resetAll" width="560px">
    <div v-if="isShowForm">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" size="medium">
        <el-form-item label="手机号" prop="smsPhone">
          <div>{{ $store.getters.userInfo.username }}</div>
        </el-form-item>
        <el-form-item label="验证码" prop="smsCode">
          <el-input
            ref="codeInput"
            v-model.trim="form.smsCode"
            style="width: 150px"
            maxlength="6"
            placeholder="请输入"
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
        <template>
          <el-form-item
            v-if="settingType === 'loginPassword' || form.payPasswordStatus"
            label="旧密码"
            prop="oldPassword"
          >
            <el-input
              v-model.trim="form.oldPassword"
              maxlength="18"
              style="width: 275px"
              placeholder="请输入旧密码"
              autocomplete="off"
              type="password"
            />
          </el-form-item>
          <el-form-item v-else label="密码" prop="newPassword">
            <el-popover placement="right" trigger="hover">
              <p class="popover-tips">密码由8-20位字符组成，需包含大、小写字母及数字</p>
              <p class="popover-tips">不能含连续4个及以上的重复字符（例如：8888）</p>
              <el-input
                v-model.trim="form.newPassword"
                maxlength="18"
                placeholder="8~20位大写、小写、数字组合"
                autocomplete="off"
                style="width: 275px"
                slot="reference"
                type="password"
              />
            </el-popover>
          </el-form-item>
          <el-form-item
            v-if="settingType === 'loginPassword' || form.payPasswordStatus"
            label="新密码"
            prop="newPassword"
          >
            <el-popover placement="right" trigger="hover">
              <p class="popover-tips">密码由8-20位字符组成，需包含大、小写字母及数字</p>
              <p class="popover-tips">不能含连续4个及以上的重复字符（例如：8888）</p>
              <el-input
                v-model.trim="form.newPassword"
                maxlength="18"
                type="password"
                placeholder="8~20位大写、小写、数字组合"
                autocomplete="off"
                style="width: 275px"
                slot="reference"
              />
            </el-popover>
          </el-form-item>
        </template>
        <el-form-item label="确认密码" prop="surePassword">
          <el-input
            v-model.trim="form.surePassword"
            :placeholder="`请再次输入密码`"
            clearable
            type="password"
            style="width: 275px"
          />
        </el-form-item>
      </el-form>
      <captcha ref="captcha" @captchSuccess="successCaptcha" />
    </div>
    <div v-else class="modify-success-content">
      <div class="modify-success-text">
        <i
          class="iconfont xbicon-complete"
          style="font-size: 22px; vertical-align: bottom; color: #67c23a"
        />密码修改成功!
      </div>
      <div class="modify-success-tip">
        请牢记新密码，<span class="color-text-primary">{{ counter }}s</span>后返回登录页，点击
        <span class="color-test-link" @click="exitLogin">立即跳转</span>
      </div>
    </div>
    <div v-if="isShowForm" slot="footer">
      <el-button size="small" @click="hideDialog">取消</el-button>
      <el-button :disabled="disabledBtn" size="small" type="primary" @click="submitForm">提交</el-button>
    </div>
  </dialog-container>
</template>

<script>
import { sendSms, updateSettingInfo } from '@/apis/setting'

import BaseDialog from '@/mixins/BaseDialog'
import captcha from '_c/Captcha/index'
import { staticRules } from '@/utils/validate'
import { validate_newPassword, validate_surePassword } from '@/utils/regex'
// import { logout } from '@/apis/user'
import { removeToken } from '@/utils/auth'

export default {
  name: 'DialogPasswordSetting',
  components: { captcha },
  mixins: [BaseDialog],
  data() {
    return {
      disabledBtn: false,
      isShowForm: true,
      settingType: 'payPassword',
      form: {
        payPasswordStatus: false,
        smsPhone: '',
        smsCode: '',
        oldPassword: '',
        newPassword: '',
        surePassword: ''
      },
      rules: {
        smsCode: [staticRules().required],
        oldPassword: [{ trigger: 'change' }, staticRules().required],
        // payPassword: [
        //   { trigger: 'change', validator: validate_newPassword },
        //   staticRules().required
        // ],
        newPassword: [{ trigger: 'change', validator: validate_newPassword }, staticRules().required],
        surePassword: [{ trigger: 'change', validator: validate_surePassword }, staticRules().required]
      },
      btnTimer: 0,
      timerId: '',
      counter: 3
    }
  },
  created() {
    this.form.smsPhone = this.$store.getters.userInfo.username
  },
  computed: {
    btnText() {
      return this.btnTimer ? `${this.btnTimer}s` : '获取验证码'
    },
    title() {
      return `${this.settingType === 'loginPassword' || this.form.payPasswordStatus ? '修改' : '设置'}${
        this.settingType === 'payPassword' ? '支付' : '登录'
      }密码`
    }
  },
  methods: {
    updateView(type, payPasswordStatus) {
      this.settingType = type
      this.form.payPasswordStatus = payPasswordStatus
      this.showDialog()
    },
    successCaptcha(validate) {
      // 滑块验证通过 发起短信请求
      sendSms({
        phone: this.form.smsPhone,
        validate,
        type: this.settingType === 'loginPassword' ? 'LOGIN' : 'PAY'
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
      if (!this.form.smsPhone) {
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
    countDown() {
      this.timer = setInterval(() => {
        this.counter--
        if (this.counter === 0) {
          clearInterval(this.timer)
          this.exitLogin()
        }
      }, 1000)
    },
    async exitLogin() {
      // const { code } = await logout()
      // if (code === 0) {
      // this.$router.push({ name: 'Login' })
      // 登录成功清除token 跳转到登录页
      removeToken()
      location.href = '/login'
      // }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.disabledBtn = true
          updateSettingInfo({
            ...this.form,
            updateType: this.settingType === 'loginPassword' ? 'LOGIN' : 'PAY'
          })
            .then(() => {
              if (this.settingType === 'loginPassword') {
                this.isShowForm = false
                this.countDown()
              } else {
                this.$emit('after-submit')
                this.hideDialog()
                this.disabledBtn = false
              }
            })
            .catch(() => {
              this.disabledBtn = false
            })
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
