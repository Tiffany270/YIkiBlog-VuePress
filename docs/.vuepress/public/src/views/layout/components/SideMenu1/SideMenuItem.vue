<template>
  <div class="nav-menu">
    <template v-for="item in list">
      <sub-menu
        v-if="item.children && item.children.filter(item1 => !item1.meta.hideMenu).length > 1"
        :key="item.name"
        :parent="item"
        :isCollapse="isMenuCollapse"
      />

      <sub-menu-item v-else :key="item.name" :data="filterData(item)" @click.native="linkTo(item)">
        <i class="iconfont" :class="item.icon" style="font-size: 20px; margin-right: 5px"></i>
        <span v-show="isMenuCollapse">{{
          item.children && item.children.length ? filterData(item).meta.title : item.meta && item.meta.title
        }}</span>
      </sub-menu-item>
    </template>
  </div>
</template>

<script>
import SubMenu from './SubMenu'
import SubMenuItem from './SubMenuItem'
import { mapGetters } from 'vuex'
export default {
  name: 'SideMenuItem',
  components: {
    SubMenu,
    SubMenuItem
  },
  props: {
    list: {
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
  methods: {
    filterData(item) {
      const arr = (item.children && item.children.length && item.children.filter(item1 => !item1.meta.hideMenu)) || []
      return arr.length > 0 ? arr[0] : {}
    },
    linkTo(item) {
      if (this.$route.name === this.filterData(item).name) return
      this.$router.push({ name: this.filterData(item).name })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index';
@include b(nav-menu) {
  background: #cc3333;
  box-sizing: border-box;
  padding: 24px 0 24px 10px;
  border-top-right-radius: 10px;
}
</style>
