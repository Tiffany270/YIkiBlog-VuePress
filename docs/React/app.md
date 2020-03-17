
# create-react-app搭建

从零搭建一个react脚手架
- antd-mobile
- babel按需加载

- 创建项目
``` bash
create-react-app yourprojectname
```
- 如果你要暴露配置(webpack.config.js类文件)
```
npm run eject
```

- react-app-rewired
    - 安装
    ``` bash
    npm install react-app-rewired --save-dev
    ```
    - 修改 package.json 中的脚本命令
    ``` js
        /** origin
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject" **/

    "scripts": {
        "start": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewired test --env=jsdom",
        "eject": "react-app-rewired eject"
    }
    ```
    
    - 这时候需要customize-cra和react-script
    ``` bash
    npm install customize-cra react-scripts --save

    ```
    - 与package.json同级别创建config-overrides.js
        ``` js
        const {override, 
            addBabelPlugins,
            useBabelRc,
            disableEsLint} = require('customize-cra');
        function myOverrides(config) {
            return config
        }

        module.exports = override(
            myOverrides,
            disableEsLint(),
            addBabelPlugins(
                ['@babel/syntax-dynamic-import', { legacy: true }],
            ), useBabelRc(),
            
        );
        ````
- antd-mobile
    - 安装
    ``` bash
    npm install antd-mobile --save
    ```
    - 按需加载样式
    ``` bash
    npm install babel-plugin-import --save-dev
    ```
    在package.json里是有babel配置的，不用新建.babelrc  
    可以去官网看参数的意思
    ``` js
    "babel": {
        "presets": [
        "react-app"
        ],
        "plugins": [
        [
            "import",
            {
            "libraryName": "antd-mobile",
            "style": "css"
            }
        ]
        ]
    },
    ```

- 其他
    - `--save-dev `是你开发时候依赖的东西
    - `--save` 是你发布之后还依赖的东西。

比如，你写 ES6 代码，如果你想编译成 ES5 发布那么 babel 就是devDependencies。
如果你用了 jQuery，由于发布之后还是依赖jQuery，所以是dependencies。

