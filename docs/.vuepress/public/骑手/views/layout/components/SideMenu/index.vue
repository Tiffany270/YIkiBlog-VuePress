<template>
  <div class="side-menu">
    <el-scrollbar style="height: 100%">
      <el-menu
        :default-active="$route.path"
        class="side-menu__vertical"
        :collapse="isMenuCollapse"
        :router="true"
      >
        <side-menu-item :route-list="routeList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { homeRoutes, asyncRoutes } from '@/router/routes'
import SideMenuItem from './SideMenuItem.vue'
export default {
  name: 'SideMenu',
  components: {
    SideMenuItem
  },
  data() {
    return {
      routeList: [...homeRoutes, ...asyncRoutes]
    }
  },
  computed: {
    ...mapGetters(['isMenuCollapse'])
  },
  watch: {
    isMenuCollapse: {
      handler(val) {
        const width = val ? '68' : '200'
        console.log('width', width)
        this.$store.commit('SET_SIDEMENU_WIDTH', width)
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
.side-menu {
  box-sizing: border-box;
  padding: 16px 0;
  background: $color-normal-background;
  height: 100%;
  overflow: hidden;
  // 非折叠时width=180
  .side-menu__vertical:not(.el-menu--collapse) {
    width: 200px;
  }
  // 折叠时宽度
  .el-menu--collapse {
    width: 68px;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
// 折叠时二级菜单位置
.el-menu--vertical {
  left: 64px !important;
  .el-menu--popup {
    width: 180px !important;
    box-sizing: border-box;
    padding: 0 10px;
  }
  // 折叠时二级菜单选中样式
  .is-active {
    background: $color-primary-light-hover;
    .el-submenu__title,
    i {
      color: $color-text-plain !important;
    }
  }
}
</style>
