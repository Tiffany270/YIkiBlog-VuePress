
# vue相关

## vue的生命周期 
- `beforeCreate` 组件的data和DOM都没有初始化，你啥都不做就行
- `created` 实例创建完并完成data观测、属性和方法的运算以及事件回调，但是没有挂载（data可用，methods可用，页面还没渲染。）**多用于AJAX请求**
- `beforeMount` 相关render首次调用，正在把内存的模板逐步渲染到页面
- `mounted` 页面渲染完成，可以运行并且**第三方插件可以被初始化**（Here init)
- `beforeUpdate` 根据data来更新
- `updated` 最新的data
- `beforeDestroy` 销毁之前调用，所有东西正常可用
- `destroyed` 解绑和移除监听以及销毁实例 所有东西都不可用了

## mixin相关
### mixin底层是怎么实现的
- 实现组件复用、option混入
- 组件在**引用**之后就相当于在父组件内开辟了一块单独的空间，然后根据父组件props过来的值进行相应的操作。
- 而使用mixins机制的组件则是在引入组件之后，则是将组件内部的内容如data等方法、method等属性与父组件相应内容**进行合并**，然后再执行渲染
- 可以实现共享数据
- 源码里mergeoption
### mixin冲突怎么解决
合并选项时会做校验，最终以组件本身为准
## use相关
- 使用插件 apply
## component 标签
- is 是导入的组件！
``` 
        <component
         :is="currentTab">
         </component>

import ManuaBill from './manualBill'
 ....
  data() {
    return {
      currentTab: ManuaBill,
    }
  }
```
## about @click
``` js
@click = "handle"
handle(data){
  console.log(data) // data is a click event
}
@click = "handle2()"
handle2(data){
  console.log(data) // undefined
}
```

## 嵌套的生命周期
``` bash
fa_beforeCreate
fa_created
fa_beforeMount

son_beforeCreate
son_Create
son_beforeMount
son_mounted

fa_mounted

```

## watch 和 computed 和 methods
### computed
  - `func`
  - They `don’t` accept `arguments`
  - They are `cached`, that’s mean that the function will run only `once` until the values `don’t` change again also if it’s `called many times` in the same template
  - knows if the values used in the function `changed` so they `don’t` need to run everytime to check, only once
  - Handy for composing new data from `existing` sources and get `dynamic` values based on `other` properties
### when computed
- You need to compose `new` data from `existing data` sources
- You need to `reference` a value directly in your template
- You call the same function `more than once` in your template
- You need to `sort` or `manipulate` a large group of data
---
### watch
- `val` `oldval` and pls to avoid use `()=>` inside `handler`
  ``` js
  obj:{
      handler: function (val, oldVal) { 
      console.log("obj 变了")
      ...
    },
  ```
- Watchers allow you to listen to the data object and run whenever `a specific property changes`
- This is most useful when you want to perform `asynchronous` or expensive `operations` in response to `changing` data
### when watch
- You want to `listen` when a data property changes
- You want to watch a data property `until` it reaches some specific value and then do sth
---
### methods
  - don’t know if the values used in the function changed so they need to run `everytime` to check
### when methods
- To call a function when an event happen in the DOM `methods`
- To call a function from the `computed` or `watchers` when something happens in your component `methods`
- You need to pass parameters `methods`
---
## 同组件/父子组件如何通信的？
- `props`/`$emit` 父子
- 父`$refs`/`$children`/`$parent` 从`dom`属性里获取
- `$attrs`/`$listeners`嵌套的时候，从作用域里取
- 跨组件`new vue` `$emit`/`$on`
- 父`provide`/后代n个`inject`
- `vuex`
## 父子传值的双向绑定
- `v-model`
- `.sync`
## 前端路由有没有用过 
- q:你在项目中怎么实现路由的嵌套？
- a:children
- vue-router
- :id冒号传参
- #hash
    - 更新视图但不重新请求页面
    - `http://oursite.com/#/user/id`如重新请求只会发送`http://oursite.com/`
- history
    - History interface
    - history模式则会将URL修改得就和正常请求后端的URL一样 `http://oursite.com/user/id`
## nextTick情况下用到？
- nextick dom更新后触发的回调
- 因为数据的更新是异步的
## 数据更新页面不更新的场景和解决
- 响应式一定要写在data
- 对象里放对象不更新
    - 动态维护assign
    - vm.$set
- 数组索引直接更改不行/长度获取不了
    - 用数组原生方法  
    - vm.$set
- 超出数组长度的索引不更新
    - 数组原生方法
- 异步之前dom获取不了
    - nexttick
    - settimeout=0
- 路由参数变化引用同一组件
    - 给key
    - watch路由变化
- 见[参考](https://www.cnblogs.com/houxianzhou/p/13645294.html)
## vue 和 react的 区别
### 相同点
- 都是组件化开发和`virtual dom`
- 支持数据驱动视图，不操作真是dom，更新状态数据页面自动更新
- 支持服务端渲染
- 单向数据流（和数据绑定无关）
### 不同点
- `react`是单向的数据绑定
- `react`中`state`不可改变，需要手动`setstate`
- `vue` 的 `state` 不是必须的，由`data`管理
- `vue`会跟踪依赖，不会重新渲染整个组件
- `react` 每当状态改变的时候组件会重新渲染，需要别的方法控制

## defineproperty 和 proxy 对比
- proxy对整个`对象`代理并返回新对象，单一原则
- dfp对每个`属性`重复劫持，也不能对数组有操作, 不能监听属性的添加和删除，新增元素需要再次 definedProperty

### 三大框架侦测机制的区别
- `Angular` 脏值检查
- `React` 对比虚拟 `DOM`
- `Vue` 嗯~ o(*￣▽￣*)o

## axios怎么拦截的
``` js
service.interceptors.request.use(
  config => {
...
export const lockPool = new AxiosLockPool(200) // 存入当前请求的url
这个东西会把请求添加进去，并且内部有settimeout自动清除
防止重复请求
```

## 路由懒加载
``` js
        component: () => import(/* webpackChunkName: "PayCommission" */ '@/views/commission/payCommission/index.vue')

```

## 说一说vue虚拟dom
## vue的diff算法有了解吗
## vue和react的diff算法有什么不同
## mutations和actions的区别
- mutation直接才能更新state
- action是做异步操作commit给mutation
## 如果对vuex里的state状态改变是非常敏感的,可以怎么做来监听状态的改变
## vue的前端模块化开发是遵循哪一种标准
- 还是用的是自己的标准 umd
## vue的数据劫持是什么样的，有什么坏处
## vue的双向绑定原理
- 数据驱动视图
- 精确到渲染层，视图改变怎么数据,然后我就说比如监听input事件然后改变数据)
## js给input提供了哪些监听事件
(我说了click,submit,但应该不是面试官要的答案)
## vue的mehod为什么不可以箭头函数
- [解答]（https://zhuanlan.zhihu.com/p/494788842）
## vue data为什么是个function
## axios
```js
axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
```

## 函数式编程
- 更接近编译器
- render返回vnode
- 无状态，无响应式，无实例，无this
- 