# HTML相关
## iframe的缺点有哪些？
    - 混乱的滚动条
    - 不利于搜索引擎爬虫的优化
    - 兼容很差，后退无效，增加http请求
    - 不推荐用了除非单页吧

## Html5新特性
- **语义化标签**     
    header/dialog/footer/nav/section等
    ``` js
    <footer></footer>
    ```
- **表单增强**
    - input**类型**增多  
    color/date/email/number/range/tel等
    ``` html
        <input type="color"
        placeholder="请输入站点全局标题"
    ```
    - 表单**属性**增多  
    placeholder/required/pattern/min/max/aotofocus/multiple等
## Canvas
``` js
<canvas width=100px; height=100px; id="canvas"></canvas>

```
## SVG 与 Canvas区别
``` js
　　SVG 是一种使用 XML 描述 2D 图形的语言。
　　Canvas 通过 JavaScript 来绘制 2D 图形。
　　SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。
    您可以为某个元素附加 JavaScript 事件处理器。
　　在 SVG 中，每个被绘制的图形均被视为对象。
    如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
　　Canvas 是逐像素进行渲染的。
    在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。
    如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。
```
## 定位geolocation
``` js
navigator.geolocation.getCurrentPosition(
    function(pos){
    console.log('定位时间：',pos.timestamp)      　　　　
    console.log('经度：',pos.coords.longitude)      　　　　
    console.log('纬度：',pos.coords.latitude)      　　　　
    console.log('海拔：',pos.coords.altitude)      　　　　
    console.log('速度：',pos.coords.speed)
},    //定位成功的回调
function(err){ 
　　　　console.log('用户定位数据获取失败')      　　　　
}        //定位失败的回调
)
```

## 拖放  
dragenter/dragstart/drag/dragover/dragend/dragleave/drop

## Web Worker 
web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。  
您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

## Web Storage
- localStorage
- sessionStorage
都是类似的API
```js
localStorage.setItem(key,value);
localStorage.getItem(key);
localStorage.removeItem(key);
localStorage.clear();
localStorage.key(index);
```
- 区别
```
    localStorage生命周期是永久。
    这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，
    否则这些信息将永远存在。
    sessionStorage生命周期为当前窗口或标签页，
    一旦窗口或标签页被永久关闭了，
    那么所有通过sessionStorage存储的数据也就被清空了。
```

## WEB Sockets
目标在一个单独的持久连接上提供全双工、双向通信。在JS创建websocket后会有一个HTTP请求发送到浏览器以发起连接，获得响应后的连接会从HTTP协议交换为WEBsoket协议
- 加密的连接url开头为`wss://`
- 未加密的连接为`ws://`
- 适合移动端应用
- 制定协议的事件比制定JS API的时间还长
``` js
let socket = new WebSocket('ws://www.exmple.com/server.jsp');
socket.send();
socket.send(JSONobj);

socket.onmessage = function(event){
    let data =  event.data;
    // ....
}

socket.onopen/onerrror/onclose =  function(){
    //....
}

```

## 监听事件
- addeventistener

## 事件流
- 描述页面接收事件的顺序
- 捕获（往深处走）-目标-冒泡（往上走）
### ie-事件冒泡流
- 从嵌套最深的节点往上走


