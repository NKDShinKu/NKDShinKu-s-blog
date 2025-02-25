学习大纲：
1.	ECMAscript（ES6之前的语法）：定义语言规范
2.	DOM：用于操作文档API
3.	BOM：用于操作浏览器API
# 定义语言规范
 
## 初步了解
### 编写方式（三种）：
* 位置一：HTML代码行内（不推荐）
* 位置二：script标签中
* 位置三：外部的script文件 需要通过script元素的src属性来引入JavaScript文件

###  noscript元素
`<noscript> </noscript>`元素出现，被用于给不支持（或者被关闭）JavaScript的浏览器提供替代内容。

### 编写JavaScript注意事项：
* 注意一: script元素不能写成单标签  
在外联式引用js文件时，script标签中不可以写JavaScript代码，并且script标签不能写成单标签，即不能写成`<script src="index.js"/>`；

* 注意二: 省略type属性  
在以前的代码中，`<script>`标签中会使用`type=“text/javascript”`现在可不写这个代码了，因为JavaScript 是所有现代浏览器以及HTML5 中的默认脚本语言；

* 注意三: 加载顺序  
作为HTML文档内容的一部分，JavaScript默认遵循HTML文档的加载顺序，即自上而下的加载顺序；

* 注意四: JavaScript代码严格区分大小写  
HTML元素和CSS属性不区分，JavaScript中严格区分大小写；

### 浏览器交互方式

* `alert`函数：弹窗查看  
```js
alert("Hello World");
```

* `console.log`函数,：将内容输出到控制台中(console)  
```js
console.log("Hello Coderwhy");
```

* `document.write()`函数：在浏览器页面查看  
```js
document.write("Hello Kobe");
```

* `prompt`函数：在浏览器接受用户输入  
```js
var result = prompt("请输入你的名字: ");
    alert("您刚才输入的内容是:" + result);
```

## 基本语法

### 变量命名方法
* ：在JavaScript中声明一个变量使用`var`关键字（variable单词的缩写）（后续学习ES6还有let、const声明方式
```js
var name = "genshin"
```

### 认识数据类型-动态类型-常见的数据类型

1. <font color = yellow>Number：用于任何类型的数字：整数或浮点数。</font>
* 数字number可以有很多操作，比如，乘法 *、除法 /、加法 +、减法 - 等等。
* 除了常规的数字，还包括所谓的“特殊数值（“special numeric values”）”也属于Number类型
  * Infinity：无穷大 ，-Infinity：无穷小  
  比如 1/0 得到的就是无穷大；
  * NaN：NaN 代表一个计算错误，它是一个错误的操作所得到的结果  
  比如 字符串和一个数字相乘；

* 表示十进制、十六进制（0x）、二进制（0b）、八进制（0o）
* 数字表示的范围：
  * 最小正数值：Number.MIN_VALUE，这个值为： 5e-324，小于这个的数字会被转化为0
  * 最大正数值：Number.MAX_VALUE，这个值为： 1.7976931348623157e+308
* isNaN：用于判断是否不是一个数字。不是数字返回true，是数字返回false。

2. <font color = yellow>String：用于字符串：一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。</font>
* 字符串必须被括在双引号、单引号、反引号内
* 前后符号一致
* 转义字符（'\\'）
* 字符串拼接，通过+运算符
  * 使用反引号和${变量/表达式}
* 获取字符串长度(`name.lenth`)
3. <font color = yellow>Boolean：用于 true 和 false。</font>
4. <font color = yellow>Undefined：用于未初始化的值 —— 只有一个 undefined 值的独立类型。</font>
* 最好在变量定义的时候进行初始化，而不只是声明一个变量
* 不要显示的将一个变量赋值为undefined,如果变量刚开始什么都没有，我们可以初始化为0、空字符串、null等值；
5. <font color = yellow>Null：用于未知的值 —— 只有一个 null 值的独立类型。</font>
* null类型通常用来表示一个对象为空，所以通常我们在给一个对象进行初始化时，会赋值为null
6. <font color = yellow>Object：用于更复杂的数据结构。</font>
* 其他的数据类型我们通常称之为 “原始类型”，因为它们的值质保函一个单独的内容（字符串、数字或者其他）；
* Object往往可以表示一组数据，是其他数据的一个集合
* 在JavaScript中我们可以使用 花括号{} 的方式来表示一个对象；
```js
var person = {
      name: "why",
      age: 18,
      height: 1.88
    }
```
7. <font color = yellow>Bigint：用于任意长度的整数。</font>
8. <font color = yellow>Symbol：用于唯一的标识符。</font>

### typeof操作符
* 作用：来确定任意变量的数据类型。、
* 用法：  
  * `typeof(x)`或`typeof x`  
  * typeof是一个操作符，并非是一个函数，`()`只是将后续的内容当做一个整体而已

### 数据类型的转换
1. 转化为string
* 隐式转换
  * 一个字符串和其他类型进行+操作；  
  +运算符左右两边有一个是字符串，那么另一边会自动转换成字符串类型进行拼接
  ```js
  var num1Str = num1 + ""
  ```
  * 某些函数的执行也会自动将参数转为字符串类型；  
  比如console.log函数；
* 显式转换
  * 调用String()函数；
  ```js
  var num1Str2 = String(num1)
  ```
  * 调用toString()方法（后续面向对象再学习）；

2. 转化为Number
* 隐式转换
  * 在算数运算中，通常会将其他类型转换成数字类型来进行运算；  
比如 "6" / "2"
  ```js
    var num1 = "8"
    var num2 = "4"
    var result1 = num1 + num2 // 84
  ```
* 显式转换
  * 使用Number()函数
  ```js
    var result3 = Number(num1)

    console.log(Number(undefined)) // NaN
    console.log(Number(true)) // 1
    console.log(Number(false)) // 0
    console.log(Number(null)) // 0
    console.log(Number("abc123")) // NaN
    console.log(Number("         123       ")) // 123
    console.log(Number("")) // 0
  ```
3. 转化为Boolean
* 调用 Boolean(value) 
  * 直观上为“空”的值（如 0、空字符串、null、undefined 和 NaN）将变为 false。
  * 其他值变成 true。

### 运算符
* 算术运算符
  * `+` `-` `*` `/` `%` `**`
  * 分别为加、减、乘、除（有小数）、取余、求幂
* 赋值运算符
  * =为赋值运算符
  * 链式赋值
  ```js
  var a=b=c=2+3 //5
  ```
  * 原地修改  
  +=  -=  *=  /=  %=  **=
  * 自增、自减
  ```js
  var a = 1
  a++ //2
  ++a //3
  5++ //报错
  ++5 //报错
  ```
* 比较运算符
  * 大于/小于：a > b，a < b。
  * 大于等于/小于等于：a >= b，a <= b。
  * 检查两个值的相等：a == b
  * 检查两个值不相等：a != b

  * ==与===  
  == 两侧的值会先被转化为数字，空字符串和false也是如此，转化后它们为数字0  
  === 在进行比较时不会做任何的类型转换，
  * !=与!==  
  与上面类似

### 分支语句
1. if分支语句
* 单分支if...
* 多分支
  * if...else...
  * if... else if...else
* if(...)会计算圆括号内的表达式，并将计算结果转换为布尔型（Boolean）
  * 数字 0、空字符串 “”、null、undefined 和 NaN 都会被转换成 false
  * 其他值被转换为 true
2. 三元运算符
* var result = condition ? value1 : value2;
* 用法：赋默认值，防止外来变量为undefined类型
```js
var info = {
      name: "why"
    }
    var obj = info ? info: {}
    console.log(obj) //why
```
3. 逻辑运算符
* ||（或）
  * 从左到右依次计算操作数。
  * 处理每一个操作数时，都将其转化为布尔值（Boolean）；
  * 如果结果是 true，就停止计算，返回这个操作数的初始值。
  * 如果所有的操作数都被计算过（也就是，转换结果都是 false），则返回最后一个操作数。
  * **注意：返回的值是操作数的初始形式，不会转换为Boolean类型。**
  * **换句话说，一个或运算 || 的链，将返回第一个真值，如果不存在真值，就返回该链的最后一个值。**
  * 获取第一个有值的结果，**防止是undefined**
  ```js
    var info = "abc"
    var obj = {name: "why"}
    //假如我要获取info=或obj，就要执行以下判断防止undefined
    var message = info || obj || "我是默认值"
    console.log(message.length) // abc
  ```
* &&（与）
  * 从左到右依次计算操作数。
  * 在处理每一个操作数时，都将其转化为布尔值（Boolean）；
  * 如果结果是 false，就停止计算，并返回这个操作数的初始值（一般不需要获取到初始值）；
  * 如果所有的操作数都被计算过（例如都是真值），则返回最后一个操作数。
  * **换句话说，与运算 返回第一个假值，如果没有假值就返回最后一个值。**
  * 对一些对象中的方法进行有值判断,**防止是undefined**
  ```js
  var obj = {
      name: "why",
      friend: {
        name: "kobe",
        eating: function() {
          console.log("eat something")
        }
      }
    }
  //假如我要调用obj.friend.eating(),就要执行以下判断防止undefined
  obj && obj.friend && obj.friend.eating && obj.friend.eating()
  ```
* !（非）
  * 步骤一：将操作数转化为布尔类型：true/false；
  * 步骤二：返回相反的值；
  * 两个非运算 !! 有时候用来将某个值转化为布尔类型（取了2次反）

4. switch语句
```js
var btnIndex = 0//变量
    switch (btnIndex) {
      case 0:
        console.log("点击了上一首")
        break
      case 1:
        console.log("点击了播放/暂停")
        // 默认情况下是有case穿透
        break
      case 2:
        console.log("点击了下一首停")
        break
      default:
        console.log("当前按钮的索引有问题~")
        break
    }
```
* case穿透问题：
一条case语句结束后，会自动执行下一个case的语句；

* break关键字
通过在每个case的代码块后添加break关键字来解决穿透问题

* 注意事项：这里的相等是严格相等，被比较的值必须是相同的类型才能进行匹配。

### 循环
* `while`循环(与C++差不多)
* `do..while`循环(与C++差不多)
* `for`循环(与C++差不多)
* `break`跳出循环
* `continue`立刻执行下次循环


## 函数
### 函数的定义
使用`function`
```js
function 函数名(参数|定义形参){
//函数封装的代码
……
 } 
 ```
 ### 函数的调用
 ```js
 函数名(参数|填实参)
 ```

### 形参和实参
  * 形参（参数parameter）：定义函数时，小括号中的参数，是用来接收参数用的，在函数内部作为变量使用
  * 实参（参数argument）：调用函数时，小括号中的参数，是用来把数据传递到函数内部用的

### 返回值
  * 使用`return`关键字来返回结果；

  * 一旦在函数中执行return操作，那么当前函数会终止；
  * 如果函数中没有使用return语句，那么函数有默认的返回值：undefined；
  * 如果函数使用return语句且后面没有任何值，那么函数的返回值也是：undefined

### `arguments`对象
  * 默认情况下，arguments对象是所有（非箭头）函数中都可用的局部变量；

  * 该对象中存放着所有的调用者传入的形参，从0位置开始，依次存放；
  * arguments变量的类型是一个object类型（ array-like ），不是一个数组，但是和数组的用法看起来很相似；
  * `如果调用者传入的参数多余函数接收的参数，可以通过arguments去获取所有的参数`
  ```js
   function sum() {
      var total = 0
      for (var i = 0; i < arguments.length; i++) {
        var num = arguments[i]
        total += num
      }
      return total
    }
    console.log(sum(10, 20))
    console.log(sum(10, 20, 30))
    console.log(sum(10, 20, 30, 40))
  ```
### 递归问题（自己调用自己）
```js
function pow(x, n){
  if (n === 1) return x
  return x * pow(x, n-1)
}
```
### 局部变量与外部（全局）变量 （ES5之前没有没有块级作用域的概念）

  * `局部变量`：函数内定义，只有在函数内部可以被访问到

  * `外部（全局）变量`：函数外script内定义，在任何函数中都是可见的。

  * 在函数中，访问变量的顺序是优先访问自己函数中的变量，没有找到时，在外部中访问。没找到就报错。

  * 通过var声明的全局变量会在window对象上添加一个属性

### 作用域
  1. 作用域的理解:message在哪一个范围内可以被使用, 称之为message的作用域(scope)

  2. `ES5之前是没有块级作用域`(var定义的变量是没有块级作用域)  
     比如for循环的代码块也是没有自己的作用域

  3. ES5之前`函数代码块是会形成自己的作用域`

  * **ps：意思就是for里面var定义的变量在for外面也可以访问**

### 函数表达式
  * 无论函数是如何创建的，函数都是一个值（这个值的类型是一个`对象`）

  * 在JavaScript开发中，我们可以将函数作为`头等公民`。

  ```js
  var bar = function() { //省略函数名字
    console.log("bar函数被执行了~")
  }
  ```

### 函数声明与函数表达式
  1. 函数声明：在主代码流中声明为单独的语句的函数。

  * 在函数声明被定义之前，它就可以被调用。

  * 这是内部算法的原故；

  * 当JavaScript准备运行脚本时，首先会在脚本中寻找全局函数声明，并创建这些函数；

  2. 函数表达式：在一个表达式中或另一个语法结构中创建的函数。

  * 函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用。

### 头等公民
  1. 函数可以被赋值给变量(函数表达式写法)
  ```js
  var foo1 = function() {
    console.log("foo1函数被执行~")
  }
  ```
  2. 让函数在变量之间来回传递
  ```js
  var foo2 = foo1
  foo1()
  ```
  3. 函数可以另外一个函数的参数
  ```js
  function bar(fn) {
    console.log("fn:", fn)
    fn()
  }
  bar(foo1)
  ```
  4. 函数作为另外一个函数的返回值
  ```js
  function sayHello() {
    function hi() {
      console.log("hi kobe")
    }
    return hi
  }
  var fn = sayHello()
  fn()
  ```
  5. 将函数存储在另外一个数据结构中

### 回调函数与匿名函数
  * 回调函数
  ```js
    function foo(fn) {
      // 通过fn去调用bar函数的过程, 称之为函数的回调
      fn()
    }
    function bar() {
      console.log("bar函数被执行了~")
    }
    foo(bar)
  ```
  * 高级函数：接受一个或者多个函数作为输入，或则输出一个函数
  
  * 匿名函数：如果在传入一个函数时，我们没有指定这个函数的名词或者通过函数表达式指定函数对应的变量，那么这个函数称之为匿名函数。
    ```js
    request("url", function(res) {
      console.log("在handleResult中拿到结果:", res)
    })
    ```
* 立即执行函数
  * 一个函数定义完后被立即执行；  
   第一部分是定义了一个`匿名函数`，这个函数有自己独立的作用域。  
   第二部分是后面的`（）`，表示这个函数被执行了

  * 作用：会创建一个独立的执行上下文环境，可以避免外界访问或修改内部的变量，也避免了对内部变量的修改

  * 写法
    ```js
      //1.常见的写法
        (function() {
          console.log("立即执行函数被调用~")
        })()

      // 2.其他写法
        // 匿名函数
        (function(fn) {
          console.log("立即执行函数被调用")
        }());

        // +(正号)-(符号)!(取反) - 了解
        +function foo() {}()
    ```
## 对象

### 什么是对象
  * 将现实世界抽象成一个对象，比如一辆车（属性：颜色、重量）（方法：行驶）
  * 对象类型可以使用{…}来创建的复杂类型，里面包含的是键值对（key: value）
    `key`：字符串类型（ES6后面可以是`Symbol`）  
    `value`：任意类型
    
### 创建方法
  * 对象字面量（Object Literal）：通过{ }
  * new Object + 动态添加属性
  * new 其他类
  * 属性之间逗号隔开
  ```js
    // 1.对象字面量
    var obj1 = {
      name: "why"
    }

    // 2.new Object()
    // Object构造函数
    var obj2 = new Object()
    obj2.name = "kobe"

    // // 3.new 其他类()
    function Person() {}
    var obj3 = new Person()
  ```
  
### 对象操作
  * 访问对象的属性：用 "`.`" 或者"`[]`"访问
  * 修改对象的属性：直接修改
  * 添加对象的属性：直接添加
  * 删除对象的属性：`delete`直接删除
    ```js
    // 定义了一个对象
    var info = {
      name: "why",
      age: 18,
      friend: {
        name: "kobe",
        age: 30
      },
      running: function() {
        console.log("running~")
      }
    }

    // 1.访问对象中的属性
    console.log(info.name)
    console.log(info.friend.name)
    info.running()

    // 2.修改对象中的属性
    info.age = 25
    info.running = function() {
      alert("I am running~")
    }
    //console.log(info.age) 
    //info.running()

    // 3.添加对象中的属性
    info.height = 1.88
    info.studying = function() {
      console.log("I am studying~")
    }
    console.log(info)

    // 4.删除对象中的属性
    // delete关键字(操作符)
    delete info.age
    delete info.height
    console.log(info)
    ```
### 方括号
  * 比如一个属性有空格，就需要"`[]`"
    ```js
    info[my friend]
    ```
### 对象的遍历  
`Object.keys(对象名)` 会返回一个由一个给定对象的自身可枚举属性组成的数组；
  * for 循环
  ```js
  var infoKeys = Object.keys(info)
    for (var i = 0; i < infoKeys.length; i++) {
      var key = infoKeys[i]
      var value = info[key]
      console.log(`key: ${key}, value: ${value}`)
    }

  ```
  * for in 遍历
  ```js
  for (var key in info) {
      var value = info[key]
      console.log(`key: ${key}, value: ${value}`)
    }
  ```
### 栈内存和堆内存
  * `原始类型`占据的空间是在`栈内存`中分配的，也叫`值类型`
  * `对象类型`占据的空间是在`堆内存`中分配的，也叫`引用类型`

### this 指针
  * 如果普通的函数被默认调用, 那么this指向的就是window
  * 如果函数它是被某一个对象来引用并且调用它, 那么this会指向这个对象(调用的那个调用)
  * 目前掌握两个this的判断方法  
    在全局环境下面，this指向window；  
    通过对象调用，this指向调用的对象；  

### 工厂函数
* 封装一个函数帮我们创建对象
* 创建的是object类型
```js
function createStudent(name, age, height) {
      var stu = {}
      stu.name = name
      stu.age = age
      stu.height = height
      stu.running = function() {
        console.log("running~")
      }
      return stu
    }
var stu1 = createStudent("why", 18, 1.88)
```
### 构造函数（类）
* 一个函数（类）帮我们创建对象

* 创建的是我们想要的类型，比如是student类型而不是object类型。

* 普通的函数被使用new操作符来调用了，那么这个函数就是一个构造函数

* **构造函数就是类的扮演者**


```js
function coder(name, age, height) {
      this.name = name
      this.age = age
      this.height = height
      this.running = function() {
        console.log("running~")
      }
    }
// 在函数调用的前面加 new 关键字(操作符)
var stu1 = new coder("why", 18, 1.88)
```
如果一个函数被使用new操作符调用了，那么它会执行如下操作：
1. 在内存中创建一个新的对象（空对象）；
2. 这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性；（后面详细讲）；
3. 构造函数内部的this，会指向创建出来的新对象；
4. 执行函数的内部代码（函数体代码）；
5. 如果构造函数没有返回非空对象，则返回创建出来的新对象；

## 内置类
###  原始类型的包装类
* 原始类型并非对象类型，按理是没有办法获取属性或者调用方法的。但是会有以下现象
```js
var str = "genshin"
console.log(str.length)
```

* 因为JavaScript为了可以使其可以获取属性和调用方法，对其封装了对应的包装类型
所以也可以像下面这样
```js
var str = new String("genshin")
```

* 常见的包装类型有：String、Number、Boolean、Symbol、BigInt类型  
null 和 undefined没有其包装类

### Number类
* `Number.MAX_SAFE_INTEGER`：JavaScript 中最大的安全整数 (2^53 - 1)

* `Number.MIN_SAFE_INTEGER`：JavaScript 中最小的安全整数-(2^53 - 1)
* `Number.toString(base)`：将数字转成字符串，并且按照base进制进行转化，base 的范围可以从2到36，默认情况下是10    
注意：如果是直接对一个数字操作，需要使用..运算符
* `Number.toFixed(digits)`，格式化一个数字，保留digits位的小数，digits的范围是0到20（包含）之间
* `Number.parseInt(string[, radix])`：将字符串解析成整数，也有对应的全局方法parseInt；
* `Number.parseFloat(string)`：将字符串解析成浮点数，也有对应的全局方法parseFloat；

### math对象
* `Math.PI`：圆周率，约等于3.14159

* `Math.floor`：向下舍入取整
* `Math.ceil`：向上舍入取整
* `Math.round`：四舍五入取整
* `Math.random`：生成0~1的随机数（包含0，不包含1）
* `Math.pow(x, y)`：返回x的y次幂

### String类
* 字符串不可修改

* 访问字符串字符
  * `str[0]` , `str[1]`...，没找到返回undefined
  * `str.charAt(pos)`，没找到返回空字符串
* `str.length`：：获取字符串的长度

* `str.toLowerCase()`：将所有的字符转成小写；
* `str.toUpperCase()`：将所有的字符转成大写

* `str.indexOf(searchValue[,formIndex])`：从fromIndex开始，查找searchValue的索引，如果没有找到返回-1。（lastIndexOf，从最后开始查找（））
* `str.includes(searchString[,postion])`：从position位置开始查找searchString， 根据情况返回true 或false

* `str.startWith(searchString[,postion])`：从position位置开始，判断字符串是否以searchString开头
* `str.endsWith(searchString[,length])`：在length长度内，判断字符串是否以searchString结尾

* `str.replace(substr,newsubstr)`：查找到对应的字符串，并且使用新的字符串进行替代

* 截取字符串
  * `slice(start, end)`：从start 到 end（不含 end），允许负值
  * `substring(start, end)`：从start 到 end（不含 end），负值代表0
  * `substr(start, length)`：从start 开始获取长为length 的字符串，允许start为负值
* `str.concat(str2[...strN])`：拼接字符串
* `str.trim()`：删除首位空格
* `str.split([separator[,limit]])`：  
separator：以什么字符串进行分割，也可以是一个正则表达式  
limit：限制返回片段的数量

### 数组Array
数组和对象都是一种保存多个数据的数据结构，它是一种有序的集合，里面的元素是按照某一个顺序来排列的。

* 数组的创建方式
```js
//1. 方法一
var names = ["why", "kobe", "james", "curry"]
var products = [
      { name: "鼠标", price: 98 },
      { name: "键盘", price: 100 },
      { name: "西瓜", price: 20 },
      product1
    ]
//2. 方法二
var arr1 = new Array()
var arr2 = new Array("abc", "cba", "nba") // ["abc", "cba", "nba"]

//通过索引访问元素
console.log(names[0]) // 第一个元素
console.log(names[names.length-1]) // 最后一个元素
```
* 数组的访问
  * 通过中括号`[]`访问
  * 通过`arr.at(i)`
  * 当i<0时从数组尾部访问。
  ```js
  arr[-1]   //最后一个元素
  arr.at(-1)//最后一个元素
  ```
* 数组的修改
```js
arr[0] = 'genshin'
```
* 数组的添加或删除
  * 直接索引添加，比如下面添加了位置10上的元素，那么3-10中就为空元素。
  ```js
  var names = ["abc", "cba", "nba"]
  names[10] = "james"
  ```
  * 使用`delete`删除， 比如delete names[0]

  * `push`(元素)，在末尾添加元素  
    `pop`()，把末尾的元素删除
  * `unshift`(元素) 在首端添加元素，整个其他数组元素向后移动  
    `shift`() 取出队列首端的一个元素，整个数组元素向前前移动

* 数组的添加、删除、修改集于一体`splice`
  * splice(start,deleteCount,item)，它可以添加，删除和替换元素  
  start：开始处理的位置
  deleteCount：删除元素的个数
  item：添加的元素
  ```js
  arr.splice(1,1)//删除位置1的元素
  arr.splice(1,0,'a','b')//从位置1开始，添加2个元素
  arr.splice(1,2,'a','b')//从位置1开始，替换2个元素
  ```
* `length`属性
  * 当我们修改数组的时候，length 属性会自动更新
  * 当我们直接修改arr.length的值时  
    当修改值大于数组长度，数组会变长，多出来的变为空元素  
    当修改值小于数组长度，数组会直接删掉多的元素
* 数组的遍历
```js
// 1. 普通的for循环
for (var i = 0; i < names.length; i++) {
  console.log(names[i])
}

// 2. for..in   遍历键
for (var index in names) {
  console.log(index, names[index])
}

// 3. for..of   遍历值
for (var item of names) {
  console.log(item)
}
```
* 数组的其他方法
  * `arr.slice`(start,end)：用于对数组进行截取
  * `arr.concat`(arr1,arr2...)方法：拼接数组并返回
  * `arr.join`(['字符'])方法： 将一个数组的所有元素连接成一个字符串并返回这个字符串，不填默认通过'`,`'连接

  * `arr.indexOf`(x,s)：从s位置开始找x元素的索引
  * `arr.includes`(x,s)：从s位置开始找x元素，判断数组是否包含某个元素
  * `find` 和 `findIndex` 直接查找元素或者元素的索引
  ```js
  var students = [
      { id: 100, name: "why", age: 18 },
      { id: 101, name: "kobe", age: 30 },
      { id: 102, name: "james", age: 25 },
      { id: 103, name: "why", age: 22 }
    ]
    
    var stu = students.find(function(item) {
      if (item.id === 101) return true
    })
    console.log(stu)
    ```
  * `sort`([排序规则函数])：高阶函数，用于对数组进行排序，并且生成一个排序后的新数组
  * `reverse()` ：将数组中元素的位置颠倒，并返回该数

* 数组其他高阶函数
  * `arr.forEach`
    * 遍历数组，并且让数组中每一个元素都执行一次对应的方法；
  * `arr.map`
    * map() 方法创建一个新数组；
    * 这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成；
  * `arr.filter`
    * filter() 方法创建一个新数组；
    * 新数组中只包含每个元素调用函数返回为true的元素
    ```js
    let arr = [1,2,3,4,5,6]
    arr = arr.filter(item => item % 2 === 0)
    //[2,4,6]
    //返回一个数组，所有元素都是偶数
    ```
  * `arr.reduce`
    * 用于计算数组中所有元素的总和；
    * 对数组中的每个元素按序执行一个由您提供的reducer函数；
    * 每一次运行reducer会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值
    ```js
    arr.reduce((sum,item) => sum + item,0)
    //第一个参数 函数中，sum是初始值，后面那个0就会传入sum，item是数组中每个参数
    ```
  * `arr.every`
    * 数组里面每个元素都符合某种要求返回true
    ```js
    arr.every(item => item.isFlag) 
    //如果arr里面元素的isFlag都为true会返回true
    ```
### 时间Date
* 创建Date对象  
new Date();  
new Date(value);  
new Date(dateString);  
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);  

* 时间的表示方式  
日期的表示方式有两种：RFC 2822 标准或者ISO 8601 标准。
```js
var date = new Date()
console.log(date) //RFC 2822 标准
console.log(date.toDateString())
console.log(date.toISOString()) //ISO 8601 标准
```
* Date获取信息
  * `getFullYear`()：获取年份（4 位数）；
  * `getMonth`()：获取月份，从 0 到11；
  * `getDate`()：获取当月的具体日期，从 1 到31（方法名字有点迷）；
  * `getHours`()：获取小时；
  * `getMinutes`()：获取分钟；
  * `getSeconds`()：获取秒钟；
  * `getMilliseconds`()：获取毫秒；
  * `getDay`()：获取一周中的第几天，从 0（星期日）到6（星期六）；

* Date设置信息的方法
  * setFullYear(year, [month], [date])
  * setMonth(month, [date])
  * setDate(date)
  * setHours(hour, [min], [sec], [ms])
  * setMinutes(min, [sec], [ms])
  * setSeconds(sec, [ms])
  * setMilliseconds(ms)
  * setTime(milliseconds)
* 获取Date时间戳
  * new Date().getTime()
  * new Date().valueOf()
  * +new Date()
  * Date.now()
* `Date.parse`  
Date.parse(str) 方法可以从一个字符串中读取日期，并且输出对应的Unix时间戳

# DOM
1. DOM元素之间的关系
2. 获取DOM元素
3. DOM节点的type、tag、content
4. DOM节点的attributes、properies
5. DOM节点的创建、插入、克隆、删除 
6. DOM节点的样式、类
7. DOM元素/window的大小、滚动、坐标
## 什么是DOM和BOM
* DOM：文档对象模型（Document Object Model）  
将页面所有的内容表示为可以修改的对象
  * DOM Tree：在将html抽象成DOM对象的时候，它们会形成一个树结构
  * 它们类型之间有继承关系

* BOM：浏览器对象模型（Browser Object Model）  
简称BOM，由浏览器提供的用于处理文档（document）之外的所有内容的其他对象

## DOM元素之间的关系
### document对象
* 它是DOM的入口点，可以从document开始去访问任何节点元素
* html元素：\<html> = document.documentElement
* body元素：\<body> = document.body
* head元素：\<head> = document.head
* 文档声明：\<!DOCTYPE html> = document.doctype

### 节点（Node）之间的导航（navigator）
* 如果我们获取到一个节点（Node）后，可以根据这个节点去获取其他的节点，我们称之为节点之间的导航。

* 父节点：parentNode
* 前兄弟节点：previousSibling
* 后兄弟节点：nextSibling
* 子节点：childNodes
* 第一个子节点：firstChild
* 第二个子节点：lastChild

### 元素（Element）之间的导航（navigator）
* 如果我们获取到一个元素（Element）后，可以根据这个元素去获取其他的元素，我们称之为元素之间的导航。

* 父元素：parentElement
* 前兄弟节点：previousElementSibling
* 后兄弟节点：nextElementSibling
* 子节点：children
* 第一个子节点：firstElementChild
* 第二个子节点：lastElementChild

### 表格（table）元素的导航（navigator）

* \<table> 元素支持 (除了上面给出的，之外) 以下这些属性：
  * table.rows — <tr> 元素的集合；
  * table.caption/tHead/tFoot — 引用元素 \<caption>，\<thead>，\<tfoot>；
  * table.tBodies — <tbody> 元素的集合；

* \<thead>，\<tfoot>，\<tbody> 元素提供了 rows 属性：
  * tbody.rows — 表格内部<tr> 元素的集合；

* \<tr>：
  * tr.cells — 在给定 \<tr> 中的 \td> 和 \<th> 单元格的集合；
  * tr.sectionRowIndex — 给定的 \<tr> 在封闭的 \<thead>/\<tbody>/\<tfoot> 中的位置（索引）；
  * tr.rowIndex — 在整个表格中 \<tr> 的编号（包括表格的所有行）；

* \<td> 和 \<th>：
  * td.cellIndex — 在封闭的 <tr> 中单元格的编号。

### 表单（form）元素的导航（navigator）
* \<form> 元素可以直接通过document来获取：document.forms

* \<form> 元素中的内容可以通过elements来获取：form.elements

* 我们可以设置表单子元素的name来获取它们

## 获得DOM元素
* `querySelector`：通过选择获得
* `querySelectorAll`：通过选择器获得
* getElementById：通过id获得
* getElementsByName：通过表单name获得
* getElementsByTagName：通过标签获得
* getElementsByClassName：通过class获得

## 节点的常见属性

### 获取节点的类型（这个类型是数字）
* nodeType

![alt text](my_notes_images/06_NodeType.png)

### 获取节点的类型名称
* nodeName：获取node节点的名字
* tagName：获取元素的标签名词，只适用于Element节点

### 获取节点的数据
* data/nodeValue：获取非元素节点的文本内容
* `innerHTML`：获取元素内部的所有内容
* `textContent`：只获取元素内部的文字内容
* outHTML：获取元素内部的所有内容+自己

## 节点中元素的一些属性
### hidden
* hidden属性：是一个全局属性，可以用于设置元素隐藏。
```js
box.hidden = true/false
```
### attribute（元素的属性）
* 分类
  * 标准的attribute：比如id、class、href、type、value等
  * 非标准的attribute：如自定义的abc、age、height等

* elem.hasAttribute(name) — 检查特性是否存在。
* elem.getAttribute(name) — 获取这个特性值。
* elem.setAttribute(name, value) — 设置这个特性值。
* elem.removeAttribute(name) — 移除这个特性。
* elem.attributes：特性对象的集合，具有name、value属性；

* attribute特征：
  1. 大小写不敏感
  2. 值总为字符串

### property（节点中元素的属性）
* 标准的attribute，会在DOM对象上创建与其对应的property属性  
（即可以通过`elem.property`获得）

* property操作和attribute操作互相影响
  * 改变property，通过attribute获取的值，会随着改变；
  * 通过attribute操作修改，property的值会随着改变；

* 大多数情况下，设置、获取attribute，使用property的方式  
  只有input的value值通过attribute操作

### class与style
* 修改样式选择
  * 动态修改class完成某个功能，可以使用动态添加class
  * 精准修改某个css属性的值，可以修改style属性

* `className`：元素class attribute对应的property并非叫class，而是className  
* `classList`：是一个特殊的对象
  * elem.classList.`add` (class) ：添加一个类
  * elem.classList.`remove`(class)：添加/移除类
  * elem.classList.`toggle`(class) ：如果类不存在就添加类，存在就移除它
  * elem.classList.`contains`(class)：检查给定类，返回 true/false
  * 可以通过for of 遍历

* `style`
  * 对于多词属性，使用驼峰式。  
  （比如background-color要用成backgroundColor）
  * 如果我们将值设置为空字符串，那么会使用CSS的默认样式
  * 多个样式的写法，我们需要使用cssText属性
  ```js
  boxEl.style.cssText = "font-size: 30px; color: red;"
  ```
  * 对于内联样式，是以通过`style.`的方式读取到的
  * 对于css、style文件力的样式，通过`getComputedStyle`的全局函数实现
  ```js
  getComputedStyle(boxEl).fontSize
  ```
* `data-自定义属性名字`
```html
<div id="abc" class="box" 
       data-age="18" data-height="1.88"></div>//自定义属性

  <script>
    var boxEl = document.querySelector(".box")
    // 小程序开发中使用
    console.log(boxEl.dataset.age)  //取得自定义属性
    console.log(boxEl.dataset.height)
  </script>
```

## 元素的创建、插入、移除与克隆等操作
### 创建元素
* document.write，但是不利于处理复杂情况

* 通过innerHTML手动添加元素

* 创建元素： `document.createElement（tag）`
```js
var h2El = document.createElement("h2")
    h2El.className = "title"
    h2El.classList.add("active")
    h2El.textContent = "我是标题"
```

### 插入元素
* node.append(...nodes or strings) —— 在 node 末尾 插入节点或字符串，
* node.prepend(...nodes or strings) —— 在 node 开头 插入节点或字符串，
* node.before(...nodes or strings) —— 在 node 前面 插入节点或字符串，
* node.after(...nodes or strings) —— 在 node 后面 插入节点或字符串，

* node.replaceWith(...nodes or strings) —— 将 node 替换为给定的节点或字符串

![alt text](my_notes_images/07_nodeAdd.png)

### 元素的移除与克隆
* 移除元素，调用元素本身的remove方法

* 克隆元素，elem.cloneNode(true/false)  
true决定深度克隆，会克隆子元素，否则不会


### 元素的大小、滚动
* clientWidth：contentWith+padding（不包含滚动条）
* clientHeight：contentHeight+padding
* clientTop：border-top的宽度
* clientLeft：border-left的宽度
* offsetWidth：元素完整的宽度
* offsetHeight：元素完整的高度
* offsetLeft：距离父元素的x
* offsetHeight：距离父元素的y
* scrollHeight：整个可滚动的区域高度
* scrollTop：滚动部分的高度

### window的大小、滚动
* innerWidth、innerHeight：获取window窗口的宽度和高度（包含滚动条）
* outerWidth、outerHeight：获取window窗口的整个宽度和高度（包括调试工具、工具栏）
* documentElement.clientHeight、documentElement.clientWidth：获取html的宽度和高度（不包含滚动条）

* scrollX：X轴滚动的位置（别名pageXOffset）
* scrollY：Y轴滚动的位置（别名pageYOffset）

* 方法scrollBy(x,y) ：将页面滚动至 相对于当前位置的 (x, y) 位置；
* 方法scrollTo(pageX,pageY) 将页面滚动至 绝对坐标

## 事件

### 认识事件
* 事件监听方式
  * 在script中直接监听（很少使用）
  * DOM属性，通过元素的on来监听事件（比如onclick）
  * 通过EventTarget中的addEventListener来监听
```html
<button onclick="console.log('按钮1发生了点击~');">按钮1</button>

 <script>
    box.onclick = function () {   //2
       console.log("box发生了点击~")
    }

    btn.addEventListener("click", function() { //3
      console.log("btn的事件监听~")
    })
  </script>
```
* 鼠标事件：
  * click —— 当鼠标点击一个元素时（触摸屏设备会在点击时生成）。
  * mouseover / mouseout —— 当鼠标指针移入/离开一个元素时。
  * mousedown / mouseup —— 当在元素上按下/释放鼠标按钮时。
  * mousemove —— 当鼠标移动时。

* 键盘事件：
  * keydown 和keyup ——当按下和松开一个按键时。

* 表单（form）元素事件：
  * submit —— 当访问者提交了一个\<form> 时。
  * focus —— 当访问者聚焦于一个元素时，例如聚焦于一个\<input>。

* Document 事件：
  * DOMContentLoaded —— 当HTML 的加载和处理均完成，DOM 被完全构建完成时。

* CSS 事件：
  * transitionend —— 当一个 CSS 动画完成时。
### 事件冒泡与事件捕获
* 事件流：浏览器上对着一个元素点击时，你点击的不仅仅是这个元素本身

* 默认情况下事件是从最内层的span向外依次传递的顺序，这个顺序我们称之为事件冒泡

* 从外层到内层（body -> span），这种称之为事件捕获

元素.addEventListener("事件",function,`true/false`)通过true/false确定是否为事件捕获

###  事件对象
* 事件对象：发生的事件信息会被封装到一个Event对象中，这个对象由浏览器创建
* 获得方式：event对象会在传入的事件处理函数回调时，被系统传入

* 常见的属性：
  * type：事件的类型；
  * `target`：当前事件发生的元素；
  * `currentTarget`：当前处理事件的元素；
  * eventPhase：事件所处的阶段；
  * offsetX、offsetY：事件发生在元素内的位置；
  * clientX、clientY：事件发生在客户端内的位置；
  * pageX、pageY：事件发生在客户端相对于document的位置；
  * screenX、screenY：事件发生相对于屏幕的位置；

* 常见的方法：
  * preventDefault：取消事件的默认行为；
  * stopPropagation：阻止事件的进一步传递（冒泡或者捕获都可以阻止）

* 在函数中,通过this来获取当前的发生元素

### EventTarget类
* 我们会发现，所有的节点、元素都继承自EventTarget
  * 事实上Window也继承自EventTarget；

* 那么这个EventTarget是什么呢？
  * EventTarget是一个DOM接口，主要用于添加、删除、派发Event事件；

* EventTarget常见的方法：
  * addEventListener：注册某个事件类型以及事件处理函数；
  * removeEventListener：移除某个事件类型以及事件处理函数；
  * dispatchEvent：派发某个事件类型到EventTarget上

### 事件委托
* 事件冒泡衍生的事件委托模式（也是一种设计模式）

* 那么这个模式是怎么样的呢？
  * 因为当子元素被点击时，父元素可以通过冒泡可以监听到子元素的点击；
  * 并且可以通过event.target获取到当前监听的元素；

* 案例：一个ul中存放多个li，点击某一个li会变成红色
  * 方案一：监听每一个li的点击，并且做出相应；
  * 方案二：在ul中监听点击，并且通过event.target拿到对应的li进行处理；
### 鼠标事件
* click：当用户点击某个对象时调用的事件句柄。
* contextmenu：在用户点击鼠标右键打开上下文菜单时触发
* dblclick：当用户双击某个对象时调用的事件句柄。
* mousedown：鼠标按钮被按下。
* mouseup：鼠标按键被松开。
* mouseover：鼠标移到某元素之上。（支持冒泡）
* mouseout：鼠标从某元素移开。（支持冒泡）
* mouseenter：当鼠标指针移动到元素上时触发。（不支持冒泡）
* mouseleave：当鼠标指针移出元素时触发。（不支持冒泡）
* mousemove：鼠标被移动。 

* `mouseenter`和`mouseleave`
  * 不支持冒泡
  * 进入子元素依然属于在该元素内，没有任何反应
* `mouseover`和`mouseout`
  * 支持冒泡
  * 进入元素的子元素时  
  先调用父元素的mouseout  
  再调用子元素的mouseover  
  因为支持冒泡，所以会将mouseover传递到父元素中

### 键盘事件
* onkeydown：某个键盘按键被按下。
* onkeypress：某个键盘按键被按下。
* onkeyup：某个键盘按键被松开。

* 事件的执行顺序是onkeydown、onkeypress、onkeyup
* 我们可以通过key和code来区分按下的键：
  * code：“按键代码”（"KeyA"，"ArrowLeft" 等），特定于键盘上按键的物理位置。
  * key：字符（"A"，"a" 等），对于非字符的按键，通常具有与 code 相同的值。

### 表单事件
* onchange：该事件在表单元素的内容改变时触发(\<input>, \<keygen>, \<select>,和\<textarea>)
* oninput：元素获取用户输入时触发
* onfocus：元素获取焦点时触发
* onblur：元素失去焦点时触发
* onreset：表单重置时触发
* onsubmit：表单提交时触发

### 文档加载事件
* DOMContentLoaded：浏览器已完全加载 HTML，并构建了DOM 树，但像\<img> 和样式表之类的外部资源可能尚未加载完成。

* load：浏览器不仅加载完成了HTML，还加载完成了所有外部资源：图片，样式等。

# BOM
## BOM 浏览器对象模型(Browser Object Model)
* 由浏览器提供的用于处理文档(document)之外的所有内容的其他对象  
我们可以把BOM看作javascript脚本与浏览器窗口的桥梁

* 比如navigator、location、history等对象;
* window：包括全局属性、方法，控制浏览器窗口相关的属性、方法
* location：浏览器连接到的对象的位置(URL)
* history：操作浏览器的历史;
* navigator：用户代理（浏览器）的状态和标识（很少用到）
* screen：屏幕窗口信息(很少用到);

## window
* 第一：包含大量的属性，localStorage、console、location、history、screenX、scrollX等等（大概60+个属性）；
* 第二：包含大量的方法，alert、close、scrollTo、open等等（大概40+个方法）；
* 第三：包含大量的事件，focus、blur、load、hashchange等等（大概30+个事件）；
* 第四：包含从EventTarget继承过来的方法，addEventListener、removeEventListener、dispatchEvent方法；
## location

### 常见属性
* href: 当前window对应的超链接URL, 整个URL；
* protocol: 当前的协议；
* host: 主机地址；
* hostname: 主机地址(不带端口)；
* port: 端口；
* pathname: 路径；
* search: 查询字符串；
* hash: 哈希值；
* username：URL中的username（很多浏览器已经禁用）；
* password：URL中的password（很多浏览器已经禁用）；

### 常见方法
* assign：赋值一个新的URL，并且跳转到该URL中；
* replace：打开一个新的URL，并且跳转到该URL中（不同的是不会在浏览记录中留下之前的记录）；
* reload：重新加载页面，可以传入一个Boolean类型；

### URLSearchParams
* 可以将一个字符串转化成URLSearchParams类型；
* 也可以将一个URLSearchParams类型转成字符串；
* 常见的方法有如下：
  * get：获取搜索参数的值；
  * set：设置一个搜索参数和值；
  * append：追加一个搜索参数和值；
  * has：判断是否有某个搜索参数；


## history
* history对象允许我们访问浏览器曾经的会话历史记录。
* 有两个属性：
  * length：会话中的记录条数；
  * state：当前保留的状态值；
* 有五个方法：
  * back()：返回上一页，等价于history.go(-1)；
  * forward()：前进下一页，等价于history.go(1)；
  * go()：加载历史中的某一页；
  * pushState()：打开一个指定的地址；
  * replaceState()：打开一个新的地址，并且使用replace

# JSON
## JSON的顶层支持三种类型的值
* 简单值：数字（Number）、字符串（String，不支持单引号）、布尔类型（Boolean）、null类型；
* 对象值：由key、value组成，key是字符串类型，并且必须添加双引号，值可以是简单值、对象值、数组值；
* 数组值：数组的值可以是简单值、对象值、数组值；

## 序列化
* stringify方法：将JavaScript类型转成对应的JSON字符串；
* parse方法：解析JSON字符串，转回对应的JavaScript类型；