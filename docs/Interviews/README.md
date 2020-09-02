# Q&A
::: tip :)
Standing on shoulders of Giants 
:::

## CSS类问题 
- CSS3新特性
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
            //...
        }

        ```
- 说下你常用的几种布局方式
- 集中往盒模型、flex布局说(至于grid布局，这个我看过没有用到过)
- 实现水平居中的几种方法？
- animate和translate有没有用过，一些常见的属性说下？
- CSS实现宽度自适应100%，宽高16:9的比例的矩形。
- 如何实现左边两栏一定比例，左栏高度随右栏高度自适应？


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
- 处理跨域的方式有哪几种方式去解决？
- Ajax的原生写法为什么会有同源策略？


## 闭包
Q:闭包的理解，以及你在什么场景下会用到闭包？  
见JS高程第七章  
 - A closure is a function having access to the parent function, even after the parent function has close.  
    - 闭包是指有权访问另一个函数作用域中的变量的**函数**
    - 闭包的创建会将外部函数的活动对象**添加**到它的作用域链中
    - 创建闭包的方式就是在**函数内部创建另一个函数**，这个内部函数的作用域链中包含外部函数的作用域
    ``` js
    function funcOut(pName){
        return function (obj1 obj2){
            // 这两个变量访问了函数外部的pName
            let v1 = obj1[pName];
            let v2 = obj2[pName];

            //...
        }
    }
    ```
    - 闭包能访问它所在外层函数全部变量，即使外层函数已经执行结束
    - 外部函数在执行完毕后，匿名函数（闭包）的作用域**仍在引用**这个活动对象，所以这种活动对象**不会**被销毁。
    - 所以记得解除匿名函数的引用，因为过度使用闭包会导致内存占用过多
    - 匿名函数的执行环境具有全局性，`this`通常（不一定）指向`window`
- 内存泄漏
    - 如果一个DOM对象A中的属性a指向另一个DOM对象B，而B中有属性b指向对象A，那么这两个对象存在循环引用，垃圾回收机制就无法回收他们，这就造成了内存泄漏
    ``` js
        function func () {
        var dom = document.getElementById("xx");
        dom.onclick = function(){
            alert(dom.id);
        }
    }
        // 修改为
        function func () {
        var dom = document.getElementById("xx");
        var id = dom.id;//切断引用
        dom.onclick = function(){
            alert(id);
        }
    }

    ```
- Q：闭包的场景？
    - A1：应用闭包的主要场合是：设计私有的方法和变量。任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数外部访问这些变量。私有变量包括函数的参数、局部变量和函数内定义的其他函数。
    - A2: setTimeout
    ``` js
        function f1(a) {
        function f2() {
            console.log(a);
        }
        return f2;
    }
    var fun = f1(1);
    setTimeout(fun,1000);//一秒之后打印出1

    ```
    - A3:函数防抖
    在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
    ``` JS
        /*
    * fn [function] 需要防抖的函数
    * delay [number] 毫秒，防抖期限值
    */
    function debounce(fn,delay){
        let timer = null    //借助闭包
        return function() {
            if(timer){
                clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
                timer = setTimeOut(fn,delay) 
            }else{
                timer = setTimeOut(fn,delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
            }
        }
    }
    ```
- Q:闭包的好处？
    - A:不会污染全局环境，方便进行模块化开发，减少形参个数，延长了形参的生命周期



## 一些JS题
- **说一下你对原型与原型链的了解度**  
见JS高程第六章
    - `__proto__`/`prototype `
    - OO语言有接口继承和实现继承，但是ES只能支持`实现继承`，这个就是靠原型链来实现的。
    - 基本思想：利用`原型`让一个引用类型`继承`另一个引用类型的属性和方法
    - 基本模式
        ``` js

        function SuperType(){
            this.property = true;
        }

        SuperType.prototype.getSuperValue = function(){
            return this.property;
        }

        function SubType(){
            this.subproperty = false;
        } 

        SubType.prototype = new SuperType();//extend

        SubType.prototype.getSubValue = function(){
            return this.subproperty;
        }
        ```

    - 默认的原型
    所有引用类型都默认继承了`Object`,因此默认原型都会包含一个内部指针，指向`Objcet.prototype`
   
- **有几种方式可以实现继承，用原型实现继承有什么缺点，怎么解决？**  
见JS高程第六章
    - sumary
        - 组合继承
        - 原型式继承
        - 寄生式继承
        - 寄生组合式继承  
    - 缺点
        - 引用类型值得原型属性会被所有实例共享
            ``` js
            function Father(){
                this.colors = ['red','blue','black'];
            }

            function Kid(){}
            Kid.prototype = new Father();
            let child1 = new Kid();
            child1.colos.push('white');// colors.len = 4;

            let child2 = new Kid();
            // colors.len = 4

            //你可以看到共享了color属性
            ```
        - 创建子类型的实例时不能向超类型的构造函数传递参数

- **判断两个对象是否相等相关**  
见JS高程第三章  
    - `==`先转换再比较
        - 布尔 vs 数值 布尔值转数值
        - 字符串 vs 数值 字符串转数值
        - 对象 vs Any 对象.valueOf()
        - 对象 vs 对象 是否指向同一个对象
        - null==nudefined=>ture
        - NaN == any -> false
        - NaN == NaN -> false
    - `===`仅比较而不转换
        - null === undeifne => false
        - 比较对象的时候仍然是检查引用
    - `Object.is(a,b)` 仅能检测引用
    - `JSON.stringify(obj)`转换字符串比较，但是key可能混乱
    - 递归`Object.keys(obj)`&&`getOwnPropertyNames()`



- **从发送一个url地址到返回页面，中间发生了什么**  
（没写全，还有HTTPS一类的）
    - 如果没有CDN
        - 浏览器要将域名解析为 IP 地址，所以需要向本地 DNS 发出请求。
        - 本地 DNS 依次向根服务器、顶级域名服务器、权限服务器发出请求，得到网站服务器的 IP 地址。
        - 本地 DNS 将 IP 地址发回给浏览器，浏览器向网站服务器 IP 地址发出请求并得到资源。
    - 有CDN  
    见性能优化-CDN相关

## 性能优化处理
[原址-谭光志](https://zhuanlan.zhihu.com/p/121056616)
- 减少HTTP请求
- CDN
    - 内容分发网络（CDN）是一组分布在多个不同地理位置的 Web 服务器。
    - 当服务器离用户越远时，延迟越高。
    - CDN 就是为了解决这一问题，在多个位置部署服务器，让用户离服务器更近，从而缩短请求时间
- 将 CSS 放在文件头部（防止页面空白），JavaScript 文件放在底部（防止堵塞）
- 使用字体图标 iconfont 代替图片图标
- 压缩文件
     - webpack 可以使用如下插件进行压缩：
        - JavaScript：UglifyPlugin
        - CSS ：MiniCssExtractPlugin
        - HTML：HtmlWebpackPlugin
- 图片优化
    - 延迟加载/懒加载
    - 响应式（浏览器能够根据屏幕大小自动加载合适的图片）
- 多用CSS3代替图片
- 减少DOM操作（事件委托）
- switch代替if-else


## ES6问题

- **箭头函数中的this指向谁？**  
    - 是**定义/生效时**所在的对象，而**不是使用/运行时**所用的对象
    - `箭头函数`让`this`指向**固化**,即它的this对象的指向是**不可变**的
    - 根本原因是：箭头函数没有自己的this，所以只能从外层找。由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值。
    - 所以对于箭头函数， call() / apply() / bind() 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
    - `普通函数`可以用bind()/call()改变this的指向。
    - 普通函数的this指向**调用**对象，没有的或者全局就指向window（严格模式是undefined)

- **如何实现一个promise？**  
    - Base
    ``` js
    let promise = new Promise(function(resolve,reject){
        // resolve和reject只会执行一个

        if(...){
            resolve(value)
        }else{
            reject(error)
        }
    })

    //----- then 是 promise实例状态改变时的回调函数，返回的也是一个promise
    promise.then(function(value){
        // 携带的参数是从resolve里得到的
    },
    function(error){
        // 携带的参数是从reject里得到的
    }).catch(error=>{
        // reject后的东西，一定会进入then中的第二个回调，
        //如果then中没有写第二个回调，则进入catch
        //如果没有then， 也可以直接进入catch
        // resolve不会进入catch
    })

    ```

- **promise的原理，以及它的两个参数是什么？**  
    - 是一个容器，里面保存着某个**未来才会结束**的事件，一旦新建就会**立即执行**
    - 两个参数是`resolve`和`reject`
    - 三个状态是：`Peding`/`Fulfiled`/`Rejected`
    - 原理
        - 设计模式中的`观察者模式`
        - 通过`Promise.prototype.then`和`Promise.prototype.catch`方法将观察者方法注册到被观察者Promise对象中，同时返回一个新的Promise对象，以便可以`链式调用`。
        - 被观察者管理内部pending、fulfilled和rejected的状态转变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。

- **promise中第二个参数的reject中执行的方法和promise.catch()都是失败执行的，分别这么写有什么区别，什么情况下会两个都同时用到？**  
``` js
//----- then 是 promise实例状态改变时的回调函数，返回的也是一个promise
    promise.then(function(value){
        // 携带的参数是从resolve里得到的
    },
    function(error){
        // 携带的参数是从reject里得到的
    }).catch(error=>{
        // reject后的东西，一定会进入then中的第二个回调，
        //如果then中没有写第二个回调，则进入catch
        //如果没有then， 也可以直接进入catch
        // resolve不会进入catch
    })
```
- map和set有没有用过?
    - `SET` 
        - 类似数组，但是成员的**值是唯一**的
        - 内部不会发生类型转换，所以是`===`
        - 内部NaN===NaN=> true
        - 内部对象总是不相等的
        - `WeakSet`的成员只能是对象
    - `MAP`
        - Hash键值k-v对集合
        - **键**可以是各种类型（Object的key是只能用字符串）
        - 只有对同一个对象的**引用**才是同一个键,因为绑定的是内存地址
        - 内部NaN===NaN=> true
        - 内部不会发生类型转换，所以是`===`，严格相等会视为同一个键
        ``` js
        map.set(['a'],a);
        map.get(['a']);// undefined

        const k1 = ['k'];
        map.set(k1,'k');
        map.get(k1); // k

        // 转化为数组的方法
        [...map] // [ [ ['a'],a ],[ ['k'],k ] ] 
        ```
        - `WeakMap`的**键名**只能是对象，键名是弱引用，不用手动删除对象，场景用于键所对应的对象可能再将来消失。

- **map数据结构有什么优点？**  
    -额，比较灵活吧

- **如何实现一个数组去重？**  
    - 用set
    ``` js
    [...new Set(array)]

    ```
    - filter+indexOf
    ``` js
    arr.filter((item, index)=> {
        return arr.indexOf(item) === index
    })
    ``` 
    - sort() + 比较相邻的数字

## HTML类的问题
- iframe的缺点有哪些？
    - 混乱的滚动条
    - 不利于搜索引擎爬虫的优化
    - 兼容很差，后退无效，增加http请求
    - 不推荐用了除非单页吧

- Html5新特性
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
