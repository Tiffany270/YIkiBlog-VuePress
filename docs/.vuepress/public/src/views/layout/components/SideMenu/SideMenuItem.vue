<template>
  <div class="menu-list">
    <div class="menu-item" v-for="route in routeList" :key="route.path">
      <!-- 多级菜单 -->
      <el-submenu
        :index="route.path"
        v-if="route.children && route.children.filter(item => !item.meta.hideMenu).length > 1"
        :key="route.path"
        class="menu-item__submenu"
        :class="{ 'is-item-active': route.children && route.children.some(item => item.name === $route.name) }"
      >
        <template slot="title">
          <el-popover
            placement="right"
            popper-class="submenu-popper"
            trigger="hover"
            :close-delay="300"
            :open-delay="500"
          >
            <div class="submenu-popper__title" slot="reference">
              <i class="iconfont submenu-popper__title--icon" :class="route.icon"></i>
              <span class="submenu-popper__title--text">{{ route.meta && route.meta.title }}</span>
              <i class="iconfont el-icon-arrow-right submenu-popper__title--arrow" style="color: #fff"></i>
            </div>
            <div class="submenu-popper__content">
              <sub-menu-item :route-list="route.children" :parent="route" />
            </div>
          </el-popover>
        </template>
      </el-submenu>
      <el-menu-item
        :index="route.path + '/' + route.children.find(item => !item.meta.hideMenu).path"
        v-else
        :key="route.path"
        class="menu-item__single"
        :class="{ 'is-item-active': route.children && route.children.some(item => item.name === $route.name) }"
      >
        <i class="iconfont menu-item__single--icon" :class="route.icon"></i>
        <span slot="title" class="menu-item__single--text">{{
          route.children && route.children.find(item => !item.meta.hideMenu).meta.title
        }}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
import SubMenuItem from './SubMenuItem.vue'
import { mapGetters } from 'vuex'
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
    return {
      tooltipValue: true
    }
  },
  computed: {
    ...mapGetters(['isMenuCollapse'])
  },
  mounted() {
    console.log('route', this.$route)
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
// 折叠时文字隐藏
.el-menu--collapse {
  .submenu-popper__title--text {
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .submenu-popper__title--arrow {
    visibility: hidden;
  }
}
// 折叠时组件本身的二级隐藏
.el-menu--vertical {
  display: none;
}
@include b(menu-list) {
  @include b(menu-item) {
    margin-bottom: 8px;
    box-sizing: border-box;
    padding-left: 10px;
    @include e(submenu) {
      height: 44px;
      line-height: 44px;
      border-radius: 22px 0px 0px 22px;
      .el-submenu__title {
        height: 43px;
        line-height: 40px;
        padding: 0 !important;
        border-radius: 22px 0px 0px 22px;
        .el-submenu__icon-arrow {
          display: none;
        }
      }
      .el-submenu__title:hover {
        color: #cc3333 !important;
        background: #fff;
        .submenu-popper__title--icon,
        .submenu-popper__title--text,
        .submenu-popper__title--arrow {
          color: #cc3333 !important;
        }
      }
    }
    @include e(single) {
      height: 44px;
      line-height: 40px;
      border-radius: 22px 0px 0px 22px;
      color: #fff;
      padding-left: 16px !important;
      .el-tooltip {
        padding-left: 16px !important;
      }
      i {
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
        vertical-align: middle;
        display: inline-block;
        line-height: 1;
        color: #fff;
      }
    }
    .menu-item__single:hover {
      background: #fff;
      color: #cc3333;
      .menu-item__single--icon {
        color: #cc3333;
      }
    }
    // .is-active {
    //   color: #cc3333 !important;
    //   background: #fff;
    //   i {
    //     color: #cc3333 !important;
    //   }
    //   .el-submenu__title {
    //     .submenu-popper__title--text {
    //       color: #cc3333 !important;
    //     }
    //   }
    // }
    .is-item-active {
      color: #cc3333 !important;
      background: #fff;
      i {
        color: #cc3333 !important;
      }
      .el-submenu__title {
        .submenu-popper__title--text {
          color: #cc3333 !important;
        }
      }
    }
  }
}
@include b(submenu-popper) {
  width: 150px !important;
  background: #1d2939 !important;
  border-radius: 8px !important;
  opacity: 1 !important;
  padding: 16px 0 16px 8px !important;
  box-sizing: border-box !important;
  @include e(title) {
    padding: 0 16px;
    position: relative;
    @include m(icon) {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      vertical-align: middle;
      display: inline-block;
      line-height: 1;
      color: #fff !important;
    }
    @include m(text) {
      color: #fff;
    }
    @include m(arrow) {
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
  .popper__arrow::after {
    border-right-color: #1d2939 !important;
  }
}
</style>
