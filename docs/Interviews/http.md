# 网络相关
## HTTP/HTTPS
 - 超文本传输协议`HTTP`
    - 明文传输
    - 端口为80
    - 是无状态的
- HTTP+SSL = `HTTPS`
    - 对传输数据加密
    - 端口为443
    - 证书、公钥、密钥
    - 费时、证书要钱
## 请求方式
- `head`：类似于get请求，只不过返回的响应中没有具体的内容，用户获取报头
- `options`：允许客户端查看服务器的性能，比如说服务器支持的请求方式等等。
- `fetch`
    - 第一次是option 询问是否支持修改
    - 第二次是真正的请求
    
## 状态码
- `204` no content,请求成功但是没有更新的内容
- `301` 永久重定向 保存书签了的url已经更新了，提醒客户端也要更新下
- `302` 临时重定向 保存书签的url临时改变
- `303` 提醒你应该用get
- `304` 请求的内容服务器无更新
- `400` 请求无效
- `401` 需要认证
- `403` 服务端已收到但是拒绝执行
- `404` not found
- `500` 服务器内部错误
- `502` Bad Gateway无效的响应
- `505` 服务器不支持请求的HTTP协议的版本，无法完成处理

## 关于304状态码
- 页面内容更新周期长甚至不更新
- cdn缓存未更新

## http缓存相关
- 请求头/meta标签
### 请求相关头部
- `cache-control`
    - `no-cache` 强制再次认证，不是不缓存的意思
    - `no-store` 不缓存
    - `max-age = 秒` 在xx时间内再次发起请求会用缓存
- `if-match` - `etag`(响应)
- `if-modified-since`（客户端） = time 之后更新 -- `last-modified`(服务端/客户端)
-  `expires`（服务端/客户端） 存在时差问题
### 强缓存
- 状态码更为灰色代表使用了强制缓存
    - `from memory cache` 内存
    - `from disk cache` 硬盘
- `cache-control` > `expires`（实体首部）
### 协商缓存
- 由服务器决定是否使用缓存
- 失效 - 重新请求结果
- 生效 - 304
- `etag/if-none-match` > `last-modifyed/if-modified-since`



## TCP/UDP
### TCP
- 三次握手 建立连接
    - client -- syn     ->  server
    - client -- <-syn+ask-  server
    - client -- ask     ->  server
- 四次挥手关闭连接
    - client --    fin ->  server
    - client -- <- ask  -  server
    - 还能继续传输数据
    - client -- <- fin  -  server
    - client -- - ask  ->  server
- 供可靠的服务
- `UDP`
    - 尽最大努力交付

## HTTP1和HTTP2区别

## HTTP和HTTPS的区别  
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

## https加密方式
- 对称加密
- 非对称加密
  - 公钥
  - 私钥
- 数字证书

## WebSocket

## url地址到返回页面中间发生了什么 
- 如果没有CDN
    - 浏览器要将域名解析为 IP 地址，所以需要向本地 DNS 发出请求。
    - 本地 DNS 依次向根服务器、顶级域名服务器、权限服务器发出请求，得到网站服务器的 IP 地址。
    - 本地 DNS 将 IP 地址发回给浏览器，浏览器向网站服务器 IP 地址发出请求并得到资源。
- 有CDN  
见性能优化-CDN相关

## axios
```js
axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
```