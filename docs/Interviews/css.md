# CSS类问题 
## CSS3新特性
- **选择器**
``` html
div:last-child                  其父元素 匹配最后一个
div:nth-child(n)                其父元素 的第n个子元素
div:nth-last-child(n)           其父元素 的倒数第n个子元素

```
- **@Font-face**
可以用来加载字体样式，而且它还能够加载服务器端的字体文件
``` 
@font-face
{
font-family: myFirstFont;
src: url('Sansation_Light.ttf')}
```
- **圆角/阴影/渐变**
```
border-radius: 15px;
box-shadow: 0rem 0rem 0.7rem #cfd8dc;
background-image: linear-gradient(#e66465, #9198e5);
```
- **动画相关：Transition / Transforms / Animation**

``` 
transition: all 0.3s ease;
|||
transition-property:border-color, background-color, color;
transition-duration:.5s, .5s, .5s;
transition-timing-function:ease-in, ease-in, ease-in;
transition-delay:.1s, .1s, .1s;

----

transform: rotate(0deg);

----
    @keyframes slide-top {
0% {
    -webkit-transform: translateY(3vh) rotate(-2deg);
    transform: translateY(3vh) rotate(-2deg);
    opacity: 0;
}

100% {
    -webkit-transform: translateY(0) rotate(-2deg);
    transform: translateY(0) rotate(-2deg);
    opacity: 1;
    }
}


```

- **文字**
```
word-break: normal|break-all|keep-all;
word-wrap: normal|break-word;
text-overflow:clip|ellipsis|string 

ps:超出部分省略
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;

```
- **媒体查询**  
- @media
```
@media only screen and (max-width: 768px) {
    //...
}

```
## 布局方式
- flex布局
- grid布局
- 自然布局

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

## postion属性

## 实现居中的几种方法？
- animate和translate有没有用过，一些常见的属性说下？
- CSS实现宽度自适应100%，宽高16:9的比例的矩形。
- 如何实现左边两栏一定比例，左栏高度随右栏高度自适应？

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
### 创建bfc
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
    

## 九宫格
## 三栏布局

## inline和inline-block
### inline
- 无height,width
- margin水平有，垂直无
- 宽 = 内容 不可变
-  `span a label input`

### inline-block
- 不分行
- 有height,width,margin

## 什么省略文字
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