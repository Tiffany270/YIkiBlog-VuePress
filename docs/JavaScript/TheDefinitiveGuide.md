# 犀牛书笔记

## 17章事件处理

### 事件类型(event type)

- **表单事件**
    - form的`submit/reset`事件
    - 表单元素`click`/文本域`change`
    - 表单元素焦点`focus/blur`(不会冒泡)  

- **window事件**  
发生于浏览器窗口本身而非窗口中显示的任何特定文档内容
    - 当文档和其所有外部资源完全加载并显示给用户时`load`(DOMContentLoaded和readystatechange可替代)
    - 当用户离开当前文档转向其他文档时会触发`unload`
    - 提供询问用户是否确定离开当前页面的机会`beforeunload`
    - JS出错`onerror`
    - 当用户停止加载进程而失败`abort`
    - 调整窗口大小`resize`/滚动`scroll`(scroll能在任何可以滚动的文档元素上触发)  

- **鼠标事件**  
    会冒泡到文档的最顶层
    - 每次移动或拖动鼠标时`mousemove`
    - 按下或释放鼠标按键时`mousedown/mouseup`
    - 响应鼠标拖动`mousemove`
    - mousedown/up事件队列之后才会触发`click`
    - 连续两次点击`dblclick`
    - 单击鼠标右键`contextmenu`
    - 移动鼠标指针使它悬停到新元素上时`mouseover`
    - 移动鼠标从而使它不再悬停`mouseout`
    - 滚轮`mousewheel`  

- **键盘事件**
    - `keydown` ~ `keypress` ~ `keyup`  
    - 可以用textinput/keypress阻止字符输入

- **DOM事件**
    - 标准化不冒泡`focusin/focusout`(取代focus和blur)
    - 标准化不冒泡`mouseenter/mouseleave`(取代mouseover和mouseout)

- **H5事件**  
太多了不想写... :(
    - audio和video相关
    - 拖放操作API

- **触摸屏事件**
    - `touchstart` ~ `touchmove` ~ `touchend`
    - 有个属性描述触摸的位置changedTouches


### Handler/Listener

point: 
1. 除了H5的事件处理程序，其他处理程序抖在其定义时的作用域而非运行时的作用域
2. 关于返回值，返回false为告诉浏览器不要执行这个事件相关的默认操作

- **以对象属性为事件处理程序**  
优先级为1
由on+事件名，全小写,每个事件目标对于每种事件类型将最多只有一个处理程序

``` js

window.onload = function(){
    // do sth
}   

```

- **HTML标签为事件处理程序**  
优先级为1

这些事件会在window对象上注册  
注意：此处理程序是个例外，它们被转换为存取全局变量的顶级函数而非任何本地变量，它们运行在一个修改后的作用域链中，这就是为什么在H5标签内，tagName可以替代this.tagName,而它想要调用window对象需要显式地调用window.open

``` html
<button onclick="alert('yiki')">clcik here </button>
```
⬇⬇⬇⬇浏览器自动转换

``` js

function(event){
    with(document){
        with(this.form||{}){
            with(this){
                //...code
            }
        }
    }
}

```

- **addEventListener**

按注册顺序执行

addEventListener([类型，可字符串,不能带on],[function],[boolean])
可用removeEventListener删除事件处理函数

``` js

obj.addEventListener('clcick',function(){
    // ... do sth
},false)

```





    

