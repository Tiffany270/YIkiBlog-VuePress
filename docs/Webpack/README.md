
# Webpack Learnning

::: tip :)
Do u wanna know how it works?
:::

## Webpack是什么
- `webpack`是一个`模块打包器`bundler
- 通过`loader`帮助转换浏览器无法识别的格式和文件
- 通过`plugin`机制能在模块化打包的基础上进一步实现别的功能

## 入门实质
``` js
webpack src/入口文件.js dist/出口文件.js
```

## 大致流程
- 初始化参数，合并参数
- 编译：参数初始化进入`compiler`对象，加载配置插件后执行`run`
- 确定入口，导入依赖，形成关系树
- 编译模块：通过compilation来调用配置的`loader`和`plugin`，模版合并和转换
- 生成最终内容和依赖关系
- 输入，组装成`chunk`，`chunk`会转换成单独的文件输出到`dist`
- 期间会有一些`hooks`让插件通过监听来执行任务或者干预输出的结果

## plugin 和 loader
### plugin
- 可以在任何流程节点出现
- 可以做很多和源码无关的事情和辅助
## loader
- 只是解析源码变成标准模块
- 有特定的活动范围

## sourcemap
- 是一项奖编译、打包、压缩后代码映射回源的技术
- 混淆压缩后的代码难懂啊，用这个快速定位源代码的位置

## 打包优化
- 解决的问题
  - 减少首屏加载的事件
  - 提升交互和页面切换的流畅度
  - 减少构建耗时
- weppack要做什么
  - 提取公共代码
  - 按需加载

## 关于package.json
- 通常我们使用`npm init`命令来创建一个npm程序时，会自动生成一个`package.json`文件。
- `package.json`文件会描述这个NPM包的所有相关信息，包括作者、简介、包依赖、构建等信息，格式是严格的JSON格式。

``` bash
npm init                        //执行这个命令会自动生成这个文件，也可以手动
npm install                     //当前目录中安装所需要的模块
npm install express --save      //可以单独安装这个模块,--save参数表示将该模块写入dependencies属性
npm install express --save-dev  //--save-dev表示将该模块写入devDependencies属性
```

``` json
{
  "name": "vuepress",
  "version": "0.13.1",
  "description": "Minimalistic doc generator with Vue component based layout system",
  "main": "lib/index.js", //入口文件
  "bin": {
    "vuepress": "bin/vuepress.js"
  },

  // scripts指定了运行脚本命令的npm命令行缩写，
  //比如start指定了运行npm/yarn run start时，所要执行的命令。
  "scripts": {
    "dev": "node bin/vuepress dev docs",
    "build": "node bin/vuepress build docs",
    "lint": "eslint --fix --ext .js,.vue bin/ lib/ test/",
    "prepublishOnly": "conventional-changelog -p angular -r 2 -i CHANGELOG.md -s",
    "release": "/bin/bash scripts/release.sh",
    "test": "node test/prepare.js && jest --config test/jest.config.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vuejs/vuepress.git"
  },
  "keywords": [
    "documentation",
    "vue",
    "generator"
  ],
  "author": "Yiki Lee",
  "license": "MIT",
  "bugs": {
    "url": "http://www.yiki.site/vuepress/"
  },
  "homepage": "http://www.yiki.site/vuepress/",
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  },

  // dependencies字段指定了项目运行所依赖的模块，
  //devDependencies指定项目开发所需要的模块。
  //它们都指向一个对象。
  //该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及其版本范围。
  "dependencies": {
    "@babel/core": "7.0.0-beta.47",
   // ...

 //peerDependencies字段，就是用来供插件指定其所需要的主工具的版本
 //安装chai-as-promised模块时，主程序chai必须一起安装，而且chai的版本必须是1.x。如果你的项目指定的依赖是chai的2.0版本，就会报错,从npm 3.0版开始，peerDependencies不再会默认安装了
  "name": "chai-as-promised",
  "peerDependencies": {
    "chai": "1.x"
  }
}

  },

//engines字段指明了该模块运行的平台，比如 Node 的某个版本或者浏览器。
  "engines": {
    "node": ">=8"
  },
  //browser指定该模板供浏览器使用的版本。Browserify这样的浏览器打包工具，通过它就知道该打包那个文件。
  "browserslist": [
    ">1%"
  ]
}



```
