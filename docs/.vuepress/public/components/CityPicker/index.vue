<template>
  <div class="city-picker">
    <el-form-item :prop="verifyArray[0]">
      <el-select v-model="provinceCode" :disabled="disabled" placeholder="省" @change="valueChange(0)">
        <el-option v-for="item in provinceOptions" :key="item.value" :label="item.key" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item :prop="verifyArray[1]">
      <el-select v-model="cityCode" :disabled="disabled" placeholder="市" @change="valueChange(1)">
        <el-option v-for="item in getCityOptions" :key="item.value" :label="item.key" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item :prop="verifyArray[2]">
      <el-select v-model="countyCode" :disabled="disabled" placeholder="区" @change="valueChange(2)">
        <el-option v-for="item in getCountyOptions" :key="item.value" :label="item.key" :value="item.value" />
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
/**
 * @author 王兆炜
 */
import area from './area'

export default {
  name: 'CityPicker',
  model: {
    prop: 'cityArray',
    event: 'change'
  },
  props: {
    cityArray: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    verifyArray: {
      type: Array,
      default() {
        return ['province', 'city', 'county']
      }
    }
  },
  data() {
    return {
      cityOptions: [],
      countyOptions: [],
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      province: '',
      city: '',
      county: ''
    }
  },
  computed: {
    provinceOptions() {
      return this.getList('86')
    },
    getCityOptions() {
      return this.getList(this.provinceCode)
    },
    getCountyOptions() {
      return this.getList(this.cityCode)
    }
  },
  watch: {
    cityArray: {
      deep: true,
      handler(newVal) {
        if (newVal.length) {
          this.reverseHandler(newVal)
        } else {
          this.provinceCode = ''
          this.cityCode = ''
          this.countyCode = ''
        }
      }
    }
  },
  mounted() {
    if (this.cityArray) {
      this.reverseHandler(this.cityArray)
    }
  },
  methods: {
    reverseHandler(val) {
      if (val.length === 3) {
        this.reverseData(val)
      }
    },
    valueChange(id) {
      switch (id) {
        case 0:
          for (const item of this.provinceOptions) {
            if (this.provinceCode === item.value) {
              this.province = item.key
              break
            }
          }
          this.cityCode = ''
          this.city = ''
          this.countyCode = ''
          this.county = ''
          break
        case 1:
          for (const item of this.getCityOptions) {
            if (this.cityCode === item.value) {
              this.city = item.key
              break
            }
          }
          this.countyCode = ''
          this.county = ''
          break
        case 2:
          for (const item of this.getCountyOptions) {
            if (this.countyCode === item.value) {
              this.county = item.key
              break
            }
          }
          break
      }
      this.$emit('change', [this.province, this.city, this.county])
    },
    getList(id) {
      const areaRange = area[id]
      const result = []
      for (const i in areaRange) {
        // eslint-disable-next-line no-prototype-builtins
        if (areaRange.hasOwnProperty(i)) {
          result.push({
            key: areaRange[i],
            value: i
          })
        }
      }
      return result
    },
    reverseData(cityArray) {
      const provinceString = cityArray[0]
      const cityString = cityArray[1]
      const countyString = cityArray[2]
      // 找省
      for (const item of this.provinceOptions) {
        if (item.key === provinceString) {
          this.provinceCode = item.value
          this.province = item.key
          break
        }
      }

      // 找市
      for (const item of this.getCityOptions) {
        if (item.key === cityString) {
          this.cityCode = item.value
          this.city = item.key
          break
        }
      }

      // 找区
      for (const item of this.getCountyOptions) {
        if (item.key === countyString) {
          this.countyCode = item.value
          this.county = item.key
          break
        }
      }
    },
    clearSelect() {
      this.cityOptions = []
      this.countyOptions = []
      this.provinceCode = ''
      this.cityCode = ''
      this.countyCode = ''
      this.province = ''
      this.city = ''
      this.county = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.city-picker {
  display: flex;
  flex-direction: row;
  .el-select {
    width: 100px !important;
    /deep/ .el-input {
      max-width: 100px !important;
    }
    margin-right: 10px;
  }
  margin-bottom: 10px;
}
</style>
