<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
.app-main {
  position: absolute;
  right: 0;
  left: 200px;
  top: 0;
  bottom: 0;
  height: 100%;
  z-index: 10;
  background: #eff0f4;
  transition: left 0.28s;
}
</style>
