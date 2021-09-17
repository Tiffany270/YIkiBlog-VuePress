
# Q&A

::: tip :)
Do u wanna know how it works?
:::

- **简单阐述一下vue的生命周期**  
    - `beforeCreate` 组件的data和DOM都没有初始化，你啥都不做就行
    - `created` 实例创建完并完成data观测、属性和方法的运算以及事件回调，但是没有挂载（data可用，methods可用，页面还没渲染。）**多用于AJAX请求**
    - `beforeMount` 相关render首次调用，正在把内存的模板逐步渲染到页面
    - `mounted` 页面渲染完成，可以运行并且**第三方插件可以被初始化**（Here init)
    - `beforeUpdate` 根据data来更新
    - `updated` 最新的data
    - `beforeDestroy` 销毁之前调用，所有东西正常可用
    - `destroyed` 解绑和移除监听以及销毁实例 所有东西都不可用了
- 如何实现一个自定义组件
- 不同组件之间如何通信的/父子组件如何通信的？
    - props/$emit 父子
    - 父$refs/$children/$parent 从dom属性里获取
    - $attrs/$listeners嵌套的时候，从作用域里取
    - 跨组件new vue $emit/$on
    - 父provide/后代n个inject
    - vuex
- 前端路由有没有用过，你在项目中怎么实现路由的嵌套？
    - children
- vue-router
    - :id冒号传参
    - #hash
        - 更新视图但不重新请求页面
        - `http://oursite.com/#/user/id`如重新请求只会发送`http://oursite.com/`
    - history
        - History interface
        - history模式则会将URL修改得就和正常请求后端的URL一样 `http://oursite.com/user/id`
- nextTick有没有用过，为什么情况下用到？
    - nextick dom更新后触发的回调
- Vue的响应式原理你知道是怎么实现的吗？
- 你觉得订阅者-发布者模式和观察者模式有区别吗？有的话，说一下它们的区别。
- vue一些数据更新页面不更新的场景和解决
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
    
