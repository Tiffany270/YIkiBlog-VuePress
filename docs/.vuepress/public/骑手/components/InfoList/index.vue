<template>
  <div
    class="info-list"
    :style="{ background: background }"
    :class="{
      one: remainder == '1',
      two: remainder == '2',
      three: remainder == '3'
    }"
  >
    <div
      class="info-list__item"
      v-for="(item, index) in labelData"
      :key="index"
      :style="{ width: (1 / row) * 100 + '%' }"
    >
      <span
        class="info-list__item--label"
        :style="{ width: labelWidth + 'px' }"
      >
        {{ item.label }} ：
      </span>
      <span class="info-list__item--value">
        <span v-if="!item.slot">
          {{
            data &&
            data[item.key]
              | moneyConvert(item.type === 'money')
              | formatDate(item.type === 'date')
          }}
        </span>
        <!-- 特殊处理value -->
        <slot v-else :name="item.slot" :data="data"></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailList',
  props: {
    labelWidth: {
      type: Number,
      default: 100
    },
    labelData: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: [Array, Object],
      default() {
        return {}
      }
    },
    row: {
      type: Number,
      default: 2
    },
    background: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    remainder() {
      const length = this.labelData.length
      return (length % this.row) + ''
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.info-list {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  &__item {
    box-sizing: border-box;
    padding-right: 20px;
    min-height: 38px;
    line-height: 38px;
    &--label {
      display: inline-block;
      white-space: nowrap;
      text-align: right;
    }
    &--value {
      display: inline-block;
      box-sizing: border-box;
      padding-left: 8px;
    }
  }
}
.one {
  .detail-list__item:nth-last-child(1) {
    width: 100% !important;
  }
}
.two {
  .detail-list__item:nth-last-child(1) {
    width: 66.6% !important;
  }
}
.three {
  .detail-list__item:nth-last-child(1) {
    width: 50%;
  }
}
</style>
