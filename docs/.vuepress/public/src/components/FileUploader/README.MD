# FileUploader组件

## props

| 字段名    | 接受类型  |  是否必填 | 默认值 | 用处  | 备注 |
| ----------| -------- | -------- | ------| ------| ---- |
| showType  | 'BUTTON', 'PREVIEW', 'PANEL' | |BUTTON  | 上传组件类型
| buttonTip | String  | | '导入' | 按钮类型时显示文字 | 上传类型为BUTTON时使用
| isOss | Boolean | | false | 是否使用oss上传 | 上传文件到oss时使用
| acceptType | String | | 'image/*' | 上传文件的类型 | 上传文件为图片和pdf时生效 |
| limitCount | Number | | 9 | 限制上传文件数量|  |
| limitSize | Number | | 10M | 上传文件的大小限制 |  |
| requestMethod | Function | | function(){} | 非oss时上传API方法 | 不适用oss时使用 |
| requestParams | Object | | {} | 非oss时上传参数 | 不适用oss时使用 |
| editList | Array | | [] | 类型为PREVIEW 且编辑时回显列表数据|  上传类型为PREVIEW时生效|
| hasReturn | Boolean | | false | 类型为PREVIEW时是否需要回传数据 | 需要返回上传数据且类型为PREVIEW生效 |
| ossFileType | String | | '' | oss上传时文件类型 | 使用oss上传时有效 |


## $emit


| 事件名               | 传出的值 | 用处                       | 备注          |
| --------------------| -------- | -------------------------- | ------------- |
| on-success          | 类型为PREVIEW时回传上传的数据  | 上传成功回调函数      |  |


# 使用示例
## 1、类型为BUTTON时
* 当前类型显示为按钮上传组件
```html
<template>
<file-uploader
    :showType="UploadTypesEnum.BUTTON"
    :requestMethod="uploadSignAgreement"
    @on-success="handleUploadSuccess"
  ></file-uploader>
</template>
<script>
import FileUploader from '_c/FileUploader/index'
import { UploadTypesEnum } from '@/maps/enums/UploadTypes'
export default {
  components: {
    FileUploader
  },
  data() {
    return {
      UploadTypesEnum
    }
  }
}
</script>
```
## 2、类型为PREVIEW时
* 当前显示为图片和pdf文件上传组件，支持单个和多个上传且支持预览和删除,同时支持oss和自定义接口上传
```html
<template>
<file-uploader
    :showType="UploadTypesEnum.PREVIEW"
    :limitCount="9"
    :limitSize="10"
    acceptType=".pdf"
    :hasReturn="true"
    :isOss="true"
    :editList="editFileList"
    :requestMethod="uploadSignAgreement"
    @on-success="handleUploadSuccess"
  ></file-uploader>
</template>
<script>
import { UploadTypesEnum } from '@/maps/enums/UploadTypes'
import FileUploader from '_c/FileUploader/index'
import { uploadSignAgreement } from '@/apis/xxx'
export default {
  components: {
    FileUploader
  },
  data() {
    return {
      UploadTypesEnum,
      editFileList: [],
      uploadSignAgreement
    }
  },
  methods: {
    handleUploadSuccess(data) {
      
    }
  }
}
</script>
```

## 3、类型为PANEL时
* 当前类型支持拖拽的EXCEL文件上传解析,需传入自定义请求方法
```html
<template>
  <file-uploader
    :showType="UploadTypesEnum.PANEL"
    :requestMethod="uploadStudios"
    @on-success="handleUploadSuccess"
  />
</template>
<script>
import FileUploader from '_c/FileUploader/index.vue'
import { UploadTypesEnum } from '@/maps/enums/UploadTypes'
import {  uploadStudios } from '@/apis/studio'
export default {
  components: {
    FileUploader
  },
  data() {
    return {
      uploadStudios,
       UploadTypesEnum
    }
  },
  methods: {
    handleUploadSuccess() {
      
    },
  }
}
</script>
```
