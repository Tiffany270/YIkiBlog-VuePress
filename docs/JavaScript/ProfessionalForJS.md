# JS高程笔记

## 第六章面向对象的程序设计-上

sth about obj ...

``` js
let persion = {
    name:'yiki',
    str:'i am a obj'};

```

-  **属性类型**
    - 数据属性
    1. JS不能直接访问，你打印也打印不出来的，它们是内部才用的特性，规范把他们放入`两对方括号中`，如：`[[Enumerable]]`
    2. 修改它们需要用到`Object.defineProperty(obj,name,desobj)`
    3. 数据属性包含一个**数据值的位置**，在这个位置可以读取和写入值
    4. `[[Configurable]]=true` 能否修改属性的特性(即变为不可配置，例如不能从对象中删除属性)
    5. `[[Eumerable]]=true` 能否通过for-in循环返回属性
    6. `[[Writable]]=true` 能否修改属性的值
    7. `[[Value]]=undefine` 包含这个属性的**数组值** 
    8. Example
    ``` js
    let person = {
        name: 'yiki'  // [[Value]]='yiki'
    }

    // if u wanna change it's characterstic
    Object.defineProperty(person,'name',{
        writable: false,  // [[Writable]] = false
        value: 'tiffany'  // [[Value]]='tiffany'
    })

    //then this obj's name is unchangeable, because it's writable is false
    person.name= 'change'
    console.log(person.name);// tiffany

    
    ```


    - 访问器属性
    1. 此属性`不包含数据值`
    1. 它包含一对`getter/setter`
    1. `[[Configurable]]`
    1. `[[Enumberable]]`
    1. `[[Get]]=undefined`,读取属性是调用的函数
    1. `[[Set]]=undefined`,写入属性时调用的函数
    1. 访问器不能直接定义，必须用到`Object.defineProperty(obj,name,desobj)`
    1. 使用访问器属性的常见方法为设置一个属性的值会**导致其他属性发生变化**
    1. Example
    ``` js

    let book = {
        _year: 2004, //表示只能通过对象方法访问的属性
        edition: 1
    }

    Object.defineProperty(book, 'year',{
        get: function(){
            return this._year
        },
        set: function(newvalue){
            if(newvalue > 2004){
                this._year = newvalue
                this.edtion + = newvalue - 2004;
            }
        }
    })

    //book.year = 2005
    //book.edition = 2


    ```
    - some API
    1. `Object.defineProperties(obj,{...},{...},...)`为对象 定义多个对象
    2. `Object.getOwnPropertyDescriptor(obj,proname)`取得给定属性的描述符，返回一个对象
    ``` js 
    let name = {_year:{value:111}}; Object.getOwnPropertyDescriptor(name,'_year')
    
    //return: 
    {writable: true, 
    enumerable: true, 
    configurable: true,
    value: {value: 111}}
    ```
    3. `Object.getPrototypeOf()` 取得一个对象的原型
    4. `hasOwnProperty(name)` 检测给定属性在对象实例中才会返回true,在原型中返回false
    5. `Object.keys()` 取得对象所有可枚举的**实例**属性
    6. `Object.getOwnPropertyNames`,得到所有实例属性，不管是否可枚举

- **模式**

    - 先做个**小结**
        - 工厂模式
        - 构造函数模式
        - 原型模式
        - 组合原型模式和构造函数模式
        - 动态原型模式
        - 寄生构造函数模式
        - 稳妥构造函数模式 
          
    - some **point** u need to know
   
        - 原型模式相关：
        1. 每当代码读取某个对象的某个属性时，会执行一次搜索，目标是具有给定名字的属性。搜索首先从对象实例本身开始。如果实例中找到了具有给定名字的属性，则返回该属性的值；如果没有找到则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。如果在原型对象中找到了这个属性，则返回该属性的值。 
        1. 如果在实例中添加一个属性，该属性和实例原型中的一个属性同名，那将会在实例中创建该属性，并屏蔽原型中的那个。
        1. 当调用某个p1.sayName()时，是搜索**2次**
        1. `in` 会在通过对象能够访问属性时返回true，不管是实例还是原型
        1. `for-in`返回所有通过对象访问的、可枚举的属性，包括实例的和原型的属性，屏蔽不可枚举属性（如enumerable=false的属性）


    - **工厂模式**

    用函数封装以特定接口创建对象的细节,能根据参数来构建一个包含所有必要信息的对象。  
    缺点：没有解决对象识别的问题
    ``` js

    function createPerson(name, age, job){
        let o = new Object();
        o.name = name;
        //....

        retrun o;

    }

    // use this
    let p1 = createPerson('yiki', 18, 'software engineer');

    ```

    - **构造函数模式**

    没有显示地创建对象，直接将属性和方法赋给this, 没有return。创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型  
    缺点：每个方法都要在每个实例上重新创建一遍,会导致不同的作用域链和标识符解析

    ``` js
    function Person(name, age, job){
        this.name = name;
        this.age = age;
        //...
        this.sayName = function(){
            console.log(this.name);
        }
        // 与声明函数在逻辑上时等价的
        this.sayName = new Function({...});
    }

    //use this, u must be 'new' it
    let p1 = new Person('yiki', 18, 'software engineer');

    // instanceof
    p1 instanceof Object //true
    p1 instanceof Person //true


    ```

    - **原型模式**

    每个函数都有一个prototype属性，此属性是一个指针，指向一个对象，而这个对象的用途时包含可以由特定类型的所有实例`共享的属性和方法`  
    好处：让所有对象实例共享它包含的属性和方法，不必再构造函数中定义对象实例的信息，而是将这些信息`直接添加`到原型对象中 
    这里有一个重要的属性`[[Prototype]]`,在浏览器显示为`__proto__`，这个是创建一个实例之后，这个实例内部包含的一个指针，它会指向构造函数的`原型对象`，这个连接存在于实例和构造函数的原型对象之间  
    缺点：对于包含引用类型值的属性来说不是很友好

    ``` js 

    /** 构造函数为空函数
    所有原型对象都会自动获得一个constructor属性，
    这个属性是一个指向prototype属性所在函数的指针
    **/
    function Person(){}
    
    Person.prototype.name = 'yiki';
    Person.prototype.name = 18;
    Person.prototype.sayName = function(){
        alert(this.name);
    };
    //...

    //use it
    let p1 = new Person();
    p1.sayName();// yiki
    let p2= new Person();
    console.log(p1.sayName() === p2.sayName()); // true


    // ----- More common way,
    //but this way can't through 'constructor' to identify object type
    Person.prootype = {
        name: 'yiki',
        age : 18,
        //... 
        //so if u think 'constructor' is more important
        constuctor: Person
    }

    // if missing propotype of 'constuctor'
    let f = new Person();
    f.constructor === Person //false

    ```

    - **组合构造函数模式和原型模式**
    每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存  
    次模式是ES里使用最广泛、认同度最高的一种创建自定义类型的方法

    ``` js

    function Person(name, age, job){
        this.name = name;
        //...
    }

    Person.prototype = {
        constructor: Person,
        sayName : function(){ 
            //... 
        }
    }

    ```

    - **动态原型模式**
    它把所有信息都封装在构造函数中，而通过在构造函数中初始化原型，保持了同事使用构造函数和原型的优点
    
    ``` js

    function Person(name, age, job){
        this.name = name;
        this.age = age;
        //... 属性

        if(typeof this.sayName !== 'function'){
            // add to prototype
        }
    }



    ```

    - **寄生构造函数模式**
    创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象，除了new 操作符，其实和工厂模式一样。

    ``` js

    function Person(name, age, obj){
        let o =  new Object();
        o.age = name;
        //... 
        o.sayName = function(){
            // ...
        }

        return o; 

    }

    // when u use it
    let friend  = new Person('yiki', 18,'worker');

    ```

    - **稳妥构造函数模式**
    Durable objects 指的是没有公共属性，而且其方法不引用this的对象，稳妥构造函数模式新创建对象的实例方法不引用this,也不使用new操作符  
    此模式适合在一些安全环境或防止数据被其他应用程序改动时使用
    
    
    ``` js
    function Person(name, age, obj){
        let o =  new Object();
        o.sayName = function(){
            // ...
        }

        retrun o;
    }
    // when u use it
    let friend  =  Person('yiki', 18,'worker');


    ```

## 第六章面向对象的程序设计-下

sth still... about OO ... we call '继承'

- **先来小结**
  - 原型链
  - 借用构造函数
  - 组合继承
  - 原型式继承
  - 寄生式继承
  - 寄生组合式继承  


 - **原型链**  
 其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法，层层递进，就构成了实例与原型的链条

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

 - **借用构造函数**  
 this can explain that what is `xx.call(this)` which u can find it in some situation  
 在子类构造函数的内部调用超类型构造函数
 ``` js
 function SuperType(){
     this.colors = ['red', 'blue', 'black'];

 }
 
 function SubType(){
     SuperType.call(this)
 }

 function Father(){
     this.colors = ['red','blue','black'];
 }

 function Kid(){}

 Kid.prototype = new Father();

 let child1 = new Kid();
 child1.colos.push('white');// colors.len = 4;

 let child2 = new Kid();
 // colors.len = 3

 // colors没有被共享



 // 传递参数的版本

 function SuperType(name){
     this.name = name;

 }
 
 function SubType(){
     SuperType.call(this,'pram');//可以允许传递参数
 }

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


 - **原型式继承**

 ``` js
 function object(o){ // 传入一个对象 浅复制
     function F(){}; // 创建一个临时性的构造函数
     F.prototype = o; // 将传入的对象作为这个构造函数原型
     return new F(); // 返回这个临时类型的新实例
 }


 ```

 ES5新增`Object.creatr()`方法规范这个原型式继承，
 
 ``` js
 let person = Object.create(person,{ // 如果只有一个参数===object()
     name:{
         value: 'yiki'
     }
 })

 ```


 - **寄生式继承**  
创建一个仅用于封装过程的函数，该函数在内部以某种方式来增强对象，然后再像真的是它做了所有工作一样返回对象

``` js
function create(origin){
    let clone  =  objcet(origin); // 通过调用函数创建一个新对象
    clone.sayHi = function(){ // 以某种方式来增强这个对象
        // do sth...
    }
    retrun clone;
}

```



 - **寄生组合式继承**  
 即通过借用构造函数来继承属性，通过原型链的混合形式来继承方法，不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非是超类型原型的一个副本而已。
 ``` js
 function inheritPor(Father,Kid){
     let prototype = objcet (Father.prototype);     //create obj
     prototype.constructor = Kid;                   // inhance obj
     ked.prototype = prototype;                     //aim for obj
 }

 ```



## 第二十章JSON

sth about json like this

``` js

{"cityCode":"101280101","cityStr":"广州"}

```

- **Base**  
    - 支持所有类型，除了`undefine`
    - 是一个键值对,无声明变量的概念
    - 属性名是一定要加双引号的

- **解析与序列化**  
    - `stringify()`把JS对象序列化为JSON字符串
    - `parse()` 把JSON字符串解析为原生JS值


## 第二十一章Ajax

- **小结**
    - Asynchronous JavaScript + xml
    - 核心为XHLHttpRequest对象(XHR)。该对象能以异步的方式从服务器取得更多信息
 
- **XHR**  
    - `responstText` 返回的文本
    - `responseXML` 保存着响应数据的XML DOM文档
    - `status` HTTP状态
    - `statusText` HTTP状态的说明
    - `timeout` 请求在等待响应多少ms后就终止
    - `ontimeout` 规定时间无响应会触发`timeout`事件进而调用此事件处理程序
    - `readyState` 请求/响应过程的当前活动阶段
        - 0 : 未初始化，未调用open()
        - 1 : 启动，已调用open()未调用send()
        - 2 : 发送，已调用send()未收到响应
        - 3 ：接收，接收部分数据
        - 4 ：接收，接收全部数据
    - `readyStatechange事件` 每次readyState改变会触发
    - `onreadystatechage` 在调用open()之前指定该事件才能确保跨浏览器的兼容性
``` js

let xhr = createXHR();
xhr.onreadystatechage = function(){
    if((xhr.status >= 200) && (xhr.status< 300 >)){
        console.log(xhr.responseText);
    }else{
        console.log('request was unsuccessful');
    }
}

// requesttype / url / if asyc
xhr.open('get','url',false);
xhr.send(null);// data?data:null

//if cancal
xhr.abort();

```

- **XHR2.0**
    - FormData 表单数据序列化
    ``` js
    let data = new FormData();
    data.append('name','yiki');
    xhr.send(data);

    ```
    - `overrideMimeType()` 用于重写XHR响应的MIME类型
    - load事件 响应接收完毕会触发此事件
    ``` js
    xhr.onload = function(){
        //...
    }

    ```
    - process事件，回在浏览器接收新数据期间周期性地触发
    ``` js
    xhr.onprocess = function(event){
        if(even.lengthComputable){//表示进度信息是否可用，布尔
            //... event.totalSize/positon

        } 

    }

    ```

- **Comet**  
是一种服务器向页面推送数据地技术(比如处理比赛分数和股票报价)
    - 传统轮询(不算comet) : 浏览器定时向服务器发送请求
    - 长轮询 ：页面发起一个请求，服务器一直保持连接打开，直到有数据儿科发送。发送完数据后浏览器关闭连接然后又再发送一个新请求
    - HTTP流 ：页面的整个生命周期内只使用一个Http连接。浏览器向服务器发送一个请求而服务器保持**连续** 打开，周期性地向浏览器发送数据



## 第二十二章高级技巧

- **安全的类型检测**
利用`toString()`方法，可以避免某些`typeof`或者`instanceof`无法判断或混乱的类型检测  
由于原生数组的构造函数名和全局作用域无关，因此使用toString能保证返回一致的值

``` js

function isArray(value){
    return Objcet.prototype.toString.call(value) === '[object Array]'
}

function isFucntion(value){
    return Objcet.prototype.toString.call(value) === '[object Function]'
}

function isRegExg(value){
    return Objcet.prototype.toString.call(value) === '[object RegExp]'
}

```

- **作用域安全的构造函数**  
在忘记/不用new的情况下，误将this绑定在window上会导致错误对象属性的意外增加，所以  
在进行任何更改前，首先确认this对象是正确的类型的实例，如果不是，那么会创建新的实例并返回
``` js

function Person(name, age, job){
    if(this instanceof Person){
        this.name = name;
        // ...
    }else{
        return new Person(name, age, job);
    }
}


```
用构造函数窃取结合使用原型链或者寄生组合（其实我也不懂什么意思）来解决继承被破坏(?)
``` js
function Polygon(sides){
    if (this instanceof Polygon) {
        this.sides = sides;
        this.getArea = function(){
            return 0;
        };
    } else{
        return new Polygon(sides);
    }
}

function Rectangle(width, height){
    Polygon.call(this, 2);
    this.width = width;
    this.height = height;
    this.getArea = function(){
        return this.width * this.height;
    }
}

Rectangle.prototype = new Polygon();// point!

let rect  = new Rectangel(5, 10);
console.log(rect.sides);// 2


```

- **惰性载入函数**  
表示函数分支只执行一次。(这部分没看懂，和XHR有关吗？)  
方法:
    - 在函数被调用时再处理函数
    - 在声明函数时就指定适当的函数

- **函数绑定**  
    - 关于函数`bind()`相关
    - 函数绑定药创建一个函数，可以在特定this环境中以指定参数调用另一个函数，该技巧常常和`回调函数`和`事件处理程序`一起使用，以便将函数作为变量传递的同时保持代码的执行能力  
    - 只要是将某个函数指针以值得形式进行传递，同时该函数在特定环境中执行，被绑定函数得效果就突显出来。  
    - 它们主要用于事件处理以及`setTimeOut()`和`setInterval()`
    - 绑定函数比普通函数有更多的开销

``` js

let handler = {
    message: 'event type',

    handleClick: function(event){
        console.log(this.message,event.type);
    }
}

let btn = document.getElementById('BTN');
EventUtil.addHandler(btn,'click',handler.handleClick);//unuseful

// add a closure to solve this problem, 
// but this way will probably case your code hard to debug and understand
EventUtil.addHandler(btn,'click',function(event){
    handler.handleClick(event);
});//working

// use a function from JS call bind(), bind() creats a closure
function bind(fn, context){
    return function(){
        return fn.apply(context, arguments);
    }
}
//ues it
EventUtil.addHandler(btn,'click', bind(hander.handleClick,handler));

// in ES5, there aready have a bind() function that u can use it easily
EventUtil.addHandler(btn,'click', hander.handleClick.bind(handler));


```

- **函数柯里化**  
实质:柯里化是指这样一个函数(假设叫做createCurry)，他接收函数A作为参数，运行后能够返回一个新的函数。并且这个新的函数能够处理函数A的剩余参数

``` js
//ES5里,bind()实现了柯里化

EventUtil.addHandler(btn,'click', hander.handleClick.bind(handler),'mybtn');

```

- **防篡改对象**
    - 不可扩展对象：`Objcect.preventExtensions()`使不能再给对象添加属性和方法
    - 密封的对象：`Object.seal()`
    - 冻结的对象：`Object.freeze()`

- **Yielding Processes**  
和JS线程相关，当你发现某个循环占用了大量时间（满足同步，按顺序），可以使用定时器分割这个循环，叫`数组分块`
思路：为要处理的项目创建一个队列，然后使用定时器取出下一个要处理的项目进行处理，接着再设置另一个定时器。

``` js
function chunk(array, process, context){// arr fn this
 setTimeout(function(){
     let item =  arr.shift();
     process.call(context, item);
     
     if(array.length > 0){
         setTimeout(arguments.callee, 100);
        //callee返回正在执行的函数本身的引用。
        //callee是arguments的一个属性，
        //这个属性是一个指针，指向这个拥有arguments对象的函数
     }
 },100)

}

let data = [....];//略
function priintValue(item){
    console.log(item+'yiki');
}

chunk(data,printValue); 


```

- **函数节流**  
某些代码不可以再没有间断的情况连续重复执行。节流在`resize`事件中比较常见

``` js
function throttle(method, context){//fn,this
    clearTime(method.tId);// 定时器的ID是存储在tId中的
    method.tId =  setTimeout(fucntion(){
        method.call(context);// call确保方法在适当的环境中执行
    },100);
}

//example
function resizeDiv(){
    //do sth
}

window.onresize =  function(){
    throttle(resizeDiv);
}

```










