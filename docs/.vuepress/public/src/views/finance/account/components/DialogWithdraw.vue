<template>
  <dialog-container :ref="DIALOG_REF" :title="title" width="700px" @closed="beforeClose">
    <warn-tips class="warn-tips">到账提示：提现到账时间为1个工作日</warn-tips>
    <div class="step_one" v-if="step === 1">
      <el-form ref="form" :model="stepOneForm" :rules="stepOneRules" label-width="120px">
        <el-form-item label="提现账户" prop="accountName">
          {{ stepOneForm.accountName }}
        </el-form-item>
        <el-form-item label="银行名称" prop="branchName">
          <el-input v-model.trim="stepOneForm.branchName" placeholder="请输入银行名称" clearable />
        </el-form-item>
        <el-form-item label="银行账户" prop="accountNo">
          <el-input v-model.trim="stepOneForm.accountNo" placeholder="请输入银行账户" clearable />
        </el-form-item>
        <el-form-item label="提现金额(元)" prop="amount">
          <el-input :value="stepOneForm.amount" placeholder="请输入提现金额" @input="valueInput">
            <template v-slot:suffix>
              <div class="withdraw-all" @click="withdrawAll">全部提现</div>
            </template>
          </el-input>
          <div class="withdraw-able-amount">
            {{ channelLabel }}可提现金额(元):
            {{ withdrawAbleAmount | moneyConvert }}
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="step_two" v-if="step === 2">
      <el-form ref="form" :model="stepTwoForm" :rules="stepTwoRules" label-width="120px">
        <el-form-item label="支付密码" prop="password">
          <el-input v-model.trim="stepTwoForm.password" style="width: 435px" type="password" show-password></el-input>
          <el-button
            type="text"
            style="color: #999999; margin-left: 14px; font-size: 12px"
            @click="$router.push({ name: 'ResetPassword' })"
            >忘记密码？</el-button
          >
        </el-form-item>
        <el-form-item label="验证码" prop="smsCode">
          <el-input v-model.trim="stepTwoForm.smsCode" style="width: 317px" clearable></el-input>
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
    </div>
    <div slot="footer">
      <el-button @click="hideDialog" v-show="step === 1">取消</el-button>
      <el-button v-show="step === 1" :disabled="btnDisabled" type="primary" @click="nextStep">下一步</el-button>
      <el-button v-show="step === 2" @click="step = 1">上一步</el-button>
      <el-button v-show="step === 2" :disabled="submitDisabled" type="primary" @click="submitForm">
        确认提现
      </el-button>
    </div>
    <!-- <dialog-confirm-withdraw
      ref="DialogConfirmWithdraw"
      :title="title"
      @verified="afterVerified"
    /> -->
    <captcha ref="captcha" @captchSuccess="sendSmsCode" />
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import WarnTips from '_c/WarnTips'
import { createNewWithdraw, getSubWalletBalanceView, getWithdrawSmsCode, confirmPassword } from '@/apis/wallet'
// import DialogConfirmWithdraw from './DialogConfirmWithdraw'
import { staticRules } from '@/utils/validate'
import { handleMoneyInputDecimal } from '@/utils/handleMoneyEvent'
import Captcha from '_c/Captcha'
export default {
  name: 'DialogWithdraw',
  components: { Captcha, WarnTips },
  mixins: [BaseDialog],
  props: {
    clientName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      view: {},
      withdrawAbleAmount: 0,
      stepOneForm: {
        accountName: '',
        amount: '',
        branchName: '',
        accountNo: '',
        channel: ''
      },
      stepOneRules: {
        branchName: [staticRules('银行名称').required, staticRules('银行名称').stringMinMax(0, 30)],
        accountNo: [staticRules('银行账户').required, staticRules('银行账户').bankNum],
        amount: [
          staticRules('提现金额').required,
          staticRules('提现金额').stringMinMax(0, 14),
          staticRules('提现金额').moneyNotZero
        ]
      },
      btnDisabled: false,
      step: 1,
      // submitDisabled: false,
      stepTwoForm: {
        password: '',
        smsCode: ''
      },
      stepTwoRules: {
        password: [staticRules('支付密码').required],
        smsCode: [staticRules('验证码').required, staticRules('验证码').number]
      },
      btnTimer: 0,
      timerId: null
    }
  },
  computed: {
    channelLabel() {
      return this.view.channel ? this.view.channel.label : ''
    },
    title() {
      return this.channelLabel + '提现'
    },
    submitDisabled() {
      return !(this.stepTwoForm.password && this.stepTwoForm.smsCode)
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
    async updateView(view) {
      this.view = view
      this.stepOneForm.accountName = this.clientName
      this.stepOneForm.channel = view.channel.value
      const { data } = await getSubWalletBalanceView({
        channel: view.channel.value
      })
      // 可提现金额为0
      if (!data.withdrawAbleAmount) {
        this.$message.warning('已预开票大于账户余额，暂无法提现')
        return
      }
      this.withdrawAbleAmount = data.withdrawAbleAmount
      this.showDialog()
    },
    withdrawAll() {
      this.stepOneForm.amount = this.withdrawAbleAmount
      this.$refs.stepOneForm.validateField('amount')
    },
    nextStep() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.stepOneForm.amount > this.withdrawAbleAmount) {
            this.$message.warning('提现金额不能大于可提现金额')
          } else {
            this.btnTimer = 0
            this.step = 2
          }
        }
      })
    },
    afterVerified(ctoken) {
      // 实际的提现申请
      createNewWithdraw({ ...this.stepOneForm, ctoken }).then(() => {
        this.$emit('after-withdraw-submit')
        this.hideDialog()
      })
    },
    valueInput(val) {
      this.stepOneForm.amount = handleMoneyInputDecimal(val)
    },
    showCaptcha() {
      this.$refs.captcha.updateView()
    },
    sendSmsCode(validate) {
      // 发送短信
      getWithdrawSmsCode({ validate }).then(() => {
        this.btnCountDown()
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
    async submitForm() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          // 校验验证码
          confirmPassword(this.stepTwoForm).then(({ data }) => {
            this.afterVerified(data.ctoken)
          })
        }
      })
    },
    beforeClose() {
      this.resetTimer()
      this.resetDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.withdraw-all {
  cursor: pointer;
  user-select: none;
  color: #333;
  padding-right: 10px;
}
.withdraw-able-amount {
  position: absolute;
  right: 0;
  color: #3360e1;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-size: 12px;
}
.warn-tips {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 0;
  line-height: 30px;
}
.step_one {
  min-height: 290px;
  padding-top: 30px;
  box-sizing: border-box;
}
.step_two {
  min-height: 290px;
  box-sizing: border-box;
  padding-top: 45px;
  // margin-top: 43px;
}
// .withdraw-amount-block {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
//   .withdraw-able-amount {
//     color: #3360e1;
//     font-size: 14px;
//     line-height: 20px;
//     font-weight: 400;
//   }
//   .withdraw-hint {
//     display: flex;
//     align-items: center;
//     color: #e6a422;
//     font-size: 12px;
//     line-height: 20px;
//     font-weight: 400;
//   }
// }
</style>
