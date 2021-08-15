# 优雅的图片裁剪(buuug7-img-cropper)

[uniApp](https://github.com/dcloudio/uni-app)图片裁剪插件. 该插件基于[Cropper.js](https://github.com/fengyuanchen/cropperjs), 感谢 cropper.js 优秀又强大的功能, 让裁剪图片变得容易, 本人使用 webview 的方式集成 cropper.js 跟 uniApp 进行数据交互, 可以满足图片裁剪的基本需求.

- 支持裁剪预览
- 支持设置长宽比
- 支持设置裁剪大小
- 支持放大缩小
- 导出支持 base64(dataUrl) 以及 blob 格式导出

> 我们都知道 uniApp 中是无法操作 DOM, 而好多基于 DOM 的优秀库是无法在 uniApp 中使用, 如果要移植代价高昂(有些根本移植不了), 使用 webview 的方式去整合不妨是一种快捷的途径.

## 支持

- App 5+
- h5

## 安装

推荐从[dcloud 插件市场](https://ext.dcloud.net.cn/plugin?id=5907) 安装插件

## 用法

在 `pages.json` 新增`uni_modules/buuug7-img-cropper/pages/cropper`页面配置

```json
{
  "pages": [
    // 在你的pages.json中增加该地址
    {
      "path": "uni_modules/buuug7-img-cropper/pages/cropper",
      "style": {
        "navigationBarTitleText": "图片裁剪"
      }
    }
  ]
}
```

在 template 中：

在模板中你可以绑定给任何事件, 比如通过点击按钮来选择上传并裁剪图片

```vue
<button type="default" plain="true" @click="chooseImg">
  choose image
</button>
```

在 javascript 中：

```javascript
export default {
  data() {
    return {
      // 储存最后裁剪的数据 base64
      imgDataUrl: "",
    };
  },

  methods: {
    chooseImg() {
      const that = this;
      uni.navigateTo({
        url: "../../uni_modules/buuug7-img-cropper/pages/cropper",
        events: {
          imgCropped(event) {
            // 监听裁剪完成
            // 返回的 event 中包含了已经裁剪好图片的base64编码字符串
            // 你可以使用 <image :src="imgDataUrl" mode="aspectFit"></image> 组件来展示裁剪后的图片
            // 或者你可以将该字符串通过接口上传给服务器用来保存
            console.log(event);
            that.imgDataUrl = event.data;
            // do whatever you want
            // upload to server
          },
        },
      });
    },
  },
};
```

## 属性说明

在 `uni_modules\buuug7-img-cropper\hybrid\html\cropper\index.html` 文件中, 你可以配置所有与 cropper.js 相关的是属性, 下面是一些最常用的属性

````javascript
// some common config
const aspectRatio = 1 / 16;
const autoCropAre = 0.5;
const croppedWidth = 200;
const croppedHeight = croppedWidth * aspectRatio;```
````

## TODO

- 通过给 webview 传参来控制 cropper.js 更多行为
