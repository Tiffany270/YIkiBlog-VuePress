<template>
  <div class="search">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="formData"
      class="search__form"
      label-width="125px"
      label-position="top"
      @submit.native.prevent
    >
      <ul class="search__form__list">
        <template v-for="(item, index) in list">
          <li v-show="index < 3 || isFilter" :key="item.key" class="search__form__list__item">
            <!-- 输入框 -->
            <el-form-item v-if="item.type === formItemTypes.Input" :label="item.label" :prop="item.key">
              <el-input
                v-model.trim="formData[item.key]"
                :placeholder="item.placeholder"
                style="width: 220px"
                clearable
              ></el-input>
            </el-form-item>
            <!-- 下拉框 -->
            <el-form-item v-if="item.type === formItemTypes.Select" :label="item.label" :prop="item.key">
              <el-select
                v-model="formData[item.key]"
                :placeholder="item.placeholder"
                style="width: 220px"
                clearable
                filterable
                :multiple="item.multiple || false"
              >
                <el-option
                  v-for="(item1, index1) in item.option"
                  :key="index1 + Math.random() * 10"
                  :label="(item.self && item1[item.self.label]) || item1.label"
                  :value="(item.self && item1[item.self.value]) || item1.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 单个日期选择框 -->
            <el-form-item v-if="item.type === formItemTypes.Date" :label="item.label" :prop="item.key">
              <el-date-picker v-model="formData[item.key]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <!-- 日期范围选择框 -->
            <el-form-item v-if="item.type === formItemTypes.Cascader" :label="item.label" :prop="item.key">
              <el-date-picker
                v-model="formData[item.key]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 220px"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 数字输入框 -->
            <el-form-item v-if="item.type === formItemTypes.Number" :label="item.label" :prop="item.key">
              <el-input-number
                v-model.trim="formData[item.key]"
                :placeholder="item.placeholder"
                style="width: 220px"
                clearable
              ></el-input-number>
            </el-form-item>
            <!-- 数值区间输入框 -->
            <el-form-item v-if="item.type === formItemTypes.Num2Num" :label="item.label" :prop="item.key">
              <el-input
                v-model.trim="formData[item.start]"
                style="width: 105px"
                :placeholder="item.placeholder"
                clearable
              />
              -
              <el-input
                v-model.trim="formData[item.end]"
                style="width: 105px"
                :placeholder="item.placeholder1"
                clearable
              />
            </el-form-item>
            <!-- 月份 -->
            <el-form-item v-if="item.type === formItemTypes.Month" :label="item.label" :prop="item.key">
              <el-date-picker
                v-model="formData[item.key]"
                type="month"
                placeholder="选择月份"
                style="width: 220px"
                clearable
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </li>
        </template>
      </ul>
      <div class="search__form__handle">
        <div class="left">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="info" @click="handleReset">重置</el-button>
        </div>
        <div class="right" v-if="list.length > 3">
          <el-button
            v-if="!isFilter && list.length > 2"
            type="primary"
            round
            style="padding: 7px 15px"
            @click="isFilter = !isFilter"
          >
            <span> 高级筛选 </span>
            <i class="iconfont xbicon-senior" style="font-size: 24px; vertical-align: middle; color: #cccccc"></i>
          </el-button>
          <el-button
            v-else-if="isFilter"
            type="text"
            style="color: #333333; padding: 7px 15px"
            @click="isFilter = !isFilter"
            >高级筛选
            <i class="iconfont xbicon-senior2" style="font-size: 24px; vertical-align: middle; color: #cccccc"></i>
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { FormItemTypes } from '@/maps/enum'
// import CollapseTransition from '_c/CollapseTransition/index'
export default {
  name: 'SearchForm',
  components: {
    // CollapseTransition
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {},
      isFilter: false
      // 参考传入数据格式
      // list: [
      //     {
      //         label: '客户名称',
      //         key: 'customer',
      //         type: FormItemTypes.Input,
      //         placeholder: '请输入客户名称'
      //     },
      //     {
      //         label: '审批状态',
      //         key: 'approvalStatus',
      //         type: FormItemTypes.Select,
      //         placeholder: '请选择审批状态',
      //         option: [{ name: '新建', key: 1 }],
      //         self: {label: 'name', value: 'key'}
      //     },
      //     {
      //         label: '发起时间',
      //         key: 'startTime&endTime',
      //         type: FormItemTypes.Cascader,
      //         placeholder: ''
      //     },
      //     {
      //         label: '发放范围',
      //         key: 'startNum&endNum',
      //         type: FormItemTypes.Num2Num,
      //         placeholder: '起始值',
      //         placeholder1: '结束值'
      //     }
      //     {
      //         label: '数值',
      //         key: 'count',
      //         type: FormItemTypes.Number,
      //         placeholder: '',
      //     },
      //      {
      //         label: '日期',
      //         key: 'date',
      //         type: FormItemTypes.Date,
      //         placeholder: ''
      //     },
      // ]
    }
  },
  computed: {
    formItemTypes() {
      return FormItemTypes
    }
  },
  async mounted() {
    this._initFormData()
    // this.handleSearch()
  },
  methods: {
    _initFormData() {
      const tempObj = {}
      this.list.map(item => {
        if (item.type === FormItemTypes.Cascader || item.multiple) {
          tempObj[item.key] = []
        } else if (item.type === FormItemTypes.Num2Num) {
          const arr = item.key.split('&')
          item['start'] = arr[0]
          item['end'] = arr[1]
          tempObj[arr[0]] = ''
          tempObj[arr[1]] = ''
        } else {
          tempObj[item.key] = ''
        }
      })
      this.formData = JSON.parse(JSON.stringify(tempObj))
    },
    handleSearch() {
      const tempData = JSON.parse(JSON.stringify(this.formData))
      for (const key in tempData) {
        if (key.indexOf('&') > 0) {
          const fileds = key.split('&')
          tempData[fileds[0]] = (tempData[key] && tempData[key][0]) || ''
          tempData[fileds[1]] = (tempData[key] && tempData[key][1]) || ''
          delete tempData[key]
        }
      }
      console.log('data', tempData)
      this.$emit('on-search', tempData)
    },
    handleReset() {
      this.$refs['searchForm'].resetFields()
      this._initFormData()
      this.handleSearch()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '@/styles/index';
@include b(search) {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: 20px 0 0 0;
  border-radius: 8px;
  margin-bottom: 25px;
  @include e(form) {
    display: flex;
    justify-content: space-between;
    @include e(list) {
      // padding: 0 24px;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      @include e(item) {
        box-sizing: border-box;
        padding: 0 24px;
        display: flex;
        align-items: center;
      }
    }
    @include e(handle) {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 24px 24px 0 39px;
      // width: 380px;
      border-left: 1px solid #d9d9d9;
      margin-bottom: 24px;
      // display: flex;
      // align-items: center;
      .left {
        margin-bottom: 16px;
        button {
          width: 80px;
          margin: 0;
          &:nth-child(1) {
            margin-right: 16px;
          }
          &:nth-child(2) {
            border: 1px solid #d9d9d9;
            background: #f2f2f2;
            color: #333;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        /deep/button {
          background-color: #fff;
          border: 0;
          color: #333;
          & > span {
            display: flex;
            align-items: center;
            .plus-or-minu {
              width: 28px;
              height: 28px;
            }
          }
        }
      }
    }
  }
  /deep/.el-form-item {
    .el-form-item__label {
      height: 19px;
      line-height: 19px;
      margin-bottom: 10px;
      color: #333;
    }
  }
}
</style>
