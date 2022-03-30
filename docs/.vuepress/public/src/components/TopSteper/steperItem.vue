<template>
  <div class="step-item" :class="{ 'is-current-item': isCurrent }">
    <i class="iconfont xbicon-stepcomplete step-item__pass" v-if="isLast"></i>
    <span v-else class="step-item__number" :class="{ 'is-current-number': isCurrent }">{{ index + 1 }}</span>
    <span class="step-item__text" :class="{ 'is-current-text': isCurrent, 'is-last-text': isLast }">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'StepItem',
  props: {
    text: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    isCurrent: {
      type: Boolean,
      default: false
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '@/styles/mixin';
@include b(step-item) {
  flex: 1;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @include e(pass) {
    font-size: 20px;
    color: #03a92c;
    margin-right: 8px;
  }
  @include e(number) {
    width: 24px;
    height: 24px;
    border-radius: 8px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    margin-right: 8px;
    background: #999999;
  }
  @include e(text) {
    font-size: 16px;
    font-weight: 700;
    color: #999990;
  }
}
.is-current-item {
  background: #ffffff;
  border-radius: 8px 8px 0px 0px;
  .is-current-number {
    background: #333333;
    color: #ccc;
  }
  .is-current-text {
    color: #333333;
  }
}
.is-last-text {
  color: #03a92c;
}
</style>
