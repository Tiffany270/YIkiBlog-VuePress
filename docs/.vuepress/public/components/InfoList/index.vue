<template>
  <div
    class="info-list"
    :class="{
      one: remainder == '1',
      two: remainder == '2',
      three: remainder == '3'
    }"
  >
    <div
      v-for="(item, index) in labelData"
      :key="index"
      class="info-list__item"
      :style="{ width: (1 / row) * 100 + '%' }"
    >
      <div v-if="item && item.expandShow !== false" class="info-list__item__label">{{ item.label }}</div>
      <div
        v-if="item && item.expandShow !== false"
        class="info-list__item__value"
        :title="data && data[item.key] | toThousands(item.type !== 'money') | formatDate(item.type === 'date')"
      >
        <span v-if="!item.slot">
          {{ data && data[item.key] | toThousands(item.type !== 'money') | formatDate(item.type === 'date') }}
        </span>
        <slot v-else :name="item.slot" :data="item"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { toThousands, getDate } from '@/utils/util'
export default {
  filters: {
    toThousands,
    formatDate(date, flag) {
      if (!flag || !date) {
        return date
      }
      return getDate(date, 'yyyymmddhhmmss', '-')
    }
  },
  props: {
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
    }
  },
  data() {
    return {}
  },
  computed: {
    remainder() {
      const length = this.labelData.length
      return (length % this.row) + ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin';
@include b(info-list) {
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  @include e(item) {
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    width: 50%;
    // min-height: 62px;
    box-sizing: border-box;
    @include e(label) {
      display: block;
      box-sizing: border-box;
      padding-left: 16px;
      padding-bottom: 0;
      height: 54px;
      line-height: 54px;
      background: #f2f2f2;
      color: #333333;
    }
    @include e(value) {
      box-sizing: border-box;
      padding-left: 16px;
      height: 54px;
      line-height: 54px;
      border-top: 1px solid #d9d9d9;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #8c8e90;
    }
  }
}
.one {
  .info-list__item:nth-last-child(1) {
    width: 100% !important;
  }
}
.two {
  .info-list__item:nth-last-child(1) {
    width: 66.6% !important;
  }
  .info-list__item:nth-last-child(2) {
    // width: 50%;
  }
}
.three {
  .info-list__item:nth-last-child(1) {
    width: 50%;
    // background-color: red;
  }
}
.ellipsis {
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
