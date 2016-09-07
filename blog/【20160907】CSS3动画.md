## CSS3动画
>CreateTime: 2016-09-07 11:14:32
>Author： zhongxia

> CSS3的动画效果是一个很有用的功能，可以很方便的实现了早期只能用JS来实现的动画效果。这里主要讲解CSS3的动画

## CSS3动画 transition 和 animation
### 一、transition （过度）
>在没有出现transition之前，CSS是没有时间轴的，状态变化是即时完成的。

最简单的使用方法
```
/*==================最基本用法=====================*/
img{
    width:20px;
    height:20px;
    transition: 1s;  /*设置CSS属性变化过度的时间*/
}
img:hover{
    width:200px;
    height:200px;
}

/*==================完整例子=====================*/
img{
    transition: 2s 1s height ease;  
}

img{
    transition-property: height;        /*CSS状态值需要过度的属性*/
    transition-duration: 2s;            /*过度时间*/
    transition-delay: 1s;               /*延迟时间*/

    transition-timing-function: ease;   
    /*状态变化速度（ease 逐渐放慢、linear 匀速、ease-in 加速、ease-out 减速、cubic-bezier函数：自定义速度模式）*/
}


```

>cubic-bezier 可以使用工具网站来实现 [工具网站](http://cubic-bezier.com/)

#### transition的使用注意

- 各大浏览器（IE10+）支持不加前缀的 transition。

- 不是所有的CSS属性都只是 transition。 [完整列表](http://oli.jp/2010/css-animatable-properties/)

- transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height: auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background: url(foo.jpg)到url(bar.jpg)等等。


#### transition的局限
>transition的优点在于简单易用，但是它有几个很大的局限。

- transition需要事件触发，所以没法在网页加载时自动发生。

- transition是一次性的，不能重复发生，除非一再触发。

- transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

- 一条transition规则，只能定义一个属性的变化，不能涉及多个属性。
CSS Animation就是为了解决这些问题而提出的。


### 二、animation （动画）

```
/*定义一个动画效果*/
@-webkit-keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}

@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}

div {
    width: 200px;
    height: 200px;
    border: 1px solid black;
}

/*hover 使用这个动画效果*/
div:hover{
    -webkit-animation: 1s rainbow; 
    animation: 1s rainbow;  /*默认播放一次*/
} 
```


```
/*==================animation简写======================*/
animation: 1s rainbow infinite; /*无限次播放*/
animation: 1s rainbow 10; /*播放10次*/

div:hover {
  animation: 2s 1s rainbow linear 3 forwards normal;
}

div:hover {
  animation-name: rainbow;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-delay: 1s;
  animation-fill-mode:forwards;
  animation-direction: normal; 
  animation-iteration-count: 3;
}

```
animation-fill-mode: 动画结束以后，会立即从结束状态跳回到起始状态。如果想让动画保持在结束状态，需要使用animation-fill-mode属性。

- none：默认值，回到动画没开始时的状态。
- backwards：让动画回到第一帧的状态。
- both: 根据animation-direction（见后）轮流应用forwards和backwards规则。

animation-direction：动画循环播放后，每次播放完都是回到开始的状态，这个属性可以修改
![](http://image.beekka.com/blog/201402/bg2014021401.png)
简单说，animation-direction指定了动画播放的方向，最常用的值是normal和reverse。浏览器对其他值的支持情况不佳，应该慎用。

### keyframes
> chrome 不支持没有前缀的 @keyframes ,因此需要加上 @-webkit-keyframes, IE10+ 和 Firefox16+ 支持不加前缀的@keyframes


```
/*from=0%   to=100%*/
@keyframes rainbow {
  from { background: #c00 }
  50% { background: orange }
  to { background: yellowgreen }
}
/* 上面的 等于 下面这个写法*/
@keyframes rainbow {
  0% { background: #c00 }
  50% { background: orange }
  100% { background: yellowgreen }
}

@keyframes pound {
  from，to { transform: none; }
  50% { transform: scale(1.2); }
}

//另外一点需要注意的是，浏览器从一个状态向另一个状态过渡，是平滑过渡。steps函数可以实现分步过渡。
div:hover {
  animation: 1s rainbow infinite steps(10);
}
```

动画播放结束之后，默认回到初始状态，这个时候就需要使用到 animation-play-state 
```
div {
    animation: spin 1s linear infinite;
    animation-play-state: paused;
}

div:hover {
  animation-play-state: running;
}

```

## 参考文章
1. [CSS in the 4th Dimension](http://2013.jsconf.asia/blog/2013/10/31/jsconfasia-2013-lea-verou-css-in-the-4th-dimension-not-your-daddys-css-animations)
2. [CSS3动画简介](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)
