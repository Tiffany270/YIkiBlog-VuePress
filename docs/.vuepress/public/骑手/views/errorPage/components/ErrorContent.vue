<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code" />
      <div class="text-con">
        <!--<h4>{{ code }}</h4>-->
        <h5>{{ desc }}</h5>
      </div>
      <back-btn class="back-btn-group"></back-btn>
    </div>
  </div>
</template>

<script>
import BackBtn from './BackBtn'
export default {
  name: 'ErrorContent',
  components: {
    BackBtn
  },
  props: {
    code: String,
    desc: String,
    src: String
  }
}
</script>
<style scoped lang="scss">
@import './error.scss';
</style>
