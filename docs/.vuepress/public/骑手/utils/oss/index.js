import { OssFileTypeEnum } from '@/static/enums/OssUploadEnum'
import { findOssSignatureInfo, updateUploadOssFile } from '@/api/oss'
import { transRequestData } from '@/utils/format'
import { buildRenewableTempUrl } from './utils/build-renewable-temp-url'
import { getExtNameFromUrl } from './utils/get-ext-name-from-url'
import { getUploadFileName } from './utils/get-upload-file-name'
import { getInternalUrlFromTempUrl } from './utils/get-internal-url-from-temp-url'
import { getOssTempAccessUrl } from './utils/get-oss-temp-access-url'
import { downloadFileFromOss } from './utils/download-file-from-oss'
/**
 * 文件上传
 * @param {File} file 文件对象
 * @param {OSSFileTypeEnum|string} ossFileType OSS文件类型 - 对应enums/OSSFileType.js里的枚举
 * @return {Promise<string>}
 */
const ossUploader = async (file, ossFileType) => {
  // 参数校验
  if (!(file instanceof File)) throw new TypeError('请传入正确的文件')
  if (!Object.values(OssFileTypeEnum).includes(ossFileType)) {
    throw new TypeError(
      `OSSFileTypeEnum中不存在此枚举值: ${ossFileType}, 请检查自身代码，或询问后端进行补充`
    )
  }
  // 获取签名信息
  const { data: result } = await findOssSignatureInfo({
    fileType: ossFileType,
    fileName: file.name
  })
  // 使用直接构建形式
  const form = {
    key: result.fullFileName,
    policy: result.policy,
    OSSAccessKeyId: result.accessKeyId,
    success_action_status: '200',
    callback: result.callbackBody,
    signature: result.signature,
    'x-oss-object-acl': result.objectAcl,
    name: file.name,
    file
  }
  const data = transRequestData(form)
  // 上传文件
  const { data: res } = await updateUploadOssFile(result.host, data)
  return buildRenewableTempUrl(res.url, file.name, res.internalUrl)
}
const getInternalUrl = async (file, ossFileType) => {
  // 参数校验
  if (!(file instanceof File)) throw new TypeError('请传入正确的文件')
  if (!Object.values(OssFileTypeEnum).includes(ossFileType)) {
    throw new TypeError(
      `OSSFileTypeEnum中不存在此枚举值: ${ossFileType}, 请检查自身代码，或询问后端进行补充`
    )
  }
  // 获取签名信息
  const { data: result } = await findOssSignatureInfo({
    fileType: ossFileType,
    fileName: file.name
  })
  // 使用直接构建形式
  const form = {
    key: result.fullFileName,
    policy: result.policy,
    OSSAccessKeyId: result.accessKeyId,
    success_action_status: '200',
    callback: result.callbackBody,
    signature: result.signature,
    'x-oss-object-acl': result.objectAcl,
    name: file.name,
    file
  }
  const data = transRequestData(form)
  // 上传文件
  const { data: res } = await updateUploadOssFile(result.host, data)
  return res.internalUrl
}
export {
  // 文件上传
  ossUploader,
  // 构建拼接临时url
  buildRenewableTempUrl,
  // 获取文件后缀名
  getExtNameFromUrl,
  // 获取oss文件名字
  getUploadFileName,
  // 根据临时文件地址获取文件永久地址internalUrl
  getInternalUrlFromTempUrl,
  // 获取最新的url
  getOssTempAccessUrl,
  // 从oss下载文件
  downloadFileFromOss,
  getInternalUrl //yiki
}
