
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
- 不同组件之间如何通信的？
- 父子组件如何通信的？
- 前端路由有没有用过，你在项目中怎么实现路由的嵌套？
- nextTick和Vuex两个有没有用过，分为什么情况下用到？
- Vue的响应式原理你知道是怎么实现的吗？
- 你觉得订阅者-发布者模式和观察者模式有区别吗？有的话，说一下它们的区别。
