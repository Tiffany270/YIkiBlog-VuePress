# 模块化相关
让我们走向工程化～～～
``` js
<head>
  <script src="fileA.js"></script>
  <script src="fileB.js"></script>
</head>
```
- 导入的多个 JS 文件直接作用于全局命名空间，很容易产生命名冲突
- 导入的 JS 文件之间不能相互访问，例如 fileB.js 中无法访问 fileA.js 中的内容，很不方便
- 导入的 `<script>` 无法被轻易去除或修改
## 对模块化的理解
- 解决全局变量污染，命名空间，数据保护
- 再利用函数作用域链和闭包解决模块名被任意修改(getxx())
- 解决模块之间的依赖关系
- **模块就是低耦合利于维护和复用的代码片段**
----
### `CommonJS`
- node 在用
- one file one module，私有，别的文件不可见，每个模块都有自己的作用域
- 第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象
- `module.export.xx = {}`
- `require()` 加载模，会产生缓存，值的复制（拷贝），导出后模块内部的变化影响不到这个值
- if multiple module, only get the last export
- **运行时加载（只有运行时才能得到这个对象）**
- 加载机制是**同步**的，在磁盘读取没什么问题，但是不适合浏览器，会阻塞
### `AMD` 
- Asynchronous module definition/ so `requireJS` is one of its complement
- `define(...)`，定义为模块
- `require(...)`，开始加载以来，加载完成后返回该模块到处的值
- 适合浏览器，也是运行时加载
- 异步，不影响后面的执行，依赖都在回调函数里，加载完成后才运行
- all calling at the first time
### `CMD` 
- Common Module Definition，`sea.js` is one of its complement，站在巨人肩膀上的产品
- following `common.js` + `AMD` ,one file one module
- 依赖就近 同步 适合浏览器
- `define(...)`
- `require(...)`
  - wait and if not dependent, it would not call
### `ES6 Module` （ECMAScript Module）
- 目前浏览器和服务器通用的模块解决方案，设计思想是尽量静态化，使得编译时就能确定模块的依赖关系以及输入和输出的变量 **（即编译时输出接口）**
- 注意：发生循环引用的时候，脚本如果没有执行完，会取它要的东西的缓存值（初始赋值）
- `import(...)`静态加载的方法，值的引用，提升到头部，优先执行，会返回一个promise对象，有then
- `export(...) `动态绑定，通过该接口可以取模块内部实时的内容
### `UMD`
- is AMD?
- is CommJS?
- global value
## 模块循环引用
- [循环引用](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)
- common.js 若一旦出现了循环引用，则只输出已经执行的部分，还未执行的部分不会输出。当第二次加载模块，也不会执行改模块，而是优先从**缓存中取值**
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


