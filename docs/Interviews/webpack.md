# webpack相关
- 写过loader和plugin吗
- webpack 的 tree shaking对common.js和es6module都生效吗，原理
- 为什么vite比webpack快，原理
- vite对webpack的优化
- 你是如何使用webpack的

## webpack打包构建的过程
- 初始化参数，合并选项
- compiler对象，执行compiler.run
- 确认入口
- compliation 编译开始，对module进行loader编译，转为标准的内容，再根据module找出以来递归编译
- 收集依赖，生成ast树
- 输入，组装chunk
- dist

## 打包优化
- 定位体积问题 webpack-bundle-analyzer
- 提取公共代码 , 对第三方框架单独给一个包
- cdn ( script + externals)
- 开启gzip压缩 减少http请求和传输时间 ，网络层的优化 请求头accept-encoding:gzip
  - 用的是 compression-webpack-plugin
  - 不过其实后端nginx做比较好？
- uglify对代码压缩，去空格
- dllplugin/dllreferenceplgin 第三方库ventor单独打包 稳定的
  - 拆分bundles
  - 单独生成一个文件
  - 映射
- tree-shaking mode:production 分析模块导入导出，不被使用的模块会被删除
  - sideeffect 设置全局不进行摇树

## 构建优化
- babel-loader, cachedirectory 开启缓存
- ignoreplugin 指定不要的模块
- noparse 不解析属性值代表库的依赖，避免重复打包
- happypack 多进程打包
- paralleuglifyplugin 压缩

## 自动化打包构建