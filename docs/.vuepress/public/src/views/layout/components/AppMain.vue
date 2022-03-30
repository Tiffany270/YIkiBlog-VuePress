<template>
  <div class="app-main">
    <router-view class="app-main__content" />
  </div>
</template>

<script>
export default {
  name: 'AppMain',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss">
@import '@/styles/index';
@include b(app-main) {
  height: calc(100% - 64px);
  box-sizing: border-box;
  @include e(content) {
    width: 100%;
    height: 100%;
    // height: 100%;
    // border-radius: 8px;
    // background: #fff;
  }
}
</style>
