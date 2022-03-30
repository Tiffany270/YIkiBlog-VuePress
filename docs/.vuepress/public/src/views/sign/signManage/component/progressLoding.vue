<template>
  <el-progress :percentage="percentage" :status="successStatus" type="circle" />
</template>
<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      successStatus: null
    }
  },
  watch: {
    percentage(val) {
      if (val >= 100) {
        this.successStatus = 'success'
      } else {
        this.successStatus = null
      }
    }
  }
}
</script>
