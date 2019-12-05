# JS高程笔记

## 第6章面向对象的程序设计

sth about obj ...

``` js
let persion = {
    name:'yiki',
    str:'i am a obj'};

```

-  属性类型
    - 数据属性
    1. JS不能直接访问，你打印也打印不出来的，它们是内部才用的特性，规范把他们放入`两对方括号中`，如：`[[Enumerable]]`
    2. 修改它们需要用到`Object.defineProperty(obj,name,desobj)`

    - 访问器属性