<template>
  <dialog-container :ref="DIALOG_REF" :title="title" width="800px" @closed="resetDialog">
    <el-form v-for="(item, idx) of list" :key="idx" label-width="150px" class="withdraw-flow-card">
      <div class="index">{{ idx + 1 }}</div>
      <el-form-item label="提现金额"> ¥{{ item.amount | moneyConvert }} </el-form-item>
      <el-form-item label="提现时间"> {{ item.createTime }} </el-form-item>
      <el-form-item label="状态">
        {{ item.status && item.status.label }}
      </el-form-item>
      <el-form-item label="到账账户名称"> {{ item.accountName }} </el-form-item>
      <el-form-item label="到账银行名称"> {{ item.branchName }} </el-form-item>
      <el-form-item label="到账银行账号"> {{ item.accountNo }} </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hideDialog">关闭</el-button>
    </div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import { getWithdrawProgress } from '@/apis/wallet'

export default {
  name: 'DialogWithdrawFlow',
  mixins: [BaseDialog],
  data() {
    return {
      channel: {},
      list: []
    }
  },
  computed: {
    title() {
      return this.channel.label + '提现进度'
    }
  },
  methods: {
    updateView(channel) {
      this.channel = channel
      getWithdrawProgress({ channel: channel.value }).then(({ data }) => {
        this.list = data
        this.showDialog()
      })
    }
  }
}
</script>

<style lang="scss">
$common-border-radius: 8px;

.withdraw-flow-card {
  position: relative;
  padding: 15px 15px 24px;
  background-color: #f2f2f2;
  border-radius: $common-border-radius;
  margin-bottom: 15px;
  overflow: hidden;
  .index {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #333;
    text-align: center;
    font-size: 14px;
    color: #fff;
    width: 48px;
    line-height: 28px;
    border-bottom-left-radius: $common-border-radius;
  }
  .el-form-item {
    margin-bottom: 0;
    .el-form-item__label {
      line-height: 28px;
    }
    .el-form-item__content {
      line-height: 28px;
    }
  }
}
</style>
