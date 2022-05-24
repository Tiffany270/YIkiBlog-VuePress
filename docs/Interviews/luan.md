# 杂七杂八

## 模块化相关
- 对模块化的理解
    - 解决全局变量污染，命名空间，数据保护，再利用函数作用域链和闭包解决模块名被任意修改(getxx())
    - 解决模块之间的依赖关系
- `CommonJS`
    - one file one module，私有，别的文件不可见
    - `require()` 加载模，会产生缓存，值的复制（拷贝），导出后模块内部的变化影响不到这个值
    - `module.export.xx = {}`
    - if multiple module, only get the last export
    - 运行时加载（只有运行时才能得到这个对象）
    - 同步的，不适合浏览器，会阻塞
- `AMD` 
    - Asynchronous module definition/ so `requireJS` is one of its complement
    - `define(...)`，定义为模块
    - `require(...)`，开始加载以来，加载完成后返回该模块到处的值
    - 适合浏览器，也是运行时加载
    - 异步，不影响后面的执行，依赖都在回调函数里，加载完成后才运行
    - all calling at the first time
- `CMD` 
    - Common Module Definition，`sea.js` is one of its complement
    - following `common.js`,one file one module
    - 适合浏览器
    - `define(...)`
    - `require(...)`
    - wait and if not dependent, it would not call
- `ES6 Module` （ECMAScript Module）
    - 目前浏览器和服务器通用的模块解决方案，设计思想是尽量静态化，使得编译时就能确定模块的依赖关系以及输入和输出的变量
    - `import(...)`静态加载的方法，值的引用，提升到头部，优先执行，会返回一个promise对象，有then
    - `export(...) `动态绑定，通过该接口可以取模块内部实时的内容
- `UMD`
    - is AMD?
    - is CommJS?
    - global value

## babel相关
 - what is babel?
    - babel is a js compiler
    - 将es6代码转化为浏览器或其他环境支持的代码

## 性能优化处理
[原址-谭光志](https://zhuanlan.zhihu.com/p/121056616)
- 首屏加载
- 图片优化
    - 延迟加载/懒加载，比如在可视区域里面加载图片，根据滚动条加载剩下的内容
    - 响应式（浏览器能够根据屏幕大小自动加载合适的图片
    - 多用CSS3代替图片
    - base64/webp格式/使用字体图标 `iconfont` 代替图片图标
- 减少HTTP请求
    - 利用`http`强缓存的相关，第三方资源打包成多个块
- 减少DOM操作（事件委托）
- CDN 静态资源加载
    - 内容分发网络（CDN）是一组分布在多个不同地理位置的 Web 服务器。
    - 当服务器离用户越远时，延迟越高。
    - `CDN` 就是为了解决这一问题，在多个位置部署服务器，让用户离服务器更近，从而缩短请求时间
- 将 CSS 放在文件头部（防止页面空白），JavaScript 文件放在底部（防止堵塞）
- webpack打包策略
    - 公共/非公共的
    - `splichunks` + `dynamic import`
- 优化长列表
    - 懒加载
    - 虚拟节点
    - `requestanimationframe`
- 压缩文件/webpack 可以使用如下插件进行压缩：
    - JavaScript：`UglifyPlugin`
    - CSS ：`MiniCssExtractPlugin`
    - HTML：`HtmlWebpackPlugin`

- `switch`代替`if-else`



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

