<template>
  <div :class="type === 'table' ? 'no-data-table' : 'no-data'">
    <div class="no-data__content">
      <img
        class="no-data__content__img"
        src="../../assets/images/icon-no-data@2x.png"
        alt=""
      />
      <div class="no-data__content__text">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoDate',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.no-data-table {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.no-data {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}
.no-data__content {
  width: 160px;
  display: inline-block;
  .no-data__content__img {
    width: 160px;
    height: 140px;
  }
  .no-data__content__text {
    font-size: 12px;
    text-align: center;
    color: #909399;
  }
}
</style>
