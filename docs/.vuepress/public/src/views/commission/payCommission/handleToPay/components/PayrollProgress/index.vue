<template>
  <div class="payroll-progress">
    <progress-circle :current="current" :total="total" :is-success="isFinished" />
    <div class="payroll-progress__status">
      <!-- <div class="percentage">{{ percentage }}%</div> -->
      <div v-if="isFinished" class="hint">已完成</div>
      <div v-else class="hint">
        剩余时间<span class="highlight-time">{{ remainTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressCircle from '_c/ProgressCircle/index'
export default {
  name: 'PayrollProgress',
  components: {
    ProgressCircle
  },
  props: {
    success: {
      type: Number,
      default: 0
    },
    fail: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      lastCheck: 0,
      currCheck: 0,
      timerId: null,
      cacheTime: '--',
      remainTime: '--',
      calcTime: 0
    }
  },
  computed: {
    current() {
      return this.success + this.fail
    },
    percentage() {
      const percentage = ((this.success + this.fail) / this.total) * 100
      if (Number.isNaN(percentage)) {
        return 0
      } else {
        return percentage.toFixed(0)
      }
    },
    isFinished() {
      return (this.success + this.fail) / this.total === 1
    },
    samplePeriod() {
      const period = 1000
      return {
        period,
        spm: 60000 / period
      }
    }
  },
  watch: {
    isFinished(val) {
      if (val) {
        this.$emit('finish')
      }
    }
  },
  mounted() {
    this.calcRemainTime()
    this.isFinished && this.$emit('finish')
  },
  destroyed() {
    this.stopCalc()
  },
  methods: {
    calcRemainTime() {
      this.timerId = setInterval(() => {
        this.calcTime++
        this.lastCheck = this.currCheck
        this.currCheck = parseInt(this.fail + this.success)

        this.$nextTick(() => {
          this.remainTime = this.outputRemainTimeString()
        })
      }, this.samplePeriod.period)
      // this.$store.dispatch('addIntervalTimerId', this.timerId) // 添加全局的timerId，退出时统一处理
    },
    stopCalc() {
      clearInterval(this.timerId)
    },
    outputRemainTimeString() {
      const setCache = string => {
        this.cacheTime = string
        return string
      }

      const countPerSec = this.currCheck - this.lastCheck
      const remain = this.total - this.currCheck
      const result = remain / countPerSec / this.samplePeriod.spm
      if (result > 1) {
        if (Number.isFinite(result)) {
          return setCache(`${result.toFixed(0)}min`)
        } else {
          return this.cacheTime // 如果是Infinite则返回缓存值
        }
      } else {
        const second = result * 60
        if (Number.isNaN(second)) {
          return setCache('--')
        } else {
          return setCache(`${second.toFixed(0)}s`)
        }
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(payroll-progress) {
  text-align: center;
  margin-bottom: 24px;
  overflow: hidden;
  @include e(status) {
    margin-top: 26px;
  }
}
.payroll-progress {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .payroll-progress__status {
    position: absolute;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .percentage {
      font-size: 24px;
      line-height: 33px;
      color: #333333;
    }
    .hint {
      font-size: 18px;
      line-height: 16px;
      color: #333333;
      .highlight-time {
        color: #333333;
      }
    }
  }
  .svg-container {
    position: fixed;
    top: -1000px;
    left: -1000px;
  }
}
</style>
