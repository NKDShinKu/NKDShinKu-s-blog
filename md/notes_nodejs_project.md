# 认识Node.js

## 解释Node.js

* 定义：Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境

* 和chrome浏览器的区别
  * Chrome中，要解析、渲染HTML、CSS等相关渲染引擎，提供支持浏览器操作的API、浏览器自己的事件循环等
  * Node.js中要进行一些额外的操作，比如文件系统读/写、网络IO、加密、压缩解压文件等操作

## 安装与管理

* 安装时有两种版本：
  * LTS版本：（Long-term support, 长期支持）相对稳定一些，推荐线上环境使用该版本
  * Current版本：最新的Node版本，包含很多新特性
  * 安装直接点下一步到安装完成没什么问题

* 版本管理工具：nvm  
  * 链接：https://github.com/coreybutler/nvm-windows
  * 通过 nvm install latest 安装最新的node版本
  * 通过 nvm list 展示目前安装的所有版本
  * 通过 nvm use xx.x.x 切换版本

## 基础使用

* 在终端中进行操作(cmd, powshell, git bash)：
  * 运行JS：`node index.js`
  * 运行JS并输入参数：`node index.js 参数1 参数2`
  * 参数是在process内置对象中的，包含参数和其他的一些信息，比如版本、操作系统等
  * 可以使用`process.argv`获得参数数组，通过索引得到参数。

* 输出
  * console.log：最常用的打印内容的方式
  * console.clear：清空控制台
    * cmd可以用`cls`清除
  * console.trace：打印函数的调用栈

* REPL：Read-Eval-Print Loop的简称，翻译为“读取-求值-输出”循环
  * 终端输入node就进入这个模式
  * 这个模式就和浏览器控制台一样，`交互式命令`

## 一些全局对象 path

特殊的全局对象（全局对象实际上是模块中的变量，只是每个模块都有，看来像是全局变量）：
* `__dirname`：获取当前文件所在的路径
* `__filename`：获取当前文件所在的路径和文件名称

常见的全局对象：
* `process`：process提供了Node进程中相关的信息
* `console`：提供了简单的调试控制台
* `setTimeout(callback, delay[, ...args])`：callback在delay毫秒后执行一次；
* `setInterval(callback, delay[, ...args])`：callback每delay毫秒重复执行一次；
* `setImmediate(callback[, ...args])`：callbackI / O事件后的回调的“立即”执行（和事件循环有关系）
* `process.nextTick(callback[, ...args])`：添加到下一次tick队列中

* `global`：类似于window的全局对象
  * 在浏览器中执行的JavaScript代码，如果我们在顶级范围内通过var定义的一个属性，默认会被添加到window对象上
  * 在node中，我们通过var定义一个变量，它只是在当前模块中有一个变量，不会放到全局中

# 模块化开发

## 认识模块化开发

* 什么是模块化
  * 将程序划分成一个个小的结构（`多个JS文件`）
  * 结构中编写属于自己的逻辑代码，`有自己的作用域`，定义`变量名词时不会影响到其他的结构`
  * 结构可以导出 变量、函数、对象 等给其他结构使用
  * 解构也可以导入 变量、函数、对象 进行使用

* 为什么要模块化
  * 将复杂代码简单化
  * 防止命名冲突等问题

* 早期模块化（立即函数调用表达式）
```js
(function() {
  let name = "bbb"
  console.log(name)
}())
```
* 怎么模块化？
  * 在html中引入script时加上type = "module"即可
  ```html
  <script src = "./index.js" type = "module"> </script>
  ```

## 模块化——CommonJS规范（CJS）

* 应用场景
  * Node是CommonJS在服务器端一个具有代表性的实现
  * Browserify是CommonJS在浏览器中的一种实现
  * webpack打包工具具备对CommonJS的支持和转换

* 认识CommonJS规范
  * 在Node中`每一个js文件都是一个单独的模块`
  * 模块中包括CommonJS规范的核心变量：`exports、module.exports、require`
  * 我们可以使用这些变量来方便的进行模块化开发

* 导出——`exports`与`module exports`

  * 我们可以通过这两种方式进行导出：  
  假设有JS文件`index.js`如下
  ```js
  let name1 = "aaa"
  let name2 = "bbbb"
  exports.name1 = name1
  exports.name2 = name2
  ```
  ```js
  let name1 = "aaa"
  let name2 = "bbbb"
  module.exports.name1 = name1
  module.exports.name2 = name2
  ```
  * 如此做，相当于把这个JS文件中的值加入了一个对象

  * `exports`与`module exports`的关系
    * `默认情况exports 和 module exports 都指向同一个对象`
    * CommonJS中是没有module.exports的概念的
    * 但是为了实现模块的导出，Node中使用的是Module的类，每一个模块都是Module的一个实例，也就是module
    * 所以`在Node中真正用于导出的其实不是exports，而是module.exports`
    * 因为module才是导出的真正实现者
  
* 导入——`require`

  * 通过`require("文件路径")`将上方的内容进行导入：  
  假设这是另外一个JS文件
  ```js
  const bar = require("./index.js")
  console.log(bar.name1, bar.name2)

  const {name1,name2} = require("./index.js")
  console.log(name1, name2)
  ```
  * 如此做，`相当于引用赋值，和module.exports指向同一个对象`，然后就可以使用index.js中的导出内容了

* 优化导出module.exports
  * 按照上面的方法，exports、module.exports、require("./index.js")都指向同一个对象。
    * 通过其中一个方式修改值会影响其他方式

  * 这种导出方法更简便、更好：
  ```js
  let name1 = "aaa"
  let name2 = "bbbb"

  module.exports = {
    name1,
    name2
  }
  ```
  * 如此做，相当于给 module.exports 创建了新对象，然后 require("./index.js")和 module.exports 会指向同一个对象
    * exports就和上面2个不是一个对象了

* require导出规则  
假设导入格式如下：require("X")

  * **X是以 ./ 或 ../ 或 /（根目录）路径开头的（比如./X）**
    1. 如果X有后缀名，按照后缀名的格式查找对应的文件

    2. 如果X没有后缀名，会按照下文顺序  
    直接查找文件X -> 查找X.js文件 -> 查找X.json文件 -> 查找X.node文件

    3. 没有找到对应的文件，将X作为一个目录：  
    查找X/index.js文件 -> 查找X/index.json文件 -> 查找X/index.node文件

    4. 没找到就报错
  
  * **X是一个Node核心模块，比如path、http，直接返回核心模块，并且停止查找**
  
  * **直接是一个X（没有路径），并且X不是一个核心模块**
    * 先找本层的node modules文件夹，看看里面有没有X
    * 如果找不到，就会再找上层，直到根目录
    * 没找到就报错

* 模块加载过程顺序：深度优先算法

* CommonJS规范缺点
  * CommonJS加载模块是同步的：只有等到对应的模块加载完毕，当前模块中的内容才能被运行
  * 浏览器加载js文件需要先从服务器将文件下载下来，之后再加载运行，采用同步的就意味着后续的js代码都无法正常运行，即使是一些简单的DOM操作
  
  * 早期采用AMD和CMD解决这个问题

* 注意：CommonJS不能直接在浏览器运行，因为浏览器缺少四个Node.js环境的变量：  
module、exports、require、global
  * 解决：使用 Browserify 对 CommonJS 进行格式转换
  
## 模块化——ESModule

* ESModule的核心关键字
  * `export`负责将模块内的内容导出；
  * `import`负责从其他模块导入内容；
  * 采用ES Module将自动采用严格模式：use strict

* 注意1
  * 通过本地加载Html 文件 (比如一个 file:// 路径的文件), 会出现CORS 错误，因为 Javascript 模块安全性需要
  * 解决：通过一个服务器来打开，比如VSCode插件 Live Server

* 注意2
  * 在node里运行，需要在配置文件package.json中加入`type = "module"`字段


* `export`关键字——导出 (假设这里JS文件名为 "foo.js")

  1. 将所有需要导出的标识符，放到export后面的{ }中（注意这个不是对象）
    ```js
    const name = "why"
    const age = 18
    function sayHello() {
      console.log("sayHello")
    }
    //导出方法一
    export {
      name,
      age,
      sayHello
    }
    ```
  2. 导出时使用as给标识符起一个别名
    ```js
    const name = "why"
    const age = 18
    function sayHello() {
      console.log("sayHello")
    }
    //导出方法二：导出时使用as取别名
    export {
      name as mname,
      age as mage,
      sayHello as msayHello
    }
    ```
  3. 在语句声明的前面直接加上export关键字
    ```js
    //导出方式三:直接在语句声明时就导出
    export const name = "why"
    export const age = 18
    export function sayHello() {
      console.log("sayHello")
    }
    ```

* `import`关键字——导入 (假设这里JS文件名为 "main.js")
  1. import {标识符列表} from '模块' （注意`{ }`不是对象）
    ```js
    //导入方法一
    import { name, age, sayHello } from "./foo.js"
    ```
  2. 导入时通过as关键字起别名
    ```js
    //导入方法二
    import { name as fname, age, sayHello } from "./foo.js"
    ```
  3. 通过 * 将模块功能放到一个模块功能对象（a module object）上
    ```js
    //导入方法三
    import * as foo from "./foo.js"

    console.log(foo.name,foo.age)
    foo.sayHello()
    ```

* `export`与`import`结合  
  * 可以直接在这个JS文件中将其他所有JS文件所需内容导入并导出  
  假设这个文件叫"index.js"
    ```js
    export {name} from "./foo.js"
    export {age} from "./bar.js"
    ```
  * 这样在引入时只看这个文件就行了
    ```js
    export {name,age} from "./index.js"
    ```

* 默认导出——default export
  * 默认导出export时可以不需要指定名字
  * 在导入时不需要使用 {}，并且可以自己来指定名字
  * 它也方便我们和现有的CommonJS等规范相互操作
  ```js
  //导出一
   function parseLyric() {
     return ["歌词"]
   }
   export default parseLyric
  ```
  ```js
  //导入一
  import { parseLyric } from "./parse_lyric.js"
  ```

  ```js
  //导出二：不写名字
  export default function() {
    return ["新歌词"]
  }
  ```
  ```js
  //导入二：自己指定名字
  import parseLyric from "./parse_lyric.js"
  ```
  * 注意：在一个模块中，只能有一个默认导出

* `import函数`
  
  * 为什么有import函数？
    * ES Module在被JS引擎解析时，就必须知道它的依赖关系
    * 所以import关键字导入时不能放在 if 语句里面
  
  * 使用 import() 函数来动态加载
    * import函数返回一个Promise，可以通过then获取结果
  ```js
  let flag = true
  if(flag) {
    import("./foo.js").then(res => {
      console.log(res.name, res.age)
    })
  }
  ```
* import.meta
  * 是一个给JavaScript模块暴露特定上下文的元数据属性的对象。
  * 它包含了这个模块的信息，比如说这个模块的URL；
  * 在ES11（ES2020）中新增的特性；

# npm与包管理工具

## 认识包管理工具

* 开发中我们可以通过模块化的方式来封装自己的代码，并且封装成一个工具，分享给世界各地的程序员。

* 方式一：上传到GitHub上、其他程序员通过GitHub下载我们的代码手动的引用

* 方式二：使用一个专业的工具来管理我们的代码（包管理工具）
  * 我们通过工具将代码发布到特定的位置
  * 其他程序员直接通过工具来安装、升级、删除我们的工具代码

## npm包管理工具

* Node Package Manager，也就是Node包管理器

* 可以管理比如vue、vue-router、vuex、express、koa、react、react-dom、axios、babel、webpack等

* 发布自己的包和安装包都是通过registry库实现的

* 下载太慢，使用科学上网，clash for window代理端口一般为7890，自己修改。
  * npm config set proxy http://127.0.0.1:7890
  * npm config set https-proxy http://127.0.0.1:7890
  * 其他
    * npm config delete https-proxy
    * npm config delete proxy
    * npm config get https-proxy
    * npm config get proxy
## npm的配置文件
* 这个配置文件就是`package.json`

* 一个项目，会有配置文件进行管理信息
  * 这个配置文件会记录着你项目的名称、版本号、项目描述等
  * 也会记录着你项目所依赖的其他库的信息和依赖库的版本号

* 创建方式
  * 自己命名文件，自己填信息
  * 手动从零创建项目，使用命令：
    * `npm init` #创建时填写信息
    * `npm init -y` # 所有信息使用默认的
  * 通过脚手架创建项目，脚手架会帮助我们生成package.json，并且里面有相关的配置

## npm配置文件常见属性1
* name：项目的名称（必填）
* version：当前项目的版本号（必填）
* description：描述信息，很多时候是作为项目的基本描述
* author：作者相关信息（发布时用到）
* license：是开源协议（发布时用到）
* private：当值为true时，npm是不能发布它的，这是防止私有项目或模块发布出去的方式

## npm配置文件常见属性2

* main属性：设置程序的入口
  * 比如我们使用axios模块 const axios = require('axios')
  * 如果有main属性，实际上是找到对应的main中的值作为程序入口
  * main默认为当前目录的index.js

* scripts属性
  * scripts属性用于配置一些脚本命令，以键值对的形式存在
  * 配置后我们可以通过 npm run 命令的key来执行这个命令
    * 对于常用的 start、 test、stop、restart可以省略掉run直接通过 npm start等方式运行

* dependencies属性（环境依赖）
  * dependencies属性是指定无论开发环境还是生成环境都需要依赖的包
  * 通常是我们项目实际开发用到的一些库模块vue、vuex、vue-router、react、react-dom、axios等等
  * 与之对应的是devDependencies

* devDependencies属性（开发环境依赖）
  * 一些包在生成环境是不需要的，比如webpack、babel等
  * 客户使用不需要开发环境
  * 这个时候我们会通过 npm install webpack --save-dev，将它安装到devDependencies属性中

* peerDependencies属性 （对等环境依赖）
  * 你依赖的一个包，它必须是以另外一个宿主包为前提的
  * 比如element-plus是依赖于vue3的，ant design是依赖于react、react-dom

* engines属性
  * engines属性用于指定Node和NPM的版本号
  * 在安装的过程中，会先检查对应的引擎版本，如果不符合就会报错
  * 事实上也可以指定所在的操作系统 "os" : [ "darwin", "linux" ]，只是很少用到

* browserslist属性
  * 用于配置打包后的JavaScript浏览器的兼容情况，参考
  * 否则我们需要手动的添加polyfills来让支持某些语法
  * 也就是说它是为webpack等打包工具服务的一个属性（这里不是详细讲解webpack等工具的工作原理，所以不再给出详情）

## 版本管理

* semver版本规范是X.Y.Z：
  * X主版本号（major）：当你做了不兼容的 API 修改（可能不兼容之前的版本）
  * Y次版本号（minor）：当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）
  * Z修订号（patch）：当你做了向下兼容的问题修正（没有新功能，修复了之前版本的bug）

* 我们这里解释一下 ^和~的区别：
  * x.y.z：表示一个明确的版本号
  * ^x.y.z：表示x是保持不变的，y和z永远安装最新的版本
  * ~x.y.z：表示x和y保持不变的，z永远安装最新的版本

## npm常见命令

* 解释全局安装
  * 通常使用npm全局安装的包都是一些工具包：yarn、webpack等
  * 并不是类似于 axios、express、koa等库文件
  * 所以全局安装了之后并不能让我们在所有的项目中使用 axios等库

* 全局安装：npm install yarn -g

* 局部安装1：npm install axios
  * 即安装开发和生成环境依赖（dependencies中）

* 局部安装2：
  * npm install webpack --save-dev
  * npm install webpack -D
  * npm i webpack –D
  * 即安装开发环境依赖（devDependencies中）

* 根据package.json中的依赖包：npm install

* 卸载某个依赖包：
  * npm uninstall package
  * npm uninstall package --save-dev
  * npm uninstall package -D

* 强制重新安装：npm rebuild

* 清除缓存：npm cache clean

## install原理

![alt text](<my_notes_images/23.npm install原理图.png>)

* npm install会检测是有package-lock.json文件：

* 没有lock文件
  * 分析依赖关系，这是因为我们可能包会依赖其他的包，并且多个包之间会产生相同依赖的情况
  * 从registry仓库中下载压缩包（如果我们设置了镜像，那么会从镜像服务器下载压缩包）
  * 获取到压缩包后会对压缩包进行缓存（从npm5开始有的）
  * 将压缩包解压到项目的node_modules文件夹中（前面我们讲过，require的查找顺序会在该包下面查找）

* 有lock文件
  * 检测lock中包的版本是否和package.json中一致（会按照semver版本规范检测）
  * 不一致，那么会重新构建依赖关系，直接会走顶层的流程
  * 一致的情况下，会去优先查找缓存
  * 没有找到，会从registry仓库下载，直接走顶层流程
  * 查找到，会获取缓存中的压缩文件，并且将压缩文件解压到node_modules文件夹中

## package-lock.json文件

* name：项目的名称

* version：项目的版本

* lockfileVersion：lock文件的版本

* requires：使用requires来跟踪模块的依赖关系

* dependencies：项目的各种依赖
  * 假设项目依赖axios，但是axios依赖follow-redireacts
  * 那么axios中的属性如下
    * version表示实际安装的axios的版本
    * resolved用来记录下载的地址，registry仓库中的位置
    * requires/dependencies记录当前模块的依赖
    * integrity用来从缓存中获取索引，再通过索引去获取压缩包文件

![alt text](my_notes_images/24.package-lock的解析.png)



## yarn工具

* 另一个node包管理工具yarn：

  * yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具

  * yarn 是为了弥补 早期npm 的一些缺陷而出现的

  * 早期的npm存在很多的缺陷，比如安装依赖速度很慢、版本依赖混乱等等一系列的问题
  
![alt text](my_notes_images/25.npm与yarn命令.png)



## cnpm工具

* 由于一些特殊的原因，某些情况下我们没办法很好的从 https://registry.npmjs.org下载下来一些需要的包

* 查看npm镜像：npm config get registry # npm config get registry

* 我们可以直接设置npm的镜像：npm config set registry https://registry.npm.taobao.org

* 但是对于大多数人来说（比如我），并不希望将npm镜像修改了
  * 第一，不太希望随意修改npm原本从官方下来包的渠道
  * 第二，担心某天淘宝的镜像挂了或者不维护了，又要改来改去

* 这个时候，我们可以使用cnpm，并且将cnpm设置为淘宝的镜像
  * npm install -g cnpm --registry=https://registry.npm.taobao.org
  * cnpm config get registry # https://r.npm.taobao.org

## npx工具

* npx是npm5.2之后自带的一个命令

* 作用：使一般用它来调用项目中的某个模块的指令
  * 它会到当前目录的node_modules/.bin目录下查找对应的命令

* 举例：假如我们想看yarn的版本号，但是有一个全局的yarn，又有一个局部的yarn
  * yarn --version：全局yarn版本
  * ./node_modules/.bin/yarn --version：局部yarn版本
  * 修改package.json中的scripts：
    ```json
    "scripts": {
      "yarn": "yarn --version"
    }
    ```
    然后在终端运行yarn：局部yarn版本
  * `npx yarn --version`：局部yarn版本


## 文件的软硬链接

* 文件的拷贝：很常见，会在硬盘中复制出来一份新的文件数据
  * 终端命令：`copy foo.js foo_copy.js`

* 硬链接：电脑文件系统中的多个文件平等地共享同一个文件存储单元
  * 可以类比强引用，多个对象为同一地址
  * 删除一个文件名字后，还可以用其它名字继续访问该文件
  * 终端命令：`mklink /H aaa_hard.js aaa.js`

* 软链接：包含有一条以绝对路径或者相对路径的形式指向其它文件或者目录的引用
  * 其实就是给一个文件创建了快捷方式
  * 终端命令：`mklink aaa_soft.js aaa.js`

## pnpm —— performant npm

* 优势：速度快，节省磁盘空间，支持monorepos单仓多包，严格创建非平铺node_modules

* pnpm的原理
  * 使用 pnpm，依赖包将被 存放在一个统一的位置
  * 对同一依赖包使用相同的版本，那么磁盘上只有这个依赖包的一份文件
  * 对同一依赖包需要使用不同的版本，则仅有 版本之间不同的文件会被存储起来
  * 所有文件都会硬链接到硬盘上统一位置的数据，而不会占用 额外的硬盘空间

* 非扁平的 node_modules 
  * 当使用 npm 或 Yarn Classic 安装依赖包时，所有软件包都将被提升到 node_modules 的根目录下，因此代码可以访问任意包
  * pnpm会严格创建非平铺node_modules，因此代码无法访问任意包

* 安装：`npm install -g pnpm`

* 常用命令对比：
  * npm install： `pnpm install`
  * npm install 包名： `pnpm add 包名`
  * npm uninstall 包名： `pnpm remove 包名`
  * npm run 脚本： `pnpm 脚本`

# webpack

## 内置模块path的使用

安装需要：webpack webpack-cil  
`npm install webpack webpack-cli –D`  
`npm install webpack webpack-cli -g`

* 作用：用于对路径和文件进行处理

* 获取路径信息：
  * `path.dirname(x)`：获取文件的父文件夹
  * `path.basename(x)`：获取文件名
  * `path.extname(x)`：获取文件扩展名

* 路径拼接：`path.join(x1,x2,...)`
  * 多个路径进行拼接
  * 屏蔽操作系统路径不同的差异

* 绝对路径拼接：`path.resolve()`
  * 把一个路径或路径片段的序列解析为一个绝对路径
  * 给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径
  * 如果在处理完所有给定path的段之后，还没有生成绝对路径，则使用当前工作目录
  * 如果没有path传递段，path.resolve()将返回当前工作目录的绝对路径

* 在webpack中获取路径或者起别名的地方也可以使用

## webpack的作用
* WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

* JavaScript的打包：
  * 将ES6转换成ES5的语法

* TypeScript的处理，将其转换成JavaScript

* Css的处理：
  * CSS文件模块的加载、提取
  * Less、Sass等预处理器的处理

* 资源文件img、font：
  * 图片img文件的加载
  * 字体font文件的加载

* HTML资源的处理：
  * 打包HTML资源文件

* 处理vue项目的SFC文件.vue文件

## webpack的默认打包

* 全局打包：`webpack`

* 局部打包：`npx webpack`  
其他方法：  
`./node_modules/.bin/webpack`  
编写脚本文件`"build": "(npx) webpack"`，再使用`npm run build`


* 打包的需要与结果：
  1. 运行webpack时，webpack会查找当前目录下的`src/index.js`作为入口（没有则报错）
  2. 生成打包文件夹`dist`，里面有打包好的文件`main.js`
  3. 文件中的代码被压缩和丑化了
 
* 指定入口与打包结果：  
`npx webpack --entry ./src/main.js --output-path ./build`

* webpack打包过程
  * 找到入口文件，从入口开始。
  * 生成一个 `依赖关系图`，这个依赖关系图会包含应用程序中所需的所有模块（比如.js文件、css文件、图片、字体等）
  * 遍历图结构，打包一个个模块

## webpack配置文件

* 创建`webpack.config.js`文件，来作为webpack的配置文件
  * 名字默认是这个，必须一样

* 如果配置文件名不是默认，假如是wk.config.js
  * 执行`webpack --config wk.config.js`来指向配置文件
  
```js
const path = require("path")  //导入path模块，后续使用绝对路径

module.exports = {
  entry: "./src/main.js",   //程序入口
  output: {
    filename: "bundle.js",  //打包好的文件名字
    path: path.resolve(__dirname, "./build")  //文件位置（必须为绝对路径）
  }
}
```

## 打包非默认文件（css,vue,img...）

### 打包需要加载loader

* 什么是loader？

  * 在使用css等文件时，可以将css等文件也看成是一个模块，通过import来加载这个模块
    ```js
    //举例
    import "../css/div_style.css"
    ```
  * webpack默认不能进行加载，需要对应的loader来完成

  * loader可以用于对模块的源代码进行转换

* loader配置,在webpack配置的module.rules数组中，填写各个对象。这些对象有以下属性：
  * test属性：用于对 resource（资源）进行匹配的，通常会设置成正则表达式
  * use属性：对应的值时一个数组：[UseEntry]
    * UseEntry是一个对象，可以在里面设置一些其他属性
    * loader：必须有一个 loader属性，对应的值是一个字符串
    * options：可选的属性，值是一个字符串或者对象，值会被传入到loader中
    
  * use简写一：uses数组里面填字符串，就代表loader
  * use简写二：直接在rules里面填loader:"xxx"，代表加载单个loader
  ```js
  module.exports={
    module:{

    }
  }
  ```
  ```js
  module: {

    rules: [
      {
        // 告诉webpack匹配什么文件，一般为正则表达式
        test: /\.css$/,
        //use数组
        use: [ 
           { loader: "style-loader" },
           { loader: "css-loader",
             options:{...}
           }
        ]
      },
    ]

  }
  ```
  
  ```js
  module: {
    rules: [
      {
        // 告诉webpack匹配什么文件，一般为正则表达式
        test: /\.css$/,
        // 简写一: 多个loader不需要其他属性时, 可以直接写loader字符串形式
        use: [ "style-loader","css-loader", "postcss-loader"]
      },

      {
        test: /\.less$/,
        use: [ "style-loader", "css-loader", "less-loader"]
      }
      
    ]
  }
  ```
  ```js
  module: {
    rules: [
      {
        // 告诉webpack匹配什么文件，一般为正则表达式
        test: /\.css$/,
        // 简写一: 如果loader只有一个
        loader: "css-loader"
      },
    ]
  }
  ```

* loader配置加载顺序是从后往前，所以填写是有顺序要求  
```js
use: [ "style-loader", "css-loader", "less-loader"]
```
less先转化为css，然后解析css，最后插入css到style中

### 常见loader安装

* `npm install css-loader -D`
  * 安装加载css的loader

* `npm install style-loader -D`
  * 安装插入css到style的loader

* `npm install less -D`
  * 编译less

* `npm install less-loader -D`
  * 安装转化less为css的loader

* `npm install postcss-loader -D`
  * 该工具能进行CSS的转换和适配，如自动添加浏览器前缀、css样式的重置
  * 该工具需要plugin才有效果
  * 比如添加浏览器前缀插件：`npm install autoprefixer -D`
  * 合集插件：`npm install postcss-preset-env -D`，它包括了上一个插件
  ```js
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          //"autoprefixer"   --写法一
          //require("autoprefixer")  --写法二
          "postcss-preset-env"
        ]
      }
    }
  }
  ```
  * 也可以配置postcss.config.js文件
  ```js
  module.exports = {
    plugins: [
      "postcss-preset-env"
    ]
  }
  ```

### 加载图片

* webpack5之前需要raw-loader 、url-loader、file-loader等加载图片

* webpack5开始可以使用资源模块类型（asset module type），来替代上面的这些loader
  * asset/resource 发送一个单独的文件并导出 URL
    * 之前通过使用 file-loader 实现

  * asset/inline 导出一个资源的 data URI,将图片进行base64的编码
    * 之前通过使用 url-loader 实现

  * asset/source 导出资源的源代码
    * 之前通过使用 raw-loader 实现

  * asset 在导出一个 data URI 和发送一个单独的文件之间自动选择
    * 之前通过使用 url-loader，并且配置资源体积限制实现
    * 小的用base64
    * 大的导出url

* 图片配置实例
  * 配置图片输出方式一：修改output，添加assetModuleFilename属性
  * 配置图片输出方式二：在Rule中，添加一个generator属性，并且设置filename

  ```js
  test: /\.(png|jpe?g|svg|gif)$/,
  type: "asset",
  parser: {
    dataUrlCondition: {
      maxSize: 60 * 1024
    }
  },
  generator: {
    // 占位符
    // name: 指向原来的图片名称
    // ext: 扩展名
    // hash: webpack生成的hash

    filename: "img/[name]_[hash:8][ext]" //指定图片打包后的位置与名称
  }
  ```
### babel转化ES6为ES5

* 不借助webpack独立使用babel

  * 安装`npm install @babel/cli @babel/core -D`
    * @babel/core：babel的核心代码，必须安装
    * @babel/cli：可以让我们在命令行使用babel；
    
  * 处理源代码
    * src：是源文件的目录；
    * --out-dir：指定要输出的文件夹dist
    * `npx babel src --out-dir dist`
  
  * `npm install @babel/plugin-transform-arrow-functions -D`
    * 转化箭头函数的插件安装
    
  
  * `npm install @babel/plugin-transform-block-scoping -D` 
    * 转化const为var的插件安装

  * 使用：`npx babel src --out-dir dist --plugins=@babel/plugin-transform-block-scoping ,@babel/plugin-transform-arrow-functions`
    
* babel预设（因为前面太麻烦了）
  * `npm install @babel/preset-env -D`
    * 安装预设
  * `npx babel src --out-dir dist --presets=@babel/preset-env`
    * 使用，即可达到效果

* babel的打包使用（常用）
  * `npm install babel-loader -D`
    * 安装babel加载
    * 之前已经安装了@babel/core的核心还是需要安装
  
  * 配置
  ```js
  {
    test: /\.js$/,
    use: [
      { 
        loader: "babel-loader", 
        // options: {
        //   plugins: [
        //     "@babel/plugin-transform-arrow-functions",
        //     "@babel/plugin-transform-block-scoping"
        //   ]
        // } 
        options: {
          presets:[
            ["@babel/preset-env"]
          ]
        }
      }
    ]
  },
  ```
  * 也可以配置babel.config,js文件
  ```js
  module.exports = {
    // plugins: [
    //   "@babel/plugin-transform-arrow-functions",
    //   "@babel/plugin-transform-block-scoping"
    // ]
    presets: [
      "@babel/preset-env"
    ]
  }
  ```

### 加载vue
* `npm install vue-loader -D`
* `npm install @vue/compiler-sfc -D`
  * 添加@vue/compiler-sfc来对template进行解析
* 配置插件
  * 在webpack.config.js里面配置
```js
const { VueLoaderPlugin } = require("vue-loader/dist/index")
```

### 其他插件plugin

* 认识resolve解析模块
  * 它是一个默认的模块
  * 使用import/require时，它帮我们去node_modules寻找模块导入，或者说去相对路径或绝对路径寻找文件导入

* extensions和alias配置
```js
module.exports = {
  resolve: {
    //当我们没填文件后缀时，会按正序拼接下面后缀
    extensions: [".js", ".json", ".vue", ".jsx", ".ts", ".tsx"],
    //给路径取别名
    alias: {
      utils: path.resolve(__dirname, "./src/utils")
    }
  },
}
```

* 区分plugin和loader
  * Loader是用于特定的模块类型进行转换
  * Plugin可以用于执行更加广泛的任务，比如打包优化、资源管理、环境变量注入等

* 使用插件plugin
```js
const PluginsX = require("newPlugin")
module.exports = {
  plugins:[
    new Plugins1()
    new Plugins2()
    ...
  ]
}
```

* `npm install clean-webpack-plugin -D`
  * 打包时，不需要手动删除dist文件夹了
  * 其实可以在output中填clean:true
* `npm install html-webpack-plugin -D`
  * 对index.html进行打包处理
  * 传入template：指定我们要使用的模块所在的路径
  * 传入title：在进行htmlWebpackPlugin.options.title读取时，就会读到该信息

* DefinePlugin内置插件
  * 允许在编译时创建配置的全局常量

* mode配置
  * 切换开发模式与生产模式
  * 默认值是production（什么都不设置的情况下）
  * 可选值有：'none' | 'development' | 'production'

* 上文举例使用
```js
const { VueLoaderPlugin } = require("vue-loader/dist/index")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require("webpack")
module.exports = {
  mode: "development"
  plugins: [
    new VueLoaderPlugin(),  //这个是vue那里的内容
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "电商项目",
      template: "./index.html"
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
      coderwhy: "'why'",
      counter: "123"
    })
  ]
}
```
### 开启本地服务器

* 它让我们开发时不需要反复打包上传

* 三种
  * webpack watch mode；
  * webpack-dev-server（常用）
  * webpack-dev-middleware

* `npm install webpack-dev-server -D`
  * 安装webpack-dev-server

* 指令：`webpack serve --config wk.config.js`
  * 可以设置个js脚本

* devServer配置服务器  

  * host设置主机地址
    * 默认值是localhost
    * 如果希望其他地方也可以访问，可以设置为 0.0.0.0

  * port设置监听的端口，默认情况下是8080

  * open是否打开浏览器
    * 默认值是false，设置为true会打开浏览器
    * 也可以设置为类似于 Google Chrome等值

  * compress是否为静态文件开启gzip compression
    * 默认值是false，可以设置为true

  * hot开启本地HMR
    * 默认false，设置为true

```js
devServer: {
  hot: true,  // 修改了某一个模块的代码时，只刷新对应模块
  host: "0.0.0.0",
  port: 8888,
  open: true
  compress: true
},
```
对应模块需要在程序入口这样来接受HMR
```js
if (module.hot) {//accept后填模块路径
  module.hot.accept("./utils/demo.js", () => {
    console.log("demo模块发生了更新")
  })
}
```

# 网络请求

## 基础信息


## axios

### 安装方法

* npm安装：`npm install axios`

* 使用 jsDelivr CDN：
```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```
* 使用 unpkg CDN
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

* 基本使用
  * url：请求的 URL 网址
  * method：请求的方法，GET可以省略（不区分大小写）
  * data：提交数据
  * params；查询参数

* 方法
  * GET 获取数据
  * POST 数据提交
  * PUT 修改数据（全部）
  * DELETE 删除数据
  * PATCH 修改数据（部分）
  
```js
axios({
  url:'https://xxx.com/xxx'
  method:'get'  //不写默认就是这个
  params:{
    参数:值
  }
  data:{
    参数:值
  }
}).then((res)=>{

}).catch((err)=>{

})
```

# git相关

## 一般流程

### 初始化本地仓库

* git init
* git add .
* git commit -m "f"

### 添加远程仓库地址
* git remote add origin https://github.com/xxxxxxxx/xxx.git

### git pull 拉取远程仓库代码到本地。第一次会出现分支合并错误。
* git pull

### 需要关联/设置远程的分支
* git branch --set-upstream-to=origin/master

### 再git pull后再进行push到远程仓库。
* git pull
* git push -u origin master

### 进行分支合并  
可以如下操作
* git fetch origin
* git merge origin/master  

或者允许合并历史
* git pull origin master --allow-unrelated-histories

# 深入Nodejs

## fs模块

### 这些API大多数都提供三种操作方式:
* 方式一:同步操作文件:代码会被阻塞，不会继续执行
* 方式二:异步回调函数操作文件:代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数被执行
* 方式三:异步Promise操作文件:代码不会被阻塞，通过fs.promises 调用方法操作，会返回一个Promise，可以通过then、catch进行处理

### 文件描述符
* 什么是文件描述符
  * 在系统层，所有文件系统操作都使用这些文件描述符来标识和跟踪每个特定的文件。
  * Node.js 抽象出操作系统之间的特定差异，并为所有打开的文件分配一个数字型的文件描述符

* fs.open() 方法用于分配新的文件描述符。
  * 一旦被分配，则文件描述符可用于从文件读取数据、向文件写入数据、或请求关于文件的信息。 

  ```js
  const fs = require('fs')

  fs.open('./test.txt', (err, fd) => {
      if(err) {
          console.log("打开文件错误：", err)
          return
      }

      // 获取文件描述符
      console.log(fd)

      // 获取文件信息
      fs.fstat(fd, (err, stats) => {
          if(err) return
          console.log(stats)

          // 关闭文件
          fs.close(fd)
      })
  })
  ```

### 读取文件
* `fs.readFile(path[, options], callback)`：读取文件的内容；
```js
const fs = require('fs')

// 1. 同步读取
const res1 = fs.readFileSync('./test.txt',{
    encoding:'utf-8'
})
console.log(res1)
console.log('后续1')

// 2. 异步读取：回调函数
fs.readFile('./test.txt',{
    encoding:'utf-8'
}, (err, data) => {
    if(err) {
        console.log("读取错误：", err)
        return
    }
    console.log("读取结果：", data)
})
console.log('后续2')

// 3. 异步读取：promises
fs.promises.readFile('./test.txt', {
    encoding:'utf-8'
}).then(res => {
    console.log("读取结果：", res)
}).catch(err => {
    console.log("读取错误：", err)
})
```

### 写入文件
* `fs.writeFile(file, data[, options], callback)`：在文件中写入内容,没有该文件则创建文件
```js
const fs = require('fs')

const message = "hello, test2"

fs.writeFile('./test2.txt', message, {
    encoding: 'utf-8',
    flag: 'w'
}, (err) => {
    if(err) {
        console.log("文件写入错误：", err)
    } else {
        console.log("文件写入成功")
    }
})
```
### flag，encoding选项

* flag值
  * w打开文件写入，默认值；
  * w+打开文件进行读写，如果不存在则创建文件；
  * r+ 打开文件进行读写，如果不存在那么抛出异常；
  * r打开文件读取，读取时的默认值；
  * a打开要写入的文件，将流放在文件末尾。如果不存在则创建文件；
  * a+打开文件以进行读写，将流放在文件末尾。如果不存在则创建文件

* encoding：几乎用 utf-8, 不填则返回 buffer

### 文件夹操作
* 新建一个文件夹
  * `fs.mkdir()`或`fs.mkdirSync()`

* 文件重命名
  * `fs.rename(oldname, newname, callback)`

* 获取文件夹的内容
  * `fs.readdir(path[, options], callback)`
  ```js
  const fs = require('fs')

  // 递归获取所有文件
  function readDirectory(path) {
      fs.readdir(path, {withFileTypes: true}, (err, files) => {
          files.forEach(item => {
              if(item.isDirectory()) {
                  readDirectory(`${path}/${item.name}`)
              } else {
                  console.log("获取到文件：", item.name)
              }
          }) 
      })
  }

  readDirectory('./docu')
  ```

## events模块

### 认识

* Node中的核心API都是基于异步事件驱动的

  * 在这个体系中，某些对象（发射器（Emitters））发出某一个事件
  * 我们可以监听这个事件（监听器Listeners），并且传入的回调函数，这个回调函数会在监听到事件时调用

* 发出事件和监听事件都是通过EventEmitter类来完成的，它们都属于events对象

  * `emitter.on`(eventName, listener)：监听事件，也可以使用`addListener`
  * `emitter.off`(eventName, listener)：移除事件监听，也可以使用`removeListener`, 移除事件前提是该事件有命名
  * `emitter.emit`(eventName[, ...args])：发出事件，可以携带一些参数

  ```js
  const EventEmitter = require('events')

  // 创建EventEmitter实例
  const emitter = new EventEmitter()

  // 监听事件
  emitter.on('NKD', ()=> {
      console.log('监听NKD事件')
  })

  // 发射事件
  setTimeout(() => {
      emitter.emit('NKD')
  }, 2000)
  ```

### 常见的方法

* EventEmitter的实例有一些属性，可以记录一些信息：
  * `emitter.eventNames()`：返回当前EventEmitter对象注册的事件字符串数组
  * `emitter.getMaxListeners()`：返回当前EventEmitter对象的最大监听器数量，可以通过setMaxListeners()来修改，默认是10
  * `emitter.listenerCount(事件名称)`：返回当前EventEmitter对象某一个事件名称，监听器的个数
  * `emitter.listeners(事件名称)`：返回当前EventEmitter对象某个事件监听器上所有的监听器数组

* 其他
  * `emitter.once(eventName, listener)`：事件监听一次
  * `emitter.prependListener()`：将监听事件添加到最前面
  * `emitter.prependOnceListener()`：将监听事件添加到最前面，但是只监听一次
  * `emitter.removeAllListeners([eventName])`：移除所有的监听器

## Buffer类

### 认识

* 对于服务器端为了做很多的功能，我们必须直接去操作二进制
* 所以Node提供给了一个类Buffer，并且它是全局的
* Buffer相当于一个存储二进制的数组；这个数组中的每一项，可以保存8位二进制：00000000

### buffer创建
* `Buffer.from()`

```js
// 英文 1个字母占1个字节
const buf1 = Buffer.from('hello')
console.log(buf1) // <Buffer 68 65 6c 6c 6f>
console.log(buf1.toString())  // hello

// 中文 1个文字占3个字节
const buf2 = Buffer.from('你好')
console.log(buf2)  // <Buffer e4 bd a0 e5 a5 bd>
console.log(buf2.toString())  // 你好
```
* `Buffer.alloc()`: 创建了一个8位长度的Buffer，里面所有的数据默认为00
  * 可以通过数组下标方式访问

### 文件中读取Buffer
```js
fs.readFile('./test.txt', (err, data) => {
    if(err) {
        console.log("读取错误：", err)
        return
    }
    console.log("读取结果：", data)
})
// 因为没填写encoding,所以默认读出Buffer
// 读出图片也是Buffer
```