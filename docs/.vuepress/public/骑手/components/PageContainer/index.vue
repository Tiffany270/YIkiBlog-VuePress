<template>
  <div class="page-container">
    <div class="page-content" ref="AppContainerContent">
      <!-- 内容区域插槽 -->
      <slot></slot>
    </div>
    <!-- 底部操作栏 -->
    <div class="bottom-bar" v-if="isBottomBarShow">
      <div class="bottom-bar__block">
        <div class="left-block">
          <slot name="bottomBarLeft"><!-- 底栏左插槽 --></slot>
        </div>
        <div class="right-block">
          <slot name="bottomBarRight"><!-- 底栏右插槽 --></slot>
        </div>
      </div>
      <!-- 返回 -->
      <div class="bottom-bar__tools">
        <tiny-button
          v-if="isGoBackShow"
          icon-class="icon-a-icon-back"
          content="返回上页"
          @click="goBack"
        ></tiny-button>
        <tiny-button
          v-if="isBackToTopShow"
          icon-class="icon-icon-arrowup"
          content="返回顶部"
          @click="backToTop"
        ></tiny-button>
      </div>
    </div>
  </div>
</template>

<script>
import TinyButton from '@components/TinyButton'
export default {
  name: 'PageContainer',
  components: {
    TinyButton
  },
  props: {
    // 是否展示返回按钮
    showGoBack: {
      type: Boolean,
      default: false
    },
    // 自定义返回方法
    goBackMethod: {
      type: Function,
      default: null
    },
    // 隐藏返回到顶层的按钮
    hideBackToTop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showBackToTop: false
    }
  },
  computed: {
    isBottomBarShow() {
      return (
        this.showGoBack ||
        this.$slots.bottomBarLeft ||
        this.$slots.bottomBarRight
      )
    },
    isGoBackShow() {
      return typeof this.goBackMethod === 'function' || this.showGoBack
    },
    isBackToTopShow() {
      return !this.hideBackToTop && this.showBackToTop
    }
  },
  mounted() {
    this.$refs.AppContainerContent.addEventListener(
      'scroll',
      this.toShowBackToTop
    )
    this.$once('hook:beforeDestroy', () => {
      this.$refs.AppContainerContent.removeEventListener(
        'scroll',
        this.toShowBackToTop
      )
    })
  },
  methods: {
    // 滚到顶部
    backToTop() {
      this.$refs.AppContainerContent.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    // 回到上页
    goBack() {
      if (typeof this.goBackMethod === 'function') {
        this.goBackMethod()
      } else {
        this.$router.go(-1)
      }
    },
    // 是否展示返回顶部
    toShowBackToTop() {
      this.showBackToTop = this.$refs.AppContainerContent.scrollTop > 50
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
$page-padding: 20px;
$bottom-bar-height: 72px;
.page-container {
  height: calc(100% - 38px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .page-content {
    flex: 1;
    box-sizing: border-box;
    padding: $page-padding;
    overflow-y: auto;
    width: 100%;
  }
  .bottom-bar {
    box-sizing: border-box;
    border-top: 1px solid #eff0f4;
    padding: 0 $page-padding;
    background-color: #fff;
    width: 100%;
    height: $bottom-bar-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 5px -2px 6px rgba(0, 0, 0, 0.1);
    &__block {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-block {
        & > * {
          margin-left: 0;
          margin-right: 8px;
        }
      }
      .right-block {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        & > * {
          margin-right: 8px;
          margin-right: 0;
        }
      }
    }
    &__tools {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      & > * {
        margin-left: 8px;
        margin-right: 0;
      }
    }
  }
}
</style>
