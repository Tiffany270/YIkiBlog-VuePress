# webpack源码 Tree Shaking 
- Tree Shaking 是一种通过消除最终文件中未使用的代码来优化体积的方法。
- 在 ES6 中，引入了模块的新语法，这是 static 的。使用import语法，我们不再能够动态导入模块。
``` js
//不被允许！！！！
if (condition) {
    import foo from "foo";
} else {
    import bar from "bar";
}
```
-