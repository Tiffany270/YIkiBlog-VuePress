<template>
  <ul class="submenu-list">
    <template v-for="route in routeList">
      <el-menu-item
        :index="`${parent.path}/${route.path}`"
        :key="route.path"
        v-if="!route.meta.hideMenu"
        :class="{ 'is-sub-item-active': route.name === $route.name || route.name == $route.meta.parent }"
        >{{ route.meta.title }}</el-menu-item
      >
    </template>
  </ul>
</template>

<script>
export default {
  name: 'SubMenuItem',
  props: {
    routeList: {
      type: Array,
      default: () => []
    },
    parent: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(submenu-list) {
  .el-menu-item {
    height: 44px;
    line-height: 44px;
    margin-bottom: 10px;
    cursor: pointer;
    box-sizing: border-box;
    padding-left: 16px !important;
    font-size: 14px;
    font-weight: 400px;
    display: flex;
    align-items: center;
    color: #fff;
    border-radius: 22px 0px 0px 22px;
  }
  .el-menu-item:hover {
    background-color: #cc3333;
  }
  .is-sub-item-active {
    background-color: #cc3333 !important;
    color: #fff !important;
  }
}
</style>
