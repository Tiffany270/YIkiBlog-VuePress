# webpack源码 loader
- 当项目遇到不是js类型的文件的时候，需要借助`loader`进行转换才能继续执行打包
- [official loaders](https://www.webpackjs.com/loaders/)
## runLoaders
- `runLoaders` 会调用用户的`loader`集合读取 


## 常用的loader
- `file-loader` 可以用于图片
- `html-loader` 也可以图片
- `url-loader` base64的方式把文件内容注入到代码中，limit限制大小
- `source-map-loader`
- `image-loader` 加载并压缩图片
- `babel-loader` es6-es5
- `css-loader` 加载css
- `style-loader` css代码注入到js里
- `eslint-loader`