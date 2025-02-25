# html基础
## 标题与段落

* <font color=red>标题</font> <p>六种标题元素标签——h1、h2、h3、h4、h5 和 h6。每个元素代表文档中不同级别的内容：`<h1>`表示主标题，`<h2>`表示二级子标题，`<h3>`表示三级子标题，依此类推。
 
* <font color=red>段落</font>:<p>每个段落是通过\<p>元素标签进行定义的。
```html
<h1>我是一级标题</h1>
<h2>我是二级标题</h2>
<!-- ... -->
<p>我是一个段落。</p>
````
## 列表
* <font color=red>无序列表</font>:<p>
    每份无序的清单从 `<ul>` 元素开始，需要包裹清单上所有被列出的项目,然后就是用 `<li>` 元素把每个列出的项目单独包裹起来</p>
```html
<ul>
  <li>豆浆</li>
  <li>油条</li>
  <li>豆汁</li>
  <li>焦圈</li>
</ul>
```
* <font color=red>有序列表</font>：<p>
每份无序的清单从 `<ol>` 元素开始，需要包裹清单上所有被列出的项目,然后就是用 `<li>` 元素把每个列出的项目单独包裹起来</p>
```html
<ol>
  <li>沿这条路走到头</li>
  <li>右转</li>
  <li>直行穿过第一个十字路口</li>
  <li>在第三个十字路口处左转</li>
  <li>继续走 300 米，学校就在你的右手边</li>
</ol>
```
* <font color=red>描述列表</font>:<p>
闭合标签——`<dl>`；此外，每一项都用 `<dt>`（description term）元素闭合。每个描述都用 `<dd>`（description definition）元素闭合。
```html
<dl>
  <dt>内心独白</dt>
  <dd>
    戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。
  </dd>
  <dt>语言独白</dt>
  <dd>
    戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。
  </dd>
  <dt>旁白</dt>
  <dd>
    戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。
  </dd>
</dl>
````
## 简单的文本处理
* `<em>`: <em>斜体</em>
* `<strong>`: <strong>粗体</strong>
* `<ins>`: <ins>下划线</ins>
* `<hr/>`: 水平线
* `<br/>`: 换行

* `<abbr>`: 缩略语

```html
<p>
  第 33 届<abbr title="夏季奥林匹克运动会">奥运会</abbr>将于 2024 年 8
  月在法国巴黎举行。
</p>

````
效果如下：
<p>
  第 33 届<abbr title="夏季奥林匹克运动会">奥运会</abbr>将于 2024 年 8
  月在法国巴黎举行。
</p>

* 块引用：如果一个块级内容（一个段落、多个段落、一个列表等）从其他地方被引用，你应该把它用 `<blockquote>` 元素包裹起来表示，并且在 cite 属性里用 URL 来指向引用的资源。
* 行内引用：` <q>` 元素
* 引文: `cite` 属性,如果不使用 JavaScript 或 CSS 编写自己的解决方案，就没有办法让浏览器显示 cite 的内容。

* 标记联系方式：`<address>`，它仅仅包含联系方式

* 上标：`<sup>`，比如x<sup>2</sup>
* 下标：`<sub>`，比如H<sub>2</sub>O

## 超链接
* 通过将文本或其他内容(文字、图片等)包裹在 `<a>` 元素内，并给它一个包含网址的 href 属性（也称为超文本引用或目标，它将包含一个网址）来创建一个基本链接。

* `title`: 当鼠标指针悬停在链接上时，标题将作为提示信息出现

* `target="_blank"`: 从新网页打开。
```html
<a href="https://ciallo.cc/" title="柚子厨真恶心" target="_blank">ciallo</a>
```
## 网站结构
* 为了实现语义化标记，HTML 提供了明确这些区段的专用标签，例如：  
`<header>`：页眉。  
`<nav>`：导航栏。  
`<main>`：主内容。主内容中还可以有各种子内容区段，可用`<article>`、`<section>` 和 `<div>` 等元素表示。   
`<aside>`：侧边栏，经常嵌套在 `<main>` 中。  
`<footer>`：页脚。

* 无语义元素: `<div>` 和 `<span>` 元素。应配合使用 `class` 属性提供一些标签，使这些元素能易于查询。  
`<span>` 是一个内联的（inline）无语义元素，最好只用于无法找到更好的语义元素来包含内容时，或者不想增加特定的含义时  
`<div>` 是一个块级无语义元素，应仅用于找不到更好的块级元素时，或者不想增加特定的意义时。例如，一个电子商务网站页面上有一个一直显示的购物车组件。
## 图片
* 使用 `<img> `元素，搭配`src`和`alt`。

* `src`: 包含一个 URL，该 URL 指向要嵌入页面的图像。src 属性可以是相对 URL 或绝对 URL。

* `alt`: 备选文本，当浏览器不显示图片时，会显示 alt 文本。

* `width`与`height`：图片的宽度和高度，以像素为单位。

* `title`： 当鼠标指针悬停在链接上时，标题将作为提示信息出现。

* `<figure>`和`<figcaption>`：为图片提供一个语义容器，在说明文字和图片之间建立清晰的关联。  
<font color=green>ps：其实figure里可以是几张图片、一段代码、音视频、方程、表格或类似的东西。</font>

举例:
```html
<figure>
  <img
    src="images/dinosaur.jpg"
    alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
    width="400"   
    height="341" 
    title="我是提示标题">

  <figcaption>
    A T-Rex on display in the Manchester University Museum.
  </figcaption>
</figure>
````
## 视频
* 使用 `<video> `元素，搭配`src`和`alt`。同上文

* `controls`：让视频或音频包含浏览器自带的控制界面。

* `width` 和 `height`: 宽度和长度。
* `autoplay`:自动播放。
* `loop`:这个属性可以让视频（或者音频）文件在结束时再次开始播放。
* `muted`:这个属性会导致媒体播放时，默认关闭声音。
* `poster`:这个属性指向了一个图像的 URL，这个图像会在视频播放前显示。通常用于粗略的预览或者广告。

* `preload`:这个属性被用来缓冲较大的文件，有三个值可选：  
"none"：不缓冲文件  
"auto"：页面加载后缓存媒体文件  
"metadata"：仅缓冲文件的元数据  
* `<source> `: 浏览器会检查 <source> 元素，并且播放第一个与其自身 codec 相匹配的媒体。

举例：  
```html
<video
  controls
  width="400"
  height="400"
  autoplay
  loop
  muted
  preload="auto"
  poster="poster.png">
  <source src="rabbit320.mp4" type="video/mp4" />
  <source src="rabbit320.webm" type="video/webm" />
  <p>你的浏览器不支持此视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```
## 音频
* 使用 `<audio> `元素，搭配`src`和`alt`。其他与上文类似。
## 关于媒体的其他知识

* `<iframe> `嵌入技术：旨在允许你将其他 Web 文档嵌入到当前文档中。这很适合将第三方内容嵌入你的网站，你可能无法直接控制。
* `SVG `---用于描述矢量图像的XML语言:它基本上是像 HTML 一样的标记，只是你有许多不同的元素来定义要显示在图像中的形状，以及要应用于这些形状的效果。SVG 用于标记图形，而不是内容。如`<circle`> 和`<rect>`。
```html
<svg
  version="1.1"
  baseProfile="full"
  width="300"
  height="200"
  xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black" />
  <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
```
显示如下：  
<svg
  version="1.1"
  baseProfile="full"
  width="300"
  height="200"
  xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black" />
  <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
* 响应式图片：  
`srcset`: 定义了浏览器可选择的图片设置以及每个图片的大小，每张图片信息的设置和前一个用逗号隔开。（名字 空格 宽度）  
`sizes` : 定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择。（条件 空格 当条件为真图像将填充的槽的宽度）
```html
<img
  srcset="elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w"
  sizes="(max-width: 600px) 480px,
         800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy" />
```

## 表格
`&nbsp`: 空白  
`colspan`: 让元素占多个单元宽度  
`rowspan`: 让元素占多个单元宽度  
`border-collapse`:` collapse`
表格合并
```html
<table> <!--表格包含在<table></table>--->
  <tr>      <!--行tr-->
    <td>Hi, I'm your first cell.</td><!-- 列td-->
    <td>I'm your second cell.</td>
    <td>I'm your third cell.</td>
    <td>I'm your fourth cell.</td>
  </tr>

  <tr>
    <td>Second row, first cell.</td>
    <td>Cell 2.</td>
    <td>Cell 3.</td>
    <td>Cell 4.</td>
  </tr>
</table>
```
`colgroup 和 col`: 在 table 的顶部添加一个` <colgroup>` 元素，就放在 `<table>` 标签下面，`<colgroup>`可以添加 `<col> `元素 (继续看下面剩余的步骤)。  
```html
      <colgroup>
        <col span="2">    <!--跳过前两行-->
        <col style="background-color:#97DB9A;"> <!--控制第三行-->
        <col style="width:42px;">      
        <col style="background-color:#97DB9A;">
        <col style="background-color:#DCC48E; border:4px solid #C1437A;">
        <col span="2" style="width:42px;">
      </colgroup>
```


## 交互展示
输入用户名:<input type="text" placeholder="请输入用户名">
·<br/><br/>

输入密码:<input type="password" placeholder="请输入密码">
<br/><br/>

性别:
<input type="radio" name="x" checked>男
<input type="radio" name="x">女
<br/><br/>

<input type="checkbox" checked>原神
<input type="checkbox">星穹铁道
<input type="checkbox">绝区零
<br/><br/>

文件:<input type="file" multiple>
<br/><br/>

选择游戏:
 <select>
  <option>原神</option>
  <option>星穹铁道</option>
  <option>绝区零</option>
  <option selected>崩坏3</option>
 </select>