# Q&A

## CSS3新特性
- **选择器**
    ``` html
    div:last-child                  其父元素 匹配最后一个
    div:nth-child(n)                其父元素 的第n个子元素
    div:nth-last-child(n)           其父元素 的倒数第n个子元素
    
    ```

 - **@Font-face**
可以用来加载字体样式，而且它还能够加载服务器端的字体文件
    ``` 
    @font-face
    {
    font-family: myFirstFont;
    src: url('Sansation_Light.ttf')}
    ```
- **圆角/阴影/渐变**
    ```
    border-radius: 15px;
    box-shadow: 0rem 0rem 0.7rem #cfd8dc;
    background-image: linear-gradient(#e66465, #9198e5);
    ```
- **动画相关：Transition / Transforms / Animation**

    ``` 
    transition: all 0.3s ease;
    |||
    transition-property:border-color, background-color, color;
    transition-duration:.5s, .5s, .5s;
    transition-timing-function:ease-in, ease-in, ease-in;
    transition-delay:.1s, .1s, .1s;

    ----

    transform: rotate(0deg);
    
    ----
        @keyframes slide-top {
    0% {
        -webkit-transform: translateY(3vh) rotate(-2deg);
        transform: translateY(3vh) rotate(-2deg);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateY(0) rotate(-2deg);
        transform: translateY(0) rotate(-2deg);
        opacity: 1;
        }
    }


    ```

    - **文字**
    ```
    word-break: normal|break-all|keep-all;
    word-wrap: normal|break-word;
    text-overflow:clip|ellipsis|string 

    ps:超出部分省略
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    ```
    - **布局相关 Flex/ Grid/多列**  
    见Demo
    - **媒体查询**  
    @media
    ```
    @media only screen and (max-width: 768px) {

    ```

## Html5新特性
- **语义化标签**     
    header/dialog/footer/nav/section等
    ``` html
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
- **Canvas**
    ``` html
    <canvas width=100px; height=100px; id="canvas"></canvas>

    ```
    - SVG 与 Canvas两者间的**区别**
    ```
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
- **定位geolocation**
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

- **拖放**  
    dragenter/dragstart/drag/dragover/dragend/dragleave/drop

- **Web Worker**  
web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。  
您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

- **Web Storage**
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
    
- **WEB Sockets**  
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

## 手撕深拷贝
- JSON法  
缺点：里面含函数的话会失效
``` js
    let newobj = JSON.parse(JSON.stringify(oldObject))

    // 解决函数失效

    function stringifyRep(key, value) {
    if (typeof value === "function") {
        return `${value}`;
    }
    return value;
    }
    function parseRep(key, value) {
    return eval(value);
    }
    var a = {
    b: () => 1 + 1
    }
    var aa = JSON.parse(JSON.stringify(a, stringifyRep), parseRep)

```

- 简单一层拷贝Object.assign()
``` js
    /**
    * 对象合并深拷贝
    * */
    mergeDeep(target: any, source: any) {
        if (this.isObject(target) && this.isObject(source)) {
        for (const key in source) {
            if (this.isObject(source[key])) {
            if (!target[key]) {
                Object.assign(target, { [key]: {} });
            }
            this.mergeDeep(target[key], source[key]);
            } else {
            Object.assign(target, { [key]: source[key] });
            }
        }
        }
        return target;
    }

    /**
    * 对象合并含过滤浅拷贝
    * */
    merges(target: any, source: any) {

        if (this.isObject(target) && this.isObject(source)) {
        for (const key in target) {
            if (source[key] && Object.prototype.toString.call(target[key]) !== '[object Array]') {
            Object.assign(source[key], target[key]);
            }
        }
        }
        return source;
    }
```

- HTTP和HTTPS的区别  
超文本传输协议
    - HTTP  
    明文传输，易被抓包
    - HTTPS
    ```
        基于HTTP协议，通过SSL或TLS提供加密处理数据、验证对方身份以及数据完整性保护.
        HTTPS协议可以理解为HTTP协议的升级，就是在HTTP的基础上增加了数据加密。
        在数据进行传输之前，对数据进行加密，然后再发送到服务器。
        这样，就算数据被第三者所截获，但是由于数据是加密的，所以你的个人信息让然是安全的。
    ```

## 关于跨域  
跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。

## 闭包
Q:闭包的理解，以及你在什么场景下会用到闭包？  
见JS高程第七章

## 一些JS题
- 说一下你对原型与原型链的了解度
- 有几种方式可以实现继承，用原型实现继承有什么缺点，怎么解决？
- iframe的缺点有哪些？
- Ajax的原生写法为什么会有同源策略？
- 前端处理跨域有没有遇到过，处理跨域的方式有哪几种方式去解决
- 怎么判断两个对象是否相等代码
- 实现一个对象的深拷贝
- 从发送一个url地址到返回页面，中间发生了什么
- 说下工作中你做过的一些性能优化处理
