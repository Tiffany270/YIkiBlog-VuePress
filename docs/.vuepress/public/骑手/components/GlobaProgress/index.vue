<template>
  <div class="global-progress" v-show="totoalPercentage">
    <el-progress
      type="dashboard"
      :percentage="totoalPercentage"
      :color="customColor"
      :format="formatPercentage"
    ></el-progress>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GlobaProgress',
  data() {
    return {}
  },
  computed: {
    totoalPercentage() {
      return Number(
        ((this.downloadPercentage + this.compressPercentage) / 2).toFixed(2)
      )
    },
    ...mapGetters(['downloadPercentage', 'compressPercentage'])
  },
  methods: {
    formatPercentage(percentage) {
      return percentage === 100 ? '下载完成' : `${percentage}%`
    },
    customColor(percentage) {
      if (percentage < 30) {
        return '#909399'
      } else if (percentage < 70) {
        return '#e6a23c'
      }
      return '#67c23a'
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.global-progress {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000000;
  .el-progress__text {
    font-size: 12px !important;
  }
}
</style>
