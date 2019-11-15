
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


## 关于package.json



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

  // scripts指定了运行脚本命令的npm命令行缩写，比如start指定了运行npm/yarn run start时，所要执行的命令。
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

  // dependencies字段指定了项目运行所依赖的模块，devDependencies指定项目开发所需要的模块。它们都指向一个对象。该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及其版本范围。
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
