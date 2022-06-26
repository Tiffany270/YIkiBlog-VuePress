## 抱个佛脚

- echart和antv有什么区别
- 用echart模块化开发一个柱形图
- 说说react的虚拟dom吗？
- 对webpack了解吗,自己配置过吗
- 事件总线怎么用的
- 埋点怎么跨域

## one
### xb部分
- 添加新模块
  - 页面逻辑，确定子component引入和mixin/样式/算法/业务相关
- 修复bug
  - 页面复杂数据联动
   - 涉及下拉框选择后触发回调请求，后端有延迟，页面刷新，请求参数错误的修改
  - 路由跳转错误
   - 本来的逻辑是通过公共页面重定向，给了`router-view`，频繁跳转会二次触发，传参数错误导致页面渲染不出来，把路由按正常逻辑重新写
  -表格样式错乱
  - scss版本降级
- 组件封装
 - 表格
  - `props/$emit`
  - 是否分页、是否分页条
 - 弹窗
 - 分页条
 - 搜索栏
 - 滑块
 - 文件上传
- axios 拦截封装
  ``` js
  service.interceptors.request.use(
    config => {
  ...
  export const lockPool = new AxiosLockPool(200) // 存入当前请求的url
  这个东西会把请求添加进去，并且内部有settimeout自动清除 - d防抖
  防止重复请求
  ```
- jwt鉴权
``` js
import Cookies from 'js-cookie'
const TokenKey = 'B-Token'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(access_token, token_type) {
  const token = token_type + ' ' + access_token
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  Cookies.remove(TokenKey)
}
```
- 扫码登录
  - 从后端取数据前端qrcode插件生成二维码，服务端也应该保存二维码的一些状态：未扫描、已成功、已失效
  ``` js
  /**
   * 生成二维码
   */
  function generateQRCode() {
      var uuid = $('#uuid').val();
      var url = ctx + '/scan/' + uuid + '?tabId=' + tabId;
      console.log('The QR code is:' + url);
      var $qrimg = clearQrInfo();
      $qrimg.qrcode({
          render: "canvas",
          width: 256,
          height: 256,
          correctLevel: 0, // 纠错等级
          text: url,
          background: '#ffffff',
          foreground: '#000000',
          src: 'img/alpaca.jpg'
      });
      updateTip('Please scan the QR code...');
  }
  ```
  - 手机扫描后返回识别id
  - 手机端将手机端token和二维码ID发送给服务端，确认登录
  - pc是通过轮询或Websocket的方式获取二维码的状态
  ``` js
  setInterval(function, milliseconds)
  --- if 未登录
  if (isContinuePolling && '2' === tabId) {
              // 再次发送查询请求
              checkByLongPool();
          }
  ```
- 前端oss sdk
- 图片上传校验
- 图片优化
- 正则


## question
- 了解哪些http状态码
- http的字段头
- http的压缩除了gzip还有哪些，是有损还是无损的？
- 说下强缓存、协商缓存，hash的意义
- 说说https
- tcp和udp的区别
- 七层模型发散
- 为什么一个网站的资源会存在多个域名中
- http499
- get/post区别
- 四层网络模型，每层有哪些协议
- 页面输入一个url到页面的展示
- http1和2和3的区别，说说
- tcp握手，了解泛洪攻击吗
  - SYN攻击属于DOS攻击的一种,它利用TCP协议缺陷,通过发送大量的半连接请求,耗费服务器CPU和内存资源
- ssr怎么做的，为什么要ssr
SSR(服务器端渲染)

