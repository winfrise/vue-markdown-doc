
**问题一：**
>[webpack-dev-server] Content not from webpack is served from 'xxx' directory**

原因:  contentBase 和 publicPath 两个参数比较重要，设置错了的话会导致文件404

(1) contentBase

> Content not from webpack is served from

也就是指定静态服务器的根目录，可以访问到不通过webpack处理的文件。

(2) publicPath

> webpack output is served from

对于webpack打包的文件：虽然我们指定了打包输出目录dist，但是实际上并不会生成dist，而是打包后直接传给devserver，然后放到内存中。不过可以通过：http://localhost:3000/webpack-dev-server查看打包目录下的文件。

publicPath是告诉浏览器通过什么路径去访问上面的webpack打包目录。

另一个容易导致文件404的是：把publicPath设置为打包目录/dist。这样的话，就需要多加一层：

总结: 

- devserver.contentBase 是 webpack4的配置,  webppack5 使用 devserver.static 替换了


参考：

1. webpack4实用配置指南-上手篇 https://cloud.tencent.com/developer/article/1148463
2. dev-server#publicpath https://webpack.docschina.org/configuration/dev-server#publicpath

**问题二：**

options has an unknown property 'contentBase'. These properties are valid:

webpack5 使用  devserver.static 替换 devServer.contentBase

**问题三：**

> vue.runtime.esm.js:619 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

原因是，使用 template属性，需要引入带编译器的完整版的vue.esm.js

解决方法：

方法一: 修改 src/main.js

```js
new Vue({
 el: '#app',
 router,
 // components: { App },  // 去掉
 // template: '<App/>',   // 去掉
 render: h => h(App)      // 增加
})
```

方法二:  修改 webpack配置

```js
module.export = {
    // ...
    resolve: {
        alias: {
            // ... 
            '@': 'vue/dist/vue.es.js'
            // ...
        }
    }
    // ...
}
```




## webpack5 与 webpack4 的区别


#### 出口(output)

使用 clean 替代 clearn-webpack-plugin

```
module.exports = {
  output: {
    path:path.resolve(__dirname,'../dist'),
    filename: '[name].bundle.js',
    clean:true //每次构建清除dist包
  },
}
```

#### devServer 

废弃了 contentBase，  新增 static

```
module.exports =  {
  ...
  devServer: {
    hot: true, //热更新
    open: true, //编译完自动打开浏览器
    compress: true,//开启gzip压缩
    port: 8088, //开启端口号
    static: { //托管静态资源文件
      directory: path.join(__dirname, "../public"),
    },
    client: { //在浏览器端打印编译进度
      progress: true,
    },
  },
  ...
})
```


## 总结

- 比较难理解的是配置资源文件的路径,比如： devser.static

