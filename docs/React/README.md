
# React.js :taxi:

### base

- npm创建脚手架并启动
    ``` bash
    npm install -g create-react-app
    create-react-app [your app name]
    ## cd your project and run it
    npm start
    ## defulut in port 3000
    ```
- 打包
    ``` bash
    npm install -g serve
    npm run build
    serve build
    ## defult in port 5000
    ```
- 引入路由
    ``` bash
    npm install --save react-router-dom
    ```
    ``` js
    import { HashRouter, Route, Switch } from 'react-router-dom'
        
    ReactDOM.render(
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route>
            </Switch>
            {/* 不指定path会被首先经过 */}
        </HashRouter>
        , document.getElementById('root'));


    ```
- 引入redux
    ``` bash
    ## warming:don't use the least redux version ple
    npm install -- save redux@3.7.2 react-redux redux-thunk
    npm install --save-dev redux-devtools-extension
    ```
    then create 4 base files like this:
    ```
    -component
        ├─ redux
        │  ├─ action-types.js
        │  ├─ store.js
        │  ├─ actions.js
        │  └─ reducers.js

    ```

## others

- 引入antd样式库
    ``` bash
    npm install antd-mobile --save
    ## 其他自己去官网看吧，就是c+v，有些index.html的配置
    ```

    