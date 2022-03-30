<template>
  <ul class="filed-list">
    <template v-for="item in list">
      <li class="filed-list__item" :key="item.key">
        <!-- 输入框 -->
        <el-form-item
          v-if="item.type === FormItemTypesEnum.INPUT"
          :label="isShow ? '' : item.label"
          :prop="item.key"
          :label-width="isShow ? '90px' : '125px'"
        >
          <el-input
            v-model.trim="data[item.key]"
            :placeholder="item.placeholder"
            style="width: 230px"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 下拉框 -->
        <el-form-item
          v-if="item.type === FormItemTypesEnum.SELECT"
          :label="isShow ? '' : item.label"
          :prop="item.key"
          :label-width="isShow ? '100px' : '125px'"
        >
          <el-select
            v-model="data[item.key]"
            :placeholder="item.placeholder"
            style="width: 230px"
            clearable
            filterable
            collapse-tags
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
        <el-form-item
          v-if="item.type === FormItemTypesEnum.DATE"
          :label="isShow ? '' : item.label"
          :prop="item.key"
          :label-width="isShow ? '100px' : '125px'"
        >
          <el-date-picker
            v-model="data[item.key]"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择日期"
            style="width: 230px"
          ></el-date-picker>
        </el-form-item>
        <!-- 日期范围选择框 -->
        <el-form-item
          v-if="item.type === FormItemTypesEnum.DATERANGE"
          :label="isShow ? '' : item.label"
          :prop="item.key"
          :label-width="isShow ? '100px' : '125px'"
        >
          <el-date-picker
            v-model="data[item.key]"
            type="daterange"
            range-separator="-"
            :start-placeholder="item.startPlaceholder || '开始日期'"
            :end-placeholder="item.endPlaceholder || '结束日期'"
            style="width: 230px"
            format="yyyy/MM/dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <!-- 数字输入框 -->
        <el-form-item
          v-if="item.type === FormItemTypesEnum.NUMBER"
          :label="isShow ? '' : item.label"
          :prop="item.key"
          :label-width="isShow ? '100px' : '125px'"
        >
          <el-input-number
            v-model.trim="data[item.key]"
            :placeholder="item.placeholder"
            style="width: 230px"
            clearable
          ></el-input-number>
        </el-form-item>
        <!-- 数值区间输入框 -->
        <el-form-item
          v-if="item.type === FormItemTypesEnum.NUM2NUM"
          :label="isShow ? '' : item.label"
          :prop="item.key"
          :label-width="isShow ? '100px' : '125px'"
        >
          <el-input
            v-model.trim="data[item.start]"
            style="width: 110px"
            :placeholder="item.placeholder"
            clearable
          />
          -
          <el-input
            v-model.trim="data[item.end]"
            style="width: 110px"
            :placeholder="item.placeholder1"
            clearable
          />
        </el-form-item>
        <!-- 月份 -->
        <el-form-item
          v-if="item.type === FormItemTypesEnum.MONTH"
          :label="isShow ? '' : item.label"
          :prop="item.key"
          :label-width="isShow ? '100px' : '125px'"
        >
          <el-date-picker
            v-model="data[item.key]"
            type="month"
            :placeholder="item.placeholder || '选择月份'"
            style="width: 230px"
            clearable
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>
        <!-- 月份区间 -->
        <el-form-item
          v-if="item.type === FormItemTypesEnum.MONTH2MONTH"
          :label="isShow ? '' : item.label"
          :prop="item.key"
          :label-width="isShow ? '100px' : '125px'"
        >
          <el-date-picker
            v-model="data[item.key]"
            type="monthrange"
            :start-placeholder="item.startPlaceholder || '开始月份'"
            :end-placeholder="item.endPlaceholder || '结束月份'"
            style="width: 230px"
            clearable
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>
        <!-- 特殊的丢出去自定义 -->
        <el-form-item
          v-if="item.slot"
          :label="isShow ? '' : item.label"
          :label-width="isShow ? '100px' : '125px'"
        >
          <slot :data="item" />
        </el-form-item>
      </li>
    </template>
    <!-- 按钮区域 -->
    <slot name="button"></slot>
  </ul>
</template>

<script>
import { FormItemTypesEnum } from '@/static/enums/FormItemTypesEnum'
export default {
  name: 'FormItem',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => {}
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      FormItemTypesEnum: Object.freeze(FormItemTypesEnum)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.filed-list {
  display: flex;
  flex-wrap: wrap;
  .el-form-item__label,
  .el-input__inner,
  .el-range-input {
    font-size: 13px;
  }
}
</style>
