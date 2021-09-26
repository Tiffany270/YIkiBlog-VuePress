# webpack源码 plugin
- 负责功能扩展
- webpack基于发布订阅模式，在运行的生命周期会广播许多事件
- plugin通过监听事件能在特定的阶段执行自己的任务

## 开发的规范和原则
``` js
class myplugin{
    apply(compiler){
        compiler.hooks.emit.tap('yiki',compilation)=>{
            //do sth
        }
    }
}
```

- compiler.hooks.make.tapasync
    - make 钩子
    - tapasync 回调
- 插件就是基于这样的模式构建使得钩子在回调插入特定代码

## 常用的plugin
- `HtmlWebpackPlugin`
- `OptimizeCSSPlugin` Compress extracted CSS
- `ExtractTextPlugin`
- `UglifyJsPlugin` 压缩代码
- `DefinePlugin` 编译时 将你代码中的变量替换为其他值或表达式，定义环境变量
- `SplitChunksPlugin`