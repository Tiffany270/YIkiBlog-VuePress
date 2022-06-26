# 跨域相关  
- 跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了
- 主进程检查跨域，如果没有cors响应头，就将响应题全部丢掉，并不会给渲染进程


## oringin
- 请求时：浏览器自动在请求头当中添加`origin`字段，标明源
- 响应时：服务器添加 `Access-Control-Allow-Origin` 告诉浏览器该不该拦截

## 什么是同源策略
    - 同域名，同协议，同端口

## 处理跨域的方式
- 通过jsonp跨域（缺点：只能实现get一种请求）
  - 利用了 `<script>` 标签的 src 属性没有跨域限制的漏洞
  - 本质
  ```  
  <script src='https://xxx.xxx.xx?key=value&callback=xxx'><script>
  ```
- 跨域资源共享（CORS）
  - 额外的 HTTP 头来告诉浏览器，让运行在某一个 origin 上的 Web 应用允许访问来自不同源服务器上的指定的资源。
  - 需要浏览器和服务器同时支持
  - `Access-Control-Allow-Origin`
  - will send `OPTION` first to ask server
- `vue proxy`代理
  - 模拟一个虚拟服务器代发请求
- document.domain + 通过 iframe 嵌入跨域的页面
  - document.domain + iframe跨域（此方案仅限主域相同，子域不同的跨域应用场景）
  - location.hash + iframe
  - window.name + iframe跨域
``` js
document.domain = 'test.com' // 设置 domain 相同
// 通过 iframe 嵌入跨域的页面
const iframe = document.createElement('iframe')
iframe.setAttribute('src', 'b.test.com/xxx.html')
iframe.onload = function() {
// 拿到 iframe 实例后就可以直接访问 iframe 中的数据
console.log(iframe.contentWindow.xxx)
}
document.appendChild(iframe)

```
- postMessage跨域
    - window.postMessage(message, origin, [transfer])
- nginx代理跨域
- nodejs中间件代理跨域
- WebSocket协议跨域
    - 建立连接之后，server 与 client 都能主动向对方发送或接收数据。

## Ajax的原生写法为什么会有同源策略？
- ajax原生写法
``` js
var xhr = new XMLHttpRequest(); //1.创建 XHR 对象
xhr.onreadystatechange = handleResponse;
xhr.open("get", "example.txt", true);
xhr.send(null);

var handleResponse = function(){//2.写一个回调处理函数
    if (xhr.readyState == 4){
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            alert(xhr.responseText);//当收到服务器的响应后，响应的数据会自动填充 XHR 对象的属性
        } else {
            alert("Request was unsuccessful: " + xhr.status);
        }
    }
};
```
- xmlhttprequest就是浏览器的异步行为，浏览器不允许跨域

## 前端安全 
- XSS（Cross-Site Scripting，跨站点脚本）
    - XSS 全称“跨站脚本”，是注入攻击的一种。其特点是不对服务器端造成任何伤害，而是通过一些正常的站内交互途径，例如发布评论，提交含有 JavaScript 的内容文本。这时服务器端如果没有过滤或转义掉这些脚本，作为内容发布到了页面上，其他用户访问这个页面的时候就会运行这些脚本。
- CSRF（Cross-Site Request Forgery，跨站点请求伪造）
    - CSRF 顾名思义，是伪造请求，冒充用户在站内的正常操作。我们知道，绝大多数网站是通过 cookie 等方式辨识用户身份（包括使用服务器端 Session 的网站，因为 Session ID 也是大多保存在 cookie 里面的），再予以授权的。所以要伪造用户的正常操作，最好的方法是通过 XSS 或链接欺骗等途径，让用户在本机（即拥有身份 cookie 的浏览器端）发起用户所不知道的请求。


