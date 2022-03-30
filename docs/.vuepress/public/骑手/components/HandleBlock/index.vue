<template>
  <div class="handle-block">
    <div class="handle-block__left">
      <slot name="left"></slot>
    </div>
    <div class="handle-block__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HandleBlock',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
.handle-block {
  height: 66px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eeeeee;
  .el-button {
    height: 32px;
    line-height: 1;
    padding: 4px 12px;
    font-size: 13px;
    // background-color: #fff;
  }
}
</style>
