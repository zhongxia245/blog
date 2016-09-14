## Chrome远程调试Android上的多点触控操作
>时间：2016-09-14 09:41:53   
>作者：zhongxia     
>背景：需要在页面上实现多点触控，但是在PC端上的Chrome上，模拟设备，目前没有找到实现多点触控的方法。因此只能找一下是否有远程调试真机页面的功能。 这里就整理以下，如何使用用Chrome远程调试真机访问的页面


## 需求
要开始远程调试，你需要：

- 安装 Chrome 32 或者之后的版本。
- 连接安卓设备用的 USB 线缆。
- 对于通过浏览器调试：安卓 4.0 以上并且安装了 Chrome for Android。
- 对于通过应用调试：安卓 4.4 以上并且应用包括可用于调试的 WenView 组件。
- 提示：远程调试需要你电脑端的 Chrome 版本要高于安卓端的版本。想更好地使用此功能，请使用电脑端的 Chrome Canary （Mac/Windows） 或者 Dev channel 发行版（Linux）。

>说白了，android机子一部（微信不行），PC端chrome浏览器，USB线

## 设置安卓设备
请按照以下说明来设置安卓设备：

### 1. 打开 USB 调试选项
不同的手机，打开开发者模式的方式不一样。
这边以小米手机为例，默认情况下，开发者模式是隐藏的。
- 打开设置-》关于手机-》MIUI版本-》点击五六次，提示出现开发者模式
- 设置-》更多设置-》开发者模式--》开启USB调试

### 2. 连接你的设备

将你的安卓设备和电脑用 USB 线连接起来。

>注意：如果你在 Windows 下进行开发，那么你需要为你的安卓设备安装驱动。具体可以参考安卓开发者网站上的 [OEM USB Drivers](http://developer.android.com/tools/extras/oem-usb.html)

在 Chrome 中找到设备
在安卓设备上设置好远程调试后，在 Chrome 中找到你的设备。

在电脑端的 Chrome 里，在地址栏输入 `chrome://inspect`。进入后确认 `Discover USB devices` 已经勾选了：

![](http://ww2.sinaimg.cn/large/72f96cbajw1f7sx3eapaij20o3072gmj.jpg)

>提示：你也可以从 Chrome menu > More tools > Inspect Devices 来进入 chrome://inspect
在你的设备上，会跳出一个警告，告诉你是否要允许在电脑端进行 USB 调试。选择 OK。

>注意：在远程调试时， Chrome 会阻止你的设备进入休眠状态。该特性对于调试相当有用，但在安全性上有所欠缺。所以在调试的时候要注意看好你的手机！

在电脑端，打开选项卡并启用 WebViews 调试后，chrome://inspect 页面会显示全部已连接的设备。

![](http://ww3.sinaimg.cn/large/72f96cbajw1f7sx6umu1qj20l30bsmym.jpg)

从 chrome://inspect 也卖弄查看已连接的设备

如果从 chrome://inspect 页面查找设备时遇到了问题，请参考 [Troubleshooting](https://developer.chrome.com/devtools/docs/remote-debugging#troubleshooting) 章节。


#### 调试远程浏览器
在页面 chrome://inspect 上，你可以加载 DevTools 并且调试你的远程浏览器。

要开始调试，请点击你希望调试的浏览器选项卡下面的 inspect。

![](http://ww3.sinaimg.cn/large/72f96cbajw1f7sx85v1glj20oc08rq4k.jpg)

接着你的电脑会加载新的 DevTools。在新的 DevTools 上，你可以在你的安卓设备上和选中的浏览器实时交互。
![](http://ww3.sinaimg.cn/large/72f96cbajw1f7sx8ylw97j20vx0ju76t.jpg)
>左边是手机上页面的实时情况，右边是Chrome开发工具，调试按照PC端怎么调试就怎么来。

>注意：你设备的 Chrome 版本将会决定远程调试中 DevTools 的版本。由于这个原因，你在远程调试时使用的 DevTools 可能和你平常使用的不大一样。

##### 调试提示
下面是使用远程调试功能的一些提示：

- 按 F5（或者在Mac上 Cmd + r）来重新加载远程页面。
- 让设备的网络处于打开状态。使用 Network 面板来查看实际移动设备的网络流状态。
- 使用 Timeline 面板来分析提交数据和 CPU使用状态。在移动设备上运行的程序通常会比在开发机器上运行的要慢一些。
- 如果你是在本地的 web 服务器上运行的，使用端口转发或者虚拟主机映射 技术来让设备访问你的站点。

## 参考文章
1. [《在安卓设备上使用 Chrome 远程调试功能》](http://wiki.jikexueyuan.com/project/chrome-devtools/remote-debugging-on-android.html)    