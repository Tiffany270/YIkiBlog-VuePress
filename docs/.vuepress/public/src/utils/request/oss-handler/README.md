# OSS临时链接申请流程

1. 把所有的Oss资源字段找出来（findOssValues）

2. 把每个Oss资源循环，发送请求给后端，申请临时资源

3. 替换Oss资源字段为临时链接（setOssValue）

----

希望是架构组在存储时，能带上fs://的标头