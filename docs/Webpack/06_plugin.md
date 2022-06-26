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

- [offical docs](https://www.webpackjs.com/plugins/)
## SplitChunksPlugin
``` js
module.exports = {  //...
  optimization: {    
    splitChunks: {    
     //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      chunks: 'async',
      minSize: 30000,//表示多少字节开始抽离，合并前模块文件的体积 20k
      minChunks: 1,//最少被引用次数
      // 分块策略
      cacheGroups: {        
        vendors: {          
          test: /[\\/]node_modules[\\/]/,          
          minChunks:1,//敲黑板
          priority: -10//优先级更高
        },        
        default: {          
          test: /[\\/]src[\\/]js[\\/]/
          minChunks: 2,//一般为非第三方公共模块
          priority: -20,          
          reuseExistingChunk: true
        }
      },      
      runtimeChunk:{          
            name:'manifest'
      }
    }
  }
```


- `webpack --display-chunks` 获取每个chunk包含的具体内容

## 常用的plugin
- `HtmlWebpackPlugin`
- `OptimizeCSSPlugin` Compress extracted CSS
- `ExtractTextPlugin` extract css into its own file
- `UglifyJsPlugin` 压缩代码
- `DefinePlugin` 编译时 将你代码中的变量替换为其他值或表达式，定义环境变量
- `SplitChunksPlugin`

## hash和chunkHash和contentHash
可以配合浏览器缓存带给用户带来更佳的用户体验，根据文件来生成对应的hash值以此来告诉浏览器要不要读取缓存
- hash
 - `filename: '[name]-[hash].js'`
 - 所有文件名的hash相同，只要一部分内容改变，会导致所有文件的hash都改变
- chunkHash
 - ` filename: '[name]-[chunkhash].js'`
 - 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的hash值
- contentHash
 - 每个生成的文件的名称都有一个唯一的hash值，该hash值是根据该文件的内容计算得出的
 - 当构建的文件内容发生改变时，就会生成新的hash值，且该文件的改变并不会影响和它同一个模块下的其它文件。
