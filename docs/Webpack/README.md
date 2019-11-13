
# Webpack Learnning

::: tip :)
Do u wanna know how it works?
:::

- Webpack
    - webpack是一个`模块打包器`bundler
    - 前端所有资源文件都会做`模块module`处理
    - webpack会根据模块的依赖关系进行静态分析，`生成`对应的静态资源
    - webpack**只能**加载JS/JSON文件
- Loader
    - loader是本身运行在node环境中的`js模块`
    - 对于`其他类型`模块/文件，需要用对应的loader进行转换和加载
    - loader是一个`函数`，接受源文件做参数，返回转换后的结果
    - xxx-loader命名格式

- webpack.config.js
    - 配置文件，joson格式的配置对象
- plugin
    - 完成一些loader完成不了的功能

- 入门实质

``` js

webpack src/入口文件.js dist/出口文件.js


```
