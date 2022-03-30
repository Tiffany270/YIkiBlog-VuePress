<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="medium" @submit.native.prevent>
      <el-form-item label="手机号码" prop="mobile">
        <div>{{ form.mobile }}</div>
      </el-form-item>

      <el-form-item label="验证码" prop="smsCode" required>
        <el-input
          ref="codeInput"
          v-model.trim="form.smsCode"
          style="width: 150px"
          placeholder="请输入验证码"
          maxlength="6"
          @keyup.enter.native="submitForm"
        />
        <p class="sendCodeBtn" @click="sendSmsCode">
          <span>{{ btnText }}</span>
        </p>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="isSubmitDisabled" type="primary" size="medium" style="width: 260px" @click="submitForm"
          >下一步</el-button
        >
      </el-form-item>
    </el-form>
    <captcha ref="captcha" @captchSuccess="successCaptch" />
  </div>
</template>

<script>
import { sendCodeByCaptcha, forgetPassword } from '@/apis/setting'
import captcha from '@/components/Captcha/index'
import { staticRules } from '@/utils/validate'
export default {
  name: 'FragmentStep1',
  components: { captcha },
  props: {
    isPay: {
      type: Boolean,
      default: false
    },
    setType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        mobile: '',
        smsCode: '',
        domain: process.env.NODE_ENV === 'production' ? location.hostname.split('.')[0] : 'xinbao'
      },
      btnTimer: 0,
      timerId: '',
      firstClick: true,
      canClick: false, // 验证是否获取验证码
      loginForm: {
        username: '',
        smsCode: '',
        password: '',
        grant_type: 'password'
      },
      rules: {
        smsCode: [staticRules('验证码').required]
      }
    }
  },
  computed: {
    isBtnDisabled() {
      return this.btnTimer > 0
    },
    isSubmitDisabled() {
      return !(this.form.mobile && this.form.smsCode)
    },
    btnText() {
      if (this.btnTimer > 0) {
        return `${this.btnTimer}s`
      } else {
        return '获取验证码'
      }
    },
    isUnSignIn() {
      return this.$route.name === 'resetPassword'
      // return this.$route.name === nameMap.login.reset_password
    }
  },
  created() {
    this.$nextTick(() => {
      this.form.mobile = this.$store.getters.userInfo.username
    })
  },
  methods: {
    successCaptch(validate) {
      // 滑块验证通过 发起短信请求
      const formSubmit = {
        mobile: this.form.mobile,
        validate: validate,
        domain: process.env.NODE_ENV === 'production' ? location.hostname.split('.')[0] : 'xinbao'
      }
      sendCodeByCaptcha(formSubmit)
        .then(() => {
          this.btnCountDown()
          this.firstClick = false
          this.canClick = true
          this.$refs.codeInput.$el.querySelector('input').focus()
        })
        .catch(() => {
          this.resetTimer()
        })
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        if (!this.canClick) {
          this.$message.error('请先获取验证码')
          return
        }
        // 根据手机号和验证码获取校验码
        forgetPassword(this.form).then(({ data }) => {
          this.$emit('output', 2, {
            mobile: this.form.mobile,
            code: data.code
          })
        })
      })
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
        this.$store.dispatch('addIntervalTimerId', this.timerId) // 添加全局的timerId，退出时统一处理
      }
    },
    sendSmsCode() {
      if (!this.firstClick) {
        return
      }
      // if (!this.form.mobile) {
      //   this.$message.error('手机号不能为空')
      //   return
      // }
      this.$refs.captcha.updateView()
    },
    resetTimer() {
      this.btnTimer = 0
      this.firstClick = true
      clearInterval(this.timerId)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variable';

$dark_gray: #889aa4;
$light_gray: #eee;

.el-form {
  width: 500px;
  margin: 0 auto;
  .el-input {
    width: 260px;
  }
}

.inline-container {
  position: relative;
  width: 260px;
  height: 36px;
  display: flex;
  .el-input {
    width: 120px;
    margin-right: 10px;
  }
  .captcha-img {
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    cursor: pointer;
  }
  .el-button {
    width: 140px;
  }
}
p {
  line-height: 2em;
  margin: 0;
  padding: 0;
}
.hint {
  margin: 10px auto;
  padding: 20px 50px;
  background-color: mix(white, $--color-primary, 90%);
  border: 1px solid mix(white, $--color-primary, 80%);
  h5,
  p {
    line-height: 2em;
    margin: 0;
    padding: 0;
  }
  h5 {
    // font-size: $main-fsz;
  }
  p {
    // font-size: $hint-fsz;
  }
}

.sendCodeBtn {
  display: inline-block;
  margin-left: 20px;
  color: $--color-primary;
  cursor: pointer;
  width: 76px;
  height: 36px;
  line-height: 36px;
  font-size: 12px;
}
</style>
