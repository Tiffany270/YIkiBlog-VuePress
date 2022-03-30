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
.block-container {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 16px 20px;
  box-sizing: border-box;
}
</style>
