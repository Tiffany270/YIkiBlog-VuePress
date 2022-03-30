<template>
  <el-form
    ref="searchForm"
    inline
    :model="formData"
    class="search-form"
    @submit.native.prevent
    size="small"
  >
    <div class="search-form__show">
      <template>
        <form-item :list="showFiledList" :data="formData" :is-show="true">
          <template v-slot="scope">
            <slot :name="scope.data.slot" />
          </template>
          <template v-slot:button>
            <li class="filed-list__item">
              <el-button
                type="primary"
                size="small"
                style="vertical-align: top"
                @click="handleSearch"
              >
                查询
              </el-button>
              <el-button
                size="small"
                style="vertical-align: top"
                @click="handleReset"
              >
                重置
              </el-button>
              <el-button
                v-show="hideFiledList.length"
                type="text"
                size="small"
                style="vertical-align: top"
                @click="isShowMore = !isShowMore"
              >
                更多
                <i class="iconfont icon-icon-more"></i>
              </el-button>
            </li>
          </template>
        </form-item>
      </template>
    </div>
    <collapse-transition>
      <div class="search-form__hide" v-show="isShowMore">
        <div class="" style="padding-top: 20px">
          <form-item :list="hideFiledList" :data="formData" :is-show="false" />
        </div>
      </div>
    </collapse-transition>
  </el-form>
</template>

<script>
import { FormItemTypesEnum } from '@/static/enums/FormItemTypesEnum'
import FormItem from './components/FormItem'
import CollapseTransition from '@components/CollapseTransition'
export default {
  name: 'SearchForm',
  components: {
    FormItem,
    CollapseTransition
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    number: {
      type: [Number, String],
      default: 3
    }
  },
  data() {
    return {
      formData: {},
      isShowMore: false
    }
  },
  computed: {
    showFiledList() {
      return this.list.filter((item, index) => index <= Number(this.number) - 1)
    },
    hideFiledList() {
      return this.list.filter((item, index) => index + 1 > Number(this.number))
    }
  },
  mounted() {
    this._initFormData()
  },
  methods: {
    _initFormData() {
      const tempObj = {}
      this.list.map(item => {
        if (item.type === FormItemTypesEnum.DATERANGE || item.multiple) {
          tempObj[item.key] = []
        } else if (item.type === FormItemTypesEnum.NUM2NUM) {
          const arr = item.key.split('&')
          item['start'] = arr[0]
          item['end'] = arr[1]
          tempObj[arr[0]] = ''
          tempObj[arr[1]] = ''
        } else {
          item.key && (tempObj[item.key] = '')
        }
      })
      this.formData = JSON.parse(JSON.stringify(tempObj))
    },
    handleSearch() {
      const tempData = JSON.parse(JSON.stringify(this.formData))
      console.log('data', tempData)
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
      // this.handleSearch()
      this.$emit('on-reset')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.search-form {
  &__hide {
    background: $color-deep-background;
  }
}
</style>
