## webpack分离css单独打包
CreateTime：2016-05-17 11:55
UpdateTime：2016-09-02 16:35
>由于这篇文章只写了如何把CSS打包成一个CSS文件，没有讲解如何打包成多个CSS文件，经简友提点，这里添加上了 打包成多个CSS文件的方法。


![image](https://cloud.githubusercontent.com/assets/7597581/18246992/20a92f22-73a2-11e6-8472-0259f6f96280.png)


## 瞎扯
> webpack 把所有的资源都当成了一个模块, CSS,Image, JS 字体文件 都是资源, 都可以打包到一个 bundle.js 文件中. 
> 但是有时候需要把样式 单独的打包成一个文件, 然后放到 CND上, 然后缓存到浏览器客户端中

---
## 一、extract-text-webpack-plugin 使用方法
这个操作很简单的，只需要一个插件就好了，就是`extract-text-webpack-plugin`

#### 1. 安装extract-text-webpack-plugin
```
npm install extract-text-webpack-plugin --save-dev
```

#### 2. 配置文件添加对应配置
首先require一下
```
var ExtractTextPlugin = require("extract-text-webpack-plugin");
```
plugins里面添加
```
new ExtractTextPlugin("styles.css"),
```
实例：
```
plugins:  [
      new webpack.optimize.CommonsChunkPlugin('common.js'),
      new ExtractTextPlugin("styles.css"),  
],
```
modules里面对css的处理修改为
```
{
    test: /\.css$/,
     loader:  ExtractTextPlugin.extract("style-loader","css-loader")
},
```
**千万不要重复了，不然会不起作用的**

  我这里如下：
```
module:  {
      loaders:  [
            {
            test: /\.css$/,
             loader:  ExtractTextPlugin.extract("style-loader","css-loader")
        },
            {
            test:  /\.scss$/,
             loader:  "style!css!sass"
        },
            {
            test:  /\.less$/,
             loader:  "style!css!less"
        },
    ]
},
```
#### 3. 在引入文件里面添加需要的css，【举例如下】

```
require('../less/app.less');
require('./bower_components/bootstrap-select/dist/css/bootstrap-select.min.css');
require('./bower_components/fancybox/source/jquery.fancybox.css');
```


## 二、如何把CSS打包成一个文件， 和 把CSS打包成多个文件
>打包一个文件，只需要常规的在入口的js文件引用 css文件即可， 打包成多个CSS文件，可以设置多个CSS入口，让webpack用 loader去打包。 和分割单独打包js文件一样。下面有两个例子。[【例子来源】](https://github.com/wangcongyi/test/blob/master/postcss-webpack.html)

```
//  使用webpack 打包单独的postcss语法的css文件
/*   webpack.config.js   */
var precss = require('precss');
var cssnext = require('cssnext');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var Ex = require('extract-text-webpack-plugin');
module.exports = {
    entry: './【path】/index.js',
    /*  index.js 里  require('./【name】.css');就好  我在看看文档是不是直接不用引入js文件 */
    output: {
      filename: 'index.js'
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loader: Ex.extract('style-loader', 'css-loader!postcss-loader') /*这里的写法注意下 */
      }]
    },
    postcss: function() {
      return [autoprefixer, cssnext, precss, cssnano]
    },
    plugins: [
      new Ex("【name】.css")
    ]
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //  使用webpack 打包单独的多个postcss语法的css文件
var precss = require('precss');
var cssnext = require('cssnext');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var Ex = require('extract-text-webpack-plugin');
var webpack = require('webpack');


module.exports = {
  entry: {
    ac1: './src/actother.css',
    ac2: './src/index.css'
  },
  output: {
    filename: "[name].css"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: Ex.extract('style-loader', 'css-loader!postcss-loader')
    }]
  },
  postcss: function() {
    return [autoprefixer, precss, cssnano, cssnext]
  },
  plugins: [
    new Ex('[name].css')
  ]
}
```