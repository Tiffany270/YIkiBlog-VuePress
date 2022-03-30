<template>
  <div class="approval-record">
    <div class="approval-record__item" v-for="(item, index) in data" :key="index + Math.random()">
      <div class="record-info">
        <div class="record-info__row">
          <span class="record-info__row--label">处理人：</span>
          <span class="record-info__row--value">{{ item.name }}</span>
        </div>
        <div class="record-info__row" v-if="!(item.status === 'WITHDRAW')">
          <span class="record-info__row--label">{{ item.status === 'PASS' ? '其他事项说明' : '不开票原因' }}：</span>
          <span class="record-info__row--value">{{ item.remark }}</span>
        </div>
      </div>
      <div class="record-status">
        <img :src="statusImgs[item.status]" alt="" class="record-status__img" />
        <div class="">{{ item.createTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import PASS_IMG from '../../assets/images/approval-status-pass.png'
import NO_PASS_IMG from '../../assets/images/approval-status-nopass.png'
import WITHDRAW_IMG from '../../assets/images/approval-status-revoke.png'
export default {
  name: 'ApprovalRecord',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      statusImgs: {
        PASS: PASS_IMG,
        NO_PASS: NO_PASS_IMG,
        WITHDRAW: WITHDRAW_IMG
      }
    }
  },

  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(approval-record) {
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  @include e(item) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed #ccc;
  }
  .approval-record__item:last-child {
    border: none;
  }
  @include b(record-info) {
    @include e(row) {
      line-height: 40px;
    }
  }
  @include b(record-status) {
    @include e(img) {
      width: 120px;
      height: 120px;
    }
    @include e(time) {
      font-size: 12px;
    }
  }
}
</style>
