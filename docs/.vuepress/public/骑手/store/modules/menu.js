const menu = {
  state: {
    // 菜单栏宽度
    sideMenuWidth: '200',
    // 菜单是否折叠
    isMenuCollapse: false
  },
  mutations: {
    SET_SIDEMENU_WIDTH(state, payload) {
      console.log('payload', payload)
      state.sideMenuWidth = payload || '200'
    },
    SET_MENU_COLLAPSE(state, payload) {
      state.isMenuCollapse = payload
    }
  },
  actions: {}
}
export default menu
