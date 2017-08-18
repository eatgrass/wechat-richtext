# wechat-richtext

HTML转微信小程序`<rich-text>`组件数据

```
npm install wechat-richtext --save
```

```
const wrapperHTML = document.querySelector('wrapper');

const parser = WechatRichText({
  'useClass': false,  // 是否包含class属性
  'style': {
    'span': 'font-size:14px' // 自定义内联样式
  }
});

const result = parser.parse(wrapperHTML);
 
```
