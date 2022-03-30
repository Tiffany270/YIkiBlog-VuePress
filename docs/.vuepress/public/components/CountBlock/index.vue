<template>
  <div class="count-block">
    <div class="count-block__left" :style="{ background: data.color }"></div>
    <div class="count-block__right">
      <div class="count-block__right--label">{{ data.label }}</div>
      <div class="count-block__right--value" :style="{ color: data.color }">
        {{ data.type === 'money' ? toThousands(data.value) : data.value }}
      </div>
    </div>
  </div>
</template>

<script>
import { toThousands } from '@/utils/util'
export default {
  name: 'CountBlock',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          label: '字段标题',
          value: '',
          color: '#666',
          type: ''
        }
      }
    }
  },
  data() {
    return {
      toThousands
    }
  },

  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(count-block) {
  display: flex;
  @include e(left) {
    height: 54px;
    width: 5px;
    border-radius: 3px;
    margin-right: 12px;
  }
  @include e(right) {
    @include m(label) {
      font-size: 15px;
      font-weight: 400;
      color: #666666;
      line-height: 19px;
      margin-bottom: 5px;
    }
    @include m(value) {
      font-size: 26px;
      font-weight: 400;
      color: #03a92c;
    }
  }
}
</style>
