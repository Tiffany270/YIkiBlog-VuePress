<template>
  <el-progress
    :percentage="percentage"
    :stroke-width="15"
    :color="colorName"
    :status="statusName"
    type="circle"
    :width="176"
  />
</template>

<script>
export default {
  name: 'ProgressCircle',
  props: {
    current: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    isSuccess: {
      type: Boolean,
      default: false
    },
    isFail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      percentage: 0,
      lock: false
    }
  },
  computed: {
    statusName() {
      if (this.isSuccess) {
        return 'success'
      } else if (this.isFail) {
        return 'exception'
      } else {
        return undefined
      }
    },
    colorName() {
      if (this.isSuccess || this.isFail) {
        return ''
      } else {
        return '#35BA56'
      }
    }
  },
  watch: {
    current() {
      this.setPercentage()
    }
  },
  methods: {
    setPercentage() {
      if (!this.lock) {
        this.lock = true
        setTimeout(() => {
          if (this.current && this.total) {
            this.percentage = parseFloat(((this.current / this.total) * 100).toFixed(1))
          } else {
            this.percentage = 0
          }
          this.lock = false
        }, 200)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
