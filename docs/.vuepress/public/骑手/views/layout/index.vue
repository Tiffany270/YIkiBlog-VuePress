<template>
  <div class="layout">
    <app-head class="layout__header" />
    <div class="layout__container">
      <side-menu />
      <app-main
        :style="{ left: `${sideMenuWidth}px` }"
        v-if="isMainPageAlive"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHead from './components/AppHead/index.vue'
import AppMain from './components/AppMain.vue'
import SideMenu from './components/SideMenu'
export default {
  name: 'Layout',
  provide() {
    return {
      reloadMainPage: this.reloadMainPage
    }
  },
  components: {
    AppHead,
    AppMain,
    SideMenu
  },
  data() {
    return {
      isMainPageAlive: true //重新加载app-main
    }
  },
  computed: {
    ...mapGetters(['sideMenuWidth'])
  },
  created() {},
  methods: {
    reloadMainPage() {
      this.isMainPageAlive = false
      this.$nextTick(() => {
        this.isMainPageAlive = true
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.layout {
  width: 100%;
  height: 100%;
  &__container {
    position: relative;
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
  }
}
</style>
