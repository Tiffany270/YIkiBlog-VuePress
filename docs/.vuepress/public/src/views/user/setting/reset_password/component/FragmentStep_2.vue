<template>
  <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="140px">
    <el-form-item label="密码" prop="password">
      <el-popover popper-class="view-popover" placement="right" trigger="hover">
        <p v-for="item in tips" :key="item" class="tips">{{ item }}</p>
        <el-input
          ref="codeInput"
          v-model.trim="form.password"
          style="width: 260px"
          placeholder="8~20位大写、小写、数字组合"
          maxlength="20"
          type="password"
          slot="reference"
          @keyup.enter.native="submitForm"
        />
      </el-popover>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input
        ref="codeInput"
        v-model.trim="form.newPassword"
        style="width: 260px"
        type="password"
        placeholder="请输入密码"
        maxlength="20"
      />
    </el-form-item>
    <el-form-item>
      <el-button :disabled="isSubmitDisabled" type="primary" size="medium" style="width: 260px" @click="submitForm"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
// import { passwordUpdate, payPasswordUpdate } from '@/api/setting'
// import { validate_surePassword, validate_newPassword } from '@/utils/validate'
// import MsgEncoder from '@/mixins/MsgEncoder'
// import PasswordEyes from '@/components/PasswordEyes'
import { forgetPayPassword } from '@/apis/setting'
import { validate_newPassword, validate_surePassword } from '@/utils/regex'
export default {
  name: 'FragmentStep2',
  props: {
    input: {
      type: Object,
      default() {
        return {
          mobile: '',
          newPassword: ''
        }
      }
    },
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
        password: '',
        mobile: '',
        code: '',
        newPassword: '',
        surePassword: '',
        domain: process.env.NODE_ENV === 'production' ? location.hostname.split('.')[0] : 'xinbao'
      },
      tips: ['密码由8-20位字符组成，需包含大、小写字母及数字', '不能含连续4个及以上的重复字符（例如：8888）'],
      rules: {
        newPassword: {
          required: true,
          trigger: 'blur',
          validator: validate_surePassword
        },
        password: {
          required: true,
          trigger: 'blur',
          validator: validate_newPassword
        }
      }
    }
  },
  computed: {
    isSubmitDisabled() {
      if (this.form.newPassword) {
        return !(this.form.password && this.form.newPassword)
      } else {
        return !(this.form.password && this.form.surePassword)
      }
    }
  },
  mounted() {
    this.form.code = this.input.code
    this.form.mobile = this.input.mobile
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          forgetPayPassword(this.form).then(() => {
            this.$emit('output', 3)
            // 设置支付密码成功后更新是否设置支付密码状态
            this.$store.dispatch('getUserInfo')
          })
        }
      })
    }
    // pageMethod() {
    //   const formList = {
    //     password: this.form.password,
    //     mobile: this.form.mobile,
    //     code: this.form.code,
    //     newPassword: this.form.newPassword,
    //     type: this.setType
    //   }
    //   this.page
    //     .method(formList)
    //     .then(() => {
    //       if (this.isPay) {
    //         this.$store.commit('SET_BILL_CONFIG', {
    //           ...this.$store.getters.billConfig,
    //           payPasswordStatus: false
    //         })
    //       }
    //       this.$emit('output', 3)
    //     })
    //     .catch(e => {
    //       if (e.code === 1020) {
    //         // 提示“请重新进行身份验证”重新跳转到身份验证页面进行验证
    //         setTimeout(() => {
    //           location.reload()
    //         }, 1500)
    //       }
    //     })
    // }
  }
}
</script>

<style lang="scss">
.view-popover {
  margin-left: 16px !important;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
p {
  line-height: 2em;
  margin: 0;
  padding: 0;
}
.el-form {
  width: 500px;
  margin: 0 auto;
  .el-input {
    width: 260px;
  }
}
.tips {
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
