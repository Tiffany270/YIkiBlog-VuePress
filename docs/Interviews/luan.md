# 杂七杂八


## Diff算法相关

### NervJS的diff
[diff 算法原理概述](https://github.com/NervJS/nerv/issues/3)

### react.js的diff
- tree diff
    - BFS
    - 同一个父节点下的所有子节点,当发现节点已经不存在，则该节点及其子节点会被完全删除掉

- component diff
    - 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree
    - 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点
    - 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff

- element diff
    - 仅move、remove、insert
    - 设置唯一的key

[React 源码剖析系列](https://zhuanlan.zhihu.com/p/20346379)

##  前端mvc 和 前端mvvc
### mvc
- `model` 保存数据，与后端同步
- `controller` 业务逻辑，根据用户行为和model进行修改
- `view` 试图层 将`model`的数据显示

### mvvc
- `model` -- `view` -- `view-model `
- 减少dom操作，保持视图层松耦合
- `vm`层通过数据响应机制自动响应`model`中的数据变化，然后转化为视图更新
- 通过事件监听view中用户的交互来修改`model`中的数据

## 设计模式

## restful api
``` js
GET /getUser/1
POST /createUser
PUT /updateUser/1
DELETE /deleteUser/1
```
## hybrid app相关
- web和native之间的交互
- h5内嵌native
- [如何实现一个优雅的jsBridge](https://zhuanlan.zhihu.com/p/139510850)
- [深入浅出JSBridge：从原理到使用](https://zhuanlan.zhihu.com/p/438763800)

### js操作native
- 拦截url scheme 通过url参数进行native的操作
- 注入api 不知道什么鬼
- 客户端可以通过webview里面注入一些javascript的上下文，可以理解为`在window对象上挂载了一些原生的方法`，然后H5通过特定的对象可以获取到这个方法
- 如果是混用的会在h5里写对平台的判断
### native操作内嵌的js
- 就是直接执行拼接的js字符串/js必须写在全局上


## 虚拟列表
- 一定要具体实现啊
- [虚拟列表](https://www.zhihu.com/column/p/34585166)

## 网站优化用户体验


## 场景题
- 做过的这些项目有什么亮点
- 身份证等信息上传用什么请求，场景题，为什么？
- 一个页面不断下拉要渲染大量数据，有什么好的解决方法【我答了react-virtualized】
- react-virtualized是怎么实现的？有看过源码吗
- 单页面应用怎么让首页的loading快速展示(我一直不懂这个问题要问什么)
- 平时怎么调试的(怪自己多嘴说了个devtools,然后被问devtools是怎么实现的)
- 平时怎么调试的(怪自己多嘴说了个devtools,然后被问devtools是怎么实现的)
- mysql了解吗？mysql和mongodb分别在什么场景使用
- 开发者工具和性能分析


