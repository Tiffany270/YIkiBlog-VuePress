<template>
  <div class="styled-title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'StyledTitle'
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/index';
@include b(styled-title) {
  position: relative;
  font-size: 15px;
  font-weight: bold;
  color: #3b4155;
  padding-left: 8px;
  margin-bottom: 15px;
}
.styled-title::before {
  content: '';
  height: 13px;
  width: 2px;
  background: $--color-primary;
  position: absolute;
  left: 0;
  top: 3px;
}
</style>
