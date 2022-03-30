import { FormItemTypes } from '@/maps/enum'
import { staticRules } from '@/utils/validate'
// import { getUploadFileName } from '@/utils/oss-uploader/utilities/get-upload-file-name'
// import { downloadFileFromOss } from '@/utils/oss-uploader/utilities/download-file-from-oss'
// 工商设立状态
const BusinessStatus = [
  { label: '待完善资料', value: 'WAIT_IMPROVE' },
  { label: '资料待审核', value: 'WAIT_VERIFY' },
  { label: '资料审核不通过', value: 'NO_PASS' },
  { label: '待设立', value: 'WAIT_ESTABLISH' },
  { label: '设立中', value: 'IN_ESTABLISH' },
  { label: '待注销', value: 'WAIT_CANCEL' },
  { label: '注销中', value: 'IN_CANCEL' },
  { label: '已注销', value: 'CANCEL' },
  { label: '设立成功', value: 'SUCCESS' }
]
// 税务登记状态
const taxRegisteredStatus = [
  { label: '待登记', value: 'WAIT_REGISTER' },
  { label: '已登记', value: 'SUCCESS_REGISTER' },
  { label: '待清税', value: 'WAIT_TAX_CLEARANCE' },
  { label: '已清税', value: 'SUCCESS_TAX_CLEARANCE' }
]

// 工作室管理查询表单
export const studioSearchItems = [
  {
    label: '工作室名称',
    key: 'studioName',
    type: FormItemTypes.Input,
    placeholder: '请输入工作室名称'
  },
  {
    label: '法人姓名',
    key: 'name',
    type: FormItemTypes.Input,
    placeholder: '请输入法人姓名'
  },
  {
    label: '法人身份证号',
    key: 'idcardNo',
    type: FormItemTypes.Input,
    placeholder: '请输入法人身份证号码'
  },
  {
    label: '法人手机号',
    key: 'phone',
    type: FormItemTypes.Input,
    placeholder: '请输入法人手机号'
  },
  {
    label: '导入时间',
    key: 'importStartTime&importEndTime',
    type: FormItemTypes.Cascader,
    placeholder: '请选择导入时间'
  },
  {
    label: '工商设立状态',
    key: 'BusinessStatus',
    type: FormItemTypes.Select,
    placeholder: '请选择工商设立状态',
    option: BusinessStatus
  },
  {
    label: '税务登记状态',
    key: 'studioStatus',
    type: FormItemTypes.Select,
    placeholder: '请选择税务登记状态',
    option: taxRegisteredStatus
  },

  {
    label: '统一社会信用代码',
    key: 'creditCode',
    type: FormItemTypes.Input,
    placeholder: '请输入统一社会信用代码'
  },
  {
    label: '工商登记日期',
    key: 'icRegistrationStartDate&icRegistrationEndDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择工商登记日期'
  }
]
// 工作室管理表格字段
export function getStudioTableCols(_this) {
  return [
    {
      type: 'index',
      width: 100
    },
    {
      label: '工作室名称',
      prop: 'studioName',
      minWidth: 200
    },
    {
      label: '导入时间',
      prop: 'importTime',
      minWidth: 200
    },
    {
      label: '园区',
      prop: 'park',
      minWidth: 200
    },
    {
      label: '行业',
      prop: 'industry',
      minWidth: 200
    },
    {
      label: '法人姓名',
      prop: 'name',
      minWidth: 200
    },
    {
      label: '法人身份证号',
      prop: 'idcardNo',
      minWidth: 200
    },
    {
      label: '法人手机',
      prop: 'phone',
      minWidth: 200
    },
    {
      label: '统一社会信用代码',
      prop: 'creditCode',
      minWidth: 200
    },
    {
      label: '工商登记日期',
      prop: 'icRegistrationDate',
      minWidth: 200
    },
    {
      label: '税务登记状态',
      prop: 'studioStatus',
      minWidth: 120,
      callback: row => {
        return row.studioStatus && row.studioStatus.label
      }
    },
    {
      label: '工商设立状态',
      prop: 'businessStatus',
      minWidth: 120,
      callback: row => {
        return row.studioStatus && row.businessStatus.label
      }
    },
    {
      label: '操作',
      type: 'action',
      width: 160,
      config: row => {
        const config = [
          {
            label: '详情',
            permission: _this.checkPermission('studioManage-detail'),
            fn: row => {
              _this.initDetailData(row)
            }
          }
        ]
        if (
          row.businessStatus &&
          (row.businessStatus.value === 'WAIT_IMPROVE' || row.businessStatus.value === 'NO_PASS')
        ) {
          config.push({
            label: '发送短信',
            permission: _this.checkPermission('studioManage-sendMessage'),
            fn: row => {
              _this.sendSms(row)
            }
          })
        }
        return config
      }
    }
  ]
}
// 工作室详情基本信息
export const studioDetailBaseFileds = [
  { label: '姓名', key: 'name' },
  { label: '政治面貌', key: 'managerPlitical' },
  { label: '手机号', key: 'phone' },
  { label: '文化程度', key: 'managerEducational' },
  { label: '身份证号', key: 'idcardNo' },
  { label: '园区', key: 'park' },
  { label: '性别', key: 'managerSex' },
  { label: '行业', key: 'industry' },
  { label: '民族', key: 'managerNation' },
  { label: '邮箱', key: 'managerEmail' },
  { label: '身份证地址', key: 'managerAddress' }
]
// 工作室详情工商税务信息
export const studioDetailTaxFileds = [
  { label: '企业类型', key: 'businessType' },
  { label: '工作室名称', key: 'studioName' },
  { label: '统一社会信用代码', key: 'creditCode' },
  { label: '工商登记日期', key: 'icRegistrationDate' },
  { label: '税务登记日期', key: 'taxRegistrationDate' },
  // { label: '注销日期', key: 'cancelDate' },
  { label: '经营场所', key: 'workplace' },
  { label: '经营范围', key: 'businessScope' }
]
// 工作室详情-工作室附件
// export function getStudioDetailFilesTableCols() {
//   return [
//     {
//       type: 'index',
//       width: 60
//     },
//     {
//       label: '附件名称',
//       prop: 'name',
//       minWidth: 100,
//       callback: row => {
//         let fileName = ''
//         if (row.name) {
//           fileName = row.name
//         } else {
//           fileName = getUploadFileName(row.url)
//         }
//         return fileName
//       }
//     },
//     {
//       label: '附件',
//       prop: 'url',
//       minWidth: 100,
//       slot: 'file'
//     },
//     {
//       label: '操作',
//       type: 'action',
//       width: 80,
//       config: row => {
//         let fileName = ''
//         if (row.name) {
//           fileName = row.name
//         } else {
//           fileName = getUploadFileName(row.url)
//         }
//         const config = [
//           {
//             label: '下载',
//             fn: row => {
//               downloadFileFromOss(row.url, fileName)
//             }
//           }
//         ]
//         return config
//       }
//     }
//   ]
// }
// 新增工作室表单字段
export const studioForm = {
  phone: '',
  studioName: '',
  industry: '',
  businessScope: '',
  workplace: ''
}
// 新增工作室字段检验
export const studioFormRules = {
  phone: [staticRules('手机号码').required, staticRules('手机号码').mobile],
  studioName: [staticRules('工作室名称').required, staticRules('工作室名称').stringMinMax(0, 50)],
  industry: [staticRules('行业').required, staticRules('行业').stringMinMax(0, 30)],
  businessScope: [staticRules('经营范围').required]
  // workplace: [staticRules('经营场所').required]
}
// 导入失败数据
export const failStudioColumns = [
  {
    type: 'index',
    width: 60
  },
  {
    label: '手机号',
    prop: 'phone',
    minWidth: 150
  },
  {
    label: '工作室名称',
    prop: 'studioName',
    minWidth: 150
  },
  {
    label: '行业',
    prop: 'industry',
    minWidth: 150
  },
  {
    label: '经营范围',
    prop: 'businessScope',
    minWidth: 180
  },
  {
    label: '经营场所',
    prop: 'workplace',
    minWidth: 200
  },
  {
    label: '失败原因',
    prop: 'failReason',
    minWidth: 200,
    callback: row => {
      return `<span style="color:#CC3333">${row.failReason}</span>`
    }
  }
]

export const successStudioColumns = [
  {
    type: 'index',
    width: 60
  },
  {
    label: '手机号',
    prop: 'phone',
    minWidth: 150
  },
  {
    label: '工作室名称',
    prop: 'studioName',
    minWidth: 150
  },
  {
    label: '行业',
    prop: 'industry',
    minWidth: 150
  },
  {
    label: '经营范围',
    prop: 'businessScope',
    minWidth: 180
  },
  {
    label: '经营场所',
    prop: 'workplace',
    minWidth: 200
  }
]
// 工作室税务登记状态枚举
export const STUDIO_STATUS = {
  待登记: 'WAIT_REGISTER',
  已登记: 'SUCCESS_REGISTER',
  待清税: 'WAIT_TAX_CLEARANCE'
}
// 工作室工商登记状态枚举
export const BUSINESS_STATUS = {
  待完善资料: 'WAIT_IMPROVE',
  资料待审核: 'WAIT_VERIFY',
  资料审核不通过: 'NO_PASS',
  待设立: 'WAIT_ESTABLISH',
  设立中: 'IN_ESTABLISH',
  待注销: 'WAIT_CANCEL',
  注销中: 'IN_CANCEL',
  已注销: 'CANCEL',
  设立成功: 'SUCCESS'
}
