# 文件上传
面到文件上传这块被虐了，怎么了用别人的轮子有错吗😭……
- 来深入学习一下 😭

## 基本
- xmlhttprequest
- post扔进form-data


## 大文件上传
- [大文件上传](https://zhuanlan.zhihu.com/p/344196767)
- [请你实现一个大文件上传和断点续传](https://zhuanlan.zhihu.com/p/104826733)
- `MD5秒传`
  - 上传的时候如果服务器有一样的东西，会直接给你地址，下载的是服务器上同一个文件，md5是根据文件内容来的，所以要改文件内容才会生成新的文件，这就不是秒传了
- `分片`
分数据块，对服务端上传的文件进行汇合
  - 初始化，给唯一标示
  - 按照策略发送
  - 服务端返回状态码告诉你是否成功
- `断点续传`
  - 分部分，每个部分给一个线程上次或下载

## oss和oss的分片上传
- 本质是对象存储的服务器，不是文件服务器，大量删除和改文件的需求oss不是个好选择
## md5文件名 
- 用时间戳+md5生成文件名
  ``` js
  const generateFilename = filename => {
    const pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos !== -1) {
      suffix = filename.substring(pos)
    }
    let output = ''
    let timestamp = new Date().getTime()
    timestamp += Math.random().toString(36).substr(2, 6)
    timestamp += suffix
    output = md5(timestamp).substr(0, 20)
    if (suffix) {
      output += suffix
    }
    return {
      output,
      suffix
    }
  }
  ```
### oss的分片
- [文档见](https://help.aliyun.com/document_detail/111268.html?spm=a2c4g.11186623.2.10.581169fbotYMFC#concept-hgg-3vb-dhb)
- keyword是 multipartUpload
- 娘啊这不就是我写过的封装吗😭为什么没说出来……
``` js
export function uploadFile(file, fileName, options) {
  return new Promise((resolve, reject) => {
    let md5ifyName = ''
    try {
      // 生成md5之后的名字
      md5ifyName = generateFilename(fileName).output
    } catch (e) {
      reject(e)
    }

    if (file.size <= 100 * 1024 * 1024) {
      store.getters.client
        .put(md5ifyName, file)
        .then(res => {
          resolve(appendFileNameSearchParam(res.url, fileName))
        })
        .catch(err => {
          reject(err)
        })
    } else {
      // 大于100M的需要分片上传
      store.getters.client
        .multipartUpload(md5ifyName, file, options) // 上传走这里
        .then(response => {
          const urls = response.res.requestUrls
          const rawUrl = urls[0]
          resolve(appendFileNameSearchParam(rawUrl.split('?')[0], fileName))
        })
        .catch(err => {
          Message.error('上传失败，请重新再试')
          console.error('分片', err)
          reject(err)
        })
    }
  })
}
```

## webuploader
- 基本使用[webuploader 插件](http://fex.baidu.com/webuploader/getting-started.html)
  - 初始化引入，走cdn，wepack排除
  ``` js
  const uploader = webupload.create({
    swf: //文件路径
    server:// 接收端
    ...
  })
  --- 监听
  uploader.on('filequeued',()=>{
    <div>上传</div>
  })
  --- 进度
  uploader.on('unpladprogress,()=>{...})
  ```
- 让我来探究下源码



## util封装过关于文件的功能
- 获取文件流
``` js
function downloadFileStream(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(xhr.response)
      } else {
        reject(`文件${url}导出错误[HttpStatus:${xhr.status}]`)
      }
    }
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}
```
- 下载压缩包
  - jszip.js 可以将文件或者图片打包成一个Zip文件
  - 这里我是多个勾选请求然后promise.all下载blob文件
  - 然后用jszip打成一个包
``` js
export async function downloadZIP(source, fileName) {
  const zip = new JSZip()
  try {
    handleFileName(source) // 处理同名文件
    const result = await Promise.all(source.map(item => downloadFileStream(item.url)))
    result.forEach((blob, index) => {
      // 获取后缀名
      let fileUrlPath
      try {
        fileUrlPath = new URL(source[index].url).pathname
      } catch (e) {
        throw new Error(`第${index}条，无法正常解析URL: ${source[index].url}`)
      }
      const fileNameExtension = fileUrlPath.substring(fileUrlPath.lastIndexOf('.'))
      // 压缩文件
      zip.file(source[index].name + fileNameExtension, blob)
    })
  } catch (e) {
    throw e.toString()
  }
  // 生成zip文件
  const content = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.style.display = 'none'
  a.setAttribute('download', fileName)
  a.href = URL.createObjectURL(content)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
```
