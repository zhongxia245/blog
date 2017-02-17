>时间：2017-02-17 11:38:24  
作者：zhongxia

## 一、背景
由于公司使用gitlab进行代码管理，而平时自己使用github来管理自己的代码。 
github 和 gitlab 都是使用 git来来进行管理。

每次提交密码的时候，都需要我们输入密码，这样的操作实在是太麻烦了， 因此我们需要设置 ssh ，避免每次输入密码。

但是呢，每个帐号生成的密钥位置喝名称都是相同的，这样后面的密钥就覆盖了前面的密钥。

### 0. 解决办法
就是生成两个名称不同的密钥，同时配置不同的密钥到不同的Host上面。这样就解决了密钥冲突的问题。


### 1. 生成密钥
```bash
# ssh可以使用默认的名称
ssh-keygen -t rsa -C "注册的gitlab邮箱"

# 查看公钥，添加到gitlab的ssh处
cat ~/.ssh/id_rsa.pub

# 同理生成 github的密钥(密钥名称不一样,比如 id_rsa_github)
# 右上角用户头像-->Setting->SSH and GPG keys --> New SSH key
cat cat ~/.ssh/id_rsa_github.pub
```

### 2. 添加配置
```bash
cd ~/.ssh/

touch config

# gitlab
Host gitlab
    HostName git.lcgc.work
    IdentityFile ~/.ssh/id_rsa
  
# github
Host github
    HostName github.com
    IdentityFile ~/.ssh/id_github_rsa

# -------------------
# 测试是否可用, gitlab 、 github 就是上面的 Host名称
ssh -T git@gitlab

ssh -T git@github

# 没有报错就是成功了
```


>Host 名称可以随便设置， HostName 就是 网站的地址


## 三、Github代码上传，如何在dashboard 显示出来
>github dashboard 只会显示 用户邮箱上传的代码才算数。但是我们分别使用 gitlab 和 github ，如果设置 同样的用户名， 就会有一个不起作用。

### 1. 解决方案：
```
# 设置全局 的 name 和 email
git config --global user.name "zhongxia"
git config --global user.email "zhongxia245@sina.com"

# 给特定的参数设置单独的 name 和 email
git config --local user.name "test"
git config --local user.email "test@test.com"

```

### 2. 问题
这样有一个比较麻烦的就是，如果新建一个仓库后，如果不想用全局的名称和邮箱，还需要单独在设置一次。麻烦。



## 二、参考文章
1. [《gitlab/github 多账户下设置 ssh keys》](https://segmentfault.com/a/1190000002994742)