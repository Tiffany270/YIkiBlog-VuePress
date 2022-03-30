<template>
  <div class="side-menu">
    <side-logo style="margin-bottom: 12px" />
    <el-scrollbar style="height: 100%">
      <el-menu :default-active="$route.path" class="side-menu__vertical" :collapse="isMenuCollapse" :router="true">
        <side-menu-item :route-list="routeList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SideLogo from './SideLogo'
import SideMenuItem from './SideMenuItem.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'SideMenu',
  components: {
    SideLogo,
    SideMenuItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isMenuCollapse']),
    ...mapState({
      routeList: state =>
        state.user.userRoutes.filter(item => {
          return (
            item.path !== '*' &&
            item.name !== 'Login' &&
            item.name !== 'ResetPassword' &&
            item.name !== 'PasswordReset' &&
            item.name !== 'PasswordEdit'
          )
        })
    })
  },
  watch: {
    isMenuCollapse: {
      handler(val) {
        const width = val ? '80' : '180'
        this.$store.commit('SET_SIDEMENU_WIDTH', width)
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(side-menu) {
  box-sizing: border-box;
  padding: 32px 0 32px 0;
  border-radius: 0px 16px 0px 0px;
  // 非折叠时width=180
  .side-menu__vertical:not(.el-menu--collapse) {
    width: 180px;
  }
  .side-menu__vertical {
    background: #cc3333;
    border: none;
  }
  // 折叠时宽度
  .el-menu--collapse {
    width: 80px;
  }
  background: #cc3333;
  height: 100%;
  overflow: hidden;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
