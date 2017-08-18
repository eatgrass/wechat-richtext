# wechat-richtext

Web HTML转微信小程序`<rich-text>`组件数据

### 使用

```
npm install wechat-richtext --save
```

```javascript
const wrapperHTML = document.querySelector('.wrapper'); //包含富文本内容的HTML节点

const parser = WechatRichText({
  'useClass': false,  // 是否包含class属性
  'style': {
    'span': 'font-size:14px' // 自定义内联样式
  }
});

const result = parser.parse(wrapperHTML);
 
```

### 场景

CMS端可以灵活使用你熟悉的富文本编辑器编辑好内容后，使用`wechat-richtext`获取json格式数据，小程序端就可以使用自带的`<rich-text>`组件对富文本数据进行渲染了。

优点：

1. 使用微信小程序自带控件，速度更快，更加稳定可靠
2. 网络传输json比html文本更加小巧
3. 小程序不再依赖第三方富文本模板库，体积更小，结构更加自然
