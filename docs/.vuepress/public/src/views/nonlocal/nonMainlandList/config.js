import { FormItemTypes } from '@/maps/enum'

export const approvalTypes = {
  待审核: 'INIT',
  审核驳回: 'DISAGREE',
  审核通过: 'AGREE'
}

export const sourceMap = {
  B端: 'WEB',
  C端: 'CLIENT'
}

export const dataSourcesOptions = [
  { label: 'B端', value: 'WEB' },
  { label: 'C端', value: 'CLIENT' }
]

export const certTypes = {
  护照: 'CRED_PSN_PASSPORT',
  香港来往大陆通行证: 'CRED_PSN_CH_HONGKONG',
  香港居民居住证: 'CERT_RESIDENCE_HONGKONG',
  澳门来往大陆通行证: 'CRED_PSN_CH_MACAO',
  澳门居民居住证: 'CERT_RESIDENCE_MACAO',
  台湾来往大陆通行证: 'CRED_PSN_CH_TWCARD',
  台湾居民居住证: 'CERT_RESIDENCE_TAIWAN',
  外国人永久居留证: 'CRED_PSN_CH_GREEN_CARD',
  外国人工作许可证: 'CRED_FOREIGNERS_WORK',
  外籍证件: 'CRED_PSN_FOREIGN'
}

export const certTypeOptions = [
  {
    label: '护照',
    value: certTypes['护照']
  },
  {
    label: '香港来往大陆通行证',
    value: certTypes['香港来往大陆通行证']
  },
  {
    label: '香港居民居住证',
    value: certTypes['香港居民居住证']
  },
  {
    label: '澳门来往大陆通行证',
    value: certTypes['澳门来往大陆通行证']
  },
  {
    label: '澳门居民居住证',
    value: certTypes['澳门居民居住证']
  },
  {
    label: '台湾来往大陆通行证',
    value: certTypes['台湾来往大陆通行证']
  },
  {
    label: '台湾居民居住证',
    value: certTypes['台湾居民居住证']
  },
  {
    label: '外国人永久居留证',
    value: certTypes['外国人永久居留证']
  },
  {
    label: '外国人工作许可证',
    value: certTypes['外国人工作许可证']
  },
  {
    label: '外籍证件',
    value: certTypes['外籍证件']
  }
]

// CRED_PSN_PASSPORT("护照"),
//     CRED_PSN_CH_HONGKONG("香港居民往来内地通行证"),
//     CERT_RESIDENCE_HONGKONG("香港居民居住证"),
//     CRED_PSN_CH_MACAO("澳门居民往来内地通行证"),
//     CERT_RESIDENCE_MACAO("澳门居民居住证"),
//     CRED_PSN_CH_TWCARD("台湾居民往来大陆通行证"),
//     CERT_RESIDENCE_TAIWAN("台湾居民居住证"),
//     CRED_PSN_CH_GREEN_CARD("外国人永久居留身份证"),
//     CRED_FOREIGNERS_WORK("外国人工作许可证"),
//     CRED_PSN_FOREIGN("外籍证件");

export const nonMainlandListSearchItems = [
  {
    label: '姓名',
    key: 'realName',
    type: FormItemTypes.Input,
    placeholder: '请输入姓名'
  },
  {
    label: '证件号码',
    key: 'certNo',
    type: FormItemTypes.Input,
    placeholder: '请输入证件号码'
  },
  {
    label: '审核状态',
    key: 'auditStatus',
    type: FormItemTypes.Select,
    placeholder: '全部',
    option: [
      {
        label: '待审核',
        value: approvalTypes['待审核']
      },
      {
        label: '审核驳回',
        value: approvalTypes['审核驳回']
      },
      {
        label: '审核通过',
        value: approvalTypes['审核通过']
      }
    ]
  },
  {
    label: '数据来源',
    key: 'channelSource',
    type: FormItemTypes.Select,
    placeholder: '全部',
    option: dataSourcesOptions
  }
]

// 列表表头
export function getNonMainlandListTableCols(_this) {
  return [
    {
      type: 'index',
      width: 100
    },
    {
      label: '姓名',
      prop: 'realName',
      minWidth: 200
    },
    {
      label: '证件类型',
      prop: 'certType',
      minWidth: 200,
      callback: row => {
        return row.certType && row.certType.label
      }
    },
    {
      label: '证件号码',
      prop: 'certNo',
      minWidth: 200
    },
    {
      label: '国家/地区',
      prop: 'nationality',
      minWidth: 200
    },
    {
      label: '性别',
      prop: 'gender',
      callback: row => {
        return row.gender && row.gender.label
      }
    },
    {
      label: '出生日期',
      prop: 'birthday',
      minWidth: 200
    },
    {
      label: '数据来源',
      prop: 'source',
      minWidth: 120,
      callback: row => {
        return row.source && row.source.label
      }
    },
    {
      label: '提交时间',
      prop: 'createTime',
      minWidth: 200
    },
    {
      label: '审核时间',
      prop: 'auditDate',
      minWidth: 200
    },
    {
      label: '审核状态',
      prop: 'auditStatus',
      minWidth: 120,
      callback: row => {
        return row.auditStatus && row.auditStatus.label
      }
    },
    {
      label: '备注',
      prop: 'auditReason',
      minWidth: 200
    },
    {
      label: '操作',
      type: 'action',
      width: 160,
      config: row => {
        const config = [
          {
            label: '查看',
            permission: _this.checkPermission('nonMainlandList-detail'),
            fn: row => {
              _this.initDetailData(row.id)
            }
          }
        ]
        if (row.auditStatus.value !== approvalTypes['审核通过'] && row.source.value !== sourceMap['C端']) {
          config.push({
            label: '更改',
            permission: _this.checkPermission('nonMainlandList-change'),
            fn: row => {
              _this.handleUpdate(row.id)
            }
          })
        }
        return config
      }
    }
  ]
}
