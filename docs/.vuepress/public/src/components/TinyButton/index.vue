<template>
  <div class="tiny-button" @click="$emit('click')">
    <i :class="'iconfont ' + iconClass"></i>
    <div class="hidden-block">
      <div class="hidden-text">{{ content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TinyButton',
  props: {
    iconClass: {
      type: String,
      default: '',
      required: true
    },
    content: {
      type: String,
      default: '',
      required: true,
      validator(val) {
        return typeof val === 'string' && val.length === 4
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tiny-button {
  position: relative;
  width: 40px;
  height: 40px;
  border: 1px solid #d9d9d9;
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  i {
    color: #999999;
    font-size: 28px;
  }
  .hidden-block {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #333;
    border-radius: 4px;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      opacity: 1;
    }
    .hidden-text {
      font-size: 12px;
      line-height: 16px;
      color: white;
      width: 2em;
      user-select: none;
    }
  }
}
</style>
