# Q&A

## Hooks
- Hooks 通常支持提取和重用跨多个组件通用的有状态逻辑，而无需承担高阶组件或渲染 props 的负担
- Hooks 可以轻松地操作函数组件的状态，而不需要将它们转换为类组件
- 保持更多功能，还可以避免过多使用基于类的组件
## Hook.useEffect
- 异步
- useEffect主要是解决一些function component中的副作用，即网络请求、监听某个模块等等这些
- 模拟 componentDidMount
- (func) useEffect会在每次 DOM 渲染后执行
- (func,arr[]) 数组中的每一项都是effect执行的监听元素。就是说如果我们希望state和props改变的时候才执行这个副作用，就将需要**监听的state或者props**添加到第二个参数的数组中
``` js
const Comp = props => {
    const [ foo, setFoo ] = useState(1);
    useEffect(() => {
        ...
    }, [ foo ]);
    return <button>{foo}</button>
};
```
## Hook.useState 
- 模拟 setState
- useState的参数只有一个，就是state的初始值（这个参数可以是简单类型，也可以是一个对象）
- 返回值是一个数组，数组中第一项是当前state的值；第二项是一个函数，是更新state的方法
``` js
/**
传入一个初始状态
返回一个数组，包含最新状态和 set 状态的方法。
调用 set 状态的方法时，会触发重新渲染
*/
const Comp = props => {
    const [ foo, setFoo ] = useState(1);
    return <button onClick={() => setFoo(2)}>{foo}</button>
};
--------- 自己实现一下
let currentState;
const useState = initialState => {
    const state = currentState || initialState;
    const setState = newState => {
        currentState = newState;
        render();// 这个 render 可以理解为触发了整个react app渲染，就像 ReactDOM.render()
    };
    return [ state, setState ];
};

```

## 高阶组件(HOC)
- 接受一个组件并返回一个新组件的函数

## JSX 
- 将原始 HTML 模板嵌入到 JS 代码中

## 生命周期
- `componentWillMount` 在渲染之前执行，用于根组件中的 App 级配置
- `componentDidMount` 在第一次渲染之后执行，可以在这里做AJAX请求，DOM 的操作或状态更新以及设置事件监听器
- `componentWillReceiveProps` 在初始化render的时候不会执行，它会在组件接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染
- `shouldComponentUpdate` 确定是否更新组件。默认情况下，它返回true。如果确定在 state 或 props 更新后组件不需要在重新渲染，则可以返回false，这是一个提高性能的方法
- `componentWillUpdate` 在shouldComponentUpdate返回 true 确定要更新组件之前件之前执行
- `componentDidUpdate` 它主要用于更新DOM以响应props或state更改
- `componentWillUnmount` 它用于取消任何的网络请求，或删除与组件关联的所有事件监听器
