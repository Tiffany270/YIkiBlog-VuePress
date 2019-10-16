# Publish/Subscribe

::: tip

比较少用,仅了解

:::

## case

``` bash

subscribe c1 c2 c3          ---订阅多个
publish c2 content          ---发布消息
                            （然后客户端会收到推送）
psubscribe new*             ---订阅多个
publish new1 content        ---收取消息

---demo

A:
127.0.0.1:6379> psubscribe new*
Reading messages... (press Ctrl-C to quit)
1) "psubscribe"
2) "new*"
3) (integer) 1
1) "pmessage"
2) "new*"
3) "new1"
4) "yiki"

B:
127.0.0.1:6379> publish new1 'yiki'
(integer) 1



```