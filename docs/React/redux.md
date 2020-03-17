
# redux/react-redux

::: tip

react和react-redux是不一样的东西！

:::



### redux-base
- redux是一个独立专门用于状态管理的JS库（不是react插件，只是多用于react而已）
- 用于管理react应用中多个组件共享的状态
- redux等于一个容易，把组件里的状态放进去(集中式管理)，提供一些接口给使用者用于管理
- 内部维护为`state`和`reducer`
- 核心方法
    - getState
    - dispatch(action)
    - subscribe(listener)
    - demo
    ``` js
    store.getState()
    store.dispatch({type:'INCR',num})
    store.subscribe(render)

    ```
- action
    - 标示要执行行为的对象
    - {type:字符串，num/数据}
    - `Action Creator` 产生action的工厂函数

- store
``` js
const store = createStore(reducer)
```

### react-redux

- 引入
``` bash
    <Provider store={store}>...your app </Provide>
>npm install --save prop-types

```
- 
