## UploadImgList

### __简单描述__ 

上传多图/多文件功能（组件支持预览大图，如果是pdf会在新的页面展示）

### 1：props

| 字段名      | 接受类型 | 默认值 | 用处 | 备注 |
| :-----------: | :--------: | :----: | :------: | :------: |
| acceptType | String | image/* |  上传接受的类型 | 
| imgList | Array | [] |  图片列表 | 为了反显图片而做的区分 |
| notUploadImg | Boolean | false |  置灰不可以上传 |
| limitCount | Number | 9 |  控制上传限制的张数 |
| limitSize | Number | 10 |  限制上传文件的大小 |
| showObjectType| Boolean | false|  展示的数组类型 | 为了区分保存是否是有带title还是没有 |

### 2：$emit

| 事件名 | 传出的值 | 用处 | 备注 |
| :------: | :--------: | :------------------: | :----: |
| update-img-list |  this.fileImgList | 更新对应使用组件定义的事件，把值赋上去 |   一定要写   |

### 3：config.js

#### __简单描述__  

__typeUrl:__ 是为了上传不同类型的文件，而反显的icon配置