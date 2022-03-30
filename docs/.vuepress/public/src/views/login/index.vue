<template>
  <div class="login">
    <div class="login__left">
      <img :src="serviceProviderInfo.loginPic || occupyImg" alt="" />
      <!-- <div class="login__left__welcome">
        <div style="font-size: 42px; color: #fff">欢迎登录</div>
        <div style="font-size: 12px; color: #fff">WELCOME TO OUR SYSTEM</div>
      </div>
      <div class="login__left__introduce">
        <div style="font-size: 40px; color: #fff; margin-bottom: 16px">
          服务商佣金发放平台
        </div>
        <div style="font-size: 20px; color: #fff; margin-bottom: 10px">
          以科技赋能新就业形态发佣报税
        </div>
        <div style="font-size: 20px; color: #fff">服务2亿自由职业者</div>
      </div> -->
    </div>
    <div class="login__right">
      <div class="login__right__panel">
        <div class="login__right__panel__logo">
          <img v-if="serviceProviderInfo.logoPic" :src="serviceProviderInfo.logoPic" alt="" />
        </div>
        <div class="login__right__panel__form">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
            <el-form-item prop="username">
              <el-input v-model.trim="loginForm.username" autocomplete="off" placeholder="请输入用户名" clearable>
                <i slot="prefix" class="iconfont xbicon-user" style="font-size: 22px"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model.trim="loginForm.password" autocomplete="off" type="password" placeholder="请输入密码">
                <i slot="prefix" class="iconfont xbicon-password" style="font-size: 22px"></i
              ></el-input>
            </el-form-item>
            <el-form-item prop="smsCode">
              <el-input
                v-model.trim="loginForm.smsCode"
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
                @click="getVerificationCode"
                >{{ codeText || '获取验证码' }}</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="handleLogin" v-preventReClick>登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="login__right__panel__forget" @click="$refs.DialogPassword.updateView()">忘记密码</div>
      </div>
    </div>
    <dialog-password ref="DialogPassword" />
  </div>
</template>

<script>
import { staticRules } from '@/utils/validate'
import { getSmsCode, login } from '@/apis/user'
import { setToken } from '@/utils/auth'
import md5 from 'md5'
import occupyImg from '../../assets/images/login-bg@2x.jpg'
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  components: {
    DialogPassword: () => import(/* webpackChunkName: "DialogPassword" */ './component/DialogPassword')
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        smsCode: '',
        domain: process.env.NODE_ENV === 'production' ? location.hostname.split('.')[0] : 'xinbao'
      },
      loginRules: {
        username: [staticRules('用户名').required, staticRules('用户名').mobile],
        password: [staticRules('密码').required],
        smsCode: [staticRules('验证码').required]
      },
      codeText: 0,
      occupyImg,
      timer: null
    }
  },
  computed: {
    isBtnDisabled() {
      let flag = false
      if (!this.loginForm.username && !this.loginForm.password) {
        flag = true
      }
      if (this.codeText) {
        flag = true
      }
      return flag
    },
    ...mapGetters(['serviceProviderInfo'])
  },
  watch: {
    'loginForm.username'() {
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
    // 获取验证码
    async getVerificationCode() {
      const { code } = await getSmsCode({
        username: this.loginForm.username,
        password: md5(this.loginForm.password),
        domain: this.loginForm.domain
      })
      if (code === 0) {
        this.countdownSeconds()
      }
    },
    // 登录
    handleLogin() {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          const { data } = await login({
            username: this.loginForm.username,
            password: md5(this.loginForm.password),
            domain: this.loginForm.domain,
            smsCode: this.loginForm.smsCode
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
@import '@/styles/index';
@include b(login) {
  display: flex;
  width: 100%;
  height: 100%;
  @include e(left) {
    position: relative;
    flex: 1;
    img {
      width: 100%;
      height: 100%;
    }
    @include e(welcome) {
      width: 260px;
      height: 120px;
      padding: 30px 0 14px 0;
      box-sizing: border-box;
      text-align: right;
      border-bottom: 4px solid #fff;
      position: absolute;
      left: 0;
      top: 0;
    }
    @include e(introduce) {
      width: 360px;
      height: 140px;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: 350px auto;
    }
  }
  @include e(right) {
    background: #fff;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    @include e(panel) {
      width: 320px;
      @include e(logo) {
        // height: 100px;
        margin-bottom: 30px;
        img {
          width: 100%;
          // height: 100%;
        }
      }
      @include e(form) {
      }
      @include e(forget) {
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
