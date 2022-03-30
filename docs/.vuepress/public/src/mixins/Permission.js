// 权限设置
export default {
  methods: {
    /**
     * 判断是否有对应的按钮权限
     * @param permission
     * @return {*}
     */
    checkPermission(permission) {
      const permissionPool = this.$route.meta.buttons
      return Array.isArray(permissionPool) && permissionPool.includes(permission)
    },
    /**
     * 判断是否有对应的路由
     * @param name
     */
    checkHasRoute(name) {
      const routeList = this.$store.state.permission.routeList
      if (routeList instanceof Set) {
        return routeList.has(name)
      } else {
        return false
      }
    }
  }
}
