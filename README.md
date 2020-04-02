# mt-app

> My excellent Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## 介绍

纯粹是为了练习 nuxtjs 来实现服务端渲染，里面也有本地数据库以及线上测试地址

### 离线数据库

这里用到是 mongodb， 文件夹中有个 dbs.zip，里面就是就是一些数据，需要导入到数据库中
导入命令如下：

```
mongoimport -d dbs -c pois pois.dat
-d 表示数据库
-c 就是集合
```

### 线上测试

为了保证正版用户的权益，必须用签名才能使用我们线上数据，获取签名地址：http://cp-tools.cn/sign
这里需要个 uid 需要登录慕课网 点击自己的头像找到 id
