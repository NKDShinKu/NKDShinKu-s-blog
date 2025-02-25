# 选择器
* **类型选择器**  
即标签名选择器，例如:
```css
h1 {
  color: rebeccapurple;
}
em {
  color: rebeccapurple;
}
````
* **全局选择器**   
是由一个星号（`*`）代指的，它选中了文档中的所有内容，例如：
```css
*{
  margin: 0;
}
```
* **类选择器**  
以一个句点（`.`）开头，会选择文档中应用了这个类的所有物件。与`class`搭配。
```css
.className{
}
```
* **ID选择器**   
ID 选择器开头为#而非句点，不过基本上和类选择器是同种用法。与`ID`搭配。
```css
#idName{
}
```
* **属性选择器**  

*存否和值选择器*：  
1. 选择器：`[attr]`  
示例：a[title]  
匹配带有一个名为attr的属性的元素——方括号里的值。

2. 选择器：`[attr=value]`  
示例：a[href="https://example.com"]  
匹配带有一个名为attr的属性的元素，其值正为value——引号中的字符串。
3. 选择器：`[attr~=value]`  
示例：p[class~="special"]  
匹配带有一个名为attr的属性的元素，其值正为value，或者匹配带有一个attr属性的元素，其值有一个或者更多，至少有一个和value匹配。  
注意：在一列中的好几个值，是用空格隔开的。
4. 选择器：`[attr|=value]`  
示例：div[lang|="zh"]  
匹配带有一个名为attr的属性的元素，其值可正为value，或者开始为value，后面紧随着一个连字符。 

*子字符串匹配选择器*： 
1. 选择器：`[attr^=value]`  
示例：li[class^="box-"]  
匹配带有一个名为attr的属性的元素，其值开头为value子字符串。

2. 选择器：`[attr$=value]`  
示例：li[class$="-box"]  
匹配带有一个名为attr的属性的元素，其值结尾为value子字符串

3. 选择器：`[attr*=value]`  
示例：li[class*="box"]  
匹配带有一个名为attr的属性的元素，其值的字符串中的任何地方，至少出现了一次value子字符串。

## 伪类和伪元素选择器
* 伪类是选择器的一种，它用于选择处于**特定状态**的元素，它是开头为冒号（`:`）的关键字。
`:hover`——上面提到过，只会在用户将指针挪到元素上的时候才会激活，一般就是链接元素。  
`:focus`——只会在用户使用键盘控制，选定元素的时候激活。  
`:link`——访问前  
`:visited`——访问后  
`:active`——点击时   

* 结构伪类选择器  
`:first-child`——选择第一个元素  
`:last-child`——选择最后一个元素  
`:nth-child(N)`——选择第N个元素（括号里面填公式可以选中多个元素，比如填“2n”）
     
```css
a:hover {
  color:hotpink;
}
```
* 伪元素以类似方式表现，不过表现得是像你往标记文本中加入**全新的 HTML 元素**一样

1. `::first-line`伪元素选择器: 即使单词/字符的数目改变，它也只会选中第一行。

2. `::before`: 插入到了元素开头。

3. `::after`: 插入到了元素末尾。
```css
.box::before {
  content: " xxx ";
}
```
## 关系选择器
* 后代选择器  
典型用单个空格`（" "）`字符——组合两个选择器
例如：
```css
.box p {
  color: red;
}
```
只会匹配处于带有`.box`类的元素里面`<p>`元素。
* 子代关系选择器  
子代关系选择器是个大于号`（>）`，只会在选择器选中直接子元素(<font color = "red">只小一级</font>)的时候匹配。继承关系上更远的后代则不会匹配。

* 邻接兄弟  
邻接兄弟选择器`（+）`用来选中恰好处于另一个在继承关系上同级的元素旁边的物件。  
(<font color = "red">比如下面就是选择p后面的h1进行样式化</font>)  
```css
p + h1{
}
```
* 通用兄弟  
选择一个<font color = "red">元素后面的所有的目标元素</font>。  
(比如下面选择h1后面的所有的p进行样式化)
```css
h1 ~ p {
}
```
# CSS特性

## 继承性
* 子级默认属性继承父级的文字控制属性  

即继承父，如果子无对应属性就会继承父的对应属性，有对应属性就不会会继承父的对应属性。

## 层叠性
* 相同的属性会覆盖：后面的CSS属性覆盖前面的CSS属性
* 不同的属性会叠加：不同的CSS属性都生效

## 优先级
* 规则：选择器优先级高的样式生效。  
* 公式：通配符选择器 < 标签选择器 < 类选择器 < id选择器 < 行内样式 < !important  
（选中标签的范围越大，优先级越低）

* 叠加计算：如果是复合选择器，则需要权重叠加计算。
* 公式：行内样式 > id选择器个数 > 类选择器个数 > 标签选择器个数（每一级之间不存在进位）
* 规则：
1. 从左向右依次比较选个数，同一级个数多的优先级高，如果个数相同，则向后比较
2. !important 权重最高
2. 继承权重最

# 文本样式化
## 基本文字样式
* `font-size`: 字体大小  
数字 + px(一般单位)
* `font-weight`: 字体粗细  
正常：400  normal  
加粗：700  bold
* `font-style`: 字体倾斜  
正常：normal  
倾斜：italic
* `line-height`: 行高  
数字 + px  
数字(当前font-size的倍数)
* `font-family`: 字体族（字体样式）  
属性就是字体样式名字，我们一般使用无衬线样式。  
font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, sans-serif;
* `font`: 符合属性  
一般用于设置网页公共样式，必须写字号和字体  
属性可以跟 倾斜 加粗 字号/行高 字体
* `text-indent`: 文本缩进  
数字 + px   
数字 + em(1em = 当前标签字号大小)
* `text-align`: 文本方式  
left：左对齐(默认)  
center：居中
right：右对齐
* `text-decoration`: 修饰线  
none：无  
underline：下划线  
line-through：删除线  
overline：上划线
* `color`: 颜色
![alt text](my_notes_images/01_colora.png)

# 排版
## 背景属性
* 背景色 `background-color`

* 背景图 `background-image`     
属性值：`url` `(`背景图 URL`)`   
ps: 背景图默认是平铺(复制)效果
```css
div {
width: 400px;
height: 400px;
background-image: url(./images/1.png);
}
```
* 背景图平铺方式 `background-repeat`  
`no-repeat`：不平铺  
`repeat`：平铺（默认）  
`repeat-x`：水平平铺  
`repeat-y`：垂直平铺  

* 背景图位置 `background-position`  
属性值：水平位置 垂直位置  
1. 关键字：`left, right, center, top, bottom`  
2. 数字+px：正数向右或向下，负数向左或向上  
ps： 关键字取值方式写法，可以颠倒取值顺序  
可以只写一个关键字，另一个方向默认为居中；数字只写一个值表示水平方向，垂直方向为居中

* 背景图缩放 `background-size`  
1. `cover`：等比例缩放背景图片以完全覆盖背景区，可能背景图片部分看不见  
`contain`：等比例缩放背景图片以完全装入背景区，可能背景区部分空白  
2. 百分比：根据盒子尺寸计算图片大小  
3. 数字 + 单位（例如：px）

* 背景图固定 `background-attachment`  
作用：背景不会随着元素的内容滚动  
属性值：`fixed`

* 背景复合属性 `background`  
属性值：背景色 背景图 背景图平铺方式 背景图位置/背景图缩放 背景图固定（空格隔开各个属性值，不区分顺序）

## 显示模式
* 块级元素(`例如div`)  
独占一行  
宽度默认是父级的100%  
添加宽高属性生效

* 行内元素(`例如span`)  
一行可以显示多个  
设置宽高属性不生效  
 宽高尺寸由内容撑开  

* 行内块元素(`例如img`)  
一行可以显示多个  
设置宽高属性生效  
宽高尺寸也可以由内容撑  

* 转换显示模式  
属性名：`display`  
属性值：  
`block`：块级  
`lnline`：行内  
`lnline-block`：行内块  

## 盒子模型

### 盒子模型——组成
* 内容区域 –` width` & `height` 
* 内边距 – `padding`（出现在内容与盒子边缘之间）
* 边框线 – `border`
* 外边距 – `margin`（出现在盒子外面）

### 盒子模型——边框线
* 属性名：`border`（bd）  
* 属性值：边框线粗细 线条样式 颜色（不区分顺序）  
常用线条样式：
1. solid 实线
2. deshed 虚线
3. dotted 点线
* `border-方位名词`——设置不同方向的边框线
```css
div {
      border-top: 2px solid red;
      border-right: 3px dashed green;
      border-bottom: 4px dotted blue;
      border-left: 5px solid orange;
      width: 200px;
      height: 200px;
      background-color: pink;
}
```
### 盒子模型——内边距
* 作用：设置 内容 与 盒子边缘 之间的距离。
* 属性名：`padding` / `padding-方位名词`
```css
div {
      /* 四个方向 内边距相同 */
      padding: 30px;
      /* 单独设置一个方向内边距 */
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 40px;
      padding-left: 80px;
      width: 200px;
      height: 200px;
      background-color: pink;
}
```
* pading多值写法
![alt text](my_notes_images/02_pading_1_2_3_4.png)

### 盒子模型——尺寸计算
* 默认情况  
盒子尺寸 = 内容尺寸 + border 尺寸 + 内边距尺寸
* 结论：给盒子加 border / padding 会撑大盒子
* 解决:
1. 手动做减法，减掉 border / padding 的尺寸
2. 內减模式：`box-sizing: border-box`

### 盒子模型——外边距
* 作用：拉开两个盒子之间的距离
* 属性名：`margin`
* 提示：与 padding 属性值写法、含义相同
* 技巧：版心居中 – 左右 `margin` 值为 `0 auto`（盒子要有宽度）

### 清除默认样式
```css
/* 清除默认内外边距 */
* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
}
/* 清除列表项目符号 */
li {
      list-style: none;
}
```
### 盒子模型元素溢出
* 作用：控制溢出元素的内容的显示方式。
* 属性名：`overflow`
* 属性值：
1. `hidden` 溢出隐藏
2. `scroll` 溢出滚动（无论是否溢出，都显示滚动条位置）
3. `auto` 溢出滚动（溢出才显示滚动条位置）

### 外边距问题——合并与塌陷现象

* 合并现象
1. 场景：垂直排列的兄弟元素，上下 `margin` 会合并
2. 现象：取两个 `margin` 中的较大值生效

* 塌陷现象
1. 场景：父子级的标签，子级的添加上外边距会产生塌陷问题
2. 现象：导致父级一起向下移动
3. 解决方法：  
取消子级 `margin`，父级设置`padding ` 
父级设置 `overflow`: `hidden`  
父级设置 `border-top`  

### 行内元素 – 内外边距问题
* 场景：行内元素添加 `margin` 和 `padding`，无法改变元素垂直位置
* 解决方法：给行内元素添加 `line-height` 可以改变垂直位
```css
span {
      /* margin 和 padding 属性，无法改变垂直位置 */
      margin: 50px;
      padding: 20px;
      /* 行高可以改变垂直位置 */
      line-height: 100px;
}

```

### 盒子模型 – 圆角
* 作用：设置元素的外边框为圆角。
* 属性名：border-radius
* 属性值：数字+px / 百分比
* 提示：属性值是圆角半径
* 技巧：从左上角开始顺时针赋值，当前角没有数值则与对角取值相同。
![alt text](my_notes_images/03_border-radius.png)

### 盒子模型 – 阴影（拓展）
* 作用：给元素设置阴影效果
* 属性名：`box-shadow`
* 属性值：X 轴偏移量 Y 轴偏移量 模糊半径 扩散半径 颜色 内外阴影  
* 注意：
1. X 轴偏移量 和 Y 轴偏移量 必须书写
2. 默认是外阴影，内阴影需要添加`inset`

# 浮动
## 标准流
标准流也叫文档流，指的是标签在页面中默认的排布规则，例如：块元素独占一行，行内元素可以一行显示多个。

## 浮动
* 作用：让块元素水平排列。
* 属性名：`float`
* 属性值 `left`表示左对齐，`right`表示右对齐  
* 特点：
1. 浮动后的盒子顶对齐
2. 浮动后的盒子具备行内块特点
3. 父级宽度不够，浮动的子级会换行
4. 浮动后的盒子脱标(标准流)

* 清除浮动  
场景：浮动元素会脱标，如果父级没有高度，子级无法撑开父级高度（可能导致页面布局错乱）  
解决方法：清除浮动（清除浮动带来的影响）
1. 额外标签法  
在父元素内容的最后添加一个块级元素，设置 CSS 属性 `clear: bot`
2. 单伪元素法  
```css
.clearfix::after {
content: "";
display: block;
clear: both;
}
```
3. 双伪元素法（推荐）  
```css
.clearfix::before,
.clearfix::after {
content: "";
display: table;
}
.clearfix::after {
clear: both;
}
```
4. overflow  
父元素添加 CSS 属性 `overflow: hidden`

# flex布局
Flex 布局也叫弹性布局，是浏览器提倡的布局模型，非常适合结构化布局，提供了强大的空间分布和对齐能力。  
Flex 模型不会产生浮动布局中脱标现象，布局网页更简单、更灵活

## flex-组成
* 设置方式：给父元素设置 `display: flex`，子元素可以自动挤压或拉伸
* 组成部分：  
弹性容器  
弹性盒子  
主轴：默认在水平方向  
侧轴 / 交叉轴：默认在垂直

## flex-布局
* 创建 flex 容器 `display: flex`
* 主轴对齐方式 `justify-content`
* 侧轴对齐方式 `align-items`
* 某个弹性盒子侧轴对齐方式 `align-self`
* 修改主轴方向 `flex-direction`
* 弹性伸缩比 `flex`
* 弹性盒子换行 `flex-wrap`
* 行对齐方式 `align-content`

## 主轴对齐方式
属性名：`justify-content`  
属性值：  
`flex-start`：
默认值，弹性盒子从起点开始依次排列  
`flex-end`：
弹性盒子从终点开始依次排列  
`center`：
弹性盒子沿主轴居中排列  
`space-between`：
弹性盒子沿主轴均匀排列，空白间距均分在弹性盒子之间  
`space-around`：
弹性盒子沿主轴均匀排列，空白间距均分在弹性盒子两侧  
`space-evenly`：
弹性盒子沿主轴均匀排列，弹性盒子与容器之间间距相等  

## 侧轴对齐方式
属性名：  
`align-items`：当前弹性容器内所有弹性盒子的侧轴对齐方式（给弹性容器设置）   
`align-self`：单独控制某个弹性盒子的侧轴对齐方式（给弹性盒子设置）  
属性值：  
`stretch`：
弹性盒子沿着侧轴线被拉伸至铺满容器(弹性盒子没有设置侧轴方向尺寸则默认拉伸)  
`center`：
弹性盒子沿侧轴居中排列  
`flex-start`：
弹性盒子从起点开始依次排列  
`flex-end`：
弹性盒子从终点开始依次排列  

## 修改主轴方向
主轴默认在水平方向，侧轴默认在垂直方向  
属性名：`flex-direction`   
属性值：  
`row`：
水平方向，从左向右(默认)  
`column`：
垂直方向，从上向下  
`row-reverse`：
水平方向，从右向左  
`column-reverse`：
垂直方向，从下向上  

## 弹性伸缩比
作用：控制弹性盒子的主轴方向的尺寸。  
属性名：`flex ` 
属性值：整数数字，表示占用父级剩余尺寸的份数。  

## 弹性盒子换行
弹性盒子可以自动挤压或拉伸，默认情况下，所有弹性盒子都在一行显示。  
属性名：`flex-wrap ` 
属性值  
`wrap`：换行  
`nowrap`：不换行（默认）

## 行对齐方式
属性名：`align-content`   
属性值：   
`flex-start`：
默认值，弹性盒子从起点开始依次排列  
`flex-end`：
弹性盒子从终点开始依次排列  
`center`：
弹性盒子沿主轴居中排列  
`space-between`：
弹性盒子沿主轴均匀排列，空白间距均分在弹性盒子之间  
`space-around`：
弹性盒子沿主轴均匀排列，空白间距均分在弹性盒子两侧  
`space-evenly`： 
弹性盒子沿主轴均匀排列，弹性盒子与容器之间间距相等  
注意：该属性对单行弹性盒子模型无效。

# 定位   
## 定位  
作用：灵活的改变盒子在网页中的位置  
实现：
1. 定位模式：`position`
2. 边偏移：设置盒子的位置(`left`   `right`  `top`  `bottom`)

## 相对定位  
`position`: `relative`  
特点：  
* 不脱标，占用自己原来位置  
* 显示模式特点保持不变  
* 设置边偏移则相对自己原来位置移动  
拓展：很少单独使用相对定位，一般是与其他定位方式配合使用

## 绝对定位 
`position`: `absolute`  
使用场景：子级绝对定位，父级相对定位（子绝父相）  
特点：  
* 脱标，不占位  
* 显示模式具备行内块特点  
* 设置边偏移则相对最近的已经定位的祖先元素改变位置  
* 如果祖先元素都未定位，则相对浏览器可视区改变位置  

## 定位居中  
实现步骤：  
1. 绝对定位  
2. 水平、垂直边偏移为 50% 
3. 子级向左、上移动自身尺寸的一半    
左、上的外边距为 –尺寸的一半  
`transform`: `translate(-50%, -50%)`  

## 固定定位
`position`: `fixed`  
场景：元素的位置在网页滚动时不会改变  
特点：  
* 脱标，不占位  
* 显示模式具备行内块特点  
* 设置边偏移相对浏览器窗口改变位置  

## 堆叠层级 z-index
默认效果：按照标签书写顺序，后来者居上  
作用：设置定位元素的层级顺序，改变定位元素的显示顺序  
属性名：`z-index`  
属性值：整数数字（默认值为0，取值越大，层级越高）  

![alt text](my_notes_images/04_dingwei.png)

# 技巧

## CSS精灵
CSS 精灵，也叫CSS Sprites，是一种网页图片应用处理方式。把网页中一些背景图片整合到一张图片文件中，再`background-position`精确的定位出背景图片的位置。
* 优点：减少服务器被请求次数，减轻服务器的压力，提高页面加载速度
* 实现步骤：
1. 创建盒子，盒子尺寸与小图尺寸相同
2. 设置盒子背景图为精灵图
3. 添加 background-position 属性，改变背景图位置  
3.1 使用 PxCook 测量小图片左上角坐标  
3.2 取负数坐标为 background-position 属性值（向左上移动图片位置

## 字体图标
* 引入字体样式表（iconfont.css）
* 标签使用字体图标类名
1. iconfont：字体图标基本样式（字体名，字体大小等等）
2. icon-xxx：图标对应的类名

## css修饰属性
### 垂直对齐方式 vertical-align
* 属性名：`vertical-align`
* 属性值：  
`baseline` 基线对齐（(默认)  
`top` 顶部对齐  
`middle` 居中对齐  
`bottom` 底部对齐  
![alt text](my_notes_images/05_baseline.png)

### 过渡 transition
* 作用：可以为一个元素在不同状态之间切换的时候添加过渡效果  
* 属性名：`transition`（复合属性）  
* 属性值：过渡的属性 花费时间 (s)  
* 提示：
1. 过渡的属性可以是具体的 CSS 属性
2. 也可以为 all（两个状态属性值不同的所有属性，都产生过渡效果）
3. transition 设置给元素本身

### 透明度 opacity
* 作用：设置整个元素的透明度（包含背景和内容）
* 属性名：`opacity`
* 属性值：0 – 1  
1. 0：完全透明（元素不可见）
2. 1：不透明
3. 0-1之间小数：半透明

### 光标类型 cursor
* 作用：鼠标悬停在元素上时指针显示样式
* 属性名：cursor
* 属性:  
`default` 默认值，通常是箭头  
`pointer` 小手效果，提示用户可以点击  
`text` 工字型，提示用户可以选择文字  
 `move` 十字光标，提示用户可以移动