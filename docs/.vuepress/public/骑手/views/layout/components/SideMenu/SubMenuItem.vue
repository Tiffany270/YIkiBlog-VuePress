<template>
  <el-menu-item-group class="sub-menu">
    <template v-for="route in routeList">
      <el-menu-item
        :index="`${parent.path}/${route.path}`"
        :key="route.path"
        v-if="!route.meta.hideMenu"
        :class="{
          'is-item-active':
            route.name === $route.name || route.name == $route.meta.parent
        }"
      >
        {{ route.meta.title }}
      </el-menu-item>
    </template>
  </el-menu-item-group>
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
.sub-menu {
  .el-menu-item-group__title {
    padding: 0;
  }
  ul {
    padding: 10px 0 !important;
  }
  .el-menu-item {
    height: 40px !important;
    line-height: 40px !important;
    cursor: pointer;
    box-sizing: border-box;
    min-width: 180px !important;
    border-radius: 4px;
    margin-bottom: 5px;
  }
}
</style>
