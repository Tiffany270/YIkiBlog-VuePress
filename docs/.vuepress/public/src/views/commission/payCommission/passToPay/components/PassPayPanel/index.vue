<template>
  <block-container class="pass-pay-block">
    <div class="pass-pay">
      <div class="pass-pay__number">批次号：{{ payAmount.batchNo }}</div>
      <div class="pass-pay__container">
        <div class="pay-title">
          <i class="pay-title__dot" style="margin-bottom: 16px"></i>
          付款单信息
          <i class="pay-title__dot" style="margin-top: 16px"></i>
        </div>
        <div class="pay-content">
          <div class="pay-amount">
            <div class="pay-amount__item">
              <div class="pay-amount__item--label">账户余额（元）</div>
              <div class="pay-amount__item--number" style="color: #333333">
                <i class="iconfont xbicon-rmb" style="font-size: 30px; margin-right: 10px"></i>
                <span>{{ payAmount.balance | moneyConvert }}</span>
              </div>
            </div>
            <div class="pay-amount__item">
              <div class="pay-amount__item--label">待支付金额（元）</div>
              <div class="pay-amount__item--number" style="color: #cc3333">
                <i class="iconfont xbicon-rmb" style="font-size: 30px; margin-right: 10px"></i>
                <span>{{ payAmount.shouldDeductAmount | moneyConvert }}</span>
              </div>
            </div>
          </div>
          <div class="pay-form">
            <el-form :model="payForm" :rules="payFormRules" ref="form" label-width="100px">
              <el-form-item label="支付密码" prop="password">
                <el-input v-model.trim="payForm.password" style="width: 320px" type="password" show-password></el-input>
                <el-button
                  type="text"
                  style="color: #999999; margin-left: 14px; font-size: 12px"
                  @click="handleSetPayPassword"
                  >{{ userProject.hasPayPassword ? '忘记密码？' : '设置支付密码' }}</el-button
                >
              </el-form-item>
              <el-form-item label="验证码" prop="smsCode">
                <el-input v-model.trim="payForm.smsCode" style="width: 200px"></el-input>
                <el-button
                  type="danger"
                  plain
                  style="width: 104px; margin-left: 14px"
                  :disabled="isBtnDisabled"
                  v-preventReClick
                  @click="getSmsCode"
                  >{{ codeText || '获取验证码' }}</el-button
                >
              </el-form-item>
              <el-form-item label="">
                <el-button
                  type="primary"
                  style="width: 200px"
                  :disabled="!userProject.hasPayPassword"
                  @click="handlePay"
                  v-preventReClick
                  >确认支付</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div class="pay-tip">
            <i class="iconfont xbicon-warningbig" style="color: #cc3333; font-size: 20px; margin-right: 10px"></i>
            <span
              >提示：请在
              <span class="pay-time">{{ payAmount.expireDate }}</span>
              之前完成支付，否则订单将会取消</span
            >
          </div>
        </div>
      </div>
    </div>
  </block-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import { staticRules } from '@/utils/validate'
import { confirmPay, sendPaySms } from '@/apis/payroll'
import md5 from 'md5'
import { mapGetters } from 'vuex'
export default {
  name: 'HandlePayPanel',
  mixins: [BasePage],
  props: {
    payAmount: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      payForm: {
        password: '',
        smsCode: '',
        ctoken: ''
      },
      payFormRules: {
        password: [staticRules('支付密码').required, staticRules('支付密码').combineEnAndNumMinMax(0, 20)],
        smsCode: [staticRules('验证码').required]
      },
      codeText: 0
    }
  },
  computed: {
    isBtnDisabled() {
      let flag = false
      if (!this.payForm.password) {
        flag = true
      }
      if (this.codeText) {
        flag = true
      }
      if (!this.userProject.hasPayPassword) {
        flag = true
      }
      return flag
    },
    batchNo() {
      return this.$route.query.batchNo
    },
    ...mapGetters(['userProject'])
  },
  methods: {
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
    async getSmsCode() {
      const { code, data } = await sendPaySms({
        batchNo: this.$route.query.batchNo
      })
      if (code === 0) {
        this.countdownSeconds()
        this.payForm.ctoken = data.code
      }
    },
    handleSetPayPassword() {
      this.$router.push({ name: 'ResetPassword' })
    },
    handlePay() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          const { code } = await confirmPay({
            batchNo: this.batchNo,
            password: md5(this.payForm.password),
            smsCode: this.payForm.smsCode,
            ctoken: this.payForm.ctoken
          })
          if (code === 0) {
            this.$message({
              message: '支付成功',
              type: 'success'
            })
            this.$router.push({ name: 'PayCommission' })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
.pass-pay-block {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  margin-bottom: 24px;
}
@include b(pass-pay) {
  @include e(number) {
    font-size: 14px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 24px;
  }
  @include e(container) {
    border: 1px solid #cc3333;
    border-radius: 9px;
    display: flex;
    @include b(pay-title) {
      width: 60px;
      background-color: #cc3333;
      writing-mode: vertical-lr;
      border-radius: 9px 0 0 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      @include e(dot) {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fff;
      }
    }
    @include b(pay-content) {
      flex: 1;
      box-sizing: border-box;
      padding: 24px 24px 0 24px;
      @include b(pay-amount) {
        border-bottom: 1px dashed #cc3333;
        @include e(item) {
          margin-bottom: 18px;
          @include m(label) {
            font-size: 14px;
            font-weight: 400;
            color: #666666;
            margin-bottom: 5px;
          }
          @include m(number) {
            font-size: 28px;
            font-weight: 400;
          }
        }
      }
      @include b(pay-form) {
        border-bottom: 1px dashed #cc3333;
        padding: 24px 0;
        box-sizing: border-box;
      }
      @include b(pay-tip) {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-size: 400;
        .pay-time {
          font-size: blod;
          color: #cc3333;
        }
      }
    }
  }
}
</style>
