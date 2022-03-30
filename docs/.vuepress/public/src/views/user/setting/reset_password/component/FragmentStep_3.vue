<template>
  <div class="container">
    <div class="hint"><i class="el-icon-success" />设置成功，请牢记{{ hint }}</div>
    <div class="counter">{{ counter }}s后返回{{ hint2 }}</div>
  </div>
</template>

<script>
export default {
  name: 'FragmentStep3',
  props: {
    isPay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      counter: 3,
      timer: ''
    }
  },
  computed: {
    hint() {
      return '支付密码'
    },
    hint2() {
      return '来源页'
    }
  },
  mounted() {
    this.countDown()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    countDown() {
      this.timer = setInterval(() => {
        this.counter--
        if (this.counter === 0) {
          clearInterval(this.timer)
          this.$router.go(-1)
        }
      }, 1000)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  .hint {
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 30px;
    border: 1px solid mix(white, green, 80%);
    background-color: mix(white, green, 90%);
    i {
      color: mix(white, green, 10%);
      margin-right: 10px;
    }
  }
  .counter {
    // font-size: $hint-fsz;
    color: #ccc;
  }
}
</style>
