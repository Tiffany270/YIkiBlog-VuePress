<template>
  <div class="sub-menu">
    <el-tooltip placement="right" popper-class="sub-menu__tip" :open-delay="400">
      <span class="sub-menu__tip__title">
        <i class="iconfont" :class="parent.icon" style="font-size: 20px; margin-right: 5px"></i>
        <span v-show="isCollapse"> {{ parent.meta && parent.meta.title }}</span>
        <!-- 圆角 -->
        <i class="sub-menu__right__top--radius"></i>
        <i class="sub-menu__right__bottom--radius"></i>
        <!-- 方向箭头 -->
        <i v-show="isCollapse" class="iconfont xbicon-rarrow icon-arrow-up"></i>
        <i v-show="isCollapse" class="iconfont xbicon-arrowd icon-arrow-down"></i>
      </span>
      <div slot="content">
        <template v-for="item in parent.children">
          <sub-menu v-if="item.children" :key="item.name" :parent="item" />
          <div v-else :key="item.name">
            <div
              v-show="!item.meta.hideMenu"
              class="sub-menu__tip__item"
              :class="{
                'item-active': item.name === $route.name
              }"
              @click="linkTo(item)"
            >
              {{ item.meta && item.meta.title }}
            </div>
          </div>
        </template>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
// import MenuItem from './menuItem'
export default {
  name: 'SubMenu',
  components: {
    // MenuItem
  },
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    linkTo({ name }) {
      if (this.$route.name === name) return
      this.$router.push({ name: name })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index';
@include b(sub-menu) {
  .el-dropdown {
    width: 100%;
  }
  @include e(tip) {
    width: 150px !important;
    background: #333333 !important;
    border-radius: 8px !important;
    opacity: 0.8 !important;
    padding: 10px 0 0px 8px !important;
    box-sizing: border-box !important;
    @include e(title) {
      width: 100%;
      box-sizing: border-box;
      position: relative;
      height: 44px;
      line-height: 44px;
      margin-bottom: 16px;
      cursor: pointer;
      padding-left: 10px;
      color: #fff;
      font-size: 14px;
      font-weight: 400px;
      display: flex;
      align-items: center;
    }
    @include e(item) {
      height: 44px;
      line-height: 44px;
      margin-bottom: 10px;
      cursor: pointer;
      padding-left: 18px;
      color: #fff;
      font-size: 14px;
      font-weight: 400px;
      display: flex;
      align-items: center;
    }
  }
}
.icon-arrow-up {
  font-size: 24px;
  vertical-align: middle;
  position: absolute;
  top: 2px;
  right: 10px;
}
.icon-arrow-down {
  display: none;
  font-size: 24px;
  vertical-align: middle;
  position: absolute;
  top: 2px;
  right: 10px;
}
.default-active {
  background-color: #fff;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
  color: #cc3333;
  .sub-menu__right__top--radius,
  .sub-menu__right__bottom--radius {
    display: inline-block;
  }
}
.sub-menu__tip__title:hover {
  background-color: #fff;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
  color: #cc3333;
  .sub-menu__right__top--radius,
  .sub-menu__right__bottom--radius {
    display: inline-block;
  }
  // 旋转箭头
  .icon-arrow-up {
    display: none;
  }
  .icon-arrow-down {
    display: inline-block;
  }
}
.sub-menu__right__top--radius {
  display: none;
  content: '';
  width: 16px;
  height: 16px;
  background-color: #fff;
  position: absolute;
  right: 0;
  top: -16px;
  z-index: 10;
}
.sub-menu__right__bottom--radius {
  display: none;
  content: '';
  width: 16px;
  height: 16px;
  background-color: #fff;
  position: absolute;
  right: 0;
  bottom: -16px;
  z-index: 10;
}
.sub-menu__tip__title:hover::before {
  content: '';
  width: 23px;
  height: 23px;
  background-color: #cc3333;
  position: absolute;
  right: 0;
  top: -23px;
  border-radius: 10px;
  z-index: 20;
}
.sub-menu__tip__title:hover::after {
  content: '';
  width: 23px;
  height: 23px;
  background-color: #cc3333;
  position: absolute;
  right: 0;
  bottom: -23px;
  border-radius: 10px;
  z-index: 20;
}

.sub-menu__tip__item:hover {
  background-color: #cc3333;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
}
.item-active {
  background-color: #cc3333;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
}
</style>
