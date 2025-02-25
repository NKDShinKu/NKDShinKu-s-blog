# vue基础学习

## 创建Vue实例

### 方法
1. 准备容器
2. 引包 (官网) - 开发版本 / 生产版本
3. 创建 Vue 实例 new Vue()
4. 指定配置项 → 渲染数据

### 举例
* el指定容器
* data提供数据

  * data中的数据最终会被添加到实例上
  * 比如`app.data1`
* methods
  * 提供处理逻辑的函数
```html
<!-- 准备容器 -->
  <div id = "app">
    <h1>{{ data1 }}</h1>
    <p>{{ data2 }}</p>
  </div>
<!-- 引入包 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>

  <script>
    // 创建Vue实例
    const app = new Vue({
        // 配置参数
      el: "#app",
      data:{
        data1:"genshin",
        data2:"abccba"
      },
      methods:{
        fn(){}
      }
    })
  </script>
```


## 基础使用

### 插值表达式 —— `{{}}`

1. 作用: 利用表达式进行插值，渲染到页面中  
表达式：是可以被求值的代码，JS引擎会将其计算出一个结果

2. 语法：`{{ 表达式 }}`

3. 注意
* 使用的数据要存在 （data）
* 支持的是表达式，而非语句 if ... for
* 不能在标签属性里面使用

### Vue 指令

* v-html:
    1. 作用：动态设置元素的 innerHTML
    2. 语法：`v-html = "表达式"`

* v-show
    1. 作用：控制元素显示隐藏
    2. 语法：`v-show = "表达式"` 表达式值 true 显示， false 隐藏
    3. 原理：切换 display:none 控制显示隐藏
    4. 场景：频繁切换显示隐藏的

* v-if
    1. 作用：控制元素显示隐藏（条件渲染）
    2. 语法：`v-if = "表达式"` 表达式值 true 显示， false 隐藏
    3. 原理：基于条件判断，是否 创建 或 移除 元素节点
    4. 场景：要么显示，要么隐藏，不频繁切换的场景

* v-else 和 v-else-if
    1. 作用： 辅助 v-if 进行判断渲染
    2. 语法： `v-else v-else-if = "表达式"`
    3. 注意： 需要紧挨着 v-if 一起使

* Vue 指令 v-on
    1. 作用： 注册事件
    2. 语法：  
      `v-on:事件名 = "内联语句"`  
      `v-on:事件名 = "methods中的函数名"`
    3. 简写：@事件名
    4. 注意：methods函数内的 this 指向 Vue 

* Vue 指令 v-bind
    1. 作用： 动态的设置html的标签属性,有点像计算属性,插值表达式{{}}
    2. 语法： `v-bind:属性名="表达式"`
    3. 注意： 简写形式 `:属性名="表达式"`

* Vue 指令 v-for
    1. 作用： 基于数据循环， 多次渲染整个元素
    2. 遍历数组语法：`v-for = "(item, index) in 数组"`
    3. 简写：`v-for = "item in 数组"`

* Vue 指令 v-model
    1. 作用: 给 表单元素 使用, 双向数据绑定  
      数据变化 → 视图自动更新  
      视图变化 → 数据自动更新
    2. 语法: `v-model = '变量'`

### 指令修饰符

* 按键修饰符
    * @`keyup.enter` → 键盘回车监听

* v-model修饰符
    * `v-model.trim` → 去除首尾空格
    * `v-model.number` → 转数字

* 事件修饰符
    * `@事件名.stop` → 阻止冒泡
    * `@事件名.prevent` → 阻止默认行为

### v-bind 对于样式控制的增强

1. 语法： `:class = "对象/数组" ` 

对象 → 键就是类名，值是布尔值。如果值为 true，有这个类，否则没有这个类  
```html
<div class="box" :class="{类名1:布尔值, 类名2:布尔值, ...}"></div>
```

数组 → 数组中所有的类，都会添加到盒子上，本质就是一个 class 列表
```html
<div class="box" :class="[类名1, 类名2, ...]"></div>
```
 用法：tab 导航高亮


2. 语法：`:style = "样式对象"`
```html
<div class="box" :style="{CSS属性名1:值, CSS属性名2:值, ...}"></div>
```
适用场景：某个具体属性的动态设置

### v-model 应用于其他表单元素

* 常见的表单元素都可以用 v-model 绑定关联，快速 获取 或 设置 表单元素的值

    * 输入框 input:text → value
    * 文本域 textarea → value
    * 复选框 input:checkbox → checked
    * 单选框 input:radio → checked
    * 下拉菜单 select → value

### computed 计算属性

* 概念：基于现有的数据，计算出来的新属性。 依赖的数据变化，自动重新计算

* 用法
    * 声明在 computed 配置项中，一个计算属性对应一个函数
    * 使用起来和普通属性一样使用 {{ 计算属性名 }}

计算属性默认的简写，只能读取访问，不能修改 
```js
computed:{
    计算属性名() {
        逻辑代码
        return 结果
    }
}
```

如果要使用修改操作，需要写计算属性的完整写法
```js
computed:{
    计算属性名() {
        get() {
            逻辑代码
            return 结果
        },
        set(修改的值) {
            修改逻辑 代码
        }
    }
}
```

* computed 与 methods 的区别

  * computed: 封装了一段对于数据的处理，求得一个结果
    * 作为属性，直接使用，`this.计算属性`、 `{{ 计算属性 }}`

  * methods: 给实例提供一个方法，调用以处理业务逻辑
    * ② 作为方法，需要调用，`this.方法名( )`、 `{{ 方法名() }}`、 `@事件名="方法名"`

  * 缓存特性（提升性能）：
    * 计算属性会对计算出来的结果缓存，再次使用直接读取缓存，依赖项变化了，会自动重新计算 → 并再次缓存

### watch 侦听器（监视器）

* 作用：监视数据变化，执行一些 业务逻辑 或 异步操作。

* 相关写法：
  * `deep: true` 对复杂类型深度监视
  * `immediate: true` 初始化立刻执行一次handler方法
  * `hanlder` 执行核心代码的函数
  ```js
  watch: {
    //一
    数据属性名: {
      deep: true, // 深度监视
      immediate: true, // 是否立刻执行一次handler
      handler (newValue, oldValue) {
        console.log(newValue, oldValue)
      }
    }
    //二
    `对象.数据属性名字`:{

    }
  }
  ```

* 简写:如果不需要配置，只需要直接写函数即可
```js
watch:{
  数据属性名(newValue, oldValue) {
    核心代码
  }
}
```

## 生命周期

### 什么是生命周期

* 定义：一个Vue实例从 创建 到 销毁 的整个过程

* 生命周期四个阶段：

  1. 创建：响应式数据等  
    阶段末可以发送初始化渲染请求 

  2. 挂载：渲染模版
    阶段末可以操作 dom

  3. 更新：用户修改数据，更新视图，这是一个循环过程

  4. 销毁：销毁实例，也就是关掉网页

### Vue 生命周期函数（钩子函数）

* Vue生命周期过程中，会自动运行一些函数，被称为【生命周期钩子】→ 让开发者可以在【特定阶段】运行自己的代码

* 八个钩子函数：  
before Create 和 `created`、  
before Mount 和 `mounted`、  
before Update 和 updated、  
before Destroy 和 destroyed

* 一般使用created发送初始化渲染请求，使用mounted操作dom。

### 代码
```js
  // 1. 创建阶段（准备数据）
  beforeCreate () {
    console.log('beforeCreate 响应式数据准备好之前', this.count)
  },
  created () {
    console.log('created 响应式数据准备好之后', this.count)
    // this.数据名 = 请求回来的数据
    // 可以开始发送初始化渲染的请求了
  },

  // 2. 挂载阶段（渲染模板） 
  beforeMount () {
    console.log('beforeMount 模板渲染之前', document.querySelector('h3').innerHTML)
  },
  mounted () {
    console.log('mounted 模板渲染之后', document.querySelector('h3').innerHTML)
    // 可以开始操作dom了
  },

  // 3. 更新阶段(修改数据 → 更新视图)
  beforeUpdate () {
    console.log('beforeUpdate 数据修改了，视图还没更新', document.querySelector('span').innerHTML)
  },
  updated () {
    console.log('updated 数据修改了，视图已经更新', document.querySelector('span').innerHTML)
  },

  // 4. 卸载阶段
  beforeDestroy () {
    console.log('beforeDestroy, 卸载前')
    console.log('清除掉一些Vue以外的资源占用，定时器，延时器...')
  },
  destroyed () {
    console.log('destroyed，卸载后')
  }
```

# vue脚手架与工程化

## 安装使用

* Vue CLI 是 Vue 官方提供的一个全局命令工具。可以帮助我们快速创建一个开发 Vue 项目的标准化基础架子。【集成了 webpack 配置】

* `npm i @vue/cli -g`  ——全局安装
* `vue create project-name`  ——创建一个项目架子

## 组件式开发

组件化：一个页面可以拆分成一个个组件，每个组件有着自己独立的结构、样式、行为，便于维护，利于复用

* `index.html` 是模版文件

* `main.js` 是入口文件，引入vue、App.vue以及其他全局组件

* `App.vue`是根组件，整个应用最上层的组件，包裹所有普通小组件
  * 其他普通组件xxx1.vue、xxx2.vue等放在`components`文件夹里面
  * 普通组件还可以细分为其他组件
  * 这些全部组件组成一个完整网页

* 注意组件命名需要大驼峰

* 局部注册：只能在注册的组件内使用  
在App.vue里面这样做
```js
// import 组件对象 from '.vue文件路径'
import HmHeader from './components/HmHeader'

export default {
  // 局部注册
  components: {
  // '组件名': 组件对象,
  HmHeader: HmHeader
  }
}
```

* 全局注册：所有组件内都能使用  
在main.js里面这样做
```js
//导入需要全局注册的组件
import HmButton from './components/HmButton'

// 调用 Vue.component 进行全局注册
// Vue.component('组件名', 组件对象)
Vue.component('HmButton', HmButton)

```

* 使用组件
```vue
<template>
   <HmHeader></HmHeader>
   <HmMain></HmMain>
</template> 
```

## 组件(vue)的三大组成部分 (结构/样式/逻辑)

### 结构template

* vue2中，只能有一个根元素（即只有一个大的div）

### 样式style

* 全局样式: 默认组件中的样式会作用到全局
  * 写在组件中的样式会 全局生效，容易造成多个组件之间的样式冲突问题

* 局部样式: 可以给组件加上 scoped 属性, 可以让样式只作用于当前组件


* 技巧：在main.js里面进行注册
```js
import './style/index.css'
```

### 逻辑script

* el是根实例独有的
* 组件中的data是一个函数 → 保证每个组件实例，维护独立的一份数据对象。
```js
data() {
  return {

  }
}
```

## 组件通信

### 了解组件通信

* 组件的数据是独立的，无法直接访问其他组件的数据，需要解决

* 组件关系分类：
  1. 父子关系
  2. 非父子关系

* 解决方法
  * 父子关系 → props & $emit
  * 非父子关系 → provide & inject 或 eventbus
  * 通用方案 → vuex

### 父子关系解决

* 父传子props：
  1. 父中给子添加属性传值 (利用v-bind)
  2. 子props接收 
  3. 子组件使用

  ![alt text](my_notes_images/26.父子关系props.png)

  * props其他写法与校验
  ```js
  props:['参数1','参数2',...]

  props: {
    校验的属性名: {
      type: 类型, // Number String Boolean ...
      required: true, // 是否必填
      default: 默认值, // 默认值
      validator (value) {
        // 自定义校验逻辑
        return 是否通过校验  //返回Boolean
      }
    }
  },
  ```

* 子传父$emit：
  1. 子$emit 发送消息
  2. 父中给子添加消息监听
  3. 父中实现处理函数

![alt text](my_notes_images/27.父子关系$emit.png)
```js
methods:{
  add() {
    this.$emit('add',传入值)
  }
}
```

* props与data的区别
  * data 的数据是自己的 → 随便改
  * prop 的数据是外部的 → 不能直接改，要遵循 单向数据流

### 非父子关系解决

* event bus 事件总线

  * 作用：非父子组件之间，进行简易消息传递。

  1. 创建一个都能访问到的事件总线 (空 Vue 实例) → utils/EventBus.js
  ```js
  import Vue from 'vue'
  const Bus  =  new Vue()
  export default Bus
  ```
  2. A 组件(接收方)，监听 Bus 实例的事件
  ```js
  created () {
    Bus.$on('sendMsg', (msg) => {
      this.msg = msg
    })
  }
  ```
  3. B 组件(发送方)，触发 Bus 实例的事件
  ```js
  Bus.$emit('sendMsg', '这是一个消息')
  ```
* provide & inject
  * 作用：跨层级共享数据。
  1. 父组件 provide 提供数据
  ```js
  export default {
    provide () {
      return {
        // 普通类型【非响应式】
        color: this.color, 
        // 复杂类型【响应式】
        userInfo: this.userInfo, 
      }
    }
  }
  ```
  2. 子/孙组件 inject 取值使用
  ```js
  export default {
    inject: ['color','userInfo'],
    created () {
      console.log(this.color, this.userInfo)
    }
  }
  ```

## 进阶语法

### v-model原理
* 原理：v-model本质上是一个语法糖。例如应用在输入框上，就是 value属性 和 input事件 的合写。

```html
<template>
  <div id="app" >
    <input v-model="msg" type="text">
    <input :value="msg" @input="msg = $event.target.value" type="text">
  </div>
</template>
```
PS: $event 用于在模板中，获取事件的形参

### 表单类组件封装 & v-model 简化代码

1. 表单类组件 封装 —— 实现 子组件 和 父组件数据 的双向绑定
    * 父传子：数据 应该是父组件 props 传递 过来的，拆解 v-model 绑定数据
    * 子传父：监听输入，子传父传值给父组件修改

2.  父组件 v-model 简化代码，实现 子组件 和 父组件数据 双向绑定
    * 子组件中：props 通过 value 接收，事件触发 input 
    * 父组件中：v-model 给组件直接绑数据

父组件
```html
<BaseSelect :cityId="selectId" @事件名="selecteId = $event" />
<BaseSelect v-model="selectId"></BaseSelect>
```
子组件
```html
<select :value="cityId" @change="handleChange">...</select>
```
```js
props: {
  cityId: String
  // value: String
  //父组件用model这里要用value
}, 

methods: {
  handleChange (e) {
    this.$emit('事件名', e.target.value)
  }
}
```

### .sync修饰符

* 作用：可以实现 子组件 与 父组件数据 的 双向绑定，简化代码
* 特点：prop属性名，可以自定义，非固定为 value
* 场景：封装弹框类的基础组件， visible属性 true显示 false隐藏
* 本质：就是 :属性名 和 @update:属性名 合写

父组件
```html
<BaseDialog :visible.sync="isShow" />
--------------------------------------
<BaseDialog
:visible="isShow" 
@update:visible="isShow = $event"
/>
```
子组件
```js
props: {
  visible: Boolean
},
this.$emit('update:visible', false)

```

### ref 和 $refs

* 作用：利用 ref 和 $refs 可以用于 获取 dom 元素, 或 组件实例
* 特点：查找范围 → 当前组件内 (更精确稳定)

* 获取dom  

  目标标签 – 添加 ref 属性
  ```html
  <div ref="chartRef">我是渲染图表的容器</div>
  ```
  恰当时机, 通过 this.$refs.xxx, 获取目标标签
  ```js
  mounted () {
    console.log(this.$refs.chartRef)
  },
  ```
* 获取组件    

  目标组件 – 添加 ref 属性
  ```html
  <BaseForm ref="baseForm"></BaseForm>
  ```
  恰当时机, 通过 this.$refs.xxx, 获取目标组件，就可以调用组件对象里面的方法
  ```js
  this.$refs.baseForm.组件方法()
  ```

### Vue异步更新、$nextTick
* $nextTick：等 DOM 更新后, 才会触发执行此方法里的函数体
* 语法: this.$nextTick(函数体)
```js
this.$nextTick(() => {
  this.$refs.inp.focus()
})

```

## 自定义

### 自定义指令

* 作用：自己定义的指令, 可以封装一些 dom 操作， 扩展额外

* 一些参数与解释
  * inserted：元素被插入后触发的钩子函数
  * el：本标签
  * binding.value：指令的值

* 局部注册
  ```js
  directives: {
    "指令名": {
      inserted (el,binding) {
        // 可以对 el 标签，扩展额外功能
        el.focus()
        el.style.color = binding.value
      },
      update (el, binding) {
        el.style.color = binding.value
      }
    }
  }
  ```
* 全局注册(main.js)
  ```js
  Vue.directive('指令名', {
    "inserted" (el,binding) {
      // 可以对 el 标签，扩展额外功能
      el.focus()
      el.style.color = binding.value
    }
    "update" (el, binding) {
      el.style.color = binding.value
    }
  })
  ```

* 用法：像其他指令一样用
  ```html
  <input v-指令名="指令值" type="text">
  ```

### 插槽
* 作用：让组件内部的一些 结构 支持 自定义
* 需求:   
将需要多次显示的对话框, 封装成一个组件  
组件的内容部分，不希望写死，希望能使用的时候自定义


* 插槽组件配置  
slot里面显示的是可以修改的内容，组件里面填就是默认内容
```html
<template>
  <!-- 多个slot使用name属性区分名字 -->
  <div class="dialog-header">
    <slot name="head">默认标题</slot>
  </div>
  <div class="dialog-content">
    <slot name="content">默认内容</slot>
  </div>
  <div class="dialog-footer">
    <slot name="footer">默认尾部</slot>
  </div>
</template>
```

* 使用插槽
```html
<!-- 父传子 传值进行使用 -->
<组件名字 :list="list">  
   <!-- v-slot:插槽名 可以简化 -->
    <!-- template配合v-slot:名字来分发对应标签 -->
  <template v-slot:head>
    我是标题
  </template>

  <template v-slot:content>
    我是内容
  </template>

  <template v-slot:footer>
    <button>我是尾部按钮</button>
  </template>
</组件名字>
```

* 子给父传值  
  1. 以 添加属性的方式传值  
  `<slot :id="item.id" msg="测试文本"></slot>`
  2. 所有添加的属性, 都会被收集到一个对象中
  3. 在template中, 通过 ` #插槽名= "obj" ` 接收，默认插槽名为 default

# VueRouter 路由
Vue2 - VueRouter3 - Vue-X3  
Vue3 - VueRouter4 - Vue-X4

## 认识路由 与 VueRouter

* vue中的路由：路径 和 组件 的 映射 关系

* 作用：修改地址栏路径时，切换显示匹配的组件

* 说明：Vue 官方的一个路由插件，是一个第三方包

## 使用VueRouter的5+2个基础步骤

在main.js里面操作

### 5个基础步骤
* 下载： 下载 VueRouter 模块到当前工程，版本3.6.5  
`npm install vue-router@3.6.5`

* 引入
```js
import VueRouter from 'vue-router'
```

* 安装注册
```js
Vue.use(VueRouter)
```

* 创建路由对象
```js
const router = new VueRouter()
```

* 注入，将路由对象注入到new Vue实例中，建立关联
```js
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
```

### 2个核心步骤

* 创建需要的组件 (views目录)，配置路由规则 （main.js）
* 路由懒加载有其他格式
```js
import Find from './views/Find'
import My from './views/My'
import Friend from './views/Friend'

// 路由懒加载
const Login = () => import('@/views/login')
const MyOrder = () => import('@/views/myorder')

const router = new VueRouter({
  // routes 路由规则们
  // route  一条路由规则 { path: 路径, component: 组件 }
  routes: [
    { path: '/find', component: Find },
    { path: '/my', component: My },
    { path: '/friend', component: Friend 
      children:[
        {path:'/路径',component: xxx}
      ]
      //用于配置二级路由
    },
  ]
})
```

* 配置导航，配置路由出口(路径匹配的组件显示的位置) （App.vue）
```html
<div class="footer_wrap">
  <a href="#/find">发现音乐</a>
  <a href="#/my">我的音乐</a>
  <a href="#/friend">朋友</a>
</div>
<div class="top">
  <!-- 路由出口 → 匹配的组件所展示的位置 -->
  <router-view></router-view>
</div>
```

### 路由配置的封装

* 所有的路由配置都堆在main.js不太合适

* 可以将路由模块抽离出来，这样利于拆分模块，利于维护

* 绝对路径：@指代src目录，可以用于快速引入组

* 做法
  * 在`src`下面建立`router/index.js`，在`index.js`里面配置（记得引入vue）
  * 在`main.js`里面引入路由，进行配置

##  声明式导航

### 导航链接router-link

* vue-router 提供了一个全局组件 `router-link` 取代 a 标签

  * 能跳转，配置 to 属性指定路径(必须) 。本质还是 a 标签 ，to 无需 #

  * 能高亮，默认就会提供高亮类名，可以直接设置高亮样式

  ```html
  <!-- 原来写法 -->
  <a href="#/friend">朋友</a>
  <!-- 新写法，路径不用加# -->
  <router-link to="/路径值" ></router-link>
  ```

### 高亮类名
* router-link 自动给当前导航添加了 两个高亮类名

  * `router-link-active` 模糊匹配 (用的多)  
    to="/my" 可以匹配 /my /my/a /my/b .... 

  * `router-link-exact-active` 精确匹配  
    to="/my" 仅可以匹配 /my

  * 在style里面通过类名写样式就能高亮了

### 自定义高亮类名
* 自定义高亮类名
  * router-link 的 两个高亮类名 太长了，我们希望能定制
  ```js
  const router = new VueRouter({
    routes: [...],
    linkActiveClass: "类名1",
    linkExactActiveClass: "类名2"
  })
  ```
### 参数传递

* 查询参数传参

  * 语法格式如下（路由）：`to="/path?参数名1=值1&参数名2=值2"`
  * 对应页面组件接收传递过来的值（接收）：`$route.query.参数名`

* 动态路由传参

  * 路由1： `path:"/path/:参数名"`  
  表示必须传入参数，否则页面空白
  * 路由2： `path:"/path/:参数名?"`  
  `?`是可选符，可以不传入参数
  * 跳转： `to="/path/值"`
  * 接收：`$route.params.参数名`

* 区别
  * 查询参数传参 (比较适合传多个参数)
  * 动态路由传参 (优雅简洁，传单个参数比较方便)

## 其他技巧(重定向/404页面/模式)

### 重定向

* 问题：网页打开， url 默认是 / 路径，未匹配到组件时，会出现空白
* 说明：重定向 → 匹配path后, 强制跳转path路径
* 语法： { path: 匹配路径, redirect: 重定向到的路径 }
```js
const router = new VueRouter({
  routes: [
      { path: '/', redirect: '/home'},//重定向
      { path: '/home', component: Home },
      { path: '/search/:words', component: Search }
    ]
})
```

### 404页面

* 作用：当路径找不到匹配时，给个提示页面
* 位置：配在路由最后
* 我们可以建立一个NotFind组件
* 语法：path: "*" (任意路径) – 前面不匹配就命中最后这个
```js
const router = new VueRouter({
  routes: [
      { path: '/home', component: Home },
      { path: '/search/:words', component: Search }
      { path: "*", component: NotFind} //404页面
    ]
})
```

### 模式切换
* 问题: 路由的路径看起来不自然, 有#，能否切成真正路径形式?
* hash路由(默认) 例如: `http://localhost:8080/#/home`
* history路由(常用) 例如: `http://localhost:8080/home` (以后上线需要服务器端支持)
```js
const router = new VueRouter({
  mode: "history",
  routes: [...]
})
```

## 编程式导航
问题：点击按钮跳转如何实现？  
编程式导航：用JS代码来进行跳转

### 基本跳转（点击搜索跳转）
  组件里面/vue文件里面 操作的

* `path 路径跳转 (简易方便)`
```js
this.$router.push('路由路径')

this.$router.push({
  path: '路由路径'
})
```

* name 命名路由跳转 (适合 path 路径长的场景，其实就是给路径取名)

```js
this.$router.push({
  name: '路由名'
})
// 需要路由配置了名字
```

```js
//配置名字
const router = new VueRouter({
  routes: [
    { name: '路由名', path: '/path/xxx', component: XXX }
  ]
})
```
* `this.$router.replace`
  * 和push功能差不多
  * push会记录返回历史，replace直接替换
  
### 参数传递（点击搜索按钮，跳转时传参）

* `path 路径跳转传参 (query传参)`
```js
this.$router.push('/路径?参数名1=参数值1&参数2=参数值2')

this.$router.push({
  path: '/路径',
  query: {
    参数名1: '参数值1',
    参数名2: '参数值2'
  }
})
```

* `path 路径跳转传参 (动态路由传参)`
```js
this.$router.push('/路径/参数值')

this.$router.push({
  path: '/路径/参数值'
})
```

* name 命名路由跳转传参 (query传参)
```js
this.$router.push({
  name: '路由名字',
  query: {
    参数名1: '参数值1',
    参数名2: '参数值2'
  }
})
```
* name 命名路由跳转传参 (动态路由传参)
```js
this.$router.push({
  name: '路由名字',
  params: {
    参数名: '参数值',
  }
})
```

## 组件缓存 keep-alive

### 应用场景
* 问题：从面经 点到 详情页，又点返回，数据重新加载了 → 希望回到原来的位置
* 原因：路由跳转后，组件被销毁了，返回回来组件又被重建了，所以数据重新被加载
* 解决：利用 keep-alive 将组件缓存下来

### keep-alive

* keep-alive是什么
  * keep-alive 是 Vue 的内置组件，当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
  * keep-alive 是一个抽象组件：它自身不会渲染成一个 DOM 元素，也不会出现在父组件链中。

* keep-alive的优点
  * 在组件切换过程中 把切换出去的组件保留在内存中，防止重复渲染DOM，
  * 减少加载时间及性能消耗，提高用户体验性。

* 缓存了所有被切换的组件

* keep-alive的三个属性
  * include ： 组件名数组，只有匹配的组件会被缓存
  * exclude ： 组件名数组，任何匹配的组件都不会被缓存
  * max ： 最多可以缓存多少组件实例

* 常用
```html
<template>
  <div class="h5-wrapper">
    <keep-alive :include="['LayoutPage']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
```
### 钩子函数

* activated 当组件被激活（使用）的时候触发 → 进入这个页面的时候触发
* deactivated 当组件不被使用的时候触发 → 离开这个页面的时候触发
* 组件缓存后就不会执行组件的created, mounted, destroyed 等钩子了
```js
activated () {
  console.log('actived 激活 → 进入页面');
},
deactivated() {
  console.log('deactived 失活 → 离开页面');
}
```

# VueX

* vuex 是一个 vue 的 状态管理工具，状态就是数据，可以帮我们管理 vue 通用的数据。

* 优势：共同维护一份数据，数据集中化管理、响应式变化、操作简洁 (vuex提供了一些辅助函数)

## 创建空仓库

1. npm install vuex@3

2. 新建 store/index.js 专门存放 vuex

3. 载入 Vue.use(Vuex)，创建仓库 new Vuex.Store()

4. 在 main.js 中导入挂载到 Vue 实例

## state 状态

### 提供数据

* State 提供唯一的公共数据源，所有共享的数据都要统一放到 Store 中的 State 中存储。
```js
//store/index.js文件

const store = new Vuex.Store({
  // state 状态, 即数据, 类似于vue组件中的data
  // 区别：
  // 1. data 是组件自己的数据
  // 2. state 是所有组件共享的数据
  state: {
    count: 101
  }
})
```

### 使用数据

* 通过 store 直接访问
  * 模板中： `{{ $store.state.xxx }}`
  * 组件逻辑中： `this.$store.state.xxx`
  * JS模块中： `store.state.xxx`

* 通过辅助函数, 把 store 中的数据 自动 映射到 组件的计算
  * 导入 mapState , 然后在computed使用
  ```js
  //App.vue文件

  import { mapState } from 'vuex'

  computed: {
    //直接展开即可,可以传入多个
    ...mapState(['count'])
    
    //上面的相当于下方操作
    
    count () {
      return this.$store.state.count
    } 
    
  }
  ```

## mutations 修改数据

* vuex 同样遵循单向数据流，组件中不能直接修改仓库的数据，需要使用`mutations`

1. 定义 mutations 对象，对象中存放修改state的方法
2. 组件中提交调用 mutations

### 定义方法
```js
//store/index.js文件

const store = new Vuex.Store({
  state: {
    count: 0
  },

  // 定义mutations
  mutations: {
    // 第一个参数是当前store的state属性
    //n是传入的参数
    addCount (state, n) {
      state.count += n
    }
  }
})
```

### 提交方法（mapMutations） 

* `mapMutations`：把位于mutations中的方法提取了出来，映射到组件methods中
```js
//App.vue

import { mapMutations } from 'vuex'

methods: {
  ...mapMutations(['subCount'])

  //相当于下面的
  subCount (n) {
    //这个是提交方法
    this.$store.commit('subCount', n)
  },
}

```
```js
//调用
this.subCount(10)
```

## actions 处理异步操作

* mutations 必须是同步的 (便于监测数据变化，记录)
* `actions里面可以对mutations的方法进行setTimeout操作`

### 定义方法
```js
//store/index.js文件
...
actions: {
  //context相当于state
  setAsyncCount (context, num) {
    // 一秒后, 给一个数, 去修改 num
    setTimeout(() => {
      //changeCount是mutations的方法
      context.commit('changeCount', num)
    }, 1000)
  }
}
```

### 提交方法（mapActions） 

* `mapActions`: 把位于 actions中的方法提取了出来，映射到组件methods中
```js
//App.vue

import { mapActions } from 'vuex'

methods: {
  ...mapActions(['setAsyncCount'])

  //相当于下面的
  changeCountAction (n) {
    this.$store.dispatch('setAsyncCount', n)
  },
}
```
```js
//调用
this.setAsyncCount(666) 
```

## getters （处理后的属性）

* 除了state之外，有时我们还需要从state中派生出一些状态，这些状态是依赖state的，此时会用到getters

* 例如：state中定义了list，为 1-10 的数组，组件中，需要显示所有大于5的数据

```js
getters: {
  // 注意：
  // (1) getters函数的第一个参数是 state
  // (2) getters函数必须要有返回值
  filterList (state) {
    return state.list.filter(item => item > 5)
  }
}
```
* 使用方法和上文的state一样
```js
computed: {
  ...mapGetters(['filterList'])
},
```

## module模块语法

* 由于 vuex 使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

* 所以我们可以分模块，将不同种类的状态放在不同模块中

### module创建

* 模块地址：`store/modules/xxx.js`，然后在里面操作
```js
const state = {
  userInfo: {
    name: 'zs',
    age: 18
  }
}
const mutations = {...}
const actions = {...}
const getters = {...}

export default {
  namespaced: true, //开启命名空间（看后续需求开启）
  state,
  mutations,
  actions,
  getters
}
```
* store/index.js 里面进行导入
```js
import user from './modules/user'

const store = new Vuex.Store({
  modules: {
    user
  }
})
```
### 模块中 state 的访问语法

* 直接通过模块名访问 `$store.state.模块名.xxx`

* 通过 mapState 映射
  * 默认根级别的映射 `mapState([ 'xxx' ])`
  * 子模块的映射 `mapState('模块名', ['xxx'])`  （需要开启命名空间）


### 模块中 getters 的访问语法

* 直接通过模块名访问 `$store.getters['模块名/xxx ']
`
* 通过 mapGetters 映射
  * 默认根级别的映射 `mapGetters([ 'xxx' ])`
  * 子模块的映射 `mapGetters('模块名', ['xxx'])` (需要开启命名空间)

### 模块中 mutation 的访问语法

* 直接通过 store 调用 `$store.commit('模块名/xxx ', 额外参数)`

* 通过 mapMutations 映射
  * 默认根级别的映射 `mapMutations([ 'xxx' ])`
  * 子模块的映射 `mapMutations('模块名', ['xxx'])` (需要开启命名空间)


### 模块中 action 的访问语法
* 直接通过 store 调用 `$store.dispatch('模块名/xxx ', 额外参数)`

* 通过 mapActions 映射
  * 默认根级别的映射 `mapActions([ 'xxx' ])`
  * 子模块的映射 `mapActions('模块名', ['xxx'])` (需要开启命名空间)


# 基于 json-server 工具，准备后端接口服务环境

1. 安装全局工具 json-server （全局工具仅需要安装一次）【官网】
yarn global add json-server 或 npm i json-server -g
2. 代码根目录新建一个 db 目录
3. 将资料 index.json 移入 db 目录
4. 进入 db 目录，执行命令，启动后端接口服务
json-server index.json
5. 访问接口测试 http://localhost:3000/cart
推荐： json-server --watch index.json (可以实时监听 json 文件的修改)

# Vue3 组合式开发

* 更容易维护
  1. 组合式API
  2. 更好的TypeScript支持

* 更快的速度
  1. 重写diff算法
  2. 模版编译优化
  3. 更高效的组件初始化

* 更小的体积
  1. 良好的TreeShaking
  2. 按需引入

* 更优的数据响应式
  * Proxy

## 创建项目 create-vue

* 前提环境条件
已安装 16.0 或更高版本的 Node.js

* 创建一个Vue应用
`npm init vue@latest` (这一指令将会安装并执行 create-vue)
`pnpm create vue`

* 关键文件：
  1. vite.config.js - 项目的配置文件 基于vite的配置

  2. package.json - 项目包文件 核心依赖项变成了 Vue3.x 和 vite

  3. main.js - 入口文件 createApp函数创建应用实例

  4. app.vue - 根组件 SFC单文件组件 script - template - style
      * 变化一：脚本script和模板template顺序调整
      * 变化二：模板template不再要求唯一根元素
      * 变化三：脚本script添加setup标识支持组合式API

  5. index.html - 单页入口 提供id为app的挂载

* .eslintre.cjs配置
  ```jsx
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 单引号
        semi: false, // 无分号
        printWidth: 80, // 每行宽度至多80字符
        trailingComma: 'none', // 不加对象|数组最后逗号
        endOfLine: 'auto' // 换行符号不限制（win mac 不一致）
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
    // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
    'no-undef': 'error'
  }
  ```
**husky 配置**

1. git初始化 git init

2. 初始化 husky 工具配置  https://typicode.github.io/husky/

```jsx
pnpm dlx husky-init && pnpm install
```

3. 修改 .husky/pre-commit 文件

```jsx
pnpm lint
```

**问题：**默认进行的是全量检查，耗时问题，历史问题。



**lint-staged 配置**

1. 安装

```jsx
pnpm i lint-staged -D
```

2. 配置 `package.json`

```jsx
{
  // ... 省略 ...
  "lint-staged": {
    "*.{js,ts,vue}": [
      "eslint --fix"
    ]
  }
}

{
  "scripts": {
    // ... 省略 ...
    "lint-staged": "lint-staged"
  }
}
```

3. 修改 .husky/pre-commit 文件

```jsx
pnpm lint-staged
```

## 组合式API setup

* 组件中使用组合式 API 的入口，在 setup() 函数中返回的对象会暴露给模板和组件实例。其他的选项也可以通过组件实例来获取 setup() 暴露的属性。

* 在**模板**中访问从 setup 返回的 ref 时，它会自动浅层解包，因此无须再在模板中为它写 .value。当通过 this 访问时也会同样如此解包。

* 在 setup() 中访问 this 会是 undefined

```js
<script>
export default {
  setup() {
    const count = 0
    const logMessage = () => {
      console.log('hello world')
    }
    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count,
      logMessage
    }
  }
}
</script>
```
* setup 语法糖
```js
<script setup>
  const count = 0
  const logMessage = () => {
    console.log('hello world')
  }
</script>
```

## 响应式 核心

### reactive()

* 作用：接受对象类型数据的参数传入并返回一个响应式的对象

```js
<script setup>
  import { reactive } from 'vue'

  const state = reactive(对象)
</script>
```

### ref()

* 作用：接收简单类型或者对象类型的数据传入并返回一个响应式的对象
* ref函数的内部实现依赖于reactive函数

```js
<script setup>
  import { ref } from 'vue'

  const state = ref(简单变量/对象)
</script>
```
* 使用
```js
const count = ref(0)
console.log(count.value) // 0
```
```js
<template>
  {/* 无需 .value */}
  <button @click="count++">{{ count }}</button>
</template>
```

### computed

* 计算属性基本思想和Vue2的完全一致，组合式API下的计算属性只是修改了写法
* 计算属性只读，需要写入可以加上get和set属性

```js
<script setup>
  import { computed } from 'vue'

  const computedState = computed(() => {
    return 计算后的值
    /* get: ... */
    /* set: ... */

  })
</script>
```

### watch

* 作用: 侦听一个或者多个数据的变化，数据变化时执行回调函数
* 俩个额外参数：1. immediate（立即执行） 2. deep（深度侦听）
* `watch(监听的源, 监听源发生变化执行的回调函数, 可选参数)`

```js
<script setup>

  import { ref, watch } from 'vue'

  const count = ref(0)
  const name = ref('a')
  
  /*源可以是一个函数返回一个值，一个 ref 等 */
  watch([count, name], 
  ([newCount, oldCount], [newName, oldName]) => {
    console.log('发生变化', [newCount, oldCount], [newName, oldName])
  },
  deep/immediate/...)
</script>
```

## 生命周期
选项式 VS 组合式
* beforeCreate/created -------- setup
* beforeMount -------- onBeforeMount
* mounted -------- onMounted
* beforeUpdate -------- onBeforeUpdate
* updated -------- onUpdated
* beforeUnmount -------- onBeforeUnmount
* unmounted -------- onUnmounted

```js
import { onMounted } from 'vue'

onMounted(() => {
  // 自定义逻辑
})
```

## 父子通信

### 父传子

1. 父组件中给子组件绑定属性
2. 子组件内部通过props选项接收 (编译器宏获取)

父组件
```html
<template>
  <sonCom message = 'this is message'>
  </sonCom>
</template>
```

子组件
```html
<script setup>
  // 注意：由于写了 setup，所以无法直接配置 props 选项
  // 所以：此处需要借助于 “编译器宏” 函数接收子组件传递的数据
  const props = defineProps({
    message: String
  })
</script>
```

### 子传父

1. 父组件中给子组件标签通过@绑定事件
2. 子组件内部通过 emit 方法触发 (编译器宏获取)

父组件
```html
<script setup>
  // 事件
  const changeFn = (newMoney) => {
    money.value = newMoney
  }
</script>

<template>
    <!-- 绑定自定义事件 -->
    <SonCom @changeMoney="changeFn">
    </SonCom>
</template>
```

子组件
```html
<script setup>
  // 注意：由于写了 setup，所以无法直接配置 props 选项
  // 所以：此处需要借助于 “编译器宏” 函数获得emit方法
  const emit = defineEmits(['changeMoney'])
  const buy = () => {
    // 触发事件，并传递参数
    emit('changeMoney', 5)
  }

  buy()
</script>
```

## 模板引用

通过ref标识获取真实的dom对象或者组件实例对象

1. 调用ref函数生成一个ref对象
2. 通过ref标识绑定ref对象到标签

```html
<script setup>
  import { ref } from 'vue'
  //1.调用ref函数获得ref对象
  const h1Ref = ref(null)
</script>

<template>
    <!-- 2.通过ref标识绑定ref对象 -->
    <h1 ref="h1Ref">
    </h1>
</template>
```

## defineExpose()

* 默认情况下在`<script setup>`语法糖下组件内部的属性和方法是不开放给父组件访问的

* 可以通过defineExpose编译宏指定哪些属性和方法允许访

```html
<script setup>
  import { ref } from 'vue'
  const message = ref('hello world')
  defineExpose({
    message
  })
</script>
```

## 跨层组件通信

* provide和inject：顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信
1. 顶层组件通过provide函数提供数据
2. 底层组件通过inject函数获取数据

```js
// 父组件
provide('key', 数据/ref对象/方法)
```
```js
// 子组件
const x = inject('key')
```

## Vue3.3新特性 

### defineOptions

* 这个宏可以用来直接在 `<script setup>` 中声明组件选项，而不必使用单独的 `<script>` 块

* 主要是用来定义 Options API 的选项。可以用`defineOptions`定义任意的选项  
props, emits, expose, slots 除外（因为这些可以使用 defineXXX 来做到）

```html
<script setup>
  defineOptions({
    xxx
  })
</script>
```
* 这是一个宏定义，选项将会被提升到模块作用域中，无法访问 `<script setup>` 中不是字面常数的局部变量。

### defineModel
