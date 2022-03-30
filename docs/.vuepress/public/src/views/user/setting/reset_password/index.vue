<template>
  <page-container>
    <div class="login">
      <!-- <div class="title-container">
        <h3>{{ title }}</h3>
      </div> -->
      <div class="content">
        <el-steps :active="activeStep" align-center>
          <el-step title="验证身份" />
          <el-step title="设置密码" />
          <el-step title="完成" />
        </el-steps>
        <component
          :is="showComponent"
          :is-pay="$route.meta.isPay"
          :set-type="$route.meta.setType"
          :input="data"
          class="component-box"
          @output="handleOutput"
        />
      </div>
    </div>
  </page-container>
</template>

<script>
import FragmentStep_1 from './component/FragmentStep_1'
import FragmentStep_2 from './component/FragmentStep_2'
import FragmentStep_3 from './component/FragmentStep_3'
import BasePage from '@/mixins/BasePage'

export default {
  name: 'ResetPassword',
  components: {
    FragmentStep_1,
    FragmentStep_2,
    FragmentStep_3
  },
  mixins: [BasePage],
  data() {
    return {
      activeStep: 1,
      data: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {
    showComponent() {
      return `FragmentStep_${this.activeStep}`
    }
  },
  methods: {
    handleOutput(step, data) {
      this.activeStep = step
      this.data = data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import '~@/styles/variables';
// 步骤条的样式调整
$steps-line-color: #b6d1ff;
.el-steps {
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 50px auto;
  /deep/ {
    .el-step__icon.is-text {
      width: 41px;
      height: 41px;
      background: #d8d8d8;
      border: 3px solid #eeeeee;
      color: #fff;
      // font-size: $title-fsz;
      border-radius: 50%;
    }
    .is-success,
    .is-process,
    .is-finish {
      // color: $color-text-primary !important;
      // border-color: $color-primary;
      font-weight: normal;
      .el-step__title,
      .el-step__line {
        // color: $color-text-primary;
        border-color: #9ec1ff;
        // border-color: $steps-line-color;
        height: 1px !important;
        // background: $steps-line-color !important;
      }
      .el-step__icon.is-text {
        background: linear-gradient(270deg, #c8dcff, #9ec1ff 91%);
        border: 3px solid #d6e5ff;
      }
    }

    .el-step.is-horizontal .el-step__line {
      width: 165px;
      height: 2px;
      background: #ebeef5;
      top: 16.5px;
      left: 100%;
      margin-left: -82.5px;
    }
    .el-step__title {
      // font-size: $main-fsz;
      // color: $color-text-info;
      color: #333;
    }
  }
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    .content {
      // position: absolute;
      min-width: 600px;
      // left: 0;
      // right: 0;
      margin: 0 auto;
      .component-box {
        margin: 20px auto;
      }
    }
  }
}
</style>
