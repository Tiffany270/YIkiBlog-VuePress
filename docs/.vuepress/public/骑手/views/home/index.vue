<template>
  <page-container>
    <block-container style="wdith: 100%; height: 100%; padding: 100px">
      <img
        src="../../assets/images/bg-home-page@2x.png"
        alt=""
        style="width: 100%"
      />
    </block-container>
  </page-container>
</template>

<script>
import BasePage from '@/mixin/BasePage'
export default {
  name: 'Home',
  mixins: [BasePage],
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
