<template>
  <div class="fragment-wallet-card wallet-card-wrapper" :style="{ borderColor: subColor }">
    <div class="left-bar" :style="{ backgroundColor: mainColor }"></div>
    <div
      v-if="checkPermission('accountInfo-withdraw') && view.balance > 0"
      class="withdraw-button"
      :style="{ color: mainColor, backgroundColor: subColor }"
      @click="$emit('withdraw', view)"
    >
      提现
    </div>
    <div class="title-block">{{ view.channel && view.channel.label }}账户余额</div>
    <div class="money-block" :style="{ color: mainColor, borderColor: subColor }">
      <i class="iconfont xbicon-rmb"></i>
      {{ view.balance | moneyConvert }}
    </div>
    <div class="info-block">
      <div v-for="(item, idx) of infoConfig" :key="idx" class="info-item">
        <div class="info-title">{{ item.title }}</div>
        <div class="info-content">{{ item.getValue(view) }}</div>
      </div>
    </div>
    <div v-if="view.frozenBalance" class="extra-block" :style="{ borderColor: subColor }">
      <div class="info-item frozen-balance">
        <div class="info-title">冻结金额</div>
        <div class="info-content">¥{{ view.frozenBalance | moneyConvert }}</div>
      </div>
      <el-button
        v-if="view.withdrawProgressStatus"
        class="text-button"
        type="text"
        :style="{ color: mainColor }"
        @click="showDialogWithdrawFlow"
      >
        查看进度
      </el-button>
    </div>
    <dialog-withdraw-flow ref="DialogWithdrawFlow"></dialog-withdraw-flow>
  </div>
</template>

<script>
import DialogWithdrawFlow from './DialogWithdrawFlow'
export default {
  name: 'FragmentWalletCard',
  components: { DialogWithdrawFlow },
  props: {
    mainColor: {
      type: String,
      default: ''
    },
    subColor: {
      type: String,
      default: ''
    },
    view: {
      type: Object,
      default() {
        return {
          id: '', // 子钱包ID
          balance: '', // 余额
          frozenBalance: '', // 冻结金额
          channel: {
            // 支付渠道
            label: '',
            value: ''
          },
          accountName: '', // 账户名称
          accountNo: '', // 银行账户(虚拟子账户)
          bankBranch: '', // 开户行
          withdrawProgressStatus: false // 是否显示查看提现进度
        }
      }
    }
  },
  data() {
    return {
      infoConfig: [
        { title: '银行账户', getValue: view => view.accountNo },
        { title: '账户名称', getValue: view => view.accountName },
        { title: '开户银行', getValue: view => view.bankBranch }
      ]
    }
  },
  methods: {
    showDialogWithdrawFlow() {
      this.$refs.DialogWithdrawFlow.updateView(this.view.channel)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../common';
.fragment-wallet-card {
  width: 486px;
  padding-top: 21px;
  user-select: none;

  .withdraw-button {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    width: 100px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-bottom-left-radius: $card-border-radius;
    cursor: pointer;
    user-select: none;
  }
  .title-block {
    font-size: 14px;
    line-height: 19px;
    color: #333;
    font-weight: 700;
    margin-bottom: 14px;
  }

  .money-block {
    font-weight: 400;
    font-size: 28px;
    line-height: 32px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
    i {
      font-size: 28px;
      margin-right: 8px;
    }
  }
  .info-block {
    padding: 12px 0 20px;
  }
  .extra-block {
    border-top: 1px solid #ccc;
    padding: 16px 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text-button {
      font-size: 12px;
      font-weight: 400;
      line-height: 28px;
      padding: 0;
    }
  }

  // 文字列表
  .info-item {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 14px;
    line-height: 28px;
    .info-title {
      margin-right: 20px;
    }
    .info-content {
    }
  }
}
</style>
