# JS高程笔记

## 第6章面向对象的程序设计

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
