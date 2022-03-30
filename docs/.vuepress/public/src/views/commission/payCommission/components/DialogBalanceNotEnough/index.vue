<template>
  <dialog-container :ref="DIALOG_REF" title="余额不足提醒" width="500px" @close="handleCloseDialog">
    <div class="banlance-warning">
      <div class="warn-tip">
        <div class="warn-tip__success">
          如已转账成功，请点击
          <span class="warn-tip__success__check" @click="handleCheckIsBalanceEnough">完成转账</span>
        </div>
        <div class="warn-tip__fail">未转账成功，如已转账，可能是银行反馈有延迟，请重新检测！</div>
      </div>
      <div class="bank-info">
        <div class="bank-info__noitce">您的专属账户如下，转账到该账户即可完成充值</div>
        <div class="bank-info__detail">
          <detail-list :row="1" :labelData="bankLabelData" :data="bankInfo"></detail-list>
        </div>
      </div>
    </div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import DetailList from '_c/DetailList'
import { queryBatchDetail, checkIsEnoughForBalance } from '@/apis/payroll'
export default {
  name: 'DialogBalanceNotEnough',
  mixins: [BaseDialog],
  components: {
    DetailList
  },
  data() {
    return {
      bankLabelData: [
        { label: '开户银行', key: 'payChnnelBankName' },
        { label: '账户名称', key: 'bankName' },
        { label: '银行账号', key: 'bankAccount' }
      ],
      bankInfo: {
        payChnnelBankName: '',
        bankName: '',
        bankAccount: ''
      },
      batchNo: ''
    }
  },
  methods: {
    show(batchNo) {
      this.batchNo = batchNo
      this.getBankInfo()
      this.showDialog()
    },
    async getBankInfo() {
      const { data } = await queryBatchDetail(this.batchNo)
      this.bankInfo.payChnnelBankName = data.payChannel.label || ''
      this.bankInfo.bankName = data.bankName || ''
      this.bankInfo.bankAccount = data.bankAccount || ''
    },
    async handleCheckIsBalanceEnough() {
      this.$loading({ text: '余额获取中...' })
      const {
        data: { canPay }
      } = await checkIsEnoughForBalance(this.batchNo)
      this.$loading().close()
      if (canPay) {
        await this.$router.push({
          name: 'PassToPay',
          query: {
            batchNo: this.batchNo
          }
        })
        this.hideDialog()
      }
    },
    handleCloseDialog() {
      if (this.$route.name === 'PayCommission') return
      this.$router.push({ name: 'PayCommission' })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(banlance-warning) {
  @include b(warn-tip) {
    width: 100%;
    height: 60px;
    border: 1px solid #faa700;
    background-color: #fffcf0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    @include e(success) {
      font-size: 14px;
      color: #faa700;
      @include e(check) {
        cursor: pointer;
        color: #409eff;
      }
    }
    @include e(fail) {
      font-size: 12px;
      color: #faa700;
    }
  }
  @include b(bank-info) {
    @include e(noitce) {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    @include e(detail) {
    }
  }
}
</style>
