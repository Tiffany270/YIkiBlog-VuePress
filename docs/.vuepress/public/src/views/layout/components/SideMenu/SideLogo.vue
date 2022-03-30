<template>
  <div class="side-logo">
    <img :src="serviceProviderInfo.systemLogoPic" alt="" v-if="serviceProviderInfo.systemLogoPic && !isMenuCollapse" />
    <!-- <img src="../../../../assets/images/logo@2x.png" alt="" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideLogo',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['serviceProviderInfo', 'isMenuCollapse'])
  },

  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/index';
@include b(side-logo) {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  img {
    width: 144px;
  }
}
</style>
