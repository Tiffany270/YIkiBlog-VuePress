<template>
  <div class="theme-container">
    <div class="content">
      <div class="centerDiv">
        unicode: <i class="iconfont">&#xe614;</i> class :
        <span class="icon iconfont icon-shezhi"></span> svg:
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shezhi"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "iconfont",
  mounted() {
    import("../../asset/iconfont/iconfont.js").then((icon) => {});
  },
  methods: {},
};
</script>

<style lang="stylus">
@import '../../asset/iconfont/iconfont.css';

.centerDiv {
  width: 100%;
  height: 300px;
  position: absolute;
  top: 10%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
