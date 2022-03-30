<template>
  <div class="reset-password">
    <password-header title="修改登录密码" handle-text="返回上一页" :handle-click="goBack" />
    <main class="reset-password-main">
      <div v-if="!isSuccess" class="password-edit-content">
        <el-form :model="form" label-width="100px" :rules="rules" ref="form">
          <el-form-item label="手机号">
            <span>{{ userInfo.username }}</span>
          </el-form-item>
          <el-form-item label="验证码" prop="smsCode">
            <el-input
              v-model="form.smsCode"
              placeholder="请输入验证码"
              style="width: 230px; margin-right: 16px"
              :maxlength="6"
            ></el-input>
            <el-button type="danger" plain style="width: 104px" @click="sendSms" :disabled="smsSended">
              {{ smsSended ? btnCount : '获取验证码' }}
            </el-button>
          </el-form-item>
          <input-prevent-auto-complete></input-prevent-auto-complete>
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              v-model="form.oldPassword"
              placeholder="请输入旧密码"
              style="width: 350px"
              type="password"
              readonly
              @focus="removeAttribute"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-popover popper-class="password-tips-pop" placement="right" width="200" trigger="focus">
              <el-input
                slot="reference"
                v-model="form.newPassword"
                placeholder="8~20位大写、小写、数字组合"
                style="width: 350px"
                type="password"
                readonly
                @focus="removeAttribute"
                :maxlength="20"
              ></el-input>
              <template>
                <p>密码由8-20位字符组成，需包含大、小写字母及数字</p>
                <p>不能含连续4个及以上的重复字符（如：8888）</p>
              </template>
            </el-popover>
          </el-form-item>
          <el-form-item label="确认密码" prop="comfirmPassword">
            <el-input
              v-model="form.comfirmPassword"
              placeholder="请再次输入新密码"
              style="width: 350px"
              type="password"
              readonly
              @focus="removeAttribute"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <div class="edit-password-btn">
            <el-button type="primary" @click="updateLoginPassword">确定</el-button>
          </div>
        </el-form>
      </div>
      <success-component v-else title="密码修改成功！" :seconds="seconds" :handleClick="logout"></success-component>
    </main>
    <captcha ref="captcha" @captchSuccess="successCaptcha" />
  </div>
</template>
<script>
import md5 from 'md5'
import BasePage from '@/mixins/BasePage'
import Page from '@/mixins/Page'
import { staticRules } from '@/utils/validate'
import { mapGetters } from 'vuex'
import captcha from '_c/Captcha/index'
import InputPreventAutoComplete from '_c/InputPreventAutoComplete/index.vue'
import { sendUpdatePwdSms, updateLoginPassword } from '@/apis/user'
import { removeToken } from '@/utils/auth'
import PasswordHeader from '../components/PasswordHeader.vue'
import SuccessComponent from '../components/SuccessComponent.vue'

export default {
  components: {
    PasswordHeader,
    SuccessComponent,
    captcha,
    InputPreventAutoComplete
  },
  mixins: [BasePage, Page],
  data() {
    return {
      isSuccess: false,
      seconds: 3,
      smsSended: false,
      btnCount: 60,
      form: {
        smsCode: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        smsCode: [staticRules('验证码').required],
        oldPassword: [staticRules('旧密码').required],
        newPassword: [staticRules('新密码').required, staticRules('新密码').iptPwd],
        comfirmPassword: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: (rule, value, cb) => {
              if (value !== this.form.newPassword) {
                cb(new Error('两次输入的密码不一致'))
              } else {
                cb()
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    updateLoginPassword() {
      if (!this.smsSended) {
        this.$message.error('请先获取验证码')
        return
      }
      this.$refs['form'].validate(async valid => {
        if (valid) {
          const res = await updateLoginPassword({
            smsPhone: this.userInfo.username,
            smsCode: this.form.smsCode,
            oldPassword: md5(this.form.oldPassword),
            newPassword: md5(this.form.newPassword)
          })
          if (res.data) {
            this.isSuccess = true
            removeToken()
            const timer = setInterval(() => {
              this.seconds--
              if (this.seconds === 0) {
                this.logout()
              }
            }, 1000)
            this.$once('hook:beforeDestroy', () => {
              clearInterval(timer)
            })
          }
        } else {
          return false
        }
      })
    },
    logout() {
      // 三个端 只有这里这个地址不一样
      location.href = '/login'
    },
    removeAttribute($event) {
      $event.target.removeAttribute('readonly')
    },
    sendSms() {
      if (this.smsSended) {
        return
      }
      this.$refs.captcha.updateView()
    },
    successCaptcha(validate) {
      // 滑块验证通过 发起短信请求
      sendUpdatePwdSms({
        smsPhone: this.userInfo.username,
        validate
      })
        .then(() => {
          this.btnCountDown()
        })
        .catch(() => {})
    },
    btnCountDown() {
      this.smsSended = true
      const timer = setInterval(() => {
        this.btnCount--
        if (this.btnCount === 0) {
          this.smsSended = false
          this.btnCount = 60
          clearInterval(timer)
        }
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.reset-password {
  background-color: #eff0f4;
  min-height: 100%;
  .reset-password-main {
    flex: 1;
    padding: 0 90px 24px;
    .password-edit-content {
      display: flex;
      justify-content: center;
      padding: 40px;
      background-color: #fff;
      .edit-password-btn {
        display: flex;
        justify-content: flex-end;
        width: 450px;
        margin-bottom: 62px;
        .el-button {
          width: 350px;
        }
      }
    }
  }
}
</style>
