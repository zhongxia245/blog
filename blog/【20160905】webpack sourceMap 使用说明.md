## webpack sourceMap 使用说明
>时间：2016-09-05 15:23:30
>作者：zhongxia
>webpack文档地址：http://webpack.github.io/docs/build-performance.html#sourcemaps

![image](https://cloud.githubusercontent.com/assets/7597581/18247071/b0b11dd2-73a2-11e6-8fff-9b60deb59af7.png)


## 总结
>在开发环境，或者生产环境中，如果出现错误了，在浏览器中，因为代码从被Babel从JSX变成ES5的，代码调试起来很痛苦，因此webpack有了一个代码映射，把转换后的代码映射到之前自己写的代码。

>英语水平有限，下面翻译可能存在问题，请帮忙指出。

devtool可选值: 
- source-map 【用于生产环境】
- eval-source-map  
- eval-cheap-module-source-map 
- eval-cheap-source-map 
- eval 【建议开发环境用这个】
~~~
module.exports = {
  devtool: 'eval'，
  ...
}
~~~

### **Perfect SourceMaps are slow**.
~~~
越好的源码映射，越慢
~~~

### **source-map**
devtool: "`source-map`" cannot cache SourceMaps for modules and need to regenerate complete SourceMap for the chunk. It’s something for production.

>`source-map` 不能为 模块和需要重新生成的代码块 缓存SourceMaps，它适用于 生产环境。


### **eval-source-map**
devtool: "`eval-source-map `" is really as good as devtool: "source-map", but can cache SourceMaps for modules. It’s much faster for rebuilds.
>`eval-source-map` 和 `source-map` 差不多，但是 可以为模块 缓存它可以更快的重建SourceMaps，它可以更快的重建SourceMaps


### **eval-cheap-module-source-map**
devtool: "`eval-cheap-module-source-map`" offers SourceMaps that only maps lines (no column mappings) and are much faster.
>`eval-cheap-module-source-map` 只为行（没有列映射）提供SourceMaps 并且 速度更快（相对于 source-map, eval-source-map）

### **eval-cheap-source-map**
devtool: "`eval-cheap-source-map`" is similar but doesn’t generate SourceMaps for modules (i.e., jsx to js mappings).
>`eval-cheap-source-map` 和 `eval-cheap-module-source-map` 相似，但是不为模块 生成 SourceMaps（eg：jsx 到 js 的映射）

### **eval**
devtool: "`eval`" has the best performance, but it only maps to compiled source code per module. In many cases this is good enough. (Hint: combine it with output.pathinfo: true.)
>`eval`有最好的性能，但是它只映射到每个模块编译源代码，在更多情况下是足够用的(提示：与 `output.pathinfo:true` 结合使用)


**相关知识**
[output.pathinfo](https://webpack.github.io/docs/configuration.html#output-pathinfo)

Include comments with information about the modules.
~~~
require(/* ./test */23)
~~~
Do not use this in production.
>Default: false


## 
The UglifyJsPlugin use SourceMaps to map errors to source code. And SourceMaps are slow. As you should only use this in production, this is fine. If your production build is really slow (or doesn’t finish at all) you can disable it with new UglifyJsPlugin({ sourceMap: false }).
> UglifyJsPlugin会让 SourceMaps 映射到源码出现错误，速度变慢。所以把**UglifyJsPlugin用于生产环境**，这是很好的。
如果你生产环境构建很慢(或者玩不成)，可以用 `new UglifyJsPlugin({ sourceMap: false }).` 来禁用sourceMap。