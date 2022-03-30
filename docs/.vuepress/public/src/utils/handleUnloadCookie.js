import { removeToken } from '@/utils/auth'

export const handleUnloadCookie = () => {
  window.onload = () => {
    // hasLogin 没有就表示关闭过页面再次进入，hasLogin为true就表示刷新页面
    if (!window.sessionStorage['hasLogin']) {
      removeToken()
      location.reload() // 不能省，强制跳到登陆页
    } else {
      window.sessionStorage.removeItem('hasLogin')
    }
  }
  // 不能在关闭时清理cookie，否则刷新页面也会清除掉，刷新时下面两个事件也会触发
  window.onunload = () => {
    window.sessionStorage['hasLogin'] = true
  }
  window.onbeforeunload = () => {
    window.sessionStorage['hasLogin'] = true
  }
}
