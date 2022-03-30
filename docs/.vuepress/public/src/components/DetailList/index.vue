<template>
  <div
    class="detail-list"
    :class="{
      one: remainder == '1',
      two: remainder == '2',
      three: remainder == '3'
    }"
  >
    <div
      class="detail-list__item"
      v-for="(item, index) in labelData"
      :key="index"
      :style="{ width: (1 / row) * 100 + '%' }"
    >
      <span class="detail-list__item__label" :style="{ width: labelWidth + 'px' }">{{ item.label }}：</span>
      <span class="detail-list__item__value">
        <span v-if="!item.slot">
          {{ data && data[item.key] | toThousands(item.type !== 'money') }}
        </span>
        <!-- 特殊处理value -->
        <slot v-else :name="item.slot" :data="data"></slot>
      </span>
    </div>
  </div>
</template>

<script>
import { toThousands } from '@/utils/util'
export default {
  name: 'DetailList',
  filters: {
    toThousands
  },
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
      default: 3
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
@import '@/styles/mixin';
@include b(detail-list) {
  display: flex;
  flex-wrap: wrap;
  @include e(item) {
    box-sizing: border-box;
    padding-right: 20px;
    min-height: 38px;
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
