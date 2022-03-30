# DetailList组件

## props

| 字段名    | 接受类型  |  是否必填 | 默认值 | 用处  | 备注 |
| --------- | -------- | -------- | ------ | ------  | ---- |
| labelWidth| Number   | false    |  100   | label的宽度| ----|
| labelData | Array    | false    |  []    | label列表  | ----|
| data      | Object   | false    |  {}    | data数据   | ----|
| row       | Number   | false    |  3     | 一行显示列数| ----|

## 使用示例
```html
<template>
   <detail-list
      :row="3"
      :labelData="baseInfoLabelData"
      :data="projectDetailInfo"
    >
      <!-- 需要特殊处理的字段 -->
     <template v-slot:projectStatus="data">
       <span>{{data.projectStatus.label}}</span>
      </template>
    </detail-list>
</template>
<script>
import DetailList from '_c/DetailList'
export default {
  components: {
    DetailList
  },
  data() {
    return {
      baseInfoLabelData: [
        { label: '项目名称', key: 'projectName' },
        { label: '客户名称', key: 'clientName' },
        { label: '管理员姓名', key: 'accountName' },
        { label: '账号', key: 'accountNo' },
        { label: '邮箱账号', key: 'accountEmail' },
        { label: '项目状态', slot: 'projectStatus' },
        { abel: '发放金额', key: 'amount', type: 'money'}
      ],
      projectDetailInfo: {}
    }
  }
}
</script>
```