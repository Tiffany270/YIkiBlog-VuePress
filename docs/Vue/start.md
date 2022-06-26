# vue源码 开始啦

:) 从现在开始好好学习

## debug and start
- downLoad source code
- run `npm install`
- alert `package.json`
``` 
 "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev --sourcemap",
    ...
```
- example/chose index index
``` js
  change
   <script src="../../dist/vue.min.js"></script>
   to
   <script src="../../dist/vue.js"></script>
```
- run `npm run dev`
- down load `Live server` 
- example/chose index - `go live` in VScode
- see chrome's `source` or `log` or `debug`

## 目录结构
- `benchmarks` 性能、基准测试
- `dist` 打包输出
- `flow` flow 语法类型声明 理解为约束接口吧哈哈
- `packages` 一些额外的包
- `scripts` 构建源码的文件夹
  - `build.js` 构建入口
- `src` 源码开始
  - `compiler` 编译器
  - `core` 核心 你要学的都在里面啦
    - `config.js` 默认配置
    - `index.js` 入口
    - `components` 全局组件 keep-alive
    - `globle-api` 全局api 
    - `instacne` vue实例开始
    - `observer` 响应式原理
    - `util` 工具方法
    - `vdom` 虚拟dom和渲染和patch相关
  - `platforms` 构建后不同平台的入口
  - `server` 服务器渲染相关
- `test`
- `types` ts类型声明 对应一下flow

## flow
- 做静态类型检查
```
/* @flow */
.... code ....
--------------
flow 有完整的数据结构
├── compiler.js        # 编译相关
├── component.js       # 组件数据结构
├── global-api.js      # Global API 结构
├── modules.js         # 第三方库定义
├── options.js         # 选项相关
├── ssr.js             # 服务端渲染相关
├── vnode.js           # 虚拟 node 相关
```
- `.flowconfig`
  -  `[libs] `部分用来描述包含指定库定义的目录

## GlobalAPI
- `src/globalapi/`下的所有
- `src/core/index.js` 当这里是入口吧
``` js
import Vue from './instance/index' 
import { initGlobalAPI } from './global-api/index'
...
initGlobalAPI(Vue) //这里的vue从instence里来的
... 
```
- 静态属性方法 `src/globalapi/inde.js`
  - `initGlobalAPI` 全局api方法
    ``` js
    ...
    // 对config的处理
    const configDef = {}
    configDef.get = () => config
    if (process.env.NODE_ENV !== 'production') {
        configDef.set = () => {
        warn(
            'Do not replace the Vue.config object, set individual fields instead.'
        )
        }
    }
    Object.defineProperty(Vue, 'config', configDef)
    //...

    Vue.set = set
    Vue.delete = del
    Vue.nextTick = nextTick

    //option    
    Vue.options = Object.create(null)
    // 'component','directive','filter'
    ASSET_TYPES.forEach(type => {
        Vue.options[type + 's'] = Object.create(null)
    })
    //还有一些绑定在component上的扩展，
    //<keep-alive> 组件见builtInComponents里 
    extend(Vue.options.components, builtInComponents)
    //
    initUse(Vue)//Vue.use = function (plugin: Function | Object)
    initMixin(Vue)// Vue.mixin = function (mixin: Object)
    initExtend(Vue)// Vue.extend = function (extendOptions: Object): Function 
    initAssetRegisters(Vue) //ASSET_TYPES 'component','directive','filter'

    ```
  - `builtInComponents`
- `Vue.extend` 子类构造器 `src/globalapi/extend.js`
  - 复习下怎么用
  ``` js
  // 创建构造器
  var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function () {
      return {
        firstName: 'Walter',
        lastName: 'White',
        alias: 'Heisenberg'
      }
    }
  })
  //----------------------
  // 创建 Profile 实例，并挂载到一个元素上。
  <div id="mount-point"></div>
  new Profile().$mount('##mount-point')
  // ---------------------
  // res
  <p>Walter White aka Heisenberg</p>
  ```
  - 先创建一个类Sub，接着通过原型继承的方式将该类继承基础Vue类，然后给Sub类添加一些属性以及将父类的某些属性复制到Sub类上，最后将Sub类返回
  ``` js
  Vue.extend = function (extendOptions: Object): Function {
      extendOptions = extendOptions || {}
      const Super = this // yiki: point to Class `Vue`
      const SuperId = Super.cid // yiki: unique identifier 
      const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {}) // pool

      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId]
      }

      const name = extendOptions.name || Super.options.name
      if (process.env.NODE_ENV !== 'production' && name) {
        validateComponentName(name) // 校验
      }

      // yiki: sub class 继承开始
      const Sub = function VueComponent (options) {
        this._init(options)
      }
      Sub.prototype = Object.create(Super.prototype)
      Sub.prototype.constructor = Sub
      Sub.cid = cid++ // identifier
      Sub.options = mergeOptions(
        Super.options,
        extendOptions
      )
      // 将父类保存到子类的super属性中，以确保在子类中能够拿到父类
      Sub['super'] = Super
      
      // ---- 初始化props和computed  
      if (Sub.options.props) {
        initProps(Sub)
      }
      if (Sub.options.computed) {
        initComputed(Sub)
      }
      // copy
      Sub.extend = Super.extend
      Sub.mixin = Super.mixin
      Sub.use = Super.use

      ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type]
      })
      if (name) {
        Sub.options.components[name] = Sub
      }
      // 给子类新增三个独有的属性
      Sub.superOptions = Super.options
      Sub.extendOptions = extendOptions
      Sub.sealedOptions = extend({}, Sub.options)

      // yiki: When sub class is created , use Fater class's cid as key, then store to `cachedCtors`
      // cache constructor
      cachedCtors[SuperId] = Sub
      return Sub
    }
  ```
