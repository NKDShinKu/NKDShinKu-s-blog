1. 细节性东西
* 函数 细节性
* 对象 细节性
2. 原理性
* 浏览器的原理
* 函数的本质
* 微任务/宏任务
3. 进阶性
* 面向对象-继承
* 原型-原型链
4. ES6~ES13
* let/const/class.... Promise
5. 手写原理或者工具函数
* Promise
* 节流/防抖/深拷贝/eventbus
* Vue2/Vue3响应式原理

# this指向
## 四项规则
1. 函数在调用时，JavaScript会默认给this绑定一个值；
2. this的绑定和定义的位置（编写的位置）没有关系；
3. this的绑定和调用方式以及调用的位置有关系；
4. this是在运行时被绑定的；

## 默认绑定
* 通过独立函数调用，即函数没有被绑定到某个对象上进行调用

## 隐式绑定
* 通过某个对象发起的函数调用

## new绑定
* 使用new关键字来调用函数是，会执行如下的操作：
    1. 创建一个全新的对象；
    2. 这个新对象会被执行prototype连接；
    3. 这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成）；
    4. 如果函数没有返回其他对象，表达式会返回这个新对象

## 显式绑定
* 不希望在对象内部包含这个函数的引用，同时又希望在这个对象上进行强制调用，可以使用显式绑定

* `call` 方法  
```js
func.call(this指向,func参数1,func参数2,...)  //this会指向 this指向
```

* `apply`方法
```js
func.apply(this指向,[func参数1,func参数2,...])  //this会指向 this指向
```

* `bind`方法
```js
bar = foo.bind(this指向)
bar()        //this会指向 this指向
```

## 规则优先级

* new > bind > apply/call > 隐式 > 默认

* new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高

## 其他情况

* 情况一：如果在显示绑定中，我们传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则

* 情况二：创建一个函数的间接引用，这种情况使用默认绑定规则。
  * 赋值 (obj2.foo = obj1.foo) 的结果是foo函数；
  * foo 函数被直接调用，那么是默认绑定

# 箭头函数 arrow function
## 介绍箭头函数
* 箭头函数是ES6之后增加的一种编写函数的方法，并且它比函数表达式要更加简洁
  * 箭头函数不会绑定this、arguments属性；
  * 箭头函数不能作为构造函数来使用（不能和new一起来使用，会抛出错误）
  * 箭头函数是没有显式原型prototype的，所以不能作为构造函数，使用new来创建对象；
  * 箭头函数也不绑定this、arguments、super参数；

  
* 箭头函数的编写
  * (): 函数的参数
  * {}: 函数的执行体

```js
var foo = (name) => {
    console.log(name);
}
```
## 编写优化

* 优化一: 如果只有一个参数，小括号( )可以省略
```js
var foo = name => {
    console.log(name);
}
```

* 优化二: 如果函数执行体中只有一行代码, 那么可以省略大括号{ }
  * 并且这行代码的返回值会作为整个函数的返回值
```js
//省略大括号
var foo = name => console.log(name);

// name === "genshin"的结果作为返回值，不用写return
var foo = name => name === "genshin";
console.log(foo("genshin"));  //true
```

* 优化三: 如果函数执行体只有返回一个对象, 那么需要给这个对象加上小括号( )
```js
var arrFn = () => ["abc", "cba"]
var arrFn = () => {} // 注意: 这里是{}执行体
var arrFn = () => ({ name: "why" })
console.log(arrFn())
```
## this规则
* 箭头函数不使用this的四种标准规则（也就是不绑定this），而是根据外层作用域来决定this。

* 应用：在setTimeout的回调函数中可以直接使用this，this引用就会从上层作用于中找到对应的this



# 浏览器渲染原理

![alt text](my_notes_images/08_浏览器渲染.png)

## 一、HTML解析

* 默认情况服务器会给浏览器返回index.html文件，所以解析HTML是所有步骤的开始

* 解析HTML，会构建`DOM Tree`

## 二、生成CSS规则

* 在解析的过程中 遇到CSS的link元素，浏览器会下载对应的CSS文件：

  * 注意：下载CSS文件是不会影响DOM的解析的；

* 浏览器下载完CSS文件后，就会对CSS文件进行解析，解析出对应的规则树：

  * 即`CSSOM Tree`（CSS Object Model，CSS对象模型）；

## 三、构建 Render Tree

* 生成 DOM Tree 和 CSSOM Tree 后，两个结合来构建 `Render Tree`

* 注意一：link元素不会阻塞DOM Tree的构建，但会阻塞Render Tree的构建

  * Render Tree在构建时，需要对应的CSSOM Tree；

* 注意二：Render Tree和DOM Tree并不是一一对应的关系。  
（比如对于display为none的元素，压根不会出现在render tree中）

## 四、布局（layout）和绘制（Paint）

* 第四步是在渲染树（Render Tree）上运行布局（Layout）以计算每个节点的几何体。
  * 渲染树会表示显示哪些节点以及其他样式，但是不表示每个节点的尺寸、位置等信息；
  * 布局是确定呈现树中所有节点的`宽度、高度和位置信息`；

* 第五步是将每个节点绘制（Paint）到屏幕上
  * 在绘制阶段，浏览器将布局阶段计算的每个frame转为屏幕上实际的像素点；
  * 包括将元素的可见部分进行绘制，比如`文本、颜色、边框、阴影、替换元素`（比如img）


## 回流和重绘

* 理解回流reflow（也可以称之为重排）
  * 第一次确定节点的大小和位置，称之为布局（layout）。
  * 之后对节点的大小、位置修改重新计算称之为回流。

* 什么情况下引起回流呢？
  * 比如DOM结构发生改变（添加新的节点或者移除节点）；
  * 比如改变了布局（修改了width、height、padding、font-size等值）
  * 比如窗口resize（修改了窗口的尺寸等）
  * 比如调用getComputedStyle方法获取尺寸、位置信息；

* 理解重绘repaint
  * 第一次渲染内容称之为绘制（paint）。
  * 之后重新渲染称之为重绘。

* 什么情况下会引起重绘呢？
  * 比如修改背景色、文字颜色、边框颜色、样式等；

* 回流一定会引起重绘，所以回流是一件很消耗性能的
事情。

* 所以在开发中要尽量避免发生回流：

1. 修改样式时尽量一次性修改
   * 比如通过cssText修改，比如通过添加class修改

2. 尽量避免频繁的操作DOM
   * 我们可以在一个DocumentFragment或者父元素中
将要操作的DOM操作完成，再一次性的操作

3. 尽量避免通过getComputedStyle获取尺寸、位置等信息

4. 对某些元素使用position的absolute或者fixed
   * 并不是不会引起回流，而是开销相对较小，不会对其他元素造成影响。

## 特殊解析 – composite合成

* 绘制的过程，可以将布局后的元素绘制到多个合成图层中。
  * 这是浏览器的一种优化手段；

* 默认情况下，标准流中的内容都是被绘制在同一个图层（Layer）中的；

* 而一些特殊的属性，会创建一个新的合成层（ CompositingLayer ），并且新的图层可以利用GPU来加速绘制
  * 因为每个合成层都是单独渲染的

* 那么哪些属性可以形成新的合成层呢？常见的一些属性：
  * 3D transforms
  * video、canvas、iframe
  * opacity 动画转换时
  * position: fixed
  * will-change：一个实验性的属性，提前告诉浏览器元素可能发生哪些变化
  * animation 或 transition 设置了opacity、transform

* 分层确实可以提高性能，但是它以内存管理为代价，因此不应作为 web 性能优化策略的一部分过度使用。

# JS执行原理

## script元素和页面解析的关系

* Script元素与页面解析的关系
  * 浏览器在解析HTML时遇到script元素会停止构建DOM树
  * 停止后下载JavaScript代码，并且执行JavaScript的脚本
  * 等到JavaScript脚本执行结束后，再继续解析HTML，构建DOM树

* 遇到script元素停止构建DOM树的原因
  * JavaScript会操作DOM，会修改DOM
  * 如果等到DOM树构建完成并且渲染再执行JavaScript，会造成严重的回流和重绘影响页面的性能
  * 所以遇到script元素时，优先下载和执行JavaScript代码，再继续构建DOM树

* 但是这个也往往会带来新的问题，特别是现代页面开发中
  * 在目前的开发模式中（比如Vue、React），脚本往往比HTML页面更“重”，处理时间需要更长
  * 所以会造成页面的解析阻塞，在脚本下载、执行完成之前，用户在界面上什么都看不到；

* 为了解决这个问题，script元素给我们提供了两个属性（attribute）：`defer`和`async`

* `defer`元素
  * defer让浏览器不等待脚本下载，而继续解析HTML，构建DOM Tree
  * 如果脚本提前下载好了，它会等待DOM Tree构建完成，在DOMContentLoaded事件之前先执行defer中的代码
  * 多个带defer的脚本也可以保持正确的顺序执行
  * 从某种角度来说，defer可以提高页面的性能，并且推荐放到head元素中
  * 注意：defer仅适用于外部脚本，对于script默认内容会被忽略

* `async`元素
  * async 特性与 defer 有些类似，也能够让脚本不阻塞页面。
  * async是让一个脚本完全独立的：；
  * async脚本不能保证顺序，它是独立下载、独立运行，不会等待其他脚本；
  * async不会能保证在DOMContentLoaded之前或者之后执行

* defer和async使用区别
  * defer通常用于需要在文档解析后操作DOM的JavaScript代码，并且对多个script文件有顺序要求的；
  * async通常用于独立的脚本，对其他脚本，甚至DOM没有依赖的；

## V8引擎

  ![alt text](my_notes_images/09_V8引擎流程图.png)

* Parse模块——会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码
  * 如果函数没有被调用，那么是不会被转换成AST的
  * Parse的V8官方文档：https://v8.dev/blog/scanner

* Ignition——是一个解释器，会将AST转换成ByteCode（字节码）
  * 同时会收集TurboFan优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）
  * 如果函数只调用一次，Ignition会解释执行ByteCode
  * Ignition的V8官方文档：https://v8.dev/blog/ignition-interpreter

* TurboFan——是一个编译器，可以将字节码编译为CPU可以直接执行的机器码
  * 如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过TurboFan转换成优化的机器码，提高代码的执行性能
  * 但是，机器码实际上也会被还原为ByteCode，这是因为如果后续执行函数的过程中，类型发生了变化（比如sum函数原来执行的是number类型，后来执行变成了string类型），之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码
  * TurboFan的V8官方文档：https://v8.dev/blog/turbofan-jit

* Blink(拿到代码) -> stream -> scanner(词法分析) -> parser(语法分析)

## JS的执行过程

### 初始化全局对象

* js引擎会在执行代码之前，会在堆内存中创建一个全局对象：Global Object（GO）
  * 该对象 所有的作用域（scope）都可以访问；
  * 里面会包含Date、Array、String、Number、setTimeout、setInterval等等；
  * 其中还有一个window属性指向自己；

### （全局）执行上下文（ Execution Contexts）

* js引擎内部有一个执行上下文栈（Execution Context Stack，简称ECS），它是用于执行代码的调用栈。

* 那么现在它要执行谁呢？执行的是全局的代码块：
  * 全局的代码块为了执行会构建一个 Global Execution Context（GEC）；
  * GEC会 被放入到ECS中 执行；

* GEC被放入到ECS中,ECS里面包含两部分内容：
  * 第一部分：在代码执行前，在parser转成AST的过程中，会将全局定义的变量、函数等加入到GlobalObject中，但是并不会赋值
  * 这个过程也称之为变量的作用域提升（hoisting）
  * 第二部分：在代码执行中，对变量赋值，或者执行其他的函数；

### VO对象（Variable Object）

* 每一个执行上下文会关联一个VO（Variable Object，变量对象），变量和函数声明会被添加到这个VO对象中。

* 当全局代码被执行的时候，VO就是GO对象了

### 函数执行

* 在执行的过程中执行到一个函数时，就会根据函数体创建一个函数执行上下文（Functional Execution Context，简称FEC），并且压入到EC Stack中。

* 每个执行上下文都会关联一个VO
  * 当进入一个函数执行上下文时，会创建一个AO对象（Activation Object）；
  * 这个AO对象会使用arguments作为初始化，并且初始值是传入的参数；
  * 这个AO对象会作为执行上下文的VO来存放变量的初始化
  * VO就是AO对象了

### 作用域链

* 当进入到一个执行上下文时，执行上下文也会关联一个作用域链（Scope Chain）
  * 作用域链是一个对象列表，用于变量标识符的求值；
  * 当进入一个执行上下文时，这个作用域链被创建，并且根据代码类型，添加一系列的对象；
  * 每执行一个函数，这个函数对象就会关联到上一个作用域
  * 作用域链只与创建位置有关，与执行位置无关。

# 内存管理

## 栈与堆

* JavaScript会在定义数据时为我们分配内存。

* JS对于原始数据类型内存的分配会在执行时，直接在栈空间进行分配；

* JS对于复杂数据类型内存的分配会在堆内存中开辟一块空间，并且将这块空间的指针返回值变量引用；

## 垃圾回收

* 内存有限，内存不再需要的时候，需要对其释放，腾出内存空间

* 垃圾回收机制
  * 垃圾回收的英文是`Garbage Collection`，简称`GC`
  * 对于那些不再使用的对象，我们都称之为是垃圾，它需要被回收，以释放更多的内存空间
  * 垃圾回收器我们也会简称为GC，所以在很多地方你看到GC其实指的是垃圾回收器

## GC的实现以及对应的算法

* 引用计数（Reference counting）
  * 当一个对象有一个引用指向它时，那么这个对象的引用就+1
  * 当一个对象的引用为0时，这个对象就可以被销毁掉
  * 弊端：会产生循环引用（obj1.info = obj2 , obj2.info = obj1）

* 标记清除（mark-Sweep）
  * 标记清除的核心思路是可达性（Reachability）
  * 这个算法是设置一个根对象（root object），垃圾回收器会定期从这个根开始，找所有从根开始有引用到的对象，对于哪些没有引用到的对象，就认为是不可用的对象
  * 这个算法可以很好的解决循环引用的问题

* 标记整理（Mark-Compact） 和“标记－清除”相似；
  * 不同的是，回收期间同时会将保留的存储对象搬运汇集到连续的内存空间，从而整合空闲空间，避免内存碎片化

* 分代收集（Generational collection）—— 对象被分成两组：“新的”和“旧的”
  * 许多对象出现，完成它们的工作并很快死去，它们可以很快被清理
  * 那些长期存活的对象会变得“老旧”，而且被检查的频次也会减少

* 增量收集（Incremental collection）
  * 如果有许多对象，并且我们试图一次遍历并标记整个对象集，则可能需要一些时间，并在执行过程中带来明显的延迟
  * 所以引擎试图将垃圾收集工作分成几部分来做，然后将这几部分会逐一进行处理，这样会有许多微小的延迟而不是一个大的延迟

* 闲时收集（Idle-time collection）
  * 垃圾收集器只会在 CPU 空闲时尝试运行，以减少可能对代码执行的影响。

# 闭包

## 理解闭包
* 一个普通的函数function，如果它可以访问外层作用域的自由变量，那么这个函数和周围环境就是一个闭包；
* 从广义的角度来说：JavaScript中的函数都是闭包；
* 从狭义的角度来说：JavaScript中一个函数，如果访问了外层作用域的变量，那么它是一个闭包；

## 闭包引起内存泄漏

* 假如有以下代码：
```js
function createAdder(count) {
      function adder(num) {
        return count + num
      }

      return adder
    }

    var adder5 = createAdder(5)
    adder5(100)
    adder5(55)
    adder5(12)

    var adder8 = createAdder(8)
    adder8(22)
    adder8(35)
    adder8(7)

    console.log(adder5(24))
    console.log(adder8(30))

    // 从这里开始永远不会再使用adder8
    // 内存泄漏: 对于那些我们永远不会再使用的对象, 但是对于GC来说, 它不知道要进行释放的对应内存会依然保留着
    adder8 = null
```
* 那么就会形成以下内存情况，由于从根节点开始，都能找到所有引用对象，所以以下对象都会保存。即有作用域指向了0xb00和0xc00，所以adder5和adder8都不会自动销毁。












![alt text](my_notes_images/10.闭包形成内存图.png)












* 内存泄漏

  * 在上面的案例中，如果后续我们不再使用adder5和adder8函数了，那么该函数对象应该要被销毁掉，并且其引用着的父作用域AO也应该被销毁掉

  * 但是在全局作用域下adder5和adder8变量对0xb00和0xc00的函数对象有引用，而0xb00的作用域中AO（0x200）有引用，0xc00的作用域同上，所以最终会造成这些内存都是无法被释放的

  * 所以闭包会造成内存泄露，一般是由于全局作用域对内层作用域有引用，造成·引用链中的所有对象都是无法释放

* 想要销毁，`adder8 = null `，即给想要销毁的对象赋值为空即可。

* 浏览器优化
  * 假如一个AO对象不被销毁，但是里面没有使用过的属性却会被释放。
  * 例子：
  ```js
  function foo() {
      var name = "foo"
      var age = 18
      var height = 1.88

      function bar() {
        debugger
        console.log(name)
      }

      return bar
    }

    var fn = foo()
    fn()
  ```
  如下，age和height可以访问，name不可访问，证明age和height被释放了










  ![alt text](my_notes_images/11.浏览器优化释放属性.png)














# 函数、对象及其他增强知识

## 函数增强知识

### 函数属性和arguments
* name:一个函数的名词我们可以通过name来访问
```js
function foo() {
}
console.log(foo.name) // foo
```

* length:属性length用于返回函数参数的个数  
ps：rest参数不参与参数的个数，放入的参数也不参与，有默认值的参数也不参与

```js
function test(...args) {
}
test(111, 222, 333)
console.log(foo.length) // 0

function foo(x,y,...args) {
}
console.log(foo.length) // 2
```

* 理解arguemrnt
  * arguments 是一个 对应于 传递给函数的参数 的 类数组(array-like)对象

  * 箭头函数是不绑定arguments的，所以我们在箭头函数中使用arguments会去上层作用域查找

  * array-like意味着它不是一个数组类型，而是一个对象类型
    * 但是它却拥有数组的一些特性，比如说length，比如可以通过index索引来访问
    * 但是它却没有数组的一些方法，比如filter、map等

* arguments转Array  
假如在一个函数内部有以下js代码：
  1. 遍历arguments，添加到一个新数组中
  ```js
  var newArguments = []
  for (var arg of arguments) {
    newArguments.push(arg)
  }
  console.log(newArguments)
  ```

  2. 调用数组slice函数的call方法
  ```js
  var newArgs = [].slice.apply(arguments)
  console.log(newArgs)
  ```

  3. ES6中的两个方法
  ```js
  var newArgs1 = Array.from(arguments)
  console.log(newArgs1)
  var newArgs2 = [...arguments]
  console.log(newArgs2)
  ```
* 函数剩余(rest)参数
  * 用法：最后一个参数并以 ... 为前缀的参数，那么它会将剩余的参数放到该参数中，并且作为一个数组。
  ```js
  function foo(x,y,...args){
  }
  function bar(...args){
  }
  ```
  * 剩余参数和arguments的区别
    * 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参
    * arguments对象不是一个真正的数组，而rest参数是一个真正的数组，可以进行数组的所有操作
    * arguments是早期的ECMAScript中为了方便去获取所有的参数提供的一个数据结构，而rest参数是ES6中提供并且希望以此来替代arguments的
  * 剩余参数必须放到最后一个位置，否则会报错。

### 纯函数

* 理解纯函数

  * 确定的输入，一定会产生确定的输出
  * 函数在执行过程中，不能产生副作用（修改全局变量等的内容“触发事件”，使输出设备输出，或更改输出值以外物件的内容）
  * 函数的输出和输入值以外的其他隐藏信息或状态无关，也和由I/O设备产生的外部输出无关

* 副作用概念的理解

  * 在执行一个函数时，除了返回函数值之外，还对调用函数产生了附加的影响，比如修改了全局变量，修改参数或者改变外部的存储；
  * 副作用往往是产生bug的 “温床”

* 举例

  * slice：slice截取数组时不会对原数组进行任何操作,而是生成一个新的数组
  * splice：splice截取数组, 会返回一个新的数组, 也会对原数组进行修改
  * slice就是一个纯函数，不会修改数组本身，而splice函数不是一个纯函数

* 纯函数的优势与作用

  * 因为你可以安心的编写和安心的使用
  * 你在写的时候保证了函数的纯度，只是单纯实现自己的业务逻辑即可，不需要关心传入的内容是如何获得的或者依赖其他的外部变量是否已经发生了修改
  * 你在用的时候，你确定你的输入内容不会被任意篡改，并且自己确定的输入，一定会有确定的输出

### 柯里化函数（Currying）

* 解释
  * 是把接收多个参数的函数，变成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数，而且返回结果的新函数的技术
  * 柯里化声称 “如果你固定某些参数，你将得到接受余下参数的一个函数”
  * 将一个函数从可调用的 `f(a, b, c)` 转换为可调用的 `f(a)(b)(c)`
  ```js
  // 普通的函数
  function foo1(x, y, z) {
    console.log(x + y + z)
  }

  // 柯里化函数
  function foo2(x) {
    return function(y) {
      return function(z) {
        console.log(x + y + z)
      }
    }
  }

  var foo3 = x => y => z => console.log(x + y + z)
  ```
* 优势
  * 让一个函数处理的问题尽可能的单一
  * 帮助复用参数逻辑，传入过的参数不需再传入
  * 可以将每次传入的参数在单一的函数中进行处理，处理完后在下一个函数中再使用处理后的结果
  ```js
  function logInfo(date) {
      return function(type) {
        return function(message) {
          console.log(`时间:${date} 类型:${type} 内容:${message}`)
        }
      }
    }
  var logToday = logInfo("2022-06-01")
  var logTodayDebug = logToday("DEBUG")
  var logTodayFeature = logToday("FEATURE")

  //都是2022-06-01当天的内容，不需要再传入日期，logToday已经处理过了。

  // 打印debug日志（修复）
  logTodayDebug("修复了从服务器请求数据后展示的bug")
  logTodayDebug("修复界面搜索按钮点击的bug")
  // 打印debug日志（新增）
  logTodayFeature("新建过滤功能")
  logTodayFeature("新建搜索功能")
  ```

  * 自动化
  ```js
  function hyCurrying(fn) {
    function curryFn(...args) {
      // 两类操作:
      // 第一类操作: 继续返回一个新的函数, 继续接受参数
      // 第二类操作: 直接执行fn的函数
      if (args.length >= fn.length) { // 执行第二类
        return fn(...args)
        //return fn.apply(this, args)
      } else { // 执行第一类
        return function(...newArgs) {
          return curryFn(...args.concat(newArgs))
          //return curryFn.apply(this, args.concat(newArgs))
        }
      }
    }
   return curryFn
  }
  ```
### 组合函数
* 对某一个数据进行函数的调用，执行两个函数fn1和fn2(或者说更多的函数)，这两个函数是依次执行的，将这两个函数组合起来，自动依次调用，这个过程我们称之为组合函数（Compose Function）
```js
// 第一步对数字*2
function double(num) {
  return num * 2
}
// 第二步对数字**2
function pow(num) {
  return num ** 2
}
// 将上面的两个函数组合在一起, 生成一个新的函数
function composeFn(num) {
  return pow(double(num))
}

//泛用型组合函数
function composeFn(...fns) {
  // 1.边界判断(edge case)
  var length = fns.length
  if (length <= 0) return
  for (var i = 0; i < length; i++) {
    var fn = fns[i]
    if (typeof fn !== "function") {
      throw new Error(`index position ${i} must be function`)
    }
  }

  // 2.返回的新函数
  return function(...args) {
    var result = fns[0].apply(this, args)
    for (var i = 1; i < length; i++) {
      var fn = fns[i]
      result = fn.apply(this, [result])
    }
    return result
  }
}
```

## with和eval
* with语句 扩展一个语句的作用域链。
* 不建议使用with语句，因为它可能是混淆错误和兼容性问题的根源。
```js
var obj = {
  message:"我是信息"
}
with(obj){
  console.log(message) //会访问obj里面的message
}
```

* eval是一个特殊的函数，它可以将传入的字符串当做JavaScript代码来运行；
* eval会将最后一句执行语句的结果，作为返回值；
* eval代码的可读性非常的差（代码的可读性是高质量代码的重要原则）；
* eval是一个字符串，那么有可能在执行的过程中被刻意篡改，那么可能会造成被攻击的风险；
* eval的执行必须经过JavaScript解释器，不能被JavaScript引擎优化；

## 严格模式

* 理解严格模式
  *  具有限制性的JavaScript模式，使代码隐式的脱离了懒散（sloppy）模式
  *  支持严格模式的浏览器在检测到代码中有严格模式时，会以更加严格的方式对代码进行检测和执行
  *  严格模式通过 抛出错误 来消除一些原有的 静默（silent）错误
  *  严格模式让JS引擎在执行代码时可以进行更多的优化（不需要对一些特殊的语法进行处理）
  *  严格模式禁用了在ECMAScript未来版本中可能会定义的一些语法

* 开启严格模式
  * 通过在文件或者函数开头使用 `use strict` 来开启
  * 现代 JavaScript 支持 “class” 和 “module” ，它们会自动启用 use strict

* 严格模式的一些限制
  1. 无法意外的创建全局变量（不使用var）
  2. 严格模式会使引起静默失败(silently fail,注:不报错也没有任何效果)的赋值操作抛出异常
  3. 严格模式下试图删除不可删除的属性
  4. 严格模式不允许函数参数有相同的名称
  5. 不允许0的八进制语法
  6. 在严格模式下，不允许使用with
  7. 在严格模式下，eval不再为上层引用（创建）变量
  8. 严格模式下，this绑定不会默认转成对象
```js
//发现静默错误
"use strict"
var obj = {
  name: "why"
}

Object.defineProperty(obj, "name", {
  writable: false,
  configurable: false
})

obj.name = "kobe"   //会抛出错误
console.log(obj.name)

delete obj.name    //会抛出错误
console.log(obj)
```

## 对象增强知识

### 对象的属性及其控制

* 如果我们想要对一个属性进行比较精准的操作控制，那么我们就可以使用`属性描述符`
  * 通过属性描述符可以精准的添加或修改对象的属性
  * 属性描述符需要使用 `Object.defineProperty` 来对属性进行添加或者修改

* `Object.defineProperty(obj, prop, descriptor)`
  * obj：定义属性的对象
  * prop：定义或修改的属性的名称或 Symbol
  * descriptor：定义或修改的属性描述符
  * 返回值：返回被传递给函数的对象

* 属性描述符的类型有两种：
  * 数据属性（Data Properties）描述符（Descriptor）
  * 存取属性（Accessor访问器 Properties）描述符（Descriptor）

### 数据属性描述符

* `Configurable`：表示属性是否可以通过delete删除属性，是否可以修改它的特性，或者是否可以将它修改为存取属性描述符
  * 当我们直接在一个对象上定义某个属性时，这个属性的Configurable为true
  * 当我们通过属性描述符定义一个属性时，这个属性的Configurable默认为false

* `Enumerable`：表示属性是否可以通过for-in或者Object.keys()返回该属性
  * 当我们直接在一个对象上定义某个属性时，这个属性的Enumerable为true
  * 当我们通过属性描述符定义一个属性时，这个属性的Enumerable默认为false

* `Writable`：表示是否可以修改属性的值
  * 当我们直接在一个对象上定义某个属性时，这个属性的Writable为true
  * 当我们通过属性描述符定义一个属性时，这个属性的Writable默认为false

* `value`：属性的value值，读取属性时会返回该值，修改属性时，会对其进行修改
  * 默认情况下这个值是undefined
```js
var obj = {
  name: "why", // configurable: true
  age: 18
}

Object.defineProperty(obj, "name", {
  configurable: false, // 告诉js引擎, obj对象的name属性不可以被删除
  enumerable: false, // 告诉js引擎, obj对象的name属性不可枚举(for in/Object.keys)
  writable: false, // 告诉js引擎, obj对象的name属性不写入(只读属性 readonly)
  value: "coderwhy" // 告诉js引擎, 返回这个value
})
```

### 存储属性描述符

* `Configurable`：表示属性是否可以通过delete删除属性，是否可以修改它的特性，或者是否可以将它修改为存取属性描述符
  * 和数据属性描述符是一致的
  * 当我们直接在一个对象上定义某个属性时，这个属性的Configurable为true
  * 当我们通过属性描述符定义一个属性时，这个属性的Configurable默认为false

* `Enumerable`：表示属性是否可以通过for-in或者Object.keys()返回该属性
  * 和数据属性描述符是一致的
  * 当我们直接在一个对象上定义某个属性时，这个属性的Enumerable为true
  * 当我们通过属性描述符定义一个属性时，这个属性的Enumerable默认为false

* `get`：获取属性时会执行的函数。默认为undefined

* `set`：设置属性时会执行的函数。默认为undefined
```js
// vue2响应式原理
var obj = {
  name: "why"
}
// 对obj对象中的name添加描述符(存取属性描述符)
var _name = ""
Object.defineProperty(obj, "name", {
  configurable: true,
  enumerable: false,
  set: function(value) {
    console.log("set方法被调用了", value)
    _name = value
  },
  get: function() {
    console.log("get方法被调用了")
    return _name
  }
})
```
### 对象方法补充

* 定义多个属性 `Object.defineProperties`
```js
var obj = {
  name: "why",
  age: 18,
  height: 1.88
}

Object.defineProperties(obj, {
  name: {
    configurable: true,
  },
  age: {
  },
  height: {
  }
})
```

* 获取对象的属性描述符：
  * `getOwnPropertyDescriptor`
  * `getOwnPropertyDescriptors`

* 禁止对象扩展新属性：`preventExtensions`
  * 给一个对象添加新的属性会失败（在严格模式下会报错）

* 密封对象，不允许配置和删除属性：`seal`
  * 实际是调用preventExtensions
  * 并且将现有属性的configurable:false

* 冻结对象，不允许修改现有属性： `freeze`
  * 实际上是调用seal
  * 并且将现有属性的writable: false

## 面相对象的编程
### 面向对象有三大特性：封装、继承、多态
  * 封装：我们前面将属性和方法封装到一个类中，可以称之为封装的过程；
  * 继承：继承是面向对象中非常重要的，不仅仅可以减少重复代码的数量，也是多态前提（纯面向对象中）
  * 多态：不同的对象在执行时表现出不同的形态

### 继承
  * 继承可以帮助我们将重复的代码和逻辑抽取到父类中，子类只需要直接继承过来使用即可
  * 在很多编程语言中，继承也是多态的前提

### 多态

* 解释
  * 维基百科对多态的定义：多态（英语：polymorphism）指为不同数据类型的实体提供统一的接口，或使用一个单一的符号
来表示多个不同的类型。
  * 非常的抽象，个人的总结：不同的数据类型进行同一个操作，表现出不同的行为，就是多态的体现。

* 严格意义上的多态
    1. 必须有继承(实现接口)
    2. 必须有父类引用指向子类对象
```js
// 继承是多态的前提
// shape形状
class Shape {
  getArea() {}
}

class Rectangle extends Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }

  getArea() {
    return this.width * this.height
  }
}

class Circle extends Shape {
  constructor(radius) {
    super()
    this.radius = radius
  }

  getArea() {
    return this.radius * this.radius * 3.14
  }
}

var rect1 = new Rectangle(100, 200)
var rect2 = new Rectangle(20, 30)
var c1 = new Circle(10)
var c2 = new Circle(15)

// 表现形式就是多态
/*
  在严格意义的面向对象语言中, 多态的是存在如下条件的:
    1.必须有继承(实现接口)
    2.必须有父类引用指向子类对象
*/
function getShapeArea(shape) {
  console.log(shape.getArea())
}

getShapeArea(rect1)
getShapeArea(c1)
```
* JS中的多态
```js
// 多态的表现: JS到处都是多态
function sum(a1, a2) {
  return a1 + a2
}

sum(20, 30)
sum("abc", "cba")

// 多态的表现
var foo = 123
foo = "Hello World"
console.log(foo.split())
foo = {
  running: function() {}
}
foo.running()
foo = []
console.log(foo.length)
```


# ES5中的继承

## 对象和函数的原型

### 对象的原型

* 每个对象都有一个特殊的内置属性 `[[prototype]]`，这个特殊的对象可以指向另外一个对象。（也可以说是隐式原型）

* 作用
  * 当我们通过引用对象的属性key来获取一个value时，它会触发`[[Get]]`的操作
  * 这个操作会首先检查该对象是否有对应的属性，如果有的话就使用它
  * 如果对象中没有改属性，那么会访问对象`[[prototype]]`内置属性指向的对象上的属性

* 获取方式
  * 方式一：通过对象的`__proto__`属性可以获取到（但是这个是早期浏览器自己添加的，存在一定的兼容性问题）
  * 方式二：通过 `Object.getPrototypeOf(obj)` 方法可以获取到

* 设置方式： `Object.setPrototypeOf(obj,proto)` 

### 函数的原型

* 所有的函数都有一个`[[prototype]]`的属性和一个`prototype`的属性  
（注意区分，前者是隐式原型，后者是显式原型）
  * `[[prototype]]`作用：查找key对应的value时, 会找到原型身上
  * `prototype`作用：用来构建对象时, 给对象设置隐式原型的

* new操作符、构造函数和原型组合

  1. 在内存中创建一个新的对象（空对象）

  2. `这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性`

  3. 构造函数内部的this，会指向创建出来的新对象

  4. 执行函数的内部代码（函数体代码）

  5. 如果构造函数没有返回非空对象，则返回创建出来的新对象

  * 意味着我们通过Person构造函数创建出来的所有对象的`[[prototype]]`属性都指向`Person.prototype`

  * 避免创建出重复的函数，比如running、eating这些函数
  ```js
  function Student(name, age, sno) {
    this.name = name
    this.age = age
  }
  // 当我们多个对象拥有共同的值时, 我们可以将它放到构造函数对象的显式原型
  // 由构造函数创建出来的所有对象, 都会共享这些属性
  Student.prototype.running = function() {
    console.log(this.name + " running")
  }
  var stu1 = new Student("why", 18, 111)
  var stu2 = new Student("kobe", 30, 112)
  stu1.running()
  stu2.running()
  ```
* constructor
  *  默认情况下原型上都会添加一个属性叫做constructor，这个constructor指向当前的函数对象














  ![alt text](my_notes_images/12.原型内存图.png)

* 重写原型对象
  * 如果我们需要在原型上添加过多的属性，通常我们会重写整个原型对象

  * 同时创建它的prototype对象, 这个对象也会自动获取constructor属性  
  而我们这里相当于给prototype重新赋值了一个对象, 那么这个新对象的constructor属性, 会指向Object构造函数, 而不是Person构造函数了

  * 如果希望constructor指向Person，那么可以手动添加：

  * 上面的方式虽然可以, 但是也会造成constructor的[[Enumerable]]特性被设置了true.
    * 默认情况下, 原生的constructor属性是不可枚举的.
    * 如果希望解决这个问题, 就可以使用我们前面介绍的Object.defineProperty()函数

  ```js
  function Person() {
  }
  console.log(Person.prototype)
  
  // 在原有的原型对象上添加新的属性
  // Person.prototype.message = "Hello Person"
  // Person.prototype.info = { name: "哈哈哈", age: 30 }
  // Person.prototype.running = function() {}
  // Person.prototype.eating = function() {}
  // console.log(Person.prototype)
  // console.log(Object.keys(Person.prototype))

  // 直接赋值一个新的原型对象
  Person.prototype = {
    message: "Hello Person",
    info: { name: "哈哈哈", age: 30 },
    running: function() {},
    eating: function() {},
    // constructor: Person    
  }
  //constructor指向Person
  Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: Person
  })
  ```
## 原型链

### JS的原型链
* 理解原型链
  * 从一个对象上获取属性，如果在当前对象中没有获取到就会去它的原型上面获取
```js
    // 2.原型链
    var obj = {
      name: "why",
      age: 18
    }
    // 对于上面obj的查找顺序
    // 1.obj上面查找
    // 2.obj.__proto__上面查找
    // 3.obj.__proto__.__proto__ -> null 上面查找(undefined)
    // console.log(obj.message)

    obj.__proto__ = {
      // message: "Hello aaa"
    }

    obj.__proto__.__proto__ = {
      // message: "Hello bbbb"
    }

    obj.__proto__.__proto__.__proto__ = {
      //message: "Hello ccc"
    }

    console.log(obj.__proto__.__proto__.__proto__.__proto__)
    //如上一层一层寻找原型中的属性，就形成了原型链，直到尽头
    console.log(obj.message)
```
* 原型链的尽头——object的原型

  * **我的理解**：最后一个_proto_是object类中显示原型prototype指向的原型对象中的隐式原型，而这个_proto_ 指向 null，即为尽头

  * 即最后会打印[Object: null prototype] {}
    * 丛Object直接创建出来的对象的原型都是 [Object: null prototype] {}
    * 这个原型就是我们最顶层的原型了
  
  * 那么我们可能会问题： [Object: null prototype] {} 原型有什么特殊吗？
    *  特殊一：该对象有原型属性，但是它的原型属性已经指向的是null，也就是已经是顶层原型了；
    *  特殊二：该对象上有很多默认的属性和方法；

* 原型链最顶层的原型对象就是Object的原型对象，Object是所有类的父类。

* 原型链内存图
![alt text](my_notes_images/13.原型链内存图.png)

















## 实现继承

### 原型链实现方法继承

* 方法：创建一个父类的实例对象(new Person()), 用这个实例对象来作为子类的原型对象
```js
var p = new Person("属性")
Student.prototype = p
```
* 缺点：只能继承方法，属性取决于这个实例对象的属性
  * 直接打印对象是看不到继承的属性
  * 属性会被多个对象共享，如果这个对象是一个引用类型，那么就会造成问题

* 实例
```js
//定义父类
//Person类的属性与方法
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.running = function() {
    console.log("I can running")
}
Person.prototype.eating = function() {
    console.log("I can eating")
}

//定义子类 student类
function Student(name, age, sno) {
    // this.name = name
    // this.age = age
    this.sno = sno
}

//方法一：父类的原型直接赋值给子类的原型
// 缺点: 父类和子类共享通一个原型对象, 修改了任意一个, 另外一个也被修改
// Student.prototype = Person.prototype

//方法二：创建一个父类的实例对象(new Person()), 用这个实例对象来作为子类的原型对象
//缺点：只能继承方法，属性取决于这个实例对象的属性。
var p = new Person("parents",50)
Student.prototype = p

var stu1 = new Student("kobes",18,111)
var stu2 = new Student("james",20,222)

stu1.running()  //输出I can running
console.log(stu1,stu2);  //输出对象中根本没有name和age，继承失败
console.log(stu1.name,stu2.name);  //输出的都是parents，因为都是从同一个原型p中寻找的

```

### 构造函数实现属性继承

* 方法：在子类型构造函数的内部调用父类型构造函数
```js
Person.call(this,"属性") //this会绑定子类对象
```
  * 因为函数可以在任意的时刻被调用；
  * 因此通过apply()和call()方法也可以在新创建的对象上执行构造函数；

```js
//定义父类
//Person类的属性与方法
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.running = function() {
    console.log("I can running")
}
Person.prototype.eating = function() {
    console.log("I can eating")
}

//定义子类 student类
function Student(name, age, sno) {
    // 重点: 借用构造函数，继承属性
    Person.call(this,name,age)
    this.sno = sno
}

//继承方法
var p = new Person("parents",50)
Student.prototype = p

var stu1 = new Student("kobes",18,111)
var stu2 = new Student("james",20,222)

stu1.running()  //输出I can running
console.log(stu1,stu2);  //输出对象中name和age成功继承下来了
console.log(stu1.name,stu2.name);  //输出kobs和james
```
### 组合继承的缺点
* 会调用两次父类构造函数
  * 一次在创建子类原型的时候；
  * 另一次在子类构造函数内部(也就是每次创建子类实例的时候)；

* 所有的子类实例事实上会拥有两份父类的属性
  * 一份在当前的实例自己里面(也就是student本身的)，另一份在子类对应的原型对象中(也就是student.__proto__里面)
  * 当然，这两份属性我们无需担心访问出现问题，因为默认一定是访问实例本身这一部分的

### 最终方案——寄生组合式继承（优化方法继承）
* 最终的目的：student对象的原型指向了person对象
* 发展过程
```js
function Person(name, age, height) {} //父类
function Student() {}  //子类

// 1.之前的做法
// var p = new Person()
// Student.prototype = p

// 2.方案一:
var obj = {}
Object.setPrototypeOf(obj, Person.prototype)
Student.prototype = Person.prototype

// 3.方案二:
function F() {}
F.prototype = Person.prototype
Student.prototype = new F()

// 4.方案三:
var obj = Object.create(Person.prototype)
Student.prototype = obj
```
* 将上面方案三规范化，得到最终结果
```js
// 创建对象的过程 
//相当于Object.create(Person.prototype)
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// 将Subtype和Supertype联系在一起
// 寄生式函数
function inherit(Subtype, Supertype) {
  Subtype.prototype = createObject(Supertype.prototype)
  Object.defineProperty(Subtype.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: Subtype
  })
}

// 寄生组合式继承
// 原型链/借用/原型式(对象之间)/寄生式函数
function Person(name, age, height) {
  this.name = name
  this.age = age
  this.height = height
}

Person.prototype.running = function() {
  console.log("running~")
}
Person.prototype.eating = function() {
  console.log("eating~")
}


function Student(name, age, height, sno, score) {
  Person.call(this, name, age, height)   //属性继承
  this.sno = sno
  this.score = score
}

inherit(Student, Person)  //方法继承
Student.prototype.studying = function() {
  console.log("studying")
}

// 创建实例对象
var stu1 = new Student("why", 18, 1.88, 111, 100)
```

## 对象方法补充

* hasOwnProperty
  * 对象是否有某一个属于自己的属性（不是在原型上的属性）
```js
obj.hasOwnProperty("name")
```

* in/for in 操作符
  * 判断某个属性是否在某个对象或者对象的原型上
```js
console.log("name" in obj)
for (var key in obj) {
  console.log(key)
}
```

* instanceof
  * 用于检测构造函数（Person、Student类）的pototype，是否出现在某个实例对象的原型链上（对象与构造函数）
```js
console.log(stu instanceof Student)
```

* isPrototypeOf
  * 用于检测某个对象，是否出现在某个实例对象的原型链上（对象与对象的关系）
```js
console.log(Person.prototype.isPrototypeOf(stu))
console.log(obj1.isPrototypeOf(obj2))
```
* 类方法定义
  * 直接` 类.方法 = ...` 即可创建
## 总结

* Object是所有类的父类，是原型链的尽头。
  * 所有类的原型对象中的_proto_尽头都指向Object的原型对象（包括Function）
  * Object的原型对象的_proto_指向null

* 所有构造函数（类）都是由Function创建出来的。
  * 所有构造函数（类）本身的_proto_指向Function的原型对象（包括Function自己）

* Object和Function很特殊
  * Object是Function的父类
  * Function是Object的构造函数

```js
var obj = {} // new Object()
console.log(obj.__proto__) // Object.prototype

function foo() {} // new Function()
function Person() {} 
console.log(foo.__proto__) // Function.prototype


console.log(foo.__proto__ === Function.prototype)//true
console.log(Person.__proto__ === Function.prototype)//true
console.log(foo.__proto__ === Person.__proto__)//true
console.log(Object.__proto__ === Function.prototype)//true
console.log(Function.__proto__ === Function.prototype)//true

console.log(Object.__proto__)   //Function.prototype
console.log(Object.prototype.__proto__)  //null
console.log(Function.__proto__)  //Function.prototype
console.log(Function.prototype.__proto__)  //object.prototype
```

# ES6中的继承

## class 对象

* class定义类
  * 在ES6（ECMAScript2015）新的标准中使用了`class`关键字来直接定义类
  * 但是类本质上依然是前面所讲的构造函数、原型链的语法糖而已
  * 可以使用两种方式来声明类：类声明和类表达式；
  ```js
  class Person{}  //类声明
  var Student = class{}  //类表达式
  ```

* 类和ES5中构造函数的异同
  * 类和我们的构造函数的特性其实是一致的
  * 类不作为普通函数调用，但构造函数可以
  ```js
  class Person{}
  Person()  //报错
  ```

* 类的构造函数
  * 每个类都可以有一个自己的构造函数（方法），这个方法的名称是固定的`constructor`
  * 当我们通过new操作符，操作一个类的时候会调用这个类的构造函数constructor
  * 每个类只能有一个构造函数，如果包含多个构造函数，那么会抛出异常
  ```js
  class Person{
    constructor(name,age){
      this.name = name
      this.age = age
    }
  }
  ```

* 当我们通过new关键字操作类的时候，会调用这个constructor函数，并且执行如下操作：
  1. 在内存中创建一个新的对象（空对象）；
  2. 这个对象内部的`[[prototype]]`属性会被赋值为该类的`prototype`属性；
  3. 构造函数内部的this，会指向创建出来的新对象；
  4. 执行构造函数的内部代码（函数体代码）；
  5. 如果构造函数没有返回非空对象，则返回创建出来的新对象；

* 类的实例方法
  * 在上面我们定义的属性都是直接放到了this上，也就意味着它是放到了创建出来的新对象中：
  * 在前面我们说过对于实例的方法，我们是希望放到原型上的，这样可以被多个实例来共享；
  * 这个时候我们可以直接在类中定义,方法名+大括号：
```js
class Person{
  running() {
    console.log("running~")
  }
}
```

* 类的静态方法
  * 静态方法通常用于定义直接使用类来执行的方法，不需要有类的实例，使用static关键字来定义
```js
class Person{
  constructor(age){
    this.age = age
  }
  static create(){  //定义静态方法
    return new this(Math.floor(Math.random() * 100))
  }
}
```
* 类的访问器方法（对象的也可以这样定义）
  * 即 `get` 和 `set` 函数  
  分别是获取属性时会执行的函数和设置属性时会默认执行的函数
  * 也可以直接调用
```js
class Person {
  // 程序员之间的约定: 以_开头的属性和方法, 是不在外界访问的
  constructor(name) {
    this._name = name
  }

  set name(value) {
    console.log("设置name")
    this._name = value
  }

  get name() {
    console.log("获取name")
    return this._name
  }
}

var p1 = new Person("why", 18)
p1.name = "kobe"    //默认调用set
console.log(p1.name)  //默认调用get
```
## 类的继承

* extends(方法继承)
```js
class Person{}
class Student extends Person{}  //实现（方法）继承
```

* supper（可以属性继承）
  * super的使用位置有三个：子类的构造函数、实例方法、静态方法  
  **PS：在子类的构造函数中使用this或者返回默认对象之前，必须先通过super调用父类的构造函数！**
```js
//定义父类
class Person {
  constructor(name, age) {   
    this.name = name
    this.age = age
  }
  eating() {
    console.log("eating~")
  }
  static sleep{
    console.log("sleep~")
  }

}

class Student extends Person {
  constructor(name, age, sno, score) {
    super(name, age)       //继承父类的属性
    this.sno = sno
    this.score = score
  }
  eating() {           //重写，保留父类方法，并新增功能
    console.log("学校食堂") 
    super.running()    // 调用父类的方法
  }
  static sleep() {     //重写，保留父类方法，并新增功能
    console.log("学校寝室")
    super.sleep()      // 调用父类的方法
  }
}
```
* 继承内置类
  * 一般是给内置类添加新功能
  * ES6中继承给新类，并添加方法
  * ES5，直接在原型上添加方法
```js
class HYArray extends Array {    //ES6,继承给新类
  get lastItem() {
    return this[this.length - 1]
  }
}
```
  
```js
Array.prototype.lastItem = function() {  //ES5，直接在原型上添加方法
  return this[this.length - 1]
}
```
* 实现多继承（类的混入mixin）
```js
// JavaScript只支持单继承(不支持多继承)
function mixinAnimal(BaseClass) {
  return class extends BaseClass {
    running() {
      console.log("running~")
    }
  }
}

function mixinRunner(BaseClass) {
  return class extends BaseClass {
    flying() {
      console.log("flying~")
    }
  }
}
//实现多继承
// var NewBird = mixinRunner(mixinAnimal(Bird))
class NewBird extends mixinRunner(mixinAnimal(Bird)) {
}
var bird = new NewBird()
bird.flying()
bird.running()
bird.eating()
```

# 手写apply-call-bind

## 手写apply

```js
Function.prototype.hyapply = function(thisArg, otherArgs) {
  // 获取thisArg, 并且确保是一个对象类型
  thisArg = (thisArg === null || thisArg === undefined)? window: Object(thisArg)

  // thisArg.fn = this
  //让fn等于this，即调用apply的函数(假设为foo)。
  Object.defineProperty(thisArg, "fn", {
    enumerable: false,
    configurable: true,
    value: this
  })
  //通过thisArg调用fn(foo)，这样会隐式绑定thisArg
  thisArg.fn(...otherArgs)

  delete thisArg.fn
}
```
## 手写call

```js
Function.prototype.hycall = function(thisArg, ...otherArgs) {
  // 获取thisArg, 并且确保是一个对象类型
  thisArg = (thisArg === null || thisArg === undefined)? window: Object(thisArg)

  // thisArg.fn = this
  Object.defineProperty(thisArg, "fn", {
    enumerable: false,
    configurable: true,
    value: this
  })
  thisArg.fn(...otherArgs)

  delete thisArg.fn
}
```
## 封装call和apply

```js
Function.prototype.hyexec = function(thisArg, otherArgs) {
  // 获取thisArg, 并且确保是一个对象类型
  thisArg = (thisArg === null || thisArg === undefined)? window: Object(thisArg)

  // thisArg.fn = this
  Object.defineProperty(thisArg, "fn", {
    enumerable: false,
    configurable: true,
    value: this
  })
  thisArg.fn(...otherArgs)

  delete thisArg.fn
}

// 1.给函数对象添加方法: hyapply
Function.prototype.hyapply = function(thisArg, otherArgs) {
  this.hyexec(thisArg, otherArgs)
}
// 2.给函数对象添加方法: hycall
Function.prototype.hycall = function(thisArg, ...otherArgs) {
  this.hyexec(thisArg, otherArgs)
}
```
## 手写bind

```js
Function.prototype.hybind = function(thisArg, ...otherArgs) {
  // console.log(this) // -> foo函数对象
  thisArg = thisArg === null || thisArg === undefined ? window: Object(thisArg)
  Object.defineProperty(thisArg, "fn", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: this
  })

  return (...newArgs) => {
    // var allArgs = otherArgs.concat(newArgs)
    var allArgs = [...otherArgs, ...newArgs]
    thisArg.fn(...allArgs)
  }
}
```

# ES6新特性

## ES6中的字面量增强（简写）

### 对象字面量简写

1. 属性增强
2. 方法增强
3. 计算属性名
```js
    var name = "why"
    var age = 18
    var key = "address" + " city"

    var obj = {
      // 1.属性的增强
      name,    //name:name
      age,     //age:age

      // 2.方法的增强
      swimming() {},   //swimming:function(){},

      // 3.计算属性名
      [key]: "广州"    //"address city" = "广州"
    }
```

### 解构 Destructuring

* 数组的解构：
  * 基本解构过程
  * 顺序解构
  * 解构出数组：…语法
  * 默认值(如果赋值为undefined，则用默认值)
```js
var names = ["abc", "cba", undefined, "nba", "mba"]

var [name1, name2, name3] = names   //abc cba undefined
var [name1, , name2] = names        //abc undefined
var [name1, name2, ...newNames] = names  //abc cba [undifined,nba,mba]
var [name1, name2, name3 = "default"] = names  //abc cba dafault
```
* 对象的解构：
  * 任意顺序
  * 重命名
  * 默认值
```js
var obj = { name: "why", age: 18, height: 1.88 }

// 对象的解构是没有顺序, 根据key解构
var { height, name, age } = obj //name: why, age: 18, height: 1.88
//重命名
var { height: wHeight, name: wName, age: wAge } = obj
//默认值
var { 
      height: wHeight, 
      name: wName, 
      age: wAge, 
      address: wAddress = "中国"
    } = obj
//对象的剩余内容
var {
  name,
  age,
  ...newObj
} = obj
```

## 新的ECMA代码执行描述

### ES5中的执行描述

* 执行上下文栈：Execution Context Stack，用于执行上下文的栈结构；
* 执行上下文：Execution Context，代码在执行之前会先创建对应的执行上下文；
* 变量对象：Variable Object，上下文关联的VO对象，用于记录函数和变量声明；
* 全局对象：Global Object，全局执行上下文关联的VO对象；
* 激活对象：Activation Object，函数执行上下文关联的VO对象；
* 作用域链：scope chain，作用域链，用于关联指向上下文的变量查找；  

PS：基本思路是相同的，只是对于一些词汇的描述发生了改变；执行上下文栈和执行上下文是相同的；

### 词法环境（Lexical Environments）

* 词法环境是一种规范类型，用于在词法嵌套结构中定义关联的变量、函数等标识符；
  * 一个词法环境是由环境记录（Environment Record）和一个外部词法环境（outer Lexical Environment）组成
  * 一个词法环境经常用于关联一个函数声明、代码块语句、try-catch语句，当它们的代码被执行时，词法环境被创建出来

* 词法环境又分为 LexicalEnvironment 和 VariableEnvironment 
  * LexicalEnvironment 用于处理 let、const 声明的标识符
  * VariableEnvironment 用于处理 var、function 声明的标识符

### 环境记录（Environment Record）

* 在这个规范中有两种主要的环境记录值:声明式环境记录和对象环境记录（一般是全局环境记录分为这两个）
  * 声明式环境记录：声明性环境记录用于定义ECMAScript语言语法元素的效果，如函数声明、变量声明和直接将标识符绑定与ECMAScript语言值关联起来的Catch子句。
  * 对象式环境记录：对象环境记录用于定义ECMAScript元素的效果，例如WithStatement，它将标识符绑定与某些对象的属性关联起来。

![alt text](my_notes_images/15.新特性内存图.png)

## let和const

### 解释

* let关键字：
  * 从直观的角度来说，let和var是没有太大的区别的，都是用于声明一个变量
* const关键字：
  * const关键字是constant的单词的缩写，表示常量、衡量的意思
  * 它表示保存的数据一旦被赋值，就不能被修改
  * 但是如果赋值的是引用类型，那么可以通过引用找到对应的对象，修改对象的内容  

PS：**let、const不允许重复声明变量**

### 暂时性死区（TDZ）
* 在let、const定义的标识符真正执行到声明的代码之前，是不能被访问的
  * 从块作用域的顶部一直到变量声明完成之前，这个变量处在暂时性死区  
  （TDZ，temporal dead zone）
  * 使用术语 “temporal” 是因为这个区域取决于执行顺序（时间），而不是编写代码的位置

  ```js
  console.log(message)  //报错，因为这里是TDZ

  function foo(){
    console.log(message)
  }
  let message = "hello world"
  foo()  //打印成功！证明和位置没关系，取决于执行顺序         
  ```

### 作用域提升
* let、const和var的另一个重要区别是作用域提升：
  * var声明的变量是会进行作用域提升的
  * 但是如果我们使用let声明的变量，在声明之前访问会报错

* let、const没有进行作用域提升，但是 **在解析阶段被创建出来,只是不能访问而已**

### window对象添加属性

* 在全局通过var来声明一个变量，会在window上添加一个属性
  * 放在全局环境记录的对象式window上

* let、const不会给window上添加任何属性
  * 放在声明式环境记录中

### 块级作用域

* 在ES5以及之前, 只有全局和函数会形成自己的作用域

* 在ES6中新增了块级作用域，并且通过let、const、function、class声明的标识符是具备块级作用域的限制的

* 但是我们会发现函数拥有块级作用域，但是外面依然是可以访问的：
  * 这是因为引擎会对函数的声明进行特殊的处理，允许像var那样进行提升

```js
  // 从ES6开始, 使用let/const/function/class声明的变量是有块级作用域
  {
    var message = "Hello World"
    let age = 18
    const height = 1.88

    class Person {}

    function foo() {
      console.log("foo function")
    }
  }

  console.log(age)  //报错
  console.log(height)  //报错
  const p = new Person()  //报错
  foo()  //可以访问
``` 
## 模版字符串

### 模版字符串的使用

* ES6允许我们使用字符串模板来嵌入JS的变量或者表达式来进行拼接：
  * 首先，我们会使用 `` 符号来编写字符串，称之为模板字符串
  * 其次，在模板字符串中，我们可以通过 `${expression}` 来嵌入动态的内容
```js
const name = "why"
const age = 18
const info = `my name is ${name}, age is ${age}`
//my name is why, age is 18
```
### 标签模板字符串

* 调用函数时使用标签模板字符串，并且在调用的时候插入其他的变量
  * 模板字符串被拆分了
  * 第一个元素是数组，是被模块字符串拆分的字符串组合
  * 后面的元素是一个个模块字符串传入的内容
```js
const name = "why"
const age = 18

function foo(...args) {
  console.log("参数:", args)
}
foo`my name is ${name} age is ${age}`
//[['my name is ', ' age is ', ''],'why','18']
```

## 默认参数

* 写法一
```js
// 两种写法不严谨，因为输入false、0、''会依然打印默认值
arg1 = arg1 ? arg1: "默认值"
arg1 = arg1 || "默认值"
```

* 写法二
```js
//只有遇到undefined、null才会输出默认值
arg1 = (arg1 === undefined || arg1 === null) ? "默认值": arg1
```

* 写法三
```js
//ES6之后新增语法: ??
//和写法三结果一样
arg1 = arg1 ?? "默认值"
```

* 写法四
```js
//只有遇到undifined才会输出默认值
function foo(arg1 = "默认值", arg2 = "默认值") {
  console.log(arg1, arg2)
}
```

* 搭配解构
```js
function foo1({ name, age } = { name: "why", age: 18 }) {
  console.log(name, age)
}

function foo2({ name = "why", age = 18 } = {}) {
  console.log(name, age)
}
```

* 注意事项
1. 有默认参数的形参尽量写到后面
2. 有默认参数的形参, 是不会计算在length之内(并且后面所有的参数都不会计算在length之内)
3. 剩余参数也是放到后面(默认参数放到剩余参数的前面)
```js
function foo(age, name = "why", ...args) {
  console.log(name, age, args)
}
console.log(foo.length)  //1
```

## 剩余参数
* ..args(前面提到过了)

## 展开语法
* 展开运算符：`...`
* 展开语法(Spread syntax)：
  * 可以在函数调用/数组构造时，将数组表达式或者string在语法层面展开
  * 还可以在构造字面量对象时, 将对象表达式按key-value的方式展开

* 展开语法的场景：
  * 在函数调用时使用
  * 在数组构造时使用
  * 在构建对象字面量时，也可以使用展开运算符，这个是在ES2018（ES9）中添加的新特性
```js
//数组构造
const names = ["abc", "cba", "nba", "mba"]
const newNames = [...names, "aaa", "bbb"]  //abc cba nba mba aaa bbb

//函数调用
function foo(name1, name2, ...args) {
  console.log(name1, name2, args)
}
foo(...nums)  //abc cba [nba,mba]

//构建对象
const info = {
  ...obj,
  height: 1.88,
  address: "广州市"
}
```
* 注意：展开运算符其实是一种浅拷贝（意思就是拷贝内容中的对象，只会拷贝地址）

## symbol使用

* 为什么需要Symbol呢？
  * 在ES6之前，对象的属性名都是字符串形式，那么很容易造成属性名的冲突；
  * 比如原来有一个对象，我们希望在其中添加一个新的属性和值，但是我们在不确定它原来内部有什么内容的情况下，很容易造成冲突，从而覆盖掉它内部的某个属性
  * 比如我们前面在手写apply、call、bind实现时，我们有给其中添加一个fn属性，那么如果它内部原来已经有了fn属性，就会覆盖
  * 比如开发中我们使用混入，那么混入中出现了同名的属性，必然有一个会被覆盖掉

* Symbol就是为了解决上面的问题，用来生成一个独一无二的值
  * Symbol值是通过Symbol函数来生成的，生成后可以作为属性名
  * 也就是在ES6中，对象的属性名可以使用字符串，也可以使用Symbol值

* Symbol即使多次创建值，它们也是不同的：Symbol函数执行后每次创建出来的值都是独一无二的

```js
const s1 = Symbol()
const s2 = Symbol()
//上面两个都是独一无二的
const obj = {
  [s1]: "aaa" 
}
obj[s2] = "bbb"

```

* 获取symbol对应的key（`Object.getOwnPropertySymbols()`）
```js
const symbolKeys = Object.getOwnPropertySymbols(obj)
for (const key of symbolKeys) {
  console.log(obj[key])
}
```

* 如果相同的key, 通过Symbol.for可以生成相同的Symbol值
```js
const s5 = Symbol.for("ddd")
const s6 = Symbol.for("ddd")
console.log(s5 === s6)  //true

// 获取传入的key
console.log(Symbol.keyFor(s5))  //ddd
```

* 我们也可以在创建Symbol值的时候传入一个描述description
```js
const s3 = Symbol("ccc")
console.log(s3.description)  //ccc
```

## set与map

### set的使用

* Set是一个新增的数据结构，类似于数组，但是和数组的区别是`元素不能重复`
  * 创建Set我们需要通过Set构造函数
  * Set中存放的元素是不会重复的，那么Set有一个非常常用的功能就是给数组去重

* Set常见的属性：
  * size：返回Set中元素的个数

* Set常用的方法：
  * add(value)：添加某个元素，返回Set对象本身
  * delete(value)：从set中删除和这个值相等的元素，返回boolean类型
  * has(value)：判断set中是否存在某个元素，返回boolean类型
  * clear()：清空set中所有的元素，没有返回值
  * forEach(callback, [, thisArg])：通过forEach遍历set

* 另外Set是支持for of的遍历的。

### weakset的使用

* 和Set类似的另外一个数据结构称之为WeakSet，也是内部元素不能重复的数据结构

* 那么和Set有什么区别呢？
  * 区别一：`WeakSet中只能存放对象类型`，不能存放基本数据类型
  * 区别二：WeakSet对元素的引用是`弱引用`（`如果没有其他引用对某个对象进行引用，那么GC可以对该对象进行回收`）
  
* WeakSet常见的方法：
  * add(value)：添加某个元素，返回WeakSet对象本身
  * delete(value)：从WeakSet中删除和这个值相等的元素，返回boolean类型
  * has(value)：判断WeakSet中是否存在某个元素，返回boolean类型

* 注意：WeakSet不能遍历
  * 因为WeakSet只是对对象的弱引用，如果我们遍历获取到其中的元素，那么有可能造成对象不能正常的销毁
  * 所以存储到WeakSet中的对象是没办法获取的

* 作用  
假如一个数组arr存入了几个对象，放到一个set中。使用完后，销毁arr，需要set也销毁，这是就需要set是一个weakset（因为是弱引用）

### map

* 另外一个新增的数据结构是Map，用于存储映射关系。

* 对象也可以存储映射关系，他们有什么区别呢？
  * 事实上我们`对象存储映射关系只能用字符串`（ES6新增了Symbol）作为属性名（key）
  * 某些情况下我们可能希望通过其他类型作为key，比如对象，这个时候会自动将对象转成字符串来作为key

* Map常见的属性：
  * size：返回Map中元素的个数

* Map常见的方法：
  * set(key, value)：在Map中添加key、value，并且返回整个Map对象
  * get(key)：根据key获取Map中的value
  * has(key)：判断是否包括某一个key，返回Boolean类型
  * delete(key)：根据key删除一个键值对，返回Boolean类型
  * clear()：清空所有的元素
  * forEach(callback, [, thisArg])：通过forEach遍历Map

* Map也可以通过for of进行遍历

### weakmap

* 和Map类型的另外一个数据结构称之为WeakMap，也是以键值对的形式存在的。

* 那么和Map有什么区别呢？
  * 区别一：`WeakMap的key只能使用对象`，不接受其他的类型作为key；
  * 区别二：WeakMap的key对对象想的引用是弱引用，如果没有其他引用引用这个对象，那么GC可以回收该对象；

* WeakMap常见的方法有四个：
  * set(key, value)：在Map中添加key、value，并且返回整个Map对象；
  * get(key)：根据key获取Map中的value；
  * has(key)：判断是否包括某一个key，返回Boolean类型；
  * delete(key)：根据key删除一个键值对，返回Boolean类型；

* 注意：WeakMap也是不能遍历的
  * 没有forEach方法，也不支持通过for of的方式进行遍历；


# ES7-ES13 新特性

## ES7新特性
* Array Includes
  * 在ES7之前，如果我们想判断一个数组中是否包含某个元素，需要通过 indexOf 获取结果，并且判断是否为 -1。
  * 在ES7中，我们可以通过includes来判断一个数组中是否包含一个指定的元素，根据情况，如果包含则返回 true，否则返回false。
```js
arr.includes(value[,fromIndex])
```

* 指数exponentiation运算符
  * 在ES7之前，计算数字的乘方需要通过 Math.pow 方法来完成。
  * 在ES7中，增加了 ** 运算符，可以对数字来计算乘方。

## ES8新特性

* 获取对象的key与value
  * 之前我们可以通过 `Object.keys` 获取一个对象所有的key
  * 在ES8中提供了 `Object.values` 来获取所有的value值：
  * 通过 `Object.entries` 可以获取key与value，数组中会存放可枚举属性的键值对数组。

* Object.entries
  * 通过 Object.entries 可以获取到一个数组，数组中会存放可枚举属性的键值对数组。
  * 可以针对对象、数组、字符串进行操作；
```js
const obj = {
  name: "why",
  age: 18,
  height: 1.88,
}

console.log(obj)  //[['name','why'],['age',18],['height',1.88]]

console.log(['abc','cba','nba'])  //[['0','abc'],['1','cba'],['2','nba']]

connsole.log("abc")  //[['0','a'],['1','b'],['2','c']]

```

* string padding
  * 某些字符串我们需要对其进行前后的填充，来实现某种格式化效果，ES8中增加了 `padStart` 和 `padEnd` 方法，分别是对字符串的首尾进行填充的。
  
```js
//第一个位置要求填 填充后的长度，第二个位置要求填 填充的字符
const minute = "5"
console.log(minute.padStart(2,'0')) // 05

const x = "1.2"
console.log(x.padEnd(5,'0'))  //1.200
```

* Trailing Commas
  * ES8中，我们允许在函数定义和调用时多加一个逗号：
```js
function foo(a,b,) {
}
foo(10,20,)
```
* Object.getOwnPropertyDescriptors ：
  * 这个在之前已经讲过了，这里不再重复。

* Async Function：async、await
  * 后续讲完Promise讲解

## ES9新特性
* Async iterators：后续迭代器讲解
* Object spread operators(展开运算符)：前面讲过了
* Promise finally：后续讲Promise讲解

## ES10新特性

* flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
```js
const nums = [10, 20, [111, 222], [333, 444], [[123, 321], [231, 312]]]

const newNums1 = nums.flat(1)
console.log(newNums1)
//[10, 20, 111, 222, 333, 444, [123, 321], [231, 312]]

const newNums2 = nums.flat(2)
console.log(newNums2)
//[10, 20, 111, 222, 333, 444, 123, 321, 231, 312]
```
* flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。
  * 注意一：flatMap是先进行map操作，再做flat的操作；
  * 注意二：flatMap中的flat相当于深度为1；
```js
const messages = [
  "Hello World aaaaa",
  "Hello Coderwhy",
  "你好啊 李银河"
]

const finalMessages = messages.flatMap(item => item.split(" "))
console.log(finalMessages)
//['Hello', 'World', 'aaaaa', 'Hello', 'Coderwhy', '你好啊', '李银河']
```
* Object.formEntries
  * 在前面，我们可以通过 Object.entries 将一个对象转换成 entries

  * 那么如果我们有一个entries了，如何将其转换成对象呢？
    * ES10提供了 Object.formEntries来完成转换：

* trimStart和trimEnd
  * trim：去除一个字符串首尾的空格，我们可以通过trim方法，如果或者后面呢
  * trimStart：单独去除前面的空格
  * trimEnd：单独去除后面的空格
```js
const message = "   Hello World    "
console.log(message.trim())
console.log(message.trimStart())
console.log(message.trimEnd())
```

* Symbol description：已经讲过了
* Optional catch binding：后面讲解try cach讲解

## ES11新特性
* Bigint
  * 大于MAX_SAFE_INTEGER的数值，表示的可能是不正确的。
  * 那么ES11中，引入了新的数据类型BigInt，用于表示大的整数：
  * BitInt的表示方法是在数值的后面加上n

* Nullish Coalescing Operator
  * Nullish Coalescing Operator增加了空值合并操作符
  * 只有x为 undefined 或 null 时为默认值
```js
const x = x ?? "默认"
//
```

* Optional Chaining
  * 可选链也是ES11中新增一个特性，主要作用是让我们的代码在进行null和undefined判断时更加清晰和简洁
```js
const obj = {
  name: "why",
  friend: {
    name: "kobe",
    // running: function() {
    //   console.log("running~")
    // }
  }
}

// 1.直接调用: 非常危险
obj.friend.running()

// 2.if判断: 麻烦/不够简洁
if (obj.friend && obj.friend.running) {
  obj.friend.running()
}

// 3.可选链的用法: ?.
obj?.friend?.running?.()
```
* Global This

  * 在之前我们希望获取JavaScript环境的全局对象，不同的环境获取的方式是不一样的
    * 比如在浏览器中可以通过this、window来获取；
    * 比如在Node中我们需要通过global来获取；

  * 在ES11中对获取全局对象进行了统一的规范：globalThis

* for...in...
  * 在ES11之前，虽然很多浏览器支持for...in来遍历对象类型，但是并没有被ECMA标准化。
  * 在ES11中，对其进行了标准化，for...in是用于遍历对象的key的：

* Dynamic Import：后续ES Module模块化中讲解。
* Promise.allSettled：后续讲Promise的时候讲解。
* import meta：后续ES Module模块化中讲解。

## ES12新特性

* FinalizationRegistry（回收垃圾调用函数）
  * `FinalizationRegistry` 提供了这样的一种方法：当一个在注册表中注册的对象被回收时，请求在某个时间点上调用一个清理回调。（清理回调有时被称为 finalizer ）  
  ```js
  const finalRegistry = new FinalizationRegistry(fn)
  ```
  * 你可以通过调用`register`方法，注册任何你想要清理回调的对象，传入该对象和所含的值
```js
let obj = { name: "why", age: 18 }
let info = { name: "kobe", age: 30 }

const finalRegistry = new FinalizationRegistry((value) => {
  console.log("某一个对象被回收了:", value)
})

finalRegistry.register(obj, "why")
finalRegistry.register(info, "kobe")

obj = null    //某一个对象被回收了: why
info = null   //某一个对象被回收了: kobe
```

* WeakRefs（弱引用）
  * 如果我们默认将一个对象赋值给另外一个引用，那么这个引用是一个强引用：
  * 如果我们希望是一个弱引用的话，可以使用WeakRef；
  * 通过deref方法解析可以获取方法或属性
```js
    let info = { name: "why", age: 18 }

    let obj = new WeakRef(info)
    console.log(obj.deref().name, obj.deref().age)
```

* logical assignment operators（逻辑赋值运算符）
```js
x ||= "默认值"  // x = x || "默认值"
x &&= "默认值"  // x = x && "默认值"
x ??= "默认值"  // x = x ?? "默认值"
```

* Numeric Separator（数字分隔线）
  * 方便辨认数字
```js
number = 1000_000_000
```

* String.replaceAll：字符串替换
  * replace：替换第一个目标字符串
  * replaceAll：替换所有目标字符串
```js
const message = "my name is why, why age is 18"

console.log(message.replace("why", "kobe"))
//"my name is kobe, why age is 18"

console.log(message.replaceAll("why", "kobe"))
//"my name is kobe, kobe age is 18"
```

## ES13新特性

* method.at()访问数组和字符串
```js
const arr = ["123","abc","cba"]
const str = "Hello world"

console.log(arr.at(0), arr.at(-1));  //123 cba
console.log(str.at(0), str.at(-1));  //H d
```

* Object.hasOwn(obj, propKey) （类方法）

  * Object中新增了一个静态方法（类方法）： hasOwn(obj, propKey)
    * 该方法用于判断一个对象中是否有某个自己的属性；
  * 那么和之前学习的Object.prototype.hasOwnProperty有什么区别呢？
    * 区别一：防止对象内部有重写hasOwnProperty
    * 区别二：对于隐式原型指向null的对象， hasOwnProperty无法进行判断
```js
const info = Object.create(null)
info.name = "why"
console.log(Object.hasOwn(info, "name")) //true
```

*  New members of classes
```js
class Person {
  // 1.实例属性
  // 对象属性: public 公共 -> public instance fields
  height = 1.88

  // 2.1.对象属性: private 私有: 程序员之间的约定
  _intro = "name is why"
  
  // 2.1.ES13对象属性: private 私有: 不可外部访问
  #intro = "name is why"


  // 3.类属性(static)
  // 3.1.类属性: public
  static totalCount = "70亿"

  // 3.2.类属性: private
  static #maleTotalCount = "20亿"

  // 4.类方法
  static test(){
    console.log("我是类方法")
  }

  constructor(name, age) {
    // 对象中的属性: 在constructor通过this设置
    this.name = name
    this.age = age
    this.address = "广州市"
  }

  // 5.静态代码块  创建时默认调用
  static {
    console.log("Hello World")
    console.log("Hello Person")
  }
}
```

# Proxy-Reflect详解

## 监听对象的操作
* Object.defineProperty：我们可以利用其存储属性描述符来对属性的操作进行监听。
```js
const obj = {
  name: "why",
  age: 18,
  height: 1.88
} 

let _name = obj.name
Object.defineProperty(obj, "name", {
  set: function(newValue) {
    console.log("监听: 给name设置了新的值:", newValue)
    _name = newValue
  },
  get: function() {
    console.log("监听: 获取name的值")
    return _name
  }
})
```
* 但是这样做有什么缺点呢？
  * Object.defineProperty设计的初衷，不是为了去监听截止一个对象中所有的属性的，`他一次只能处理一个属性`
  * 我们在定义某些属性的时候，初衷其实是定义普通的属性，但是后面我们强行将它变成了数据属性描述符
  * 如果想监听更加丰富的操作，比如新增属性、删除属性，那么Object.defineProperty是无能为力的

## Proxy

* Proxy类，用于帮助我们创建一个代理
  * 先创建一个代理对象（Proxy对象）  （可以称之为handler）
  * 代理对象可以监听我们想要对原对象进行的各种操作  
  PS：我们之后的操作都是直接对Proxy的操作，而不是原有的对象
```js
const obj = {
  name: "why",
  age: 18
}
const objProxy = new Proxy(obj,{})
```

* Proxy的set和get捕获器  
如果我们想要侦听某些具体的操作，那么就可以在handler中添加对应的捕捉器（Trap）：
  * `set`函数有四个参数：
    * target：目标对象（侦听的对象）；
    * property：将被设置的属性key；
    * value：新属性值；
    * receiver：调用的代理对象；
  * `get`函数有三个参数：
    * target：目标对象（侦听的对象）；
    * property：被获取的属性key；
    * receiver：调用的代理对象；

* 所有捕获器
  * handler.getPrototypeOf()
    * Object.getPrototypeOf 方法的捕捉器

  * handler.setPrototypeOf()
    * Object.setPrototypeOf 方法的捕捉器

  * handler.isExtensible()
    * Object.isExtensible 方法的捕捉器(判断是否可以新增属性)

  * handler.preventExtensions()
    * Object.preventExtensions 方法的捕捉器

  * handler.getOwnPropertyDescriptor()
    * Object.getOwnPropertyDescriptor 方法的捕捉器

  * handler.defineProperty()
    * Object.defineProperty 方法的捕捉器

  * handler.ownKeys()
    * Object.getOwnPropertyNames 方法和Object.getOwnPropertySymbols 方法的捕捉器

  * `handler.has()`
    * in 操作符的捕捉器

  * `handler.get()`
    * 属性读取操作的捕捉器

  * `handler.set()`
    * 属性设置操作的捕捉器

  * `handler.deleteProperty()`
    * delete 操作符的捕捉器

  * `handler.apply()`
    * 函数调用操作的捕捉器

  * `handler.construct()`
    * new 操作符的捕捉器
```js
const obj = {
  name: "why",
  age: 18,
  height: 1.88
}

// 1.创建一个Proxy对象
const objProxy = new Proxy(obj, {
  set: function(target, key, newValue) {
    console.log(`监听: 监听${key}的设置值: `, newValue)
    target[key] = newValue
  },
  get: function(target, key) {
    console.log(`监听: 监听${key}的获取`)
    return target[key]
  },

  deleteProperty: function(target, key) {
    console.log(`监听: 监听删除 ${key}属性`)
    delete obj.name
  },

  has: function(target, key) {
    console.log(`监听: 监听in判断 ${key}属性`)
    return key in target
  }
})

objProxy.address = "广州"
console.log(objProxy.height)
delete objProxy.name
console.log("age" in objProxy)
//输出为：
// 监听: 监听address的设置值:  广州
// 监听: 监听height的获取
// 1.88
// 监听: 监听删除 name属性
// 监听: 监听in判断 age属性
// true
```
* construct和apply
```js
function foo(num1, num2) {
  console.log(this, num1, num2)
}

const fooProxy = new Proxy(foo, {
  apply: function(target, thisArg, otherArgs) {
    console.log("监听执行了apply操作")
    target.apply(thisArg, otherArgs)
  },
  construct: function(target, otherArray) {
    console.log("监听执行了new操作")
    console.log(target, otherArray)
    return new target(...otherArray)
  }
})

fooProxy.apply("abc", [111, 222])  //监听执行了apply操作
new fooProxy("aaa", "bbb")  //监听执行了new操作
```

## Reflect

* Reflect也是ES6新增的一个API，它是一个对象，字面的意思是反射。

* 那么这个Reflect有什么用呢？
  * 它主要提供了很多操作JavaScript对象的方法，有点像Object中操作对象的方法；
  * 比如Reflect.getPrototypeOf(target)类似于 Object.getPrototypeOf()；
  * 比如Reflect.defineProperty(target, propertyKey, attributes)类似于Object.defineProperty()

* 有Object可以做这些操作，为什么需要Reflect？
  * 这是因为在早期的ECMA规范中没有考虑到这种对 对象本身 的操作如何设计会更加规范，所以将这些API放到了Object上面
  * 但是Object作为一个构造函数，这些操作实际上放到它身上并不合适
  * 另外还包含一些类似于 in、delete操作符，让JS看起来是会有一些奇怪的
  * 所以在ES6中新增了Reflect，让我们这些操作都集中到了Reflect对象上
  * 另外在使用Proxy时，`可以做到不操作原对象`；

* 所有方法  
关键`Reflect使用方法后还可以返回一个Boolean类型`
  * Reflect.getPrototypeOf(target)
    * 类似于 Object.getPrototypeOf()

  * Reflect.setPrototypeOf(target, prototype)
    * 设置对象原型的函数. 返回一个 Boolean， 如果更新成功，则返回true

  * Reflect.isExtensible(target)
    * 类似于 Object.isExtensible()

  * Reflect.preventExtensions(target)
    * 类似于 Object.preventExtensions()。返回一个Boolean

  * Reflect.getOwnPropertyDescriptor(target, propertyKey)
    * 类似于 Object.getOwnPropertyDescriptor()。如果对象中存在该属性，则返回对应的属性描述符, 否则返回 undefined

  * Reflect.defineProperty(target, propertyKey, attributes)
    * 和 Object.defineProperty() 类似。如果设置成功就会返回 true

  * Reflect.ownKeys(target)
    * 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于Object.keys(), 但不会受enumerable影响)

  * `Reflect.has(target, propertyKey)`
    * 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同

  * `Reflect.get(target, propertyKey[, receiver])`
    * 获取对象身上某个属性的值，类似于 target[name]

  * `Reflect.set(target, propertyKey, value[, receiver])`
    * 将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true

  * `Reflect.deleteProperty(target, propertyKey)`
    * 作为函数的delete操作符，相当于执行 delete target[name]

  * `Reflect.apply(target, thisArgument, argumentsList)`
    * 对一个函数进行调用操作，同时可以传入一个数组作为调用参数。  
    和Function.prototype.apply() 功能类似
    
  * `Reflect.construct(target, argumentsList[, newTarget])`
    * 对构造函数进行 new 操作，相当于执行 new target(...args)

* 我们可以将之前Proxy案例中对原对象的操作，都修改为Reflect来操作
```js
const objProxy = new Proxy(obj,{
  set: function(target, key, value) {
    return Reflect.set(target, key, value)
  }
  get: function(target, key) {
    return Reflect.get(target,key)
  }
})
```

* Receiver的作用  
如果我们的源对象（obj）有setter、getter的访问器属性，那么可以`通过receiver来改变里面的this`
```js
const obj = {
  _name: "why",
  set name(newValue) {
    console.log("this:", this) // 默认是obj
    this._name = newValue
  },
  get name() {
    return this._name
  }
}

const objProxy = new Proxy(obj, {
  set: function(target, key, newValue, receiver) {
    // 1.好处一: 代理对象的目的: 不再直接操作原对象
    // 2.好处二: Reflect.set方法有返回Boolean值, 可以判断本次操作是否成功
    /*
        3.好处三:
          > receiver就是外层Proxy对象
          > Reflect.set/get最后一个参数, 可以决定对象访问器setter/getter的this指向
    */
    console.log("proxy中设置方法被调用")
    const isSuccess = Reflect.set(target, key, newValue, receiver)
    if (!isSuccess) {
      throw new Error(`set ${key} failure`)
    }
  },
  get: function(target, key, receiver) {
    console.log("proxy中获取方法被调用")
    return Reflect.get(target, key, receiver)
  }
})


// 操作代理对象
objProxy.name = "kobe"
console.log(objProxy.name)
/*
如果get或set中参数填入了receiver，就会打印两次
"proxy中 设置/获取 方法被调用"

因为填入receiver会将this指向objProxy
*/
```

* construct 继承  
可以使用一个类来创建另外一个类的对象
```js
function Person(name, age) {
  this.name = name
  this.age = age
}

function Student(name, age) {
  // Person.call(this, name, age)
  const _this = Reflect.construct(Person, [name, age], Student)
  return _this
}

// const stu = new Student("why", 18)
const stu = new Student("why", 18)

console.log(stu)
//输出一个Student类对象，但是里面继承了Person属性
console.log(stu.__proto__ === Student.prototype)
//true
```

# Promise详解

## 异步处理的困境（使用Promise的原因）
* 实例
  * 如果任务成功，那么告知调用者发送成功，并且将相关数据返回过去；
  * 如果任务失败，那么告知调用者发送失败，并且告知错误信息；

```js
// 1.设计这样的一个函数
//counter：需要处理的参数
//successCallback：如果处理成功返回这个函数告诉外部
//failureCallback：如果处理失败返回这个函数告诉外部
function execCode(counter, successCallback, failureCallback) {
  // 异步任务
  setTimeout(() => {
    if (counter > 0) { // counter可以计算的情况 
      let total = 0
      for (let i = 0; i < counter; i++) {
        total += i
      }
      // 在某一个时刻只需要回调传入的函数
      successCallback(total)
    } else { // 失败情况, counter有问题
      failureCallback(`${counter}值有问题`)
    }
  }, 3000)
}

// 2.ES5之前,处理异步的代码都是这样封装
//设计successCallback，failureCallback函数填入函数
execCode(100, (value) => {
  console.log("本次执行成功了:", value)
}, (err) => {
  console.log("本次执行失败了:", err)
})
```
* 缺点
  * 我们需要自己来设计回调函数、回调函数的名称、回调函数的使用等
  * 对于不同的人、不同的框架设计出来的方案是不同的，以至于必须耐心去看别人的源码或者文档，才能理解并使用这个函数
  * 所以需要统一规范

## Promise是什么

* `Promise`是一个类，可以翻译成 承诺、许诺 、期约

* 当我们需要的时候，给予调用者一个承诺：待会儿我会给你回调数据时，就可以创建一个Promise的对象

* 在通过new创建Promise对象时，我们需要传入一个回调函数，我们称之为`Executor`
  * 这个回调函数会被立即执行，并且给传入另外两个回调函数`resolve`、`rejec`t；
  * 当我们调用`resolve`回调函数时，会执行Promise对象的then方法传入的回调函数；
  * 当我们调用`reject`回调函数时，会执行Promise对象的catch方法传入的回调函数；

* Promise的使用过程，我们可以将它划分成三个状态

  * 待定（`pending`）: 初始状态，既没有被兑现，也没有被拒绝
    * 当执行executor中的代码时，处于该状态

  * 已兑现（`fulfilled`）: 意味着操作成功完成
    * 执行了resolve时，处于该状态，Promise已经被兑现

  * 已拒绝（`rejected`）: 意味着操作失败
    * 执行了reject时，处于该状态，Promise已经被拒绝

* 注意：一旦状态被确定下来，Promise的状态会被 锁死，该Promise的状态是不可更改的
  * 在我们调用resolve的时候，如果resolve传入的值本身不是一个Promise，那么会将该Promise的状态变成 兑现（fulfilled）
  * 在之后我们去调用reject时，已经不会有任何的响应了（并不是这行代码不会执行，而是无法改变Promise状态）

    
* 代码结构
```js
const promise = new Promise((resolve, reject) => {
  // 1.待定状态 pending
  console.log("111111")
  console.log("222222")
  console.log("333333")

  // 2.兑现状态 fulfilled  对应  外部的then
  resolve()

  // 3.拒绝状态 rejected  对应  外部的catch
  reject()
})

//写法一
// promise.then((value) => {
//   console.log("成功")
// })
// promise.catch((err) => {
//   console.log("失败")
// })

//写法二
promise.then(value => {
  console.log("成功的回调")
}).catch(err => {
  console.log("失败的回调")
})
```

* 实例（修改上文的异步任务）
```js
function execCode(counter) {
  const promise = new Promise((resolve, reject) => {
    // 异步任务
    setTimeout(() => {
      if (counter > 0) { // counter可以计算的情况 
        let total = 0
        for (let i = 0; i < counter; i++) {
          total += i
        }
        // 成功的回调
        resolve(total)
      } else { // 失败情况, counter有问题
        // 失败的回调
        reject(`${counter}有问题`)
      }
    }, 3000)
  })
  
  return promise
}

execCode(255).then(value => {
  console.log("成功:", value)
}).catch(err => {
  console.log("失败:", err)
})
```

## resolve不同值的区别
* 情况一：如果resolve传入一个普通的值或者对象，那么这个值会作为then回调的参数（一般我们就是使用的这种情况）

* 情况二：如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态

* 情况三：如果resolve中传入的是一个对象，并且这个对象有实现then方法，那么会执行该then方法，并且根据then方法的结果来决定Promise的状态
```js
const p = new Promise((resolve) => {
  // setTimeout(resolve, 2000)
  setTimeout(() => {
    resolve("p的resolve")
  }, 2000)
})

const promise = new Promise((resolve, reject) => {
  // 1.普通值
  // resolve([
  //   {name: "macbook", price: 9998, intro: "有点贵"},
  //   {name: "iPhone", price: 9.9, intro: "有点便宜"},
  // ])

  // 2.resolve(promise)
  // 如果resolve的值本身Promise对象, 那么当前的Promise的状态会有传入的Promise来决定
  // resolve(p)

  // 3.resolve(thenable对象)
  resolve({
    name: "kobe",
    then: function(resolve) {
      resolve(11111)
    }
  })
})

promise.then(res => {
  console.log("then中拿到结果:", res)
})  //then中拿到结果: 11111
```
## then与catch的调度

### then
* then方法是Promise对象上的一个方法（实例方法）：
  * 它其实是放在Promise的原型上的 Promise.prototype.then

* then方法接受两个参数：
  * fulfilled的回调函数：当状态变成fulfilled时会回调的函数；
  * reject的回调函数：当状态变成reject时会回调的函数；

```js
//1.then参数的传递方法: 可以传递两个参数
//这种写法也是可以的
promise.then(res => {
  console.log("成功回调~", res)
}, err => {
  console.log("失败回调~", err)
})
//作用和上文的写法一和写法二一样
```
* 一个Promise的then方法是可以被多次调用的：
  * 每次调用我们都可以传入对应的fulfilled回调；
  * 当Promise的状态变成fulfilled的时候，这些回调函数都会被执行；  
  以下的then都会被执行
```js
promise.then(res => {
  console.log("成功回调~", res)
})
promise.then(res => {
  console.log("成功回调~", res)
})
promise.then(res => {
  console.log("成功回调~", res)
})
```

* then的返回值

  * then方法本身的`返回值是一个Promise`

  * 当then方法中的回调函数本身在执行的时候，那么它处于pending状态

  * 当then方法中的回调函数返回一个结果时，那么它处于fulfilled状态，并且会`将返回结果作为resolve的参数`；
    * 情况一：返回一个普通的值
    * 情况二：返回一个Promise
    * 情况三：返回一个thenable值

  * 当then方法抛出一个异常时，那么它处于reject状态
```js
const promise = new Promise((resolve, reject) => {
  resolve("aaaaaaa")
})

promise.then(res => {
  console.log("第一个then方法:", res)
  return "bbbbbbbb"
}).then(res => {
  console.log("第二个then方法:", res)
  return "cccccccc"
}).then(res => {
  console.log("第三个then方法:", res)
})
// 结果为：
// 第一个then方法:aaaaaaa
// 第二个then方法:bbbbbbb
// 第三个then方法:ccccccc
```

### catch

* catch方法也是Promise对象上的一个方法（实例方法）：
  * 它也是放在Promise的原型上的 Promise.prototype.catch

* 一个Promise的catch方法是可以被多次调用的：
  * 每次调用我们都可以传入对应的reject回调；
  * 当Promise的状态变成reject的时候，这些回调函数都会被执行  
  以下的catch都会被执行
```js
promise.then(res => {
  console.log("成功的回调:", res)
}).catch(err => {
  console.log("失败的回调:", err)
})

promise.catch(err => {
  console.log("失败的回调:", err)
})
promise.catch(err => {
  console.log("失败的回调:", err)
})
```
* catch的返回值
  * catch方法也会返回一个Promise对象，所以catch方法后面我们可以继续调用then方法或者catch方法
  * catch传入的回调在执行完后，`默认状态依然会是fulfilled的`（与then几乎差不多）

## Promise的实例方法与类方法

### finally方法（实例方法）

* 上文的then、catch都是实例方法

* finally是在ES9（ES2018）中新增的一个特性：表示无论Promise对象无论变成fulfilled还是rejected状态，最终都会被执行的代码

* finally方法是不接收参数的，因为无论前面是fulfilled状态，还是rejected状态，它都会执行

```js
promise.then(res => {
  console.log("then:", res)
  // foo()
}).catch(err => {
  console.log("catch:", err)
  // foo()
}).finally(() => {
  console.log("我是无论如何最后都会执行的代码")
})
```
### resolve方法（类方法）

* 有时候我们已经有一个现成的内容了，希望将其转成Promise来使用，这个时候我们可以使用 Promise.resolve 方法来完成
  * Promise.resolve的用法相当于new Promise，并且执行resolve操作
  * resolve参数的形态：
    * 情况一：参数是一个普通的值或者对象
    * 情况二：参数本身是Promise
    * 情况三：参数是一个thenable
```js
const promise = Promise.resolve("genshin")
//等价于
const promise = new Promise((resolve) => {resolve("genshin")})
```

### reject（类方法）

* reject方法类似于resolve方法，只是会将Promise对象的状态设置为reject状态

* Promise.reject的用法相当于new Promise，只是会调用reject

* Promise.reject传入的参数无论是什么形态，都会直接作为reject状态的参数传递到catch的
```js
const promise = Promise.reject("genshin")
//等价于
const promise = new Promise((resolve,reject) => {reject("genshin")})
```

### all方法（类方法）

* 它的作用是将多个Promise包裹在一起形成一个新的Promise

* 新的Promise状态由包裹的所有Promise共同决定
  * 当所有的Promise状态变成fulfilled状态时，新的Promise状态为fulfilled，并且会将所有Promise的返回值组成一个数组
  * 当有一个Promise状态为reject时，新的Promise状态为reject，并且会将第一个reject的返回值作为参数

```js
//假如p1,p2,p3是三个Promise

//当p1,p2,p3都为fulfiled，下面结果为
//all promise res: [p1中resolve的value，p2中resolve的value，p3中resolve的value]

//当p1,p2,p3有一个为rejected，结果为
//all promise err：第一个reject的参数

Promise.all([p1, p2, p3]).then(res => {
  console.log("all promise res:", res)
}).catch(err => {
  console.log("all promise err:", err)
})
```

### allSettled方法（类方法）

* all方法有一个缺陷：当有其中一个Promise变成reject状态时，新Promise就会立即变成对应的reject状态
  * 那么对于resolved的，以及依然处于pending状态的Promise，我们是获取不到对应的结果的

* 在ES11（ES2020）中，添加了新的API Promise.allSettled：
  * 该方法会在所有的Promise都有结果（settled），无论是fulfilled，还是rejected时，才会有最终的状态
  * 并且这个Promise的结果一定是fulfilled的

* 结果：
  * allSettled的结果是一个数组，数组中存放着每一个Promise的结果（放在对象中）
  * 这个对象中包含fulfiled/rejected状态，以及对应的value值

### race方法（类方法）
* 如果有一个Promise有了结果，我们就希望决定最终新Promise的状态，那么可以使用race方法：
  * race是竞技、竞赛的意思，表示多个Promise相互竞争，谁先有结果，那么就使用谁的结果；

### any方法（类方法）

* any方法是ES12中新增的方法，和race方法是类似的
  * any方法会等到一个fulfilled状态，才会决定新Promise的状态
  * 如果所有的Promise都是reject的，那么也会等到所有的Promise都变成rejected状态

* 如果所有的Promise都是reject的，那么会报一个AggregateError的错误。

# 迭代器和生成器（Iterator-Generator）

## 迭代器

### 初识迭代器

* 迭代器是帮助我们对某个数据结构进行遍历的对象

* JavaScript有个标准就是一个特定的next方法
  * 一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象：
  * done（boolean）
    * 如果迭代器可以产生序列中的下一个值，则为 false。（这等价于没有指定 done 这个属性。）
    * 如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
  * value
    * 迭代器返回的任何 JavaScript 值。done 为 true 时可省略

```js
const names = ["abc", "cba", "nba"]

// 给数组names创建一个迭代器
let index = 0
const namesIterator = {
  next: function() {
    // done: Boolean
    // value: 具体值/undefined
    if (index < names.length) {
      return { done: false, value: names[index++] }
    } else {
      return { done: true }
    }
  }
}

console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
```

* 创建迭代器的函数
```js
const names = ["abc", "cba", "nba"]

// 封装一个函数
function createArrayIterator(arr) {
  let index = 0
  return {
    next: function() {
      if (index < arr.length) {
        return { done: false, value: arr[index++] }
      } else {
        return { done: true }
      }
    }
  }
}

const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
```

### 可迭代对象

* 什么又是可迭代对象呢？
  * 它和迭代器是不同的概念；
  * 当一个对象实现了iterable protocol协议时，它就是一个可迭代对象；
  * 这个对象的要求是必须实现 @@iterator 方法，在代码中我们使用          `Symbol.iterator` 访问该属性

* 作用
  * 当一个对象变成一个可迭代对象的时候，就可以进行某些迭代操作
  * 比如 for...of 操作时，其实就会调用它的 @@iterator 方法
```js
const infos = {
  name: "why",
  age: 18,
  height: 1.88,

  [Symbol.iterator]: function() {   //访问Symbol.iterator
    // const keys = Object.keys(this)
    // const values = Object.values(this)
    const entries = Object.entries(this)
    let index = 0
    const iterator = {
      next: function() {
        if (index < entries.length) {
          return { done: false, value: entries[index++] }
          //可以修改value的值进行更改迭代对象
        } else {
          return { done: true }
        }
      }
    }
    return iterator
  }
}
```
* 原生迭代器对象
  * 事实上我们平时创建的很多原生对象已经实现了可迭代协议，会生成一个迭代器对象的：  
  String、Array、Map、Set、arguments对象、NodeList集合；

* 应用场景
  * JavaScript中语法：for ...of、展开语法（spread syntax）、yield*（后面讲）、解构赋值（Destructuring_assignment）
  * 创建一些对象时：new Map([Iterable])、new WeakMap([iterable])、new Set([iterable])、new WeakSet([iterable])
  * 一些方法的调用：Promise.all(iterable)、Promise.race(iterable)、Array.from(iterable)

### 自定义类的迭代
* 在前面我们看到Array、Set、String、Map等类创建出来的对象都是可迭代对象：
* 在面向对象开发中，我们可以通过class定义一个自己的类，这个类可以创建很多的对象：
* 如果我们也希望自己的类创建出来的对象默认是可迭代的，那么在设计类的时候我们就可以添加上 @@iterator 方法；

```js
class Person {
  constructor(name, age, height, friends) {
    this.name = name
    this.age = age
    this.height = height
    this.friends = friends
  }

  // 实例方法
  running() {}
  [Symbol.iterator]() {
    let index = 0
    const iterator = {
      next: () => {
        if (index < this.friends.length) {
          return { done: false, value: this.friends[index++] }
        } else {
          return { done: true }
        }
      }
    }
    return iterator
  }
}

const p1 = new Person("why", 18, 1.88, ["curry", "kobe", "james", "tatumu"])

for (const item of p1) {
  console.log(item)
}  //能够执行
```

### 迭代器的中断
* 比如遍历的过程中通过break、return、throw中断了循环操作
* 比如在解构的时候，没有解构所有的值
* 那么这个时候我们想要监听中断的话，可以添加return方法（可以在中断时返回值）
```js
const iterator = {
  next: () => {
    if (index < this.friends.length) {
      return { done: false, value: this.friends[index++] }
    } else {
      return { done: true }
    }
  },
  return: () => {   //遇到中断后返回的内容
    console.log("监听到迭代器中断了")
    return { done: true }
  }
}
```
## 生成器

### 认识生成器

* 生成器是ES6中新增的一种函数控制、使用的方案，它可以让我们更加灵活的控制函数什么时候继续执行、暂停执行等
  * 平时我们会编写很多的函数，这些函数终止的条件通常是返回值或者发生了异常。

* 生成器函数也是一个函数，但是和普通的函数有一些区别：
  * 首先，生成器函数需要在function的后面加一个符号：`*`
  * 其次，生成器函数可以通过`yield`关键字来控制函数的执行流程：
  * 最后，生成器函数的返回值是一个Generator（生成器）：
  * 生成器事实上是一种特殊的迭代器

### 生成器的使用

* 基本使用
  * 调用next可以让它执行函数中的东西
  * next会执行函数到下一次遇到yield

```js
// 1.定义了一个生成器函数
function* foo() {
  console.log("1111")
  console.log("2222")
  yield
  console.log("3333")
  console.log("4444")
  yield
  console.log("5555")
  console.log("6666")
}

// 2.调用生成器函数, 返回一个 生成器对象
const generator = foo()
// 调用next方法
generator.next()
//1111
//2222
generator.next()
//3333
//4444
generator.next()
//5555
//6666
```
* 参数与返回值
  * 参数在yield的前面
  * 返回值在yield的后面
  * 第一个参数在获得生成器时进行传入

```js
function* foo(name1) {
  console.log("执行内部代码:1111", name1)
  console.log("执行内部代码:2222", name1)
  const name2 = yield "aaaa"    
  //name2是传入的参数  "aaaa"是返回对象中的value
  console.log("执行内部代码:3333", name2)
  console.log("执行内部代码:4444", name2)
  const name3 = yield "bbbb"
  // return "bbbb"
  console.log("执行内部代码:5555", name3)
  console.log("执行内部代码:6666", name3)
  yield "cccc"
  return undefined
}

//第一个参数在获得生成器时进行传入
const generator = foo("next1")
console.log(generator.next())
console.log(generator.next("next2"))
console.log(generator.next("next3"))
```

### 生成器提前返回

* return 函数
  * return可以给生成器函数传递参数
  * return传值后这个生成器函数就会结束，之后调用next不会继续生成值了

* throw 函数
  * 除了给生成器函数内部传递参数之外，也可以给生成器函数内部抛出异常
  * 抛出异常后我们可以在生成器函数中捕获异常
  * 但是在catch语句中不能继续yield新的值了，但是可以在catch语句外使用yield继续中断函数的执行

```js
function* foo(name1) {
  console.log("执行内部代码:1111", name1)
  console.log("执行内部代码:2222", name1)
  const name2 = yield "aaaa"
  console.log("执行内部代码:3333", name2)
  console.log("执行内部代码:4444", name2)
  const name3 = yield "bbbb"
  // return "bbbb"
  console.log("执行内部代码:5555", name3)
  console.log("执行内部代码:6666", name3)
  yield "cccc"

  console.log("最后一次执行")
  return undefined
}

// 1.generator.return提前结束函数
console.log(generator.next())
console.log(generator.return("next2"))
console.log(generator.next("next3"))
console.log(generator.next("next4"))
//输出：
//执行内部代码:1111 next1
//执行内部代码:2222 next1
//{value: 'aaaa', done: false}
//{value: 'next2', done: true}
//{value: undefined, done: true}
//{value: undefined, done: true}

// 2.generator.throw向函数抛出一个异常
console.log(generator.next())
console.log(generator.throw(new Error("next2 throw error")))
console.log("-------------------")
console.log(generator.next("next3"))
console.log(generator.next("next4"))
//输出：
//执行内部代码:1111 next1
//执行内部代码:2222 next1
//{value: 'aaaa', done: false}
//抛出异常！
```

### 生成器替代迭代器

* 对象
  * 使用`yield*`来生产一个可迭代对象
```js
function* createArrayIterator(arr) {
  yield* arr
}
```

* 类
```js
class Person {
  constructor(name, age, height, friends) {
    this.name = name
    this.age = age
    this.height = height
    this.friends = friends
  }

  // 实例方法
  *[Symbol.iterator]() {
    yield* this.friends
  }
}
```

# 异步 async-await 进程与线程

## 网络请求异步处理

* 案例需求：
  * 我们需要向服务器发送网络请求获取数据，一共需要发送三次请求；
  * 第二次的请求url依赖于第一次的结果；
  * 第三次的请求url依赖于第二次的结果；
  * 依次类推；

* 装请求的方法: url -> promise(result)
```js
    function requestData(url) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(url)
        }, 2000)
      })
    }
```
* 方式一: 层层嵌套(回调地狱 callback hell)
```js
function getData() {
  // 1.第一次请求
  requestData("why").then(res1 => {
    console.log("第一次结果:", res1)

    // 2.第二次请求
    requestData(res1 + "kobe").then(res2 => {
      console.log("第二次结果:", res2)

      // 3.第三次请求
      requestData(res2 + "james").then(res3 => {
        console.log("第三次结果:", res3)
      })
    })
  })
}
```

* 方式二: 使用Promise进行重构(解决回调地狱)
```js
function getData() {
  requestData("why").then(res1 => {
    console.log("第一次结果:", res1)
    return requestData(res1 + "kobe")
  }).then(res2 => {
    console.log("第二次结果:", res2)
    return requestData(res2 + "james")
  }).then(res3 => {
    console.log("第三次结果:", res3)
  })
}
```

* 方式三: 利用生成器
```js
function* getData() {
  const res1 = yield requestData("why")
  console.log("res1:", res1)

  const res2 = yield requestData(res1 + "kobe")
  console.log("res2:", res2)

  const res3 = yield requestData(res2 + "james")
  console.log("res3:", res3)
}

const generator = getData()
generator.next().value.then(res1 => {
  generator.next(res1).value.then(res2 => {
    generator.next(res2).value.then(res3 => {
      generator.next(res3)
    })
  })
})
```

* 方式四：生成器函数自动化
```js
function* getData() {
  const res1 = yield requestData("why")
  console.log("res1:", res1)

  const res2 = yield requestData(res1 + "kobe")
  console.log("res2:", res2)

  const res3 = yield requestData(res2 + "james")
  console.log("res3:", res3)
}

// 自动化执行生成器函数(了解)
function execGenFn(genFn) {
  // 1.获取对应函数的generator
  const generator = genFn()
  // 2.定义一个递归函数
  function exec(res) {
    // result -> { done: true/false, value: 值/undefined }
    const result = generator.next(res)
    if (result.done) return
    result.value.then(res => {
      exec(res)
    })
  }
  // 3.执行递归函数
  exec()
}

execGenFn(getData)
```
* 方式五: async/await的解决方案
```js
async function getData() {
  const res1 = await requestData("why")
  console.log("res1:", res1)

  const res2 = await requestData(res1 + "kobe")
  console.log("res2:", res2)

  const res3 = await requestData(res2 + "james")
  console.log("res3:", res3)
}

const generator = getData()
```

## 异步函数 async function

* `async`关键字用于声明一个异步函数：
  * async是asynchronous单词的缩写，异步、非同步；
  * sync是synchronous单词的缩写，同步、同时；

* 写法
```js
async function foo() {}

const bar = async function() {}

const baz = async () => {}

class Person {
  async running() {}
}
```
* 异步函数执行流程

  * 异步函数的内部代码执行过程和普通的函数是一致的，默认情况下也是会被同步执行

  * 异步函数有返回值时，和普通函数会有区别（`与前面promise三个状态一样`）
    * 情况一：异步函数也可以有返回值，但是异步函数的返回值相当于被包裹到    Promise.resolve中
    * 情况二：如果我们的异步函数的返回值是Promise，状态由会由Promise决定
    * 情况三：如果我们的异步函数的返回值是一个对象并且实现了thenable，那么会由对象的then方法来决定

  * 如果我们在async中`抛出了异常`，那么程序它并不会像普通函数一样报错，而是会`作为Promise的reject来传递`

* await关键字
  * async函数另外一个特殊之处就是可以在它内部使用await关键字，而普通函数中是不可以的。
  * await关键字有什么特点呢？
    * 通常使用await是后面会跟上一个表达式，这个表达式会返回一个Promise；
    * 那么await会等到Promise的状态变成fulfilled状态，之后继续执行异步函数；
    * await到下一个await之前其实可以当做then方法
  * `返回值（和前面一样）`
    * 如果await后面是一个普通的值，那么会直接返回这个值；
    * 如果await后面是一个thenable的对象，那么会根据对象的then方法调用来决定后续的值；
    * 如果await后面的表达式，返回的Promise是reject的状态，那么会将这个reject结果直接作为函数的Promise的reject值；
```js
async function foo() {
  console.log("-------")
  // await后续返回一个Promise, 那么会等待Promise有结果之后, 才会继续执行后续的代码
  const res1 = await bar()
  console.log("await后面的代码:", res1)
  const res2 = await bar()
  console.log("await后面的代码:", res2)

  console.log("+++++++")
}
```

## 进程-线程

* 概念
  * 进程（process）：计算机已经运行的程序，是操作系统管理程序的一种方式  
   进程：我们可以认为，`启动一个应用程序，就会默认启动一个进程`（也可能是多个进程）

  * 线程（thread）：操作系统能够运行运算调度的最小单位，通常情况下它被包含在进程中  
  线程：每一个进程中，都会启`动至少一个线程`用来执行程序中的代码，这个线程被称之为主线程

  * 所以我们也可以说进程是线程的容器；

* 形象解释
  * 操作系统类似于一个大工厂
  * 工厂中里有很多车间，这个车间就是进程
  * 每个车间可能有一个以上的工人在工厂，这个工人就是线程

  ![alt text](my_notes_images/16.进程和线程.png)

* 操作系统工作方式
  * 这CPU的运算速度非常快，它可以快速的在多个进程之间迅速的切换，做到同时运行多个进程的效果
  * 当我们进程中的线程获取到时间片时，就可以快速执行我们编写的代码
  * 对于用户来说是感受不到这种快速的切换的

## 浏览器中的JavaScript（线程、事件循环、宏微任务）

### 浏览器的进程与JS的线程

* JS的容器进程：浏览器或者NODE

* 浏览器进程
  * 目前`多数的浏览器是多进程`的   
  （当我们打开一个tab页面时就会开启一个新的进程，这是为了防止一个页面卡死而造成所有页面无法响应，整个浏览器需要强制退出）
  * 每个进程中又有很多的线程，其中包括执行JavaScript代码的线程

* JavaScript是`单线程`（可以开启workers）的
  * 这就意味着JavaScript的代码，在同一个时刻只能做一件事
  * 如果这件事是非常耗时的，就意味着当前的线程就会被阻塞  
  **PS：所以真正耗时的操作，浏览器的其他线程来完成这个耗时的操作**

### 事件循环
* JS 在解析一段代码时，会将同步代码按顺序排执行栈，然后依次执行里面的函数。
* 当遇到异步任务时就交给其他线程处理
* 待当前执行栈所有同步代码执行完成后，会从一个队列中去取出已完成的异步任务的回调加入执行栈继续执行，遇到异步任务时又交给其他线程，
* 如此循环往复。而其他异步任务完成后，将回调放入任务队列中待执行栈来取出执行。
![alt text](my_notes_images/17.事件循环.png)

### 宏任务、微任务

* 在事件循环中并非只维护着一个队列，事实上是有两个队列
  * 宏任务队列（macrotask queue）：ajax、setTimeoual、DOM监听、UI Rendering等
  * 微任务队列（microtask queue）：Promise的then回调、 Mutation Observer API、queueMicrotask()等

* 代码优先级
  * main script中的代码优先执行（编写的顶层script代码）
  * 在执行任何一个宏任务之前（不是队列，是一个宏任务），都会先查看微任务队列中是否有任务需要执行
    * 也就是宏任务执行之前，必须保证微任务队列是空的；
    * 如果不为空，那么就优先执行微任务队列中的任务（回调）；

### 事件循环相关面试题

* 面试题一
```js
console.log("script start")

setTimeout(function () {
  console.log("setTimeout1");
  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      console.log("then4");
    });
    console.log("then2");
  });
});

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("then1");
});

setTimeout(function () {
  console.log("setTimeout2");
});

console.log(2);

queueMicrotask(() => {
  console.log("queueMicrotask1")
});

new Promise(function (resolve) {
  resolve();
}).then(function () {
  console.log("then3");
});

console.log("script end")
// script start
// promise1
// 2
// script end
// then1
// queueMicrotask1
// then3
// setTimeout1
// then2
// then4
// setTimeout2
```
* 面试体二
```js
async function async1 () {
  console.log('async1 start')
  await async2();
  console.log('async1 end')
}

async function async2 () {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1();

new Promise (function (resolve) {
  console.log('promise1')
  resolve();
}).then (function () {
  console.log('promise2')
})

console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

# 额外知识

## 异常处理方案

* 开发中我们会封装一些工具函数，封装之后给别人使用：
  * 在其他人使用的过程中，可能会传递一些参数
  * 对于函数来说，需要对这些参数进行验证，否则可能得到的是我们不想要的结果  
  （比如想要数组，结果传输了字符串，字符串不能调用数组的方法）

* 不严谨的解决方案
  * 直接`return`
  * 弊端：调用者不知道是因为函数内部没有正常执行，还是执行结果就是一个undefined

* 解决方案
  * 通过`throw关键字`抛出一个异常
  * throw语句用于抛出一个用户自定义的异常；
  * 当遇到throw语句时，当前的函数执行会被停止（throw后面的语句不会执行）
  * 如果我们执行代码，就会报错，拿到错误信息时用户可以及时的去修正代码

* throw关键字可以跟上哪些类型呢？
  * 基本数据类型：比如number、string、Boolean
  * 对象类型：对象类型可以包含更多的信息  
  PS：那么就可以抛出一个对象包含更多信息

* Error类型
  * 事实上，JavaScript已经给我们提供了一个Error类，我们可以直接创建这个类的对象
  * Error包含三个属性：
    * messsage：创建Error对象时传入的message；
    * name：Error的名称，通常和类的名称一致；
    * stack：整个Error的错误信息，包括函数的调用栈，当我们直接打印Error对象时，打印的就是stack；
  * Error有一些自己的子类：
    * RangeError：下标值越界时使用的错误类型；
    * SyntaxError：解析语法错误时使用的错误类型；
    * TypeError：出现类型错误时，使用的错误类型；
```js
class HYError {
  constructor(message, code) {
    this.errMessage = message
    this.errCode = code
  }
}

function foo() {
  console.log("foo function1")
  // 1.number/string/boolean
  // throw "发生错误"

  // 2.抛出一个对象
  // throw { errMessage: "我是错误信息", errCode: -1001 }
  // throw new HYError("错误信息", -1001)

  // 3.Error类: 错误函数的调用栈以及位置信息
  throw new Error("我是错误信息")

  console.log("foo function2")
}
```

* 异常的处理
  * 这在调用一个函数时，这个函数抛出了异常，如果没有对这个异常进行处理，那么这个异常会继续传递到上一个函数调用中
  * 而如果到了最顶层（全局）的代码中依然没有对这个异常的处理代码，这个时候就会报错并且终止程序的运行

* 异常的捕获 `try catch`
  * 发现异常时又不想终止程序，可以用 try catch
  * 在ES10（ES2019）中，catch后面绑定的error可以省略
  * 当然，如果有一些必须要执行的代码，我们可以使用finally来执行
    * finally表示最终一定会被执行的代码结构
```js
function foo() {
  console.log("foo function1")
  throw new Error("我是错误信息")
  console.log("foo function2") 
}

function test() {
  // 自己捕获了异常的话, 那么异常就不会传递给浏览器, 那么后续的代码可以正常执行
  try {
    foo()
    console.log("try后续的代码")
  } catch(error) {
    console.log("catch中的代码")
    // console.log(error)
  } finally {
    console.log("finally代码")
  }
}
```
## storage

* WebStorage主要提供了一种机制，可以让浏览器提供一种比cookie更直观的key、value存储方式：
  * `localStorage`：本地存储，提供的是一种永久性的存储方法，在关闭掉网页重新打开时，存储的内容依然保留；
  * `sessionStorage`：会话存储，提供的是本次会话的存储，在关闭掉会话时，存储的内容会被清除；

* 区别
  * 一：关闭网页后重新打开，localStorage会保留，而sessionStorage会被删除
  * 二：在页面内实现跳转，localStorage会保留，sessionStorage也会保留
  * 三：在页面外实现跳转（打开新的网页），localStorage会保留，sessionStorage不会被保留

* 属性：
  * Storage.length：只读属性  
  返回一个整数，表示存储在Storage对象中的数据项数量；

* 方法：
  * Storage.key(index)：该方法接受一个数值n作为参数，返回存储中的第n个key名称；
  * Storage.getItem()：该方法接受一个key作为参数，并且返回key对应的value；
  * Storage.setItem()：该方法接受一个key和value，并且将会把key和value添加到存储中。
  * Storage.removeItem()：该方法接受一个key作为参数，并把该key从存储中删除；
  * Storage.clear()：该方法的作用是清空存储中的所有key；

* storage工具封装 

```js
class Cache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage: sessionStorage
  }

  setCache(key, value) {
    if (!value) {
      throw new Error("value error: value必须有值!")
    }

    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key) {
    const result = this.storage.getItem(key)
    if (result) {
      return JSON.parse(result)
    }
  }

  removeCache(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache()
const sessionCache = new Cache(false)
```
## 正则表达式  

### 初步认识

* 正则表达式是一种字符串匹配利器，可以帮助我们搜索、获取、替代字符串

* 表示方法：使用RegExp类来创建，或者字面量的方式
  * 正则表达式主要由两部分组成：模式（patterns）和修饰符（flags）
```js
const re1 = /aaa/ig

const re2 = new RegExp("aaa","ig")
```

### 正则表达式适用方法

* exec：一个在字符串中执行查找匹配的 RegExp 方法，它返回一个数组（未匹配到则返回 null）

* test：一个在字符串中测试是否匹配的 RegExp 方法，它返回 true 或 false

* match：一个在字符串中执行查找匹配的 String 方法，它返回一个数组，在未匹配到时会返回 null

* matchAll：一个在字符串中执行查找所有匹配的 String 方法，它返回一个迭代器（iterator）

* search：一个在字符串中测试匹配的 String 方法，它返回匹配到的位置索引，或者在失败时返回-1

* replace：一个在字符串中执行查找匹配的 String 方法，并且使用替换字符串替换掉匹配到的子字符串

* split：一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中

### 修饰符flags

* g：全部的，匹配全部的
* i：忽略大小写
* m：多行匹配

### 字符类
* `\d`（“d” 来自 “digit”）数字：从 0 到 9 的字符

* `\s`（“s” 来自 “space”）空格符号：包括空格，制表符 \t，换行符 \n 和其他少数稀有字符，例如 \v，\f 和 \r

* `\w`（“w” 来自 “word”）“单字”字符：拉丁字母或数字或下划线 _

* `.`（点）点： . 是一种特殊字符类，它与 “除换行符之外的任何字符” 匹配

* `\D` 非数字：除 \d 以外的任何字符，例如字母

* `\S` 非空格符号：除 \s 以外的任何字符，例如字母

* `\W` 非单字字符：除 \w 以外的任何字符，例如非拉丁字母或空格

### 锚点

* 符号` ^ `和符号` $ `在正则表达式中具有特殊的意义，它们被称为“锚点”。
  * 符号 `^` 匹配文本开头；
  * 符号 `$` 匹配文本末尾；

* 词边界（Word boundary） `\b`
  * 词边界 \b 是一种检查，就像 ^ 和 $ 一样，它会检查字符串中的位置是否是词边界
  * 词边界测试 \b 检查位置的一侧是否匹配 \w，而另一侧则不匹配 “\w”

### 转义字符

* 如果要把特殊字符作为常规字符来使用，需要对其进行转义
  * 只需要在它前面加个反斜杠

* 常见的需要转义的字符：`[] \ ^ $ . | ? * + ( )`
  * 斜杠符号 ‘/’ 并不是一个特殊符号，但是在字面量正则表达式中也需要转义；


### 集合（Sets）和范围（Ranges）

* 有时候我们只要选择多个匹配字符的其中之一就可以：
  * 在方括号` […] `中的几个字符或者字符类意味着“搜索给定的字符中的任意一个”

* 集合（Sets）
  * 比如说，`[eao]` 意味着查找在 3 个字符 ‘a’、‘e’ 或者 `‘o’ 中的任意一个

* 范围（Ranges）
  * 方括号也可以包含字符范围
  * 比如说，`[a-z]` 会匹配从 a 到 z 范围内的字母，`[0-5]` 表示从 0 到 5 的数字
  * `[0-9A-F]` 表示两个范围：它搜索一个字符，满足数字 0 到 9 或字母 A 到 F
  * `\d` —— 和 `[0-9]` 相同
  * `\w` —— 和 `[a-zA-Z0-9_]` 相同

* 排除范围：除了普通的范围匹配，还有类似 `[^…]` 的“排除”范围匹配

### 量词（Quantifiers）

* 假设我们有一个字符串 +7(903)-123-45-67，并且想要找到它包含的所有数字
  * 因为它们的数量是不同的，所以我们需要给与数量一个范围
  * 用来形容我们所需要的数量的词被称为量词（ Quantifiers ）

* 数量 `{n}`
  * 确切的位数：{5}
  * 某个范围的位数：{3,5}

* 缩写：
  * `+`：代表“一个或多个”，相当于 {1,}
  * `?`：代表“零个或一个”，相当于 {0,1}。换句话说，它使得符号变得可选；
  * `*`：代表着“零个或多个”，相当于 {0,}。也就是说，这个字符可以多次出现或不出现；

### 贪婪（ Greedy）和惰性（ lazy）模式

* 如果我们有这样一个需求：匹配下面字符串中所有使用《》包裹的内容

* 默认情况下的匹配规则是查找到匹配的内容后，会继续向后查找，一直找到最后一个匹配的内容
  * 这种匹配的方式，我们称之为贪婪模式（Greedy）

* 懒惰模式中的量词与贪婪模式中的是相反的
  * 只要获取到对应的内容后，就不再继续向后匹配
  * 我们可以在量词后面再加一个问号 ‘?’ 来启用它
  * 所以匹配模式变为 *? 或 +?，甚至将 '?' 变为 ??

```js
// 1.贪婪模式/惰性模式
const message = "我最喜欢的两本书: 《黄金时代》和《沉默的大多数》、《一只特立独行的猪》"

// 默认.+采用贪婪模式
const nameRe1 = /《.+》/ig

const result1 = message.match(nameRe1)
console.log(result1)
//输出：['《黄金时代》和《沉默的大多数》、《一只特立独行的猪》']

// 使用惰性模式
const nameRe2 = /《.+?》/ig

const result2 = message.match(nameRe2)
console.log(result2)
//输出：['《黄金时代》', '《沉默的大多数》', '《一只特立独行的猪》']
```
### 捕获组（capturing group）

* 模式的一部分可以用括号括起来 (...)，这称为“捕获组（capturing group）”

* 这有两个作用：
  * 它允许将匹配的一部分作为结果数组中的单独项
  * 它将括号视为一个整体

* 方法 str.match(regexp)，如果 regexp 没有 g 标志，将查找第一个匹配并将它作为一个数组返回，有g的话返回所有匹配的数组：
  * 在索引 0 处：完全匹配
  * 在索引 1 处：第一个括号的内容
  * 在索引 2 处：第二个括号的内容
  * …等等…

* 命名组：
  * 用数字记录组很困难
  * 对于更复杂的模式，计算括号很不方便。我们有一个更好的选择：给括号起个名字
  * 这是通过在开始括号之后立即放置 ?<name> 来完成的

* 非捕获组：
  * 有时我们需要括号才能正确应用量词，但我们不希望它们的内容出现在结果中
  * 可以通过在开头添加 ?: 来排除组

* or是正则表达式中的一个术语，实际上是一个简单的“或”。
  * 在正则表达式中，它用竖线 | 表示
  * 通常会和捕获组一起来使用，在其中表示多个值

# 防抖-节流-拷贝-事件总线及其手写
* JavaScript是事件驱动的，大量的操作会触发事件，加入到事件队列中处理。
* 对于某些频繁的事件处理会造成性能的损耗，我们就可以通过防抖和节流来限制事件频繁的发生

## 防抖debounce

* 认识防抖
  * 当事件触发时，相应的函数并不会立即触发，而是会等待一定的时间；
  * 当事件密集触发时，函数的触发会被频繁的推迟；
  * 只有等待了一段时间也没有事件触发，才会真正的执行响应函数；

* 手写防抖(基本操作)

```js
function hydebounce(fn, delay) {
  // 1.用于记录上一次事件触发的timer
  let timer = null

  // 2.触发事件时执行的函数
  const _debounce = () => {
    // 2.1.如果有再次触发(更多次触发)事件, 那么取消上一次的事件
    if (timer) clearTimeout(timer)

    // 2.2.延迟去执行对应的fn函数(传入的回调函数)
    timer = setTimeout(() => {
      fn()
      timer = null // 执行过函数之后, 将timer重新置null
    }, delay);
  }

  // 返回一个新的函数
  return _debounce
}
```

## 节流throttle

* 认识节流
  * 当事件触发时，会执行这个事件的响应函数；
  * 如果这个事件会被频繁触发，那么节流函数会按照一定的频率来执行函数；
  * 不管在这个中间有多少次触发这个事件，执行函数的频繁总是固定的；

* 手写节流
```js
function hythrottle(fn, interval) {
  let startTime = 0

  const _throttle = function() {
    const nowTime = new Date().getTime()
    const waitTime = interval - (nowTime - startTime)
    if (waitTime <= 0) {
      fn()
      startTime = nowTime
    }
  }

  return _throttle
}
```
## 深拷贝

* JSON方法
```js
const obj4 = JSON.parse(JSON.stringify(info))
```
* 手写深拷贝
```js
function deepCopy(originValue, map = new WeakMap()) {
  // const map = new WeakMap()

  // 0.如果值是Symbol的类型
  if (typeof originValue === "symbol") {
    return Symbol(originValue.description)
  }

  // 1.如果是原始类型, 直接返回
  if (!isObject(originValue)) {
    return originValue
  }

  // 2.如果是set类型
  if (originValue instanceof Set) {
    const newSet = new Set()
    for (const setItem of originValue) {
      newSet.add(deepCopy(setItem))
    }
    return newSet
  }

  // 3.如果是函数function类型, 不需要进行深拷贝
  if (typeof originValue === "function") {
    return originValue
  }

  // 4.如果是对象类型, 才需要创建对象
  if (map.get(originValue)) {
    return map.get(originValue)
  }
  const newObj = Array.isArray(originValue) ? []: {}
  map.set(originValue, newObj)
  // 遍历普通的key
  for (const key in originValue) {
    newObj[key] = deepCopy(originValue[key], map);
  }
  // 单独遍历symbol
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (const symbolKey of symbolKeys) {
    newObj[Symbol(symbolKey.description)] = deepCopy(originValue[symbolKey], map)
  }

  return newObj
}
```

## 事件总线

* 事件总线（Event Bus）是一种用于在软件系统中传递事件和消息的机制。它基于发布-订阅模式，允许不同组件或模块之间进行解耦，通过发送和接收事件来实现彼此之间的通信。

* 手写事件总线
```js
class HYEventBus {
  constructor() {
    this.eventMap = {}
  }

  on(eventName, eventFn) {
    let eventFns = this.eventMap[eventName]
    if (!eventFns) {
      eventFns = []
      this.eventMap[eventName] = eventFns
    }
    eventFns.push(eventFn)
  }
  
  off(eventName, eventFn) {
    let eventFns = this.eventMap[eventName]
    if (!eventFns) return
    for (let i = 0; i < eventFns.length; i++) {
      const fn = eventFns[i]
      if (fn === eventFn) {
        eventFns.splice(i, 1)
        break
      }
    }

    // 如果eventFns已经清空了
    if (eventFns.length === 0) {
      delete this.eventMap[eventName]
    }
  }

  emit(eventName, ...args) {
    let eventFns = this.eventMap[eventName]
    if (!eventFns) return
    eventFns.forEach(fn => {
      fn(...args)
    })
  }
}
```

# 网络请求

## 数据请求方式

### 服务器端渲染（SSR，server side render）

* 客户端发出请求 -> 服务端接收请求并返回相应HTML文档 -> 页面刷新，客户端加载新的HTML文档

* 服务器端渲染的缺点：
  * 当用户点击页面中的某个按钮向服务器发送请求时，页面本质上只是一些数据发生了变化，而此时`服务器却要将重绘的整个页面再返回给浏览器加载`，这显然有悖于程序员的“DRY（ Don‘t repeat yourself ）”原则；
  * 而且明明只是一些数据的变化却迫使服务器要返回整个HTML文档，这本身也会给网络带宽带来不必要的开销。

  ![alt text](my_notes_images/18.服务端渲染.png)

### 前后端分离

![alt text](my_notes_images/19.前后端分离.png)

* 只向服务器请求新的数据，并且在阻止页面刷新的情况下，动态的替换页面中展示的数据：使用“AJAX”。

* AJAX是“Asynchronous JavaScript And XML”的缩写(异步的JavaScript和XML)，是一种实现 无页面刷新 获取服务器数据的技术
  * 在不重新加载页面的情况下与服务器通信，发送请求给服务器
  * 接受并使用从服务器发来的数据。

## HTTP

### 解释

* 定义解释

  * 超文本传输协议（英语：HyperText Transfer Protocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议

  * HTTP是万维网的数据通信的基础，设计HTTP最初的目的是`为了提供一种发布和接收HTML页面的方法`

  * 通过HTTP或者HTTPS协议请求的资源由统一资源标识符（Uniform Resource Identifiers，URI）来标识

* HTTP是一个客户端（用户）和服务端（网站）之间请求和响应的标准

  * 通过使用网页浏览器、网络爬虫或者其它的工具，客户端发起一个HTTP请求到服务器上指定端口（默认端口为80）
    * 我们称这个客户端为用户代理程序（user agent）

  * 响应的服务器上存储着一些资源，比如HTML文件和图像
    * 我们称这个响应服务器为源服务器（origin server）

### HTTP的组成与版本

* 页面中的数据展示、搜索数据、表单验证等等，是通过在JavaScript中发送HTTP请求获取的

* 一次HTTP请求主要包括：请求（Request）和响应（Response）
![alt text](my_notes_images/20.HTTP组成.png)

* HTTP的版本

  * HTTP/0.9 
    * 发布于1991年
    * 只支持GET请求方法获取文本数据，当时主要是为了获取HTML页面内容

  * HTTP/1.0 
    * 发布于1996年
    * 支持POST、HEAD等请求方法，支持请求头、响应头等，支持更多种数据类型(不再局限于文本数据) 
    * 但是浏览器的每次请求都需要与服务器建立一个TCP连接，请求处理完成后立即断开TCP连接，每次建立连接增加了性能损耗

  * HTTP/1.1(目前使用最广泛的版本) 
    * 发布于1997年
    * 增加了PUT、DELETE等请求方法
    * 采用持久连接(Connection: keep-alive)，多个请求可以共用同一个TCP连接

  * 2015年，HTTP/2.0

  * 2018年，HTTP/3.0

### HTTP请求方式

* GET：GET 方法请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据

* HEAD：HEAD 方法请求一个与 GET 请求的响应相同的响应，但没有响应体  
比如在准备下载一个文件前，先获取文件的大小，再决定是否进行下载

* POST：POST 方法用于将实体提交到指定的资源

* PUT：PUT 方法用请求有效载荷（payload）替换目标资源的所有当前表示

* DELETE：DELETE 方法删除指定的资源

* PATCH：PATCH 方法用于对资源应部分修改

* CONNECT：CONNECT 方法建立一个到目标资源标识的服务器的隧道，通常用在代理服务器，网页开发很少用到

* TRACE：TRACE 方法沿着到目标资源的路径执行一个消息环回测试

### HTTP Request Header

* 在request对象的header中也包含很多有用的信息，客户端会默认传递过来一些信息
![alt text](<my_notes_images/21.HTTP Request Header.png>)

* `content-type`是这次请求携带的数据的类型

  * application/x-www-form-urlencoded：表示数据被编码成以 '&' 分隔的键 - 值对，同时以 '=' 分隔键和值
  * application/json：表示是一个json类型；
  * text/plain：表示是文本类型；
  * application/xml：表示是xml类型；
  * multipart/form-data：表示是上传文件；

* content-length：文件的大小长度

* keep-alive：
  * http是基于TCP协议的，但是通常在进行一次请求和响应结束后会立刻中断
  * 在http1.0中，如果想要继续保持连接：
    * 浏览器需要在请求头中添加 connection: keep-alive
    * 服务器需要在响应头中添加 connection:keey-alive
    * 当客户端再次放请求时，就会使用同一个连接，直接一方中断连接
  * 在http1.1中，所有连接默认是 connection: keep-alive的；
    * 不同的Web服务器会有不同的保持 keep-alive的时间
    * Node中默认是5s中

* accept-encoding：告知服务器，客户端支持的文件压缩格式，比如js文件可以使用gzip编码，对应 .gz文件

* accept：告知服务器，客户端可接受文件的格式类型

* user-agent：客户端相关的信息

### HTTP Response响应状态码

* 200：`OK` 客户端请求成功
* 201：`Created` POST请求，创建新的资源
* 301：`Moved Permanently` 请求资源的URL已经修改，响应中会给出新的URL
* 400：`Bad Request` 客户端的错误，服务器无法或者不进行处理
* 401：`Unauthorized` 未授权的错误，必须携带请求的身份信息
* 403：`Forbidden` 客户端没有权限访问，被拒接
* 404：`Not Found` 服务器找不到请求的资源。
* 500：`Internal Server Error` 服务器遇到了不知道如何处理的情况。
* 503：`Service Unavailable` 服务器不可用，可能处理维护或者重载状态

![alt text](<my_notes_images/22.HTTP Response Headers .png>)


## XMLHttpRequest(XHR)

### AJAX发送请求

* AJAX 是异步的 JavaScript 和 XML（Asynchronous JavaScript And XML）
  * 它可以使用 JSON，XML，HTML 和 text 文本等格式发送和接收数据

* 如何来完成AJAX请求呢？
  * 第一步：创建网络请求的AJAX对象（`使用XMLHttpRequest对象`）
  * 第二步：监听XMLHttpRequest对象状态的变化，或者监听onload事件（请求完成时触发）
  * 第三步：配置网络请求（通过open方法）
    * 默认异步请求
    * 第三个参数填false可以改为痛不请求，会阻塞后续代码进行
  * 第四步：发送send网络请求

```js
// 1.创建XMLHttpRequest对象
const xhr = new XMLHttpRequest()

// 2.监听状态的改变(宏任务)
xhr.onreadystatechange = function() {
  // console.log(xhr.response)
  if (xhr.readyState !== XMLHttpRequest.DONE) return 

  // 将字符串转成JSON对象(js对象)
  const resJSON = JSON.parse(xhr.response)
  const banners = resJSON.data.banner.list
  console.log(banners)
}

// 3.配置请求open
// method: 请求的方式(get/post/delete/put/patch...)
// url: 请求的地址
// true/false：是否异步请求
xhr.open("get", "url"[,true/false])

// 4.发送请求(浏览器帮助发送对应请求)
xhr.send()
```
### XMLHttpRequest的事件监听（宏任务）

* readystatechange：监听HTTP状态的改变

* loadstart：请求开始

* progress： 一个响应数据包到达，此时整个 response body 都在 response 中

* abort：调用 xhr.abort() 取消了请求

* error：发生连接错误，例如，域错误。不会发生诸如 404 这类的 HTTP 错误

* load：请求成功完成

* timeout：由于请求超时而取消了该请求（仅发生在设置了 timeout 的情况下）

* loadend：在 load，error，timeout 或 abort 之后触发

### XMLHttpRequest的state（状态）

* 0：`UNSENT` ：代理被创建，但尚未调用 open() 方法。
* 1：`OPENED` ：open() 方法已经被调用。
* 2：`HEADERS_RECEIVED` ：send() 方法已经被调用，并且头部和状态已经可获得。
* 3：`LOADING` ：下载中；responseText 属性已经包含部分数据。
* 4：`DONE` ：下载操作已完成。

### 响应数据和响应类型

* 发送了请求后，我们需要获取对应的结果：response属性
  * XMLHttpRequest response 属性返回响应的正文内容
  * 返回的类型取决于responseType的属性设置

* 通过responseType可以设置获取数据的类型
  * 如果将 responseType 的值设置为空字符串，则会使用 text 作为默认值

* 和responseText、responseXML的区别：
  * 早期通常服务器返回的数据是普通的文本和XML，所以我们通常会通过responseText、 responseXML来获取响应结果
  * 之后将它们转化成JavaScript对象形式
  * 目前服务器基本返回的都是json数据，直接设置为json即可

```js
xhr.responseType = "json"
console.log(xhr.response)//自动就转换成对象了
```

### HTTP响应的状态status（404之类的）
* XMLHttpRequest的state是用于记录xhr对象本身的状态变化，并非针对于HTTP的网络请求状态。
* 如果我们希望获取HTTP响应的网络状态，可以通过status和statusText来获取：

### GET/POST请求传递参数

* `xhr.setRequestHeader("Content-type", "类型")`可以改变传递类型
* 在开发中，我们使用最多的是GET和POST请求，在发送请求的过程中，我们也可以传递给服务器数据
  * 方式一：GET请求的query参数
  * 方式二：POST请求 x-www-form-urlencoded 格式
  * 方式三：POST请求 FormData 格式（将表单里面的数据发过去）
  * 方式四：POST请求 JSON 格式

```js

  // 创建xhr对象
  const xhr = new XMLHttpRequest()
  // 监听数据响应
  xhr.onload = function() {
    console.log(xhr.response)
  }
  // 配置请求
  xhr.responseType = "json"


// 1.传递参数方式一: get -> query
xhr.open("get", "http://123.207.32.32:1888/02_param/get?name=why&age=18&address=广州市")

// 2.传递参数方式二: post -> urlencoded
xhr.open("post", "http://123.207.32.32:1888/02_param/posturl")
//本次请求的数据类型设置
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
// 发送请求(请求体body)
xhr.send("name=why&age=18&address=广州市")

// 3.传递参数方式三: post -> formdata
const formEl = document.querySelector(".info")
xhr.open("post", "http://123.207.32.32:1888/02_param/postform")
// formElement对象转成FormData对象
const formData = new FormData(formEl)
xhr.send(formData)

// 4.传递参数方式四: post -> json
xhr.open("post", "http://123.207.32.32:1888/02_param/postjson")
xhr.setRequestHeader("Content-type", "application/json")
xhr.send(JSON.stringify({name: "why", age: 18, height: 1.88}))
```

### AJAX网络请求工具封装

* 封装
```js
function hyajax({
  url,
  method = "get",
  data = {},
  headers = {}, // token
  success,
  failure
} = {}) {
  // 1.创建对象
  const xhr = new XMLHttpRequest()

  // 2.监听数据
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      success && success(xhr.response)
    } else {
      failure && failure({ status: xhr.status, message: xhr.statusText })
    }
  }

  // 3.设置类型
  xhr.responseType = "json"

  // 4.open方法
  if (method.toUpperCase() === "GET") {
    const queryStrings = []
    for (const key in data) {
      queryStrings.push(`${key}=${data[key]}`)
    }
    url = url + "?" + queryStrings.join("&")
    xhr.open(method, url)
    xhr.send()
  } else {
    xhr.open(method, url)
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(JSON.stringify(data))
  }

  return xhr
}
```

* 调用
```js
hyajax({
  url: "http://123.207.32.32:1888/02_param/get",
  method: "GET",
  data: {
    name: "why",
    age: 18
  },
  success: function(res) {
    console.log("res:", res)
  },
  failure: function(err) {
    // alert(err.message)
  }
})

// hyajax({
//   url: "http://123.207.32.32:1888/02_param/postjson",
//   method: "post",
//   data: {
//     name: "jsondata",
//     age: 22
//   },
//   success: function(res) {
//     console.log("res:", res)
//   },
//   failure: function(err) {
//     // alert(err.message)
//   }
// })
```

### 延迟时间timeout和取消请求

* 在网络请求的过程中，为了避免过长的时间服务器无法返回数据，通常我们会为请求设置一个超时时间：timeout。
  * 当达到超时时间后依然没有获取到数据，那么这个请求会自动被取消掉；
  * 默认值为0，表示没有设置超时时间；
```js
xhr.timeout = 3000  //3s过期

xhr.abort()  //手动取消请求结果
```

## Fetch函数使用

* json()方法是 Fetch API 的 Response 对象中的一个方法，用于将响应体文本解析为 JSON 对象。

```js
// 1.fetch发送get请求
// 1.1.未优化的代码
fetch("http://123.207.32.32:8000/home/multidata").then(res => {
  // 1.获取到response
  const response = res
 
  // 2.获取具体的结果
  response.json().then(res => {
    console.log("res:", res)
  })
}).catch(err => {
  console.log("err:", err)
})

// 1.2. 优化方式一:
fetch("http://123.207.32.32:8000/home/multidata").then(res => {
  // 1.获取到response
  const response = res
  // 2.获取具体的结果
  return response.json()
}).then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
})

// 1.3. 优化方式二:
async function getData() {
  const response = await fetch("http://123.207.32.32:8000/home/multidata")
  const res = await response.json()
  console.log("res:", res)
}
getData()
```