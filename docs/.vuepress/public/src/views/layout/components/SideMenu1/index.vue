<template>
  <div class="side-menu scrollbar-s" :style="{ width: sideMenuWidth + 'px' }">
    <div class="side-menu__content">
      <div v-show="isMenuCollapse" class="side-menu__content__logo" v-if="serviceProviderInfo.systemLogoPic">
        <img :src="serviceProviderInfo.systemLogoPic" alt="" />
      </div>
      <side-menu-item :list="routeList" />
    </div>
  </div>
</template>

<script>
import SideMenuItem from './SideMenuItem'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'SideMenu',
  components: {
    SideMenuItem
  },
  computed: {
    ...mapGetters(['serviceProviderInfo', 'sideMenuWidth', 'isMenuCollapse']),
    ...mapState({
      routeList: state =>
        state.user.userRoutes.filter(item => {
          return item.path !== '*' && item.name !== 'Login' && item.name !== 'ResetPassword'
        })
    })
  },
  watch: {
    isMenuCollapse: {
      handler(val) {
        const width = val ? '180' : '70'
        this.$store.commit('SET_SIDEMENU_WIDTH', width)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index';
@include b(side-menu) {
  position: relative;
  height: 100%;
  overflow: auto;
  @include e(content) {
    height: 100%;
    background: #cc3333;
    @include e(logo) {
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      padding-top: 56px;
      img {
        width: 144px;
      }
    }
  }
}
.el-menu {
  height: 100%;
}
</style>
