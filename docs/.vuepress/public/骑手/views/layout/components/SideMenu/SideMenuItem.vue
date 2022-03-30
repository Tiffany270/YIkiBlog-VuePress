<template>
  <div class="side-menu-item">
    <div class="menu-item" v-for="route in routeList" :key="route.path">
      <!-- 二级菜单 -->
      <el-submenu
        :index="route.path"
        v-if="
          route.children &&
          route.children.filter(item => item.meta && !item.meta.hideMenu)
            .length > 1
        "
        class="menu-item__submenu"
        :class="{
          'is-item-active':
            route.children &&
            route.children.some(item => item.name === $route.name)
        }"
      >
        <template slot="title">
          <i class="iconfont" :class="route.icon"></i>
          <span slot="title" class="menu-item__submenu--text">
            {{ route.meta.title }}
          </span>
        </template>
        <sub-menu-item :route-list="route.children" :parent="route" />
      </el-submenu>
      <!-- 一级菜单 -->
      <el-menu-item
        :index="
          route.children
            ? route.path +
              '/' +
              route.children.find(item => item.meta && !item.meta.hideMenu).path
            : ''
        "
        v-else
        class="menu-item__single"
        :class="{
          'is-sub-item-active':
            route.children &&
            route.children.some(item => item.name === $route.name)
        }"
      >
        <i class="iconfont" :class="route.icon"></i>
        <span slot="title">
          {{
            route.children &&
            route.children.find(item => !item.meta.hideMenu).meta.title
          }}
        </span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubMenuItem from './SubMenuItem.vue'
export default {
  name: 'SideMenuItem',
  components: {
    SubMenuItem
  },
  props: {
    routeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isMenuCollapse'])
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
// 折叠时文字隐藏
.el-menu--collapse {
  .menu-item__submenu--text {
    width: 0;
    height: 0;
    visibility: hidden;
  }
}
.side-menu-item {
  .menu-item {
    box-sizing: border-box;
    padding: 0 10px;
    margin-bottom: 5px;
    .iconfont {
      margin-right: 10px;
    }
    &__submenu {
      border-radius: 4px;
      .el-submenu__title {
        height: 40px;
        line-height: 40px;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 0 10px !important;
      }
      .el-submenu__title:hover {
        background: $color-primary-light-hover;
      }
    }
    &__single {
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 0 10px !important;
      .el-tooltip {
        padding: 0 10px !important;
      }
      &:hover {
        background: $color-primary-light-hover;
      }
    }
    .is-active {
      background: $color-primary-light-hover;
      .el-submenu__title,
      i {
        color: $color-text-plain !important;
      }
    }
    // .is-sub-item-active {
    //   color: $color-text-active !important;
    //   background: $color-primary;
    //   i {
    //     color: $color-text-active !important;
    //   }
    // }
  }
}
</style>
