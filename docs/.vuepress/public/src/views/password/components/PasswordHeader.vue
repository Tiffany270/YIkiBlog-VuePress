<template>
  <header class="reset-password-header">
    <h1>{{ title }}</h1>
    <span @click="handleClick">{{ handleText }}</span>
  </header>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    handleClick: {
      type: Function,
      default: () => {}
    },
    handleText: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.reset-password-header {
  display: flex;
  justify-content: space-between;
  padding: 34px 90px;
  background-color: #fff;
  margin-bottom: 24px;
  h1,
  span {
    line-height: 32px;
    margin: 0;
  }
  h1 {
    font-size: 24px;
    color: #333;
    font-weight: normal;
  }
  span {
    cursor: pointer;
  }
}
</style>
