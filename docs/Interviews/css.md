# CSS相关


## css3 gpu加速
## css module的理解

## CSS3新特性
- `选择器`
``` css
div:last-child                  其父元素 匹配最后一个
div:nth-child(n)                其父元素 的第n个子元素
div:nth-last-child(n)           其父元素 的倒数第n个子元素

```
- `@Font-face`
可以用来加载字体样式，而且它还能够加载服务器端的字体文件
``` css
@font-face
{
font-family: myFirstFont;
src: url('Sansation_Light.ttf')}
```
- `圆角/阴影/渐变`
``` css
border-radius: 15px;
box-shadow: 0rem 0rem 0.7rem #cfd8dc;
background-image: linear-gradient(#e66465, #9198e5);
```
- `动画相关：Transition / Transforms / Animation`

``` css
transition: all 0.3s ease;
----
transform: rotate(0deg);
----
div{
  animation: slide-top 1s linear 1s infinite alternate; 
}    
    @keyframes slide-top {
0% {
    transform: translateY(3vh) rotate(-2deg);
    opacity: 0;
}
100% {
    transform: translateY(0) rotate(-2deg);
    opacity: 1;
    }
}


```

- `文字`
``` css
word-break: normal|break-all|keep-all;
word-wrap: normal|break-word;
text-overflow:clip|ellipsis|string 

ps:超出部分省略
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;

```
- `媒体查询 @media`
``` css
@media only screen and (max-width: 768px) {
    //...
}

```

## css选择器
- id/class
- tag属性
- 特定子选择器
  - a > b 仅以a为父元素的所有b
  - a + b 仅接着a后出现的b， a和b有同一个父元素
- 伪类:
  - :link
  - : active
  - :hover


## animation
``` css
div { 
    animation-name: test; 
    animation-duration: 3s;  // 花费的时间
    animation-timing-function: linear; // 速度曲线
    animation-delay: 1s;  // 开始前的延迟
    animation-iteration-count: infinite;  // n重复次数 | 无限次
    animation-direction: alternate;  // 方向
    /*      
    简写属性     
    animation: test 1s linear 1s infinite alternate;     
    */ 
} 
@keyframes test{
    0% { left: 0; top: 0;} 
    25% { left: 0; top: 50px;} 
    50% { left: 50px; top: 50px;} 
    75% { left: 50px; top: 0;} 
    100% { left: 0; top: 0;} 
}

```
## Transition 
设置元素当过渡效果
``` css
transition-property:border-color, background-color, color; // 需要过渡的属性
transition-duration:.5s, .5s, .5s; // 过渡持续时间
transition-timing-function:ease-in, ease-in, ease-in; //过渡函数
transition-delay:.1s, .1s, .1s; // 过渡延迟时间
```
## Transforms
置元素的形状改变，主要有以下几种变形
``` css
transform: rotate(45deg); // 顺时针旋转45度 
transform: rotate3d(x,y,z,angle); 
transfrom:scale(x,y); // 缩放
transform: skew(x,y); // 扭曲
```

## 布局方式
- flex布局
- grid布局
``` css
 grid-template-areas: 'a a b '
                      'c d f '
```
- 圣杯布局
  - display: flex;
  - 两侧设置固定宽度,并不允许弹性缩放flex: 0; flex-basis: 200px;
  - 中间允许弹性缩放，不设置宽度flex:1
- 三栏等高布局，且两边的侧栏宽度固定而中间一栏占用剩余的空间
``` css
<style>
  section {display: flex;}
  .left-side,.right-side {width: 200px;}
  .content {flex-grow: 1;}
</style>
<section>
  <div class="left-side"></div>
  <div class="content"></div>
  <div class="right-side"></div>
</section>
```
## flex 相关
### 父容器
- flex/inline-flex
- flex-dirction: row-reverse/column
- flex-wrap:wrap/nowarp/war-reverse
- justify-content:flex-end/center/space-between
- aligin-items: stretch/flex-end/center
- aligin-content: flex-start
### flex-grow
- 决定了父元素在空间分配方向上还有剩余空间时，如何分配这些剩余空间
- 根据权重
### flex-shrink
- 在空间不够时让各个子元素收缩以适应有限的空间
- 用来“吸收”超出的空间，按占比进行缩小，0表示不压缩
### flex-basis
- 本身希望渲染的长度,子类占用的空间值，可以设xxpx

## 盒模型
- 包括 `margin` `border` `padding` `content`
- w3c标准盒子
  - set `box-sizing:content-box`
  - `height` = content's `height`
  - `width`  =  content's `width`
  - `margin-left` - `border-left` - `padding-left` - `content'width` 其他同理
- ie盒子
  - set `box-sizeing:border-box`
  - `height` = `border-top` + `padding-top` + `content` + `padding-bottom` + `border-bottom`
  - `width`  =  `border-left` + `padding-left` + `content` + `padding-right` + `border-right`
- box-sizing属性有3个值，
  - content-box
  - border-box
  - inherit 从父元素继承 box-sizing 属性的值

## 居中
```
<div class="parent">
  <div class="child">
    DEMO
  </div>
</div>

```
- 父text-aligin:center 子inline-block
- 父relative 子absolute left 50%
- flex justify-content:center
- transform:translatey(-50%)
### 水平垂直居中
### 水平居中
### 垂直居中


## 定位方案
- 普通流
    - 由上到下，行水平直到占满换行
    - 块级起新行
- 浮动
    - 根据浮动方向左右偏移
- 绝对定位
    - 脱离普通流，由上一级相对定位的坐标决定
## BFC
- 原理
    - 属于普通流
    - 一块独立的渲染区域，里面的元素不会影响到外部的元素
### 创建BFC
- 根元素
- 浮动 `float` 除了 none 以外
- 绝对定位 `absolute`/`fixed`
- `display` : `inline-block`
- `table-cell`
- 弹性盒 `flex`
- `overflow`: `hidden`/`auto`/`scoll` 除了visible
### bfc案例
- 发生边距`margin`重叠，原则上取最大值
    - 外层套 div + overflow:hidden
- 父子div，子div浮动，父容器高度塌陷
    - 父设置`overflow:hidden`
- 兄弟，浮动元素覆盖了没浮动的
    - 触发没浮动的元素的bfc，设置`overflow`

## 清除浮动
- 在浮动元素后面添加一个闭合元素，让这个元素的内容为空，height为0，css设置clear：both
- 在浮动元素后面添加一个div，设置clear：both
- 在浮动元素后面添加一个伪元素，设置clear： both
- 使父级元素变成BFC

## 九宫格
- flex 让里面 text-algin:center
### 实现一个自适应的九宫格
``` js
<!-- css flex布局实现响应式九宫格以及calc()计算表达式的值 -->
<!DOCTYPE html>
<html>
<style>
.blockDiv{
    width: 100%;
    display:flex;
    flex-wrap: wrap;
}
.block{
    width: calc(calc(100% / 3) - 10px);
    margin:5px;
    height:50px;
    box-sizing: border-box;
}
</style>
<body>
   <div class="blockDiv">
        <div class="block"></div>
       ...x9
    </div>
</body>
</html>
```

## inline和inline-block
### inline
- 无height,width
- margin水平有，垂直无
- 宽 = 内容 不可变
-  `span a label input`

### inline-block
- 不分行
- 有height,width,margin

## 怎么省略文字
``` css
div{
overflow:hidden
text-overflow:ellipsis
white-space:nowrap
}
```

## rem em px
- px像素px是相对于显示器屏幕分辨率而言的
- rem 相对root em
- em 相对于当前对象内文本的字体尺寸

## less和sass区别和scss区别
- sass/scss use `$`
- less use `@`
- Sass后来受Less影响也发布了接近CSS块语法的 `Scss`
- sass/scss `@mixin`+`@include`
- sass/scss  继承`myclass{ @extend .otherclass}`

## position属性，最新的了解过吗
- static 无定位 该在哪儿在哪儿
- inherit 继承
- relative 
- absolute 
- fixed 
- sticky 新 吸附 须指定 top、right、bottom、left 四个阈值 如top:0

