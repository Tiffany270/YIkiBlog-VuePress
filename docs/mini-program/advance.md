# Advancement 

## 自定义组件
- components鼠标右键新建组件即可自动生成
``` js
外部
<test name="yiki"></test>
---
<text>{{name}}</text>
---
// components/test/test1.js
Component({
  properties: {//组件的属性列表
  // 接收外部
  name:{
    type:String
  }
  //or
  name:String
  },
  data: {//组件的初始数据
  },
  methods: {//组件的方法列表
  }
})
```
- 局部/全局(app.json)引用 `.json`里写
  - 被引用的页面json里
  ``` js
    {
    "usingComponents": {
      "testxx":"/components/test/test1" 
    }
  }
  ----页面直接用
  <testxx></testxx>
  ```
- 不要用`id`，尽量用`class`选择器
- `stylesolation` 修改组件样式隔离
  - [docs](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB)
``` js
  Component({
  options: {
    styleIsolation: 'isolated'
  }
})
```
## 组件通信
- [docs](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html)
- 事件绑定
  - 通过方法传 父`bind:事件名=“eventfunc"` 父可以在` event: function(e){e.detail}`拿到子的传参
  - 子 `this.triggerEvent('事件名', myEvent参数对象, myEventOption)`
- 获取组件实例
  - `this.selectComponent(selector)` ，获取子组件的实例对象
  - 给是实例对象进行它自己内部的东西

## 组件生命周期
- [docs](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html)
``` js
Component({
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  creat: function(){
    // 此时还不能调用 setData,只应该用于给组件 this 添加一些自定义属性字段
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function() {
    // 在组件实例进入页面节点树时执行
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
  },
  // ...
})
```
## 数据监听器
`observers`
- [docs](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html)
``` js
Component({
  observers: {
    'A, B': function(numberA, numberB) {
      this.setData({
        sum: numberA + numberB
      })
    }
  }
})
```
## 插槽
- 父
``` bash
{
  "usingComponents": {
    "my-slot": "/components/my-slot/my-slot"
  }
}
----
<my-slot id="myslot"/>

<my-slot>
<button slot="slot1">插槽插入1</button>
<button slot="slot2">插槽插入2</button>
</my-slot>
```
- 你的插槽就是个component
``` bash
<!--components/my-slot/my-slot.wxml
可以给插槽起名来区分啦啦啦啦(前提要添加option-multipleSlots)～
-->
<slot name='slot1'/>//显示： 插槽插入1
<slot name='slot2'/> // 显示： 插槽插入2
```
## behaviors
- 用于组件间`代码共享`的特性，类似于一些编程语言中的 `mixins`(引用生效)
``` js
-- 'my-behavior ---
module.exports = Behavior({
  properties:{},
  dta:{},
  methods:{}
})

-----
var myBehavior = require('my-behavior')
Component({
  behaviors: [myBehavior],
  ...
```

## mobx全局数据共享
- 状态管理

## 分包
- 按需加载
  - pages / subpages
  - 主包 启动和tab-bar 公共资源 + 多个分包 私有资源
- 优化首次启动的下载时间
- 解耦

## promise化
- 回调地狱
- npm `miniprogram-api-promise`
``` js
import {promisifyAll} from 'miniprogram-api-promise'
const wxp = wx.p = {}
promisifyAll(wx,wxp) // wx转存到wxp
```
- 然后可以愉快使用 `async` 和 `await` 啦

## npm
- 不支持node内置包
- 不支持浏览器内置对象的包
- 不支持c++插件