import { removeToken } from '@/utils/auth'
/**功能：系统登录后，复制访问地址，开一个新的tab打开，为安全起见，需要强制退出。
 * 前置知识：
 *    1. 关闭浏览器tab页面会触发onbeforeunload ->onunload 事件
 *    2. 刷新页面也会触发onbeforeunload ->onunload -> onload 事件
 *    3. 打开浏览器新的tab只会触发onload事件
 * 思路：
 *    1. 打开浏览器tab访问页面时，触发onload事件，先检查有没有hasLogin缓存，刚打开的页面hasLogin是不存在的，
 *      所以就会走清除cookie中的token的逻辑，没有token路由就会导入到登录页面，强制刷新时为了一劳永逸的处理可
 *      能存留的vuex中的数据，造成混乱的问题。
 *      - 解决问题：处理了多tab打开同一页面的问题 => 强制清你的token，给我重新登录去。
 *      - 遗留问题：刷新页面，会跳转到登录
 *    2. 刷新页面时会依次触发onbeforeunload ->onunload -> onload 事件，因此就可以在卸载页面时写入session，那么
 *      在onload页面时读取到了session，就不会走清cookie的逻辑了，就不会跳转登录。
 *      这样，问题就完美的解决了！！！
 *    3. 关闭页面后，再打开页面cookie里的token还在，路由就不会让你登录，但是随后会执行思路1的打开页面的逻辑，会让你
 *      重新登录的，这就解决了没有正常登出页面，直接关闭浏览器，再次登陆时，cookie里的token还在，不登陆也可以访问的问题。
 * 注意：
 *    因为有很多页面有写入业务session缓存的逻辑，如果清除不及时，就会导致换了账号登录，缓存数据还在的问题，因此需要在路由
 *    导航到登录页面的时候清除所有的session。
 *    导致问题：在登录页刷新页面，路由导航时会连同页面卸载的时候写入的session数据
 *    hasLogin一起清理掉了，那么页面再加载的时候就会一直执行清除cookie刷新页面的逻辑，遭受死循环，页面卡死。
 *    解决：在路由导航到登录页执行清除所有的session逻辑之后，再重新写入一份hasLogin的session，就可以解决了。
 */

export const handleUnloadAuth = () => {
  window.onload = () => {
    // hasLogin 没有就表示关闭过页面再次进入，hasLogin为true就表示刷新页面
    if (!window.sessionStorage['hasLogin']) {
      removeToken()
      location.reload() // 不能省，强制跳到登陆页
    } else {
      window.sessionStorage.removeItem('hasLogin')
    }
  }
  window.onunload = () => {
    window.sessionStorage['hasLogin'] = true
  }
  window.onbeforeunload = () => {
    window.sessionStorage['hasLogin'] = true
  }
}
