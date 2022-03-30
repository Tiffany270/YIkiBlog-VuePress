# XBTable


## props

| 字段名      | 接受类型 | 是否必填 | 默认值 | 用处                                    | 备注 |
| ----------- | -------- | ---- | ------ | --------------------------------------- | ---- |
| hasHandle | Boolean | |true  | 是否展示操作栏
| hasPage | Boolean | | true | 是否显示分页
| title | String | |  | 是否添加表格title | 
| columns | Array | | [] | 表格列 |  |
| data | Array | | [] | 表格数据 |  |
| total | String,Number | | 0 | 总条数 |  |
| onRowKey | Function | | function(){} | row-key回调 |  |
| maxHeight | String,Number | | '' | 设置表格最大高度 |  |

## $emit

| 事件名               | 传出的值 | 用处                       | 备注          |
| --------------------| -------- | -------------------------- | ------------- |
| on-selection-change | 分页数据  | 全选回调函数        |  |
| on-page-change      |  分页数据 | 切换分页回调函数 |  |



## 配合TableBtns组件使用示例
## 1、数据配置
```javascript
export function getStudioTableCols(_this){ 
    return [
    // 全选
    {
        type: 'selection'
    },
    // 序号
    {
        type: 'index',
        width: 100
    },
    // 正常文字字段
    {
        label: '工作室名称',
        prop: 'studioName',
        minWidth: 200
    },
    // 需要转换字段
    {
      label: '税务登记状态',
      prop: 'studioStatus',
      minWidth: 120,
      callback: row => {
        return row.studioStatus && row.studioStatus.label
      }
    },
    // 需要在单元格使用其他组件
    {
        label: '扣减金额',
        prop: 'amount',
        minWidth: 200,
        slot: 'amountSlot'
    },
    // 操作栏
    {
      label: '操作',
      type: 'action',
      width: 160,
      config: row => {
        const config = [
          {
            label: '详情',
            fn: row => {
              _this.initDetailData(row)
            }
          }
        ]
        if (
          row.businessStatus &&
          (row.businessStatus.value === 'WAIT_IMPROVE' ||
            row.businessStatus.value === 'NO_PASS')
        ) {
          config.push({
            label: '发送短信',
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
```
## 2、组件使用
```html
<template>
    <XBTable
        title="工作室列表"
        :columns="tableColumns"
        :data="tableData"
        :total="pageTotal"
        :onRowKey="changeRowKey"
        @on-page-change="handlePageChange"
        @on-selection-change="handleSelectionChange"
    >
        <!-- 表头操作栏 -->
        <template v-slot:handle>
            <el-button type="primary" plain>导出数据</el-button>
            <el-button type="primary" plain @click="handleAddStudio"
                >新增工作室</el-button
            >
            <el-button type="primary" plain @click="handleBatchUploadStudios"
                >批量导入</el-button
            >
        </template>
    </XBTable>
</template>
<script>
export default {
    mounted() {
        this.tableColumns = getStudioTableCols(this)
    },
    methods: {
        // 根据数据自定义row-key
        changeRowKey(row, callback) {
            return callback(row.id)
        },
        handlePageChange(data) {
            this.pages = data
        },
        handleSelectionChange(selection) {}
    }
}
</script>
```

