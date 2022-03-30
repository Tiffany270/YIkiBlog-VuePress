<template>
  <div>
    <!--<Button size="large" @click="backHome" type="primary">返回首页</Button>-->
    <Button size="large" @click="backPrev" type="primary"
      >返回上一页
      <!-- ({{ second }}s) -->
    </Button>
  </div>
</template>

<script>
export default {
  name: 'BackBtnGroup',
  data() {
    return {
      second: 5,
      timer: null
    }
  },
  methods: {
    backHome() {
      this.$router.replace({
        name: 'Index'
      })
    },
    backPrev() {
      this.$router.go(-1)
    }
  }
  // mounted() {
  //   this.timer = setInterval(() => {
  //     if (this.second === 0) this.backPrev()
  //     else this.second--
  //   }, 1000)
  // },
  // beforeDestroy() {
  //   clearInterval(this.timer)
  // }
}
</script>
<style scoped lang="scss">
@import './error.scss';
</style>
