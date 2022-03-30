<template>
  <div class="app-container">
    <div ref="AppContainerContent" class="content" :class="{ 'with-bottom-bar': isBottomBarShown }">
      <slot> <!-- 主内容 --></slot>
    </div>
    <div v-if="isBottomBarShown" class="bottom-bar">
      <div v-if="$slots.bottomBarCenter" class="with-only-center" :class="{ 'has-more-button': isBackToTopShown }">
        <slot name="bottomBarCenter">
          <!-- 底栏中心插槽（与左右插槽互斥） -->
        </slot>
      </div>
      <div v-else class="with-left-and-right">
        <div class="left-block">
          <slot name="bottomBarLeft"> <!-- 底栏左插槽 --></slot>
        </div>
        <div class="right-block">
          <slot name="bottomBarRight"> <!-- 底栏右插槽 --></slot>
        </div>
      </div>
      <div class="tools-block">
        <tiny-button v-if="isGoBackShown" icon-class="xbicon-backpage" content="返回上页" @click="goBack"></tiny-button>
        <tiny-button
          v-if="isBackToTopShown"
          icon-class="xbicon-backtop"
          content="返回顶部"
          @click="backToTop"
        ></tiny-button>
      </div>
    </div>
  </div>
</template>

<script>
import TinyButton from '_c/TinyButton'
export default {
  name: 'PageContainer',
  components: { TinyButton },
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
    },
    hideBottomBar: {
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
    isBottomBarShown() {
      return (
        !this.hideBottomBar &&
        (this.showGoBack || this.$slots.bottomBarLeft || this.$slots.bottomBarRight || this.$slots.bottomBarCenter)
      )
    },
    isGoBackShown() {
      return typeof this.goBackMethod === 'function' || this.showGoBack
    },
    isBackToTopShown() {
      return !this.hideBackToTop && this.showBackToTop
    }
  },
  mounted() {
    this.$refs.AppContainerContent.addEventListener('scroll', this.toShowBackToTop)
    this.$once('hook:beforeDestroy', () => {
      this.$refs.AppContainerContent.removeEventListener('scroll', this.toShowBackToTop)
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

<style lang="scss" scoped>
@import 'index.scss';
</style>
