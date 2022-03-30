<template>
  <div class="warn-tips">
    <i class="iconfont xbicon-warning" style="color: #faa700"></i>
    <span class="warn-tips__text">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'WarnTips',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/index';
@include b(warn-tips) {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fffcf0;
  border: 1px solid #faa700;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 5px;
  @include e(text) {
    margin-left: 5px;
    font-size: 13px;
  }
}
</style>
