<template>
  <div class="layout">
    <side-menu />
    <div :style="{ left: `${sideMenuWidth}px` }" class="layout__main">
      <app-head />
      <app-main />
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu/index'
import AppHead from './components/Head'
import AppMain from './components/AppMain'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: {
    // SideBar,
    SideMenu,
    AppHead,
    AppMain
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['sideMenuWidth'])
  },

  methods: {}
}
</script>

<style lang="scss">
@import '@/styles/mixin';
@include b(layout) {
  width: 100%;
  height: 100%;
  display: flex;
  @include e(main) {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    z-index: 10;
    background: #eff0f4;
    transition: left 0.28s;
  }
}
</style>
