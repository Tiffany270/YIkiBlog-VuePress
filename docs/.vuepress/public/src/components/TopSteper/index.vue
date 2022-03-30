<template>
  <div class="top-steper">
    <steper-item
      v-for="(item, index) in list"
      :key="item"
      :text="item"
      :index="index"
      :is-current="index === current"
      :is-last="index < current"
    />
  </div>
</template>

<script>
import SteperItem from './steperItem'
export default {
  name: 'TopStper',
  components: {
    SteperItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
.top-steper {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
