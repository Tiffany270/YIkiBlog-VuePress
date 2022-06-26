# yiki

## Q&A
- 小程序和 H5 有什么不一样，为什么选小程序而不是 H5
- 有考虑在小程序里嵌 H5 实现吗，为什么
- 为什么小程序的性能要好一些
- 小程序开发有用到哪些框架吗、为什么
- 小程序的特点
  - 基于微信
## 个人
- 组件封装
  - components + properties + observer+setdata + 选择器 + triggerevent
- ios和安卓差异
  - 时间转换
  - 布局错乱
  - 根据wx的api判断当前系统然后分别写样式
- 缓存
  - 缓存数据本地加密存储，通过 API 读取时会自动解密返回
  - setStorageSync/getStorageSync/removeStorageSync/clearStorageSync
- 上传
  - 二进流的方式
  - 阿里云oss 获取阿里上传图片签名signature 
  - wx.uploadFile / wx.chooseImage / post wx.request({...})
  - 成功会返回url
- 预览
  - wx.downloadFile + openDocument
## 登录授权
当用户进入小程序的时候，如果我们要获取用户的头像和昵称，就需要向让用户授权。在以前微信小程序开发中，是可以用getUserInfo来获取，但是现在要通过getUserProfile来获取用户信息，详见小程序官方公告。
适配
wx.getSystemInfoSync()来获取型号，用正则匹配来修改样式。

## 状态管理
Mobx
本地存储
wx.setStorageSync('cookie', e.cookies[0]); 复制代码

小程序页面栈最多十层。
IOS 的 Date 构造函数不支持2018-04-26这种格式的日期，必须转换为2018/04/26这种格式
image组件使用webp图片时，IOS需要设置webp属性
Android手机在onShow内调用wx.showModal，如果不关闭弹窗（直接点击右上角退出小程序），弹窗不会销毁，再次进入页面触发onShow时会出现两次弹窗，IOS正常
小程序中使用web-view打开pdf, IOS 可以正常打开，Android 打开为空白

生成海报用的是
- [小程序原生代码生成海报](https://juejin.cn/post/6995356720125968398)

## 静默登录
- wx.getUserInfo会提醒授权
- [静默登录]（https://juejin.cn/post/6945264484491460638）
- wx.login 
- 后端通过微信接口OpenId + UnionId + sessionKey = auth-token给前端
- 这些东西存入本地
- 发请求携带请求头即可
- session_key 不是我们能决定的

## 埋点
- 单个队列
## support
- [推荐的微信小程序开发总结](https://juejin.cn/post/6961317489225498631)
- [微信小程序开发中遇到的坑和解决办法](https://juejin.cn/post/6844903876575887373)
- [微信小程序开发那些事](https://juejin.cn/post/6844904111888924686)
- [技巧](https://juejin.cn/post/6864740285303324686)