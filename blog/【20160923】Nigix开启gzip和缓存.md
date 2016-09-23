![](http://ww4.sinaimg.cn/large/65e4f1e6jw1f83mxga7mbj20im05kaad.jpg)

## Nginx 开启 gzip和缓存
>时间：2016-09-23 16:42:37

>nginx 是一个高性能的 Web 服务器，之前也写过一些关于 nginx 的文章。为了提高博客的响应速度，可以从设置 nginx 的 gzip 和缓存这2方面入手。为字体开启 gzip 和缓存能大大减少带宽的消耗。


### 开启GZIP配置
```
# 开启gzip
gzip on;

# 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
gzip_min_length 1k;

# gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
gzip_comp_level 2;

# 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;

# 禁用IE 6 gzip
gzip_disable "MSIE [1-6]\.";
```

### gzip_comp_level 参数
Nginx开启gzip的压缩效果
![](http://ww1.sinaimg.cn/large/65e4f1e6jw1f83lz6o5puj20kh0f3ju2.jpg)

从图中可以看出，压缩等级在 1 之后的压缩效果都不是很明显，因此设置的时候，设置 1 或者 2即可。

开启成功，则请求资源如下

![](http://ww2.sinaimg.cn/large/65e4f1e6jw1f83nys5yu2j20jk0dqtba.jpg)


### 开启缓存
配置
```
location ~* ^.+\.(ico|gif|jpg|jpeg|png)$ { 
        access_log   off; 
        expires      30d;
}

location ~* ^.+\.(css|js|txt|xml|swf|wav)$ {
    access_log   off;
    expires      24h;
}

location ~* ^.+\.(html|htm)$ {
        expires      1h;
}
```
其中的缓存时间可以自己根据需要修改。

### 关于字体
为静态资源开启缓存能够较少服务器带宽的消耗，特别是在css中使用字体时，同时配合gzip压缩能够大大减少下载字体造成的带宽影响。

### 设置字体缓存

需要注意的是，字体有很多格式，为所有字体格式设置缓存是很有必要的。
```
location ~* ^.+\.(eot|ttf|otf|woff|svg)$ {
        access_log   off;
        expires max;
}
```

### 启用gzip

只需要为 ttf、otf 和 svg 字体启用 gzip，对其他字体格式进行 gzip 压缩时效果不明显。

gzip_types  font/ttf font/otf image/svg+xml
各种字体类型压缩效果可以参考以下测试结果：

#### ttf字体压缩效果
![](http://ww1.sinaimg.cn/large/65e4f1e6jw1f83m8krwkbj20hc04z0tg.jpg)

#### otf字体压缩效果
![](http://ww2.sinaimg.cn/large/65e4f1e6jw1f83m8u5psqj20ha052dgj.jpg)

#### svg字体压缩效果
![](http://ww1.sinaimg.cn/large/65e4f1e6jw1f83m912wyej20h104z3z8.jpg)

#### woff字体压缩效果
![](http://ww4.sinaimg.cn/large/65e4f1e6jw1f83m99fa14j20hg059aat.jpg)

#### eot字体压缩效果
![](http://ww3.sinaimg.cn/large/65e4f1e6jw1f83m9eqlw3j20h9057wf7.jpg)

可以看到对 woff 和 eot 进行 gzip 压缩效果不好。

### 字体总结

|扩展名 |  是否压缩  | Content-type |
|:---:|:---:|:---|
|.eot    |否   |application/vnd.ms-fontobject|
|.ttf    |是   |font/ttf|
|.otf    |是   |font/opentype|
|.woff   |否   |font/x-woff|
|.svg    |是   |image/svg+xml|
