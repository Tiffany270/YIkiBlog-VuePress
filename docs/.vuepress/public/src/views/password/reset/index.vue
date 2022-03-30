<template>
  <div class="reset-password">
    <password-header title="重置登录密码" handle-text="返回登录" :handle-click="gotoLogin" />
    <main class="reset-password-main">
      <div v-if="!isSuccess" class="reset-password-content">
        <div class="reset-password-tips">
          <div class="password-tips-left"></div>
          <div class="password-tips-right">
            <i class="iconfont xbicon-warning2"></i>
            <span>提示：为保障你的账号安全，首次登录后请重置登录密码</span>
          </div>
        </div>
        <el-form class="reset-password-form" :model="form" label-width="100px" :rules="rules" ref="form">
          <el-form-item label="新密码" prop="password">
            <el-popover popper-class="password-tips-pop" placement="right" width="200" trigger="focus">
              <el-input
                slot="reference"
                v-model="form.password"
                placeholder="8~20位大写、小写、数字组合"
                style="width: 350px"
                type="password"
                :maxlength="20"
              ></el-input>
              <template>
                <p>密码由8-20位字符组成，需包含大、小写字母及数字</p>
                <p>不能含连续4个及以上的重复字符（如：8888）</p>
              </template>
            </el-popover>
          </el-form-item>
          <el-form-item label="确认新密码" prop="comfirmPassword">
            <el-input
              v-model="form.comfirmPassword"
              placeholder="请再次输入新密码"
              style="width: 350px"
              type="password"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <div class="reset-password-btn">
            <el-button type="primary" @click="resetLoginPassword">确定</el-button>
          </div>
        </el-form>
      </div>
      <success-component v-else title="密码重置成功！" :seconds="seconds" :handle-click="logout"></success-component>
    </main>
  </div>
</template>
<script>
import md5 from 'md5'
import { staticRules } from '@/utils/validate'
import { resetLoginPassword } from '@/apis/user'
import { removeToken } from '@/utils/auth'
import PasswordHeader from '../components/PasswordHeader.vue'
import SuccessComponent from '../components/SuccessComponent.vue'

export default {
  name: 'PasswordReset',
  components: {
    PasswordHeader,
    SuccessComponent
  },
  data() {
    return {
      isSuccess: false,
      form: {
        password: '',
        comfirmPassword: ''
      },
      rules: {
        password: [staticRules('新密码').required, staticRules('新密码').iptPwd],
        comfirmPassword: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: (rule, value, cb) => {
              if (value !== this.form.password) {
                cb(new Error('两次输入的密码不一致'))
              } else {
                cb()
              }
            }
          }
        ]
      },
      seconds: 3
    }
  },
  methods: {
    async logout() {
      // 三个端 只有这里这个地址不一样
      location.href = '/login'
    },
    gotoLogin() {
      removeToken()
      this.logout()
    },
    resetLoginPassword() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          const res = await resetLoginPassword({
            newPassword: md5(this.form.password)
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
    .reset-password-content {
      border-radius: 8px;
      background-color: #fff;
      padding: 24px;
      .reset-password-tips {
        display: flex;
        height: 58px;
        width: 100%;
        margin-bottom: 24px;
        .password-tips-left {
          width: 8px;
          background-color: #e6a422;
          border-radius: 8px 0px 0px 8px;
        }
        .password-tips-right {
          flex: 1;
          display: flex;
          align-items: center;
          line-height: 58px;
          color: #e6a422;
          border: 1px solid #e6a422;
          border-radius: 0 8px 8px 0;
          background-color: #fff4e5;
          i {
            font-size: 20px;
            margin: 0 10px 0 15px;
          }
          span {
            font-size: 14px;
          }
        }
      }
      .reset-password-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        .reset-password-btn {
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
}
</style>
