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
#目录结构

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
