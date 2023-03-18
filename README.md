# 校园活动项目

##项目环境
node.js(16.14.0) npm(8.3.1) mysql(5.7.26) vue(3.2) @vue/cli(5.0.8)

## 在文件夹中运行 注意：也需要在server目录下运行
```
npm install
```

## server 目录及是服务器目录
运行方式
进入server目录运行:
```
npm run start
```

### 项目运行
```
npm run serve
```

### 项目打包
```
npm run build
```
### 目录结构

```
src---
    ---common  //公共视图
    ---components  //私有组件
        --- common //公共组件
        --- my  //对应我的页面组件
        ....
        style.css   //公共样式
    ---request   //axios请求
       --- api   //一些组件的api
       --- my    //对应我的页面内的api
       ....
       index.js   // axios根文件
     ---router    // 路由
     ---store     //vuex
     ---views     //页面视图
     ---app.vue
     ---main.vue
```
### 项目相关
## 该项目还有配套的后台管理系统 项目地址:  https://github.com/bfzg/vite-vue3.2-js-node-mysql-


```
时空胶囊
    这个项目到此也算初步结束了 翻看早以前写的代码，自己都觉得看不下去，许多地方完全就是“绕大弯”，但谁不是一路磕磕绊绊？。
    回想一路走来从最开始 学习网络，再到后来 网络安全 等，再到后来确定 前端，从 简单的html，css再到JavaScript，当时认为 哎真简单。后来接触 ajax ，less，sass，node，npm，vue2，element，vant，vue3，axios，express，uniapp，webgl，unicloud，mysql，mongodb各种npm包,真是越发感觉自己的不足，还有基础的薄弱，真实感觉人外有人，天外有天。学习之路应保持谦虚，切勿骄傲。。。 回想一路走来的艰辛也只有自己知道，留言至此 4年后的自己留念，，，，，文章到此，人生继续。
```
