import { getOssAccessAuthInfo } from '@/apis/oss'
import { toFormData } from '@/utils/transformRequest'
import request from '@/utils/request'
import { buildRenewableTempUrl } from './utilities/build-renewable-temp-url'

/**
 * OSS上传方法
 * @param {File} file 文件对象
 * @param {OSSFileTypeEnum|string} ossFileType OSS文件类型 - 对应enums/OSSFileType.js里的枚举
 * @param options
 * @param {number} [options.projectId] 项目ID，区分用旧桶还是新桶 - 在安薪宝好像没啥用
 * @param {string} [options.suffix] 文件后缀名，可以主动修改文件后缀名
 * @returns {Promise<string>}
 */
export async function ossUploader(file, ossFileType, options = { projectId: undefined, suffix: undefined }) {
  // 参数校验
  if (!(file instanceof File)) throw new TypeError('请传入正确的文件')

  const { data: params } = await getOssAccessAuthInfo({
    fileType: ossFileType,
    fileName: file.name,
    projectId: options.projectId,
    suffix: options.suffix
  })
  // 使用直接构建形式
  const form = {
    key: params.fullFileName,
    policy: params.policy,
    OSSAccessKeyId: params.accessKeyId,
    success_action_status: '200',
    callback: params.callbackBody,
    signature: params.signature,
    'x-oss-object-acl': params.objectAcl,
    name: file.name,
    file
  }
  const data = toFormData(form)

  const { data: response } = await request({
    url: params.host,
    method: 'post',
    withCredentials: false,
    skipOssCheck: true,
    data
  })

  return buildRenewableTempUrl(response.url, file.name, response.fileId)
}

export async function ossUploader1(file, ossFileType, options = { projectId: undefined, suffix: undefined }) {
  // 参数校验
  if (!(file instanceof File)) throw new TypeError('请传入正确的文件')

  const { data: params } = await getOssAccessAuthInfo({
    fileType: ossFileType,
    fileName: file.name,
    projectId: options.projectId,
    suffix: options.suffix
  })
  // 使用直接构建形式
  const form = {
    key: params.fullFileName,
    policy: params.policy,
    OSSAccessKeyId: params.accessKeyId,
    success_action_status: '200',
    callback: params.callbackBody,
    signature: params.signature,
    'x-oss-object-acl': params.objectAcl,
    name: file.name,
    file
  }
  const data = toFormData(form)

  const { data: response } = await request({
    url: params.host,
    method: 'post',
    withCredentials: false,
    skipOssCheck: true,
    data
  })

  return { url: response.url, name: file.name, fileId: response.fileId }
}
