const getters = {
  userInfo: state => state.user.userInfo,
  userRoles: state => state.user.userRoles,
  projectId: state => state.user.projectId,
  sideMenuWidth: state => state.menu.sideMenuWidth,
  isMenuCollapse: state => state.menu.isMenuCollapse,
  userRoutes: state => state.user.userRoutes,
  userMenus: state => state.user.userMenus,
  hasGetMenu: state => state.user.hasGetMenu,
  userProject: state => state.user.userProject,
  payChanels: state => state.user.payChanels,
  wechatApps: state => state.user.wechatApps,
  serviceProviderInfo: state => state.user.serviceProviderInfo,
  canUseAgreements: state => state.task.canUseAgreements,
  projectList: state => state.task.projectList
  // invoiceContentList: state => state.common.invoiceContentList
}
export default getters
