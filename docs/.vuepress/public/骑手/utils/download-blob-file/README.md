# downloadBlobFile

>
> 处理后端返回的文件流, 完成下载操作
>

## 入参

|字段名|类型|是否必填|说明|
|:----|:----|:----|:----|
|axiosResponse|object|是|Axios的请求返回，直接把返回值输入即可|
|options|object|否|可选参数|
|options.fileName|string|否|文件重命名 (请勿带上后缀名)|
|options.mimeType|string|否|文件的MIME类型 (当下载的文件不带后缀名时才会生效)|

## 响应

当响应成功时，会激活浏览器自带的下载窗口

## 例子

```javascript
import request from '@/utils/request'
import { downloadBlobFile } from '@/utils/download-blob-file'

request({
  url: '/some/download/link',
  method: 'get',
  responseType: 'arraybuffer'
}).then(response => {
  downloadBlobFile(response)
})
```