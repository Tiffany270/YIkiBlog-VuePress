# JS高程笔记

## 第五章 引用类型

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


## 第八章 BOM

BOM means 'The Brower Object Model', which is a instance of brower. It's core obj is 'window'  
(网页中定义的任何一个对象、变量和函数都以window作为其Globle对象，因此可以直接使用像parseInt()等方法)

- **points**
    - 在全局作用域中声明的变量、函数都会变成window的属性和方法
    - **定义的**的全局变量不能通过delete操作符删除，而在window对象上定义的属性可以
    ``` js
    let age = 18;           // delete window.age ==>false
    window.color = 'red';   // delete window.color ==> true

    ```
    - window.location和document.location引用的是同一个对象

## 第九章 客服端检测

就是检测一些功能，平时常用的可能是检测支持xx特性的浏览器，提醒用户更换浏览器或者下载相关吧。
``` js
if(object.propertyInQestion){
    // ....
}
```

- 确定一个对象是否支持排序
``` js

function isSortable(obj){
    return typeof object.sort == 'function';
} 

```
... 太多了，用到时候再翻书吧

## 第十章 DOM

- 文档节点是每个文档的根节点，`<html>`元素为文档元素
- 每个节点都有一个n`odeType`属性(1~12种)，用于表明节点的类型。为了确保浏览器兼容，最好将nodeType属性和数字值进行比较。
- 每一个节点都保存一个`childNodes`属性，里面保存着`NodeList`对象。但是nodelist并不是Array的实例，它实际是基于DOM结构动态执行查询的结果，因此DOM结构的变化能够自动反映再NodeList对象中。
- `document`对象是HTMLDocument的一个实例，表示整个HTML页面
- `Elementl`类型表现XML或HTML，提供了对元素标签名、子节点及特性的访问
- `HTML`元素都由HTMLElement类型表示
- `Text`表示纯文本内容

- 一些常用原生常用的方法方法
    - `Node.appendChild()`
    - `Node.replaceChild(new, node)`
    - `Node.removeChild()`
    - `Node.cloneNode()`
    - `document.implementation.hashFeature()`检测浏览器对DOM的实现
    - `dom.write/writeln/open/close()`
    - `div.get/setAttribute()`
    - `normalize()`把相邻文本节点合并

- NodeList的动态的，所以访问次数要尽量减少，避免不必要的开销
- NamedNodeMap
- HTMLCollection

## 第十一章 DOM扩展

- querySelector(cssname) 接后一个CSS选择符，返回匹配的**第一个元素**
- querySelectorAll(cssname) 返回的是nodelist实例
- matchesSelector()
- document.activeElement 是个元素，引用DOM当前获取了焦点的元素
- document.readyState 字符串，loading/complete
- charset 文档使用的字符集，默认utf-16，可以通过meta标签修改
- data- 自定义数据属性


## 第十二章 DOM2和DOM3

- **base**
    - `DOM1` 定义HTML和XML文档的底层结构
    - `DOM2/DOM3` 在DOM1的基础上引入更多的交互能力，也支持更高级的XML特性
    - `DOM2 Core` 为节点添加更多方法和属性
    - `DOM2 Views` 为文档定义了基于样式信息的不同试图
    - `DOM2 Events` 事件与DOM文档交互
    - `DOM2 Style` 以编程方式来访问和改变CSS样式信息
    - `DOM2 HTML` 在DOM1的HTML基础上构建，添加更多属性、方法、新接口
- **命名空间-Node的变化**
    - DOM2(包含以下特定于命名空间的属性)
        - `localName`
        - `namespaceURI`
        - `prefix`
    ``` html
    <s:svg xmlns:s="http:www.ws.org/2000/svg" version="1.1" ....>
    ....
    </s:svg>
    <!--  
       localName；svg
       namespaceURI: http:www.ws.org/2000/svg
       prefix:null
    -->
    ```
    - DOM3(以下是方法，方法！)
        - `isDefaultNamespace()` boolean
        - `lookupNamespaceURI(prefix)` 返回给定prefix的命名空间
        - `lookupPrefix(namespaceURI)` 返回namespaceURI的前缀
- **命名空间-Document的变化**
    - DOM2(function)
        - `createElementNS(namespaceURI, tagName)`
        - `createAttributeNS(namespaceURI, arrtname)`
        - `getElementsByTagName(namespaceURI, tagName)`
- **命名空间-Element类型的变化**
太多了不想打
- **NamedNodeMap类型的变化**
too much ~~~~ 😭

- **元素大小-偏移量**
    - `offsetHeight`
    - `offsetLeft`
    - `offsetTop`
    - `offsetWidth`
    - (其他) 要知道某个元素在页面上的偏移量，要将这个元素的offsetLeft和offsetTop与其offsetParent的相同属性相加，如此循环直至根元素
    ``` js
    function getElementLeft(ele){
        let actualLeft =  ele.offsetLeft;
        let current = ele.offsetParent;
        while(current!=null){
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }

    return actualLeft;
    }

    ```
- **元素大小-客户区大小**
指元素**内容**及其**内边距**占据的空间大小（不包含**边框**）
    - `clientWidth`
    - `clientHeight`

- **元素-滚动大小**
    - `scrollHeight`
    - `scrollWidth`
    - `scrollLeft`
    - `scrollTop`

- **遍历**
都是基于depth-first的遍历操作
    - `NodeIterator`
    用`document.createNodeIterator(...)`创建，API太多了不写了
    ``` js
    let iterator = document.createNodeIterator
    (div, //root
    NodeFilter.SHOW_ELEMENT, // whatToShow 
    null, // filter
    false); // entityReferenceExpansion

    let node = iterator.nextNode();
    while( node !== null){
        console.log(node.tagname);
        node = iterator.nextNode();
    }

    ```
    - `TreeWalker`
    在以上基础上增加用于在不同方向上遍历DOM结构的方法
    API太多了也不写了
    ``` js

    let walker = document.createTreeWalker 
    (div, //root
    NodeFilter.SHOW_ELEMENT, // whatToShow 
    null, // filter
    false); // entityReferenceExpansion

    let node = walker.firstChild();
    while( node !== null){
        console.log(node.tagname);
        node = walker.nextSibling();
    }

    ```


## 第十四章 表单脚本

- **Base**
`<from>`在JS里对应为`HTMLFormElement`,继承`HTMLElement`，所以拥有和HTML元素相同的默认属性，也有自己独有的属性和方法
    - `acceptCharset` 服务器能处理的字符集
    - `action` 接收请求的URL
    - `elements` 所有控件合集
    - `enctype` 请求的编码类型
    - `length` 控件数量
    - `method`
    - `name`
    - `reset()` 将所有表单域重置为默认值
    - `submit()` (阻止：preventDefalut())
    - `target` 用于发送请求和接收响应的窗口名称
- **表单字段属性**
    - `disabled` boolean,当前字段是否被禁用
    - `form` 指向当前字段所属的表单的指针，只读
    - `name`
    - `readOnly` boolean ，当前字段是否只读
    - `tabIndex` 当前字段切换tab的序号
    - `value`
    - `type`
- **表单字段方法**
    - `focus()`
    - `blur()`
- **表单字段事件**
    - blur
    - change
    - focus
- **文本相关**
    - select() 选择文本框中的所有文本
    - selectionStart
    - selectionEnd
    - setSelectionRange(num1, num2) 可选择文本范围
- **过滤输入**
    - 对`keypress`检测对应的字符编码来阻止特定字符的响应
    ``` js
    EventUtil.addHandler(textbox, 'keypress' ,function(event){
        
        let charCode = EventUtil.getCharCode(event);
        if(String.fromCharCode(charCode)){//fake code
        EventUtil.preventDefault(event);

        }
    })

    ```
 - **剪贴板事件**
    - beforecopy
    - copy
    - beforecut
    - cut
    - beforepaste
    - paste
- **自动切换焦点**
比如填写固定的电话号码，可以在前一个文本框中的字符达到最大数量后，自动将焦点切换到下一个文本框
``` js
function tabForward(event){

    event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event);
    if(target.value.length) === target.maxLength{
        let form =  target.form;

        for(let i = 0; len = form.elements.length; i<len; i++){
            if(form.elements[i]=== target){
                if(form.elements[i+1]){
                    form.elements[i+1].focus(); //point here
                }

                return;
            }
        }

    }

}


```

- HTML5约束验证API(表单)
即使JS被禁用或者未能加载也能确保基本的验证
    - `required`
    - `type` 分为`email` 和 `url`
    - 数值范围入`number/range`等，不推荐
    - `pattern` 正则
    - `checkValidity()` 所有表单都有这个，检测表单某个字段是否有效，返回boolean(注意约束为以上AIP的条件，而不是自定义的)
    - `validity` 包含多个属性(太多不写)每个属性会返回一个boolean，这个属性会告诉你为什么字段有效或无效，
    - `nobalidate` 告诉表单不用验证


    
        




## 第十八章 JS与XML

- **DOM2级核心**


## 第二十章JSON

sth about json like this

``` js

{"cityCode":"101280101","cityStr":"广州"}

```

- **Base**  
    - 支持所有类型，除了`undefine`
    - 是一个键值对,无声明变量的概念
    - 属性名是一定要加**双引号**的

- **解析与序列化**  
    - `stringify()`把JS对象序列化为JSON字符串
        - `stringfy(obj,obj[...])`里面可以写key，这样出来的数据将会只打印你写过的key
        - `stringfy(obj,func)`这里func(key,value)你可以用swich指定你要的key的velue变成什么样子
        - `stringfy(obj,func,num)`num控制缩进和空白符，如果不是数值，会变成替换的字符
    - `parse()` 把JSON字符串解析为原生JS值
        - `parse(obj,func)`func会遍历每个k-v，你可以用它来控制来生成你要的东西


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
- **Server-sent Event**
服务器发送事件是围绕只读Comet交互推出的API/模式。SSE API用于创建到服务器的单向连接，服务器通过这个连接可以发送任意数量的数据。

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
    - 基本思想
    ``` js

    let timerId = null;
    handelFunc(){
        // do your real work
    }

    // 如果你连续触发这个，
    //实际上不断延迟，到delay后才会触发最后一次
    deboundleFunc(delay){
        clearTimeout(this.timerId);
        const cur = this;
        this.timerId = setTimeout(()=>{
            this.handelFunc();
        },delay);
    }


    ```

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










