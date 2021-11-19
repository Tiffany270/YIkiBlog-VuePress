# js相关
::: tip :)
Standing on shoulders of Giants 
:::


## Array
```
`toString()`and `toLocaleString()`  
对数组来说没什么不同，对调用数组元素里各自的方法，tosring 就调用子的tostring
`pop()` and `push` 
`shift()` and `unshift()`从头部移除一项/从尾部移除一项
`reverse()` and `sort()`  sort的复杂度是根据浏览器而言的，一般是快排
`concat()` 创建副本 参数放入尾部
`slice()` 起始-结束 副本 不影响原数组
`splice()` 
1. 2个参数=删除
2. n个参数 = 删除后插入n
3. 替换同上，改变parm1 and parm2  
`indexOf()` `lastIndexOf()`
`find()` `findIndex() ` es6的方法
以下都要给定函数
`some()` 任意true = true
`map()` 
`forEach()` 
`filter()` 
`every()` 每一项true = true
reduce() reduceRight() 递归自动叠加
Array.from() 将一个类数组对象或者可遍历对象转换成一个真正的数组。
```

## js去重
- es6 set
``` js
function func(arr){
    return Array.from(new Set(arr))
}
```
- new set
``` js
[...new Set(arr)]
```
- for for splice
``` js
func(arr){
for(i=0;..){
    for(j=i+1;..){
        if(arr[i]==arr[j]){
            arr.splice(j,1);
            j--;
        }

    }
}
}
```
- 新建一个数组push + indexOf
``` js
func(arr){
    const res = [];
    for(i=0;..){
    if(arr.indexof(arr[i])){
        res.push(arr[i])
    }

    }
    return res;
}
```
- includes 同理 
- sort() + 相邻对比
```js
func(arr){
    arr = arr.sort();
    const res = [];
    for(i=0;..){
        if(arr[i]!==arr[i-1]){
            res.push(arr[i]);
        }
    }
    return res;

}
```
- filter
``` js
return arr.filter((item,index,arr)=>{
return arr.indexof(item,0)===index;
})
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
## 执行环境和作用域
- 每个函数都有自己的执行环境。执行流进入函数->函数环境推入栈->栈将其弹出->控制权返回
- 代码在一个环境重执行会创建变量对象的`作用域链`
- 作用域链保证执行环境有权访问所有变量和函数的有序访问
- 全局变量始终是作用域链中**最后**一个对象
- 内部环境能通过作用域链访问所有外部环境，反之不行。(任何环境可以**向下** 搜索作用域而进入另一个执行环境)
- JS**不存在**块级作用域
- Q:怎么延长作用域链?
A：在作用域前端临时增加一个变量对象
- Q:怎么让页面获得更好的性能？
A：解除引用——将不再用到的数据（大部分全局变量和对象的属性）设置为`null`

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

## 原型链
- 默认的原型
    - 其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法，层层递进，就构成了实例与原型的链条
    - 所有引用类型都默认继承了`Object`,因此默认原型都会包含一个内部指针，指向`Objcet.prototype`
    - `__proto__`/`prototype `
    - OO语言有接口继承和实现继承，但是ES只能支持`实现继承`，这个就是靠原型链来实现的。
    - 基本思想：利用`原型`让一个引用类型`继承`另一个引用类型的属性和方法
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
 // here are some problems such as ...
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
 - **构造函数继承** 
    - `call`或者`apply`
    - this can explain that what is `xx.call(this)` which u can find it in some situations    
    - 将父类的构造函数指向子类构造函数的`this`
``` js
function Father(){
    this.colors = ['red', 'blue', 'black'];
}
function Kid(){
    SuperType.call(this)
}

let child1 = new Kid();
child1.colors.push('white');// colors.len = 4;
let child2 = new Kid();
// child2.colors.len = 3
    
// 传递参数的版本
function SuperType(name){
    this.name = name;
}
function SubType(){
    SuperType.call(this,'pram');//可以允许传递参数
}
```

 - **原型式继承**
 ``` js
 function object(o){ // 传入一个对象 浅复制
     function F(){}; // 创建一个临时性的构造函数
     F.prototype = o; // 将传入的对象作为这个构造函数原型
     return new F(); // 返回这个临时类型的新实例
 }
 ```
 - ES5新增`Object.creatre()`方法规范这个原型式继承，
 ``` js
 let person = Object.create(person,{ // 如果只有一个参数===object()
     name:{
         value: 'yiki'
     }
 })
 ```
 - **组合继承**  
 又叫伪经典继承，指的是将原型链和借用构造函数组合一起，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性  
 缺点：无论在什么情况下，都会调用两次超类型构造函数
 ``` js
 function Father(name){
     this.name = name;
 }
 Father.prototype.sayName = function(){
     console.log(this.name);
 }
 function Kid(name, age){
     Father.call(this, name); // 缺点：第二次调用
 }
 //use it
 Kid.prototype = new Father();// 缺点：第一次调用
 Kid.prototype.constructor = Kid;
 Kid.prototype.sayAge = function()
{
    // ..
}
 ```
`
- es6 class 见es6部分
``` js
class person{
    ...
}
class father extends person {
    ...
}
let kid = new father();
```
- **手撕原型链原理**  
- `prototype`**构造器**原型， 是函数才有的，有很多继承来的方法
- 所有的函数都同时拥有__proto__和prototype属性 函数的`__proto__`**指向**自己的函数实现 函数的prototype是一个对象
- 所以函数的prototype也有__proto__ 和 一个`constructor`属性
- `__proto__`**指向**Object.prototype
- 所有的对象都拥有__proto__属性，它指向Object.prototype(Object是一个原生函数，所有的对象都是Object的实例)
```js
    let obj = {};
    console.log("obj:", obj);
    console.log("obj.prototype:", obj.prototype);
    console.log("obj.__proto__:", obj.__proto__);
    console.log("====================================");
    function myFunc() {}
    console.log("myFunc.prototype:",myFunc.prototype);
    console.log("myFunc.__proto__:",myFunc.__proto__);
    myFunc.prototype.__proto__ === Object.prototype  //true
```
- 你只要想一个对象调用一个东西，它自己没有，就会往上找，哪里找，从prototype里找
- OK之前
``` 
arr.valueOf() 做了什么?
arr 自身没有 valueOf，于是去 arr.__proto__ 上找
arr.__proto__ 只有 pop、push 也没有 valueOf，
于是去 arr.__proto__.__proto__ 上找
arr.__proto__.__proto__ 就是 window.Object.prototype
所以 arr.valueOf 
其实就是 window.Object.prototype.valueOf
arr.valueOf() 
等价于 arr.valueOf.call(arr)arr.valueOf.call(arr)
等价于 window.Object.prototype.valueOf.call(arr)

```
- OK
``` js
function instance_of(L, R) { // L即stu ；  R即Person

var O = R.prototype; // O为Person.prototype     
    L = L.__proto__;   //L为stu._proto_，现在指向的是per实例对象

    while (true) {   // 执行循环                   
    if (L === null)   //不通过                            
        return false;                    
    if (O === L)    //判断：   Person.prototype === stu._proto_ ？      
            return true;   //此时，stu._proto_ 指向per实例对象，并不满足
        L = L.__proto__;  //令L=  stu._proto_._proto_，执行循环

}                      //stu._proto_ ._proto_，看图示知：

}                        //指的就是Person.prototype，所以也返回true
```



## 两个对象是否相等
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

## about function
- chinese key words: `状态提升` `函数声明` `函数表达式`
- [参考](https://www.zhihu.com/question/47629500)  
what's different below :
``` js
function fn(){ ... }// 1 Function Declaration 

var fn = function(){ ... };// 2 "Anonymous" function Expression
```
- `Function Declaration`
  - A function declaration is a `declaration` ; it's not a `statement` or `expression` . As such, you don't follow it with a ; (although doing so is harmless)
  - A function declaration is processed when execution `enters` the context in which it appears, before any `step-by-step` code is executed
  - it's tricky to know what to do `when` they're in a control structure
``` js
x(); // Works even though it's above the declaration
function x() {
    console.log('x');
}
```
- `"Anonymous" function Expression`
  - the function is `assigned` a `name` if possible by inferring it from context
``` js
var y = function () {
    console.log('y');
};
```
- `Named function Expression`
``` js
var z = function w() {
    console.log('zw')
};
```

