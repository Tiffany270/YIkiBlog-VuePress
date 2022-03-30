<template>
  <div class="login">
    <div class="login__left">
      <img src="../../assets/images/logo-login-bg.jpg" />
    </div>
    <div class="login__right">
      <div class="login-panel">
        <div class="login-panel__logo">
          <img src="../../assets/images/logo-login-form@2x.png" alt="" />
        </div>
        <div class="login-panel__form">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            status-icon
          >
            <el-form-item prop="mobile">
              <el-input
                v-model="loginForm.mobile"
                autocomplete="off"
                placeholder="请输入用户名"
                clearable
              >
                <i
                  slot="prefix"
                  class="iconfont icon-nav-user"
                  style="font-size: 18px"
                ></i>
              </el-input>
            </el-form-item>
            <!-- <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                autocomplete="off"
                type="password"
                placeholder="请输入密码"
              >
                <i
                  slot="prefix"
                  class="iconfont icon-nav-lock"
                  style="font-size: 18px"
                ></i>
              </el-input>
            </el-form-item> -->
            <el-form-item prop="smsCode">
              <el-input
                v-model="loginForm.smsCode"
                autocomplete="off"
                style="width: 200px"
                placeholder="请输入验证码"
                @keyup.native.enter="handleLogin"
              ></el-input>
              <el-button
                type="danger"
                plain
                style="width: 104px; margin-left: 14px"
                :disabled="isBtnDisabled"
                @click="$refs.captcha.updateView()"
              >
                {{ codeText || '获取验证码' }}
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%"
                @click="handleLogin"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div class="login-panel__forget">忘记密码</div> -->
      </div>
    </div>
    <!-- 滑块验证 -->
    <Captcha ref="captcha" @on-success="successCaptcha" />
  </div>
</template>

<script>
import Captcha from '@components/Captcha'
import { formRules } from '@/utils/form-rules'
import { findLoginSmsCode, updateLoginBySMS } from '@/api/user'
import { setToken } from '@/utils/auth'
import { isValidMobile } from '@/utils/regex-validate'
export default {
  name: 'Login',
  components: {
    Captcha
  },
  data() {
    return {
      loginForm: {
        mobile: '',
        // password: '',
        smsCode: ''
      },
      loginRules: {
        mobile: [formRules('用户名').required, formRules('用户名').mobile],
        // password: [formRules('密码').required]
        smsCode: [formRules('验证码').required]
      },
      codeText: 0,
      timer: null
    }
  },
  computed: {
    isBtnDisabled() {
      let flag = false
      if (!this.loginForm.mobile || !isValidMobile(this.loginForm.mobile)) {
        flag = true
      }
      if (this.codeText) {
        flag = true
      }
      return flag
    }
  },
  watch: {
    'loginForm.mobile'() {
      this.codeText = 0
      clearInterval(this.timer)
    }
  },
  methods: {
    // 倒计时
    countdownSeconds() {
      this.codeText = 60
      this.timer = setInterval(() => {
        this.codeText--
        if (this.codeText <= 0) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    // 图形验证码获取成功后发生短信验证码
    successCaptcha(validate) {
      findLoginSmsCode({
        mobile: this.loginForm.mobile,
        ctoken: validate,
        domain: '@accounts.xinbaokeji.cn',
        systemName: 'accounts'
      })
        .then(res => {
          if (res.code === 0) this.countdownSeconds()
        })
        .catch(() => {
          this.codeText = 0
          clearInterval(this.timer)
        })
    },
    // 登录
    handleLogin() {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          const { data } = await updateLoginBySMS({
            domain: '@accounts.xinbaokeji.cn',
            systemName: 'accounts',
            ...this.loginForm
          })
          if (data) {
            // 登录成功后写入token
            setToken(data.access_token, data.token_type)
            // 跳转到首页
            this.$router.push('/').catch(() => {})
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  width: 100%;
  height: 100%;
  &__left {
    position: relative;
    flex: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__right {
    background: #fff;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-panel {
      width: 320px;
      &__logo {
        margin-bottom: 30px;
        img {
          width: 100%;
        }
      }
      &__forget {
        margin-top: 22px;
        text-align: right;
        font-size: 12px;
        color: #999999;
        cursor: pointer;
      }
    }
  }
}
</style>
