<template>
  <div class="block-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BlockContainer'
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/index';
@include b(block-container) {
  width: 100%;
  // height: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 20px 24px;
  box-sizing: border-box;
}
</style>
