# vue源码 编译器之ast
- 轮如何将html模版字符串转换为ast对象
- 数据驱动视图的时候都知道dep触发watcher更新，那watcher怎么来的
- 其实就是 mount时 new watcher，updatecomponent-> `vm._render()`

## 怎么得到render
### runtime only
- 自己创建vue实例，手写render函数也可以执行
``` js
new vue({
    render(h){
        return h('div',this.hi)
    }
})
```
- 要借助`vue-loader`进行编译，将编译交给插件去实现
### runtime + compiler
- 由编译器编译组件模版生成render函数
``` js
new vue ({
    template:'{{yiki}}'
})
```
## $mount
- `/src/platforms/web/entry-runtime-with-compiler.js`
- 注意运行时的 Vue.js 包就没有这部分的代码，通过 打包器 结合 `vue-loader + vue-compiler-utils` 进行预编译，将模版编译成 `render` 函数

