
<template>
  <div class="theme-container">
    <div class="pdf-content">
      <iframe src="/vuepress/pdf/me.pdf"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resume',

  data: function () {
    return {
      errors: [],
      name: null,
      age: null
    }
  },

  mounted () {},
  methods: {}
}
</script>

<style lang="stylus">
.pdf-content {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: 3.5%;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>>

