# 小程序

::: tip hard but have to gooooo
不管怎么样还是要学  
这里这里这里这里这里记录的是小程序原生开发嗯
:::
`.wxml` `.wxss`

## 目录结构
- app.js 入口
``` js
App({// 小程序的后台只会存活两个小时
  // 生命周期！✨！这个不是页面生命周期！别搞错了
  onLaunch: function () { //1. 初始化 发送一些网络请求，异步
        ...
    // 登录
    wx.login({
      success: res => {...}})
  },
  onShow: function (options) { //2.界面显示出来之后执行,
  //判断小程序的进入场景，用switch(option.scen)
  },
  onHide: function () {//3.界面被隐藏的时候（关闭的时候）},
//全局数据
//其他地方用 app.globalData里拿到
  globalData: {
    userInfo: null
  }
})
```
- app.json 全局配置
``` json
{
  "pages": [ // 你自己敲一个保存后会自动生成哈
    "pages/home/index", // 第一项是首页
    ...
  ],
  "window": { //全局外观 - navigationBar
    "backgroundTextStyle": "dark",
    "enablePullDownRefresh": true  // 下拉刷新 bug 最好不要全局 单独写页面比较好
    ....
  },
  "tabBar": { // 底部导航栏效果
    "list": [// 2<x<5
      {
        "pagePath": "pages/home/index",// 要和pages[0]第一项一致才会显示
        "text": "1"
      }
      ...
    ]
  },
  "style": "v2", // 是否新版组件样式
  "sitemapLocation": "sitemap.json"
}
```
- app.wxss 全局样式
- progect.config.json
- sitemap.json
- components 复杂页
  - cpns.js
  ``` js
  Component({
  data: {
    text: "This is page data."
  },
  methods: {
    onLoad: function(options) {
      // 页面创建时执行
    },
    onPullDownRefresh: function() {
      // 下拉刷新时执行
    },
    // 事件响应函数
    viewTap: function() {
      // ...
    }
  }
  })
  ```
  - cpns.json
  - cpns.wxml
  - cpns.wxss
- pages 简单页面
  - home
    - index.js
    ``` js
    var common = require('common.js') // 用的是cmd module.exports = ...
    const app = getApp() 
    Page({ //固定
      data: {
        name:'yiki',
        ...
      },
      //事件处理函数
      bindViewTap: function() {
        wx.navigateTo({
          url: '../logs/logs'
        })
      },
      onLoad: function () {
       ...
      },
      //yiki
      testclick(){
        this.name = 'tifffany'// 小程序内部不能监听，所以刷新不了的
        console.log(this.name);
        // 应该用：
        this.setData({
          name:'tiffany'
        })
      }
    })
    ```
    - index.json 独立定义每个页面的一些属性
    - index.wxml
    ```
     view=div
     text=span
     image
     navigator url='' === href
     ```
    - index.wxss rpx 


## support
- [dev login](https://mp.weixin.qq.com/)
- [officail](https://developers.weixin.qq.com/miniprogram/dev/framework/)

## 解冻
- 公众号平台助手-绑定查询-微信号绑定账号-在里面选

## 开发
- 开发管理-开发设置-AppID(小程序ID)
- wxs/project.config.json
``` js
...
"appid": "wx1d03c405yiki569c",
...
```
- 就能生成二维码真机预览了

## note
- 小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而`缺少`相关的DOM API和BOM API
- JSCore 的环境同 NodeJS 环境也是不尽相同，所以一些 NPM 的包在小程序中也是`无法运行`的
