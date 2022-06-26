# The Basic

## 生命周期
- 应用生命周期
``` js
// app.js
App({
  onLaunch (options) {// Do something initial when launch.
  },
  onShow (options) {//从后台进去前台显示时触发
  },
  onHide () {// 从前台进入后台
  },
  onError (msg) {}
})
```
- 页面生命周期
``` js
// pages/show-02/show-02.js
Page({
  data: { test:'nothing' },
  onLoad: function (options) {// 监听页面加载，只调用一次
  },
  onReady: function () {//监听页面初次渲染完成，只调用一次，可修改标题
  },
  onShow: function () {//监听页面显示
  },
  onHide: function () {//监听页面隐藏
  },
  onUnload: function () {//监听页面卸载
  }
})
```

## API
微信提供的啦

- 事件监听
`wx.onSthtriggle(func)`
- 同步
`wx.sthSync(...)`
- 异步
`wx.request({success:... fail:...}).then(...)`

## 视图
- WXML（WeiXin Markup Language)
  - 数据绑定，单向,`{{}}` to change it must `this.setData({your newojb})`
  - 双向绑定 `<input model:value="{{value}}" />` `properties+this.setData`
  - `wx:for="{{array}}"`
  - `wx:if`/`wx:elif`/`wx:elif`
  - `template`
  ``` bash
  <template name="staffName">
  <view>...</view>
  </template>
  <template is="staffName" data="{{...staffA}}"></template>
  -----
  Page({
  data: {
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    ...}
  ```
- WXSS (WeiXin Style Sheets)
  - `@import "common.wxss"`
  - `<view style="color:{{color}};" />`
  - `<view class="red" />`
- wxs 
  - [docs](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/)
  - 因为wxml无法直接调用js文件里面的函数，场景如如过滤器
  - common.js \ 不支持es6
  ``` bash
  <wxs module="m1">
    var msg = "you can also define some functions here";
    module.exports.message = msg;
  </wxs>
    <view> {{m1.message}} </view>
  ```
  - with event
  ``` bash
  <wxs module="wxs" src="./test.wxs"></wxs>
  <view id="tapTest" data-hi="Weixin" bindtap="{{wxs.tapName}}"> Click me! </view>
  **注：绑定的 WXS 函数必须用{{}}括起来**
  ---- test.wxs
    function tapName(event, ownerInstance) {
    console.log('tap Weixin', JSON.stringify(event))
  }
  module.exports = {
    tapName: tapName
  }
  ```

## 事件
`bindtap` `bindinput` `change`  
绑定在组件上，当达到触发事件，就会执行逻辑层中对应的事件处理函数
- target/currentTarget
``` bash
<view bindtap = "handler"> // e.currentTarget
  <button> click </button> // e.target
</view>
--- js
Page({
  handler: function(event) {
    console.log(event)
  }
})
---log
{
  "type":"tap",
  "timeStamp":895,
  "target": {...},
  "currentTarget":  {...},
  "detail": {...},//自定义事件所携带的数据 or 点击事件的detail 带有的 x, y 同 pageX, pageY 
  "touches":[{...}],
  "changedTouches":[{  ...}]
}
```
- Bubbling
  - `catch` 会阻止事件向上冒泡
  ``` bash
   <view id="middle" catchtap="handleTap2">
   ```
## 事件传参
`data-*`
- 直接func(p1)在bind里会被认为是函数名，不会起作用的！
``` js
data-youname="{{2}}"// in view
event.tatget.dataset.yourname  // in handler
// don't forget change value use this.setData()
```

## 页面事件
- `onPullDownRefesh` 下拉刷新回调
  - `wx.stopPullDownRefresh()`手动关闭下拉
- `onReachBottom` 上拉触底 滚动最底部继续加载数据
  - `onReachBottomDistance` 配置上拉触底的距离
- `showLoading({title:'waiting...'})`
  - [doc](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html)
- `onShareAppMessage` 用户点击右上角分享

## 网络请求
- 没有跨域问题、也没有ajax
- 只能https类接口
  - 去管理后台-开发设置-服务器域名-修改requeset域名
- 接口域名必须在信任列表中
- `wx.request()`顶级全局对象
- 写在`onload`里
``` js
wx.request({
  url:'',
  method:'',
  data:{},
  success:(res)=>{},
  complete:(res)=>{}
})
```
- 跳过合法域名校验
  - 右上角-详情-本地-不校验啦


## 路由跳转
`<navigator>` `navigateTo` `redirectTo` `navigateBack`
- [声明式 view](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html)
- [编程式 view](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html)
- 传参 url?xxx=a&xx=b or setData(query:xx)
- onload（options)取路由参数 or this.query
