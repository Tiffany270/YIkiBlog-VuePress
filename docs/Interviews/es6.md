# ES6问题

## 箭头函数中的this 
- 根本原因是：箭头函数没有自己的 `this` ，所以只能从外层找。
- 由于箭头函数不绑定 `this`，它会捕获其所在（即定义的位置）上下文的`this`值， 作为自己的`this`值。
- `箭头函数`让`this`指向固化,即它的this对象的指向是不可变的
- 所以对于箭头函数， `call() / apply() / bind()` 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
- 普通函数的this
    - `普通函数`可以用`bind()/call()`改变this的指向。
    - `普通函数`的`this`指向调用对象，没有的或者全局就指向`window`（严格模式是undefined)

## 如何实现一个promise  
- Basics
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

## es5实现promise
- then+链式调用，推入队列等待延迟（settimeout)
``` js
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    if(this.state === 'fulfilled'){
        onFulfilled(this.value)
    }
    if(this.state === 'rejected'){
        onRejected(this.reason)
    }
};
```

## promise的原理，以及它的两个参数 
- 是一个容器，里面保存着某个未来才会结束的事件，一旦新建就会立即执行
- 两个参数是`resolve`和`reject`
- 三个状态是：`Peding`/`Fulfiled`/`Rejected`
- 原理
    - 设计模式中的`观察者模式`
    - 通过`Promise.prototype.then`和`Promise.prototype.catch`方法将观察者方法注册到被观察者Promise对象中，同时返回一个新的Promise对象，以便可以`链式调用`。
    - 被观察者管理内部pending、fulfilled和rejected的状态转变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。
- Promise中第二个参数的`reject`中执行的方法和`promise.catch()`都是失败执行的，分别这么写有什么区别，什么情况下会两个都同时用到？  
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

## Promise.all/race
### all
- 把多个Promise包装成一个新的Promise实例
``` js
let p = Promise.all([p1,p2,p3])
```
- 只有p1 p2 p3都fullfilled(成功），p才fullfilled
- 有一个reject，p直接reject

### race
- 把多个Promise包装成一个新的Promise实例
``` js
let p = Promise.race([p1,p2,p3])
```
- p1 p2 p3 哪个变 p会跟着变

## map和set?
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

- map数据结构有什么优点?  
    - 额，比较灵活吧

## 继承
- `class` + `extends` 
``` js
class point{..}
class colorpoint extends point {
    constructor (x){
        super(x) // 得到父类的this
    }
}
```
- `es6`的继承机制实质是先创建父类的实例对象`this`,再用子类构造函数修改this
- `prototype` 和 `_proto_`
    - `_proto_`表示构造函数的继承，指向父类
    - `prototype`的`_proto_`表示方法的继承,指向父类的`prototype`
``` js
class a{
    ...
}
class b extend a {
    ..
}

b._proto_ === a
b.prototype._proto_===a.prototype
```
- 其他：`es5` 里用`call/apply`借用别的构造函数

## const let var
- `const`
    - 声明一个不可改变的常量
    - 一旦声明，必须立刻初始化
    - 仍有块级作用域
    - 实质上是变量指向的内存地址不得改变，所以对于声明对象是可以成功的
    - 但是这个变量改变指向会报错
- `let` 和 `var`
    - `let` 只在命令所在的块级代码块有效
    - `let` 不允许在相同作用域里面重复声明同一个变量
    - `var` 会发生变量提升，变量可以在声明之前使用，值为`undefined`

## await 和 async写一个睡眠函数
``` js
function sleep (time){
    return new promise((resolve,reject)=>{
        settimeout(()=>resolve('over'),time)
    })

}
async function run(time){
    let res = await sleep(time);
}
```

## await和async原理
- 用于异步 async 返回一个promise
- 常用try/catch捕捉异常
- await等待右边promise返回

## obj.seal和freeze
- seal不能添加新属性和方法
- freeze对象变不可写
