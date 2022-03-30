<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.month.length <= 0 && val.totalAmount.length <= 0) {
          // 无数据时，显示坐标轴
          val.month = [`${new Date().getFullYear() + '-' + (new Date().getMonth() + 1)}`]
          val.totalAmount = [0]
        }
        this.$nextTick(() => {
          this.setOptions(val)
        })
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ month, totalAmount } = {}) {
      this.chart.setOption({
        xAxis: {
          data: month,
          boundaryGap: false,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            margin: 30,
            textStyle: {
              color: '#666666'
            }
          }
        },
        grid: {
          left: 0,
          right: 25,
          bottom: 0,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          extraCssText: 'box-shadow: 0 2px 8px 0 rgba(0,0,0,0.15); ',
          borderRadius: 4,
          color: '#333',
          axisPointer: {
            type: 'cross'
          },
          textStyle: {
            color: '#333'
          },
          padding: [9, 14],
          formatter: params => {
            return `<div style="text-align: center"><span style="font-size: 12px;color: #B8B8B8">${
              params[0].axisValue
            }</span><br>${params[0].value + this.chartData.unit}<div>`
          }
        },
        yAxis: {
          // minInterval: 1,
          min: totalAmount[0] === 0 ? 10 : 0,
          boundaryGap: [0, 0.1],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 0,
            margin: 20,
            // formatter: '{value} 笔'
            formatter: value => {
              return value + this.chartData.unit
            },
            textStyle: {
              color: '#666666'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#EE5441', // 圆点颜色
                borderColor: '#FFF',
                borderWidth: 3,
                lineStyle: {
                  width: 3,
                  color: '#647CFF'
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#D3D9FF' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#FFFFFF' // 100% 处的颜色
                    }
                  ])
                }
              }
            },
            emphasis: {
              // 鼠标hover上去的时候，拐点的颜色和样式
              itemStyle: {
                color: '#647CFF', // 颜色
                borderColor: '#EE5441', // 图形的描边颜色
                borderWidth: 3 // 描边的线宽
              }
            },
            symbol: 'circle',
            symbolSize: 8,
            data: totalAmount,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#EE5441', // 圆点颜色
                borderColor: '#FFF',
                borderWidth: 2,
                lineStyle: {
                  width: 3,
                  color: '#FF5139'
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#FF9084' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#FFFFFF' // 100% 处的颜色
                    }
                  ])
                }
              }
            },
            symbol: 'circle',
            symbolSize: 7,
            data: totalAmount,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    }
  }
}
</script>
