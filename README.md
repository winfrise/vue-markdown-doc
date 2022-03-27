# Vue Markdown Doc

包含 VueMarkdownDoc 组件 和 VueMarkdownDocLoader

#### 使用

一、在项目入口引入组件

```
import VueMarkdownDoc from 'vue-markdown-doc'
Vue.use(VueMarkdownDoc)
```

二、添加webpack配置

```
// 引入 loader
const vueMarkdownDocLoader = require('vue-markdown-doc/src/loader')

// 配置 webpack 规则
rules: [
    // ...
    {
        test: /\.md$/,
        use: ['vue-loader', vueMarkdownDocLoader)]
    }
    // ...
]
```

#### 原理
**markdown-it**

使用方法:  ```md.render(source)```
原理：

1. source -> tokens, 把代码转为 token 流
2. 将 tokens 作为参数调用指定的 render 函数，也就是 ```md.renderer.rules[token类型，比如fence]```
3. 把最后的结果返回

MarkdownIt.use只是一个语法糖，和调用 plugin(md, params) 等效,但只适合对AST简单的操作

**markong-it-container**

原理: 使用 md.block.ruler.before 对 fence 类型的 tokens 进行处理，并自定义render函数。

**markdown-it-for-inline**

内联标记迭代器

源码不到30行，其实就是遍历所有的 tokens, 首先查找类型为 inline 的token, 然后再inline token 的 child token 中醒找指定类型的 token, 最后执行回调函数

官网也提示，使用 markdown-it-for-inline 开发插件性能不是最后的。
其实我们可以通过重写指定的 ruler 来实现

#### TODO

代码的耦合性有点高，考虑一下把功能拆开。


参考文档:

1. [抽象语法树在线预览](https://markdown-it.github.io)

2. [markdown-it 设计准则](https://markdown-it.docschina.org/architecture.html)